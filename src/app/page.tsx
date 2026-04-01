"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import FlowDiagram from "@/components/FlowDiagram";
import ConnectorHub from "@/components/ConnectorHub";
import FeaturesBento from "@/components/FeaturesBento";

/* ═══ SAMPLES ═══ */
const SAMPLES = [
  { label: "Product Review", text: `Weekly product review — March 28, 2026\n\nSarah from DataFlow called again about bulk import. She said they're processing 50K records manually each week and it's becoming a deal-breaker. Tom mentioned that if we don't ship it by June, DataFlow might churn — that's €120K ARR at risk.\n\nTechPulse also asked about bulk import during their QBR last week. They're a smaller account but growing fast.\n\nDecision: we prioritize bulk import for Q2. Alex will lead engineering. We need to scope it by next Friday.\n\nOn the competitive side, Rival Inc just shipped CSV import last month. We need to go beyond basic CSV — think API-based ingestion. The API webhooks feature depends on bulk import being done first.\n\nEnterprise SSO came up again from Meridian Corp. They won't sign the enterprise contract without it. That's a potential €200K deal stuck in pipeline.` },
  { label: "Customer Call", text: `Call with VP Product @ NovaTech — March 26, 2026\n\nJulia (VP Product) and Marcus (Head of Eng) joined. NovaTech is on our Pro plan, €180K ARR, renewed 3 months ago.\n\nJulia opened with frustration about reporting. "We spend 2 days every sprint compiling metrics from three different tools. Your dashboard is nice but it doesn't pull from Jira or our analytics platform."\n\nMarcus specifically asked about API access. "We need to build internal dashboards that pull your traction scores into our executive reporting tool. Without an API, we're copy-pasting screenshots."\n\nThey also mentioned they're evaluating a competitor for competitive intelligence. Julia said "They showed us automated signal extraction from Gong calls. That's interesting but their pricing is insane — over $20K/year."\n\nAction items: send API roadmap timeline to Julia by EOW. Schedule a follow-up demo of our capture pipeline. Flag to product: custom reporting is now blocking enterprise expansion.` },
  { label: "Strategy Discussion", text: `Leadership offsite — Product strategy Q2-Q3 2026\n\nCEO opened: we need to double ARR by end of year. Currently at €840K, target €1.6M. Three growth vectors discussed:\n\n1. Enterprise expansion: 12 prospects in pipeline, but SSO and audit logs are blockers. CFO noted that 4 of these are €100K+ deals. Decision: SSO moves to P0, target ship date June 15.\n\n2. Self-serve growth: landing page converts at 2.1%, but activation (first capture within 48h) is only 34%. VP Product argues we need better onboarding.\n\n3. Platform play: CTO presented the connector roadmap. Email forwarding is 80% built. Slack integration estimated 3 weeks. Jira read bridge is the big bet — 6 weeks. Consensus: ship email forwarding by April 15, Slack by May 1. Jira deferred to Q3.\n\nCompetitive note: Cycle.app was acquired by Atlassian in September. Their customers are looking for alternatives. Marketing should target Cycle refugees.` },
];

