import { getEvents } from "@/api/calendarAPI"
import { AppointmentMenuOptionProps, CalendarDate } from "@/types/index"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import AppointmenstList from "./AppointmenstList"
import { useSelectedDate } from "@/hooks/index"

const SeeAppointmentsOption = ({setOption} : AppointmentMenuOptionProps) => {

  const navigate = useNavigate()

  const handleClick = () => {
    setOption('Inicio')
  }

  const {data} = useQuery({
    queryKey: ['calendarEvents'],
    queryFn: getEvents,
    refetchOnWindowFocus: false
  })

  const date = useSelectedDate()

  return (
    <div
      className='min-w-80 p-4 h-full'
    >
      <ul
        className="flex gap-2 border"
      >
        <li className="flex-1">
          <button
            type="button"
            onClick={handleClick}
            className="bg-rose-700 py-2 text-white font-bold uppercase w-full hover:bg-rose-500"
          >Volver</button>
        </li>

        <li className="flex-1">
          <button
            type="button"
            onClick={() => navigate('?createEvent=true')}
            className="bg-rose-700 py-2 text-white font-bold uppercase w-full hover:bg-rose-500"
          >Añadir Cita</button>
        </li>
      </ul>

      {data && data.length ? (
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
