"use client";

import { Fragment } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Mail, ArrowUpRight, ArrowDown, Download } from "lucide-react";
import { heroStagger, heroItem } from "@/lib/animations";
import Typewriter from "typewriter-effect";

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const orb1X = useTransform(smoothX, [0, 1], [-30, 30]);
  const orb1Y = useTransform(smoothY, [0, 1], [-30, 30]);
  const orb2X = useTransform(smoothX, [0, 1], [30, -30]);
  const orb2Y = useTransform(smoothY, [0, 1], [20, -20]);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX / window.innerWidth);
    mouseY.set(e.clientY / window.innerHeight);
  };

  return (
    <>
      <style>{`
        /* ── Typewriter ── */
        .typewriter-wrapper .Typewriter { display: inline; }

        .typewriter-wrapper .Typewriter__wrapper {
          background: linear-gradient(90deg, var(--gold), var(--gold-light), var(--gold));
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
          font-weight: 900;
          text-decoration: underline;
          text-decoration-color: rgba(201, 168, 76, 0.35);
          text-underline-offset: 8px;
          text-decoration-thickness: 2px;
        }

        .typewriter-wrapper .Typewriter__cursor {
          display: inline-block;
          width: 3px;
          background: var(--gold);
          color: transparent;
          border-radius: 2px;
          margin-left: 6px;
          vertical-align: middle;
          position: relative;
          top: -4px;
          box-shadow: 0 0 8px rgba(201,168,76,0.7), 0 0 18px rgba(201,168,76,0.35);
          animation: cursorBlink 1s step-end infinite,
                     cursorPulse 2s ease-in-out infinite;
        }

        @keyframes shimmer {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes cursorPulse {
          0%, 100% { box-shadow: 0 0 8px rgba(201,168,76,0.7),  0 0 18px rgba(201,168,76,0.35); }
          50%       { box-shadow: 0 0 12px rgba(201,168,76,1),   0 0 28px rgba(201,168,76,0.55); }
        }

        /* ── Photo panel ── */
        .hero-photo-panel {
          position: absolute;
          top: 0;
          right: 0;
          width: 48%;
          height: 100%;
          overflow: hidden;
        }
        .hero-photo-panel img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
        }
        .hero-photo-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, #080b12 0%, transparent 30%);
          z-index: 1;
          pointer-events: none;
        }
        /* subtle bottom fade */
        .hero-photo-panel::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 35%;
          background: linear-gradient(to top, #080b12 0%, transparent 100%);
          z-index: 1;
          pointer-events: none;
        }

        /* ── Primary button ── */
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: var(--gold);
          color: #080b12;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s;
        }
        .btn-primary:hover {
          background: var(--gold-light);
          transform: translateY(-2px);
        }

        /* ── Secondary button ── */
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border: 1px solid var(--border-light);
          color: var(--text);
          background: transparent;
          border-radius: 8px;
          font-weight: 500;
          font-size: 0.9rem;
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s, background 0.2s, transform 0.15s;
        }
        .btn-secondary:hover {
          border-color: var(--gold);
          color: var(--gold-light);
          background: var(--gold-dim);
          transform: translateY(-2px);
        }

        /* ── Social link ── */
        .social-link {
          color: var(--text-dim);
          font-size: 0.78rem;
          text-decoration: none;
          padding: 4px 8px;
          border-radius: 6px;
          transition: color 0.2s, background 0.2s;
          font-family: 'DM Mono', monospace;
        }
        .social-link:hover {
          color: var(--gold-light);
          background: var(--gold-dim);
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .hero-photo-panel {
            position: relative;
            width: 100%;
            height: 300px;
          }
          .hero-photo-panel::before {
            background: linear-gradient(to bottom, #080b12 0%, transparent 35%);
          }
        }
      `}</style>

      <section
        id="hero"
        className="bg-grid"
        onMouseMove={handleMouseMove}
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          background: "var(--bg)",
        }}
      >
        {/* Ambient orbs — gold + blue tinted, matching dark palette */}
        <motion.div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            top: "5%",
            right: "15%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
            x: orb1X,
            y: orb1Y,
          }}
        />
        <motion.div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            bottom: "0%",
            left: "-8%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
            x: orb2X,
            y: orb2Y,
          }}
        />

        {/* Right-side photo panel */}
        <div className="hero-photo-panel">
          <img
            src="/ali.png"
            alt="Ali Mubarak"
            onError={(e) => {
              const el = e.currentTarget as HTMLImageElement;
              el.style.display = "none";
              const p = el.parentElement!;
              p.style.background = "var(--bg-2)";
              p.style.display = "flex";
              p.style.alignItems = "center";
              p.style.justifyContent = "center";
              p.innerHTML += `<span style="font-family:'Playfair Display',serif;font-size:8rem;color:var(--border);z-index:2;position:relative;">AM</span>`;
            }}
          />
        </div>

        {/* Left content */}
        <div
          style={{
            maxWidth: "1152px",
            margin: "0 auto",
            padding: "120px 24px 80px",
            width: "100%",
            position: "relative",
            zIndex: 2,
          }}
        >
          <motion.div
            variants={heroStagger}
            initial="hidden"
            animate="visible"
            style={{ maxWidth: "580px" }}
          >
            {/* Badge */}
            <motion.div variants={heroItem} style={{ marginBottom: "28px" }}>
              <span
                className="tag"
                style={{ padding: "5px 14px", borderRadius: "999px", fontSize: "0.75rem" }}
              >
                Welcome to my portfolio
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.p
              variants={heroItem}
              className="font-mono-custom"
              style={{
                color: "var(--gold)",
                fontSize: "0.85rem",
                letterSpacing: "0.15em",
                marginBottom: "10px",
              }}
            >
              Hi, I'm a
            </motion.p>

            {/* Typewriter headline */}
            <motion.h1
              variants={heroItem}
              className="font-display"
              style={{
                fontSize: "clamp(2.6rem, 7vw, 5rem)",
                fontWeight: 900,
                lineHeight: 1.08,
                color: "var(--text)",
                marginBottom: "28px",
                minHeight: "1.2em",
              }}
            >
              <span className="typewriter-wrapper">
                <Typewriter
                  options={{
                    strings: [
                      "Software Engineer",
                      "Web Developer",
                      "Full Stack Dev",
                      "Tech Enthusiast",
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 60,
                    deleteSpeed: 35,
                    cursor: "|",
                  }}
                />
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={heroItem}
              style={{
                color: "var(--text-muted)",
                fontSize: "1rem",
                lineHeight: 1.75,
                marginBottom: "36px",
                maxWidth: "480px",
              }}
            >
              Full Stack Developer | React Specialist | Problem Solver.
              {/* I craft modern, scalable web applications with a focus on clean
              code and exceptional user experiences. */}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={heroItem}
              style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "40px" }}
            >
              <a href="#projects" className="btn-primary">
                View Projects <ArrowUpRight size={16} />
              </a>
              <a href="#contact" className="btn-secondary">
                <Download size={16} /> Download CV
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={heroItem}
              style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}
            >
              <span
                className="font-mono-custom"
                style={{
                  fontSize: "0.72rem",
                  color: "var(--text-dim)",
                  marginRight: "6px",
                  letterSpacing: "0.08em",
                }}
              >
                Connect with me:
              </span>
              {[
                { label: "GitHub",   href: "https://github.com/alirazamehar732-hub" },
                { label: "LinkedIn", href: "https://linkedin.com/in/ali32" },
                { label: "Email",    href: "mailto:alirazamehar732@gmail.com" },
              ].map(({ label, href }, i) => (
                <Fragment key={label}>
                  {i > 0 && (
                    <span
                      style={{
                        width: "1px",
                        height: "14px",
                        background: "var(--border)",
                        display: "inline-block",
                      }}
                    />
                  )}
                  <a
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="social-link"
                  >
                    {label} ↗
                  </a>
                </Fragment>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          style={{
            position: "absolute",
            bottom: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            color: "var(--text-dim)",
            zIndex: 2,
          }}
        >
          <span
            className="font-mono-custom"
            style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase" }}
          >
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ArrowDown size={13} />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}