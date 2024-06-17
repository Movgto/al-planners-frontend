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

export type Event = z.infer<typeof eventSchema>

export type EventFormData = Pick<Event, 'summary'|'start'|'end'|'sentToCalendar'>

const eventTypeSchema = z.object({
  name: z.string(),
  duration: z.number()
})

export const eventTypesSchema = z.array(eventSchema)

export type EventTypes = z.infer<typeof eventTypesSchema>

export type EventType = z.infer<typeof eventTypeSchema>

export type EventTypeFormData = Pick<EventType, 'name'|'duration'>