import axiosInstance from "./axiosInstance";

// POST /api/v1/client/support
export const createTicket = async (data) => {
  const response = await axiosInstance.post("/api/v1/client/support", data);
  return response.data;
};

// GET /api/v1/client/support
export const getMyTickets = async () => {
  const response = await axiosInstance.get("/api/v1/client/support");
  return response.data;
};

// GET /api/v1/admin/support
export const getAllTickets = async () => {
  const response = await axiosInstance.get("/api/v1/admin/support");
  return response.data;
};

// PATCH /api/v1/admin/support/{id}/reply
export const replyTicket = async (id, reply) => {
  const response = await axiosInstance.patch(`/api/v1/admin/support/${id}/reply`, {
    reply,
  });
  return response.data;
};

// PATCH /api/v1/admin/support/{id}/review
export const markTicketInReview = async (id) => {
  const response = await axiosInstance.patch(`/api/v1/admin/support/${id}/review`);
  return response.data;
};
