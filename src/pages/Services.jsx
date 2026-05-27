import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useEffect } from "react";



export default function Services() {

  /* ================= NAVIGATION ================= */
  const navigate = useNavigate();

  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  /* ================= DATA ================= */
 const servicesData = [
  {
    icon: "💻",
    title: "Web Application Development",
    desc: "Custom web applications built using modern technologies with scalable architecture."
  },
  {
    icon: "🌐",
    title: "Business Websites",
    desc: "Professional responsive websites designed for your brand."
  },
  {
    icon: "🛒",
    title: "E-Commerce Solutions",
    desc: "Secure online stores with modern UI and payment integration."
  },
  {
    icon: "⚙️",
    title: "API Development",
    desc: "Powerful REST APIs and third-party integrations."
  },
  {
    icon: "📊",
    title: "Admin Dashboards",
    desc: "Analytics dashboards with full data control and management."
  },
  {
    icon: "☁️",
    title: "Deployment & Hosting",
    desc: "Fast cloud deployment and reliable hosting solutions."
  },
  {
    icon: "🎨",
    title: "UI/UX Design",
    desc: "Modern, clean, and user-focused interface designs crafted for better user experience and engagement."
  },
  {
    icon: "🤖",
    title: "AI & Automation",
    desc: "Smart AI-powered solutions and workflow automation to improve business efficiency and productivity."
  },
  {
    icon: "🛠️",
    title: "Maintenance & Support",
    desc: "Reliable technical support, bug fixing, updates, and performance optimization for your applications."
  }
];

  const processSteps = [
    "Requirement",
    "Planning",
    "Development",
    "Testing",
    "Deployment"
  ];

  return (
    <>
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="services-hero">

        <span className="services-badge">SERVICES</span>

        <h1>Our Services</h1>

        <p>
          We provide modern, scalable, and high-performance solutions for startups
          and businesses. Our goal is to help you build strong digital products
          that grow with your business.
        </p>

      </section>

      {/* ================= SERVICES GRID ================= */}
      <section className="services-grid">

        {servicesData.map((item, index) => (
          <div key={index} className="service-card">

            <div className="icon">{item.icon}</div>

            <h3>{item.title}</h3>

            <p>{item.desc}</p>

          </div>
        ))}

      </section>

      {/* ================= PROCESS ================= */}
      <section className="process-section">

        <h2>Our Process</h2>

        <p className="process-sub">
          We follow a structured process to deliver high-quality results.
        </p>

        <div className="process-line">

          {processSteps.map((step, index) => (
            <div key={index} className="process-item">

              <div className="step">
                <div className="circle">{index + 1}</div>
                <p>{step}</p>
              </div>

              {/* ARROW */}
              {index !== processSteps.length - 1 && (
                <span className="arrow">➜</span>
              )}

            </div>
          ))}

        </div>

      </section>

      {/* ================= CTA ================= */}
      <section className="cta-section">

        <h2>Ready to Start Your Project?</h2>

        <p>
          Let’s build something amazing together. Contact us today and turn your
          ideas into reality with our expert team.
        </p>

        <div className="cta-buttons">

          <button
            className="btn-primary"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>

          <button
            className="btn-outline"
            onClick={() => navigate("/contact")}
          >
            Contact Us
          </button>

        </div>

      </section>
      <Footer />

  

    </>
  );
}