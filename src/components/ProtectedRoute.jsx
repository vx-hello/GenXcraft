import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Protects a route by checking:
 * 1. User is authenticated (has token)
 * 2. If requiredRole is given, user's role matches
 */
export default function ProtectedRoute({ children, requiredRole }) {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    // Redirect to their own dashboard if role doesn't match
    if (role === "ADMIN") return <Navigate to="/admin/dashboard" replace />;
    if (role === "CLIENT") return <Navigate to="/client/dashboard" replace />;
    return <Navigate to="/login" replace />;
  }

  return children;
}
