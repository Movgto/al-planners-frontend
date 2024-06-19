import { EventList } from "@/types/index"
import { useEventsFromDate } from "@/hooks/index"

type AppointmenstListProps = {
  eventList: EventList,
  isoDate: string
}

const AppointmenstList = ({eventList, isoDate} : AppointmenstListProps) => {

  const eventsFromDate = useEventsFromDate(eventList, isoDate)
  return (
    <ul>
      {eventsFromDate.map(e => (
        <li>
          {e.summary}
        </li>
      ))}
    </ul>
  )
}

export default AppointmenstList
