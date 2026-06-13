"use client";

import { Fragment, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Lightbulb, Rocket, Target } from "lucide-react";
import { fadeUp, scaleIn, staggerContainer, viewport } from "@/lib/animations";

const values = [
  {
    icon: Code2,
    title: "Clean Code",
    desc: "Writing maintainable, efficient, and well-documented code is my priority.",
  },
  {
    icon: Lightbulb,
    title: "Problem Solver",
    desc: "I love tackling complex challenges and finding elegant solutions.",
  },
  {
    icon: Rocket,
    title: "Fast Learner",
    desc: "Constantly learning new technologies and best practices in development.",
  },
  {
    icon: Target,
    title: "Goal-Driven",
    desc: "Focused on delivering high-quality results that exceed expectations.",
  },
];

const stats = [
  { value: "5+",   label: "Years Experience" },
  { value: "10+",  label: "Projects Completed" },
  { value: "100%", label: "Client Satisfaction" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, viewport);

  return (
    <>
      <style>{`
        .about-values-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 32px;
        }
        .about-stats-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0;
        }
        .value-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 28px 22px;
          transition: border-color 0.25s, transform 0.2s;
        }
        .value-card:hover {
          border-color: var(--border-light);
          transform: translateY(-3px);
        }
        .value-icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          background: var(--gold-dim);
          border: 1px solid rgba(201,168,76,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
        }
        .stat-divider {
          width: 1px;
          background: var(--border);
          align-self: stretch;
          margin: 20px 0;
        }
        @media (max-width: 900px) {
          .about-values-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 520px) {
          .about-values-grid { grid-template-columns: 1fr; }
          .about-stats-bar {
            flex-direction: column;
          }
          .stat-divider {
            width: auto;
            height: 1px;
            margin: 0 20px;
          }
        }
      `}</style>

      <section
        id="about"
        ref={ref}
        style={{
          padding: "100px 0",
          background: "var(--bg-2)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle background glow */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 700,
            height: 300,
            background: "radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 24px", position: "relative" }}>

          {/* ── Header ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            style={{ textAlign: "center", marginBottom: "64px" }}
          >
            <p
              className="font-mono-custom"
              style={{
                fontSize: "0.72rem",
                letterSpacing: "0.2em",
                color: "var(--gold)",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              About Me
            </p>

            <h2
              className="font-display"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: "24px",
              }}
            >
              <span style={{ color: "var(--text)" }}>Passionate About </span>
              <span
                style={{
                  background: "linear-gradient(135deg, var(--gold), var(--gold-light))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Building Solutions
              </span>
            </h2>

            <p
              style={{
                maxWidth: "680px",
                margin: "0 auto",
                fontSize: "1.05rem",
                lineHeight: 1.8,
                color: "var(--text-muted)",
              }}
            >
              I'm a full-stack developer with a passion for creating beautiful,
              functional, and user-friendly applications. With expertise in modern
              web technologies, I transform ideas into reality through clean code
              and innovative thinking.
            </p>
          </motion.div>

          {/* ── Value cards ── */}
          <motion.div
            className="about-values-grid"
            variants={staggerContainer(0.1, 0.1)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <motion.div key={v.title} variants={scaleIn} className="value-card">
                  <div className="value-icon-wrap">
                    <Icon size={22} color="var(--gold)" strokeWidth={1.6} />
                  </div>
                  <h4
                    style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "var(--text)",
                      marginBottom: "10px",
                    }}
                  >
                    {v.title}
                  </h4>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      lineHeight: 1.65,
                      color: "var(--text-muted)",
                    }}
                  >
                    {v.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* ── Stats bar ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.4 }}
          >
            <div
              className="about-stats-bar"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              {stats.map((s, i) => (
                <Fragment key={s.label}>
                  {i > 0 && <div className="stat-divider" />}
                  <div
                    style={{
                      padding: "36px 24px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      className="font-mono-custom"
                      style={{
                        fontSize: "clamp(2rem, 4vw, 2.75rem)",
                        fontWeight: 700,
                        background: "linear-gradient(135deg, var(--gold), var(--gold-light))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        lineHeight: 1,
                        marginBottom: "10px",
                      }}
                    >
                      {s.value}
                    </div>
                    <div
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--text-muted)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}