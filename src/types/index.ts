import {z} from 'zod'
import { adminShortSchema } from './auth'

//Calendar types

export const calendarTabs = [
  'Disponibilidad',
  'Citas',
  'Preferencias',
] as const

const calendarTabsSchema = z.enum(calendarTabs)

export type CalendarTab = z.infer<typeof calendarTabsSchema>

export type CalendarDate = Date | null

// Availability types

export const availabilityTimeSchema = z.object({
  _id: z.string(),
  startTime: z.string(),
  endTime: z.string()
})

export const availabilityTimesSchema = z.array(availabilityTimeSchema)

export type Availability = z.infer<typeof availabilityTimeSchema>

export type AvailabilityFormData = Pick<Availability, 'startTime'|'endTime'>

export const dayTimes = [
  'am',
  'pm'
] as const

const dayTimeSchema = z.enum(dayTimes)
export type DayTime = z.infer<typeof dayTimeSchema>


// Events types

export const eventSchema = z.object({
  _id: z.string(),
  summary: z.string(),
  start: z.object({
    dateTime: z.string()    
  }),
  end: z.object({
    dateTime: z.string()    
  }),
  sentToCalendar: z.boolean(),
  attendees: z.array(z.object({
    name: z.string(),
    email: z.string()
  })),
  admin: adminShortSchema
})

export const eventFormDataSchema = z.object({
  summary: z.string(),
  start: z.object({
    dateTime: z.string()    
  }),
  end: z.object({
    dateTime: z.string()    
  }),
  sentToCalendar: z.boolean(),
  attendees: z.array(z.object({
    name: z.string(),
    email: z.string()
  })),
  admin: z.string()
})

export const eventListSchema = z.array(eventSchema)

export type EventList = z.infer<typeof eventListSchema>

export type Event = z.infer<typeof eventSchema>

export type EventFormData = z.infer<typeof eventFormDataSchema>

export type ClientEventFormData = {
  name1: string
  name2: string
  email: string
}

export const eventTypeSchema = z.object({
  _id: z.string(),
  name: z.string(),
  duration: z.number()
})

export const eventTypesSchema = z.array(eventTypeSchema)

export type EventTypes = z.infer<typeof eventTypesSchema>

export type EventType = z.infer<typeof eventTypeSchema>

export type EventTypeFormData = Pick<EventType, 'name'|'duration'>

export const appointmentTabOptions = [
  'Inicio',
  'Ver Citas',
  'Tipos de Cita'
] as const

const appointmentTabOptionSchema = z.enum(appointmentTabOptions)

export type AppointmentTabOption = z.infer<typeof appointmentTabOptionSchema>

export type AppointmentMenuOptionProps = {
  setOption: React.Dispatch<React.SetStateAction<AppointmentTabOption>>
}