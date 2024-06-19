import { deleteEventType, getEventTypes } from "@/api/calendarAPI"
import { AppointmentMenuOptionProps, EventType } from "@/types/index"
import { TrashIcon } from "@heroicons/react/24/outline"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const EventTypesOption = ({setOption} : AppointmentMenuOptionProps) => {

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const {data} = useQuery({
    queryKey: ['eventTypes'],
    queryFn: getEventTypes,        
  })

  const {mutate} = useMutation({
    mutationFn: deleteEventType,
    onError: error => toast.error(error.message),
    onSuccess: data => {
      queryClient.invalidateQueries({queryKey: ['eventTypes']})
      toast.success(data)
    }
  })

  const handleClick = () => {
    setOption('Inicio')
  }

  const handleDelete = (eventTypeId: EventType['_id']) => {
    mutate(eventTypeId)
  }

  if (data && data.length) return (
    <div
      className='flex-1 flex flex-col gap-4 p-4'
    >
      <ul
        className="flex gap-2 border"
      >
        <li>
          <button
            type="button"
            onClick={handleClick}
            className="bg-rose-700 p-2 text-white font-bold uppercase w-full hover:bg-rose-500"
          >Volver</button>
        </li>

        <li className="flex-1">
          <button
            type="button"
            onClick={() => navigate('?createEventType=true')}
            className="bg-rose-700 p-2 text-white font-bold uppercase w-full hover:bg-rose-500 text-nowrap"
          >Crear Tipo de Evento</button>
        </li>
      </ul>

      <h2
        className="text-center text-slate-700 font-bold text-lg"
      >Tipos de evento</h2>
      <ul
        className="flex flex-col gap-2"
      >
        {data.map(et => (
          <li
            className="rounded-md border
                    border-slate-300 bg-white font-semibold
                    flex justify-between p-2 items-center"
          >
            <p>{et.name}</p>
            <button
              title="delete button"
              type="button"
              onClick={() => handleDelete(et._id)}
            >
              <TrashIcon height="24px" width="24px" className="text-red-600 hover:text-red-400"/>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default EventTypesOption