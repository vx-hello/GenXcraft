import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useEffect } from "react";

const FEATURES = [
  { icon: "⚡", title: "Fast Delivery", desc: "Rapid builds using modern frameworks and CI/CD pipelines without sacrificing quality." },
  { icon: "🎯", title: "Pixel-Perfect UI", desc: "Every interface crafted with precision for maximum usability and visual impact." },
  { icon: "🔒", title: "Secure by Default", desc: "JWT auth, encrypted data, and industry-grade security in every project we ship." },
  { icon: "📈", title: "Built to Scale", desc: "Architecture designed to grow from 10 users to 10 million, without rewrites." },
  { icon: "🧩", title: "Full Stack", desc: "React frontends + Spring Boot backends + Cloud deployments — all under one roof." },
];

const VALUES = [
  { icon: "🤝", label: "Client First", desc: "Your goals are our goals. We build what actually matters to your business." },
  { icon: "🔬", label: "Modern Tech", desc: "We stay ahead of the curve so your products never fall behind." },
  { icon: "🏆", label: "Quality Focus", desc: "Every line of code reviewed, every pixel perfected before delivery." },
  { icon: "🔄", label: "Always There", desc: "Post-launch support, updates, and improvements — we don't disappear." },
];

const NUMBERS = [
  { val: "5+", label: "Projects Shipped" },
  { val: "98%", label: "Client Satisfaction" },
  //{ val: "3yr", label: "In Business" },
  { val: "24h", label: "Response Time" },
];

export default function About() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />

      {/* ============= HERO ============= */}
      <section className="abt-hero">
        <div className="abt-hero-inner">
          <span className="about-badge">ABOUT GenXcraft</span>
          <h1>
            We build digital products<br />
            <span className="abt-grad">worth bragging about.</span>
          </h1>
          <p>
            GenXcraft is a full-stack software studio. We partner with startups and
            businesses to design, build, and ship products that grow fast and
            look amazing doing it.
          </p>
          <div className="abt-hero-nums">
            {NUMBERS.map((n) => (
              <div key={n.label} className="abt-num">
                <span className="abt-num-val">{n.val}</span>
                <span className="abt-num-label">{n.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="abt-hero-visual">
          <div className="abt-orb abt-orb-1" />
          <div className="abt-orb abt-orb-2" />
          <div className="abt-card-float abt-cf-1">
            <span className="abt-cf-icon">🚀</span>
            <div>
              <div className="abt-cf-title">Just Shipped</div>
              <div className="abt-cf-sub">FreelanceOS Platform v1.0</div>
            </div>
          </div>
          <div className="abt-card-float abt-cf-2">
            <span className="abt-cf-icon">✅</span>
            <div>
              <div className="abt-cf-title">99.9% Uptime</div>
              <div className="abt-cf-sub">All systems operational</div>
            </div>
          </div>
          <div className="abt-card-float abt-cf-3">
            <span className="abt-cf-icon">⭐</span>
            <div>
              <div className="abt-cf-title">5-Star Rating</div>
              <div className="abt-cf-sub">From 5+ clients</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============= MISSION ============= */}
      <section className="abt-mission">
        <div className="abt-mission-left">
          <div className="abt-section-tag">OUR MISSION</div>
          <h2>Turning ideas into<br /><em>powerful products.</em></h2>
          <p>
            We believe technology should empower, not complicate. Our team builds
            clean, scalable systems that deliver real-world impact and measurable
            growth.
          </p>
          <p>
            From intuitive frontends to robust backend APIs and cloud deployments,
            we design complete solutions that are fast, reliable, and built to last.
          </p>
          <Link to="/services">
            <button className="btn-outline" style={{ marginTop: '20px' }}>Explore Services →</button>
          </Link>
        </div>
        <div className="abt-mission-right">
          {FEATURES.map((f, i) => (
            <div key={i} className="abt-feature-row">
              <div className="abt-feature-icon">{f.icon}</div>
              <div>
                <div className="abt-feature-title">{f.title}</div>
                <div className="abt-feature-desc">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============= VALUES ============= */}
      <section className="abt-values-section">
        <div className="abt-section-tag" style={{ marginBottom: 12 }}>WHAT DRIVES US</div>
        <h2 className="abt-vals-title">Our Core Values</h2>
        <p className="abt-vals-sub">Principles that guide every project, every decision, every day.</p>
        <div className="abt-vals-grid">
          {VALUES.map((v, i) => (
            <div key={i} className="abt-val-card">
              <div className="abt-val-icon">{v.icon}</div>
              <h3>{v.label}</h3>
              <p>{v.desc}</p>
              <div className="abt-val-num">{String(i + 1).padStart(2, '0')}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============= CTA ============= */}
      <section className="abt-cta">
        <div className="abt-cta-glow" />
        <h2>Let's build something<br /><span className="abt-grad">great together.</span></h2>
        <p>Have an idea? Let's turn it into a scalable digital product that delivers results.</p>
        <div className="cta-buttons">
          <Link to="/contact"><button className="btn-primary">Start a Conversation →</button></Link>
          <Link to="/services"><button className="btn-outline">View Services</button></Link>
        </div>
      </section>
      <Footer />
    </>
  );
}