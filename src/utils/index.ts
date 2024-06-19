import { DateTime } from "luxon"

export const classes = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}

export const getDateInTimezone = (timeNumber: number) => {
  return DateTime.fromISO(new Date(timeNumber).toISOString(), {zone: 'America/Mexico_City'}).toISO()!
}