import api from "./axios";

export const getPaymentSettings = async () => {
  const response = await api.get("/admin/setting/payment");
  return response.data;
};

export const updatePaymentSettings = async (data) => {
  const response = await api.put("/admin/setting/payment", data);
  return response.data;
};