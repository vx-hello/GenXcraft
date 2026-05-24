import axiosInstance from "./axiosInstance";

// CLIENT: Get active services
export const getClientServices = async () => {
  const response = await axiosInstance.get("/api/v1/client/services");
  return response.data;
};

// ADMIN: Get all services
export const getAllAdminServices = async () => {
  const response = await axiosInstance.get("/api/v1/admin/services");
  return response.data;
};

// ADMIN: Create service
export const createService = async (data) => {
  const response = await axiosInstance.post("/api/v1/admin/services", data);
  return response.data;
};

// ADMIN: Update service
export const updateService = async (id, data) => {
  const response = await axiosInstance.put(`/api/v1/admin/services/${id}`, data);
  return response.data;
};

// ADMIN: Delete service
export const deleteService = async (id) => {
  await axiosInstance.delete(`/api/v1/admin/services/${id}`);
};

// ADMIN: Toggle active
export const toggleService = async (id) => {
  const response = await axiosInstance.patch(`/api/v1/admin/services/${id}/toggle`);
  return response.data;
};
