import axiosInstance from "./axiosInstance";

// POST /api/v1/client/requests
export const submitProjectRequest = async (data) => {
  const response = await axiosInstance.post("/api/v1/client/requests", data);
  return response.data;
};

// GET /api/v1/client/requests
export const getMyRequests = async () => {
  const response = await axiosInstance.get("/api/v1/client/requests");
  return response.data;
};

// POST /api/v1/client/requests/{id}/upload
export const uploadRequestFile = async (requestId, file) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await axiosInstance.post(
    `/api/v1/client/requests/${requestId}/upload`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return response.data;
};

// GET /api/v1/admin/requests
export const getAllRequests = async () => {
  const response = await axiosInstance.get("/api/v1/admin/requests");
  return response.data;
};

// PATCH /api/v1/admin/requests/{id}/approve
export const approveRequest = async (id) => {
  const response = await axiosInstance.patch(`/api/v1/admin/requests/${id}/approve`);
  return response.data;
};

// PATCH /api/v1/admin/requests/{id}/reject
export const rejectRequest = async (id, reason) => {
  const response = await axiosInstance.patch(`/api/v1/admin/requests/${id}/reject`, {
    reason,
  });
  return response.data;
};
