import Calendar from '@/components/admins/calendar/Calendar'
import { useState } from 'react'
import { CalendarDate, CalendarTab, calendarTabs } from '@/types/index'
import CalendarTabs from '@/components/admins/calendar/CalendarTabs'
import { classes } from '@/utils/index'
import { useLocation } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAuthURL, getEvents } from '@/api/calendarAPI'
import { toast } from 'react-toastify'

const CalendarView = () => {
  const location = useLocation()
  const search = new URLSearchParams(location.search)
  const code = search.get('code')

  const [date, setDate] = useState<CalendarDate>(new Date())
  const [tab, setTab] = useState<CalendarTab>('Disponibilidad')

  // const {data, isError} = useQuery({
  //   queryKey: ['authURL'],
  //   queryFn: getAuthURL
  // })

  const queryClient = useQueryClient()

  const handleTabClick = (tab: CalendarTab) => {
    setTab(tab)

    console.log(tab)
  }

  const {data} = useQuery({
    queryKey: ['authURL'],
    queryFn: getAuthURL
  })
  
  const {mutate} = useMutation({
    mutationFn: getEvents,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      toast.success(data)
    }
  })

  const handleLoginGoogle = () => {
    if (data) {
      window.open(data.url, '_self')
    }
  }

  if (!code) return (
    <div
      className="max-w-5xl flex flex-col py-24 gap-2"
    >
      <h2
        className="text-lg font-bold text-slate-600"
      >Por favor acceda con su cuenta de Google para usar el calendario</h2>
      <button
        type="button"
        className="bg-blue-700 text-white font-bold px-2 py-4"
        onClick= {handleLoginGoogle}
      >Acceder con Google</button>
    </div>
  )

  return (
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
      <div className='flex flex-col lg:flex-row'>
        <div
          className="flex-1 bg-violet-50"
        >
          <Calendar date={date} setDate={setDate} code={code} />
        </div>
        <div className="flex-1 bg-violet-50 py-4">
          <CalendarTabs tab={tab} />
        </div>
      </div>
    </div>
  )
}

export default CalendarView
