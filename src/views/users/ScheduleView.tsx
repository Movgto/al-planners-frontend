import AvailableTimes from "@/components/users/schedule/AvailableTimes"
import ScheduleModal from "@/components/users/schedule/ScheduleModal"
import UsersCalendar from "@/components/users/schedule/UsersCalendar"
import useAvailableDates from "@/hooks/useAvailableDates"
import { CalendarDate } from "@/types/index"
import { useMemo, useState } from "react"

const ScheduleView = () => {
  const [date, setDate] = useState<CalendarDate>(new Date())

  const { availableDates, availableTimes, isLoading } = useAvailableDates()

  const isAvailable = useMemo(() => {
    if (!date) return false
    const d = new Date(date.toDateString())

    d.setHours(0, 0, 0, 0)

    if (availableDates.includes(d.toDateString())) {
      return true
    }

    return false
  }, [date])

  return (
    <>
      <div
        className="flex flex-col gap-5 p-4 justify-center items-center my-10"
      >
        <h1
          className="text-2xl text-slate-700 font-bold"
        >Seleccione una fecha disponible para agendar su cita</h1>
        <div
          className="flex flex-col lg:flex-row"
        >
          <div className="flex-1">
            <UsersCalendar
              date={date}
              setDate={setDate}
              availableDates={availableDates}
              availableTimes={availableTimes}
              isLoading={isLoading}
            />
          </div>
          {isAvailable && (
            <AvailableTimes />
          )}
        </div>

      </div>
      <ScheduleModal />
    </>

  )
}

export default ScheduleView
