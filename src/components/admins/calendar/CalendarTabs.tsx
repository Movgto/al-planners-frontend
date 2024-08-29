import { CalendarTab } from "@/types/index"
import AvailabilityTab from "./AvailabilityTab"
import AppointmentsTab from "./AppointmentsTab"
import PreferencesTab from "./PreferencesTab"

type CalendarTabsProps = {
  tab: CalendarTab,
}

const CalendarTabs = ({tab} : CalendarTabsProps) => {
  if(tab === 'Citas') return <AppointmentsTab />

  if(tab === 'Disponibilidad') return <AvailabilityTab />

  if(tab === 'Preferencias') return <PreferencesTab />

  return null
}

export default CalendarTabs
