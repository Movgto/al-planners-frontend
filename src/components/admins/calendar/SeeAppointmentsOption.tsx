import { getEvents, syncEvents } from "@/api/calendarAPI"
import { AppointmentMenuOptionProps, EventList } from "@/types/index"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useLocation, useNavigate } from "react-router-dom"
import AppointmenstList from "./AppointmenstList"
import { useAuthUrl, useGApiCode, useSelectedDate } from "@/hooks/index"
import { toast } from "react-toastify"
import { useEffect } from "react"

const SeeAppointmentsOption = ({setOption} : AppointmentMenuOptionProps) => {

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const location = useLocation()

  const searchParams = new URLSearchParams(location.search)

  const codeFromPath = searchParams.get('code')

  const code = useGApiCode()

  const {data: authUrl} = useAuthUrl()

  const handleClick = () => {
    setOption('Inicio')
  }

  const {data} = useQuery({
    queryKey: ['calendarEvents'],
    queryFn: getEvents,
    refetchOnWindowFocus: false
  })

  const { mutate } = useMutation({
    mutationFn: syncEvents,
    onError: error => {
      localStorage.removeItem('GOOGLE_API_TOKEN')
      queryClient.invalidateQueries({queryKey: ['googleAuthToken']})
      
      navigate(location.pathname)
      toast.error(error.message)
    },
    onSuccess: data => {
      queryClient.invalidateQueries({queryKey: ['calendarEvents']})
      toast.success(data)
    }
  })

  const date = useSelectedDate()

  const eventsToSync = (events: EventList) => {
    const eventsToSync = events.filter(e => !e.sentToCalendar)
    return eventsToSync
  }

  const handleAuth = () => {
    if (!authUrl) return
    
    window.open(authUrl.url, '_self')
  }

  const handleSync = () => {
    if (!code) return
    mutate(code)
  }

  useEffect(() => {
    if (!codeFromPath) return

    localStorage.setItem('GOOGLE_API_TOKEN', codeFromPath)
    navigate(location.pathname)
  }, [codeFromPath])

  if (data) return (
    <div
      className='min-w-80 p-4 h-full flex flex-col gap-4'
    >
      <ul
        className="flex gap-2 flex-wrap"
      >
        <li className="flex-1">
          <button
            type="button"
            onClick={handleClick}
            className="bg-rose-700 py-2 text-white font-bold uppercase w-full hover:bg-rose-500 text-nowrap px-2"
          >Volver</button>
        </li>

        <li className="flex-1">
          <button
            type="button"
            onClick={() => navigate('?createEvent=true')}
            className="bg-rose-700 py-2 text-white font-bold uppercase w-full hover:bg-rose-500 text-nowrap px-2"
          >Añadir Cita</button>
        </li>

        {(code && data.length && eventsToSync(data).length) ? (
          <li className="flex-1">
            <button
              type="button"
              onClick={handleSync}
              className="bg-cyan-700 py-2 text-white font-bold uppercase w-full hover:bg-cyan-500 text-nowrap px-2"
            >Sincronizar Pendientes {eventsToSync(data).length}</button>
          </li>
        ) : null}

        {authUrl && !code && (
          <li className="flex-1">
          <button
            type="button"
            onClick={handleAuth}
            className="bg-cyan-700 py-2 text-white font-bold uppercase w-full hover:bg-cyan-500 text-nowrap px-2"
          >Accede con Google para Sincronizar</button>
        </li>
        )}
        
      </ul>

      {data.length ? (
        <AppointmenstList eventList={data} isoDate={date.toISOString()} />
      ) : (
        <div
          className="h-full flex flex-col justify-center border"
        >
          <p
            className="text-center text-sm text-rose-800 font-bold"
          >Aun no hay citas</p>
        </div>
      )}
    </div>
  )
}

export default SeeAppointmentsOption
