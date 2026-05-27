import { useState } from "react";
import ClientLayout from "../../components/ClientLayout";
import { createTicket, getMyTickets } from "../../api/supportApi";
import { useEffect } from "react";

const CATEGORIES = [
  "Technical Issue",
  "Billing & Payment",
  "Project Update",
  "General Inquiry",
  "Feature Request",
  "Bug Report",
  "Other",
];

const TICKET_BADGE = {
  OPEN: { cls: "badge-yellow", label: "🟡 Open" },
  IN_REVIEW: { cls: "badge-blue", label: "🔵 In Review" },
  CLOSED: { cls: "badge-green", label: "✅ Closed" },
};

const emptyForm = { subject: "", message: "", category: "" };

export default function ClientSupport() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  const load = async () => {
    setLoading(true);
    try {
      setTickets(await getMyTickets());
    } catch {
      setError("Failed to load tickets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.subject || !form.message) {
      setError("Subject and message are required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await createTicket(form);
      setSuccess("🎫 Ticket created successfully. Our team has been notified by email.");
      setForm(emptyForm);
      setShowForm(false);
      await load();
    } catch {
      setError("Failed to create ticket.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <ClientLayout title="Support">
      <div className="page-header-row">
        <div>
          <p className="page-subtitle">
            Need help? Our team is here 24/7
          </p>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "✕ Cancel" : "+ New Ticket"}
        </button>
      </div>

      {/* SUPPORT INFO CARDS */}
      <div className="support-info-grid">
        <div className="support-info-card">
          <div className="support-info-icon">📧</div>
          <div>
            <div className="support-info-title">Email Support</div>
            <div className="support-info-val">thedevexhq@gmail.com</div>
          </div>
        </div>
        <div className="support-info-card">
          <div className="support-info-icon">⏰</div>
          <div>
            <div className="support-info-title">Response Time</div>
            <div className="support-info-val">Within 24 hours</div>
          </div>
        </div>
        <div className="support-info-card">
          <div className="support-info-icon">📱</div>
          <div>
            <div className="support-info-title">WhatsApp</div>
            <div className="support-info-val">+91 9307656010</div>
          </div>
        </div>
      </div>

      {success && (
        <div className="alert-success" onClick={() => setSuccess("")}>
          {success}
        </div>
      )}
      {error && <div className="page-error">{error}</div>}

      {/* TICKET FORM */}
      {showForm && (
        <div className="request-form-card">
          <h3>🎫 New Support Ticket</h3>
          <form onSubmit={handleSubmit} className="request-form">
            <div className="form-row">
              <div className="input-group">
                <label>Subject *</label>
                <input
                  className="input"
                  placeholder="Brief description of the issue"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  required
                />
              </div>
              <div className="input-group">
                <label>Category</label>
                <select
                  className="input"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option value="">Select category...</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="input-group">
              <label>Message *</label>
              <textarea
                className="input"
                rows={5}
                placeholder="Describe your issue in detail..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
              />
            </div>
            <div className="modal-actions">
              <button type="button" className="btn-outline" onClick={() => setShowForm(false)}>
                Cancel
              </button>
              <button type="submit" className="btn-primary" disabled={saving}>
                {saving ? "Submitting..." : "🚀 Submit Ticket"}
              </button>
            </div>
          </form>
        </div>
      )}
        <div className="tickets-count">
         Total Tickets: {tickets.length}
         </div>
      {/* TICKETS LIST */}
      {loading && <div className="page-loading">Loading tickets...</div>}
      {!loading && tickets.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🎫</div>
          <h3>No support requests yet</h3>
          <p>Having an issue? Create a support ticket and we'll help you out!</p>
        </div>
      )}

      <div className="requests-list">
        {tickets.map((t) => {
          const badge = TICKET_BADGE[t.status] || { cls: "badge-gray", label: t.status };
          const isExpanded = expandedId === t.id;
          return (
            <div key={t.id} className="request-card">
              <div
                className="request-card-header"
                onClick={() => setExpandedId(isExpanded ? null : t.id)}
              >
                <div className="request-card-title">
                  <span className="request-service-tag">{t.category || "General"}</span>
                  <h3>{t.subject}</h3>
                </div>
                <div className="request-card-meta">
                  <span className={`status-badge ${badge.cls}`}>{badge.label}</span>
                  <span className="request-date">
                    {t.createdAt ? new Date(t.createdAt).toLocaleDateString() : ""}
                  </span>
                  <span className="expand-btn">{isExpanded ? "▲" : "▼"}</span>
                </div>
              </div>
              {isExpanded && (
                <div className="request-card-body">
                  <p className="req-desc">{t.message}</p>
                  {t.adminReply && (
                    <div className="admin-reply-box">
                      <strong>💬 Devex Response:</strong>
                      <p>{t.adminReply}</p>
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
