import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { getAllAvailableTimes } from "@/api/calendarAPI"
import { dateInTimezone } from "../utils"

const useAvailableDates = () => {
  const {data: availableTimes, isLoading} = useQuery({
    queryKey: ['allAvailableTimes'],
    queryFn: () => getAllAvailableTimes(dateInTimezone(new Date()).toISOString()),
    refetchOnWindowFocus: false,
    retry: 3
  })

  const availableDates = useMemo(() => {

    console.log(availableTimes)
    if (!availableTimes) return []

    if (!availableTimes.length) return []

    const availableDates = availableTimes.map(a => {
      const date = dateInTimezone(new Date(a.startTime))

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

  return {availableDates, availableTimes, isLoading}
}

export default useAvailableDates