"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

function CaptureDemo() {
  const [step, setStep] = useState(0);
  const lines = [
    { text: "Sarah from DataFlow called about bulk import...", type: "input" },
    { text: "→ DataFlow (Company, €120K ARR)", type: "entity", color: "#10b981" },
    { text: "→ Bulk Import (Feature, demand signal)", type: "entity", color: "#6366f1" },
    { text: "→ Churn Risk: €120K if not shipped by June", type: "signal", color: "#ef4444" },
  ];

  useEffect(() => {
    const interval = setInterval(() => setStep((s) => (s + 1) % (lines.length + 2)), 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-[10px] space-y-1.5 mt-3">
      {lines.map((line, i) => (
        <div key={i} className="transition-all duration-500" style={{ opacity: step > i ? 1 : 0, transform: step > i ? "translateX(0)" : "translateX(-8px)" }}>
          <span style={{ color: line.type === "input" ? "#5e5f7a" : line.color }} className={line.type !== "input" ? "font-semibold" : ""}>{line.text}</span>
        </div>
      ))}
      <div className="mt-2 h-0.5 rounded-full bg-accent transition-all duration-1000" style={{ width: step > 3 ? "100%" : "0%" }} />
    </div>
  );
}

function TractionDemo() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 600); return () => clearTimeout(t); }, []);

  return (
    <div className="mt-3 space-y-2">
      {[{ name: "Bulk Import", score: 82, w: 82, color: "#10b981" }, { name: "API Webhooks", score: 71, w: 71, color: "#6366f1" }, { name: "Enterprise SSO", score: 54, w: 54, color: "#f59e0b" }].map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold w-6" style={{ color: item.color }}>{item.score}</span>
          <span className="text-[10px] text-txt-2 w-20 truncate">{item.name}</span>
          <div className="flex-1 h-2 rounded-full bg-surface-3 overflow-hidden">
            <div className="h-full rounded-full transition-all duration-[1.5s] ease-out" style={{ width: visible ? `${item.w}%` : "0%", background: item.color, transitionDelay: `${i * 0.3}s` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function FeaturesBento() {
  return (
    <div className="space-y-4">
      {/* ── Top row: 2 hero cards ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* AI Capture — 3/5 width */}
        <div className="reveal lg:col-span-3 group p-6 rounded-2xl bg-gradient-to-br from-bg-2 to-bg-3 border border-border/50 hover:border-accent/40 transition-all duration-300 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-40 h-40 bg-accent/[0.03] rounded-full blur-[60px] pointer-events-none" />
          <div className="flex gap-6 items-start">
            <div className="flex-1 min-w-0">
              <Image src="/images/icon-feat-capture.png" alt="" width={44} height={44} className="mb-3" />
              <h3 className="text-base font-bold mb-1.5">AI Capture</h3>
              <p className="text-[13px] text-txt-2 leading-relaxed">Paste anything — meeting transcripts, sales call notes, CS tickets, Slack threads. AI extracts entities, signals, and decisions in seconds.</p>
            </div>
            <div className="hidden sm:block w-[260px] flex-shrink-0 p-3 rounded-xl bg-bg/60 border border-border/30">
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
                <span className="text-[8px] font-mono text-txt-3">EXTRACTING...</span>
              </div>
              <CaptureDemo />
            </div>
          </div>
        </div>

        {/* Traction Scoring — 2/5 width */}
        <div className="reveal lg:col-span-2 group p-6 rounded-2xl bg-gradient-to-br from-bg-2 to-bg-3 border border-border/50 hover:border-accent/40 transition-all duration-300 overflow-hidden relative" style={{ animationDelay: "0.08s" }}>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald/[0.03] rounded-full blur-[50px] pointer-events-none" />
          <Image src="/images/icon-feat-traction.png" alt="" width={44} height={44} className="mb-3" />
          <h3 className="text-base font-bold mb-1.5">Traction Scoring</h3>
          <p className="text-[13px] text-txt-2 leading-relaxed mb-1">Every roadmap item earns a 0-100 score across five dimensions. Evidence compounds over time.</p>
          <TractionDemo />
        </div>
      </div>

      {/* ── Bottom row: 4 small cards in 2x2 ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { icon: "icon-feat-roadmap.png", title: "Roadmap & Gantt", desc: "Drag to move, resize, dependency arrows. Group by category, type, or status. Traction scores on every bar.", delay: "0.16s" },
          { icon: "icon-feat-graph.png", title: "Intelligence Graph", desc: "Every entity connected in a force-directed graph. See how signals flow across your entire organization.", delay: "0.24s" },
          { icon: "icon-feat-dedup.png", title: "Signal Deduplication", desc: "Same customer mentions it three times? Strengthens the existing signal. \"Mentioned 4×\" not 4 separate cards.", delay: "0.32s" },
          { icon: "icon-feat-signals.png", title: "Custom Signal Types", desc: "Define your own signal vocabulary. A consulting firm scores differently than a marketplace. The AI adapts.", delay: "0.40s" },
        ].map((f, i) => (
          <div key={i} className="reveal group p-5 rounded-2xl bg-bg-2 border border-border/50 hover:border-accent/30 transition-all duration-300" style={{ animationDelay: f.delay }}>
            <Image src={`/images/${f.icon}`} alt="" width={36} height={36} className="mb-3 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-sm font-bold mb-1">{f.title}</h3>
            <p className="text-[12px] text-txt-2 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
