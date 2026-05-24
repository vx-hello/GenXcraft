import { useState, useEffect } from "react";
import ClientLayout from "../../components/ClientLayout";
import { getClientDashboard } from "../../api/clientApi";

function StatCard({ label, value, icon, color }) {
  return (
    <div className="stat-card" style={{ "--stat-color": color }}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-info">
        <div className="stat-value">{value ?? "—"}</div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  );
}

export default function ClientDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getClientDashboard()
      .then(setStats)
      .catch(() => setError("Failed to load dashboard."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ClientLayout title="My Dashboard">
      {loading && <div className="page-loading">Loading your dashboard...</div>}
      {error && <div className="page-error">{error}</div>}

      {stats && (
        <>
          <div className="stats-grid">
            <StatCard
              label="Total Projects"
              value={stats.totalProjects}
              icon="📁"
              color="#38bdf8"
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
              <h3>📈 Your Project Progress</h3>
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
    </ClientLayout>
  );
}
