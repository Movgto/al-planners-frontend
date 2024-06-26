import Calendar from '@/components/admins/calendar/Calendar'
import { useState } from 'react'
import { CalendarDate, CalendarTab, calendarTabs } from '@/types/index'
import CalendarTabs from '@/components/admins/calendar/CalendarTabs'
import { classes } from '@/utils/index'
import { useQuery } from '@tanstack/react-query'
import { getAuthURL, getEvents } from '@/api/calendarAPI'
import { toast } from 'react-toastify'
import CreateEventTypeModal from '@/components/admins/calendar/CreateEventTypeModal'
import CreateEventModal from '@/components/admins/calendar/CreateEventModal'
import AppointmentModal from '@/components/admins/calendar/AppointmentModal'
import AvailabilityModal from '@/components/admins/calendar/AvailabilityModal'

const CalendarView = () => {  
  const [date, setDate] = useState<CalendarDate>(new Date())
  const [tab, setTab] = useState<CalendarTab>('Disponibilidad')

  const handleTabClick = (tab: CalendarTab) => {
    setTab(tab)

    console.log(tab)
  }

  const {} = useQuery({
    queryKey: ['authURL'],
    queryFn: getAuthURL,
    refetchOnWindowFocus: false
  })

  // const {data: gCalendarEvents} = useQuery({
  //   queryKey: ['gCalendarEvents'],
  //   queryFn: () => getGoogleAPIEvents(code!),
  //   enabled: !!code,
  //   refetchOnWindowFocus: false
  // })

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['calendarEvents'],
    queryFn: getEvents,
    refetchOnWindowFocus: false
  })

  // if (gCalendarEvents) console.log(gCalendarEvents)

  if (isLoading) return 'Cargando eventos del calendario'

  if (isError && error) {
    toast.error(error.message)

    return error.message
  }  

  if (data) return (
    <div
      className="max-w-5xl flex flex-col py-24 gap-2"
    >
      <div
        className='border-b-2 border-slate-300'
      >
        <div
          className='flex gap-2 -mb-[2px]'
        >
          {calendarTabs.map(t => (
            <button
              key={t}
              type="button"
              className={classes(tab === t ? 'border-rose-400 font-bold text-rose-700' : 'border-slate-400 text-slate-400', 'border-b-2 py-2')}
              onClick={() => handleTabClick(t)}
            >{t}</button>
          ))}
        </div>        
      </div>
      <div className='flex flex-col lg:flex-row shadow-md'>
        <div
          className="flex-1 bg-violet-50"
        >
          <Calendar date={date} setDate={setDate} />
        </div>
        <div className="flex-1 bg-violet-50 py-4">
          <CalendarTabs tab={tab} />
        </div>
      </div>
      <CreateEventTypeModal />
      <CreateEventModal />
      <AppointmentModal />
      <AvailabilityModal />
    </div>
  )
}

export default CalendarView
