import { LocalizationProvider, PickersDay, PickersDayProps } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { StaticDatePicker, StaticDatePickerProps, StaticDatePickerSlotProps, StaticDatePickerSlots } from '@mui/x-date-pickers/StaticDatePicker'
import {es} from 'date-fns/locale/es'
import { CalendarDate, EventList } from '@/types/index'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getEvents } from '@/api/calendarAPI'
import { Badge } from '@mui/material'
import { useEffect, useState } from 'react'

type CalendarProps = {
  date: CalendarDate
  setDate: React.Dispatch<React.SetStateAction<CalendarDate>>
}

const Calendar = ({date, setDate} : CalendarProps) => {

  
  const queryClient = useQueryClient()
  
  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['calendarEvents'],
    queryFn: getEvents,
  })

  const getHighlightedDays = (date: Date, eventList: EventList) => {
    const highlightedDays : number[] = []
    const currentYear = date.getFullYear()
    const currentMonth = date.getMonth()

    for (let et of eventList) {
      const eventDate = new Date(et.start.dateTime)
      const year = eventDate.getFullYear()
      const month = eventDate.getMonth()
      
      if (year !== currentYear || month !== currentMonth) continue
      
      if (highlightedDays.includes(eventDate.getDate())) continue

      highlightedDays.push(eventDate.getDate())
    }

    console.log(highlightedDays)

    return highlightedDays
  }

  const [highlightedDays, setHighlightedDays] = useState<number[]>([])

  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
  
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
        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
      </Badge>
    )
  }

  const handleMonthChange = (month: Date) => {
    console.log(month)
    setCurrentMonth(month)
    if (!data) return
    console.log('Updating highlighted days for this month')
    setHighlightedDays(getHighlightedDays(month, data))
  }

  useEffect(() => {
    if (!date || !data) return
    console.log('Updating highlighted days from useEffect')
    queryClient.setQueryData<CalendarDate>(['selectedDate'], () => {
      return date
    })
    queryClient.invalidateQueries({queryKey: ['selectedDate']})
    setHighlightedDays(getHighlightedDays(date, data))
  }, [data])

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
            } as any
          }}      
          onMonthChange={handleMonthChange}                
        />
      </LocalizationProvider>
    )
  }
}

export default Calendar
