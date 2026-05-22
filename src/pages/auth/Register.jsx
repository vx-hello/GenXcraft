import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../index.css";

export default function Register() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h2>Register</h2>

        <input type="text" placeholder="Name" className="input" />
        <input type="email" placeholder="Email" className="input" />

        <div className="password-box">
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            className="input"
          />
          <span onClick={() => setShow(!show)}>Show</span>
        </div>

        <button onClick={handleSubmit} className="btn-primary">
          Register
        </button>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}