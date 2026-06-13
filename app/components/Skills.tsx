"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, scaleIn, staggerContainer, viewport } from "@/lib/animations";

/* ── Tech data with tech-stack-icons keys ─────────────────────────────────── */
const skillCategories = [
  {
    category: "Languages",
    color: "#c9a84c",
    skills: [
      { name: "TypeScript",  iconKey: "typescript"  },
      { name: "JavaScript",  iconKey: "javascript"  },
      { name: "Python",      iconKey: "python"      },
      { name: "SQL",         iconKey: "postgresql"  },
    ],
  },
  {
    category: "Frontend",
    color: "#5b8fff",
    skills: [
      { name: "React",         iconKey: "reactjs"       },
      { name: "Next.js",       iconKey: "nextjs"        },
      { name: "Tailwind CSS",  iconKey: "tailwindcss"   },
      { name: "Framer Motion", iconKey: "framermotion"  },
    ],
  },
  {
    category: "Backend",
    color: "#38bdf8",
    skills: [
      { name: "Node.js",   iconKey: "nodejs"    },
      { name: "Express",   iconKey: "expressjs" },
      { name: "REST APIs", iconKey: "postman"   },
      { name: "GraphQL",   iconKey: "graphql"   },
    ],
  },
  {
    category: "Database",
    color: "#a78bfa",
    skills: [
      { name: "PostgreSQL", iconKey: "postgresql" },
      { name: "MySQL",      iconKey: "mysql"      },
      { name: "MongoDB",    iconKey: "mongodb"    },
      { name: "Prisma ORM", iconKey: "prisma"     },
    ],
  },
  {
    category: "DevOps & Tools",
    color: "#34d399",
    skills: [
      { name: "Git",            iconKey: "git"           },
      { name: "GitHub Actions", iconKey: "githubactions" },
      { name: "Docker",         iconKey: "docker"        },
      { name: "Vercel",         iconKey: "vercel"        },
    ],
  },
];

