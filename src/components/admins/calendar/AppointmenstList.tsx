import { Event, EventList } from "@/types/index"
import { useEventsFromDate, useGApiCode } from "@/hooks/index"
import { useNavigate } from "react-router-dom"
import {formatHour} from '@/utils/index'
import { TrashIcon } from "@heroicons/react/24/outline"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteEvent } from "@/api/calendarAPI"
import { toast } from "react-toastify"

type AppointmenstListProps = {
  eventList: EventList,
  isoDate: string
}

const AppointmenstList = ({eventList, isoDate} : AppointmenstListProps) => {

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const eventsFromDate = useEventsFromDate(eventList, isoDate)

  const code = useGApiCode()

  const handleClick = (eventId: Event['_id']) => {
    navigate(`?seeAppoint=${eventId}`)
  }

  const classes = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ')
  }

  const { mutate } = useMutation({
    mutationFn: deleteEvent,
    onError: error => toast.error(error.message),
    onSuccess: data => {
      queryClient.invalidateQueries({queryKey: ['calendarEvents']})
      toast.success(data)
    }
  })

  const handleDelete = (eventId: string) => {
    if (!code) {
      toast.error('Tienes que acceder con Google antes de eliminar un evento')
      return
    }

    mutate({code, eventId})
  }

  return (
    <ul
      className="flex flex-col gap-2"
    >
      {eventsFromDate.length ? eventsFromDate.map(e => (
        <li
          className={classes(e.sentToCalendar ? 'bg-sky-200' : 'bg-red-200',
            "rounded-md border border-slate-300 font-semibold",
            "flex justify-between p-2 items-center hover:cursor-pointer hover:border-slate-800")}
          onClick={() => handleClick(e._id)}
        >
          <p>{e.summary}</p>

          <div          
            className="flex gap-2 text-sm text-slate-800 font-semibold"
          >
            <p>{formatHour(e.start.dateTime)}</p>{' - '}
            <p>{formatHour(e.end.dateTime)}</p>
          </div>
          <i
            className="text-red-600 hover:text-red-300 hover:cursor-pointer"
            onClick={() => handleDelete(e._id)}
          ><TrashIcon width="24px" height="24px" /></i>
        </li>
      )) : (
        <li
          className="text-rose-800 font-bold uppercase text-sm text-center"
        >Aun no hay citas en esta fecha</li>
      )}
    </ul>
  )
}

export default AppointmenstList
