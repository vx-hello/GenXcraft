import axios from "axios";

const API =
  "http://localhost:8080/api/v1";

const authHeader = () => ({
  headers: {
    Authorization:
      `Bearer ${localStorage.getItem("token")}`
  }
});

export const getNotificationCounts =
  async () => {

    const res = await axios.get(
      `${API}/admin/notifications/count`,
      authHeader()
    );

    return res.data;
};