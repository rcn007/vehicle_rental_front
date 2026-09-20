import api from "./axios"

export const getNotifications = async (userId) => {
  const response = await api.get(
    `/admin/notification/${userId}`
  )

  return response.data.data
}

export const getUnreadCount = async (userId) => {
  const response = await api.get(
    `/admin/notification/${userId}/count`
  )

  return response.data.data
}