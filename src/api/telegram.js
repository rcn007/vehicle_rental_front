import api from './axios'

export const connectTelegram = async (userId) => {
  const response = await api.post(
    `/telegram/connect/${userId}`
  )

  return response.data
}