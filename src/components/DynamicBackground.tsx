import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

type GraphCardProps = {
  className: string;
  delay?: number;
  duration?: number;
  path: string;
};

function GraphCard({ className, delay = 0, duration = 16, path }: GraphCardProps) {
  const points = [
    { cx: 28, cy: 108 },
    { cx: 76, cy: 92 },
    { cx: 126, cy: 96 },
    { cx: 176, cy: 68 },
    { cx: 228, cy: 76 },
    { cx: 278, cy: 44 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0.18, y: 0 }}
      animate={{
        opacity: [0.14, 0.24, 0.14],
        y: [0, -18, 0],
        rotate: [-1.2, 1.2, -1.2],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`absolute rounded-[1.75rem] border border-sky-300/10 bg-slate-900/20 shadow-[0_0_60px_rgba(56,189,248,0.08)] backdrop-blur-md ${className}`}
    >
      <div className="h-full w-full rounded-[1.75rem] bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-4">
        <svg viewBox="0 0 320 160" className="h-full w-full">
          <defs>
            <linearGradient id="lineGlow" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="rgba(125,211,252,0.35)" />
              <stop offset="55%" stopColor="rgba(56,189,248,0.8)" />
              <stop offset="100%" stopColor="rgba(165,180,252,0.65)" />
            </linearGradient>
          </defs>

          {/* subtle grid */}
          {[40, 80, 120].map((y) => (
            <line
              key={`h-${y}`}
              x1="10"
              y1={y}
              x2="310"
              y2={y}
              stroke="rgba(148,163,184,0.10)"
              strokeWidth="1"
            />
          ))}
          {[40, 90, 140, 190, 240, 290].map((x) => (
            <line
              key={`v-${x}`}
              x1={x}
              y1="16"
              x2={x}
              y2="142"
              stroke="rgba(148,163,184,0.08)"
              strokeWidth="1"
            />
          ))}

          {/* animated line */}
          <motion.path
            d={path}
            fill="none"
            stroke="url(#lineGlow)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0.2 }}
            animate={{ pathLength: 1, opacity: [0.25, 0.9, 0.45] }}
            transition={{
              pathLength: { duration: 3.4, delay, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" },
              opacity: { duration: 4.8, repeat: Infinity, ease: "easeInOut" },
            }}
          />

          {/* fill under line */}
          <path
            d={`${path} L 278 132 L 28 132 Z`}
            fill="rgba(56,189,248,0.06)"
          />

          {/* animated points */}
          {points.map((p, i) => (
            <motion.circle
              key={i}
              cx={p.cx}
              cy={p.cy}
              r="4.5"
              fill="rgba(125,211,252,0.85)"
              initial={{ scale: 0.8, opacity: 0.3 }}
              animate={{ scale: [0.9, 1.35, 0.9], opacity: [0.35, 1, 0.35] }}
              transition={{
                duration: 2.4,
                delay: delay + i * 0.18,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </svg>
      </div>
    </motion.div>
  );
}

export default function DynamicBackground() {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);

  const smoothX = useSpring(x, { stiffness: 55, damping: 25 });
  const smoothY = useSpring(y, { stiffness: 55, damping: 25 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 220);
      y.set(e.clientY - 220);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-slate-950">
      {/* base background */}
      <div className="absolute inset-0 bg-slate-950" />

      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(125,211,252,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,.18) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      {/* mouse spotlight */}
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="absolute h-[28rem] w-[28rem] rounded-full bg-sky-300/15 blur-3xl"
      />

      {/* moving blobs */}
      <motion.div
        animate={{ x: [0, 80, -30, 0], y: [0, 45, 100, 0], scale: [1, 1.12, 0.95, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 left-10 h-[32rem] w-[32rem] rounded-full bg-cyan-500/18 blur-3xl"
      />

      <motion.div
        animate={{ x: [0, -70, 50, 0], y: [0, 80, -40, 0], scale: [1, 0.92, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-0 top-40 h-[34rem] w-[34rem] rounded-full bg-indigo-500/18 blur-3xl"
      />

      <motion.div
        animate={{ x: [0, 45, -60, 0], y: [0, -40, 40, 0], scale: [1, 1.08, 0.96, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-12rem] left-[28%] h-[34rem] w-[34rem] rounded-full bg-violet-500/14 blur-3xl"
      />

      {/* floating graphs */}
      <GraphCard
        className="left-[4%] top-[14%] h-[180px] w-[340px]"
        delay={0.2}
        duration={18}
        path="M 28 108 C 54 101, 64 90, 76 92 S 111 101, 126 96 S 158 82, 176 68 S 214 74, 228 76 S 260 58, 278 44"
      />

      <GraphCard
        className="right-[5%] top-[24%] h-[170px] w-[320px]"
        delay={0.8}
        duration={20}
        path="M 28 112 C 52 116, 66 98, 76 92 S 116 100, 126 96 S 164 54, 176 68 S 214 84, 228 76 S 258 62, 278 44"
      />

      <GraphCard
        className="left-[16%] bottom-[10%] h-[175px] w-[330px]"
        delay={1.2}
        duration={22}
        path="M 28 118 C 50 110, 62 88, 76 92 S 111 102, 126 96 S 154 64, 176 68 S 208 72, 228 76 S 258 56, 278 44"
      />

      {/* small particles */}
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-sky-100/70"
          style={{
            left: `${8 + ((i * 11) % 86)}%`,
            top: `${12 + ((i * 17) % 76)}%`,
          }}
          animate={{
            y: [0, -28, 0],
            opacity: [0.15, 0.8, 0.15],
          }}
          transition={{
            duration: 7 + (i % 5),
            repeat: Infinity,
            delay: i * 0.25,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* readability overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/55 via-transparent to-slate-950/78" />
    </div>
  );
}
