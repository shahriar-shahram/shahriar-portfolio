import { useEffect, useRef } from "react";

type NodeType = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  glow: number;
  seed: number;
  noise: number;
  mass: number;
};

export default function VenomNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const context = canvasElement.getContext("2d");
    if (!context) return;

    const canvas: HTMLCanvasElement = canvasElement;
    const ctx: CanvasRenderingContext2D = context;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let animationId = 0;
    let time = 0;

    const mouse = { x: 0, y: 0, active: false };
    const nodes: NodeType[] = [];

    const NODE_COUNT = 28;
    const MAX_SPEED = 0.34;
    const CORE_COUNT = 3;

    function rand(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initNodes() {
      nodes.length = 0;

      for (let i = 0; i < NODE_COUNT; i++) {
        const isCore = i < CORE_COUNT;
        const r = isCore ? rand(5.5, 8.5) : rand(1.6, 3.8);

        nodes.push({
          x: rand(r + 24, width - r - 24),
          y: rand(r + 24, height - r - 24),
          vx: rand(-0.16, 0.16),
          vy: rand(-0.16, 0.16),
          r,
          glow: isCore ? rand(6.5, 10) : rand(3, 5.5),
          seed: rand(0, Math.PI * 2),
          noise: rand(0.00045, 0.0012),
          mass: isCore ? rand(1.8, 2.5) : rand(0.95, 1.25),
        });
      }
    }

    function drawBackground() {
      ctx.clearRect(0, 0, width, height);

      const bg = ctx.createLinearGradient(0, 0, width, height);
      bg.addColorStop(0, "#020617");
      bg.addColorStop(0.48, "#030712");
      bg.addColorStop(1, "#05061a");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      const halo = ctx.createRadialGradient(
        width * 0.5,
        height * 0.35,
        30,
        width * 0.5,
        height * 0.35,
        Math.max(width, height) * 0.8
      );
      halo.addColorStop(0, "rgba(56,189,248,0.045)");
      halo.addColorStop(0.46, "rgba(99,102,241,0.025)");
      halo.addColorStop(1, "rgba(2,6,23,0)");
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, width, height);
    }

    function updateNodes() {
      for (const n of nodes) {
        const liquidX = Math.sin(time * n.noise + n.seed + n.y * 0.0018) * 0.0038;
        const liquidY = Math.cos(time * n.noise + n.seed + n.x * 0.0018) * 0.0038;

        n.vx += liquidX / n.mass;
        n.vy += liquidY / n.mass;

        if (mouse.active) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const dist = Math.max(Math.hypot(dx, dy), 1);

          if (dist < 180) {
            const force = (1 - dist / 180) * 0.006;
            n.vx += (dx / dist) * force;
            n.vy += (dy / dist) * force;
          }
        }

        const speed = Math.hypot(n.vx, n.vy);
        if (speed > MAX_SPEED) {
          n.vx = (n.vx / speed) * MAX_SPEED;
          n.vy = (n.vy / speed) * MAX_SPEED;
        }

        n.x += n.vx;
        n.y += n.vy;

        n.vx *= 0.9975;
        n.vy *= 0.9975;

        if (n.x <= n.r) {
          n.x = n.r;
          n.vx = Math.abs(n.vx) + rand(0.004, 0.02);
        }
        if (n.x >= width - n.r) {
          n.x = width - n.r;
          n.vx = -Math.abs(n.vx) - rand(0.004, 0.02);
        }
        if (n.y <= n.r) {
          n.y = n.r;
          n.vy = Math.abs(n.vy) + rand(0.004, 0.02);
        }
        if (n.y >= height - n.r) {
          n.y = height - n.r;
          n.vy = -Math.abs(n.vy) - rand(0.004, 0.02);
        }
      }
    }

    function drawConnections() {
      const linkDistance = Math.min(220, Math.max(150, width * 0.12));

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];

          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy);

          if (dist > linkDistance) continue;

          const alpha = 1 - dist / linkDistance;
          const nx = -dy / Math.max(dist, 1);
          const ny = dx / Math.max(dist, 1);
          const mx = (a.x + b.x) / 2;
          const my = (a.y + b.y) / 2;

          const bend =
            Math.sin(time * 0.0013 + a.seed * 2.3 + b.seed * 1.7) *
            14 *
            alpha;

          const cx = mx + nx * bend;
          const cy = my + ny * bend;
          const coreBoost = a.r > 5 || b.r > 5 ? 1.15 : 1;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.quadraticCurveTo(cx, cy, b.x, b.y);
          ctx.strokeStyle = `rgba(10, 14, 26, ${0.12 + alpha * 0.12})`;
          ctx.lineWidth = (3.2 + alpha * 3.4) * coreBoost;
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.quadraticCurveTo(cx, cy, b.x, b.y);
          ctx.strokeStyle = `rgba(125, 230, 255, ${0.02 + alpha * 0.11})`;
          ctx.lineWidth = (0.45 + alpha * 0.85) * coreBoost;
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.quadraticCurveTo(cx, cy, b.x, b.y);
          ctx.strokeStyle = `rgba(129, 140, 248, ${0.012 + alpha * 0.05})`;
          ctx.lineWidth = (1.3 + alpha * 1.6) * coreBoost;
          ctx.stroke();
        }
      }
    }

    function drawNodes() {
      for (const n of nodes) {
        const pulse = 1 + Math.sin(time * 0.0012 + n.seed) * 0.08;

        const g = ctx.createRadialGradient(
          n.x,
          n.y,
          0,
          n.x,
          n.y,
          n.r * n.glow * pulse
        );

        g.addColorStop(0, "rgba(180,245,255,0.16)");
        g.addColorStop(0.38, "rgba(56,189,248,0.055)");
        g.addColorStop(1, "rgba(56,189,248,0)");

        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * n.glow * pulse, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle =
          n.r > 5 ? "rgba(235,250,255,0.86)" : "rgba(205,245,255,0.68)";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(
          n.x - n.r * 0.22,
          n.y - n.r * 0.22,
          Math.max(0.75, n.r * 0.26),
          0,
          Math.PI * 2
        );
        ctx.fillStyle = "rgba(255,255,255,0.82)";
        ctx.fill();
      }
    }

    function drawMouseGlow() {
      if (!mouse.active) return;

      const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 180);
      g.addColorStop(0, "rgba(56,189,248,0.06)");
      g.addColorStop(0.45, "rgba(99,102,241,0.025)");
      g.addColorStop(1, "rgba(2,6,23,0)");

      ctx.fillStyle = g;
      ctx.fillRect(mouse.x - 180, mouse.y - 180, 360, 360);
    }

    function animate() {
      time += 8;

      drawBackground();
      updateNodes();
      drawConnections();
      drawNodes();
      drawMouseGlow();

      animationId = requestAnimationFrame(animate);
    }

    function handleResize() {
      resize();
      initNodes();
    }

    function onMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    }

    function onMouseLeave() {
      mouse.active = false;
    }

    resize();
    initNodes();
    animate();

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-95" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/24 via-transparent to-slate-950/70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(2,6,23,0)_0%,rgba(2,6,23,0.16)_58%,rgba(2,6,23,0.52)_100%)]" />
    </div>
  );
}
