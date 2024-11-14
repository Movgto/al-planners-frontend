import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import {es} from 'date-fns/locale/es'
import { Availability, CalendarDate } from '@/types/index'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { dateInTimezone } from '@/utils/index'
import { ClockIcon } from '@heroicons/react/24/outline'

type Props = {
  date: CalendarDate
  setDate: React.Dispatch<React.SetStateAction<CalendarDate>>
  availableDates: string[]
  availableTimes?: Availability[]
  isLoading: boolean
}

const UsersCalendar = ({date, setDate, availableDates, availableTimes, isLoading} : Props) => {  
  
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

  const minDate = () => {
    const timeOffset = new Date().getTimezoneOffset()
    const today = new Date(Date.now())

    today.setHours(0,0,0,0)

    const tomorrowDate = new Date(today.getTime() + (24 * 60 * 60000) + timeOffset * 60000)
    tomorrowDate.setHours(0, 0, 0, 0)    

    console.log('Fecha de mañana:', tomorrowDate)
    
    return tomorrowDate
  }

  useEffect(() => {
    if (!date) return
    console.log('Updating highlighted days from useEffect')
    queryClient.setQueryData<CalendarDate>(['selectedDate'], () => {
      return date
    })
    queryClient.invalidateQueries({queryKey: ['selectedDate']})    
  }, [date])
  
  if (isLoading) return (
    <div
      className="w-full mt-20 p-4 text-lg font-bold flex flex-col gap-2 justify-center items-center text-center bg-slate-300"
    >
      <p>Cargando el Calendario, por favor espere un momento...</p>
      <ClockIcon className='size-10' />   
    </div>
  )

  if (availableTimes) {

    return (
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
        <StaticDatePicker
          orientation='portrait'
          openTo='day'
          value={minDate()}
          onChange={handleChange}
          dayOfWeekFormatter={dayOfWeekFormatter}
          timezone={import.meta.env.VITE_TIMEZONE}
          minDate={minDate()}          
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
