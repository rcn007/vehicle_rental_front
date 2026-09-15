import api from "./axios";

export const getSecuritySettings = async () => {
  const response = await api.get("/admin/setting/security");
  return response.data;
};

export const updateSecuritySettings = async (data) => {
  const response = await api.put("/admin/setting/security", data);
  return response.data;
};

export const changePassword = async (data) => {
  const response = await api.put(
    "/admin/setting/security/change_pwd",
    data
  );

  return response.data;
};