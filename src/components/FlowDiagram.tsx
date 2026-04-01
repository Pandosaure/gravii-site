"use client";

import { useEffect, useRef } from "react";

/* ═══════════════════════════════════════════
   GRAVII FLOW DIAGRAM
   Animated intelligence pipeline with 
   particle trails, glow effects, floating nodes
   ═══════════════════════════════════════════ */

const NODES = [
  { id: "capture",  x: 145, y: 120, w: 130, h: 108, label: "Capture",   sub: "Any team · Any source",     color: "#3b82f6", icon: "/images/icon-capture.png" },
  { id: "signals",  x: 575, y: 120, w: 130, h: 108, label: "Signals",   sub: "Requests · Risks · Priorities", color: "#f59e0b", icon: "/images/icon-signals.png" },
  { id: "ai",       x: 360, y: 250, w: 140, h: 115, label: "AI Engine", sub: "Extract · Classify · Link",  color: "#6366f1", icon: "/images/icon-ai-engine.png", glow: true },
  { id: "graph",    x: 145, y: 390, w: 130, h: 108, label: "Graph",     sub: "Entities · Relationships",   color: "#8b5cf6", icon: "/images/icon-graph.png" },
  { id: "traction", x: 575, y: 390, w: 130, h: 108, label: "Traction",  sub: "Score 0-100 · Evidence",     color: "#10b981", icon: "/images/icon-traction.png" },
  { id: "roadmap",  x: 360, y: 470, w: 140, h: 108, label: "Roadmap",   sub: "Prioritized by evidence",    color: "#ef4444", icon: "/images/icon-roadmap.png" },
];

const PATHS = [
  { d: "M145,174 C200,210 280,240 360,307", color: "#6366f1", w: 2, particleColor: "#818cf8", dur: 2.8, label: "raw text", lx: 240, ly: 230, lr: -22 },
  { d: "M360,307 C440,260 500,210 575,174", color: "#6366f1", w: 2, particleColor: "#818cf8", dur: 2.8, delay: 0.8, label: "classified", lx: 480, ly: 230, lr: 22 },
  { d: "M575,174 C595,240 595,320 575,390", color: "#10b981", w: 2, particleColor: "#34d399", dur: 3.5, delay: 0.4, label: "accumulates", lx: 605, ly: 285, lr: 90 },
  { d: "M360,307 C300,340 210,370 145,390", color: "#8b5cf6", w: 2, particleColor: "#a78bfa", dur: 3.2, delay: 1.5, label: "entities", lx: 240, ly: 360, lr: 18 },
  { d: "M575,444 C500,470 430,480 360,524", color: "#f59e0b", w: 2, particleColor: "#fbbf24", dur: 3, delay: 1.2, label: "informs", lx: 480, ly: 480, lr: -12 },
  { d: "M145,444 C220,470 290,480 360,524", color: "#10b981", w: 1.5, particleColor: "#34d399", dur: 3.2, delay: 2, label: "connects", lx: 240, ly: 480, lr: 12 },
  { d: "M360,307 C430,340 510,370 575,390", color: "#f59e0b", w: 1.5, particleColor: "#fbbf24", dur: 3, delay: 0.6 },
];

const LOOP_PATH = "M360,524 C240,560 80,500 65,340 C50,200 90,150 145,120";

