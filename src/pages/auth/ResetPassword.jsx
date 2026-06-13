import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../../api/authApi";
import "./Auth.css";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!token) {
      setError("Invalid or missing reset token.");
      return;
    }
    setLoading(true);
    try {
      await resetPassword(token, password);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data ||
        "Failed to reset password. The link may have expired.";
      setError(typeof msg === "string" ? msg : "Reset failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* BRAND */}
        <div className="auth-brand">
          <span className="auth-brand-logo">D</span>
          <span className="auth-brand-name">GenXcraft</span>
        </div>

        <div className="auth-card-title">
          <h1>Reset Password</h1>
          <p>Enter your new password below.</p>
        </div>

        {success ? (
          <div className="auth-success-msg">
            <div className="auth-success-icon">✅</div>
            <p>Password updated successfully! Redirecting to login...</p>
            <Link to="/login" className="auth-submit-btn" style={{ marginTop: 16, display: "block", textAlign: "center" }}>
              Go to Sign In
            </Link>
          </div>
        ) : (
          <>
            {!token && (
              <div className="auth-error-msg">
                Invalid reset link. Please request a new one.
              </div>
            )}

            {error && <div className="auth-error-msg">{error}</div>}

            <form onSubmit={handleSubmit} className="auth-form-new">

              <div className="auth-field">
                <label htmlFor="rp-password">New Password</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">🔒</span>
                  <input
                    id="rp-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="auth-eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <div className="auth-field">
                <label htmlFor="rp-confirm">Confirm New Password</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">🔒</span>
                  <input
                    id="rp-confirm"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                  />
                </div>
              </div>

              <button type="submit" className="auth-submit-btn" disabled={loading || !token}>
                {loading ? "Updating..." : "Reset Password →"}
              </button>
            </form>

            <p className="auth-switch-text">
              <Link to="/login">← Back to Sign In</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
