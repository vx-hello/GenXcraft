import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import Footer from "../components/Footer";
import { useEffect } from "react";

const INFO = [
  { icon: "📧", label: "Email Us", value: "Genxcrafthq@gmail.com", tag: "Replies within 2 hours" },
  { icon: "📞", label: "Call Us", value: "+91 9307656010", tag: "Mon–Sat, 9am–7pm" },
  { icon: "📍", label: "Location", value: "India", tag: "Available worldwide remotely" },
  { icon: "⏱", label: "Response", value: "Within 24 hrs", tag: "For all project inquiries" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
  e.preventDefault();

  setLoading(true);

  emailjs
    .send(
      "service_audu3qf",
      "template_0dh7v4b",
      {
        name: form.name,
        email: form.email,
        subject: form.subject,
        phone: form.phone,
        message: form.message,
      },
      "MdHUNlyIIz5FsUEdZ"
    )
    .then(() => {
      setSent(true);

      setForm({
        name: "",
        email: "",
        subject: "",
        phone: "",
        message: "",
      });
    })
    .catch((error) => {
      console.log(error);
      alert("Failed to send message");
    })
    .finally(() => {
      setLoading(false);
    });
};

  return (
    <>
      <Navbar />

      {/* ======= HEADER ======= */}
      <section className="cnt-header">
        <div className="cnt-header-inner">
          <span className="contact-badge">GET IN TOUCH</span>
          <h1>
            Let's talk about<br />
            <span className="cnt-grad">your project.</span>
          </h1>
          <p>
            Every great product starts with a conversation. Tell us what you're
            building and we'll show you how to make it exceptional.
          </p>
        </div>
        <div className="cnt-info-strip">
          {INFO.map((item) => (
            <div key={item.label} className="cnt-info-chip">
              <span className="cnt-info-icon">{item.icon}</span>
              <div>
                <div className="cnt-info-label">{item.label}</div>
                <div className="cnt-info-val">{item.value}</div>
                <div className="cnt-info-tag">{item.tag}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======= FORM ======= */}
      <section className="cnt-body">
        <div className="cnt-form-wrap">
          <div className="cnt-form-header">
            <h2>Send a Message</h2>
            <p>We'll get back to you within 24 hours — guaranteed.</p>
          </div>

          {sent ? (
            <div className="cnt-success">
              <div className="cnt-success-icon">✅</div>
              <h3>Message sent!</h3>
              <p>Thanks for reaching out. We'll get back to you within 24 hours.</p>
              <button className="btn-outline" onClick={() => setSent(false)}>Send Another</button>
            </div>
          ) : (
            <form className="cnt-form" onSubmit={handleSubmit}>
              <div className="cnt-form-row">
                <div className="cnt-field">
                  <label>Full Name *</label>
                  <input type="text" name="name" placeholder="Your full name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="cnt-field">
                  <label>Email Address *</label>
                  <input type="email" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="cnt-form-row">
                <div className="cnt-field">
                  <label>Subject *</label>
                  <input type="text" name="subject" placeholder="e.g. E-Commerce Website" value={form.subject} onChange={handleChange} required />
                </div>
                <div className="cnt-field">
                  <label>Phone (optional)</label>
                  <input type="text" name="phone" placeholder="+91 00000 00000" value={form.phone} onChange={handleChange} />
                </div>
              </div>
              <div className="cnt-field">
                <label>Your Message *</label>
                <textarea name="message" rows={6} placeholder="Tell us about your project — what are you building, what's the timeline, budget range..." value={form.message} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
                {loading ? "Sending..." : "Send Message →"}
              </button>
            </form>
          )}
        </div>

        {/* SIDE PANEL */}
        <div className="cnt-side">
          <div className="cnt-side-card">
            <div className="cnt-side-icon">💬</div>
            <h3>Quick Chat</h3>
            <p>Prefer to talk directly? Reach us via WhatsApp for a faster response.</p>
            <a href="https://wa.me/+919930350189" target="_blank" rel="noreferrer">
              <button className="btn-outline" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}>
                Open WhatsApp →
              </button>
            </a>
          </div>
          <div className="cnt-side-card">
            <div className="cnt-side-icon">🚀</div>
            <h3>Start a Project</h3>
            <p>Already have an account? Submit a formal project request through the portal.</p>
            <Link to="/register">
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}>
                Get Started →
              </button>
            </Link>
          </div>
          <div className="cnt-faq">
            <h4>Common Questions</h4>
            <div className="cnt-faq-item">
              <strong>How fast can you start?</strong>
              <span>Most projects begin within 5 business days of approval.</span>
            </div>
            <div className="cnt-faq-item">
              <strong>What's your minimum budget?</strong>
              <span>We work with budgets starting at ₹25,000 for MVPs.</span>
            </div>
            <div className="cnt-faq-item">
              <strong>Do you offer maintenance?</strong>
              <span>Yes — monthly retainers include support, updates, and hosting.</span>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}