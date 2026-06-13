import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";

// PUBLIC PAGES
const Homepage = lazy(() => import("./pages/Homepage"));
const Services = lazy(() => import("./pages/Services"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));

// AUTH
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));

// ADMIN
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminProjects = lazy(() => import("./pages/admin/AdminProjects"));
const AdminClients = lazy(() => import("./pages/admin/AdminClients"));
const AdminAnalytics = lazy(() => import("./pages/admin/AdminAnalytics"));
const AdminRequests = lazy(() => import("./pages/admin/AdminRequests"));
const AdminSupport = lazy(() => import("./pages/admin/AdminSupport"));
const AdminServices = lazy(() => import("./pages/admin/AdminServices"));

// CLIENT
const ClientDashboard = lazy(() => import("./pages/client/ClientDashboard"));
const ClientProjects = lazy(() => import("./pages/client/ClientProjects"));
const ClientProfile = lazy(() => import("./pages/client/ClientProfile"));
const ClientRequests = lazy(() => import("./pages/client/ClientRequests"));
const ClientServices = lazy(() => import("./pages/client/ClientServices"));
const ClientSupport = lazy(() => import("./pages/client/ClientSupport"));

/* ================= ROOT REDIRECT ================= */
function RootRedirect() {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) return <Homepage />;

  if (role === "ADMIN") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (role === "CLIENT") {
    return <Navigate to="/client/dashboard" replace />;
  }

  return <Homepage />;
}

/* ================= APP ================= */
export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="page-loading">Loading...</div>}>
        <Routes>

          {/* HOME */}
          <Route path="/" element={<RootRedirect />} />

          {/* PUBLIC ROUTES (🔥 FIX ADDED) */}
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* ================= ADMIN ================= */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/projects"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AdminProjects />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/clients"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AdminClients />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/analytics"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AdminAnalytics />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/requests"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AdminRequests />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/support"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AdminSupport />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/services"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AdminServices />
              </ProtectedRoute>
            }
          />

          {/* ================= CLIENT ================= */}
          <Route
            path="/client/dashboard"
            element={
              <ProtectedRoute requiredRole="CLIENT">
                <ClientDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/client/projects"
            element={
              <ProtectedRoute requiredRole="CLIENT">
                <ClientProjects />
              </ProtectedRoute>
            }
          />

          <Route
            path="/client/profile"
            element={
              <ProtectedRoute requiredRole="CLIENT">
                <ClientProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/client/requests"
            element={
              <ProtectedRoute requiredRole="CLIENT">
                <ClientRequests />
              </ProtectedRoute>
            }
          />

          <Route
            path="/client/services"
            element={
              <ProtectedRoute requiredRole="CLIENT">
                <ClientServices />
              </ProtectedRoute>
            }
          />

          <Route
            path="/client/support"
            element={
              <ProtectedRoute requiredRole="CLIENT">
                <ClientSupport />
              </ProtectedRoute>
            }
          />

          {/* FALLBACK */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}