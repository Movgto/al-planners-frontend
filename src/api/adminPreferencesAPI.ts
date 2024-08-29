import api from "@/config/axios"
import { handleAxiosError } from "@/utils/api"

export const updateEventColor = async (colorId: string) => {
  const url = `/adminPreferences/eventColor/${colorId}`

  try {
    const {data} = await api.put(url)

    return data
  } catch (error) {
    handleAxiosError(error)
  }
}