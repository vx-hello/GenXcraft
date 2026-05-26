import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";

export default function Login() {

  /* ================= STATE ================= */
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= HOOKS ================= */
  const navigate = useNavigate();
  const { login } = useAuth();

  /* ================= FORM HANDLER ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(email, password);
      // data = { token: "...", role: "ADMIN" | "CLIENT" }
      login(data.token, data.role);

      if (data.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/client/dashboard");
      }
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

  /* ================= TOGGLE PASSWORD ================= */
  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="auth-wrapper">

      <div className="auth-box">

        {/* ================= LEFT SIDE ================= */}
        <div className="auth-left">

          <h1 className="auth-logo">DEVEX</h1>

          <p className="auth-desc">
            Build modern, scalable and powerful web applications with ease.
            Join us and take your ideas to the next level with clean and
            efficient digital solutions.
          </p>

        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="auth-right">

          <div className="auth-header">
            <h2>Welcome Back</h2>
            <p>Sign in to continue to your account</p>
          </div>

          {/* ERROR */}
          {error && <div className="auth-error">{error}</div>}

          {/* ================= FORM ================= */}
          <form onSubmit={handleSubmit} className="auth-form">

            {/* EMAIL */}
            <div className="input-box">
              <input
                type="email"
                name="email"
                required
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Email Address</label>
            </div>

            {/* PASSWORD */}
            <div className="input-box password-box">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <label>Password</label>

              <span
                className="toggle-password"
                onClick={togglePassword}
              >
                {showPassword ? "Hide" : "Show"}
              </span>

            </div>

            {/* OPTIONS */}
            <div className="auth-row">

              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

          </form>

          {/* FOOTER */}
          <div className="auth-footer">
            <p>
              Don't have an account?{" "}
              <Link to="/register">Create Account</Link>
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}