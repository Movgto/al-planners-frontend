import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import {es} from 'date-fns/locale/es'
import { CalendarDate } from '@/types/index'
import { useQueryClient } from '@tanstack/react-query'

type CalendarProps = {
  date: CalendarDate
  setDate: React.Dispatch<React.SetStateAction<CalendarDate>>
}

const Calendar = ({date, setDate} : CalendarProps) => {  

  const queryClient = useQueryClient()

  const handleChange = (date: CalendarDate) => {
    setDate(date)
    queryClient.setQueryData<CalendarDate>(['selectedDate'], data => {
      if (data !== date) return date
      return data
    })
    console.log("Date selected:")
    console.log(date)
  }

  const dayOfWeekFormatter = (date: Date) => {
    const displayDate = new Intl.DateTimeFormat('es-MX', {
      weekday: 'narrow'      
    }).format(date)
    return displayDate
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <StaticDatePicker
        orientation='portrait'
        openTo='day'
        value={date}
        onChange={handleChange}
        dayOfWeekFormatter={dayOfWeekFormatter}             
      />
    </LocalizationProvider>
  )
}

export default Calendar
