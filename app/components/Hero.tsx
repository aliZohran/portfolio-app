"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowDown, Download, Sparkles } from "lucide-react";
import { heroStagger, heroItem } from "@/lib/animations";
import Typewriter from "typewriter-effect";

/* ── Floating particle ──────────────────────────────────────────────────── */
function Particle({ delay, x, size }: { delay: number; x: number; size: number }) {
  return (
    <motion.div
      style={{
        position: "absolute",
        bottom: -20,
        left: `${x}%`,
        width:  size,
        height: size,
        borderRadius: "50%",
        background: "rgba(201,168,76,0.35)",
        pointerEvents: "none",
      }}
      animate={{ y: [0, -600], opacity: [0, 0.8, 0], scale: [0.5, 1.2, 0.3] }}
      transition={{ duration: 6 + Math.random() * 4, delay, repeat: Infinity, ease: "easeOut" }}
    />
  );
}

/* ── Stat card ──────────────────────────────────────────────────────────── */
function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 200, damping: 18 }}
      style={{
        background: "rgba(13,17,32,0.85)",
        border: "1px solid rgba(201,168,76,0.2)",
        borderRadius: 12,
        padding: "12px 18px",
        backdropFilter: "blur(12px)",
        textAlign: "center",
        flex: "1 1 0px", // Allows equal sizing on mobile rows
        minWidth: 85,
      }}
    >
      <div style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: "1.4rem",
        fontWeight: 700,
        background: "linear-gradient(135deg, var(--gold), var(--gold-light))",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        lineHeight: 1,
        marginBottom: 4,
      }}>
        {value}
      </div>
      <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
        {label}
      </div>
    </motion.div>
  );
}

