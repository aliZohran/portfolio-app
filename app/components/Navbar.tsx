"use client";

import { useEffect, useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

const navLinks = [
  { label: "About",      href: "#about"      },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects"   },
  { label: "Skills",     href: "#skills"     },
  { label: "Education",  href: "#education"  },
  { label: "Contact",    href: "#contact"    },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  /* ── scroll / resize listeners ── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      /* Active section detection */
      const sections = navLinks.map(l => document.querySelector(l.href) as HTMLElement | null);
      let current = "";
      sections.forEach((el, i) => {
        if (el && window.scrollY >= el.offsetTop - 120) current = navLinks[i].href;
      });
      setActiveLink(current);
    };

    const checkMobile = () => setIsMobile(window.innerWidth < 1024); // Raised breakpoint slightly for clean sidebar fit
    checkMobile();
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  /* close mobile menu on resize → desktop */
  useEffect(() => { if (!isMobile) setMenuOpen(false); }, [isMobile]);

  /* close mobile menu on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  /* lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        /* ── Desktop Sidebar Links ── */
        .nav-link-item {
          position: relative;
          color: var(--text-muted);
          font-size: 0.9rem;
          text-decoration: none;
          padding: 10px 16px;
          transition: color 0.25s, background 0.25s;
          letter-spacing: 0.03em;
          display: flex;
          align-items: center;
          width: 100%;
          border-radius: 8px;
        }
        
        /* Left border accent line on active */
        .nav-link-item::after {
          content: '';
          position: absolute;
          left: 0; top: 25%; bottom: 25%;
          width: 3px;
          border-radius: 0 4px 4px 0;
          background: linear-gradient(180deg, var(--gold), var(--gold-light));
          transform: scaleY(0);
          transform-origin: center;
          transition: transform 0.25s cubic-bezier(0.22,1,0.36,1), opacity 0.2s;
          opacity: 0;
        }
        
        .nav-link-item:hover,
        .nav-link-item.active {
          color: var(--gold-light) !important;
          background: var(--gold-dim);
        }
        
        .nav-link-item:hover::after,
        .nav-link-item.active::after {
          transform: scaleY(1);
          opacity: 1;
        }

        .nav-resume-btn {
          color: var(--gold);
          border: 1px solid rgba(201,168,76,0.45);
          border-radius: 7px;
          padding: 10px 20px;
          font-size: 0.82rem;
          font-family: 'DM Mono', monospace;
          letter-spacing: 0.04em;
          text-decoration: none;
          background: transparent;
          transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.15s;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          margin-top: auto;
        }
        .nav-resume-btn:hover {
          background: var(--gold-dim);
          border-color: var(--gold);
          color: var(--gold-light);
          transform: translateY(-1px);
        }

        /* ── hamburger bars ── */
        .ham-bar {
          display: block;
          width: 22px;
          height: 2px;
          border-radius: 2px;
          background: var(--gold);
          transition: transform 0.32s cubic-bezier(0.22,1,0.36,1), opacity 0.2s;
        }

        /* ── mobile menu items ── */
        .mobile-nav-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: var(--text-muted);
          font-size: 1rem;
          text-decoration: none;
          padding: 14px 0;
          border-bottom: 1px solid var(--border);
          transition: color 0.2s, padding-left 0.2s;
        }
        .mobile-nav-link:hover { color: var(--gold-light); padding-left: 6px; }
        .mobile-nav-link.active { color: var(--gold); }

        /* ── Responsive Architecture Fixes ── */
        @media (max-width: 1023px) {
          .nav-link-item {
            width: auto;
            border-radius: 0;
            padding: 4px 0;
          }
          .nav-link-item::after {
            left: 0; right: 0; bottom: 0; top: auto;
            width: auto; height: 2px;
            transform: scaleX(0);
            transform-origin: left;
          }
          .nav-link-item:hover, .nav-link-item.active {
            background: transparent;
          }
          .nav-link-item:hover::after, .nav-link-item.active::after {
            transform: scaleX(1);
          }
        }
      `}</style>

      {/* ── Progress Indicators ── */}
      {!isMobile ? (
        /* Vertical tracker alongside desktop sidebar */
        <motion.div
          style={{
            height: progressHeight,
            position: "fixed",
            top: 0, left: "260px",
            width: "2px",
            background: "linear-gradient(180deg, var(--gold), var(--gold-light))",
            zIndex: 60,
            transformOrigin: "top",
          }}
        />
      ) : (
        /* Horizontal tracker on top for mobile screens */
        <motion.div
          style={{
            width: progressWidth,
            position: "fixed",
            top: 0, left: 0,
            height: "2px",
            background: "linear-gradient(90deg, var(--gold), var(--gold-light))",
            zIndex: 60,
            transformOrigin: "left",
          }}
        />
      )}

      {/* ── Sidebar / Nav Component Container ── */}
      <motion.nav
        ref={menuRef}
        initial={!isMobile ? { x: -260, opacity: 0 } : { y: -72, opacity: 0 }}
        animate={!isMobile ? { x: 0, opacity: 1 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={!isMobile ? {
          /* Desktop Left Sidebar Specification */
          position: "fixed",
          top: 0, left: 0, bottom: 0,
          width: "260px",
          zIndex: 50,
          padding: "40px 24px",
          background: "var(--bg-2)",
          borderRight: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          gap: "48px"
        } : {
          /* Mobile Sticky Ribbon Specification */
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 50,
          padding: scrolled ? "10px 0" : "18px 0",
          background: scrolled ? "rgba(8,11,18,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none",
          borderBottom: scrolled ? "1px solid rgba(30,45,64,0.8)" : "none",
          transition: "padding 0.4s, background 0.4s, border 0.4s",
        }}
      >
        <div style={{
          width: "100%",
          display: "flex",
          flexDirection: !isMobile ? "column" : "row",
          alignItems: !isMobile ? "flex-start" : "center",
          justifyContent: "space-between",
          height: !isMobile ? "100%" : "auto",
        }}>

          {/* Logo Branding */}
          <a
            href="#hero"
            style={{ textDecoration: "none", marginBottom: !isMobile ? "12px" : "0px" }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.span
              className="font-display"
              style={{
                fontSize: "1.75rem",
                fontWeight: 900,
                background: "linear-gradient(135deg, var(--gold), var(--gold-light), var(--gold))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                backgroundSize: "200% auto",
                display: "inline-block",
                letterSpacing: "-0.01em",
              }}
              whileHover={{ scale: 1.06 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              AM
            </motion.span>
          </a>

          {/* ── Vertical Navigation Body (Desktop Only) ── */}
          {!isMobile && (
            <div style={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: "12px", 
              width: "100%",
              flexGrow: 1 
            }}>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className={`nav-link-item${activeLink === link.href ? " active" : ""}`}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                >
                  {/* <span style={{ 
                    fontFamily: "'DM Mono', monospace", 
                    fontSize: "0.7rem", 
                    color: "var(--text-dim)", 
                    marginRight: "12px" 
                  }}>
                    0{i + 1}.
                  </span> */}
                  {link.label}
                </motion.a>
              ))}

              {/* Action Document Link */}
              <motion.a
                href="/Ali_Mubarak_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-resume-btn"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                Resume ↗
              </motion.a>
            </div>
          )}

          {/* ── Mobile Burger Switcher ── */}
          {isMobile && (
            <motion.button
              onClick={() => setMenuOpen(prev => !prev)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              whileTap={{ scale: 0.9 }}
              style={{
                background: "none",
                border: "1px solid var(--border)",
                borderRadius: 8,
                cursor: "pointer",
                padding: "8px 10px",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                transition: "border-color 0.2s",
                marginRight: "24px"
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--gold)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              <span className="ham-bar" style={{
                transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
              }} />
              <span className="ham-bar" style={{ opacity: menuOpen ? 0 : 1, width: menuOpen ? 0 : 22 }} />
              <span className="ham-bar" style={{
                transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
              }} />
            </motion.button>
          )}
        </div>

        {/* ── Mobile Panel Drawer Dropdown ── */}
        <AnimatePresence>
          {isMobile && menuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{   opacity: 0, height: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden" }}
            >
              <div style={{
                background: "rgba(8,11,18,0.97)",
                borderTop: "1px solid var(--border)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                padding: "8px 24px 24px",
              }}>

                {/* Content Links */}
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`mobile-nav-link${activeLink === link.href ? " active" : ""}`}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.045, duration: 0.3 }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.65rem",
                        color: "var(--text-dim)",
                        minWidth: 18,
                      }}>
                        0{i + 1}
                      </span>
                      {link.label}
                    </span>
                    <span style={{ color: "var(--text-dim)", fontSize: "0.75rem" }}>↗</span>
                  </motion.a>
                ))}

                {/* Subfooter Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.33 }}
                  style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}
                >
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      padding: "12px 0",
                      color: "var(--gold)",
                      border: "1px solid rgba(201,168,76,0.4)",
                      borderRadius: 9,
                      fontSize: "0.875rem",
                      fontFamily: "'DM Mono', monospace",
                      textDecoration: "none",
                      background: "var(--gold-dim)",
                      transition: "background 0.2s",
                    }}
                  >
                    ↓ Download Resume
                  </a>

                  <div style={{ display: "flex", gap: 8 }}>
                    {[
                      { label: "GitHub",   href: "https://github.com/alirazamehar732-hub" },
                      { label: "LinkedIn", href: "https://linkedin.com/in/ali32" },
                      { label: "Email",    href: "mailto:alirazamehar732@gmail.com" },
                    ].map(s => (
                      <a
                        key={s.label}
                        href={s.href}
                        target={s.href.startsWith("mailto") ? undefined : "_blank"}
                        rel="noopener noreferrer"
                        onClick={() => setMenuOpen(false)}
                        style={{
                          flex: 1,
                          textAlign: "center",
                          padding: "9px 0",
                          fontSize: "0.75rem",
                          fontFamily: "'DM Mono', monospace",
                          color: "var(--text-muted)",
                          border: "1px solid var(--border)",
                          borderRadius: 8,
                          textDecoration: "none",
                          transition: "color 0.2s, border-color 0.2s",
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLElement).style.color = "var(--gold)";
                          (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.3)";
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                          (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                        }}
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
