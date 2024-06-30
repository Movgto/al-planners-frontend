import { deleteAvailableTime, getAvailableTimes } from '@/api/calendarAPI'
import { useSelectedDate } from '@/hooks/index'
import { Availability } from '@/types/index'
import { dateInTimezoneISO, formatHour } from '@/utils/index'
import { TrashIcon } from '@heroicons/react/24/outline'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AvailabilityTab = () => {

  const selectedDate = useSelectedDate()

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['availabilityTimes', selectedDate.toISOString()],
    queryFn: () => getAvailableTimes(dateInTimezoneISO(selectedDate))
  })

  const { mutate } = useMutation({
    mutationFn: deleteAvailableTime,
    onError: error => toast.error(error.message),
    onSuccess: data => {
      queryClient.invalidateQueries({queryKey: ['availabilityTimes', selectedDate.toISOString()]})
      toast.success(data)
    }
  })

  const handleClick = () => {
    navigate('?createAvailability=true')
  }

  const handleDelete = (availabilityId: Availability['_id']) => {
    mutate(availabilityId)
  }

  if (isLoading) return 'Obteniendo tiempos de disponibilidad'

  if (isError) return error.message

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
          >Abrir Disponibilidad</button>
        </li>
      </ul>

      {data.length ? (
        <ul
          className="flex flex-col gap-2"
        >
          {data.map(a => (
            <li
              className="bg-white text-center text-slate-600
                          font-bold p-2 flex justify-between items-center"
            >
              <p>{formatHour(a.startTime)} - {formatHour(a.endTime)}</p>
              
              <i
                className='text-red-600 hover:cursor-pointer hover:text-red-300'
              ><TrashIcon height='24px' width='24px' onClick={() => handleDelete(a._id)} /></i>              
            </li>
          ))}
        </ul>
      )
      : (
        <p>No hay tiempos de disponibilidad en esta fecha</p>
      )}
    </div>
  )
}

export default AvailabilityTab
