import api from './axios'

// ============================================================
// CUSTOMIZER
// ============================================================

export const getCustomizerSettings = async () => {
  const response = await api.get('/admin/setting/customizer')

  return response?.data?.data ?? response?.data
}

// ============================================================
// CATEGORY
// ============================================================

export const getCategories = async () => {
  const response = await api.get('/categories/getAll')

  return response.data
}

export const getCategoryById = async (id) => {
  const response = await api.get(`/categories/getById/${id}`)

  return response.data
}

// ============================================================
// VEHICLE
// ============================================================

export const getVehicles = async () => {
  const response = await api.get('/vehicle/getAll')

  return response.data
}

export const getVehicleById = async (id) => {
  const response = await api.get(`/vehicle/getById/${id}`)

  return response.data
}

// ============================================================
// VEHICLE IMAGE
// ============================================================

export const getVehiclesImage = async () => {
  const response = await api.get('/vehicle_image/getAll')

  return response.data
}

export const getVehicleImageById = async (id) => {
  const response = await api.get(`/vehicle_image/getById/${id}`)

  return response.data
}