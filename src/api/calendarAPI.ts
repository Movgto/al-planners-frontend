import api from '@/config/axios'
import {handleAxiosError} from '@/utils/api'
import { Availability, AvailabilityFormData, Event, EventFormData, EventType, EventTypeFormData, availabilityTimesSchema, eventListSchema, eventSchema, eventTypeSchema, eventTypesSchema } from '../types'

export const getAuthURL = async () => {
  const url = '/googleapi/auth-url'

  try {
    const {data} = await api(url)

    return data
  } catch (error) {
    handleAxiosError(error)
  }

}

export const getGoogleAPIEvents = async (code: string) => {
  const url = '/googleapi/events?code=' + code

  try {
    const {data} = await api(url)

    return data
  } catch (error) {
    handleAxiosError(error)
  }
}

export const getEvents = async () => {
  const url = '/events'

  try {
    const {data} = await api(url)

    const result = eventListSchema.safeParse(data)

    console.log(result)

    if (result.success) return result.data

  } catch (error) {
    handleAxiosError(error)
  }
}

export const getEvent = async (eventId: Event['_id']) => {
  
  const url = `/events/${eventId}`
  try {
    const {data} = await api(url)

    const result = eventSchema.safeParse(data)

    if (result.success) return result.data
  } catch (error) {
    handleAxiosError(error)
  }
}

export const syncEvents = async (code: string) => {
  const url = `/googleapi/syncEvents`
  try {
    const {data} = await api.post(url, {code})
  
    return data
    
  } catch (error) {
    handleAxiosError(error)
  }
}


export const createEvent = async (formData : EventFormData) => {
  const url = '/events'
  
  try {
    const {data} = await api.post(url, formData)
    
    return data
  } catch (error) {
    handleAxiosError(error)
  }
}

export const deleteEvent = async ({code, eventId} : DeleteEventParams) => {
  const url = `/googleapi/events/${eventId}`

  try {
    const {data} = await api.delete(url, {data: {code}})

    return data
  } catch (error) {
    handleAxiosError(error)
  }
}

// Event types api functions

export const getEventTypes = async () => {
  const url = '/eventTypes'

  try {
    const {data} = await api(url)

    const result = eventTypesSchema.safeParse(data)
    console.log(result)
    if (result.success) return result.data
  } catch (error) {
    handleAxiosError(error)
  }
}

export const getEventType = async (eventTypeId: EventType['_id']) => {
  const url = `/eventTypes/${eventTypeId}`

  try {
    const {data} = await api(url)

    const result = eventTypeSchema.safeParse(data)

    if (result.success) return result.data
  } catch (error) {
    handleAxiosError(error)
  }
}

export const createEventType = async (formData : EventTypeFormData) => {
  const url = '/eventTypes'

  try {

    console.log(formData)
    const {data} = await api.post(url, formData)

    return data as string

  } catch (error) {
    handleAxiosError(error)
  }
}

export const deleteEventType = async (eventTypeId: EventType['_id']) => {
  const url = `/eventTypes/${eventTypeId}`
  try {
    const {data} = await api.delete(url)

    return data
  } catch (error) {
    handleAxiosError(error)
  }
}

type DeleteEventParams = {
  code: string,
  eventId: string
}

// Availability times

export const createAvailableTime = async (formData: AvailabilityFormData) => {
  const url = '/availability'

  try {
    const {data} = await api.post(url, formData)

    return data
  } catch (error) {
    handleAxiosError(error)
  }
}

export const getAvailableTimes = async (isoDate: string) => {
  const url = `/availability/${isoDate}`

  try {
    const {data} = await api(url)

    const result = availabilityTimesSchema.safeParse(data)

    console.log('====== Available times ======')
    console.log(result)

    if (result.success) return result.data
    
  } catch (error) {
    handleAxiosError(error)
  }
}
export const getAllAvailableTimes = async (isoDate: string) => {
  const url = `/availability/${isoDate}`

  try {
    const {data} = await api.post(url)

    const result = availabilityTimesSchema.safeParse(data)

    if (result.success) return result.data
    
  } catch (error) {
    handleAxiosError(error)
  }
}

export const deleteAvailableTime = async (availabilityId: Availability['_id']) => {
  const url = `/availability/${availabilityId}`

  try {
    const {data} = await api.delete(url)

    return data
  } catch (error) {
    handleAxiosError(error)
  }
}