/* ── Tiny icon loader using tech-stack-icons ──────────────────────────────── */
function TechIcon({ iconKey, size = 28 }: { iconKey: string; size?: number }) {
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    import("tech-stack-icons")
      .then((mod: any) => {
        if (cancelled) return;
        const entry = mod[iconKey] ?? mod.default?.[iconKey];
        const raw = entry?.svg?.dark ?? entry?.svg?.light ?? entry?.svg ?? null;
        if (raw && typeof raw === "string") setSvg(raw);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [iconKey]);

  if (!svg) {
    /* Fallback initials box */
    return (
      <div
        style={{
          width: size, height: size, borderRadius: 6,
          background: "var(--bg)", border: "1px solid var(--border)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: size * 0.32, fontFamily: "'DM Mono',monospace",
          fontWeight: 700, color: "var(--gold)", flexShrink: 0,
        }}
      >
        {iconKey.slice(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    <div
      style={{ width: size, height: size, flexShrink: 0, lineHeight: 0 }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

/* ── Sphere helpers ───────────────────────────────────────────────────────── */
const ALL_SKILLS = skillCategories.flatMap(c =>
  c.skills.map(s => ({ ...s, color: c.color, category: c.category }))
);

function spherePositions(count: number, radius: number) {
  const pts: { x: number; y: number; z: number }[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    pts.push({ x: Math.cos(golden * i) * r * radius, y: y * radius, z: Math.sin(golden * i) * r * radius });
  }
  return pts;
}

type GlobeNode = { screenX: number; screenY: number; scale: number; z: number; index: number };

/* ── Globe ────────────────────────────────────────────────────────────────── */
function Globe({ radius }: { radius: number }) {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const rotX      = useRef(0.3);
  const rotY      = useRef(0);
  const velX      = useRef(0);
  const velY      = useRef(0.003);
  const dragging  = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const animRef   = useRef<number>(0);
  const PERSP     = 500;

  const [nodes, setNodes]   = useState<GlobeNode[]>([]);
  const [tooltip, setTooltip] = useState<{ name: string; x: number; y: number } | null>(null);

  const project = useCallback((ox: number, oy: number, oz: number) => {
    const cosY = Math.cos(rotY.current), sinY = Math.sin(rotY.current);
    const x1 = ox * cosY + oz * sinY;
    const z1 = -ox * sinY + oz * cosY;
    const cosX = Math.cos(rotX.current), sinX = Math.sin(rotX.current);
    const y2 = oy * cosX - z1 * sinX;
    const z2 = oy * sinX + z1 * cosX;
    const s = PERSP / (PERSP + z2);
    return { screenX: x1 * s, screenY: y2 * s, scale: s, z: z2 };
  }, []);

  useEffect(() => {
    const base = spherePositions(ALL_SKILLS.length, radius);
    const tick = () => {
      if (!dragging.current) {
        rotY.current += velY.current;
        rotX.current += velX.current;
        velX.current *= 0.95;
        velY.current = velY.current * 0.995 + 0.003 * 0.005;
      }
      const projected = base.map((p, i) => {
        const { screenX, screenY, scale, z } = project(p.x, p.y, p.z);
        return { screenX, screenY, scale, z, index: i };
      });
      projected.sort((a, b) => a.z - b.z);
      setNodes(projected);
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [project, radius]);

  const startDrag = (x: number, y: number) => {
    dragging.current = true;
    lastMouse.current = { x, y };
  };
  const moveDrag = (x: number, y: number) => {
    if (!dragging.current) return;
    const dx = x - lastMouse.current.x;
    const dy = y - lastMouse.current.y;
    velY.current = dx * 0.005;
    velX.current = dy * 0.005;
    rotY.current += dx * 0.005;
    rotX.current += dy * 0.005;
    lastMouse.current = { x, y };
  };
  const stopDrag = () => { dragging.current = false; };

  const SIZE = radius * 2 + 60; /* container px */

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        ref={wrapRef}
        onMouseDown={e => startDrag(e.clientX, e.clientY)}
        onMouseMove={e => moveDrag(e.clientX, e.clientY)}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onTouchStart={e => startDrag(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchMove={e => { e.preventDefault(); moveDrag(e.touches[0].clientX, e.touches[0].clientY); }}
        onTouchEnd={stopDrag}
        style={{
          position: "relative",
          width:  SIZE,
          height: SIZE,
          cursor: dragging.current ? "grabbing" : "grab",
          userSelect: "none",
          touchAction: "none",
        }}
      >
        {/* glow ring */}
        <div style={{
          position: "absolute", inset: "12%", borderRadius: "50%",
          border: "1px solid rgba(201,168,76,0.1)",
          background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {nodes.map(({ screenX, screenY, scale, index }) => {
          const tech    = ALL_SKILLS[index];
          const opacity = Math.max(0.2, (scale - 0.55) * 2.2);
          const iconSz  = Math.round(22 + scale * 10);
          return (
            <div
              key={tech.name}
              style={{
                position: "absolute",
                left: `calc(50% + ${screenX}px)`,
                top:  `calc(50% + ${screenY}px)`,
                transform: "translate(-50%,-50%)",
                opacity,
                zIndex: Math.round(scale * 100),
                cursor: "pointer",
                transition: "filter 0.15s",
                filter: "none",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.filter = `drop-shadow(0 0 6px ${tech.color}99)`;
                const r  = (e.currentTarget as HTMLElement).getBoundingClientRect();
                const pr = wrapRef.current!.getBoundingClientRect();
                setTooltip({ name: tech.name, x: r.left - pr.left + r.width / 2, y: r.top - pr.top - 8 });
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.filter = "none";
                setTooltip(null);
              }}
            >
              <TechIcon iconKey={tech.iconKey} size={iconSz} />
            </div>
          );
        })}

        {tooltip && (
          <div style={{
            position: "absolute",
            left: tooltip.x,
            top:  tooltip.y,
            transform: "translate(-50%,-100%)",
            background: "var(--bg-card)",
            border: "1px solid rgba(201,168,76,0.3)",
            color: "var(--gold-light)",
            fontFamily: "'DM Mono',monospace",
            fontSize: "0.68rem",
            padding: "4px 10px",
            borderRadius: 6,
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 9999,
            boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
          }}>
            {tooltip.name}
          </div>
        )}
      </div>

      <p style={{
        fontFamily: "'DM Mono',monospace", fontSize: "0.65rem",
        color: "var(--text-dim)", letterSpacing: "0.12em", marginTop: 8,
      }}>
        drag to rotate
      </p>
    </div>
  );
}

/* ── Main export ──────────────────────────────────────────────────────────── */
export default function Skills() {
  const ref    = useRef(null);
  const inView = useInView(ref, viewport);
  const [globeRadius, setGlobeRadius] = useState(170);

  /* Shrink globe on narrow screens */
  useEffect(() => {
    const update = () => setGlobeRadius(window.innerWidth < 480 ? 120 : window.innerWidth < 768 ? 145 : 170);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <>
      <style>{`
        /* ── category cards grid ── */
        .skills-cat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }
        @media (max-width: 900px) {
          .skills-cat-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 520px) {
          .skills-cat-grid { grid-template-columns: 1fr; }
        }

        /* ── badge grid inside each card ── */
        .skills-badge-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        @media (max-width: 520px) {
          .skills-badge-grid { grid-template-columns: repeat(2, 1fr); }
        }

        /* ── globe + cards two-col layout ── */
        .skills-layout {
          display: grid;
          grid-template-columns: 400px 1fr;
          gap: 48px;
          align-items: start;
        }
        @media (max-width: 900px) {
          .skills-layout {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        /* badge hover handled via JS; define base style here */
        .skill-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 8px 10px;
          cursor: default;
          transition: border-color 0.2s, transform 0.15s, box-shadow 0.2s;
        }
        .skill-badge:hover {
          transform: translateY(-2px);
        }
      `}</style>

      <section id="skills" ref={ref} style={{ padding: "96px 0", background: "var(--bg-2)" }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 24px" }}>

          {/* ── Header ── */}
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
            style={{ marginBottom: "52px", textAlign: "center" }}
          >
            {/* <p className="font-mono-custom" style={{
              color: "var(--gold)", fontSize: "0.72rem",
              letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "10px",
            }}>
              What I work with
            </p> */}
            <h2 className="font-display" style={{
              fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, color: "var(--text)",
            }}>
              Technologies I Work With
            </h2>
            <div style={{
              width: 60, height: 2, margin: "14px auto 0",
              background: "linear-gradient(90deg, var(--gold), transparent)",
            }} />
          </motion.div>

          {/* ── Globe + Cards layout ── */}
          <div className="skills-layout">

            {/* Left — Globe */}
            <motion.div
              variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Globe radius={globeRadius} />
            </motion.div>

            {/* Right — Category cards */}
            <motion.div
              variants={staggerContainer(0.08)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="skills-cat-grid"
            >
              {skillCategories.map((cat) => (
                <motion.div
                  key={cat.category}
                  variants={scaleIn}
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    padding: "16px",
                    transition: "border-color 0.25s, box-shadow 0.25s",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = cat.color + "66";
                    el.style.boxShadow   = `0 0 24px ${cat.color}18`;
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--border)";
                    el.style.boxShadow   = "none";
                  }}
                >
                  {/* Card header */}
                  <div style={{
                    display: "flex", alignItems: "center", gap: 8,
                    marginBottom: 12, paddingBottom: 10,
                    borderBottom: "1px solid var(--border)",
                  }}>
                    <div style={{
                      width: 4, height: 16, borderRadius: 99,
                      background: cat.color, flexShrink: 0,
                    }} />
                    <span style={{
                      fontSize: "0.8rem", fontWeight: 600,
                      color: "var(--text)", letterSpacing: "0.02em",
                    }}>
                      {cat.category}
                    </span>
                    <div style={{
                      marginLeft: "auto", width: 6, height: 6,
                      borderRadius: "50%", background: cat.color, opacity: 0.5,
                    }} />
                  </div>

                  {/* Badges */}
                  <div className="skills-badge-grid">
                    {cat.skills.map(s => (
                      <div
                        key={s.name}
                        className="skill-badge"
                        style={{ "--hover-color": cat.color } as React.CSSProperties}
                        onMouseEnter={e => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.borderColor = cat.color + "55";
                          el.style.boxShadow   = `0 2px 12px ${cat.color}18`;
                        }}
                        onMouseLeave={e => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.borderColor = "var(--border)";
                          el.style.boxShadow   = "none";
                        }}
                      >
                        <TechIcon iconKey={s.iconKey} size={22} />
                        <span style={{
                          fontSize: "0.75rem", color: "var(--text-muted)",
                          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                          lineHeight: 1.2,
                        }}>
                          {s.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </section>
    </>
  );
}