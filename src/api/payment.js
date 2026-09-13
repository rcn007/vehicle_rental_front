import api from "./axios";

// Helper to extract data from ApiResponse { message, status, data }
const extractData = (response) => {
  return response.data?.data !== undefined ? response.data.data : response.data;
};

// ============================================================================
// PAYMENT ENDPOINTS (/api/payments)
// ============================================================================

// Get all payments
export const getPayments = async () => {
  const response = await api.get("/payments");
  return extractData(response);
};

// Get payment by ID
export const getPaymentById = async (id) => {
  const response = await api.get(`/payments/${id}`);
  return extractData(response);
};

// Get payment by booking ID
export const getPaymentByBooking = async (bookingId) => {
  const response = await api.get(`/payments/booking/${bookingId}`);
  return response.data;
};

// Create payment
export const createPayment = async (paymentData) => {
  const response = await api.post("/payments", paymentData);
  return extractData(response);
};

// Update payment
export const updatePayment = async (id, paymentData) => {
  const response = await api.put(`/payments/${id}`, paymentData);
  return extractData(response);
};

// Delete payment
export const deletePayment = async (id) => {
  const response = await api.delete(`/payments/${id}`);
  return response.data;
};

// Create Bakong Payment (QR Code)
export const createBakongPayment = async (bakongData) => {
  const response = await api.post("/payments/bakong/create", bakongData);
  return response.data;
};

// Check Bakong Payment Status
export const checkBakongPaymentStatus = async (paymentId) => {
  const response = await api.get(`/payments/bakong/${paymentId}/status`);
  return response.data;
};


// ============================================================================
// PAYMENT METHOD ENDPOINTS (/api/paymentMethods)
// ============================================================================

// Get all payment methods
export const getPaymentMethods = async () => {
  const response = await api.get("/paymentMethods");
  return extractData(response);
};

// Get payment method by ID
export const getPaymentMethodById = async (id) => {
  const response = await api.get(`/paymentMethods/${id}`);
  return extractData(response);
};

// Create payment method
export const createPaymentMethod = async (methodData) => {
  const response = await api.post("/paymentMethods", methodData);
  return extractData(response);
};

// Update payment method
export const updatePaymentMethod = async (id, methodData) => {
  const response = await api.put(`/paymentMethods/${id}`, methodData);
  return extractData(response);
};

// Delete payment method
export const deletePaymentMethod = async (id) => {
  const response = await api.delete(`/paymentMethods/${id}`);
  return response.data;
};