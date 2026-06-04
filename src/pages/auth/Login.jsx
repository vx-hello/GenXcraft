import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await loginUser(email, password);
      login(data.token, data.role);
      if (data.role === "ADMIN") navigate("/admin/dashboard");
      else navigate("/client/dashboard");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data ||
        "Invalid email or password. Please try again.";
      setError(typeof msg === "string" ? msg : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">

        {/* ========== LEFT PANEL ========== */}
        <div className="auth-left">
          <h1 className="auth-logo">DEVEX</h1>

          <div className="auth-left-body">
            <h2 className="auth-left-tagline">
              Build. Launch.<br />Grow.
            </h2>
            <p className="auth-desc">
              Build modern, scalable and powerful web applications with ease.
              Join us and take your ideas to the next level with clean and
              efficient digital solutions.
            </p>
          </div>

          <div className="auth-left-features">
            <div className="auth-feature-chip">⚡ Fast Delivery</div>
            <div className="auth-feature-chip">🔒 Secure Platform</div>
            <div className="auth-feature-chip">🌍 Global Reach</div>
          </div>
        </div>

        {/* ========== RIGHT PANEL (form — unchanged) ========== */}
        <div className="auth-right">

          <div className="auth-header">
            <h2>Welcome Back</h2>
            <p>Sign in to continue to your account</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">

            {/* EMAIL */}
            <div className="auth-field">
              <label htmlFor="login-email">Email Address</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon">✉️</span>
                <input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="auth-field">
              <div className="auth-field-header">
                <label htmlFor="login-password">Password</label>
                
            </div>
              <div className="auth-input-wrap">
                <span className="auth-input-icon">🔒</span>
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
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
              <Link to="/forgot-password" className="auth-forgot-link">
                  Forgot password?
                </Link>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? "Signing In..." : "Sign In →"}
            </button>
          </form>

          <p className="auth-switch-text">
            Don't have an account?{" "}
            <Link to="/register">Create Account</Link>
          </p>

        </div>
      </div>
    </div>
  );
}
