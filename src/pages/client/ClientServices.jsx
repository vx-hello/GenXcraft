import { useState, useEffect } from "react";
import ClientLayout from "../../components/ClientLayout";
import { Link } from "react-router-dom";
import { getClientServices } from "../../api/servicesApi";

const processSteps = [
  { num: "01", title: "Consultation", desc: "Submit your project request and we discuss your requirements in detail." },
  { num: "02", title: "Proposal", desc: "We send a detailed proposal with timeline, cost breakdown, and tech stack." },
  { num: "03", title: "Development", desc: "Our team builds your project with weekly updates and milestone reviews." },
  { num: "04", title: "Delivery", desc: "We deliver, test, and deploy your project with full documentation." },
];

// Fallback services if backend has none
const defaultServices = [
  {
    id: "default-1", icon: "🌐", title: "Web Development", color: "#38bdf8",
    description: "High-performance, scalable websites built with modern tech stacks.",
    features: "React,Spring Boot,Database Design,SEO Optimized",
  },
  {
    id: "default-2", icon: "📱", title: "Mobile App Development", color: "#a78bfa",
    description: "Cross-platform mobile apps that work seamlessly on iOS and Android.",
    features: "React Native,Flutter,Push Notifications,App Store Deployment",
  },
  {
    id: "default-3", icon: "🎨", title: "UI/UX Design", color: "#f472b6",
    description: "Beautiful, user-friendly interfaces designed to convert visitors into customers.",
    features: "Figma Prototypes,User Research,Design Systems,Responsive Design",
  },
  {
    id: "default-4", icon: "⚡", title: "API Development", color: "#34d399",
    description: "Secure, scalable REST APIs and microservices.",
    features: "REST APIs,JWT Auth,Third-party Integrations,API Documentation",
  },
  {
    id: "default-5", icon: "🛒", title: "E-Commerce Solutions", color: "#fbbf24",
    description: "Complete online stores with payment gateways and inventory management.",
    features: "Payment Gateway,Inventory System,Order Tracking,Admin Panel",
  },
  {
    id: "default-6", icon: "🚀", title: "Startup MVP", color: "#fb923c",
    description: "Launch your idea fast with a minimum viable product built in weeks.",
    features: "Rapid Prototyping,Lean Development,Market Validation,Scalable Architecture",
  },
];

export default function ClientServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getClientServices()
      .then((data) => {
        setServices(data.length > 0 ? data : defaultServices);
      })
      .catch(() => {
        setServices(defaultServices);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <ClientLayout title="Our Services">
      {/* HERO */}
      <div className="client-services-hero">
        <div>
          <h2>What We Build for You</h2>
          <p>Premium digital solutions tailored for startups and growing businesses. Choose a service and let's build together.</p>
        </div>
        <Link to="/client/requests">
          <button className="btn-primary">🚀 Start a Project</button>
        </Link>
      </div>

      {loading && <div className="page-loading">Loading services...</div>}

      {/* SERVICES GRID */}
      {!loading && (
        <div className="services-grid">
          {services.map((s) => {
            const featureList = s.features
              ? s.features.split(",").map((f) => f.trim()).filter(Boolean)
              : [];
            return (
              <div key={s.id} className="service-card" style={{ "--svc-color": s.color }}>
                <div
                  className="service-icon"
                  style={{ background: `${s.color}18`, color: s.color }}
                >
                  {s.icon}
                </div>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                {featureList.length > 0 && (
                  <ul className="service-features">
                    {featureList.map((f) => (
                      <li key={f}>
                        <span style={{ color: s.color }}>✓</span> {f}
                      </li>
                    ))}
                  </ul>
                )}
                <Link to="/client/requests">
                  <button className="btn-outline btn-sm service-cta">
                    Request This →
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      )}

      {/* PROCESS */}
      <div className="process-section">
        <h2>How We Work</h2>
        <div className="process-steps">
          {processSteps.map((step) => (
            <div key={step.num} className="process-step">
              <div className="step-num">{step.num}</div>
              <div className="step-content">
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="services-cta-card">
        <h3>Ready to Build Something Amazing?</h3>
        <p>Submit a project request and get a response within 24 hours.</p>
        <div className="cta-buttons">
          <Link to="/client/requests">
            <button className="btn-primary">🚀 Submit Request</button>
          </Link>
          <Link to="/client/support">
            <button className="btn-outline">💬 Talk to Us</button>
          </Link>
        </div>
      </div>
    </ClientLayout>
  );
}
