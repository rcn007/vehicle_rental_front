import api from "./axios";

// ==========================================
// Get Admin Report
// ==========================================
export const getReport = async () => {
  const response = await api.get("/admin/report");
  return response.data;
};

// ==========================================
// Get All Vehicles
// ==========================================
export const getVehicles = async () => {
  const response = await api.get("/vehicle/getAll");
  return response.data;
};

// ==========================================
// Get Vehicle By ID
// ==========================================
export const getVehicleById = async (id) => {
  const response = await api.get(`/vehicle/getById/${id}`);
  return response.data;
};

// ==========================================
// Get All Bookings
// ==========================================
export const getBookings = async () => {
  const response = await api.get("/bookings");
  return response.data;
};

// ==========================================
// Get Booking By ID
// ==========================================
export const getBookingById = async (id) => {
  const response = await api.get(`/bookings/${id}`);
  return response.data;
};