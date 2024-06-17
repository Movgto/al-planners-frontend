import { CalendarTab } from "@/types/index"
import AvailabilityTab from "./AvailabilityTab"
import AppointmentsTab from "./AppointmentsTab"

type CalendarTabsProps = {
  tab: CalendarTab,
}

const CalendarTabs = ({tab} : CalendarTabsProps) => {
  if(tab === 'Citas') return <AppointmentsTab />

  if(tab === 'Disponibilidad') return <AvailabilityTab />

  return null
}

export default CalendarTabs
