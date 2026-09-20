import api from "./axios";

// Get all users
export const getUser = async () => {
  const response = await api.get("/users/get");
  return response.data;
};

// Get user by ID
export const getUserById = async (id) => {
  const response = await api.get(`/users/get/${id}`);
  return response.data;
};

// Create user
export const createUser = async (userData) => {
  const response = await api.post("/users/post", userData);
  return response.data;
};

// Update user profile
// Update user profile
export const updateUser = async (id, userData, profileImage = null) => {
  const formData = new FormData();

  if (userData.name !== undefined) {
    formData.append("name", userData.name);
  }

  if (userData.email !== undefined) {
    formData.append("email", userData.email);
  }

  if (userData.phone !== undefined) {
    formData.append("phone", userData.phone);
  }

  if (userData.gender !== undefined) {
    formData.append("gender", userData.gender);
  }

  if (userData.role !== undefined) {
    formData.append("role", userData.role);
  }

  if (userData.status !== undefined) {
    formData.append("status", userData.status);
  }

  // Add profile image only when user selected a new image
  if (profileImage instanceof File) {
    formData.append("file", profileImage);
  }

  const response = await api.put(
    `/users/update/${id}`,
    formData
  );

  return response.data;
};
// Delete user
export const deleteUser = async (id) => {
  const response = await api.delete(`/users/delete/${id}`);
  return response.data;
};

// Send Telegram message to client
export const sendTelegramMessageToClient = async (userId, message) => {
  return api.post(`/admin/clients/${userId}/telegram`, { message });
};

// Get currently logged-in admin profile
export const getLoggedInAdminProfile = async () => {
  // 1. Read top-level localStorage keys
  let rawId = localStorage.getItem("id");
  let role = localStorage.getItem("role");

  // 2. Fallback check inside stringified JSON objects if top-level key wasn't found directly
  if (!rawId) {
    const storedUser = localStorage.getItem("user") || localStorage.getItem("auth");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        rawId = parsed?.id || parsed?.userId || parsed?.user?.id;
        role = role || parsed?.role || parsed?.user?.role;
      } catch (e) {
        console.error("Error parsing JSON user from localStorage:", e);
      }
    }
  }

  const userId = Number(rawId);
  const normalizedRole = String(role || "").toUpperCase().trim();

  // 3. Validation
  if (!rawId || isNaN(userId) || userId <= 0) {
    throw new Error("No valid logged-in user ID found in session.");
  }

  if (normalizedRole !== "ADMIN" && normalizedRole !== "ROLE_ADMIN") {
    throw new Error("Access denied: Currently logged-in user is not an Admin.");
  }

  // 4. Fetch User Data
  const response = await getUserById(userId);

  // Safely unwrap data from response wrapper if needed
  return response?.data ?? response;
};