"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
// React Icons imports
import {
  FiMail,
  FiMapPin,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
  FiLoader,
  FiClock,
  FiArrowUpRight,
} from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import { fadeUp, fadeLeft, fadeRight, viewport } from "@/lib/animations";
import { useContactStore } from "@/store/contactStore";

const contactInfo = [
  {
    icon: FiMail,
    label: "Email",
    value: "alirazamehar732@gmail.com",
    href: "mailto:alirazamehar732@gmail.com",
  },
  // {
  //   icon: FiMapPin,
  //   label: "Location",
  //   value: "Kasur, Pakistan",
  //   href: "https://maps.google.com/?q=Kasur+Pakistan",
  // },
  {
    icon: FiSend,
    label: "Message",
    value: "Send me a message",
    href: "/contact",
  },
  {
    icon: FaGithub,
    label: "GitHub",
    value: "github.com/alirazamehar732-hub",
    href: "https://github.com/alirazamehar732-hub",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/ali32",
    href: "https://linkedin.com/in/ali32",
  },
];

const socials = [
  { label: "GitHub", href: "https://github.com/alirazamehar732-hub", icon: FaGithub },
  { label: "LinkedIn", href: "https://linkedin.com/in/ali32", icon: FaLinkedin },
];


export default function Contact() {
  const ref    = useRef(null);
  const inView = useInView(ref, viewport);
  const { form, status, setField, setStatus, resetForm } = useContactStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });
      if (res.ok) { setStatus("success"); resetForm(); }
      else          setStatus("error");
    } catch {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <>
      <style>{`
        /* ── layout ── */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.35fr;
          gap: 48px;
          align-items: start;
        }
        @media (max-width: 860px) {
          .contact-grid { grid-template-columns: 1fr; gap: 36px; }
        }

        /* ── name/email row ── */
        .contact-name-email {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 480px) {
          .contact-name-email { grid-template-columns: 1fr; }
        }

        /* ── info card ── */
        .contact-info-card {
          display: flex;
          align-items: center;
          gap: 14px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 16px 18px;
          text-decoration: none;
          transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .contact-info-card:hover {
          border-color: rgba(201,168,76,0.4);
          transform: translateX(4px);
          box-shadow: 0 4px 20px rgba(201,168,76,0.06);
        }

        /* ── social btn ── */
        .contact-social-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border-radius: 9px;
          font-size: 0.82rem;
          font-family: 'DM Mono', monospace;
          background: var(--bg-card);
          border: 1px solid var(--border);
          color: var(--text-muted);
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s, background 0.2s, transform 0.15s;
        }
        .contact-social-btn:hover {
          border-color: var(--gold);
          color: var(--gold-light);
          background: var(--gold-dim);
          transform: translateY(-2px);
        }

        /* ── input focus ring override ── */
        .contact-form-input {
          background: var(--bg) !important;
          border-color: var(--border) !important;
        }
        .contact-form-input:focus {
          border-color: var(--gold) !important;
          box-shadow: 0 0 0 3px rgba(201,168,76,0.1) !important;
        }
      `}</style>

      <section
        id="contact"
        ref={ref}
        style={{ padding: "96px 0", background: "var(--bg-2)" }}
      >
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 24px" }}>

          {/* ── Header ── */}
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
            style={{ marginBottom: "56px" }}
          >
            <p className="font-mono-custom" style={{
              color: "var(--gold)", fontSize: "0.72rem",
              letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "10px",
            }}>
              Let's talk
            </p>
            <h2 className="font-display" style={{
              fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, color: "var(--text)",
            }}>
              Get in Touch
            </h2>
            <div className="section-line" />
          </motion.div>

          <div className="contact-grid">

            {/* ── LEFT — info ── */}
            <motion.div
              variants={fadeLeft} initial="hidden" animate={inView ? "visible" : "hidden"}
              style={{ display: "flex", flexDirection: "column", gap: "32px" }}
            >
              {/* Blurb */}
              <div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.35rem", fontWeight: 700,
                  color: "var(--text)", marginBottom: "12px",
                }}>
                  Let's build something together
                </h3>
                <p style={{
                  color: "var(--text-muted)", fontSize: "0.92rem",
                  lineHeight: 1.8,
                }}>
                 Open to freelance projects, full-time roles, or just a
                  conversation about tech. Drop me a message and I'll get
                  back within 24 hours.
                </p>
              </div>

              {/* Contact info cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {contactInfo.map(({ icon: Icon, label, value, href }) => {
                  const Tag = href ? "a" : "div";
                  return (
                    <Tag
                      key={label}
                      {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="contact-info-card"
                    >
                      {/* Icon box */}
                      <div style={{
                        width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                        background: "var(--gold-dim)",
                        border: "1px solid rgba(201,168,76,0.2)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <Icon size={16} color="var(--gold)" strokeWidth={1.6} />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <p style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: "0.62rem", letterSpacing: "0.12em",
                          textTransform: "uppercase", color: "var(--text-dim)",
                          marginBottom: 3,
                        }}>
                          {label}
                        </p>
                        <p style={{
                          fontSize: "0.875rem", color: "var(--text-muted)",
                          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                        }}>
                          {value}
                        </p>
                      </div>
                      {href && (
                        <FiArrowUpRight
                          size={14} color="var(--text-dim)"
                          style={{ marginLeft: "auto", flexShrink: 0 }}
                        />
                      )}
                    </Tag>
                  );
                })}
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: "var(--border)" }} />

              {/* Social links */}
              <div>
                <p className="font-mono-custom" style={{
                  fontSize: "0.62rem", letterSpacing: "0.15em",
                  textTransform: "uppercase", color: "var(--text-dim)",
                  marginBottom: "12px",
                }}>
                  Find me online
                </p>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {socials.map(({ label, href, icon: Icon }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      className="contact-social-btn">
                      <Icon size={14} /> {label} ↗
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability badge */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "10px 16px", borderRadius: 99,
                background: "rgba(52,211,153,0.07)",
                border: "1px solid rgba(52,211,153,0.2)",
                alignSelf: "flex-start",
              }}>
                <span style={{
                  width: 7, height: 7, borderRadius: "50%",
                  background: "#34d399",
                  boxShadow: "0 0 8px rgba(52,211,153,0.6)",
                  animation: "pulse-green 2s ease-in-out infinite",
                  display: "inline-block", flexShrink: 0,
                }} />
                <span style={{
                  fontSize: "0.78rem", color: "#34d399",
                  fontFamily: "'DM Mono', monospace",
                }}>
                  Available for new projects
                </span>
              </div>
            </motion.div>

            {/* ── RIGHT — form ── */}
            <motion.div
              variants={fadeRight} initial="hidden" animate={inView ? "visible" : "hidden"}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: 18,
                padding: "clamp(24px, 4vw, 40px)",
                boxShadow: "0 0 0 1px var(--border), 0 32px 64px rgba(0,0,0,0.25)",
              }}
            >
              {/* Form header */}
              <div style={{ marginBottom: 28 }}>
                <h3 style={{
                  fontSize: "1.05rem", fontWeight: 600,
                  color: "var(--text)", marginBottom: 4,
                }}>
                  Send a message
                </h3>
                <p style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>
                  I'll reply within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

                {/* Name + Email */}
                <div className="contact-name-email">
                  {(["name", "email"] as const).map(field => (
                    <div key={field}>
                      <label className="font-mono-custom" style={{
                        display: "block", fontSize: "0.65rem",
                        letterSpacing: "0.15em", textTransform: "uppercase",
                        color: "var(--text-dim)", marginBottom: "7px",
                      }}>
                        {field === "name" ? "Name *" : "Email *"}
                      </label>
                      <input
                        type={field === "email" ? "email" : "text"}
                        required
                        value={form[field]}
                        onChange={e => setField(field, e.target.value)}
                        placeholder={field === "name" ? "Your name" : "your@email.com"}
                        className="form-input contact-form-input"
                      />
                    </div>
                  ))}
                </div>

                {/* Subject */}
                <div>
                  <label className="font-mono-custom" style={{
                    display: "block", fontSize: "0.65rem",
                    letterSpacing: "0.15em", textTransform: "uppercase",
                    color: "var(--text-dim)", marginBottom: "7px",
                  }}>
                    Subject *
                  </label>
                  <input
                    type="text" required
                    value={form.subject}
                    onChange={e => setField("subject", e.target.value)}
                    placeholder="What's this about?"
                    className="form-input contact-form-input"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="font-mono-custom" style={{
                    display: "block", fontSize: "0.65rem",
                    letterSpacing: "0.15em", textTransform: "uppercase",
                    color: "var(--text-dim)", marginBottom: "7px",
                  }}>
                    Message *
                  </label>
                  <textarea
                    required rows={5}
                    value={form.message}
                    onChange={e => setField("message", e.target.value)}
                    placeholder="Tell me about your project, timeline, and budget..."
                    className="form-input contact-form-input"
                    style={{ resize: "none" }}
                  />
                </div>

                {/* Status banners */}
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "12px 16px", borderRadius: 9,
                      background: "rgba(34,197,94,0.07)",
                      border: "1px solid rgba(34,197,94,0.22)",
                      color: "#4ade80", fontSize: "0.85rem",
                    }}
                  >
                    <FiCheckCircle size={15} /> Message sent! I'll get back to you soon.
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "12px 16px", borderRadius: 9,
                      background: "rgba(239,68,68,0.07)",
                      border: "1px solid rgba(239,68,68,0.22)",
                      color: "#f87171", fontSize: "0.85rem",
                    }}
                  >
                    <FiAlertCircle size={15} /> Something went wrong. Please try again.
                  </motion.div>
                )}

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  whileHover={{ scale: status === "loading" ? 1 : 1.01 }}
                  whileTap={{   scale: status === "loading" ? 1 : 0.98 }}
                  style={{
                    display: "flex", alignItems: "center",
                    justifyContent: "center", gap: 8,
                    padding: "14px 24px", borderRadius: 9,
                    border: "none",
                    cursor: status === "loading" ? "not-allowed" : "pointer",
                    background: status === "loading" ? "var(--border-light)" : "var(--gold)",
                    color: status === "loading" ? "var(--text-dim)" : "#080b12",
                    fontWeight: 600, fontSize: "0.9rem",
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "background 0.2s, color 0.2s",
                    width: "100%",
                  }}
                  onMouseEnter={e => {
                    if (status !== "loading")
                      (e.currentTarget as HTMLElement).style.background = "var(--gold-light)";
                  }}
                  onMouseLeave={e => {
                    if (status !== "loading")
                      (e.currentTarget as HTMLElement).style.background = "var(--gold)";
                  }}
                >
                  {status === "loading"
                    ? <><FiLoader size={15} className="animate-spin" /> Sending…</>
                    : <><FiSend size={15} /> Send Message</>}
                </motion.button>

                {/* <p style={{
                  fontSize: "0.72rem", color: "var(--text-dim)",
                  textAlign: "center", fontFamily: "'DM Mono', monospace",
                }}>
                  No spam. I respect your privacy.
                </p> */}
              </form>
            </motion.div>

          </div>
        </div>

        <style>{`
          @keyframes pulse-green {
            0%, 100% { box-shadow: 0 0 8px rgba(52,211,153,0.6); }
            50%       { box-shadow: 0 0 14px rgba(52,211,153,0.9); }
          }
        `}</style>
      </section>
    </>
  );
}