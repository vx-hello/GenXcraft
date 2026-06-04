import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (path) =>
    location.pathname === path ? "nav-active" : "";

  return (
    <>
      <nav className="nav">

        {/* LEFT */}
        <div className="nav-left">
          <Link to="/" className="logo">DEVEX</Link>
        </div>

        {/* CENTER (desktop) */}
        <div className="nav-center">
          <Link to="/" className={isActive("/")}>Home</Link>
          <Link to="/services" className={isActive("/services")}>Services</Link>
          <Link to="/about" className={isActive("/about")}>About</Link>
          <Link to="/contact" className={isActive("/contact")}>Contact</Link>
        </div>

        {/* RIGHT */}
        <div className="nav-right">
          <Link to="/login" className="btn-nav">Login</Link>

          {/* Hamburger (mobile only) */}
          <button
            className={`nav-hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`nav-mobile-overlay ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div className={`nav-mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="nav-mobile-header">
          <span className="logo">DEVEX</span>
          <button
            className="nav-mobile-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >✕</button>
        </div>

        <nav className="nav-mobile-links">
          <Link to="/" className={`nav-mobile-link ${isActive("/")}`}>🏠 Home</Link>
          <Link to="/services" className={`nav-mobile-link ${isActive("/services")}`}>⚡ Services</Link>
          <Link to="/about" className={`nav-mobile-link ${isActive("/about")}`}>ℹ️ About</Link>
          <Link to="/contact" className={`nav-mobile-link ${isActive("/contact")}`}>📬 Contact</Link>
        </nav>

        <div className="nav-mobile-footer">
          <Link to="/login" className="btn-nav" style={{ textAlign: "center", display: "block" }}>
            Login
          </Link>
        </div>
      </div>
    </>
  );
}