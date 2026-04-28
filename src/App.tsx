import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  BatteryCharging,
  Brain,
  Cpu,
  GraduationCap,
  Mail,
  Sparkles,
  Store,
  Trophy,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import VenomNetworkBackground from "./components/VenomNetworkBackground";

const projects = [
  {
    title: "SoccerTwos Policy Arena",
    tag: "RL + RAG",
    text: "Deployed multi-agent RL policy evaluation platform for Unity ML-Agents SoccerTwos, with side-balanced safe, aggressive, and baseline comparisons, replay analysis, and grounded Copilot answers.",
    stack: ["React", "FastAPI", "Vercel", "Render", "RAG"],
    link: "https://github.com/shahriar-shahram/soccertwos-tactics-copilot",
    liveLink: "https://soccer-tactics-copilot.vercel.app",
    icon: Brain,
    visual: "soccer",
  },
  {
    title: "DemandPilot",
    tag: "Forecasting",
    text: "Client-ready retail demand forecasting dashboard with time-series feature engineering, model comparison, persisted inference, evaluation metrics, and an interactive Streamlit workflow.",
    stack: ["Python", "Pandas", "Scikit-learn", "Streamlit", "Docker"],
    link: "https://github.com/shahriar-shahram/DemandPilot",
    liveLink: "https://demandpilot-shahriar.streamlit.app",
    icon: BarChart3,
    visual: "forecast",
  },
  {
    title: "Fresh Retail AI Copilot",
    tag: "Retail AI",
    text: "Deployed stockout-aware retail demand intelligence system using latent demand recovery, corrected-demand forecasting, lost-sales estimation, and business-facing inventory analysis.",
    stack: ["Python", "FastAPI", "Docker", "Google Cloud Run", "Retail ML"],
    link: "https://github.com/shahriar-shahram/fresh-retail-copilot",
    liveLink: "https://fresh-retail-copilot-frontend-837696130499.us-central1.run.app",
    icon: Store,
    visual: "retail",
  },
  {
    title: "ACC RL Simulator",
    tag: "Deep RL",
    text: "Adaptive cruise control with SAC, TD3, and DDPG under packet loss, using RL to study safety and behavior.",
    stack: ["PyTorch", "SB3", "Gym", "RL"],
    link: "https://github.com/shahriar-shahram/acc-rl-simulator",
    icon: Cpu,
    visual: "acc",
  },
  {
    title: "Energy-Aware EV Autonomy",
    tag: "MPC",
    text: "Energy-aware EV control with MPC, convex approximation, and optimization under autonomy and real-time constraints.",
    stack: ["MPC", "CVXPY", "EV", "Control"],
    link: "https://github.com/shahriar-shahram/energy-aware-ev-autonomy",
    icon: BatteryCharging,
    visual: "energy",
  },
];

const skills = [
  "Python",
  "PyTorch",
  "Stable-Baselines3",
  "Pandas",
  "FastAPI",
  "React",
  "Streamlit",
  "Docker",
  "Azure OpenAI",
  "Google Cloud",
  "CVXPY",
  "MPC",
  "CARLA",
  "SUMO",
];

