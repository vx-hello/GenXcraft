import { Link, useLocation } from "react-router-dom";
import "../../index.css";

export default function Dashboard({ role }) {
  const location = useLocation();

  return (
    <div className="dashboard">

      <div className="sidebar">
        <h2>{role.toUpperCase()}</h2>

        {role === "admin" && (
          <>
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/projects">Projects</Link>
            <Link to="/admin/clients">Clients</Link>
            <Link to="/admin/analytics">Analytics</Link>
          </>
        )}

        {role === "client" && (
          <>
            <Link to="/client/dashboard">Dashboard</Link>
            <Link to="/client/projects">Projects</Link>
            <Link to="/client/profile">Profile</Link>
          </>
        )}
      </div>

      <div className="main">
        <div className="topbar">
          <h1>{location.pathname}</h1>
        </div>

        <div className="card">Overview Data</div>
        <div className="card">Analytics Data</div>
        <div className="card">Recent Activity</div>
      </div>

    </div>
  );
}