/* ═══ REVEAL HOOK ═══ */
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ═══ PAGE ═══ */
export default function HomePage() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [demoText, setDemoText] = useState("");
  const [demoState, setDemoState] = useState<"input"|"loading"|"result"|"gate">("input");
  const [demoResult, setDemoResult] = useState<any>(null);
  const [demoError, setDemoError] = useState("");
  const [usesLeft, setUsesLeft] = useState(3);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [ctaEmail, setCtaEmail] = useState("");
  const [ctaSubmitted, setCtaSubmitted] = useState(false);

  useReveal();

  useEffect(() => {
    const h = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const loadSample = (i: number) => { setDemoText(SAMPLES[i].text); setDemoState("input"); setDemoError(""); };

  const analyzeText = async () => {
    if (!demoText.trim() || demoText.length < 50) { setDemoError("Paste at least a few paragraphs."); return; }
    setDemoState("loading"); setDemoError("");
    try {
      const res = await fetch("/api/analyze", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: demoText }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setDemoResult(data); setDemoState("result");
      const r = usesLeft - 1; setUsesLeft(r);
      if (r <= 0 && !emailSubmitted) setTimeout(() => setDemoState("gate"), 800);
    } catch (err: any) { setDemoError(err.message || "Failed. Try again."); setDemoState("input"); }
  };

  const submitEmail = (addr: string, type: "demo"|"cta") => {
    console.log(`Email (${type}):`, addr);
    if (type === "demo") { setEmailSubmitted(true); setUsesLeft(3); setDemoState("input"); }
    else setCtaSubmitted(true);
  };

  const Icon = ({ src, size = 40, className = "" }: { src: string; size?: number; className?: string }) => (
    <Image src={`/images/${src}`} alt="" width={size} height={size} className={className} />
  );

  return (
    <>
      {/* ═══ NAV ═══ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 py-4 nav-glass ${navScrolled ? "scrolled" : ""}`}>
        <div className="max-w-[1160px] mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center">
              <span className="text-white text-sm font-bold">G</span>
            </div>
            <span className="text-lg font-extrabold tracking-tight">Gravii</span>
          </a>
          <div className="flex items-center gap-8">
            <a href="#demo" className="hidden sm:block text-sm text-txt-2 font-medium hover:text-txt transition-colors">Try it</a>
            <a href="#how" className="hidden sm:block text-sm text-txt-2 font-medium hover:text-txt transition-colors">How it works</a>
            <a href="#pricing" className="hidden sm:block text-sm text-txt-2 font-medium hover:text-txt transition-colors">Pricing</a>
            <a href="#demo" className="px-5 py-2.5 bg-accent hover:bg-accent-light text-white text-sm font-semibold rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(99,102,241,0.4)]">Try it free</a>
          </div>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="hero-glow" /><div className="hero-glow-secondary" />
        <div className="max-w-[1160px] mx-auto px-6 text-center relative z-10">
          <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-border text-xs text-txt-2 font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse-glow" />
            For product teams at B2B SaaS companies
          </div>
          <h1 className="reveal font-display text-[clamp(44px,7vw,80px)] leading-[0.95] tracking-tight mb-6" style={{ animationDelay: "0.1s" }}>
            <span className="gradient-text">Product intelligence</span><br />
            <span className="gradient-text">that </span><em className="text-accent-light not-italic">builds itself.</em>
          </h1>
          <p className="reveal text-lg text-txt-2 max-w-[540px] mx-auto mb-10 leading-relaxed" style={{ animationDelay: "0.2s" }}>
            Your tools already generate the signals. Gravii connects them into a scored intelligence graph — automatically. No manual input. No spreadsheet wrangling. Just open it and see what matters.
          </p>
          <div className="reveal flex gap-3 justify-center flex-wrap" style={{ animationDelay: "0.3s" }}>
            <a href="#demo" className="shimmer px-7 py-3.5 bg-accent hover:bg-accent-light text-white text-[15px] font-bold rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(99,102,241,0.4)]">Try it now — paste any meeting</a>
            <a href="#how" className="px-7 py-3.5 bg-surface hover:bg-surface-2 text-txt border border-border hover:border-border-2 text-[15px] font-semibold rounded-xl transition-all">See how it works</a>
          </div>
          <p className="reveal text-xs text-txt-3 mt-5" style={{ animationDelay: "0.4s" }}>Free to try · No signup required · Your data is never stored</p>
        </div>
      </section>

      {/* ═══ TRUST BAR ═══ */}
      <section className="py-6 border-y border-border/40">
        <div className="max-w-[1160px] mx-auto px-6 flex items-center justify-center gap-8 sm:gap-12 flex-wrap">
          {[
            { icon: "icon-sec-eu.png", label: "EU hosted (Frankfurt)" },
            { icon: "icon-sec-byok.png", label: "Zero data retention" },
            { icon: "icon-sec-byok.png", label: "Bring your own AI key" },
            { icon: "icon-sec-rls.png", label: "GDPR compliant" },
          ].map((b) => (
            <div key={b.label} className="flex items-center gap-2.5 text-txt-3 text-xs font-medium">
              <Icon src={b.icon} size={20} />{b.label}
            </div>
          ))}
        </div>
      </section>

      {/* ═══ PROBLEM ═══ */}
      <section className="py-20">
        <div className="max-w-[640px] mx-auto px-6 flex flex-col gap-3 items-center">
          {[
            { color: "border-danger/30", text: "Signals scattered across", bold: "5+ tools", rest: "— nobody sees the full picture" },
            { color: "border-amber/30", text: "Decisions and context", bold: "evaporate in 48 hours", rest: "— no audit trail" },
            { color: "border-accent/30", text: "Roadmap shaped by the", bold: "loudest voice", rest: "— not the strongest signal" },
          ].map((p, i) => (
            <div key={i} className={`reveal flex items-center gap-3 px-5 py-3 rounded-xl border ${p.color} bg-bg-2 w-full max-w-[520px]`} style={{ animationDelay: `${i * 0.12}s` }}>
              <span className="text-sm text-txt-2">{p.text} <strong className="text-txt">{p.bold}</strong>{p.rest}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ LIVE DEMO ═══ */}
      <section className="py-20" id="demo">
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="reveal text-xs font-semibold text-accent-light uppercase tracking-[2px] mb-3">Try It Now</p>
            <h2 className="reveal font-display text-[clamp(28px,4vw,44px)] tracking-tight mb-4" style={{ animationDelay: "0.1s" }}>
              <span className="gradient-text">Paste anything.</span> <em className="text-accent-light not-italic">See the intelligence.</em>
            </h2>
            <p className="reveal text-[15px] text-txt-2 max-w-[460px] mx-auto" style={{ animationDelay: "0.15s" }}>Meeting transcript, customer call, Slack thread — watch Gravii extract what matters in seconds.</p>
          </div>
          <div className="max-w-[800px] mx-auto">
            {demoState === "input" && (
              <div className="reveal">
                <textarea value={demoText} onChange={(e) => setDemoText(e.target.value)} placeholder={"Paste your meeting transcript or notes here...\n\nOr try one of the samples below."}
                  className="w-full min-h-[180px] p-4 rounded-2xl border border-border bg-bg-2 text-txt text-sm font-body leading-relaxed resize-y outline-none transition-all" />
                <div className="flex gap-2 mt-3 flex-wrap">
                  <span className="text-[11px] text-txt-3 pt-1">Try a sample:</span>
                  {SAMPLES.map((s, i) => (
                    <button key={i} onClick={() => loadSample(i)} className="px-3 py-1 rounded-lg border border-border bg-surface text-txt-2 text-[11px] font-medium hover:border-accent hover:text-accent-light transition-all cursor-pointer">{s.label}</button>
                  ))}
                </div>
                {demoError && <p className="text-danger text-xs mt-2">{demoError}</p>}
                <button onClick={analyzeText} className="shimmer w-full mt-4 h-12 rounded-xl bg-accent hover:bg-accent-light text-white text-[15px] font-bold border-none cursor-pointer transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2">Analyze</button>
                <p className="text-[11px] text-txt-3 mt-2 text-center">🔒 Your text is processed in memory and immediately discarded.</p>
              </div>
            )}
            {demoState === "loading" && (
              <div className="window-chrome"><div className="window-bar"><span className="window-dot bg-danger/60"/><span className="window-dot bg-amber/60"/><span className="window-dot bg-emerald/60"/><span className="ml-3 text-[11px] text-txt-3 font-mono">analyzing...</span></div>
                <div className="p-12 flex flex-col items-center gap-4">
                  <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin"/>
                  <p className="text-sm text-txt-2">Extracting intelligence from your text...</p>
                  <div className="flex gap-3 mt-2">{["Entities","Signals","Decisions","Traction"].map((s,i)=>(<span key={s} className="text-[10px] font-mono text-txt-3 px-2 py-0.5 rounded bg-surface animate-pulse" style={{animationDelay:`${i*0.3}s`}}>{s}</span>))}</div>
                </div>
              </div>
            )}
            {demoState === "result" && demoResult && (
              <div className="window-chrome"><div className="window-bar"><span className="window-dot bg-danger/60"/><span className="window-dot bg-amber/60"/><span className="window-dot bg-emerald/60"/><span className="ml-3 text-[11px] text-txt-3">Gravii Intelligence Snapshot</span></div>
                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between mb-6 flex-wrap gap-3"><div><span className="text-[10px] font-mono text-txt-3 uppercase tracking-wider">{demoResult.content_type_label}</span><h3 className="text-lg font-bold mt-1">{demoResult.title}</h3></div>
                    {demoResult.urgency && <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${demoResult.urgency==="high"?"bg-danger/15 text-danger":demoResult.urgency==="medium"?"bg-amber/15 text-amber":"bg-txt-3/15 text-txt-3"}`}>{demoResult.urgency} · {demoResult.urgency_reason}</span>}
                  </div>
                  {demoResult.headline && <div className="px-4 py-3 rounded-xl bg-accent/8 border border-accent/15 mb-6"><p className="text-sm font-semibold text-accent-light">{demoResult.headline}</p></div>}
                  {demoResult.columns && <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">{demoResult.columns.map((col:any,ci:number)=>(<div key={ci}><div className="flex items-center gap-2 mb-3"><div className="w-2 h-2 rounded-full" style={{background:col.color}}/><span className="text-xs font-semibold text-txt-2">{col.label}</span></div><div className="space-y-2">{col.items?.map((item:any,ii:number)=>(<div key={ii} className="px-3 py-2.5 rounded-lg bg-surface border border-border/50"><p className="text-[13px] font-medium">{item.text}</p>{item.detail&&<p className="text-[11px] text-txt-3 mt-0.5">{item.detail}</p>}{item.amount&&<span className="text-[10px] font-mono font-bold text-amber mt-1 inline-block">{item.amount}</span>}</div>))}</div></div>))}</div>}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {demoResult.decisions?.length>0&&<div><p className="text-xs font-semibold text-txt-2 mb-2">⚖ Decisions Made</p>{demoResult.decisions.map((d:any,i:number)=>(<div key={i} className="px-3 py-2 rounded-lg bg-accent/6 border border-accent/10 mb-1.5"><p className="text-[13px] font-medium">{d.text}</p>{d.owner&&<p className="text-[10px] text-txt-3 mt-0.5">→ {d.owner}</p>}</div>))}</div>}
                    {demoResult.next_moves?.length>0&&<div><p className="text-xs font-semibold text-txt-2 mb-2">➜ Next Moves</p>{demoResult.next_moves.map((m:string,i:number)=>(<div key={i} className="px-3 py-2 rounded-lg bg-surface border border-border/50 mb-1.5"><p className="text-[13px] text-txt-2">{m}</p></div>))}</div>}
                  </div>
                  {demoResult.blind_spots?.length>0&&<div className="mb-6"><p className="text-xs font-semibold text-txt-2 mb-2">⚠ Blind Spots</p>{demoResult.blind_spots.map((b:string,i:number)=>(<div key={i} className="px-3 py-2 rounded-lg bg-amber/6 border border-amber/10 mb-1.5"><p className="text-[13px] text-txt-2">{b}</p></div>))}</div>}
                  {demoResult.traction?.length>0&&<div><p className="text-xs font-semibold text-txt-2 mb-2">◎ Traction Signals</p><div className="space-y-2">{demoResult.traction.map((t:any,i:number)=>(<div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-surface border border-border/50"><div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent-light text-sm font-bold font-mono flex-shrink-0">{t.score}</div><div className="flex-1 min-w-0"><p className="text-[13px] font-semibold">{t.entity}</p><p className="text-[10px] text-txt-3">{t.reason}</p></div><div className="w-20 h-1.5 rounded-full bg-surface-3 overflow-hidden flex-shrink-0"><div className="h-full rounded-full bg-accent traction-bar-fill visible" style={{width:`${t.score}%`}}/></div></div>))}</div><p className="text-[10px] text-txt-3 mt-3 text-center italic">One conversation. Imagine what 50 would reveal.</p></div>}
                </div>
                <div className="px-6 sm:px-8 pb-6 flex gap-3 flex-wrap">
                  <button onClick={()=>{setDemoText("");setDemoState("input");setDemoResult(null);}} className="px-4 py-2 rounded-lg bg-surface border border-border text-txt-2 text-xs font-medium hover:border-border-2 transition-all cursor-pointer">Analyze another</button>
                  <a href="#pricing" className="px-4 py-2 rounded-lg bg-accent text-white text-xs font-semibold hover:bg-accent-light transition-all">Get full access →</a>
                </div>
              </div>
            )}
            {demoState === "gate" && (
              <div className="window-chrome text-center p-8 sm:p-12"><h3 className="text-xl font-bold mb-2">You&rsquo;ve seen what Gravii can do.</h3><p className="text-sm text-txt-2 mb-6">Enter your email for more analyses or early access to the full platform.</p>
                <div className="flex gap-2 max-w-[400px] mx-auto"><input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@company.com" className="flex-1 h-12 px-4 rounded-lg border border-border bg-surface text-txt text-sm outline-none focus:border-accent"/><button onClick={()=>submitEmail(email,"demo")} className="h-12 px-6 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent-light transition-all cursor-pointer border-none">Unlock</button></div>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="section-divider"/>

      {/* ═══ FLOW DIAGRAM ═══ */}
      <section className="py-24" id="how">
        <div className="max-w-[1160px] mx-auto px-6 text-center">
          <p className="reveal text-xs font-semibold text-accent-light uppercase tracking-[2px] mb-3">How It All Connects</p>
          <h2 className="reveal font-display text-[clamp(28px,4vw,44px)] tracking-tight mb-4" style={{animationDelay:"0.1s"}}>
            <span className="gradient-text">That was one meeting.</span><br/><em className="text-accent-light not-italic">Here&rsquo;s the full system.</em>
          </h2>
          <p className="reveal text-[15px] text-txt-2 max-w-[520px] mx-auto mb-14" style={{animationDelay:"0.15s"}}>Every capture feeds the graph. Every signal strengthens the score. Every decision traces back to evidence.</p>
          <div className="reveal" style={{animationDelay:"0.2s"}}>
            <FlowDiagram />
          </div>
        </div>
      </section>

      <div className="section-divider"/>

      {/* ═══ TRACTION SCORING ═══ */}
      <section className="py-24">
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="reveal text-xs font-semibold text-accent-light uppercase tracking-[2px] mb-3">Traction Scoring</p>
              <h2 className="reveal font-display text-[clamp(28px,4vw,40px)] tracking-tight mb-4" style={{animationDelay:"0.1s"}}>
                <span className="gradient-text">One meeting is a snapshot.</span><br/><em className="text-accent-light not-italic">Fifty give you the truth.</em>
              </h2>
              <p className="reveal text-[15px] text-txt-2 leading-relaxed mb-8" style={{animationDelay:"0.15s"}}>Every roadmap item earns a 0-100 score from five dimensions: Demand, Risk, Strategic alignment, Momentum, and Breadth.</p>
              <div className="space-y-3">
                {[
                  { icon: "icon-callout-evidence.png", title: "Evidence, not opinions", desc: "Every point traces to a real quote from a real conversation." },
                  { icon: "icon-callout-configurable.png", title: "Fully configurable", desc: "Define signal types. Adjust dimension weights. AI wizard adapts to your business." },
                  { icon: "icon-callout-compound.png", title: "Signals compound", desc: "Same customer mentions it twice? Strengthens the signal, doesn't duplicate it." },
                ].map((item, i) => (
                  <div key={i} className="reveal flex gap-3" style={{animationDelay:`${0.2+i*0.08}s`}}>
                    <Icon src={item.icon} size={32} className="mt-0.5 flex-shrink-0"/>
                    <div><p className="text-sm font-semibold">{item.title}</p><p className="text-[12px] text-txt-2">{item.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal window-chrome" style={{animationDelay:"0.2s"}}>
              <div className="window-bar"><span className="window-dot bg-danger/60"/><span className="window-dot bg-amber/60"/><span className="window-dot bg-emerald/60"/><span className="ml-3 text-[11px] text-txt-3 font-mono">Traction · 8 roadmap items</span></div>
              <div className="p-5 space-y-2">
                {[{n:"Bulk Import",s:82,b:[85,75,50,90,60]},{n:"API Webhooks",s:71,b:[70,60,55,80,50]},{n:"Enterprise SSO",s:54,b:[40,80,60,30,45]},{n:"Custom Reports",s:43,b:[50,30,35,40,55]},{n:"Mobile App",s:28,b:[30,10,20,25,40]}].map((item,i)=>(
                  <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-surface/50 hover:bg-surface transition-colors">
                    <span className="text-txt-3 text-[11px] font-mono w-4">{i+1}</span>
                    <span className={`font-mono text-sm font-bold w-8 ${item.s>=70?"text-emerald":item.s>=50?"text-accent-light":"text-txt-3"}`}>{item.s}</span>
                    <span className="text-[13px] font-medium flex-1 min-w-0 truncate">{item.n}</span>
                    <div className="flex gap-0.5 w-28 flex-shrink-0">{item.b.map((w,bi)=>(<div key={bi} className="h-3 rounded-sm flex-1 bg-surface-3 overflow-hidden"><div className="h-full rounded-sm traction-bar-fill visible" style={{width:`${w}%`,background:["#6366f1","#ef4444","#8b5cf6","#10b981","#3b82f6"][bi],transitionDelay:`${i*0.15+bi*0.05}s`}}/></div>))}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"/>

      {/* ═══ GRAPH VIEW ═══ */}
      <section className="py-24">
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal window-chrome order-2 lg:order-1" style={{animationDelay:"0.2s"}}>
              <div className="window-bar"><span className="window-dot bg-danger/60"/><span className="window-dot bg-amber/60"/><span className="window-dot bg-emerald/60"/><span className="ml-3 text-[11px] text-txt-3 font-mono">Graph View</span></div>
              <svg viewBox="0 0 520 380" className="w-full block" style={{background:"#0d0e15"}}>
                <defs><radialGradient id="cg" cx="40%" cy="35%"><stop offset="0%" stopColor="#818cf8"/><stop offset="100%" stopColor="#4f46e5"/></radialGradient></defs>
                <line x1="260" y1="190" x2="150" y2="100" stroke="#2a2b3d" strokeWidth="1.5" className="edge-draw visible"/>
                <line x1="260" y1="190" x2="380" y2="110" stroke="#2a2b3d" strokeWidth="1.5" className="edge-draw visible"/>
                <line x1="260" y1="190" x2="130" y2="260" stroke="#2a2b3d" strokeWidth="1.5" className="edge-draw visible"/>
                <line x1="260" y1="190" x2="390" y2="270" stroke="#2a2b3d" strokeWidth="1.5" className="edge-draw visible"/>
                <line x1="260" y1="190" x2="260" y2="320" stroke="#2a2b3d" strokeWidth="1.5" className="edge-draw visible"/>
                <line x1="150" y1="100" x2="80" y2="55" stroke="#2a2b3d" strokeWidth="1" className="edge-draw visible"/>
                <line x1="150" y1="100" x2="200" y2="45" stroke="#2a2b3d" strokeWidth="1" className="edge-draw visible"/>
                <line x1="380" y1="110" x2="440" y2="55" stroke="#2a2b3d" strokeWidth="1" className="edge-draw visible"/>
                <line x1="380" y1="110" x2="460" y2="160" stroke="#2a2b3d" strokeWidth="1" className="edge-draw visible"/>
                <line x1="130" y1="260" x2="60" y2="300" stroke="#2a2b3d" strokeWidth="1" className="edge-draw visible"/>
                <line x1="130" y1="260" x2="80" y2="200" stroke="#2a2b3d" strokeWidth="1" className="edge-draw visible"/>
                <line x1="390" y1="270" x2="450" y2="320" stroke="#2a2b3d" strokeWidth="1" className="edge-draw visible"/>
                <line x1="200" y1="45" x2="380" y2="110" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,3" opacity="0.5"/>
                <circle cx="260" cy="190" r="32" fill="url(#cg)" className="node-pulse"/><text x="260" y="186" textAnchor="middle" fill="white" fontSize="8" fontWeight="700">ACME</text><text x="260" y="198" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="7">CORP</text>
                <circle cx="150" cy="100" r="22" fill="#3b82f6" opacity="0.85" className="node-pulse"/><text x="150" y="97" textAnchor="middle" fill="white" fontSize="7" fontWeight="600">Product</text><text x="150" y="107" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="6">Core</text>
                <circle cx="380" cy="110" r="20" fill="#3b82f6" opacity="0.85"/><text x="380" y="97" textAnchor="middle" fill="white" fontSize="7" fontWeight="600">Product</text><text x="380" y="107" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="6">API</text>
                <circle cx="130" cy="260" r="18" fill="#10b981" opacity="0.85"/><text x="130" y="257" textAnchor="middle" fill="white" fontSize="6.5" fontWeight="600">DataFlow</text><text x="130" y="267" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="5.5">€120K</text>
                <circle cx="390" cy="270" r="18" fill="#10b981" opacity="0.85"/><text x="390" y="267" textAnchor="middle" fill="white" fontSize="6.5" fontWeight="600">TechPulse</text>
                <circle cx="260" cy="320" r="16" fill="#8b5cf6" opacity="0.85"/><text x="260" y="317" textAnchor="middle" fill="white" fontSize="6" fontWeight="600">Enterprise</text><text x="260" y="327" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="5.5">Expansion</text>
                <circle cx="80" cy="55" r="13" fill="#6366f1" opacity="0.7"/><text x="80" y="55" textAnchor="middle" fill="white" fontSize="5.5" fontWeight="600" dy="1">Bulk Import</text>
                <circle cx="200" cy="45" r="14" fill="#6366f1" opacity="0.7"/><text x="200" y="42" textAnchor="middle" fill="white" fontSize="5.5" fontWeight="600">Webhooks</text><text x="200" y="51" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="5">🔥 82</text>
                <circle cx="440" cy="55" r="12" fill="#6366f1" opacity="0.7"/><text x="440" y="56" textAnchor="middle" fill="white" fontSize="5.5" fontWeight="600" dy="1">SSO</text>
                <circle cx="460" cy="160" r="11" fill="#6366f1" opacity="0.7"/><text x="460" y="161" textAnchor="middle" fill="white" fontSize="5" fontWeight="600" dy="1">Rate Limit</text>
                <circle cx="60" cy="300" r="9" fill="#475569" opacity="0.6"/><text x="60" y="301" textAnchor="middle" fill="white" fontSize="5" fontWeight="700" dy="1">SC</text>
                <circle cx="80" cy="200" r="9" fill="#475569" opacity="0.6"/><text x="80" y="201" textAnchor="middle" fill="white" fontSize="5" fontWeight="700" dy="1">JM</text>
                <circle cx="450" cy="320" r="9" fill="#475569" opacity="0.6"/><text x="450" y="321" textAnchor="middle" fill="white" fontSize="5" fontWeight="700" dy="1">AL</text>
                <circle cx="30" cy="360" r="4" fill="#3b82f6"/><text x="40" y="363" fill="#6b6c82" fontSize="7">Products</text>
                <circle cx="100" cy="360" r="4" fill="#10b981"/><text x="110" y="363" fill="#6b6c82" fontSize="7">Clients</text>
                <circle cx="165" cy="360" r="4" fill="#6366f1"/><text x="175" y="363" fill="#6b6c82" fontSize="7">Features</text>
                <circle cx="240" cy="360" r="4" fill="#475569"/><text x="250" y="363" fill="#6b6c82" fontSize="7">People</text>
              </svg>
            </div>
            <div className="order-1 lg:order-2">
              <p className="reveal text-xs font-semibold text-accent-light uppercase tracking-[2px] mb-3">Intelligence Graph</p>
              <h2 className="reveal font-display text-[clamp(28px,4vw,40px)] tracking-tight mb-4" style={{animationDelay:"0.1s"}}>
                <span className="gradient-text">See the full picture</span><br/><em className="text-accent-light not-italic">across every team.</em>
              </h2>
              <p className="reveal text-[15px] text-txt-2 leading-relaxed" style={{animationDelay:"0.15s"}}>Features, clients, teams, competitors — all connected. When Sales mentions a client and Engineering flags a dependency on the same feature, Gravii connects them automatically.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"/>

      {/* ═══ ZERO INPUT VISION ═══ */}
      <section className="py-24">
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="text-center mb-8">
            <p className="reveal text-xs font-semibold text-accent-light uppercase tracking-[2px] mb-3">Zero-Input Intelligence</p>
            <h2 className="reveal font-display text-[clamp(28px,4vw,44px)] tracking-tight mb-4" style={{animationDelay:"0.1s"}}><span className="gradient-text">Your tools already have</span><br/><em className="text-accent-light not-italic">the answers.</em></h2>
            <p className="reveal text-[15px] text-txt-2 max-w-[480px] mx-auto" style={{animationDelay:"0.15s"}}>Signals flow in from every connected tool. You never enter data — you just see what matters.</p>
          </div>
          <div className="reveal" style={{animationDelay:"0.2s"}}>
            <ConnectorHub />
          </div>
        </div>
      </section>

      <div className="section-divider"/>

      {/* ═══ COMPARISON ═══ */}
      <section className="py-24">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="text-center mb-14">
            <p className="reveal text-xs font-semibold text-accent-light uppercase tracking-[2px] mb-3">Built Different</p>
            <h2 className="reveal font-display text-[clamp(28px,4vw,44px)] tracking-tight mb-4" style={{animationDelay:"0.1s"}}><span className="gradient-text">Not another</span> <em className="text-accent-light not-italic">feedback tool.</em></h2>
          </div>
          <div className="reveal overflow-hidden rounded-2xl border border-border" style={{animationDelay:"0.2s"}}>
            <table className="w-full text-left text-sm">
              <thead><tr className="border-b border-border"><th className="p-4 text-txt-3 font-medium text-xs"/><th className="p-4 text-txt-3 font-medium text-xs">Spreadsheets & tools</th><th className="p-4 text-txt-3 font-medium text-xs">Enterprise platforms</th><th className="p-4 font-bold text-accent-light text-xs bg-accent/5">Gravii</th></tr></thead>
              <tbody>
                {[
                  {l:"Data entry",a:"Manual tagging",b:"Manual + integrations",c:"Zero input"},
                  {l:"Signal structure",a:"Flat lists",b:"Flat clustering",c:"Connected graph"},
                  {l:"Scoring",a:"Votes / RICE",b:"Revenue weighted",c:"5-dimension traction"},
                  {l:"Context decay",a:"Immediate",b:"Partial retention",c:"Signals compound forever"},
                  {l:"Cross-tool picture",a:"None",b:"Limited integrations",c:"All tools, one graph"},
                  {l:"Pricing",a:"Free / cheap",b:"$20K+/year starting",c:"From €99/mo"},
                  {l:"Time to value",a:"Weeks of setup",b:"Months + onboarding",c:"Paste one meeting"},
                ].map((r,i)=>(
                  <tr key={i} className="border-b border-border/50 last:border-b-0"><td className="p-4 text-txt-2 font-medium text-[13px]">{r.l}</td><td className="p-4 text-txt-3 text-[13px]">{r.a}</td><td className="p-4 text-txt-3 text-[13px]">{r.b}</td><td className="p-4 text-[13px] font-semibold text-accent-light bg-accent/5">{r.c}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="section-divider"/>

      {/* ═══ FEATURES ═══ */}
      <section className="py-24">
        <div className="max-w-[1160px] mx-auto px-6">
          <p className="reveal text-xs font-semibold text-accent-light uppercase tracking-[2px] mb-3">Features</p>
          <h2 className="reveal font-display text-[clamp(28px,4vw,40px)] tracking-tight mb-4" style={{animationDelay:"0.1s"}}><span className="gradient-text">Built for product-led teams</span><br/><em className="text-accent-light not-italic">that hate silos.</em></h2>
          <p className="reveal text-[15px] text-txt-2 max-w-[460px] mb-12" style={{animationDelay:"0.15s"}}>Every feature turns fragmented team inputs into actionable product intelligence.</p>
          <FeaturesBento />
        </div>
      </section>

      <div className="section-divider"/>

      {/* ═══ SECURITY ═══ */}
      <section className="py-24">
        <div className="max-w-[1160px] mx-auto px-6 text-center">
          <p className="reveal text-xs font-semibold text-accent-light uppercase tracking-[2px] mb-3">Security & Privacy</p>
          <h2 className="reveal font-display text-[clamp(28px,4vw,44px)] tracking-tight mb-14" style={{animationDelay:"0.1s"}}><span className="gradient-text">Built for teams that ask</span><br/><em className="text-accent-light not-italic">hard questions.</em></h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {icon:"icon-sec-eu.png",t:"EU Data Hosting",d:"Supabase in Frankfurt (eu-central-1). AES-256 at rest. TLS 1.2+ in transit. GDPR compliant by architecture."},
              {icon:"icon-sec-byok.png",t:"Bring Your Own Key",d:"Use your Anthropic API key. Your text goes directly to Anthropic under zero data retention. We never see it."},
              {icon:"icon-sec-rls.png",t:"Row-Level Security",d:"Every database query enforces organization-level isolation. No tenant can access another tenant's data."},
            ].map((s,i)=>(
              <div key={i} className="reveal p-6 rounded-2xl bg-bg-2 border border-border/50" style={{animationDelay:`${i*0.1}s`}}>
                <Icon src={s.icon} size={48} className="mx-auto mb-4"/><h3 className="text-sm font-bold mb-2">{s.t}</h3><p className="text-[12px] text-txt-2 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"/>

      {/* ═══ PRICING ═══ */}
      <section className="py-24" id="pricing">
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="text-center mb-14">
            <p className="reveal text-xs font-semibold text-accent-light uppercase tracking-[2px] mb-3">Pricing</p>
            <h2 className="reveal font-display text-[clamp(28px,4vw,44px)] tracking-tight mb-4" style={{animationDelay:"0.1s"}}><span className="gradient-text">Enterprise intelligence.</span><br/><em className="text-accent-light not-italic">Startup pricing.</em></h2>
            <p className="reveal text-[15px] text-txt-2 max-w-[400px] mx-auto" style={{animationDelay:"0.15s"}}>Unlimited users. Unlimited captures. No per-seat fees.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-[960px] mx-auto">
            {/* Starter — active */}
            <div className="reveal price-card-hover p-7 rounded-2xl border border-accent bg-gradient-to-b from-accent/8 to-bg-2 flex flex-col relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-[10px] font-bold px-3.5 py-1 rounded-full">Available now</span>
              <h3 className="text-sm font-semibold text-accent-light mb-4">Starter</h3>
              <div className="mb-1"><span className="text-4xl font-extrabold tracking-tight">€99</span><span className="text-sm text-txt-3 ml-1">/mo</span></div>
              <p className="text-[11px] text-amber font-semibold mb-1">Launch price</p>
              <p className="text-[11px] text-txt-3 line-through mb-5">€199/mo after launch</p>
              <ul className="space-y-2.5 mb-8 flex-1">
                {["Unlimited users & captures","AI capture & entity extraction","Signal classification & dedup","Traction scoring (0-100)","Explorer & graph view","BYOK — your own AI key","EU hosting (Frankfurt)","Email support"].map(f=>(
                  <li key={f} className="flex items-start gap-2 text-[13px] text-txt-2"><span className="text-emerald text-xs mt-0.5">✓</span>{f}</li>
                ))}
              </ul>
              <a href="#demo" className="shimmer w-full py-3 rounded-xl bg-accent hover:bg-accent-light text-white text-center text-sm font-bold transition-all block">Get started</a>
            </div>
            {/* Pro — coming soon */}
            <div className="reveal price-card-hover p-7 rounded-2xl bg-bg-2 border border-border flex flex-col opacity-75" style={{animationDelay:"0.1s"}}>
              <h3 className="text-sm font-semibold text-txt-2 mb-4">Pro</h3>
              <div className="mb-1"><span className="text-2xl font-extrabold tracking-tight text-txt-2">Coming soon</span></div>
              <p className="text-[11px] text-txt-3 mb-5">Everything in Starter, plus:</p>
              <ul className="space-y-2.5 mb-8 flex-1">
                {["Roadmap & Gantt chart","AI scoring wizard","Custom node & signal types","Dependency tracking","Email forwarding capture","Slack \"Send to Gravii\"","Jira & Linear sync","Dedicated Slack channel"].map(f=>(
                  <li key={f} className="flex items-start gap-2 text-[13px] text-txt-3"><span className="text-txt-3 text-xs mt-0.5">◦</span>{f}</li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-xl bg-surface border border-border text-center text-sm font-semibold text-txt-3 cursor-default">Notify me</button>
            </div>
            {/* Enterprise — coming soon */}
            <div className="reveal price-card-hover p-7 rounded-2xl bg-bg-2 border border-border flex flex-col opacity-75" style={{animationDelay:"0.2s"}}>
              <h3 className="text-sm font-semibold text-txt-2 mb-4">Enterprise</h3>
              <div className="mb-1"><span className="text-2xl font-extrabold tracking-tight text-txt-2">Coming soon</span></div>
              <p className="text-[11px] text-txt-3 mb-5">Everything in Pro, plus:</p>
              <ul className="space-y-2.5 mb-8 flex-1">
                {["SSO / SAML","Audit logs","Sovereign mode","Custom dimensions","DPA & compliance","Dedicated onboarding","Priority support","Custom integrations"].map(f=>(
                  <li key={f} className="flex items-start gap-2 text-[13px] text-txt-3"><span className="text-txt-3 text-xs mt-0.5">◦</span>{f}</li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-xl bg-surface border border-border text-center text-sm font-semibold text-txt-3 cursor-default">Notify me</button>
            </div>
          </div>
          <p className="text-center text-[12px] text-txt-3 mt-6">14-day free trial at launch. No credit card required.</p>
        </div>
      </section>

      <div className="section-divider"/>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent pointer-events-none"/>
        <div className="max-w-[600px] mx-auto px-6 text-center relative z-10">
          <h2 className="reveal font-display text-[clamp(28px,5vw,48px)] tracking-tight mb-5"><span className="gradient-text">One graph.</span> <span className="gradient-text">Every team.</span><br/><em className="text-accent-light not-italic">Zero silos.</em></h2>
          <p className="reveal text-[15px] text-txt-2 mb-8 leading-relaxed" style={{animationDelay:"0.1s"}}>Your roadmap should reflect intelligence from every team, every customer interaction, every competitive signal.</p>
          {!ctaSubmitted ? (
            <div className="reveal flex gap-2 max-w-[420px] mx-auto" style={{animationDelay:"0.2s"}}>
              <input type="email" value={ctaEmail} onChange={(e)=>setCtaEmail(e.target.value)} placeholder="you@company.com" className="flex-1 h-12 px-4 rounded-xl border border-border bg-surface text-txt text-sm outline-none focus:border-accent transition-colors"/>
              <button onClick={()=>submitEmail(ctaEmail,"cta")} className="h-12 px-6 rounded-xl bg-accent text-white text-sm font-bold hover:bg-accent-light transition-all cursor-pointer border-none hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(99,102,241,0.4)]">Get early access</button>
            </div>
          ) : <p className="text-emerald text-sm font-semibold">You&rsquo;re on the list. We&rsquo;ll reach out soon.</p>}
          <p className="text-[11px] text-txt-3 mt-4">Launching soon · Full features · Unlimited users</p>
        </div>
      </section>

      <footer className="py-8 border-t border-border/40">
        <div className="max-w-[1160px] mx-auto px-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2"><div className="w-5 h-5 rounded bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center"><span className="text-white text-[10px] font-bold">G</span></div><span className="text-xs font-semibold text-txt-2">Gravii</span><span className="text-[10px] text-txt-3 ml-2">Product intelligence for B2B teams</span></div>
          <span className="text-[10px] text-txt-3">EU hosted · GDPR compliant · © {new Date().getFullYear()}</span>
        </div>
      </footer>
    </>
  );
}
