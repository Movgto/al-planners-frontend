import { useQuery, useQueryClient } from "@tanstack/react-query"
import { CalendarDate, EventList } from "../types"
import { useMemo } from "react"
import { getAuthURL } from "@/api/calendarAPI"
import { useLocation } from "react-router-dom"
import { dateInTimezone } from "../utils"

export const useEventsFromDate = (eventList: EventList, isoDate: string) => {

  const date = dateInTimezone(new Date(isoDate))

  const year = date.getFullYear()

  const month = date.getMonth()
  
  return eventList.filter(e => {
    const eDate =  new Date(e.start.dateTime)

    const eMonth = eDate.getMonth()

    const eYear = eDate.getFullYear()

    console.log(date, eDate)

    if (year !== eYear || month !== eMonth) return false

    if (eDate.getDate() === date.getDate()) {
      return true
    }

    return false
  })
}

export const useSelectedDate = () => {

  const queryClient = useQueryClient()

  const {data: currentDate} = useQuery({
    queryKey: ['selectedDate'],
    queryFn: () => queryClient.getQueryData<CalendarDate>(['selectedDate'])
  })

  const date = useMemo(() => {
    if (currentDate) return currentDate

    return dateInTimezone(new Date())
  }, [currentDate])

  return date
}

export const useAuthUrl = () => {
  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['authURL'],
    queryFn: getAuthURL,
    refetchOnWindowFocus: false
  })

  return {data, isLoading, isError, error}
}

export const useGApiCode = () => {
  const location = useLocation()

  const searchParams = new URLSearchParams(location.search)

  const code = searchParams.get('code')

  return code
} 