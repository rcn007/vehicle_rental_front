import api from "./axios";

// --- VEHICLE ENDPOINTS ---

export const getVehicles = async () => {
  const response = await api.get("/vehicle/getAll");
  return response.data;
};

export const getVehicleById = async (id) => {
  const response = await api.get(`/vehicle/getById/${id}`);
  return response.data;
};

export const createVehicle = async (vehicleData) => {
  const response = await api.post("/vehicle/create", vehicleData);
  return response.data;
};

// Fixed endpoint typo (/vechile -> /vehicle) and parameter syntax
export const updateVehicle = async (id, vehicleData) => {
  const response = await api.put(`/vehicle/update/${id}`, vehicleData);
  return response.data;
};

// Added missing semicolon
export const deleteVehicle = async (id) => {
  const response = await api.delete(`/vehicle/delete/${id}`);
  return response.data;
};

// --- META ENDPOINTS ---

export const getBrand = async () => {
  const response = await api.get("/brands/getAll");
  return response.data;
};

export const getCategory = async () => {
  const response = await api.get("/categories/getAll");
  return response.data;
};

// --- VEHICLE IMAGE ENDPOINTS ---

export const getVehiclesImage = async () => {
  const response = await api.get("/vehicle_image/getAll");
  return response.data;
};

export const getVehicleImageById = async (id) => {
  const response = await api.get(`/vehicle_image/getById/${id}`);
  return response.data;
};

export const createVehicleImage = async (imageData) => {
  const response = await api.post("/vehicle_image/create", imageData);
  return response.data;
};

export const updateVehicleImage = async (id, imageData) => {
  const response = await api.put(`/vehicle_image/update/${id}`, imageData);
  return response.data;
};

export const deleteVehicleImage = async (id) => {
  const response = await api.delete(`/vehicle_image/delete/${id}`);
  return response.data;
};