/* ── Main Hero ──────────────────────────────────────────────────────────── */
export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 20 });
  const orb1X = useTransform(smoothX, [0, 1], [-40, 40]);
  const orb1Y = useTransform(smoothY, [0, 1], [-40, 40]);
  const orb2X = useTransform(smoothX, [0, 1], [40, -40]);
  const orb2Y = useTransform(smoothY, [0, 1], [30, -30]);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX / window.innerWidth);
    mouseY.set(e.clientY / window.innerHeight);
  };

  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    delay: i * 0.5,
    x: Math.round((i / 18) * 100),
    size: 3 + (i % 4),
  }));

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
          text-decoration-color: rgba(201,168,76,0.35);
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
          animation: cursorBlink 1s step-end infinite, cursorPulse 2s ease-in-out infinite;
        }
        @keyframes shimmer     { 0%{background-position:0% center} 100%{background-position:200% center} }
        @keyframes cursorBlink{ 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes cursorPulse{ 0%,100%{box-shadow:0 0 8px rgba(201,168,76,0.7),0 0 18px rgba(201,168,76,0.35)} 50%{box-shadow:0 0 12px rgba(201,168,76,1),0 0 28px rgba(201,168,76,0.55)} }

        /* ── Photo panel ── */
        .hero-photo-panel {
          position: absolute;
          top: 0; right: 0;
          width: 46%;
          height: 100%;
          overflow: hidden;
        }
        .hero-photo-panel img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
          transition: transform 8s ease;
        }
        .hero-photo-panel:hover img { transform: scale(1.04); }
        .hero-photo-panel::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(to right, #080b12 0%, rgba(8,11,18,0.3) 40%, transparent 65%);
          z-index: 1; pointer-events: none;
        }
        .hero-photo-panel::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 40%;
          background: linear-gradient(to top, #080b12 0%, transparent 100%);
          z-index: 1; pointer-events: none;
        }

        /* ── Video bg ── */
        .hero-video-bg {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          opacity: 0.08;
          pointer-events: none;
          z-index: 0;
          transition: opacity 1.5s ease;
        }
        .hero-video-bg.loaded { opacity: 0.11; }

        /* ── Buttons ── */
        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 26px;
          background: var(--gold); color: #080b12;
          border-radius: 9px; font-weight: 600; font-size: 0.9rem;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(201,168,76,0.25);
        }
        .btn-primary:hover {
          background: var(--gold-light); transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(201,168,76,0.35);
        }
        .btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 26px;
          border: 1px solid var(--border-light); color: var(--text);
          background: rgba(13,17,32,0.5);
          border-radius: 9px; font-weight: 500; font-size: 0.9rem;
          text-decoration: none; backdrop-filter: blur(8px);
          transition: border-color 0.2s, color 0.2s, transform 0.15s, background 0.2s;
        }
        .btn-secondary:hover {
          border-color: var(--gold); color: var(--gold-light);
          background: var(--gold-dim); transform: translateY(-2px);
        }
        .social-link {
          color: var(--text-dim); font-size: 0.78rem; text-decoration: none;
          padding: 4px 8px; border-radius: 6px;
          transition: color 0.2s, background 0.2s;
          font-family: 'DM Mono', monospace;
        }
        .social-link:hover { color: var(--gold-light); background: var(--gold-dim); }

        /* ── Badge ── */
        @keyframes badge-glow {
          0%,100% { box-shadow: 0 0 0 0 rgba(201,168,76,0); }
          50%      { box-shadow: 0 0 16px 2px rgba(201,168,76,0.18); }
        }
        .hero-badge {
          animation: badge-glow 3s ease-in-out infinite;
        }

        /* ── Scroll bounce ── */
        @keyframes scrollBounce {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(8px); }
        }
        .scroll-arrow { animation: scrollBounce 1.8s ease-in-out infinite; }

        /* ── Main Container Setup ── */
        .hero-content-wrapper {
          max-width: 1152px;
          margin: 0 auto;
          padding: 140px 24px 80px;
          width: 100%;
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
        }
        .hero-text-block { 
          width: 54%; 
          max-width: 580px; 
        }

        .hero-stats-row {
          display: flex;
          gap: 12px;
          margin-bottom: 36px;
        }
        .hero-cta-row {
          display: flex;
          gap: 12px;
          margin-bottom: 40px;
        }
        .hero-socials-row {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }

        /* ── Tablet / Small Desktop ── */
        @media (max-width: 900px) {
          .hero-content-wrapper { padding-top: 100px; gap: 20px; }
          .hero-text-block { width: 58%; }
          .hero-photo-panel { width: 40%; }
        }

        /* ── Mobile Responsive Overhaul ── */
        @media (max-width: 768px) {
          .hero-content-wrapper {
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 80px 24px 100px;
            gap: 32px;
            text-align: center;
          }
          
          .hero-text-block {
            width: 100%;
            max-width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .hero-photo-panel {
            position: relative !important;
            width: 240px !important;
            height: 240px !important;
            border-radius: 50%;
            border: 2px solid var(--border-light);
            order: -1; /* Placed cleanly at the top of the column row-by-row layout */
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          }

          .hero-photo-panel img {
            object-position: center top;
          }

          /* Tweak mobile ambient overlays for a round crop container */
          .hero-photo-panel::before {
            background: linear-gradient(to bottom, transparent 60%, #080b12 100%) !important;
          }
          .hero-photo-panel::after {
            display: none;
          }

          .hero-stats-row { 
            width: 100%;
            justify-content: center;
            gap: 10px; 
          }
          
          .hero-cta-row { 
            width: 100%;
            justify-content: center;
            gap: 12px; 
          }
          
          .hero-socials-row {
            justify-content: center;
          }

          .btn-primary, .btn-secondary { 
            flex: 1; 
            max-width: 180px;
            padding: 12px 18px; 
            font-size: 0.85rem; 
            justify-content: center; 
          }
        }

        @media (max-width: 480px) {
          .hero-content-wrapper { padding: 60px 16px 100px; gap: 24px; }
          .hero-photo-panel { width: 190px !important; height: 190px !important; }
          .hero-stats-row { gap: 6px; }
          .btn-primary, .btn-secondary { font-size: 0.8rem; padding: 10px 14px; }
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
        {/* Background coding video */}
        <video
          ref={videoRef}
          className={`hero-video-bg${videoLoaded ? " loaded" : ""}`}
          autoPlay muted loop playsInline
          onCanPlay={() => setVideoLoaded(true)}
          src="https://cdn.pixabay.com/video/2022/10/30/136526-764922989_large.mp4"
        />

        {/* Ambient orbs */}
        <motion.div style={{
          position: "absolute", width: 650, height: 650,
          top: "5%", right: "12%", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)",
          pointerEvents: "none", x: orb1X, y: orb1Y,
        }} />
        <motion.div style={{
          position: "absolute", width: 500, height: 500,
          bottom: "-5%", left: "-8%", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)",
          pointerEvents: "none", x: orb2X, y: orb2Y,
        }} />

        {/* Floating particles */}
        {particles.map(p => <Particle key={p.id} {...p} />)}

        {/* Outer content container holds both content and image now */}
        <div className="hero-content-wrapper">
          
          {/* Main Left Typography Content */}
          <motion.div
            variants={heroStagger}
            initial="hidden"
            animate="visible"
            className="hero-text-block"
          >
            {/* Badge */}
            <motion.div variants={heroItem} style={{ marginBottom: "24px" }}>
              <span
                className="tag hero-badge"
                style={{
                  padding: "6px 16px", borderRadius: "999px",
                  fontSize: "0.75rem",
                  display: "inline-flex", alignItems: "center", gap: 6,
                }}
              >
                <Sparkles size={11} color="var(--gold)" />
                Welcome to my portfolio
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.p
              variants={heroItem}
              className="font-mono-custom"
              style={{
                color: "var(--gold)", fontSize: "0.85rem",
                letterSpacing: "0.15em", marginBottom: "10px",
              }}
            >
              Hi, I'm a
            </motion.p>

            {/* Typewriter headline */}
            <motion.h1
              variants={heroItem}
              className="font-display"
              style={{
                fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
                fontWeight: 900, lineHeight: 1.08,
                color: "var(--text)",
                marginBottom: "20px",
                minHeight: "1.2em",
              }}
            >
              <span className="typewriter-wrapper">
                <Typewriter
                  options={{
                    strings: ["Software Engineer", "Web Developer", "Full Stack Dev", "Tech Enthusiast"],
                    autoStart: true, loop: true, delay: 60, deleteSpeed: 35, cursor: "|",
                  }}
                />
              </span>
            </motion.h1>

            {/* Subtitle */}
            {/* <motion.p variants={heroItem} style={{
              color: "var(--text-muted)", fontSize: "clamp(0.875rem, 2vw, 1rem)",
              lineHeight: 1.75, marginBottom: "28px", maxWidth: "480px",
            }}>
              Full Stack Developer · React Specialist · Problem Solver.
            </motion.p> */}

            {/* Stats */}
            <motion.div variants={heroItem} className="hero-stats-row">
              <StatCard value="5+"  label="Years Exp."       delay={1.0} />
              <StatCard value="10+" label="Projects Built"   delay={1.1} />
              <StatCard value="5+"  label="Happy Clients"    delay={1.2} />
            </motion.div>

            {/* CTA buttons */}
            <motion.div variants={heroItem} className="hero-cta-row">
              <a href="https://github.com/aliZohran?tab=repositories" target="_blank" rel="noopener noreferrer" className="btn-primary">
                View Projects <ArrowUpRight size={15} />
              </a>
              <a href="/Ali_Mubarak_Resume.docx" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <Download size={15} /> Download CV
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div variants={heroItem} className="hero-socials-row">
              <span className="font-mono-custom" style={{
                fontSize: "0.7rem", color: "var(--text-dim)",
                marginRight: "6px", letterSpacing: "0.08em",
              }}>
                Connect with me:
              </span>
              {[
                { label: "GitHub",   href: "https://github.com/alizohran" },
                { label: "LinkedIn", href: "https://linkedin.com/in/alizohran" },
                { label: "Email",    href: "mailto:alirazamehar732@gmail.com" },
              ].map(({ label, href }, i) => (
                <Fragment key={label}>
                  {i > 0 && (
                    <span style={{ width: 1, height: 14, background: "var(--border)", display: "inline-block" }} />
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

          {/* Photo Panel is now inside the flex container wrapper */}
          <div className="hero-photo-panel">
            <img
              src="https://www.pngplay.com/wp-content/uploads/2/Business-Man-PNG-Free-File-Download.png"
              alt="Ali Mubarak"
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                el.style.display = "none";
                const p = el.parentElement!;
                p.style.background = "linear-gradient(135deg, var(--bg-2) 0%, var(--bg-card) 100%)";
                p.style.display = "flex";
                p.style.alignItems = "center";
                p.style.justifyContent = "center";
                p.innerHTML += `<span style="font-family:'Playfair Display',serif;font-size:4rem;font-weight:900;color:rgba(201,168,76,0.15);z-index:2;position:relative;letter-spacing:-0.02em;">AM</span>`;
              }}
            />
            {/* Decorative corner accents */}
            <div style={{
              position: "absolute", top: 24, right: 24, zIndex: 3,
              width: 32, height: 32,
              border: "2px solid rgba(201,168,76,0.3)",
              borderRadius: 8,
              borderBottom: "none", borderLeft: "none",
              pointerEvents: "none",
            }} />
            <div style={{
              position: "absolute", bottom: 24, left: 24, zIndex: 3,
              width: 32, height: 32,
              border: "2px solid rgba(201,168,76,0.2)",
              borderRadius: 8,
              borderTop: "none", borderRight: "none",
              pointerEvents: "none",
            }} />
          </div>

        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          style={{
            position: "absolute", bottom: "28px", left: "50%",
            transform: "translateX(-50%)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
            color: "var(--text-dim)", zIndex: 2,
          }}
        >
          <span className="font-mono-custom" style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase" }}>
            Scroll
          </span>
          <div className="scroll-arrow">
            <ArrowDown size={13} />
          </div>
        </motion.div>

      </section>
    </>
  );
}
