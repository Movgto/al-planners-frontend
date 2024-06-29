import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { getAllAvailableTimes } from "@/api/calendarAPI"

const useAvailableDates = () => {
  const {data: availableTimes} = useQuery({
    queryKey: ['allAvailableTimes'],
    queryFn: () => getAllAvailableTimes(new Date().toISOString())
  })

  const availableDates = useMemo(() => {

    console.log(availableTimes)
    if (!availableTimes) return []

    if (!availableTimes.length) return []

    const availableDates = availableTimes.map(a => {
      const date = new Date(a.startTime)

      date.setHours(0,0,0,0)

      return date.toDateString()
    })

    const availableUniqueDates : string[] = []

    for (const date of availableDates) {
      if (!availableUniqueDates.includes(date)) {
        availableUniqueDates.push(date)
      }
    }

    console.log(availableUniqueDates)

    return availableUniqueDates
  }, [availableTimes])

  return {availableDates, availableTimes}
}

export default useAvailableDates