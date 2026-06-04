import { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import {
  getAllProjects,
  getAllClients,
  createProject,
  updateProject,
  updateProjectStatus,
  deleteProject,
} from "../../api/adminApi";

const STATUS_OPTIONS = ["PENDING", "IN_PROGRESS", "COMPLETED"];

const STATUS_COLORS = {
  COMPLETED: "badge-green",
  IN_PROGRESS: "badge-yellow",
  PENDING: "badge-red",
};

const emptyForm = {
  title: "",
  description: "",
  budget: "",
  startDate: "",
  endDate: "",
  clientId: "",
};

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const [proj, cli] = await Promise.all([getAllProjects(), getAllClients()]);
      setProjects(proj);
      setClients(cli);
    } catch {
      setError("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditProject(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (proj) => {
    setEditProject(proj);
    setForm({
      title: proj.title || "",
      description: proj.description || "",
      budget: proj.budget || "",
      startDate: proj.startDate || "",
      endDate: proj.endDate || "",
      clientId: proj.client?.id || "",
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        title: form.title,
        description: form.description,
        budget: form.budget ? parseFloat(form.budget) : null,
        startDate: form.startDate || null,
        endDate: form.endDate || null,
        clientId: form.clientId || null,
      };
      if (editProject) {
        await updateProject(editProject.id, payload);
      } else {
        await createProject(payload);
      }
      setShowModal(false);
      await load();
    } catch (err) {
      alert(err?.response?.data?.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateProjectStatus(id, status);
      await load();
    } catch {
      alert("Status update failed.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      setDeleteConfirm(null);
      await load();
    } catch {
      alert("Delete failed.");
    }
  };

  return (
    <AdminLayout title="Projects">
      <div className="page-header-row">
        <p className="page-subtitle">{projects.length} total projects</p>
        <button className="btn-primary" onClick={openCreate}>
          + New Project
        </button>
      </div>

      {loading && <div className="page-loading">Loading projects...</div>}
      {error && <div className="page-error">{error}</div>}

      {!loading && !error && (
        <>
          {/* DESKTOP TABLE */}
          <div className="table-wrap hide-mobile">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Client</th>
                  <th>Budget</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.length === 0 && (
                  <tr>
                    <td colSpan={7} className="table-empty">
                      No projects found. Create one!
                    </td>
                  </tr>
                )}
                {projects.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <strong>{p.title}</strong>
                      <div className="table-sub">{p.description}</div>
                    </td>
                    <td>{p.client?.fullName || "—"}</td>
                    <td>{p.budget ? `₹${Number(p.budget).toLocaleString()}` : "—"}</td>
                    <td>{p.startDate || "—"}</td>
                    <td>{p.endDate || "—"}</td>
                    <td>
                      <select
                        className={`status-select ${STATUS_COLORS[p.status] || ""}`}
                        value={p.status || "PENDING"}
                        onChange={(e) => handleStatusChange(p.id, e.target.value)}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>{s.replace("_", " ")}</option>
                        ))}
                      </select>
                    </td>
                    <td className="action-btns">
                      <button className="btn-icon edit" onClick={() => openEdit(p)}>✏️</button>
                      <button className="btn-icon delete" onClick={() => setDeleteConfirm(p.id)}>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARDS */}
          <div className="admin-cards-list show-mobile">
            {projects.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">📁</div>
                <h3>No projects yet</h3>
                <p>Create your first project to get started.</p>
              </div>
            )}
            {projects.map((p) => (
              <div key={p.id} className="admin-mobile-card">
                <div className="admin-mobile-card-header">
                  <div>
                    <div className="admin-mobile-card-title">{p.title}</div>
                    {p.description && (
                      <div className="admin-mobile-card-sub">{p.description}</div>
                    )}
                  </div>
                  <div className="action-btns">
                    <button className="btn-icon edit" onClick={() => openEdit(p)}>✏️</button>
                    <button className="btn-icon delete" onClick={() => setDeleteConfirm(p.id)}>🗑️</button>
                  </div>
                </div>
                <div className="admin-mobile-card-meta">
                  <div className="admin-mobile-meta-item">
                    <span className="admin-mobile-meta-label">Client</span>
                    <span>{p.client?.fullName || "—"}</span>
                  </div>
                  <div className="admin-mobile-meta-item">
                    <span className="admin-mobile-meta-label">Budget</span>
                    <span>{p.budget ? `₹${Number(p.budget).toLocaleString()}` : "—"}</span>
                  </div>
                  <div className="admin-mobile-meta-item">
                    <span className="admin-mobile-meta-label">Start</span>
                    <span>{p.startDate || "—"}</span>
                  </div>
                  <div className="admin-mobile-meta-item">
                    <span className="admin-mobile-meta-label">End</span>
                    <span>{p.endDate || "—"}</span>
                  </div>
                </div>
                <div className="admin-mobile-card-footer">
                  <select
                    className={`status-select ${STATUS_COLORS[p.status] || ""}`}
                    value={p.status || "PENDING"}
                    onChange={(e) => handleStatusChange(p.id, e.target.value)}
                    style={{ width: "100%" }}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s.replace("_", " ")}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* CREATE/EDIT MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editProject ? "Edit Project" : "Create Project"}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>
            <form onSubmit={handleSave} className="modal-form">
              <div className="input-group">
                <label>Title *</label>
                <input
                  className="input"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>
              <div className="input-group">
                <label>Description</label>
                <textarea
                  className="input"
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>
              <div className="form-row">
                <div className="input-group">
                  <label>Budget (₹)</label>
                  <input
                    className="input"
                    type="number"
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  />
                </div>
                <div className="input-group">
                  <label>Client</label>
                  <select
                    className="input"
                    value={form.clientId}
                    onChange={(e) =>
                      setForm({ ...form, clientId: e.target.value })
                    }
                  >
                    <option value="">Select Client</option>
                    {clients.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.fullName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="input-group">
                  <label>Start Date</label>
                  <input
                    className="input"
                    type="date"
                    value={form.startDate}
                    onChange={(e) =>
                      setForm({ ...form, startDate: e.target.value })
                    }
                  />
                </div>
                <div className="input-group">
                  <label>End Date</label>
                  <input
                    className="input"
                    type="date"
                    value={form.endDate}
                    onChange={(e) =>
                      setForm({ ...form, endDate: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={saving}>
                  {saving ? "Saving..." : editProject ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal modal-sm" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Project?</h3>
            <p>This action cannot be undone.</p>
            <div className="modal-actions">
              <button
                className="btn-outline"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button
                className="btn-danger"
                onClick={() => handleDelete(deleteConfirm)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
