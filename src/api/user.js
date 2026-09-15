import api from "./axios";

// Get all categories
export const getUser = async () => {
  const response = await api.get("/users/get");
  return response.data;
};

// Get category by ID - for Edit
export const getUserById = async (id) => {
  const response = await api.get(`/users/get/${id}`);
  return response.data;
};

// Create category
export const createUser = async (userData) => {
  const response = await api.post("/users/post", userData);
  return response.data;
};

// Update category
export const updateUser = async (id, userData) => {
  const response = await api.put(`/users/update/${id}`, userData);
  return response.data;
};

// Delete category
export const deleteUser= async (id) => {
  const response = await api.delete(`/users/delete/${id}`);
  return response.data;
};

export const sendTelegramMessageToClient = async (userId, message) => {
  return api.post(
    `/admin/clients/${userId}/telegram`,
    {
      message
    }
  )
}

