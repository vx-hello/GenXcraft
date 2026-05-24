import { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import {
  getAllAdminServices,
  createService,
  updateService,
  deleteService,
  toggleService,
} from "../../api/servicesApi";

const ICONS = ["🌐","📱","🎨","⚡","🛒","🚀","🔒","📊","🤖","☁️","💳","🔧"];
const COLORS = ["#38bdf8","#a78bfa","#f472b6","#34d399","#fbbf24","#fb923c","#60a5fa","#e879f9"];

const emptyForm = {
  title: "",
  description: "",
  icon: "🌐",
  color: "#38bdf8",
  features: "",
  active: true,
};

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      setServices(await getAllAdminServices());
    } catch {
      setError("Failed to load services.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditItem(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (svc) => {
    setEditItem(svc);
    setForm({
      title: svc.title || "",
      description: svc.description || "",
      icon: svc.icon || "🌐",
      color: svc.color || "#38bdf8",
      features: svc.features || "",
      active: svc.active,
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { setError("Title is required."); return; }
    setSaving(true);
    setError("");
    try {
      if (editItem) {
        await updateService(editItem.id, form);
        setSuccess("✅ Service updated!");
      } else {
        await createService(form);
        setSuccess("✅ Service created!");
      }
      setShowModal(false);
      await load();
    } catch {
      setError("Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleService(id);
      await load();
    } catch {
      setError("Toggle failed.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteService(id);
      setSuccess("🗑️ Service deleted.");
      setDeleteConfirm(null);
      await load();
    } catch {
      setError("Delete failed.");
    }
  };

  return (
    <AdminLayout title="Services">
      <div className="page-header-row">
        <div>
          <p className="page-subtitle">{services.length} services configured</p>
          <p className="page-subtitle" style={{ marginTop: 2 }}>
            Active: {services.filter((s) => s.active).length} | Hidden: {services.filter((s) => !s.active).length}
          </p>
        </div>
        <button className="btn-primary" onClick={openCreate}>+ Add Service</button>
      </div>

      {success && <div className="alert-success" onClick={() => setSuccess("")}>{success}</div>}
      {error && <div className="page-error">{error}</div>}

      {loading && <div className="page-loading">Loading services...</div>}

      {!loading && (
        <div className="admin-services-grid">
          {services.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">⚡</div>
              <h3>No services yet</h3>
              <p>Add your first service to show clients what you offer.</p>
            </div>
          )}
          {services.map((svc) => (
            <div
              key={svc.id}
              className={`admin-service-card ${!svc.active ? "inactive" : ""}`}
              style={{ "--svc-color": svc.color }}
            >
              <div className="admin-svc-header">
                <div
                  className="admin-svc-icon"
                  style={{ background: `${svc.color}20`, color: svc.color }}
                >
                  {svc.icon}
                </div>
                <div className="admin-svc-status">
                  <button
                    className={`toggle-btn ${svc.active ? "on" : "off"}`}
                    onClick={() => handleToggle(svc.id)}
                    title={svc.active ? "Hide from clients" : "Show to clients"}
                  >
                    {svc.active ? "● Active" : "○ Hidden"}
                  </button>
                </div>
              </div>
              <h3>{svc.title}</h3>
              <p className="admin-svc-desc">{svc.description}</p>
              {svc.features && (
                <div className="admin-svc-features">
                  {svc.features.split(",").map((f) => (
                    <span key={f} className="feature-chip">{f.trim()}</span>
                  ))}
                </div>
              )}
              <div className="admin-svc-actions">
                <button className="btn-icon edit" onClick={() => openEdit(svc)}>✏️</button>
                <button
                  className="btn-icon delete"
                  onClick={() => setDeleteConfirm(svc.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE/EDIT MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" style={{ maxWidth: 540 }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editItem ? "Edit Service" : "Add New Service"}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSave} className="modal-form">
              <div className="form-row">
                <div className="input-group">
                  <label>Service Title *</label>
                  <input
                    className="input"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. Web Development"
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Icon (emoji)</label>
                  <select
                    className="input"
                    value={form.icon}
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  >
                    {ICONS.map((ic) => (
                      <option key={ic} value={ic}>{ic} {ic}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="input-group">
                <label>Description</label>
                <textarea
                  className="input"
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Brief description of this service..."
                />
              </div>
              <div className="input-group">
                <label>Features (comma-separated)</label>
                <input
                  className="input"
                  value={form.features}
                  onChange={(e) => setForm({ ...form, features: e.target.value })}
                  placeholder="e.g. React, Spring Boot, MySQL"
                />
              </div>
              <div className="form-row">
                <div className="input-group">
                  <label>Accent Color</label>
                  <div className="color-picker-row">
                    {COLORS.map((c) => (
                      <button
                        key={c}
                        type="button"
                        className={`color-swatch ${form.color === c ? "selected" : ""}`}
                        style={{ background: c }}
                        onClick={() => setForm({ ...form, color: c })}
                      />
                    ))}
                  </div>
                </div>
                <div className="input-group">
                  <label>Visibility</label>
                  <div className="toggle-row">
                    <label className="switch-label">
                      <input
                        type="checkbox"
                        checked={form.active}
                        onChange={(e) => setForm({ ...form, active: e.target.checked })}
                      />
                      <span className="switch-track" />
                      <span>{form.active ? "Visible to clients" : "Hidden"}</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-outline" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={saving}>
                  {saving ? "Saving..." : editItem ? "Update" : "Create Service"}
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
            <div className="modal-header">
              <h2>Delete Service?</h2>
              <button className="modal-close" onClick={() => setDeleteConfirm(null)}>✕</button>
            </div>
            <p style={{ color: "var(--secondary)", fontSize: 14, marginBottom: 16 }}>
              This will permanently remove the service. This action cannot be undone.
            </p>
            <div className="modal-actions">
              <button className="btn-outline" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="btn-danger" onClick={() => handleDelete(deleteConfirm)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
