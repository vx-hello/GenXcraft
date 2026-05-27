import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-brand">

          <h2 className="footer-logo">DEVEX</h2>

          <p>
            DEVEX Solutions builds modern websites,
            scalable web applications, AI solutions,
            and digital experiences for startups
            and businesses.
          </p>

          <div className="footer-socials">
            <a href="/">🌐</a>
            <a href="/">💼</a>
            <a href="/">📷</a>
          </div>

        </div>

        {/* LINKS */}
        <div className="footer-links">

          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/Services">Services</Link>
          <Link to="/About">About</Link>
          <Link to="/Contact">Contact</Link>

        </div>

        {/* SERVICES */}
        <div className="footer-links">

          <h3>Why DEVEX?</h3>

         <span>Modern UI/UX</span>
         <span>Fast Delivery</span>
        <span>Scalable Solutions</span>
         <span>24/7 Support</span>
        <span>Secure Systems</span>
          </div>

        {/* CONTACT */}
        <div className="footer-links">

          <h3>Contact</h3>

          <span>📍 India</span>
          <span>📧 thedevexhq@gmail.com</span>
          <span>📞 +91 930765010</span>

        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        © 2026 DEVEX . All Rights Reserved.
      </div>

    </footer>
  );
}