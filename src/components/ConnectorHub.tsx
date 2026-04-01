"use client";

import { useState } from "react";
import Image from "next/image";

const TOOLS = [
  {
    id: "email", label: "Email & Transcripts",
    logos: ["/images/logos/fireflies.webp"],
    signal: "Meeting transcripts auto-processed", status: "Launching soon",
    angle: -90, color: "#3b82f6",
  },
  {
    id: "slack", label: "Slack & Teams",
    logos: ["/images/logos/slack.png", "/images/logos/teams.png"],
    signal: "Conversations & channel signals", status: "Coming Q2",
    angle: -30, color: "#f59e0b",
  },
  {
    id: "jira", label: "Jira & Linear",
    logos: ["/images/logos/jira.svg", "/images/logos/linear.webp"],
    signal: "Ticket changes & comments", status: "Coming Q3",
    angle: 30, color: "#10b981",
  },
  {
    id: "gong", label: "Gong & Calls",
    logos: ["/images/logos/gong.webp"],
    signal: "Customer call intelligence", status: "Via email",
    angle: 90, color: "#8b5cf6",
  },
  {
    id: "crm", label: "HubSpot & Salesforce",
    logos: ["/images/logos/hubspot.svg", "/images/logos/salesforce.png"],
    signal: "Deals · Churn · Expansion signals", status: "Coming Q3",
    angle: 150, color: "#ef4444",
  },
  {
    id: "zapier", label: "Zapier & Make",
    logos: ["/images/logos/zapier.svg", "/images/logos/make.png"],
    signal: "5,000+ tools via webhook", status: "Coming Q2",
    angle: 210, color: "#06b6d4",
  },
];

const RADIUS = 38; // percentage from center
const CX = 50;
const CY = 50;

export default function ConnectorHub() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-[700px] mx-auto" style={{ aspectRatio: "1 / 0.9" }}>
      {/* ── SVG layer: connections + particles ── */}
      <svg viewBox="0 0 700 630" className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <defs>
          <filter id="hglow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="hglow-lg" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Orbit ring */}
        <circle cx="350" cy="315" r="240" fill="none" stroke="#1a1b28" strokeWidth="1" strokeDasharray="4,8" />

        {/* Connection lines + particles */}
        {TOOLS.map((tool) => {
          const rad = (tool.angle * Math.PI) / 180;
          const tx = 350 + 240 * Math.cos(rad);
          const ty = 315 + 240 * Math.sin(rad);
          const mx = 350 + 100 * Math.cos(rad);
          const my = 315 + 100 * Math.sin(rad);
          const path = `M${tx},${ty} Q${mx},${my} 350,315`;
          const isActive = hovered === tool.id || hovered === null;

          return (
            <g key={`conn-${tool.id}`}>
              <path d={path} stroke={tool.color} strokeWidth={hovered === tool.id ? 2 : 1} fill="none"
                opacity={hovered === tool.id ? 0.5 : 0.15} style={{ transition: "all 0.3s" }} />
              <circle r={hovered === tool.id ? 4 : 2.5} fill={tool.color} opacity={isActive ? 0.8 : 0.25} filter="url(#hglow)">
                <animateMotion dur={`${2.8 + Math.random()}s`} repeatCount="indefinite" path={path} />
              </circle>
              <circle r="1.5" fill={tool.color} opacity={isActive ? 0.3 : 0.08}>
                <animateMotion dur={`${2.8 + Math.random()}s`} repeatCount="indefinite" begin="0.25s" path={path} />
              </circle>
              <circle r={hovered === tool.id ? 3.5 : 2} fill={tool.color} opacity={isActive ? 0.5 : 0.12} filter="url(#hglow)">
                <animateMotion dur={`${3.5 + Math.random() * 0.5}s`} repeatCount="indefinite" begin={`${1 + Math.random()}s`} path={path} />
              </circle>
            </g>
          );
        })}

        {/* Center glow */}
        <ellipse cx="350" cy="315" rx="50" ry="50" fill="#6366f1" opacity="0.05" filter="url(#hglow-lg)">
          <animate attributeName="rx" values="45;55;45" dur="4s" repeatCount="indefinite" />
          <animate attributeName="ry" values="45;55;45" dur="4s" repeatCount="indefinite" />
        </ellipse>
      </svg>

      {/* ── HTML layer: nodes ── */}

      {/* Center node — Gravii */}
      <div className="absolute z-10 flex flex-col items-center" style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-light to-purple-600 flex items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.3)]">
          <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-accent to-purple-700 flex flex-col items-center justify-center">
            <span className="text-white text-lg font-extrabold tracking-tight">G</span>
            <span className="text-white/50 text-[7px] font-medium -mt-0.5">Intelligence</span>
          </div>
        </div>
      </div>

      {/* Tool nodes */}
      {TOOLS.map((tool) => {
        const rad = (tool.angle * Math.PI) / 180;
        const left = CX + RADIUS * Math.cos(rad);
        const top = CY + RADIUS * Math.sin(rad);
        const isHov = hovered === tool.id;

        return (
          <div
            key={tool.id}
            className="absolute z-20 group cursor-pointer"
            style={{ left: `${left}%`, top: `${top}%`, transform: "translate(-50%, -50%)" }}
            onMouseEnter={() => setHovered(tool.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className={`
              relative px-4 py-3 rounded-xl border transition-all duration-300 min-w-[140px] text-center
              ${isHov ? "bg-surface-2 border-border-2 shadow-lg scale-105" : "bg-bg-2 border-border/60"}
            `}>
              {/* Top accent line */}
              <div className="absolute top-0 left-3 right-3 h-[2px] rounded-full" style={{ background: tool.color, opacity: isHov ? 1 : 0.5 }} />

              {/* Logos */}
              <div className="flex items-center justify-center gap-2 mb-2 mt-1">
                {tool.logos.map((logo, i) => (
                  <div key={i} className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center p-1">
                    <Image src={logo} alt="" width={20} height={20} className="object-contain" />
                  </div>
                ))}
              </div>

              {/* Label */}
              <p className="text-[13px] font-bold text-txt leading-tight">{tool.label}</p>

              {/* Status badge */}
              <span className="inline-block mt-1.5 text-[9px] font-mono px-2 py-0.5 rounded-full" style={{
                color: tool.color, background: `${tool.color}15`, border: `1px solid ${tool.color}25`
              }}>{tool.status}</span>

              {/* Hover expand */}
              {isHov && (
                <div className="mt-2 pt-2 border-t border-border/40">
                  <p className="text-[11px] text-txt-2 leading-relaxed">{tool.signal}</p>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Bottom caption */}
      <p className="absolute bottom-0 left-0 right-0 text-center text-[12px] text-txt-3">
        Hover to explore what signals each tool sends to Gravii.
      </p>
    </div>
  );
}
