"use client";

/**
 * SurfaceReticle — Attack Surface Sensor Instrument.
 *
 * Concentric spinning rings, active radar sweep, pulsing target core,
 * precision bezel tick marks, and 4 domain nodes positioned on the circle.
 * Fully stationary (no mouse cursor tilt) with balanced, legible node positions.
 */
const NODES = [
  { id: "mobile", label: "MOBILE", angle: -32, radius: 33 },
  { id: "infra", label: "INFRASTRUCTURE", angle: 62, radius: 35 },
  { id: "web", label: "WEB / API", angle: -90, radius: 40 },
  { id: "offensive", label: "OFFENSIVE", angle: 156, radius: 35 },
];

/** Polar → cartesian on a unit circle, degrees clockwise from 12 o'clock. */
function point(angleDeg: number, radius: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: Number((50 + radius * Math.cos(rad)).toFixed(2)),
    y: Number((50 + radius * Math.sin(rad)).toFixed(2)),
  };
}

/** 48 precision tick marks around the bezel precomputed to avoid SSR/client float differences */
const TICKS = Array.from({ length: 48 }, (_, i) => {
  const angle = i * 7.5;
  const major = i % 6 === 0;
  const rad = ((angle - 90) * Math.PI) / 180;
  const innerR = major ? 46.4 : 48;
  return {
    x1: Number((50 + 50 * Math.cos(rad)).toFixed(2)),
    y1: Number((50 + 50 * Math.sin(rad)).toFixed(2),),
    x2: Number((50 + innerR * Math.cos(rad)).toFixed(2)),
    y2: Number((50 + innerR * Math.sin(rad)).toFixed(2)),
    major,
  };
});

type SurfaceReticleProps = {
  className?: string;
};

export function SurfaceReticle({ className = "" }: SurfaceReticleProps) {
  return (
    <div
      className={`reticle aspect-square w-full select-none ${className}`.trim()}
      aria-label="Attack surface sensor radar displaying 4 domains"
    >
      {/* Concentric rings */}
      <div className="reticle__ring reticle__ring--outer" />
      <div className="reticle__ring reticle__ring--mid" />
      <div className="reticle__ring reticle__ring--inner" />
      <div className="reticle__ring reticle__ring--core" />

      {/* Bezel tick marks */}
      <svg
        className="reticle__ticks absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        aria-hidden="true"
        suppressHydrationWarning
      >
        {TICKS.map((t, i) => (
          <line
            key={i}
            x1={t.x1}
            y1={t.y1}
            x2={t.x2}
            y2={t.y2}
            strokeWidth={t.major ? 0.45 : 0.25}
            opacity={t.major ? 0.95 : 0.45}
          />
        ))}
      </svg>

      {/* Crosshairs */}
      <svg
        className="reticle__crosshair absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.3"
        strokeLinecap="round"
      >
        <line x1="50" y1="3" x2="50" y2="10" />
        <line x1="50" y1="90" x2="50" y2="97" />
        <line x1="3" y1="50" x2="10" y2="50" />
        <line x1="90" y1="50" x2="97" y2="50" />
      </svg>

      {/* Active sweep & target pulse */}
      <div className="reticle__sweep" />
      <div className="reticle__ping" />

      {/* Core readout */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="font-mono text-[0.5625rem] tracking-[0.22em] text-zinc-400 uppercase">
            Surface
          </div>
          <div className="mt-1 font-sans text-lg font-bold tracking-[-0.04em] text-zinc-100 sm:text-xl">
            04 domains
          </div>
        </div>
      </div>

      {/* Domain node badges with individual radii & positions */}
      {NODES.map((n) => {
        const p = point(n.angle, n.radius);
        return (
          <div
            key={n.id}
            className="reticle__label"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <span className="reticle__node-dot" />
            <b>{n.label}</b>
          </div>
        );
      })}
    </div>
  );
}
