import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import {es} from 'date-fns/locale/es'
import { Availability, CalendarDate } from '@/types/index'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

type Props = {
  date: CalendarDate
  setDate: React.Dispatch<React.SetStateAction<CalendarDate>>
  availableDates: string[]
  availableTimes?: Availability[]
}

const UsersCalendar = ({date, setDate, availableDates, availableTimes} : Props) => {  
  
  const queryClient = useQueryClient()          
  
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

  useEffect(() => {
    if (!date) return
    console.log('Updating highlighted days from useEffect')
    queryClient.setQueryData<CalendarDate>(['selectedDate'], () => {
      return date
    })
    queryClient.invalidateQueries({queryKey: ['selectedDate']})    
  }, [date])
  

  if (availableTimes) {

    return (
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
        <StaticDatePicker
          orientation='portrait'
          openTo='day'
          value={date}
          onChange={handleChange}
          dayOfWeekFormatter={dayOfWeekFormatter}
          timezone='America/Mexico_City'
          minDate={new Date(availableDates[0])}          
          shouldDisableDate={day => {
            
            if (availableDates.includes(day.toDateString())) {
              return false
            }

            return true
          }}
          slotProps={{
            actionBar: {
              actions: []
            }
          }}
        />
      </LocalizationProvider>
    )
  }
}

export default UsersCalendar
