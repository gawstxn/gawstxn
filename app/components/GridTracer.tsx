"use client";

import { useEffect, useRef } from "react";

const GRID = 64; // must match bg-grid background-size
const COLOR = "0,255,136";
const MAX_PARTICLES = 18;
const PARTICLE_SPEED = 1.8; // px per frame

interface Particle {
  // position in canvas px
  x: number;
  y: number;
  // velocity — always axis-aligned, magnitude = PARTICLE_SPEED
  vx: number;
  vy: number;
  // remaining distance on current segment before turning
  remaining: number;
  // brightness 0–1
  alpha: number;
  // trail: array of [x, y] past positions
  trail: Array<[number, number]>;
  trailLen: number;
}

function snapToGrid(v: number): number {
  return Math.round(v / GRID) * GRID;
}

function randomDir(): [number, number] {
  const dirs: Array<[number, number]> = [
    [PARTICLE_SPEED, 0],
    [-PARTICLE_SPEED, 0],
    [0, PARTICLE_SPEED],
    [0, -PARTICLE_SPEED],
  ];
  return dirs[Math.floor(Math.random() * dirs.length)];
}

function spawnParticle(w: number, h: number): Particle {
  // Start on a random grid intersection
  const cols = Math.floor(w / GRID);
  const rows = Math.floor(h / GRID);
  const col = Math.floor(Math.random() * cols);
  const row = Math.floor(Math.random() * rows);
  const [vx, vy] = randomDir();
  const segLen = (1 + Math.floor(Math.random() * 4)) * GRID;
  const trailLen = 60 + Math.floor(Math.random() * 80);
  return {
    x: col * GRID,
    y: row * GRID,
    vx,
    vy,
    remaining: segLen,
    alpha: 0.5 + Math.random() * 0.5,
    trail: [],
    trailLen,
  };
}

export default function GridTracer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const particles: Particle[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Seed initial particles
    for (let i = 0; i < MAX_PARTICLES; i++) {
      particles.push(spawnParticle(canvas.width, canvas.height));
    }

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        // Record trail
        p.trail.push([p.x, p.y]);
        if (p.trail.length > p.trailLen) p.trail.shift();

        // Draw trail as a fading line
        if (p.trail.length > 1) {
          for (let i = 1; i < p.trail.length; i++) {
            const t = i / p.trail.length; // 0 = oldest, 1 = newest
            const a = t * t * p.alpha * 0.55;
            ctx.beginPath();
            ctx.moveTo(p.trail[i - 1][0], p.trail[i - 1][1]);
            ctx.lineTo(p.trail[i][0], p.trail[i][1]);
            ctx.strokeStyle = `rgba(${COLOR},${a})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }

        // Draw bright head
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${COLOR},${p.alpha})`;
        ctx.fill();

        // Soft glow around head
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 10);
        grd.addColorStop(0, `rgba(${COLOR},${p.alpha * 0.4})`);
        grd.addColorStop(1, `rgba(${COLOR},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Move
        p.x += p.vx;
        p.y += p.vy;
        p.remaining -= PARTICLE_SPEED;

        // At segment end: turn or re-spawn
        if (p.remaining <= 0) {
          // Snap to grid intersection
          p.x = snapToGrid(p.x);
          p.y = snapToGrid(p.y);

          // If out of bounds, reset
          if (p.x < 0 || p.x > w || p.y < 0 || p.y > h) {
            Object.assign(p, spawnParticle(w, h));
            continue;
          }

          // Turn: pick a perpendicular or same direction
          const [vx, vy] = randomDir();
          p.vx = vx;
          p.vy = vy;
          p.remaining = (1 + Math.floor(Math.random() * 4)) * GRID;
        }
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 w-full h-full"
      style={{ opacity: 0.65 }}
    />
  );
}
