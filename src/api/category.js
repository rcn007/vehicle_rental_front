import api from "./axios";

// Get all categories
export const getCategories = async () => {
  const response = await api.get("/categories/getAll");
  return response.data;
};

// Get category by ID - for Edit
export const getCategoryById = async (id) => {
  const response = await api.get(`/categories/getById/${id}`);
  return response.data;
};

// Create category
export const createCategory = async (categoryData) => {
  const response = await api.post("/categories/create", categoryData);
  return response.data;
};

// Update category
export const updateCategory = async (id, categoryData) => {
  const response = await api.put(`/categories/update/${id}`, categoryData);
  return response.data;
};

// Delete category
export const deleteCategory = async (id) => {
  const response = await api.delete(`/categories/delete/${id}`);
  return response.data;
};

