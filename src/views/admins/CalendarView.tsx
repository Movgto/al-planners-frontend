import Calendar from '@/components/admins/calendar/Calendar'
import { useEffect, useState } from 'react'
import { CalendarDate, CalendarTab, calendarTabs } from '@/types/index'
import CalendarTabs from '@/components/admins/calendar/CalendarTabs'
import { classes } from '@/utils/index'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getAuthURL, getEvents } from '@/api/calendarAPI'
import { toast } from 'react-toastify'
import CreateEventTypeModal from '@/components/admins/calendar/CreateEventTypeModal'
import CreateEventModal from '@/components/admins/calendar/CreateEventModal'
import AppointmentModal from '@/components/admins/calendar/AppointmentModal'
import AvailabilityModal from '@/components/admins/calendar/AvailabilityModal'
import {ArrowPathIcon} from '@heroicons/react/24/outline'
import { useLocation, useNavigate } from 'react-router-dom'

const CalendarView = () => {  
  const [date, setDate] = useState<CalendarDate>(new Date())
  const [tab, setTab] = useState<CalendarTab>('Disponibilidad')
  const queryClient = useQueryClient()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const codeFromPath = searchParams.get('code')
  const navigate= useNavigate()

  const handleTabClick = (tab: CalendarTab) => {
    setTab(tab)

    console.log(tab)
  }

  const {} = useQuery({
    queryKey: ['authURL'],
    queryFn: getAuthURL,
    refetchOnWindowFocus: false
  })

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['calendarEvents'],
    queryFn: getEvents,
    refetchOnWindowFocus: false
  })

  const refetchData = () => {
    queryClient.invalidateQueries({queryKey: ['calendarEvents']})    
  }

  useEffect(() => {
    if (!codeFromPath) return

    localStorage.setItem('GOOGLE_API_TOKEN', codeFromPath)
    queryClient.invalidateQueries({ queryKey: ['googleAuthToken'] })
    navigate(location.pathname)
  }, [codeFromPath])

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
        className="flex justify-between items-center border-b-2 border-slate-300"
      >
        <div
          className="flex gap-2 -mb-[2px]"
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
        
        <div    
          className="text-zinc-800 hover:text-zinc-600 hover:cursor-pointer"
          onClick={refetchData}
        >
          <ArrowPathIcon className='size-6' />
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
