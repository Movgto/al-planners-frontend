import ax, {isAxiosError} from 'axios'

const {VITE_API_URL} = import.meta.env

const handleAxiosError = (error: unknown) => {
  if (isAxiosError(error) && error.response) {
    throw new Error(error.response.data.error)
  }
}

export const getAuthURL = async () => {
  const url = VITE_API_URL + '/api/googleapi/auth-url'

  try {
    const {data} = await ax(url)

    return data
  } catch (error) {
    handleAxiosError(error)
  }

}

export const getEvents = async (code: string) => {
  const url = VITE_API_URL + '/api/googleapi/events?code=' + code

  try {
    const {data} = await ax(url)

    return data
  } catch (error) {
    handleAxiosError(error)
  }
}