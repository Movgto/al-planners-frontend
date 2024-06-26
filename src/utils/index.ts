import { DateTime } from "luxon"

export const classes = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}

export const getDateInTimezone = (timeNumber: number) => {
  return DateTime.fromISO(new Date(timeNumber).toISOString(), {zone: import.meta.env.VITE_TIMEZONE}).toISO()!
}

export const dateInTimezone = (date: Date) => {
  return new Date(date.toLocaleString('en-US', {timeZone: import.meta.env.VITE_TIMEZONE}))
}

export const dateInTimezoneISO = (date: Date) => {
  return date.toLocaleString('en-US', {timeZone: import.meta.env.VITE_TIMEZONE})
}

export const formatHour = (isoDate: string) => {
  const date = new Date(isoDate)

  const hour = date.getHours()

  const dayTime = hour <= 11 ? 'am' : 'pm'

  const formatHour = hour <= 12 ? hour : hour - 12

  return formatHour + dayTime
}

export const formatHourNum = (hour: number) => {
  const dayTime = hour <= 11 ? 'am' : 'pm'

  const formatHour = hour <= 12 ? hour : hour - 12

  return formatHour + dayTime
}

export const dateFormater = (isoDate: string) => {
  const date = new Date(isoDate)
  const displayDate = new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  }).format(date)
  return displayDate
}

export const emailRegex = /^[a-z0-9._-]+@[a-z0-9._-]+.[a-z]+$/i