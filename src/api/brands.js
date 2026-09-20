import api from "./axios";

// Get all brands
export const getBrands = async () => {
  const response = await api.get("/brands/getAll");
  return response.data;
};

// Get brand by ID - for Edit
export const getBrandById = async (id) => {
  const response = await api.get(`/brands/getById/${id}`);
  return response.data;
};

// Create brand
export const createBrand = async (brandData) => {
  const response = await api.post("/brands/create", brandData);
  return response.data;
};

// Update brand
export const updateBrand = async (id, formData) => {
  const response = await api.put(`/brands/update/${id}`, formData)
  return response.data
}

// Delete brand
export const deleteBrand = async (id) => {
  const response = await api.delete(`/brands/delete/${id}`);
  return response.data;
};
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

