import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../api/authApi";
import "./Auth.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await forgotPassword(email);
      setSuccess(res.message || "Password reset link sent! Please check your email.");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data ||
        "Something went wrong. Please try again.";
      setError(typeof msg === "string" ? msg : "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* BRAND */}
        <div className="auth-brand">
          <span className="auth-brand-logo">G</span>
          <span className="auth-brand-name">GenXcraft</span>
        </div>

        <div className="auth-card-title">
          <h1>Forgot Password?</h1>
          <p>Enter your email and we'll send you a reset link.</p>
        </div>

        {success ? (
          <div className="auth-success-msg">
            <div className="auth-success-icon">✅</div>
            <p>{success}</p>
            <Link to="/login" className="auth-submit-btn" style={{ marginTop: 16, display: "block", textAlign: "center" }}>
              Back to Sign In
            </Link>
          </div>
        ) : (
          <>
            {error && <div className="auth-error-msg">{error}</div>}

            <form onSubmit={handleSubmit} className="auth-form-new">
              <div className="auth-field">
                <label htmlFor="fp-email">Email Address</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">✉️</span>
                  <input
                    id="fp-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link →"}
              </button>
            </form>

            <p className="auth-switch-text">
              Remember your password?{" "}
              <Link to="/login">Sign In</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
