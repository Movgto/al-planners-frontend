import { LoginFormData, SignUpFormData, userShortSchema } from "@/types/auth"
import { handleAxiosError } from "@/utils/api"
import api from "@/config/axios"

export const adminSignUp = async (formData: SignUpFormData) => {
  const url = '/auth/admins/signup'

  try {
    const {data} = await api.post(url, formData)

    return data
  } catch (error) {
    handleAxiosError(error)
  }
}

export const adminLogin = async (formData: LoginFormData) => {
  const url = '/auth/admins/login'

  try {
    const {data} = await api.post(url, formData)

    localStorage.setItem('ALPLANNERS_AUTH_TOKEN', data)

    return 'Bienvenido!'
  } catch (error) {
    handleAxiosError(error)
  }
}

export const getAdmin = async () => {
  const url = '/auth/admins'

  try {
    const {data} = await api(url)

    const result = userShortSchema.safeParse(data)

    if (result.success) return result.data

  } catch (error) {
    handleAxiosError(error)
  }
}