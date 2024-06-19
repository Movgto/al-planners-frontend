import {z} from 'zod'

//Calendar types

export type CalendarDate = Date | null
export type CalendarFormData = {
  startTime: number
  endTime: number
}

export const calendarTabs = [
  'Disponibilidad',
  'Citas',
] as const

const CalendarTabsSchema = z.enum(calendarTabs)

export type CalendarTab = z.infer<typeof CalendarTabsSchema>

// Events types

const eventSchema = z.object({
  summary: z.string(),
  start: z.object({
    dateTime: z.string()    
  }),
  end: z.object({
    dateTime: z.string()    
  }),
  sentToCalendar: z.boolean()
})

export const eventListSchema = z.array(eventSchema)

export type EventList = z.infer<typeof eventListSchema>

export type Event = z.infer<typeof eventSchema>

export type EventFormData = Pick<Event, 'summary'|'start'|'end'|'sentToCalendar'>

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