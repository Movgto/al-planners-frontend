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

const userSchema = authSchema.pick({
  _id: true,
  name: true,
  password: true,
  email: true,
  confirmed: true,
  admin: true
})

export const userShortSchema = userSchema.pick({
  _id: true,
  name: true,
  email: true
})

type Auth = z.infer<typeof authSchema>
type User = z.infer<typeof userSchema>

export type UserShort = z.infer<typeof userShortSchema>
export type LoginFormData = Pick<User, 'email'|'password'>
export type SignUpFormData = Pick<Auth, 'email'|'password'|'password_confirmation'>