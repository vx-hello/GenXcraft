import { useState, useEffect } from "react";
import ClientLayout from "../../components/ClientLayout";
import { getClientProfile } from "../../api/clientApi";

export default function ClientProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getClientProfile()
      .then(setProfile)
      .catch(() => setError("Failed to load profile."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ClientLayout title="My Profile">
      {loading && <div className="page-loading">Loading profile...</div>}
      {error && <div className="page-error">{error}</div>}

      {profile && (
        <div className="profile-wrap">
          <div className="profile-card">
            <div className="profile-avatar">
              {profile.fullName?.charAt(0).toUpperCase()}
            </div>
            <h2 className="profile-name">{profile.fullName}</h2>
            <span className="profile-role-badge">CLIENT</span>

            <div className="profile-fields">
              <div className="profile-field">
                <div className="field-icon">📧</div>
                <div className="field-info">
                  <div className="field-label">Email Address</div>
                  <div className="field-value">{profile.email}</div>
                </div>
              </div>
              <div className="profile-field">
                <div className="field-icon">📱</div>
                <div className="field-info">
                  <div className="field-label">Phone Number</div>
                  <div className="field-value">{profile.phone || "—"}</div>
                </div>
              </div>
              <div className="profile-field">
                <div className="field-icon">🆔</div>
                <div className="field-info">
                  <div className="field-label">Client ID</div>
                  <div className="field-value id-mono">{profile.id}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </ClientLayout>
  );
}
