import api from "./axios";

export const getDashboard = async () => {
  const response = await api.get('/admin/dashboard')
  return response.data
}

// Get all bookings
export const getBookings = async () => {
  const response = await api.get("/bookings");

  return response.data;
};

// Get booking by ID - for Edit
export const getBookingById = async (id) => {
  const response = await api.get(`/bookings/${id}`);

  return response.data;
};