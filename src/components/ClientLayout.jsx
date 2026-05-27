import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { logoutUser } from "../api/authApi";

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
          <h1 className="layout-title">{title}</h1>
          <div className="layout-header-right">
            <button className="theme-toggle" onClick={toggle} title="Toggle theme">
              {isDark ? "☀️" : "🌙"}
            </button>
            <span className="header-pill client-pill">Client Portal</span>
          </div>
        </header>
        <div className="layout-content">{children}</div>
      </main>
    </div>
  );
}
