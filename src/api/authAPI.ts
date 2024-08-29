import { LoginFormData, SignUpFormData, adminPreferencesSchema, adminShortSchema, adminsList } from "@/types/auth"
import { handleAxiosError } from "@/utils/api"
import api from "@/config/axios"

export const adminSignUp = async (formData: SignUpFormData) => {
  const url = '/auth/admins/signup'

  try {
    const { data } = await api.post(url, formData)

    return data
  } catch (error) {
    handleAxiosError(error)
  }
}

export const adminLogin = async (formData: LoginFormData) => {
  const url = '/auth/admins/login'

  try {
    const { data } = await api.post(url, formData)

    localStorage.setItem('ALPLANNERS_AUTH_TOKEN', data)

    return 'Bienvenido!'
  } catch (error) {
    handleAxiosError(error)
  }
}

export const getAdmin = async () => {
  const url = '/auth/admins'

  try {
    const { data } = await api(url)

    const result = adminShortSchema.safeParse(data)

    if (result.success) return result.data

  } catch (error) {
    handleAxiosError(error)
  }
}

export const getAdmins = async () => {
  const url = '/auth/adminsList'

  try {
    const { data } = await api(url)
    
    const result = adminsList.safeParse(data)

    if (result.success) return result.data    

  } catch (error) {
    handleAxiosError(error)
  }
}

export const getAdminPreferences = async () => {
  const url = '/auth/admins/preferences'

  try {
    const {data} = await api(url)

    const result = adminPreferencesSchema.safeParse(data)

    if (result.success) return result.data
  } catch (error) {
    handleAxiosError(error)
  }
}