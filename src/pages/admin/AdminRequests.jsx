import { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import { getAllRequests, approveRequest, rejectRequest } from "../../api/requestApi";

const STATUS_BADGE = {
  PENDING: { cls: "badge-yellow", label: "⏳ Pending" },
  APPROVED: { cls: "badge-green", label: "✅ Approved" },
  REJECTED: { cls: "badge-red", label: "❌ Rejected" },
};

export default function AdminRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [rejectModal, setRejectModal] = useState(null); // request id
  const [rejectReason, setRejectReason] = useState("");
  const [actioning, setActioning] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [success, setSuccess] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      setRequests(await getAllRequests());
    } catch {
      setError("Failed to load requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleApprove = async (id) => {
    setActioning(id);
    try {
      await approveRequest(id);
      setSuccess("✅ Request approved!");
      await load();
    } catch {
      setError("Approval failed.");
    } finally {
      setActioning(null);
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) return;
    setActioning(rejectModal);
    try {
      await rejectRequest(rejectModal, rejectReason);
      setSuccess("❌ Request rejected.");
      setRejectModal(null);
      setRejectReason("");
      await load();
    } catch {
      setError("Rejection failed.");
    } finally {
      setActioning(null);
    }
  };

  const filtered = filter === "ALL" ? requests : requests.filter((r) => r.status === filter);
  const pending = requests.filter((r) => r.status === "PENDING").length;

  return (
    <AdminLayout title="Client Requests">
      <div className="page-header-row">
        <div>
          <p className="page-subtitle">{requests.length} total requests</p>
          {pending > 0 && (
            <span className="pending-badge">🔔 {pending} pending review</span>
          )}
        </div>
        <div className="filter-tabs">
          {["ALL", "PENDING", "APPROVED", "REJECTED"].map((f) => (
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

      {loading && <div className="page-loading">Loading requests...</div>}

      <div className="requests-list">
        {filtered.length === 0 && !loading && (
          <div className="page-empty">No requests found.</div>
        )}
        {filtered.map((req) => {
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
                  <span className="client-name-tag">👤 {req.clientName}</span>
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
                  <div className="req-client-info">
                    <span>📧 {req.clientEmail}</span>
                  </div>
                  {req.description && <p className="req-desc">{req.description}</p>}
                  <div className="req-details-row">
                    {req.estimatedBudget && (
                      <div className="req-detail">
                        <span>💰 Budget</span>
                        <strong>${Number(req.estimatedBudget).toLocaleString()}</strong>
                      </div>
                    )}
                    {req.timeline && (
                      <div className="req-detail">
                        <span>⏱ Timeline</span>
                        <strong>{req.timeline}</strong>
                      </div>
                    )}
                    {req.fileUrl && (
                      <div className="req-detail">
                        <span>📎 File</span>
                        <strong className="file-attached">Attached</strong>
                      </div>
                    )}
                  </div>

                  {req.status === "REJECTED" && req.rejectionReason && (
                    <div className="rejection-note">
                      <strong>Rejection Reason:</strong> {req.rejectionReason}
                    </div>
                  )}

                  {req.status === "PENDING" && (
                    <div className="action-row">
                      <button
                        className="btn-approve"
                        disabled={actioning === req.id}
                        onClick={() => handleApprove(req.id)}
                      >
                        {actioning === req.id ? "..." : "✅ Approve"}
                      </button>
                      <button
                        className="btn-reject"
                        disabled={actioning === req.id}
                        onClick={() => { setRejectModal(req.id); setRejectReason(""); }}
                      >
                        ❌ Reject
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* REJECT MODAL */}
      {rejectModal && (
        <div className="modal-overlay" onClick={() => setRejectModal(null)}>
          <div className="modal modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Reject Request</h2>
              <button className="modal-close" onClick={() => setRejectModal(null)}>✕</button>
            </div>
            <div className="input-group">
              <label>Rejection Reason *</label>
              <textarea
                className="input"
                rows={4}
                placeholder="Explain why this request is being rejected..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
            </div>
            <div className="modal-actions">
              <button className="btn-outline" onClick={() => setRejectModal(null)}>Cancel</button>
              <button
                className="btn-danger"
                onClick={handleReject}
                disabled={!rejectReason.trim() || actioning}
              >
                {actioning ? "Rejecting..." : "Reject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
