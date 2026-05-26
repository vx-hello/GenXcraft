import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const FEATURES = [
  { icon: "⚡", title: "Fast Development", desc: "Ship in weeks, not months. Optimized workflows, zero bloat.", span: 2 },
  { icon: "🎨", title: "Clean UI/UX", desc: "Interfaces users love — intuitive, accessible, beautiful.", span: 1 },
  { icon: "🔒", title: "Secure Apps", desc: "JWT, encryption, OWASP-compliant by default.", span: 1 },
  { icon: "📈", title: "Built to Scale", desc: "From 10 to 10M users without rewriting everything.", span: 2 },
  { icon: "🧩", title: "Modern Tech", desc: "React, Spring Boot, MySQL, Cloud — production-grade stack.", span: 1 },
];

const TECH = ["React", "Spring Boot", "MySQL", "JWT Auth", "REST API", "Cloud Deploy", "Figma", "Git CI/CD"];

export default function Homepage() {
  return (
    <div>
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-left">
          <span className="badge">DEVEX SOLUTIONS</span>
          <h1>
            Build <span className="grad-text">Modern</span><br />
            Digital Products
          </h1>
          <p>
            We design and ship high-performance web apps with clean UI and
            modern architecture — fast. Your vision, our execution.
          </p>
          <div className="hero-buttons">
            <Link to="/services"><button className="btn-primary">Explore Services →</button></Link>
            <Link to="/about"><button className="btn-outline">Our Story</button></Link>
          </div>
          <div className="hero-stats">
            <div className="stat"><h3>50+</h3><p>Projects Shipped</p></div>
            <div className="stat"><h3>98%</h3><p>Client Satisfaction</p></div>
            <div className="stat"><h3>24h</h3><p>Response Time</p></div>
          </div>
        </div>

        {/* BENTO VISUAL */}
        <div className="hero-right">
          <div className="hero-visual">
            <div className="hv-card wide" style={{ "--accent": "linear-gradient(135deg,#2563eb,#7c3aed)" }}>
              <div className="hv-icon">🚀</div>
              <div className="hv-num">50+</div>
              <div className="hv-label">Projects delivered worldwide</div>
            </div>
            <div className="hv-card" style={{ "--accent": "linear-gradient(135deg,#0ea5e9,#22d3ee)" }}>
              <div className="hv-icon">⚡</div>
              <div className="hv-num">2 wk</div>
              <div className="hv-label">Avg. MVP time</div>
            </div>
            <div className="hv-card" style={{ "--accent": "linear-gradient(135deg,#10b981,#34d399)" }}>
              <div className="hv-icon">✅</div>
              <div className="hv-num">98%</div>
              <div className="hv-label">Client satisfaction</div>
            </div>
            <div className="hv-card" style={{ "--accent": "linear-gradient(135deg,#f97316,#ec4899)" }}>
              <div className="hv-icon">🔒</div>
              <div className="hv-num">100%</div>
              <div className="hv-label">Secure by default</div>
            </div>
            <div className="hv-card" style={{ "--accent": "linear-gradient(135deg,#8b5cf6,#3b82f6)" }}>
              <div className="hv-icon">🌍</div>
              <div className="hv-num">24/7</div>
              <div className="hv-label">Support available</div>
            </div>
          </div>
        </div>
      </section>

      {/* TECH STRIP */}
      <div className="tech-strip">
        <div className="tech-strip-inner">
          {[...TECH, ...TECH].map((t, i) => (
            <span key={i} className="tech-pill">{t}</span>
          ))}
        </div>
      </div>

      {/* ===== FEATURES ===== */}
      <section className="section">
        <div className="section-header">
          <span className="section-tag">WHY DEVEX</span>
          <h2>Everything you need,<br />nothing you don't.</h2>
          <p>We cut the fluff and focus on what actually ships — fast, clean, scalable digital products.</p>
        </div>

        <div className="hp-features-grid">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="hp-feature-card"
              style={{ gridColumn: `span ${f.span}` }}
            >
              <span className="hp-f-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="hp-process">
        <div className="section-header">
          <span className="section-tag">OUR PROCESS</span>
          <h2>From idea to launch<br />in 4 steps.</h2>
        </div>
        <div className="hp-steps">
          {["Discover", "Design", "Build", "Launch"].map((s, i) => (
            <div key={s} className="hp-step">
              <div className="hp-step-num">0{i + 1}</div>
              <div className="hp-step-label">{s}</div>
              {i < 3 && <div className="hp-step-arrow">→</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-section">
        <h2>Ready to build something<br />extraordinary?</h2>
        <p>Join 50+ businesses that chose Devex to power their digital future.</p>
        <div className="cta-buttons">
          <Link to="/contact"><button className="btn-primary">Start Your Project →</button></Link>
          <Link to="/services"><button className="btn-outline">View Services</button></Link>
        </div>
      </section>
    </div>
  );
}