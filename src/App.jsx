import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Homepage from "./pages/Homepage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminClients from "./pages/admin/AdminClients";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminRequests from "./pages/admin/AdminRequests";
import AdminSupport from "./pages/admin/AdminSupport";
import AdminServices from "./pages/admin/AdminServices";

import ClientDashboard from "./pages/client/ClientDashboard";
import ClientProjects from "./pages/client/ClientProjects";
import ClientProfile from "./pages/client/ClientProfile";
import ClientRequests from "./pages/client/ClientRequests";
import ClientServices from "./pages/client/ClientServices";
import ClientSupport from "./pages/client/ClientSupport";

import ProtectedRoute from "./components/ProtectedRoute";

function RootRedirect() {
  const { isAuthenticated, role } = useAuth();
  if (!isAuthenticated) return <Homepage />;
  if (role === "ADMIN") return <Navigate to="/admin/dashboard" replace />;
  if (role === "CLIENT") return <Navigate to="/client/dashboard" replace />;
  return <Homepage />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* HOME */}
        <Route path="/" element={<RootRedirect />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin/dashboard" element={<ProtectedRoute requiredRole="ADMIN"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/projects" element={<ProtectedRoute requiredRole="ADMIN"><AdminProjects /></ProtectedRoute>} />
        <Route path="/admin/clients" element={<ProtectedRoute requiredRole="ADMIN"><AdminClients /></ProtectedRoute>} />
        <Route path="/admin/analytics" element={<ProtectedRoute requiredRole="ADMIN"><AdminAnalytics /></ProtectedRoute>} />
        <Route path="/admin/requests" element={<ProtectedRoute requiredRole="ADMIN"><AdminRequests /></ProtectedRoute>} />
        <Route path="/admin/support" element={<ProtectedRoute requiredRole="ADMIN"><AdminSupport /></ProtectedRoute>} />
        <Route path="/admin/services" element={<ProtectedRoute requiredRole="ADMIN"><AdminServices /></ProtectedRoute>} />

        {/* CLIENT ROUTES */}
        <Route path="/client/dashboard" element={<ProtectedRoute requiredRole="CLIENT"><ClientDashboard /></ProtectedRoute>} />
        <Route path="/client/projects" element={<ProtectedRoute requiredRole="CLIENT"><ClientProjects /></ProtectedRoute>} />
        <Route path="/client/profile" element={<ProtectedRoute requiredRole="CLIENT"><ClientProfile /></ProtectedRoute>} />
        <Route path="/client/requests" element={<ProtectedRoute requiredRole="CLIENT"><ClientRequests /></ProtectedRoute>} />
        <Route path="/client/services" element={<ProtectedRoute requiredRole="CLIENT"><ClientServices /></ProtectedRoute>} />
        <Route path="/client/support" element={<ProtectedRoute requiredRole="CLIENT"><ClientSupport /></ProtectedRoute>} />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}