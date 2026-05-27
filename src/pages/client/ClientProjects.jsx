import { useState, useEffect } from "react";
import ClientLayout from "../../components/ClientLayout";
import { getClientProjects } from "../../api/clientApi";

const STATUS_BADGE = {
  COMPLETED: { cls: "badge-green", label: "Completed" },
  IN_PROGRESS: { cls: "badge-yellow", label: "In Progress" },
  PENDING: { cls: "badge-red", label: "Pending" },
};

export default function ClientProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    getClientProjects()
      .then(setProjects)
      .catch(() => setError("Failed to load projects."))
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    filter === "ALL"
      ? projects
      : projects.filter((p) => p.status === filter);

  return (
    <ClientLayout title="My Projects">
      <div className="page-header-row">
        <p className="page-subtitle">{projects.length} projects assigned to you</p>
        <div className="filter-tabs">
          {["ALL", "PENDING", "IN_PROGRESS", "COMPLETED"].map((f) => (
            <button
              key={f}
              className={`filter-tab ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {loading && <div className="page-loading">Loading projects...</div>}
      {error && <div className="page-error">{error}</div>}

      {!loading && !error && (
        <div className="project-cards-grid">
          {filtered.length === 0 && (
            <div className="page-empty">No projects found.</div>
          )}
          {filtered.map((p) => {
            const badge = STATUS_BADGE[p.status] || {
              cls: "badge-gray",
              label: p.status,
            };
            return (
              <div key={p.id} className="project-card">
                <div className="project-card-header">
                  <h3>{p.title}</h3>
                  <span className={`status-badge ${badge.cls}`}>
                    {badge.label}
                  </span>
                </div>
                <p className="project-desc">{p.description || "No description."}</p>
                <div className="project-meta">
                  {p.budget && (
                    <div className="meta-item">
                      <span>₹{Number(p.budget).toLocaleString()}</span>
                    </div>
                  )}
                  {p.startDate && (
                    <div className="meta-item">
                      <span>📅 Start</span>
                      <span>{p.startDate}</span>
                    </div>
                  )}
                  {p.endDate && (
                    <div className="meta-item">
                      <span>🏁 End</span>
                      <span>{p.endDate}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </ClientLayout>
  );
}
