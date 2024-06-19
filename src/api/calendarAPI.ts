import ax, {isAxiosError} from 'axios'
import { EventFormData, EventType, EventTypeFormData, eventListSchema, eventTypesSchema } from '../types'

const {VITE_API_URL} = import.meta.env

const handleAxiosError = (error: unknown) => {
  if (isAxiosError(error) && error.response) {
    throw new Error(error.response.data.error)
  }
}

export const getAuthURL = async () => {
  const url = VITE_API_URL + '/api/googleapi/auth-url'

  try {
    const {data} = await ax(url)

    return data
  } catch (error) {
    handleAxiosError(error)
  }

}

export const getGoogleAPIEvents = async (code: string) => {
  const url = VITE_API_URL + '/api/googleapi/events?code=' + code

  try {
    const {data} = await ax(url)

    return data
  } catch (error) {
    handleAxiosError(error)
  }
}

export const getEvents = async () => {
  const url = VITE_API_URL + '/api/events'

  try {
    const {data} = await ax(url)

    const result = eventListSchema.safeParse(data)

    console.log(result)

    if (result.success) return result.data

  } catch (error) {
    handleAxiosError(error)
  }
}

export const getEventTypes = async () => {
  const url = VITE_API_URL + '/api/eventTypes'

  try {
    const {data} = await ax(url)

    const result = eventTypesSchema.safeParse(data)
    console.log(result)
    if (result.success) return result.data
  } catch (error) {
    handleAxiosError(error)
  }
}

export const createEvent = async (formData : EventFormData) => {
  const url = VITE_API_URL + '/api/events'

  try {
    const {data} = await ax.post(url, formData)

    return data
  } catch (error) {
    handleAxiosError(error)
  }
}

export const createEventType = async (formData : EventTypeFormData) => {
  const url = VITE_API_URL + '/api/eventTypes'

  try {

    console.log(formData)
    const {data} = await ax.post(url, formData)

    return data as string

  } catch (error) {
    handleAxiosError(error)
  }
}

export const deleteEventType = async (eventTypeId: EventType['_id']) => {
  const url = VITE_API_URL + `/api/eventTypes/${eventTypeId}`
  try {
    const {data} = await ax.delete(url)

    return data
  } catch (error) {
    handleAxiosError(error)
  }
}