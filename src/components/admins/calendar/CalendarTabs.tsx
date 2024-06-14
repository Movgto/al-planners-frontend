import { CalendarTab } from "@/types/index"
import AvailabilityTab from "./AvailabilityTab"
import SyncTab from "./SyncTab"

type CalendarTabsProps = {
  tab: CalendarTab,
}

const CalendarTabs = ({tab} : CalendarTabsProps) => {
  if(tab === 'Citas') return 'Citas en construccion'

  if(tab === 'Sincronizar') return <SyncTab />

  if(tab === 'Disponibilidad') return <AvailabilityTab />

  return null
}

export default CalendarTabs
