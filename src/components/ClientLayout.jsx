import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../api/authApi";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Dashboard", path: "/client/dashboard", icon: "🏠" },
  { label: "Services", path: "/client/services", icon: "⚡" },
  { label: "My Requests", path: "/client/requests", icon: "📬" },
  { label: "My Projects", path: "/client/projects", icon: "📁" },
  { label: "Support", path: "/client/support", icon: "🎫" },
  { label: "My Profile", path: "/client/profile", icon: "👤" },
];

export default function ClientLayout({ children, title }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

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
        <div className="sidebar-role-badge client-badge">CLIENT</div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${
                location.pathname === item.path ? "active" : ""
              }`}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <button className="sidebar-logout" onClick={handleLogout}>
          🚪 Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
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

          <h1 className="layout-title">{title}</h1>
          <div className="layout-header-right">
            <span className="header-pill client-pill">Client Portal</span>
          </div>
        </header>
        <div className="layout-content">{children}</div>
      </main>
    </div>
  );
}
