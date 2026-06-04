import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const data = await registerUser({ fullName, email, password, phone });
      login(data.token, data.role);
      navigate("/client/dashboard");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data ||
        "Registration failed. Please try again.";
      setError(typeof msg === "string" ? msg : "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box auth-box-wide">

        {/* ========== LEFT PANEL ========== */}
        <div className="auth-left">
          <h1 className="auth-logo">DEVEX</h1>

          <div className="auth-left-body">
            <h2 className="auth-left-tagline">
              Start Your<br />Journey Today.
            </h2>
            <p className="auth-desc">
              Create your account and start building powerful digital products
              with modern tools and technologies. Join us and take your ideas
              to the next level.
            </p>
          </div>

          <div className="auth-left-features">
            <div className="auth-feature-chip">🚀 Quick Setup</div>
            <div className="auth-feature-chip">📊 Real-time Dashboard</div>
            <div className="auth-feature-chip">🤝 Dedicated Support</div>
          </div>
        </div>

        {/* ========== RIGHT PANEL ========== */}
        <div className="auth-right">

          <div className="auth-header">
            <h2>Create Account</h2>
            <p>Sign up and start your journey with Devex</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">

            {/* NAME + PHONE ROW */}
            <div className="auth-fields-row">
              <div className="auth-field">
                <label htmlFor="reg-name">Full Name</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">👤</span>
                  <input
                    id="reg-name"
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    autoComplete="name"
                  />
                </div>
              </div>

              <div className="auth-field">
                <label htmlFor="reg-phone">Phone Number</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">📱</span>
                  <input
                    id="reg-phone"
                    type="tel"
                    placeholder="+91 00000 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    autoComplete="tel"
                  />
                </div>
              </div>
            </div>

            {/* EMAIL */}
            <div className="auth-field">
              <label htmlFor="reg-email">Email Address</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon">✉️</span>
                <input
                  id="reg-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* PASSWORD + CONFIRM ROW */}
            <div className="auth-fields-row">
              <div className="auth-field">
                <label htmlFor="reg-password">Password</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">🔒</span>
                  <input
                    id="reg-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
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
                <label htmlFor="reg-confirm">Confirm Password</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">🔒</span>
                  <input
                    id="reg-confirm"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account →"}
            </button>
          </form>

          <p className="auth-switch-text">
            Already have an account?{" "}
            <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}