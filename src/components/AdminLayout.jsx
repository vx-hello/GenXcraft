import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { logoutUser } from "../api/authApi";

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
  const { toggle, isDark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch {}
    logout();
    navigate("/login");
  };

  return (
    <div className="layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="sidebar-logo">⚡</span>
          <span>DEVEX</span>
        </div>
        <div className="sidebar-role-badge">ADMIN</div>
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
          <h1 className="layout-title">{title}</h1>
          <div className="layout-header-right">
            <button className="theme-toggle" onClick={toggle} title="Toggle theme">
              {isDark ? "☀️" : "🌙"}
            </button>
            <span className="header-pill">Admin Panel</span>
          </div>
        </header>
        <div className="layout-content">{children}</div>
      </main>
    </div>
  );
}
