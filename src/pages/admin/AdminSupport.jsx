import { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import { getAllTickets, replyTicket, markTicketInReview } from "../../api/supportApi";

const STATUS_BADGE = {
  OPEN: { cls: "badge-yellow", label: "🟡 Open" },
  IN_REVIEW: { cls: "badge-blue", label: "🔵 In Review" },
  CLOSED: { cls: "badge-green", label: "✅ Closed" },
};

export default function AdminSupport() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [replyModal, setReplyModal] = useState(null);
  const [reply, setReply] = useState("");
  const [actioning, setActioning] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [success, setSuccess] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      setTickets(await getAllTickets());
    } catch {
      setError("Failed to load tickets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

  window.scrollTo(0, 0);

  load();

}, []);

  const handleMarkReview = async (id) => {
    setActioning(id);
    try {
      await markTicketInReview(id);
      setSuccess("Ticket marked as In Review.");
      await load();
    } catch {
      setError("Action failed.");
    } finally {
      setActioning(null);
    }
  };

  const handleReply = async () => {
    if (!reply.trim()) return;
    setActioning(replyModal);
    try {
      await replyTicket(replyModal, reply);
      setSuccess("✅ Reply sent and ticket closed.");
      setReplyModal(null);
      setReply("");
      await load();
    } catch {
      setError("Reply failed.");
    } finally {
      setActioning(null);
    }
  };

  const filtered = filter === "ALL" ? tickets : tickets.filter((t) => t.status === filter);
  const openCount = tickets.filter((t) => t.status === "OPEN").length;

  return (
    <AdminLayout title="Support Tickets">
      <div className="page-header-row">
        <div>
          <p className="page-subtitle">{tickets.length} total tickets</p>
          {openCount > 0 && (
            <span className="pending-badge">🔔 {openCount} open tickets</span>
          )}
        </div>
        <div className="filter-tabs">
          {["ALL", "OPEN", "IN_REVIEW", "CLOSED"].map((f) => (
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

      {success && (
        <div className="alert-success" onClick={() => setSuccess("")}>{success}</div>
      )}
      {error && <div className="page-error">{error}</div>}

      {loading && <div className="page-loading">Loading tickets...</div>}

      <div className="requests-list">
        {filtered.length === 0 && !loading && (
          <div className="page-empty">No support tickets available.</div>
        )}
        {filtered.map((t) => {
          const badge = STATUS_BADGE[t.status] || { cls: "badge-gray", label: t.status };
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
                  <span className="client-name-tag">👤 {t.clientName}</span>
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
                  <div className="req-client-info">
                    <span>🆔 {t.id}</span>
                     </div>

                 <div className="req-client-info">
                  <span>📧 {t.clientEmail}</span>
                  </div>

                 <div className="req-client-info">
                 <span>
                 🕒 Updated:
                  {t.updatedAt
                  ? new Date(t.updatedAt).toLocaleDateString()
                  : "N/A"}
                   </span>
                   </div>

                   <p className="req-desc">{t.message}</p>

                  {t.adminReply && (
                    <div className="admin-reply-box">
                      <strong>💬 Your Reply:</strong>
                      <p>{t.adminReply}</p>
                    </div>
                  )}

                  {t.status !== "CLOSED" && (
                    <div className="action-row">
                      {t.status === "OPEN" && (
                        <button
                          className="btn-outline btn-sm"
                          disabled={actioning === t.id}
                          onClick={() => handleMarkReview(t.id)}
                        >
                          🔵 Mark In Review
                        </button>
                      )}
                      <button
                        className="btn-approve"
                        onClick={() => { setReplyModal(t.id); setReply(""); }}
                      >
                        💬 Reply & Close
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* REPLY MODAL */}
      {replyModal && (
        <div className="modal-overlay" onClick={() => setReplyModal(null)}>
          <div className="modal modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Reply to Ticket</h2>
              <button className="modal-close" onClick={() => setReplyModal(null)}>✕</button>
            </div>
            <div className="input-group">
              <label>Your Reply *</label>
              <textarea
                className="input"
                rows={5}
                placeholder="Write your response here..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />
            </div>
            <div className="modal-actions">
              <button className="btn-outline" onClick={() => setReplyModal(null)}>Cancel</button>
              <button
                className="btn-primary"
                onClick={handleReply}
                disabled={!reply.trim() || actioning}
              >
                {actioning ? "Sending..." : "Send & Close"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