export default function FlowDiagram() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Animate nodes appearing with stagger
    const nodes = document.querySelectorAll(".flow-node");
    nodes.forEach((node, i) => {
      setTimeout(() => {
        node.classList.add("flow-node-visible");
      }, 300 + i * 150);
    });

    // Animate edges
    const edges = document.querySelectorAll(".flow-edge");
    edges.forEach((edge, i) => {
      setTimeout(() => {
        (edge as SVGElement).style.strokeDashoffset = "0";
      }, 600 + i * 100);
    });
  }, []);

  return (
    <div className="relative max-w-[760px] mx-auto">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent/[0.04] blur-[80px]" />
      </div>

      <svg ref={svgRef} viewBox="0 0 720 580" className="w-full block relative z-10">
        <defs>
          {/* Glow filter */}
          <filter id="fglow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="fglow-strong" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          {/* Particle glow */}
          <filter id="particle-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          {/* Card gradient fills */}
          <linearGradient id="card-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1b28" />
            <stop offset="100%" stopColor="#12131a" />
          </linearGradient>
          <linearGradient id="ai-card-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e1b35" />
            <stop offset="100%" stopColor="#14121f" />
          </linearGradient>
          {/* Edge gradients */}
          {PATHS.map((p, i) => (
            <linearGradient key={`eg${i}`} id={`eg${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={p.color} stopOpacity="0.05" />
              <stop offset="30%" stopColor={p.color} stopOpacity="0.3" />
              <stop offset="70%" stopColor={p.color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={p.color} stopOpacity="0.05" />
            </linearGradient>
          ))}
        </defs>

        {/* ── Subtle dot grid background ── */}
        <pattern id="dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="15" cy="15" r="0.5" fill="#252640" opacity="0.5" />
        </pattern>
        <rect width="720" height="580" fill="url(#dots)" opacity="0.4" />

        {/* ── Connection edges ── */}
        {PATHS.map((p, i) => (
          <path
            key={`edge-${i}`}
            d={p.d}
            stroke={`url(#eg${i})`}
            strokeWidth={p.w}
            fill="none"
            className="flow-edge"
            style={{
              strokeDasharray: 800,
              strokeDashoffset: 800,
              transition: `stroke-dashoffset 1.5s ease ${0.5 + i * 0.15}s`,
            }}
          />
        ))}

        {/* Loop-back edge (dashed) */}
        <path
          d={LOOP_PATH}
          stroke="#252640"
          strokeWidth="1"
          fill="none"
          strokeDasharray="6,4"
          opacity="0.4"
          className="flow-edge"
          style={{ strokeDasharray: 1200, strokeDashoffset: 1200, transition: "stroke-dashoffset 2.5s ease 1.5s" }}
        />

        {/* ── Animated particles on paths ── */}
        {PATHS.filter(p => p.particleColor).map((p, i) => (
          <g key={`particles-${i}`}>
            {/* Main particle with trail */}
            <circle r="3.5" fill={p.particleColor} opacity="0.9" filter="url(#particle-glow)">
              <animateMotion dur={`${p.dur}s`} repeatCount="indefinite" begin={`${p.delay || 0}s`} path={p.d} />
            </circle>
            {/* Trailing smaller particle */}
            <circle r="1.5" fill={p.particleColor} opacity="0.4">
              <animateMotion dur={`${p.dur}s`} repeatCount="indefinite" begin={`${(p.delay || 0) + 0.15}s`} path={p.d} />
            </circle>
            {/* Leading faint particle */}
            <circle r="2" fill={p.particleColor} opacity="0.3">
              <animateMotion dur={`${p.dur * 1.1}s`} repeatCount="indefinite" begin={`${(p.delay || 0) + p.dur * 0.5}s`} path={p.d} />
            </circle>
          </g>
        ))}

        {/* Loop particle */}
        <circle r="2" fill="#4a4b60" opacity="0.5">
          <animateMotion dur="9s" repeatCount="indefinite" path={LOOP_PATH} />
        </circle>
        <circle r="1" fill="#4a4b60" opacity="0.3">
          <animateMotion dur="9s" repeatCount="indefinite" begin="0.2s" path={LOOP_PATH} />
        </circle>

        {/* ── Edge labels ── */}
        {PATHS.filter(p => p.label).map((p, i) => (
          <text
            key={`label-${i}`}
            x={p.lx}
            y={p.ly}
            textAnchor="middle"
            fill="#3d3e58"
            fontSize="8"
            fontFamily="Plus Jakarta Sans"
            fontWeight="500"
            transform={`rotate(${p.lr} ${p.lx} ${p.ly})`}
          >
            {p.label}
          </text>
        ))}
        <text x="50" y="290" textAnchor="middle" fill="#2d2e48" fontSize="7" fontFamily="Plus Jakarta Sans" fontWeight="500" transform="rotate(-90 50 290)">compounds ↻</text>

        {/* ── Nodes ── */}
        {NODES.map((node, i) => {
          const nx = node.x - node.w / 2;
          const ny = node.y - node.h / 2;
          const isAI = node.glow;

          return (
            <g
              key={node.id}
              className="flow-node cursor-pointer"
              style={{ opacity: 0, transform: "scale(0.85)", transformOrigin: `${node.x}px ${node.y}px`, transition: `opacity 0.6s ease, transform 0.6s ease` }}
            >
              {/* Ambient glow behind AI node */}
              {isAI && (
                <ellipse
                  cx={node.x}
                  cy={node.y}
                  rx={node.w * 0.6}
                  ry={node.h * 0.5}
                  fill={node.color}
                  opacity="0.06"
                  filter="url(#fglow-strong)"
                >
                  <animate attributeName="opacity" values="0.04;0.08;0.04" dur="4s" repeatCount="indefinite" />
                </ellipse>
              )}

              {/* Card shadow */}
              <rect
                x={nx + 2}
                y={ny + 3}
                width={node.w}
                height={node.h}
                rx={isAI ? 22 : 16}
                fill="black"
                opacity="0.3"
                filter="url(#fglow)"
              />

              {/* Card body */}
              <rect
                x={nx}
                y={ny}
                width={node.w}
                height={node.h}
                rx={isAI ? 22 : 16}
                fill={isAI ? "url(#ai-card-fill)" : "url(#card-fill)"}
                stroke={isAI ? node.color : "#2a2b3d"}
                strokeWidth={isAI ? 1.5 : 1}
              />

              {/* Top accent line with glow */}
              <rect
                x={nx}
                y={ny}
                width={node.w}
                height={isAI ? 2.5 : 2}
                rx={1}
                fill={node.color}
              />
              {isAI && (
                <rect
                  x={nx + 10}
                  y={ny}
                  width={node.w - 20}
                  height={2}
                  rx={1}
                  fill={node.color}
                  filter="url(#fglow)"
                  opacity="0.6"
                />
              )}

              {/* Inner subtle border highlight */}
              <rect
                x={nx + 1}
                y={ny + 1}
                width={node.w - 2}
                height={node.h - 2}
                rx={isAI ? 21 : 15}
                fill="none"
                stroke="white"
                strokeWidth="0.5"
                opacity="0.03"
              />

              {/* Icon */}
              <image
                href={node.icon}
                x={node.x - 28}
                y={ny + 10}
                width="56"
                height="56"
              />

              {/* Label */}
              <text
                x={node.x}
                y={ny + node.h - 24}
                textAnchor="middle"
                fill="white"
                fontSize={isAI ? 14 : 13}
                fontWeight="700"
                fontFamily="Plus Jakarta Sans"
              >
                {node.label}
              </text>

              {/* Sublabel */}
              <text
                x={node.x}
                y={ny + node.h - 9}
                textAnchor="middle"
                fill={isAI ? "#818cf8" : "#6b6c82"}
                fontSize="9"
                fontFamily="Plus Jakarta Sans"
                fontWeight={isAI ? "500" : "400"}
              >
                {node.sub}
              </text>

              {/* Hover highlight border */}
              <rect
                x={nx}
                y={ny}
                width={node.w}
                height={node.h}
                rx={isAI ? 22 : 16}
                fill="none"
                stroke={node.color}
                strokeWidth="1.5"
                opacity="0"
                className="transition-opacity duration-300"
              >
                <set attributeName="opacity" to="0.4" begin="mouseover" end="mouseout" />
              </rect>
            </g>
          );
        })}
      </svg>

      <style jsx>{`
        .flow-node-visible {
          opacity: 1 !important;
          transform: scale(1) !important;
        }
      `}</style>
    </div>
  );
}
