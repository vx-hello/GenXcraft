import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("devex_token"));
  const [role, setRole] = useState(localStorage.getItem("devex_role"));

  /**
   * Called after a successful login or register.
   * Stores token + role returned directly from the API.
   */
  const login = (jwt, userRole) => {
    localStorage.setItem("devex_token", jwt);
    localStorage.setItem("devex_role", userRole);
    setToken(jwt);
    setRole(userRole);
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
      value={{ token, role, login, logout, isAuthenticated }}
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
