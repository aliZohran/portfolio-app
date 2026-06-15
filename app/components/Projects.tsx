"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { fadeUp, scaleIn, staggerContainer, viewport } from "@/lib/animations";

import StackIcon from "tech-stack-icons";

const projects = [
  {
    name:        "ShopEase",
    tagline:     "Full-stack e-commerce platform",
    description: "A complete e-commerce solution with product management, cart, payments via Stripe, and an admin dashboard. Built with React, Node.js, and PostgreSQL.",
    tech:        ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe"],
    stars:       "48",
    github:      "https://github.com/aliZohran/my-store",
    live:        "#",
    featured:    true,
    image:       "/ease shop.png",
  },
  {
    name:        "TaskFlow",
    tagline:     "Team task management app",
    description: "A Kanban-style project management tool with real-time updates, role-based access, and drag-and-drop interface for seamless team collaboration.",
    tech:        ["React", "Node.js", "Socket.io", "MongoDB"],
    stars:       "31",
    github:      "https://github.com/alirazamehar732-hub",
    live:        "#",
    featured:    true,
    image:       "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80",
  },
  {
    name:        "WeatherNow",
    tagline:     "Real-time weather dashboard",
    description: "A weather app with location search, 7-day forecasts, and animated icons using the OpenWeatherMap API.",
    tech:        ["React", "TypeScript", "REST API"],
    stars:       "19",
    github:      "https://github.com/aliZohran/weather-app",
    live:        "https://weather-app-bice-omega-21.vercel.app/",
    featured:    true,
    image:       "/weather.png",
  },
  {
    name:        "BlogCMS",
    tagline:     "Headless CMS for bloggers",
    description: "A lightweight headless CMS with a markdown editor, image uploads, and a public API.",
    tech:        ["Next.js", "Prisma", "PostgreSQL", "S3"],
    stars:       "22",
    github:      "https://github.com/aliZohran/blog-app",
    live:        "https://blog-app-theta-amber-95.vercel.app/",
    featured:    true,
    image:       "/blog.jpg",
  },
];

function ProjectThumbnail({ image, name }: { image?: string; name: string }) {
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "16/9",
        background: "var(--bg)",
        borderBottom: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {image ? (
        <img
          src={image}
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
            transition: "transform 0.5s ease",
          }}
          className="proj-thumb-img"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      ) : (
        /* Fallback placeholder */
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, var(--bg-card) 0%, var(--bg-2) 100%)",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              background: "var(--gold-dim)",
              border: "1px solid rgba(201,168,76,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.8rem",
              fontWeight: 700,
              color: "var(--gold)",
            }}
          >
            {name[0]}
          </div>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              color: "var(--text-dim)",
              textTransform: "uppercase",
            }}
          >
            Preview
          </span>
        </div>
      )}
      {/* Gold bottom accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "linear-gradient(90deg, var(--gold), transparent)",
          opacity: 0,
          transition: "opacity 0.3s",
        }}
        className="proj-thumb-line"
      />
    </div>
  );
}

export default function Projects() {
  const ref    = useRef(null);
  const inView = useInView(ref, viewport);
  const featured = projects.filter(p => p.featured);

  return (
    <>
      <style>{`
        .proj-card:hover .proj-thumb-img  { transform: scale(1.04); }
        .proj-card:hover .proj-thumb-line { opacity: 1 !important; }

        .proj-btn-primary {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 11px 16px;
          background: var(--gold);
          color: #080b12;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s;
          font-family: 'DM Sans', sans-serif;
        }
        .proj-btn-primary:hover {
          background: var(--gold-light);
          transform: translateY(-1px);
        }

        .proj-btn-secondary {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 11px 16px;
          border: 1px solid var(--border-light);
          color: var(--text-muted);
          background: var(--bg-2);
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 500;
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s, transform 0.15s;
          font-family: 'DM Sans', sans-serif;
        }
        .proj-btn-secondary:hover {
          border-color: var(--gold);
          color: var(--gold-light);
          transform: translateY(-1px);
        }

        .projects-featured-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 16px;
        }

        .github-view-more-link {
          color: var(--gold);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s, text-decoration 0.2s;
        }
        .github-view-more-link:hover {
          color: var(--gold-light);
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .projects-featured-grid { grid-template-columns: 1fr; gap: 20px; }
          .proj-btn-primary, .proj-btn-secondary { padding: 12px 14px; font-size: 0.8rem; }
        }
      `}</style>

      <section
        id="projects"
        ref={ref}
        style={{ padding: "96px 0", background: "var(--bg-2)" }}
      >
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 24px" }}>

          {/* ── Header ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            style={{ marginBottom: "56px" }}
          >
            <p
              className="font-mono-custom"
              style={{
                color: "var(--gold)",
                fontSize: "0.72rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "10px",
              }}
            >
              Things I've built
            </p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12 }}>
              <h2
                className="font-display"
                style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, color: "var(--text)" }}
              >
                Projects
              </h2>
            </div>
            <div className="section-line" />
          </motion.div>

          {/* ── Featured cards grid wrapper ── */}
          <motion.div
            className="projects-featured-grid"
            variants={staggerContainer(0.15)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {featured.map((p) => (
              <motion.div
                key={p.name}
                variants={scaleIn}
                className="proj-card"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: 16,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.4)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 24px 56px rgba(201,168,76,0.07)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {/* Thumbnail */}
                <ProjectThumbnail image={p.image} name={p.name} />

                {/* Content */}
                <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 0, flex: 1 }}>
                  <h3
                    className="font-display"
                    style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text)", marginBottom: 6 }}
                  >
                    {p.name}
                  </h3>
                  <p style={{ fontSize: "0.8rem", color: "var(--gold)", fontWeight: 500, marginBottom: 12 }}>
                    {p.tagline}
                  </p>
                  <p style={{ fontSize: "0.85rem", lineHeight: 1.7, color: "var(--text-muted)", marginBottom: 16, flex: 1 }}>
                    {p.description}
                  </p>

                  {/* Tech tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                    {p.tech.map(t => (
                      <span key={t} className="tag" style={{ padding: "3px 8px", borderRadius: 4 }}>{t}</span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div style={{ display: "flex", gap: 10 }}>
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="proj-btn-primary">
                      <ExternalLink size={14} /> Live Demo
                    </a>
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="proj-btn-secondary">
                      <StackIcon name="github" style={{ width: 14, height: 14 }} /> GitHub
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ── View More Link in p Tag ── */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="font-mono-custom"
            style={{
              textAlign: "center",
              marginTop: "40px",
              fontSize: "0.9rem",
              color: "var(--text-muted)",
            }}
          >
            <a
              href="https://github.com/alizohran"
              target="_blank"
              rel="noopener noreferrer"
              className="github-view-more-link"
            >
              view more projects on github ↗
            </a>
          </motion.p>

        </div>
      </section>
    </>
  );
}