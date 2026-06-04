import axiosInstance from "./axiosInstance";

// POST /api/v1/auth/login
export const loginUser = async (email, password) => {
  const response = await axiosInstance.post("/api/v1/auth/login", { email, password });
  return response.data;
};

// POST /api/v1/auth/register
export const registerUser = async (data) => {
  const response = await axiosInstance.post("/api/v1/auth/register", data);
  return response.data;
};

// POST /api/v1/auth/logout
export const logoutUser = async () => {
  const response = await axiosInstance.post("/api/v1/auth/logout");
  return response.data;
};

// POST /api/v1/auth/forgot-password
export const forgotPassword = async (email) => {
  const response = await axiosInstance.post("/api/v1/auth/forgot-password", { email });
  return response.data;
};

// POST /api/v1/auth/reset-password
export const resetPassword = async (token, newPassword) => {
  const response = await axiosInstance.post("/api/v1/auth/reset-password", { token, newPassword });
  return response.data;
};
