import axiosInstance from "./axiosInstance";

// GET /api/v1/client/dashboard
export const getClientDashboard = async () => {
  const response = await axiosInstance.get("/api/v1/client/dashboard");
  return response.data;
};

// GET /api/v1/client/projects
export const getClientProjects = async () => {
  const response = await axiosInstance.get("/api/v1/client/projects");
  return response.data;
};

// GET /api/v1/client/profile
export const getClientProfile = async () => {
  const response = await axiosInstance.get("/api/v1/client/profile");
  return response.data;
};
