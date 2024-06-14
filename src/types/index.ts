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