import { getAvailableTimes, getEvents } from "@/api/calendarAPI"
import { useEventsFromDate, useSelectedDate } from "@/hooks/index"
import useAvailability from "@/hooks/useAvailability"
import { EventList, EventType } from "@/types/index"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { RangeAvailability } from "./ScheduleModal"
import { dateInTimezoneISO } from "@/utils/index"

type Props = {
  et: EventType
}

const EventTypeButton = ({et} : Props) => {

  const navigate = useNavigate()

  const date = useSelectedDate()

  const queryClient = useQueryClient()

  const { data: availableTimes } = useQuery({
    queryKey: ['availableTimes', date],
    queryFn: () => getAvailableTimes(date.toISOString())
  })

  const { data } = useQuery({
    queryKey: ['calendarEvents'],
    queryFn: getEvents
  })

  const events = useMemo<EventList | undefined>(() => {
    if (!data || !date) return undefined
    return useEventsFromDate(data, dateInTimezoneISO(date))
  }, [data, date])

  const availability = useAvailability({availableTimes, et, events})

  const handleClick = (eventType: EventType) => {
    console.log(eventType)
    queryClient.setQueryData<RangeAvailability[]>(['availability', date.toISOString() + et._id], val => {
      if (!availability) return val

      return availability
    })

    navigate(location.pathname + `?eventType=${eventType._id}`)
  }

  const classes = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ')
  }

  if (availability) return (
    <li
      key={et._id}
      className={classes(" rounded-lg p-2  text-slate-500 font-bold",
        availability.length ? 'bg-white hover:cursor-pointer hover:border hover:border-slate-500' : 'bg-slate-400/40'
      )}     
    >
      <button
        type="button"
        className="flex justify-between w-full items-center"
        onClick={() => handleClick(et)}
        disabled={availability.length < 1}
      >
        <p>{et.name}</p>        
        {availability.length ? (
          <p>{et.duration}hrs</p>
        ) : (
          <p className="text-sm font-thin">No Disponible</p>
        )}
      </button>

    </li>
  )
}

export default EventTypeButton
