import api from "./axios";


// Fetch rental history records
export const getRentalHistory = async () => {
  const response = await api.get("/admin/rental_history");
  return response.data
};

export const getBookings = async () => {
  const response = await api.get("/bookings");

  return response.data;
};

// Get booking by ID - for Edit
export const getBookingById = async (id) => {
  const response = await api.get(`/bookings/${id}`);

  return response.data;
};
export const getVehicles = async () => {
  const response = await api.get("/vehicle/getAll");
  return response.data;
};

export const getVehicleById = async (id) => {
  const response = await api.get(`/vehicle/getById/${id}`);
  return response.data;
};
