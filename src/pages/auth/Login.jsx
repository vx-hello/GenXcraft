import { useState } from "react";
import { Link } from "react-router-dom";
import "../../index.css";

export default function Login() {
  const [show, setShow] = useState(false);

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h2>Login</h2>

        <input type="email" placeholder="Email" className="input" />

        <div className="password-box">
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            className="input"
          />
          <span onClick={() => setShow(!show)}>Show</span>
        </div>

        <button className="btn-primary">Login</button>

        {/* 🔥 NEW USER LINK INSIDE */}
        <p className="auth-link">
          New user? <Link to="/register">Register</Link>
        </p>

      </div>
    </div>
  );
}