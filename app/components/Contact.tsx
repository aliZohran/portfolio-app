"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { fadeUp, fadeLeft, fadeRight, viewport } from "@/lib/animations";
import { useContactStore } from "@/store/contactStore";

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
    <section id="contact" ref={ref} style={{ padding: "96px 0" }}>
      <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} style={{ marginBottom: "56px" }}>
          <p className="font-mono-custom" style={{ color: "var(--gold)", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "10px" }}>
            Let's talk
          </p>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, color: "var(--text)" }}>
            Get in Touch
          </h2>
          <div className="section-line" />
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "56px", alignItems: "center" }}>

          {/* Left info */}
          <motion.div variants={fadeLeft} initial="hidden" animate={inView ? "visible" : "hidden"}>
          

        

            <div>
              <p className="font-mono-custom" style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: "12px" }}>
                Find me online
              </p>
              <div style={{ display: "flex", gap: "10px" }}>
                {[
                  { label: "GitHub",   href: "https://github.com/aliraza732-hub" },
                  { label: "LinkedIn", href: "https://linkedin.com/in/ali32" },
                ].map(({ label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    style={{ padding: "7px 16px", borderRadius: "8px", fontSize: "0.8rem", background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-muted)", textDecoration: "none", transition: "border-color 0.2s, color 0.2s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)"; (e.currentTarget as HTMLElement).style.color = "var(--gold)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}>
                    {label} ↗
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div variants={fadeRight} initial="hidden" animate={inView ? "visible" : "hidden"}
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "16px", padding: "36px" }}>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {(["name", "email"] as const).map(field => (
                  <div key={field}>
                    <label className="font-mono-custom" style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: "8px" }}>
                      {field === "name" ? "Name" : "Email"}
                    </label>
                    <input type={field === "email" ? "email" : "text"} required
                      value={form[field]} onChange={e => setField(field, e.target.value)}
                      placeholder={field === "name" ? "Your name" : "your@email.com"}
                      className="form-input" />
                  </div>
                ))}
              </div>

              <div>
                <label className="font-mono-custom" style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: "8px" }}>Subject</label>
                <input type="text" required value={form.subject} onChange={e => setField("subject", e.target.value)} placeholder="What's this about?" className="form-input" />
              </div>

              <div>
                <label className="font-mono-custom" style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: "8px" }}>Message</label>
                <textarea required rows={5} value={form.message} onChange={e => setField("message", e.target.value)} placeholder="Tell me about your project..." className="form-input" style={{ resize: "none" }} />
              </div>

              {status === "success" && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 16px", borderRadius: "8px", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)", color: "#4ade80", fontSize: "0.875rem" }}>
                  <CheckCircle size={15} /> Message sent! I'll get back to you soon.
                </motion.div>
              )}
              {status === "error" && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 16px", borderRadius: "8px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171", fontSize: "0.875rem" }}>
                  <AlertCircle size={15} /> Something went wrong. Please try again.
                </motion.div>
              )}

              <motion.button type="submit" disabled={status === "loading"}
                whileHover={{ scale: status === "loading" ? 1 : 1.01 }}
                whileTap={{   scale: status === "loading" ? 1 : 0.98 }}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "14px", borderRadius: "8px", border: "none", cursor: status === "loading" ? "not-allowed" : "pointer", background: "var(--gold)", color: "var(--bg)", fontWeight: 500, fontSize: "0.9rem", opacity: status === "loading" ? 0.65 : 1, transition: "background 0.2s" }}
                onMouseEnter={e => { if (status !== "loading") (e.currentTarget as HTMLElement).style.background = "var(--gold-light)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--gold)"; }}>
                {status === "loading"
                  ? <><Loader2 size={16} className="animate-spin" /> Sending...</>
                  : <><Send size={16} /> Send Message</>}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}