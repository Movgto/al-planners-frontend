import { CalendarTab } from "@/types/index"
import AvailabilityTab from "./AvailabilityTab"

type CalendarTabsProps = {
  tab: CalendarTab,
}

const CalendarTabs = ({tab} : CalendarTabsProps) => {
  if(tab === 'Citas') return 'Citas en construccion'

  if(tab === 'Disponibilidad') return <AvailabilityTab />

  return null
}

export default CalendarTabs