function Chip({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-xs text-slate-300">
      {children}
    </span>
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 34, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.72, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ProjectVisual({ type }: { type: string }) {
  if (type === "soccer") {
    return (
      <div className="relative h-28 overflow-hidden rounded-2xl bg-gradient-to-br from-sky-400/14 to-indigo-400/16 p-4">
        <div className="mb-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-200/75">
          <span>Agent Matchups</span>
          <span>Safe / Aggressive / Baseline</span>
        </div>
        <svg viewBox="0 0 320 100" className="h-full w-full">
          <circle cx="46" cy="22" r="8" fill="rgba(226,246,255,.88)" />
          <circle cx="98" cy="68" r="8" fill="rgba(196,231,255,.86)" />
          <circle cx="150" cy="38" r="8" fill="rgba(226,246,255,.88)" />
          <circle cx="210" cy="72" r="8" fill="rgba(196,231,255,.86)" />
          <circle cx="264" cy="30" r="8" fill="rgba(226,246,255,.88)" />
          <path d="M46 22 L98 68 L150 38 L210 72 L264 30" stroke="rgba(125,211,252,.9)" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M46 22 L150 38 L264 30" stroke="rgba(255,255,255,.18)" strokeWidth="10" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  if (type === "forecast") {
    return (
      <div className="relative h-28 overflow-hidden rounded-2xl bg-gradient-to-br from-sky-400/16 to-indigo-400/12 p-4">
        <div className="mb-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-200/75">
          <span>Forecast Curve</span>
          <span>Demand</span>
        </div>
        <svg viewBox="0 0 320 100" className="h-full w-full">
          <path d="M12 82 L308 82" stroke="rgba(255,255,255,.12)" />
          {[56, 106, 156, 206, 256].map((x, i) => (
            <rect
              key={x}
              x={x}
              y={36 + (i % 2) * 6}
              width="9"
              height={34 + (i % 3) * 10}
              rx="4"
              fill="rgba(255,255,255,.22)"
            />
          ))}
          <path
            d="M12 72 C42 70 52 52 82 58 S132 84 162 50 S214 22 244 40 S286 58 308 20"
            fill="none"
            stroke="rgba(125,211,252,.88)"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  if (type === "retail") {
    return (
      <div className="relative h-28 overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-400/12 to-violet-400/16 p-4">
        <div className="mb-3 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-100/70">
          <span>Retail Structure</span>
          <span>Copilot</span>
        </div>
        <div className="grid h-[60px] grid-cols-5 gap-2">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="rounded-md bg-white/14"
              style={{ opacity: 0.45 + ((i % 5) * 0.08) }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (type === "acc") {
    return (
      <div className="relative h-28 overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-400/14 to-sky-400/12 p-4">
        <div className="mb-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-100/70">
          <span>Adaptive Cruise Control</span>
          <span>RL</span>
        </div>
        <svg viewBox="0 0 320 100" className="h-full w-full">
          <path
            d="M20 62 H112 C126 62 130 44 144 44 H190 C206 44 210 76 226 76 H300"
            fill="none"
            stroke="rgba(255,255,255,.18)"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M20 62 H112 C126 62 130 44 144 44 H190 C206 44 210 76 226 76 H300"
            fill="none"
            stroke="rgba(125,211,252,.86)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="80" cy="42" r="5.5" fill="rgba(255,255,255,.82)" />
          <circle cx="126" cy="60" r="5.5" fill="rgba(255,255,255,.82)" />
          <circle cx="192" cy="42" r="5.5" fill="rgba(255,255,255,.82)" />
        </svg>
      </div>
    );
  }

  return (
    <div className="relative h-28 overflow-hidden rounded-2xl bg-gradient-to-br from-sky-400/12 to-emerald-400/12 p-4">
      <div className="mb-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-100/70">
        <span>Energy Optimization</span>
        <span>EV</span>
      </div>
      <div className="flex h-[62px] items-end gap-2">
        {[40, 56, 28, 70, 36, 54, 42, 30, 60, 78, 38].map((h, i) => (
          <div
            key={i}
            className="w-full rounded-t-md bg-cyan-200/45"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent text-[var(--text)]">
      <VenomNetworkBackground />

      <div className="relative z-10">
        <nav className="sticky top-0 z-50 border-b border-white/8 bg-slate-950/35 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <a
              href="#"
              className="liquid-border flex items-center gap-2 rounded-full bg-white/[0.04] px-4 py-2 font-semibold text-[var(--text)]"
            >
              <Sparkles className="h-5 w-5 text-sky-300" />
              Shahriar Shahram
            </a>

            <div className="hidden items-center gap-6 text-sm text-[var(--muted)] md:flex">
              <a href="#contact" className="transition hover:text-[var(--text)]">Contact</a>
            </div>
          </div>
        </nav>

        <section className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="pointer-events-none absolute left-1/2 top-14 h-[28rem] w-[30rem] -translate-x-1/2 rounded-full bg-sky-400/10 blur-3xl" />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative max-w-5xl"
          >
            <div className="liquid-border mb-6 inline-flex items-center gap-2 rounded-full bg-sky-300/10 px-4 py-2 text-sm text-sky-100 soft-shadow">
              <Trophy className="h-4 w-4" />
              Ph.D. Researcher · UCF ECE
            </div>

            <h1 className="max-w-5xl text-5xl font-semibold tracking-tight text-[var(--text)] md:text-7xl">
              Building intelligent systems for{" "}
              <span className="bg-gradient-to-r from-sky-300 via-cyan-200 to-indigo-300 bg-clip-text text-transparent">
                autonomy, forecasting, and decision-making.
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
              I am a Ph.D. researcher in Electrical and Computer Engineering at UCF developing machine learning, deep reinforcement learning, model predictive control, and cloud AI systems for real-world uncertainty.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://github.com/shahriar-shahram"
                className="accent-button inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition"
              >
                <FaGithub className="h-4 w-4" />
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/shahriar-shahram/"
                className="secondary-button inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition"
              >
                <FaLinkedin className="h-4 w-4" />
                LinkedIn
              </a>

              <a
                href="https://scholar.google.com/citations?user=x1HlzQwAAAAJ"
                className="secondary-button inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition"
              >
                <GraduationCap className="h-4 w-4" />
                Scholar
              </a>

              <a
                href="/Shahriar_Shahram_Resume.pdf"
                className="resume-button inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition"
              >
                Resume
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </section>

        <section id="work" className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <Reveal>
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="section-kicker">Selected Work</p>
                <h2 className="mt-3 text-4xl font-semibold text-[var(--text)] md:text-5xl">
                  Projects
                </h2>
              </div>
              <p className="max-w-xl text-[var(--muted-2)]">
                Selected product, data, and research engineering projects across forecasting, autonomy, and cloud AI.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, index) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} delay={index * 0.08}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="card-shine liquid-border glass-panel group flex h-full flex-col rounded-[1.8rem] p-4 soft-shadow transition hover:bg-white/[0.08] hover:glow-shadow"
                  >
                    <ProjectVisual type={p.visual} />

                    <div className="flex flex-1 flex-col p-2 pt-5">
                      <div className="mb-4 flex items-start justify-between">
                        <div className="rounded-2xl bg-sky-400/10 p-3 text-sky-300">
                          <Icon className="h-6 w-6" />
                        </div>
                        <ArrowUpRight className="h-5 w-5 text-[var(--muted-2)] transition group-hover:text-sky-300" />
                      </div>

                      <p className="text-sm font-medium text-sky-300">{p.tag}</p>
                      <h3 className="mt-2 text-xl font-semibold text-[var(--text)]">{p.title}</h3>
                      <p className="mt-3 min-h-[108px] text-sm leading-6 text-[var(--muted-2)]">
                        {p.text}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {p.stack.map((item) => (
                          <Chip key={item}>{item}</Chip>
                        ))}
                      </div>

                      <div className="mt-6 flex flex-wrap gap-3">
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noreferrer"
                          className="secondary-button inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition"
                        >
                          GitHub
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>

                        {"liveLink" in p && p.liveLink ? (
                          <a
                            href={p.liveLink}
                            target="_blank"
                            rel="noreferrer"
                            className="accent-button inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition"
                          >
                            Live App
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section id="skills" className="mx-auto max-w-6xl px-6 py-16 text-center">
          <Reveal>
            <p className="section-kicker">Stack</p>
            <h2 className="mt-3 text-4xl font-semibold text-[var(--text)]">Tools I Use</h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-[var(--muted)] backdrop-blur"
                >
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="contact" className="mx-auto max-w-5xl px-6 py-20">
          <Reveal>
            <div className="liquid-border glass-panel-strong rounded-[2rem] p-8 text-center glow-shadow md:p-12">
              <p className="section-kicker">Contact</p>
              <h2 className="mt-4 text-4xl font-semibold text-[var(--text)] md:text-5xl">
                Let’s connect.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[var(--muted)]">
                Opportunities in machine learning, autonomy, data science, forecasting, and cloud AI.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href="mailto:shahriar.shahram95@gmail.com"
                  className="accent-button inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </a>

                <a
                  href="https://github.com/shahriar-shahram"
                  className="secondary-button inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition"
                >
                  <FaGithub className="h-4 w-4" />
                  GitHub
                </a>

                <a
                  href="https://www.linkedin.com/in/shahriar-shahram/"
                  className="secondary-button inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition"
                >
                  <FaLinkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        <footer className="border-t border-white/8 px-6 py-8 text-center text-sm text-[var(--muted-2)]">
          © {new Date().getFullYear()} Shahriar Shahram
        </footer>
      </div>
    </main>
  );
}
