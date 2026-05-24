import axiosInstance from "./axiosInstance";

// GET /api/v1/admin/dashboard
export const getAdminDashboard = async () => {
  const response = await axiosInstance.get("/api/v1/admin/dashboard");
  return response.data;
};

// GET /api/v1/admin/clients
export const getAllClients = async () => {
  const response = await axiosInstance.get("/api/v1/admin/clients");
  return response.data;
};

// GET /api/v1/admin/analytics
export const getAdminAnalytics = async () => {
  const response = await axiosInstance.get("/api/v1/admin/analytics");
  return response.data;
};

// GET /api/v1/admin/projects
export const getAllProjects = async () => {
  const response = await axiosInstance.get("/api/v1/admin/projects");
  return response.data;
};

// GET /api/v1/admin/projects/{id}
export const getProjectById = async (id) => {
  const response = await axiosInstance.get(`/api/v1/admin/projects/${id}`);
  return response.data;
};

// POST /api/v1/admin/projects
export const createProject = async (data) => {
  const response = await axiosInstance.post("/api/v1/admin/projects", data);
  return response.data;
};

// PUT /api/v1/admin/projects/{id}
export const updateProject = async (id, data) => {
  const response = await axiosInstance.put(`/api/v1/admin/projects/${id}`, data);
  return response.data;
};

// PATCH /api/v1/admin/projects/{id}/status
export const updateProjectStatus = async (id, status) => {
  const response = await axiosInstance.patch(
    `/api/v1/admin/projects/${id}/status`,
    { status }
  );
  return response.data;
};

// DELETE /api/v1/admin/projects/{id}
export const deleteProject = async (id) => {
  await axiosInstance.delete(`/api/v1/admin/projects/${id}`);
};
