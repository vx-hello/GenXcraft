import { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import { getAdminDashboard } from "../../api/adminApi";

function StatCard({ label, value, icon, color }) {
  return (
    <div className="stat-card" style={{ "--stat-color": color }}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-info">
        <div className="stat-value">{value ?? "—"}</div>
        <div className="stat-label">{label}</div>
      </div>
      <div className="stat-bar" style={{ background: color, opacity: 0.15 }} />
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAdminDashboard()
      .then(setStats)
      .catch(() => setError("Failed to load dashboard data."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout title="Dashboard">
      {loading && <div className="page-loading">Loading dashboard...</div>}
      {error && <div className="page-error">{error}</div>}
      {stats && (
        <>
          <div className="stats-grid">
            <StatCard
              label="Total Clients"
              value={stats.totalClients}
              icon="👥"
              color="#38bdf8"
            />
            <StatCard
              label="Total Projects"
              value={stats.totalProjects}
              icon="📁"
              color="#a78bfa"
            />
            <StatCard
              label="Completed"
              value={stats.completedProjects}
              icon="✅"
              color="#34d399"
            />
            <StatCard
              label="In Progress"
              value={stats.inProgressProjects}
              icon="🔄"
              color="#fbbf24"
            />
            <StatCard
              label="Pending"
              value={stats.pendingProjects}
              icon="⏳"
              color="#f87171"
            />
          </div>

          <div className="dashboard-summary">
            <div className="summary-card">
              <h3>📊 Project Status Overview</h3>
              <div className="progress-list">
                <div className="progress-item">
                  <span>Completed</span>
                  <div className="progress-bar-wrap">
                    <div
                      className="progress-fill green"
                      style={{
                        width: stats.totalProjects
                          ? `${(stats.completedProjects / stats.totalProjects) * 100}%`
                          : "0%",
                      }}
                    />
                  </div>
                  <span className="progress-val">{stats.completedProjects}</span>
                </div>
                <div className="progress-item">
                  <span>In Progress</span>
                  <div className="progress-bar-wrap">
                    <div
                      className="progress-fill yellow"
                      style={{
                        width: stats.totalProjects
                          ? `${(stats.inProgressProjects / stats.totalProjects) * 100}%`
                          : "0%",
                      }}
                    />
                  </div>
                  <span className="progress-val">{stats.inProgressProjects}</span>
                </div>
                <div className="progress-item">
                  <span>Pending</span>
                  <div className="progress-bar-wrap">
                    <div
                      className="progress-fill red"
                      style={{
                        width: stats.totalProjects
                          ? `${(stats.pendingProjects / stats.totalProjects) * 100}%`
                          : "0%",
                      }}
                    />
                  </div>
                  <span className="progress-val">{stats.pendingProjects}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
}
