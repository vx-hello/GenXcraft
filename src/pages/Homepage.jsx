import { Link } from "react-router-dom";
import { useState } from "react";
import "../index.css";

export default function Homepage() {
  const [dark, setDark] = useState(true);

  const toggleTheme = () => {
    setDark(!dark);
    document.body.classList.toggle("light");
  };

  return (
    <div>

      {/* NAVBAR */}
      <nav className="nav">
        <h2 className="logo">DEVEX</h2>

        <div className="nav-links">
          <button onClick={toggleTheme} className="theme-btn">
            {dark ? "Dark" : "Light"}
          </button>

          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <Link to="/login">Login</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero premium">

        <div className="hero-content">

          <span className="badge">🚀 Modern Digital Solutions</span>

          <h1>
            We Build Scalable <span>Web Solutions</span>
          </h1>

          <p>
            Devex helps businesses grow with high-performance websites,
            APIs, and clean UI/UX systems built for modern users.
          </p>

          <div className="hero-buttons">
            <Link to="/register">
              <button className="btn-primary">Start Project</button>
            </Link>

            <a href="#services">
              <button className="btn-outline">Explore Services</button>
            </a>
          </div>

        </div>

      </section>

      {/* SERVICES */}
      <section id="services" className="section">
        <h2>Our Services</h2>

        <div className="cards">
          <div className="card">
            <h3>Web Development</h3>
            <p>Fast, scalable and modern websites.</p>
          </div>

          <div className="card">
            <h3>Frontend</h3>
            <p>Beautiful UI with React & animations.</p>
          </div>

          <div className="card">
            <h3>Backend</h3>
            <p>Secure APIs and database systems.</p>
          </div>

          <div className="card">
            <h3>API Development</h3>
            <p>REST APIs & integrations.</p>
          </div>

          <div className="card">
            <h3>UI/UX Design</h3>
            <p>Clean and user-friendly design.</p>
          </div>

          <div className="card">
            <h3>Bug Fixing</h3>
            <p>Fix errors and optimize performance.</p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section">
        <h2>About Devex</h2>
        <p className="about-text">
          Devex is a modern development company specializing in web apps,
          APIs, and UI/UX systems. We focus on performance, scalability,
          and clean design to deliver real business results.
        </p>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section">
        <h2>Contact</h2>
        <p>Email: devex@gmail.com</p>
        <p>Phone: +91 9876543210</p>
      </section>

      <footer className="footer">
        <p>© 2026 Devex</p>
      </footer>

    </div>
  );
}