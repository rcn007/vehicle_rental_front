import api from "./axios"

export const getNotificationSettings = async () => {
  const response = await api.get(
    '/admin/setting/notification'
  )

  return response.data.data
}

export const updateNotificationSettings = async (data) => {
  const response = await api.put(
    '/admin/setting/notification',
    data
  )

  return response.data.data
}

export const getNotifications = async (userId) => {
  const response = await api.get(
    `/admin/notification/${userId}`
  )

  return response.data.data
}