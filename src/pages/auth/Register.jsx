import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";

export default function Register() {

  /* ================= STATE ================= */
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= HOOKS ================= */
  const navigate = useNavigate();
  const { login } = useAuth();

  /* ================= HANDLERS ================= */
  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };

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
      // Auto-login after register
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

      <div className="auth-box">

        {/* ================= LEFT SIDE ================= */}
        <div className="auth-left">

          <h1 className="auth-logo">DEVEX</h1>

          <p className="auth-desc">
            Create your account and start building powerful digital products
            with modern tools and technologies. Join us and take your ideas
            to the next level.
          </p>

        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="auth-right">

          <div className="auth-header">
            <h2>Create Account</h2>
            <p>Sign up and start your journey with Devex</p>
          </div>

          {/* ERROR */}
          {error && <div className="auth-error">{error}</div>}

          {/* ================= FORM ================= */}
          <form onSubmit={handleSubmit} className="auth-form">

            {/* NAME */}
            <div className="input-box">
              <input
                type="text"
                name="name"
                required
                autoComplete="off"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <label>Full Name</label>
            </div>

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

            {/* PHONE */}
            <div className="input-box">
              <input
                type="tel"
                name="phone"
                required
                autoComplete="off"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <label>Phone Number</label>
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

            {/* CONFIRM PASSWORD */}
            <div className="input-box password-box">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label>Confirm Password</label>
            </div>

            {/* TERMS */}
            <div className="auth-row">
              <label className="terms-check">
                <input type="checkbox" required />
                <span>I agree to Terms &amp; Conditions</span>
              </label>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>

          {/* FOOTER */}
          <div className="auth-footer">
            <p>
              Already have an account?{" "}
              <Link to="/login">Login</Link>
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}