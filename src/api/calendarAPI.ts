import ax from 'axios'
import {handleAxiosError} from '@/utils/api'
import { Availability, AvailabilityFormData, Event, EventFormData, EventType, EventTypeFormData, availabilityTimesSchema, eventListSchema, eventSchema, eventTypesSchema } from '../types'

const {VITE_API_URL} = import.meta.env

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

export const getEvent = async (eventId: Event['_id']) => {
  
  const url = VITE_API_URL + `/api/events/${eventId}`
  try {
    const {data} = await ax(url)

    const result = eventSchema.safeParse(data)

    if (result.success) return result.data
  } catch (error) {
    handleAxiosError(error)
  }
}

export const syncEvents = async (code: string) => {
  const url = VITE_API_URL + `/api/googleapi/syncEvents`
  try {
    const {data} = await ax.post(url, {code})
  
    return data
    
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

type DeleteEventParams = {
  code: string,
  eventId: string
}

export const deleteEvent = async ({code, eventId} : DeleteEventParams) => {
  const url = VITE_API_URL + `/api/googleapi/events/${eventId}`

  try {
    const {data} = await ax.delete(url, {data: {code}})

    return data
  } catch (error) {
    handleAxiosError(error)
  }
}

// Availability times

export const createAvailableTime = async (formData: AvailabilityFormData) => {
  const url = VITE_API_URL + '/api/availability'

  try {
    const {data} = await ax.post(url, formData)

    return data
  } catch (error) {
    handleAxiosError(error)
  }
}

export const getAvailableTimes = async (isoDate: string) => {
  const url = VITE_API_URL + `/api/availability/${isoDate}`

  try {
    const {data} = await ax(url)

    const result = availabilityTimesSchema.safeParse(data)

    if (result.success) return result.data
    
  } catch (error) {
    handleAxiosError(error)
  }
}

export const deleteAvailableTime = async (availabilityId: Availability['_id']) => {
  const url = VITE_API_URL + `/api/availability/${availabilityId}`

  try {
    const {data} = await ax.delete(url)

    return data
  } catch (error) {
    handleAxiosError(error)
  }
}