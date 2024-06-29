import { getEventTypes } from "@/api/calendarAPI"
import { useQuery } from "@tanstack/react-query"
import EventTypeButton from "./EventTypeButton"

const AvailableTimes = () => {  

  const {data: eventTypes} = useQuery({
    queryKey: ['eventTypes'],
    queryFn: getEventTypes
  })

  if (eventTypes && eventTypes.length) return (
    <div
      className="flex flex-col gap-10 flex-1 bg-cyan-100 px-10 py-4"
    >
      <h2
        className="text-xl font-bold text-slate-600"
      >Elije el tipo de cita</h2>
      <ul
        className="flex flex-col gap-4"
      >
        {eventTypes.map(et => (
          <EventTypeButton et={et} />
        ))}
      </ul>
    </div>
  )
}

export default AvailableTimes
