import api from "./axios";

const API_URL = "/favorites";

export const addFavorite = async (vehicleId) => {
  const response = await api.post(`${API_URL}/${vehicleId}`);
  return response.data;
};

export const removeFavorite = async (vehicleId) => {
  const response = await api.delete(`${API_URL}/${vehicleId}`);
  return response.data;
};

export const checkFavorite = async (vehicleId) => {
  const response = await api.get(`${API_URL}/check/${vehicleId}`);
  return response.data;
};

export const getFavorites = async () => {
  const response = await api.get(API_URL);
  return response.data;
};