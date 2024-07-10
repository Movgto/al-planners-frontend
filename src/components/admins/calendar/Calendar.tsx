import { LocalizationProvider, PickersDay, PickersDayProps } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import {es} from 'date-fns/locale/es'
import { Availability, CalendarDate, EventList } from '@/types/index'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getAllAvailableTimes, getEvents } from '@/api/calendarAPI'
import { Badge } from '@mui/material'
import { useEffect, useState } from 'react'
import { dateInTimezone } from '@/utils/index'

type CalendarProps = {
  date: CalendarDate
  setDate: React.Dispatch<React.SetStateAction<CalendarDate>>
}



const Calendar = ({date, setDate} : CalendarProps) => {

  
  const queryClient = useQueryClient()
  
  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['calendarEvents'],
    queryFn: getEvents,
    refetchOnWindowFocus: false,
    retry: 3
  })

  const {data: availableTimes} = useQuery({
    queryKey: ['availableTimes'],
    queryFn: () => getAllAvailableTimes(date!.toISOString()),
    enabled: !!date,
    refetchOnWindowFocus: false,
    retry: 3
  })

  const getHighlightedDays = (date: Date, eventList: EventList) => {
    const highlightedDays : number[] = []
    const currentYear = date.getFullYear()
    const currentMonth = date.getMonth()

    for (let et of eventList) {
      const eventDate = dateInTimezone(new Date(et.start.dateTime))
      const year = eventDate.getFullYear()
      const month = eventDate.getMonth()
      
      if (year !== currentYear || month !== currentMonth) continue
      
      if (highlightedDays.includes(eventDate.getDate())) continue

      highlightedDays.push(eventDate.getDate())
    }

    console.log(highlightedDays)

    return highlightedDays
  }

  const getOpenDays = (date: Date, availableTimes: Availability[]) => {
    const openDays : number[] = []
    const currentYear = date.getFullYear()
    const currentMonth = date.getMonth()  



    for (const a of availableTimes) {
      const year = dateInTimezone(new Date(a.startTime)).getFullYear()
      const month = dateInTimezone(new Date(a.startTime)).getMonth()
      const day = dateInTimezone(new Date(a.startTime)).getDate()
      
      console.log('====== Year of time available ======')
      console.log(year)
      console.log('====== Month of time available ======')
      console.log(month)
      console.log('====== Day of time available ======')
      console.log(day)

      if (year !== currentYear || month !== currentMonth) continue

      if (openDays.includes(day)) continue

      openDays.push(day)
    }

    return openDays
  }

  const [highlightedDays, setHighlightedDays] = useState<number[]>([])

  const [openDays, setOpenDays] = useState<number[]>([])

  const [currentMonth, setCurrentMonth] = useState<Date>(dateInTimezone(new Date()))
  
  const handleChange = (date: CalendarDate) => {
    setDate(date)
    queryClient.setQueryData<CalendarDate>(['selectedDate'], data => {
      if (data !== date) return date
      return data
    })
    
    queryClient.invalidateQueries({queryKey: ['selectedDate']})
    console.log("Date selected:")
    console.log(date)
  }

  const dayOfWeekFormatter = (date: Date) => {
    const displayDate = new Intl.DateTimeFormat('es-MX', {
      weekday: 'narrow'      
    }).format(date)
    return displayDate
  }

  const serverDay = (props: PickersDayProps<Date> & { highlightedDays?: number[] }) => {
    const {day, outsideCurrentMonth, ...other} = props

    const isSelected = () => {
      if (day.getMonth() !== currentMonth.getMonth()) return false

      if (!highlightedDays.includes(day.getDate())) return false

      return true
    }

    const isOpen = () => {
      if (day.getMonth() !== currentMonth.getMonth()) return false

      if (!openDays.includes(day.getDate())) return false

      return true
    }

    return (
      <Badge
        key={day!.toString()}
        overlap="circular"                
        badgeContent={isSelected() ? (
          <p
            className='text-rose-800 text-4xl'
          >•</p>
        ) : undefined}
        
      >
        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day}
          sx={{
            backgroundColor: isOpen() ? 'deepskyblue' : 'white',
            color: isOpen() ? 'white' : 'black'
          }}
        />
      </Badge>
    )
  }

  const handleMonthChange = (month: Date) => {
    console.log(month)
    setCurrentMonth(month)
    if (!data) return
    console.log('Updating highlighted days for this month')
    setHighlightedDays(getHighlightedDays(month, data))
    if (!availableTimes) return
    setOpenDays(getOpenDays(month, availableTimes))
  }

  useEffect(() => {
    if (!date || !data) return
    console.log('Updating highlighted days from useEffect')
    queryClient.setQueryData<CalendarDate>(['selectedDate'], () => {
      return date
    })
    queryClient.invalidateQueries({queryKey: ['selectedDate']})
    setHighlightedDays(getHighlightedDays(date, data))
    if (!availableTimes) return
    setOpenDays(getOpenDays(date, availableTimes))
  }, [data, availableTimes])

  if (isLoading) return 'Cargando eventos'

  if (isError) return error.message

  if (data) {

    return (
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
        <StaticDatePicker
          orientation='portrait'
          openTo='day'
          value={date}
          onChange={handleChange}
          dayOfWeekFormatter={dayOfWeekFormatter}
          timezone='America/Mexico_City'
          minDate={new Date()}
          slots={{
            day: serverDay
          }}
          slotProps={{
            day: {
              highlightedDays
            } as any,
            actionBar: {
              actions: []
            }
          }}      
          onMonthChange={handleMonthChange}                
        />
      </LocalizationProvider>
    )
  }
}

export default Calendar
