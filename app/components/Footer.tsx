"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      style={{
        borderTop:  "1px solid var(--border)",
        background: "var(--bg-2)",
        padding:    "40px 24px",
      }}
    >
      <div style={{ maxWidth: "1152px", margin: "0 auto" }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            display:        "flex",
            flexWrap:       "wrap",
            alignItems:     "center",
            justifyContent: "space-between",
            gap:            "16px",
          }}
        >
          {/* Logo + copyright */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <a
              href="#hero"
              aria-label="Back to top"
              className="text-gold-gradient font-display"
              style={{ fontSize: "1.3rem", fontWeight: 900, textDecoration: "none" }}
            >
              AM
            </a>
            <span style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>
              © {year} Ali Mubarak. All rights reserved.
            </span>
          </div>

          {/* Tech credits */}
          {/* <span
            className="font-mono-custom"
            style={{ fontSize: "0.72rem", color: "var(--text-dim)", textAlign: "center" }}
          >
            Built with Next.js · Tailwind CSS · Prisma · Framer Motion
          </span> */}

          {/* Back to top */}
          <a
            href="#hero"
            aria-label="Scroll back to top"
            className="font-mono-custom"
            style={{
              fontSize:       "0.75rem",
              color:          "var(--text-dim)",
              textDecoration: "none",
              letterSpacing:  "0.1em",
              transition:     "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-dim)")}
          >
            Back to top ↑
          </a>
        </motion.div>
      </div>
    </footer>
  );
}