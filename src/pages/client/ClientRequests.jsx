import { useState, useEffect } from "react";
import ClientLayout from "../../components/ClientLayout";
import {
  submitProjectRequest,
  getMyRequests,
  uploadRequestFile,
} from "../../api/requestApi";

const SERVICE_TYPES = [
  "Web Development",
  "Mobile App",
  "UI/UX Design",
  "API Development",
  "E-commerce",
  "Startup MVP",
  "Portfolio Website",
  "Other",
];

const TIMELINES = [
  "1-2 weeks",
  "1 month",
  "2-3 months",
  "3-6 months",
  "6+ months",
];

const STATUS_BADGE = {
  PENDING: { cls: "badge-yellow", label: "⏳ Pending", icon: "⏳" },
  APPROVED: { cls: "badge-green", label: "✅ Approved", icon: "✅" },
  REJECTED: { cls: "badge-red", label: "❌ Rejected", icon: "❌" },
};

const emptyForm = {
  title: "",
  description: "",
  serviceType: "",
  estimatedBudget: "",
  timeline: "",
};

export default function ClientRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uploadingId, setUploadingId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      setRequests(await getMyRequests());
    } catch {
      setError("Failed to load requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.serviceType) {
      setError("Title and service type are required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await submitProjectRequest({
        ...form,
        estimatedBudget: form.estimatedBudget ? parseFloat(form.estimatedBudget) : null,
      });
      setSuccess("🎉 Request submitted successfully! Our team will review it soon.");
      setForm(emptyForm);
      setShowForm(false);
      await load();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to submit request.");
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (requestId) => {
    if (!selectedFile) return;
    setUploadingId(requestId);
    try {
      await uploadRequestFile(requestId, selectedFile);
      setSelectedFile(null);
      setSuccess("📎 File uploaded successfully!");
      await load();
    } catch {
      setError("File upload failed.");
    } finally {
      setUploadingId(null);
    }
  };

  return (
    <ClientLayout title="Project Requests">
      <div className="page-header-row">
        <div>
          <p className="page-subtitle">Tell us what you want to build</p>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "✕ Cancel" : "+ New Request"}
        </button>
      </div>

      {success && (
        <div className="alert-success" onClick={() => setSuccess("")}>
          {success}
        </div>
      )}
      {error && <div className="page-error">{error}</div>}

      {/* SUBMIT FORM */}
      {showForm && (
        <div className="request-form-card">
          <h3>📋 Submit Project Request</h3>
          <p className="form-hint">Describe what you need and we'll get back to you within 24 hours.</p>
          <form onSubmit={handleSubmit} className="request-form">
            <div className="form-row">
              <div className="input-group">
                <label>Project Title *</label>
                <input
                  className="input"
                  placeholder="e.g. E-commerce Website for my Store"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>
              <div className="input-group">
                <label>Service Type *</label>
                <select
                  className="input"
                  value={form.serviceType}
                  onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
                  required
                >
                  <option value="">Select a service...</option>
                  {SERVICE_TYPES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="input-group">
              <label>Project Description</label>
              <textarea
                className="input"
                rows={4}
                placeholder="Describe your project in detail — features, goals, target audience..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>Estimated Budget (USD)</label>
                <input
                  className="input"
                  type="number"
                  placeholder="e.g. 5000"
                  value={form.estimatedBudget}
                  onChange={(e) => setForm({ ...form, estimatedBudget: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label>Timeline</label>
                <select
                  className="input"
                  value={form.timeline}
                  onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                >
                  <option value="">Select timeline...</option>
                  {TIMELINES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="modal-actions">
              <button type="button" className="btn-outline" onClick={() => setShowForm(false)}>
                Cancel
              </button>
              <button type="submit" className="btn-primary" disabled={saving}>
                {saving ? "Submitting..." : "🚀 Submit Request"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* REQUESTS LIST */}
      {loading && <div className="page-loading">Loading your requests...</div>}
      {!loading && requests.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📬</div>
          <h3>No requests yet</h3>
          <p>Submit your first project request and our team will review it!</p>
          <button className="btn-primary" onClick={() => setShowForm(true)}>
            + New Request
          </button>
        </div>
      )}

      <div className="requests-list">
        {requests.map((req) => {
          const badge = STATUS_BADGE[req.status] || { cls: "badge-gray", label: req.status };
          const isExpanded = expandedId === req.id;
          return (
            <div key={req.id} className={`request-card ${req.status?.toLowerCase()}`}>
              <div
                className="request-card-header"
                onClick={() => setExpandedId(isExpanded ? null : req.id)}
              >
                <div className="request-card-title">
                  <span className="request-service-tag">{req.serviceType}</span>
                  <h3>{req.title}</h3>
                </div>
                <div className="request-card-meta">
                  <span className={`status-badge ${badge.cls}`}>{badge.label}</span>
                  <span className="request-date">
                    {req.createdAt ? new Date(req.createdAt).toLocaleDateString() : ""}
                  </span>
                  <span className="expand-btn">{isExpanded ? "▲" : "▼"}</span>
                </div>
              </div>

              {isExpanded && (
                <div className="request-card-body">
                  {req.description && <p className="req-desc">{req.description}</p>}
                  <div className="req-details-row">
                    {req.estimatedBudget && (
                      <div className="req-detail"><span>💰 Budget</span><strong>${Number(req.estimatedBudget).toLocaleString()}</strong></div>
                    )}
                    {req.timeline && (
                      <div className="req-detail"><span>⏱ Timeline</span><strong>{req.timeline}</strong></div>
                    )}
                    {req.fileUrl && (
                      <div className="req-detail"><span>📎 File</span><strong className="file-attached">Attached</strong></div>
                    )}
                  </div>

                  {req.status === "REJECTED" && req.rejectionReason && (
                    <div className="rejection-note">
                      <strong>❌ Rejection Reason:</strong> {req.rejectionReason}
                    </div>
                  )}

                  {req.status === "APPROVED" && (
                    <div className="approval-note">
                      ✅ Your request has been approved! Our team will contact you shortly.
                    </div>
                  )}

                  {/* FILE UPLOAD */}
                  {req.status === "PENDING" && !req.fileUrl && (
                    <div className="file-upload-row">
                      <label className="file-label">📎 Attach a file (optional):</label>
                      <div className="file-input-group">
                        <input
                          type="file"
                          className="file-input"
                          onChange={(e) => setSelectedFile(e.target.files[0])}
                          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip"
                        />
                        <button
                          className="btn-outline btn-sm"
                          onClick={() => handleFileUpload(req.id)}
                          disabled={uploadingId === req.id || !selectedFile}
                        >
                          {uploadingId === req.id ? "Uploading..." : "Upload"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </ClientLayout>
  );
}
