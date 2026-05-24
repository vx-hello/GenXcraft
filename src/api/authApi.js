import axiosInstance from "./axiosInstance";

// POST /api/v1/auth/login
export const loginUser = async (email, password) => {
  const response = await axiosInstance.post("/api/v1/auth/login", {
    email,
    password,
  });
  return response.data; // { token: "..." }
};

// POST /api/v1/auth/register
export const registerUser = async (data) => {
  const response = await axiosInstance.post("/api/v1/auth/register", data);
  return response.data; // { token: "..." }
};

// POST /api/v1/auth/logout
export const logoutUser = async () => {
  const response = await axiosInstance.post("/api/v1/auth/logout");
  return response.data;
};
