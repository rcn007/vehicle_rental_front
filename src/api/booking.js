import api from "./axios";

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

// Create booking
export const createBooking = async (bookingData) => {
  const response = await api.post("/bookings", bookingData);

  return response.data;
};

// Update booking
export const updateBooking = async (id, bookingData) => {
  const response = await api.put(`/bookings/${id}`, bookingData);

  return response.data;
};

// Get all customers/users
export const getCustomers = async () => {
  const response = await api.get("/users/get");

  return response.data;
};

// Get all vehicles
export const getVehicles = async () => {
  const response = await api.get("/vehicle/getAll");

  return response.data;
};

// Delete booking

export const deleteBooking = async (id) => {
  const response = await api.put(`/bookings/${id}`)
  return response.data
}
export const cancelBooking = async (id) => {
  const response = await api.put(`/bookings/${id}/cancel`);

  return response.data;
};


export const getMyBookings = () => {
  return api.get('/bookings/my')
}
// Get vehicle booked/rented dates
export const getVehicleAvailability = async (vehicleId) => {
  const response = await api.get(
    `/bookings/vehicle/${vehicleId}/availability`
  );

  return response.data;
};
