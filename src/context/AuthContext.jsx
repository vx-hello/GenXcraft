import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("devex_token"));
  const [role, setRole] = useState(localStorage.getItem("devex_role"));
  const [loading, setLoading] = useState(false);

  // Detect role by probing the API (since JWT has no role claim)
  const detectRole = async (jwt) => {
    try {
      // Try client profile first
      const res = await axiosInstance.get("/api/v1/client/profile", {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      if (res.status === 200) {
        localStorage.setItem("devex_role", "CLIENT");
        setRole("CLIENT");
        return "CLIENT";
      }
    } catch (e) {
      // 403 = not a client, try admin
      try {
        const res2 = await axiosInstance.get("/api/v1/admin/dashboard", {
          headers: { Authorization: `Bearer ${jwt}` },
        });
        if (res2.status === 200) {
          localStorage.setItem("devex_role", "ADMIN");
          setRole("ADMIN");
          return "ADMIN";
        }
      } catch {
        return null;
      }
    }
    return null;
  };

  const login = async (jwt) => {
    localStorage.setItem("devex_token", jwt);
    setToken(jwt);
    setLoading(true);
    const detectedRole = await detectRole(jwt);
    setLoading(false);
    return detectedRole;
  };

  const logout = () => {
    localStorage.removeItem("devex_token");
    localStorage.removeItem("devex_role");
    setToken(null);
    setRole(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{ token, role, loading, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
