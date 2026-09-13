import api from "/src/api/axios.js";

/**
 * Fetch Customizer Settings
 * Returns unwrapped response data with standard fallbacks
 */
export const getCustomizerSettings = async () => {
  const response = await api.get('/admin/setting/customizer');
  return response?.data?.data ?? response?.data;
};

/**
 * Update Customizer Settings
 * Sends FormData containing text fields and optional files (logoFile / heroImageFile)
 */
export const updateCustomizerSettings = async (formData) => {
  const response = await api.put(
    '/admin/setting/customizer',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response?.data?.data ?? response?.data;
};