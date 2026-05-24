import { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import { getAllClients } from "../../api/adminApi";

export default function AdminClients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllClients()
      .then(setClients)
      .catch(() => setError("Failed to load clients."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = clients.filter(
    (c) =>
      c.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout title="Clients">
      <div className="page-header-row">
        <p className="page-subtitle">{clients.length} registered clients</p>
        <input
          className="input search-input"
          placeholder="🔍 Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && <div className="page-loading">Loading clients...</div>}
      {error && <div className="page-error">{error}</div>}

      {!loading && !error && (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Client ID</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="table-empty">
                    No clients found.
                  </td>
                </tr>
              )}
              {filtered.map((c, i) => (
                <tr key={c.id}>
                  <td>{i + 1}</td>
                  <td>
                    <div className="client-avatar-row">
                      <div className="client-avatar">
                        {c.fullName?.charAt(0).toUpperCase()}
                      </div>
                      <strong>{c.fullName}</strong>
                    </div>
                  </td>
                  <td>{c.email}</td>
                  <td>{c.phone || "—"}</td>
                  <td>
                    <span className="id-pill">
                      {String(c.id).slice(0, 8)}...
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
