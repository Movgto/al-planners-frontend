import { z } from "zod"

const authSchema = z.object({
  _id: z.string(),
  name: z.string(),
  password: z.string(),
  password_confirmation: z.string(),
  email: z.string(),
  confirmed: z.boolean(),
  admin: z.boolean()
})

const adminSchema = authSchema.pick({
  _id: true,
  name: true,
  password: true,
  email: true,
})

export const adminShortSchema = adminSchema.pick({
  _id: true,
  name: true,
  email: true
})

export const adminsList = z.array(adminShortSchema)

type Auth = z.infer<typeof authSchema>
type Admin = z.infer<typeof adminSchema>

export type AdminShort = z.infer<typeof adminShortSchema>
export type LoginFormData = Pick<Admin, 'email' | 'password'>
export type SignUpFormData = Pick<Auth, 'email' | 'password' | 'password_confirmation'>

// Admins preferences types

export const adminPreferencesSchema = z.object({
  admin: z.string(),
  eventColorId: z.string()
})

export type AdminPreferences = z.infer<typeof adminPreferencesSchema>

export const eventColors: { [key: string]: {color: string, className: string} } = {
  "1": {
    color: '#7986CB',
    className: 'event-color-1'
  },
  "2": {
    color: '#33B679',
    className: 'event-color-2'
  },
  "3": {
    color: '#8E24AA',
    className: 'event-color-3'
  },
  "4": {
    color: '#E67C73',
    className: 'event-color-4'
  },
  "5": {
    color: '#F6BF26',
    className: 'event-color-5'
  },
  "6": {
    color: '#F4511E',
    className: 'event-color-6'
  },
  "7": {
    color: '#039BE5',
    className: 'event-color-7'
  },
  "8": {
    color: '#616161',
    className: 'event-color-8'
  },
  "9": {
    color: '#3F51B5',
    className: 'event-color-9'
  },
  "10": {
    color: '#0B8043',
    className: 'event-color-10'
  },
  "11": {
    color: '#D50000',
    className: 'event-color-11'
  }
}