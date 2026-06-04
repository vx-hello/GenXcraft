import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../api/authApi";

import { useEffect, useState } from "react";

import {
  getNotificationCounts
} from "../api/notificationApi";

const navItems = [
  { label: "Dashboard", path: "/admin/dashboard", icon: "📊" },
  { label: "Projects", path: "/admin/projects", icon: "📁" },
  { label: "Clients", path: "/admin/clients", icon: "👥" },
  { label: "Requests", path: "/admin/requests", icon: "📬" },
  { label: "Support", path: "/admin/support", icon: "🎫" },
  { label: "Services", path: "/admin/services", icon: "⚡" },
  { label: "Analytics", path: "/admin/analytics", icon: "📈" },
];

export default function AdminLayout({ children, title }) {

  const { logout } = useAuth();

  const navigate = useNavigate();

  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 🔔 NOTIFICATION STATE
  const [counts, setCounts] = useState({
    pendingRequests: 0,
    openTickets: 0
  });

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // FETCH COUNTS
  const fetchCounts = async () => {

    try {

      const data =
        await getNotificationCounts();

      setCounts(data);

    } catch (err) {

      console.error(err);

    }
  };

  // AUTO REFRESH
  useEffect(() => {

    fetchCounts();

    const interval =
      setInterval(
        fetchCounts,
        15000
      );

    return () =>
      clearInterval(interval);

  }, []);

  const handleLogout = async () => {

    try {

      await logoutUser();

    } catch {}

    logout();

    navigate("/login");
  };

  return (
    <div className="layout">

      {/* SIDEBAR OVERLAY (mobile) */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>

        <div className="sidebar-brand">
          <span className="sidebar-logo"></span>
          <span>DEVEX</span>
        </div>

        <div className="sidebar-role-badge">
          ADMIN
        </div>

        <nav className="sidebar-nav">

          {navItems.map((item) => (

            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${
                location.pathname === item.path
                  ? "active"
                  : ""
              }`}
            >

              <span className="sidebar-icon">
                {item.icon}
              </span>

              {item.label}

            </Link>
          ))}

        </nav>

        <button
          className="sidebar-logout"
          onClick={handleLogout}
        >
          🚪 Logout
        </button>

      </aside>

      {/* MAIN */}
      <main className="layout-main">

        <header className="layout-header">

          {/* Mobile hamburger */}
          <button
            className="sidebar-toggle-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <h1 className="layout-title">
            {title}
          </h1>

          <div className="layout-header-right">

            {/* 🔔 NOTIFICATION BELL */}
            <div className="admin-bell">

              🔔

              <span className="admin-bell-count">

                {counts.pendingRequests
                  + counts.openTickets}

              </span>

            </div>

            <span className="header-pill">
              Admin Panel
            </span>

          </div>

        </header>

        <div className="layout-content">
          {children}
        </div>

      </main>

    </div>
  );
}