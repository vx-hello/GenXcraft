import { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import { getAdminAnalytics } from "../../api/adminApi";

function AnalyticCard({ label, value, icon, color, suffix }) {
  return (
    <div className="stat-card" style={{ "--stat-color": color }}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-info">
        <div className="stat-value">
          {value !== undefined ? `${value}${suffix || ""}` : "—"}
        </div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  );
}

export default function AdminAnalytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAdminAnalytics()
      .then(setData)
      .catch(() => setError("Failed to load analytics."))
      .finally(() => setLoading(false));
  }, []);

  const completionPct = data?.completionRate
    ? `${data.completionRate.toFixed(1)}%`
    : "0%";

  return (
    <AdminLayout title="Analytics">
      {loading && <div className="page-loading">Loading analytics...</div>}
      {error && <div className="page-error">{error}</div>}

      {data && (
        <>
          <div className="stats-grid">
            <AnalyticCard
              label="Total Clients"
              value={data.totalClients}
              icon="👥"
              color="#38bdf8"
            />
            <AnalyticCard
              label="Total Projects"
              value={data.totalProjects}
              icon="📁"
              color="#a78bfa"
            />
            <AnalyticCard
              label="Completed"
              value={data.completedProjects}
              icon="✅"
              color="#34d399"
            />
            <AnalyticCard
              label="In Progress"
              value={data.inProgressProjects}
              icon="🔄"
              color="#fbbf24"
            />
            <AnalyticCard
              label="Pending"
              value={data.pendingProjects}
              icon="⏳"
              color="#f87171"
            />
            <AnalyticCard
              label="Completion Rate"
              value={data.completionRate?.toFixed(1)}
              icon="🎯"
              color="#34d399"
              suffix="%"
            />
          </div>

          <div className="analytics-section">
            <div className="summary-card">
              <h3>🎯 Completion Rate</h3>
              <div className="completion-ring-wrap">
                <div className="completion-ring">
                  <svg viewBox="0 0 120 120" width="160" height="160">
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="12"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="#34d399"
                      strokeWidth="12"
                      strokeDasharray={`${2 * Math.PI * 50}`}
                      strokeDashoffset={`${
                        2 * Math.PI * 50 * (1 - (data.completionRate || 0) / 100)
                      }`}
                      strokeLinecap="round"
                      transform="rotate(-90 60 60)"
                    />
                  </svg>
                  <div className="ring-label">{completionPct}</div>
                </div>
                <p className="completion-desc">
                  {data.completedProjects} of {data.totalProjects} projects completed
                </p>
              </div>
            </div>

            <div className="summary-card">
              <h3>📊 Breakdown</h3>
              <div className="breakdown-list">
                <div className="breakdown-item">
                  <span className="dot green"></span>
                  <span>Completed</span>
                  <strong>{data.completedProjects}</strong>
                </div>
                <div className="breakdown-item">
                  <span className="dot yellow"></span>
                  <span>In Progress</span>
                  <strong>{data.inProgressProjects}</strong>
                </div>
                <div className="breakdown-item">
                  <span className="dot red"></span>
                  <span>Pending</span>
                  <strong>{data.pendingProjects}</strong>
                </div>
                <div className="breakdown-item">
                  <span className="dot blue"></span>
                  <span>Total Clients</span>
                  <strong>{data.totalClients}</strong>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
}
