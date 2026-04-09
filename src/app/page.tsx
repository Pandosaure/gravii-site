"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

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
  const [demoState, setDemoState] = useState<"input"|"loading"|"result">("input");
  const [demoResult, setDemoResult] = useState<any>(null);
  const [demoError, setDemoError] = useState("");
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
    } catch (err: any) { setDemoError(err.message || "Failed. Try again."); setDemoState("input"); }
  };

  const submitEmail = (addr: string) => {
    console.log("Early access email:", addr);
    setCtaSubmitted(true);
  };

  return (
    <>
      {/* ═══ NAV ═══ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 py-4 nav-glass ${navScrolled ? "scrolled" : ""}`}>
        <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center">
              <span className="text-white text-sm font-bold">G</span>
            </div>
            <span className="text-lg font-extrabold tracking-tight">Gravii</span>
          </a>
          <div className="flex items-center gap-8">
            <a href="#demo" className="hidden sm:block text-sm text-[#9698b0] font-medium hover:text-white transition-colors">Try it</a>
            <a href="#product" className="hidden sm:block text-sm text-[#9698b0] font-medium hover:text-white transition-colors">Product</a>
            <a href="#pricing" className="hidden sm:block text-sm text-[#9698b0] font-medium hover:text-white transition-colors">Pricing</a>
            <a href="https://app.gravii.app/login" className="px-5 py-2.5 bg-[#6366f1] hover:bg-[#818cf8] text-white text-sm font-semibold rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(99,102,241,0.4)]">Sign in</a>
          </div>
        </div>
      </nav>

      {/* ═══ SECTION 1: HERO ═══ */}
      <section className="relative pt-36 pb-16 overflow-hidden">
        <div className="hero-glow" /><div className="hero-glow-secondary" />
        <div className="max-w-[1100px] mx-auto px-6 text-center relative z-10">
          <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12131a] border border-[#252640] text-xs text-[#9698b0] font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            For product teams at B2B SaaS companies
          </div>
          <h1 className="reveal font-display text-[clamp(40px,6.5vw,72px)] leading-[0.95] tracking-tight mb-6" style={{ animationDelay: "0.1s" }}>
            <span className="gradient-text">Your meetings already</span><br />
            <span className="gradient-text">have the </span><em className="text-[#818cf8] not-italic">answers.</em>
          </h1>
          <p className="reveal text-[17px] text-[#9698b0] max-w-[520px] mx-auto mb-10 leading-relaxed" style={{ animationDelay: "0.2s" }}>
            Paste any transcript. Gravii extracts the entities, signals, and decisions your team keeps forgetting. Every conversation compounds into a scored intelligence graph.
          </p>
          <div className="reveal flex gap-3 justify-center flex-wrap" style={{ animationDelay: "0.3s" }}>
            <a href="#demo" className="shimmer px-7 py-3.5 bg-[#6366f1] hover:bg-[#818cf8] text-white text-[15px] font-bold rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(99,102,241,0.4)]">
              Try it now — paste any meeting
            </a>
            <a href="https://app.gravii.app/signup" className="px-7 py-3.5 bg-[#12131a] hover:bg-[#1a1b25] text-white border border-[#252640] hover:border-[#3a3b50] text-[15px] font-semibold rounded-xl transition-all">
              Start free
            </a>
          </div>
          <p className="reveal text-xs text-[#4a4b60] mt-5" style={{ animationDelay: "0.4s" }}>14-day free trial · No credit card · EU hosted</p>
        </div>
      </section>

      {/* Trust bar */}
      <section className="py-5 border-y border-[#252640]/40">
        <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-center gap-8 sm:gap-12 flex-wrap">
          {[
            { icon: "icon-sec-eu.png", label: "EU hosted (Frankfurt)" },
            { icon: "icon-sec-byok.png", label: "Your AI key, zero retention" },
            { icon: "icon-sec-rls.png", label: "Row-level security" },
          ].map((b) => (
            <div key={b.label} className="flex items-center gap-2.5 text-[#4a4b60] text-xs font-medium">
              <Image src={`/images/${b.icon}`} alt="" width={18} height={18} />{b.label}
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SECTION 2: LIVE DEMO ═══ */}
      <section className="py-20" id="demo">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="reveal text-[clamp(26px,4vw,40px)] font-bold tracking-tight mb-3">
              <span className="gradient-text">Paste anything.</span> <em className="text-[#818cf8] not-italic">See the intelligence.</em>
            </h2>
            <p className="reveal text-[15px] text-[#9698b0] max-w-[440px] mx-auto" style={{ animationDelay: "0.1s" }}>
              Meeting transcript, customer call, strategy doc — watch Gravii extract what matters in seconds.
            </p>
          </div>
          <div className="max-w-[780px] mx-auto">
            {demoState === "input" && (
              <div className="reveal">
                <textarea value={demoText} onChange={(e) => setDemoText(e.target.value)}
                  placeholder={"Paste your meeting transcript or notes here...\n\nOr try one of the samples below."}
                  className="w-full min-h-[170px] p-4 rounded-2xl border border-[#252640] bg-[#0d0e15] text-[#eaebf2] text-sm leading-relaxed resize-y outline-none transition-all" />
                <div className="flex gap-2 mt-3 flex-wrap">
                  <span className="text-[11px] text-[#4a4b60] pt-1">Try a sample:</span>
                  {SAMPLES.map((s, i) => (
                    <button key={i} onClick={() => loadSample(i)} className="px-3 py-1 rounded-lg border border-[#252640] bg-[#12131a] text-[#9698b0] text-[11px] font-medium hover:border-[#6366f1] hover:text-[#818cf8] transition-all cursor-pointer">{s.label}</button>
                  ))}
                </div>
                {demoError && <p className="text-red-400 text-xs mt-2">{demoError}</p>}
                <button onClick={analyzeText} className="shimmer w-full mt-4 h-12 rounded-xl bg-[#6366f1] hover:bg-[#818cf8] text-white text-[15px] font-bold border-none cursor-pointer transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2">Analyze</button>
                <p className="text-[11px] text-[#4a4b60] mt-2 text-center">Your text is processed in memory and immediately discarded.</p>
              </div>
            )}
            {demoState === "loading" && (
              <div className="window-chrome">
                <div className="window-bar"><span className="window-dot bg-red-500/60"/><span className="window-dot bg-amber-500/60"/><span className="window-dot bg-emerald-500/60"/><span className="ml-3 text-[11px] text-[#4a4b60] font-mono">analyzing...</span></div>
                <div className="p-12 flex flex-col items-center gap-4">
                  <div className="w-8 h-8 border-2 border-[#6366f1]/30 border-t-[#6366f1] rounded-full animate-spin"/>
                  <p className="text-sm text-[#9698b0]">Extracting intelligence...</p>
                  <div className="flex gap-3 mt-2">{["Entities","Signals","Decisions","Traction"].map((s,i)=>(<span key={s} className="text-[10px] font-mono text-[#4a4b60] px-2 py-0.5 rounded bg-[#12131a] animate-pulse" style={{animationDelay:`${i*0.3}s`}}>{s}</span>))}</div>
                </div>
              </div>
            )}
            {demoState === "result" && demoResult && (
              <div className="window-chrome">
                <div className="window-bar"><span className="window-dot bg-red-500/60"/><span className="window-dot bg-amber-500/60"/><span className="window-dot bg-emerald-500/60"/><span className="ml-3 text-[11px] text-[#4a4b60]">Gravii Intelligence Snapshot</span></div>
                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
                    <div><span className="text-[10px] font-mono text-[#4a4b60] uppercase tracking-wider">{demoResult.content_type_label}</span><h3 className="text-lg font-bold mt-1">{demoResult.title}</h3></div>
                    {demoResult.urgency && <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${demoResult.urgency==="high"?"bg-red-500/15 text-red-400":demoResult.urgency==="medium"?"bg-amber-500/15 text-amber-400":"bg-[#4a4b60]/15 text-[#4a4b60]"}`}>{demoResult.urgency} · {demoResult.urgency_reason}</span>}
                  </div>
                  {demoResult.headline && <div className="px-4 py-3 rounded-xl bg-[#6366f1]/8 border border-[#6366f1]/15 mb-6"><p className="text-sm font-semibold text-[#818cf8]">{demoResult.headline}</p></div>}
                  {demoResult.columns && <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">{demoResult.columns.map((col:any,ci:number)=>(<div key={ci}><div className="flex items-center gap-2 mb-3"><div className="w-2 h-2 rounded-full" style={{background:col.color}}/><span className="text-xs font-semibold text-[#9698b0]">{col.label}</span></div><div className="space-y-2">{col.items?.map((item:any,ii:number)=>(<div key={ii} className="px-3 py-2.5 rounded-lg bg-[#12131a] border border-[#252640]/50"><p className="text-[13px] font-medium">{item.text}</p>{item.detail&&<p className="text-[11px] text-[#4a4b60] mt-0.5">{item.detail}</p>}{item.amount&&<span className="text-[10px] font-mono font-bold text-amber-400 mt-1 inline-block">{item.amount}</span>}</div>))}</div></div>))}</div>}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {demoResult.decisions?.length>0&&<div><p className="text-xs font-semibold text-[#9698b0] mb-2">⚖ Decisions Made</p>{demoResult.decisions.map((d:any,i:number)=>(<div key={i} className="px-3 py-2 rounded-lg bg-[#6366f1]/6 border border-[#6366f1]/10 mb-1.5"><p className="text-[13px] font-medium">{d.text}</p>{d.owner&&<p className="text-[10px] text-[#4a4b60] mt-0.5">→ {d.owner}</p>}</div>))}</div>}
                    {demoResult.next_moves?.length>0&&<div><p className="text-xs font-semibold text-[#9698b0] mb-2">➜ Next Moves</p>{demoResult.next_moves.map((m:string,i:number)=>(<div key={i} className="px-3 py-2 rounded-lg bg-[#12131a] border border-[#252640]/50 mb-1.5"><p className="text-[13px] text-[#9698b0]">{m}</p></div>))}</div>}
                  </div>
                  {demoResult.blind_spots?.length>0&&<div className="mb-6"><p className="text-xs font-semibold text-[#9698b0] mb-2">⚠ Blind Spots</p>{demoResult.blind_spots.map((b:string,i:number)=>(<div key={i} className="px-3 py-2 rounded-lg bg-amber-500/6 border border-amber-500/10 mb-1.5"><p className="text-[13px] text-[#9698b0]">{b}</p></div>))}</div>}
                  {demoResult.traction?.length>0&&<div><p className="text-xs font-semibold text-[#9698b0] mb-2">◎ Traction Signals</p><div className="space-y-2">{demoResult.traction.map((t:any,i:number)=>(<div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#12131a] border border-[#252640]/50"><div className="w-10 h-10 rounded-lg bg-[#6366f1]/10 flex items-center justify-center text-[#818cf8] text-sm font-bold font-mono flex-shrink-0">{t.score}</div><div className="flex-1 min-w-0"><p className="text-[13px] font-semibold">{t.entity}</p><p className="text-[10px] text-[#4a4b60]">{t.reason}</p></div><div className="w-20 h-1.5 rounded-full bg-[#1a1b25] overflow-hidden flex-shrink-0"><div className="h-full rounded-full bg-[#6366f1] traction-bar-fill visible" style={{width:`${t.score}%`}}/></div></div>))}</div><p className="text-[10px] text-[#4a4b60] mt-3 text-center italic">One conversation. Imagine what 50 would reveal.</p></div>}
                </div>
                <div className="px-6 sm:px-8 pb-6 flex gap-3 flex-wrap">
                  <button onClick={()=>{setDemoText("");setDemoState("input");setDemoResult(null);}} className="px-4 py-2 rounded-lg bg-[#12131a] border border-[#252640] text-[#9698b0] text-xs font-medium hover:border-[#3a3b50] transition-all cursor-pointer">Analyze another</button>
                  <a href="https://app.gravii.app/signup" className="px-4 py-2 rounded-lg bg-[#6366f1] text-white text-xs font-semibold hover:bg-[#818cf8] transition-all">Start building your graph →</a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ SECTION 3: THE PRODUCT ═══ */}
      <section className="py-20" id="product">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-14">
            <p className="reveal text-xs font-semibold text-[#818cf8] uppercase tracking-[2px] mb-3">The Product</p>
            <h2 className="reveal text-[clamp(26px,4vw,40px)] font-bold tracking-tight mb-4" style={{ animationDelay: "0.1s" }}>
              <span className="gradient-text">AI extracts. The graph </span><em className="text-[#818cf8] not-italic">remembers.</em>
            </h2>
            <p className="reveal text-[15px] text-[#9698b0] max-w-[480px] mx-auto" style={{ animationDelay: "0.15s" }}>
              Every capture feeds entities and signals into a connected graph. Traction scores update automatically. Decisions trace back to evidence.
            </p>
          </div>

          {/* Screenshot cards — 2x2 grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                title: "AI Capture",
                desc: "Paste any text. The AI identifies who's involved, what's discussed, and what was decided — with evidence and signal strength.",
                screenshot: "screenshot-capture.png",
                fallbackAlt: "Gravii capture results showing extracted entities and signals",
              },
              {
                title: "Intelligence Dashboard",
                desc: "Traction scores, hot accounts, signal feed, and graph health — all in one configurable view.",
                screenshot: "screenshot-dashboard.png",
                fallbackAlt: "Gravii dashboard with traction scores and signal feed",
              },
              {
                title: "Connected Graph",
                desc: "Every entity is connected. When sales mentions a client and engineering flags a dependency on the same feature, Gravii links them.",
                screenshot: "screenshot-graph.png",
                fallbackAlt: "Gravii intelligence graph showing connected entities",
              },
              {
                title: "Evidence-Based Roadmap",
                desc: "Traction scores on every bar. Status colors. Dependency arrows. Click any item to see every signal behind the ranking.",
                screenshot: "screenshot-roadmap.png",
                fallbackAlt: "Gravii roadmap with traction scores on Gantt bars",
              },
            ].map((card, i) => (
              <div key={i} className="reveal rounded-2xl border border-[#252640] bg-[#0d0e15] overflow-hidden" style={{ animationDelay: `${i * 0.1}s` }}>
                {/* Screenshot placeholder — replace src with actual screenshot */}
                <div className="aspect-[16/10] bg-[#12131a] flex items-center justify-center border-b border-[#252640] overflow-hidden">
                  {/* Once you have screenshots, uncomment the Image below and remove the placeholder div */}
                  {/* <Image src={`/images/${card.screenshot}`} alt={card.fallbackAlt} width={800} height={500} className="w-full h-full object-cover object-top" /> */}
                  <div className="text-center p-6">
                    <div className="w-12 h-12 rounded-xl bg-[#6366f1]/10 flex items-center justify-center mx-auto mb-3">
                      <span className="text-[#818cf8] text-lg">📷</span>
                    </div>
                    <p className="text-[11px] text-[#4a4b60] font-mono">{card.screenshot}</p>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-[15px] font-bold mb-1">{card.title}</h3>
                  <p className="text-[13px] text-[#9698b0] leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ SECTION 4: COMPOUNDING VALUE ═══ */}
      <section className="py-20">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="reveal text-[clamp(26px,4.5vw,44px)] font-bold tracking-tight mb-5">
              <span className="gradient-text">One meeting is a snapshot.</span><br />
              <em className="text-[#818cf8] not-italic">Fifty give you the truth.</em>
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                icon: "icon-callout-compound.png",
                title: "Signals compound, not duplicate",
                desc: "When DataFlow asks for API access in March, and again in May, and their CTO mentions it in a QBR — that's one signal getting stronger, not three separate entries. Gravii recognizes the pattern and strengthens the evidence.",
              },
              {
                icon: "icon-callout-evidence.png",
                title: "Every decision traces back to evidence",
                desc: "Why did we prioritize SSO over mobile? Because three €100K+ deals are blocked on it, flagged across four different customer calls. The reasoning is auditable, not a gut feel in a planning meeting.",
              },
              {
                icon: "icon-callout-configurable.png",
                title: "The decision stays human. The AI is auditable.",
                desc: "Gravii reinforces multi-dimensional context — demand, risk, strategic alignment, momentum, breadth. You define the weights. You confirm the signals. The AI proposes, you decide.",
              },
            ].map((item, i) => (
              <div key={i} className="reveal flex gap-5 items-start" style={{ animationDelay: `${i * 0.1}s` }}>
                <Image src={`/images/${item.icon}`} alt="" width={40} height={40} className="flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-[15px] font-bold mb-1.5">{item.title}</h3>
                  <p className="text-[14px] text-[#9698b0] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* How signals enter */}
          <div className="reveal mt-14 rounded-2xl border border-[#252640] bg-[#0d0e15] p-6" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-[14px] font-bold mb-4">How signals enter Gravii</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { step: "1", title: "Paste any text", desc: "Meeting transcripts, call notes, Slack threads, strategy docs, support summaries — anything." },
                { step: "2", title: "Forward emails", desc: "Set up auto-forwarding from Fireflies, Otter, or Gong. New transcripts process automatically." },
                { step: "3", title: "Review & confirm", desc: "The AI proposes entities and signals. You review, adjust, and confirm. Nothing enters the graph without your approval." },
              ].map((s) => (
                <div key={s.step} className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#6366f1]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[11px] font-bold text-[#818cf8]">{s.step}</span>
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold mb-0.5">{s.title}</p>
                    <p className="text-[12px] text-[#6b6c82] leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ SECTION 5: PRICING + CTA ═══ */}
      <section className="py-20" id="pricing">
        <div className="max-w-[600px] mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="reveal text-[clamp(26px,4vw,40px)] font-bold tracking-tight mb-3">
              <span className="gradient-text">Start free.</span> <em className="text-[#818cf8] not-italic">Stay informed.</em>
            </h2>
            <p className="reveal text-[15px] text-[#9698b0]" style={{ animationDelay: "0.1s" }}>
              Unlimited users. Unlimited captures. 14-day free trial.
            </p>
          </div>

          {/* Single pricing card */}
          <div className="reveal price-card-hover p-7 rounded-2xl border border-[#6366f1] bg-gradient-to-b from-[#6366f1]/8 to-[#0d0e15] mb-8" style={{ animationDelay: "0.15s" }}>
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="text-sm font-semibold text-[#818cf8] mb-1">Starter</h3>
                <div><span className="text-4xl font-extrabold tracking-tight">€99</span><span className="text-sm text-[#4a4b60] ml-1">/mo</span></div>
                <p className="text-[11px] text-amber-400 font-semibold mt-1">Launch price — will be €199</p>
              </div>
              <a href="https://app.gravii.app/signup" className="shimmer px-5 py-2.5 bg-[#6366f1] hover:bg-[#818cf8] text-white text-sm font-bold rounded-lg transition-all hover:-translate-y-0.5">Start free trial</a>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {[
                "Unlimited users & captures",
                "AI capture & entity extraction",
                "Signal classification & dedup",
                "Traction scoring (5 dimensions)",
                "Intelligence graph",
                "Roadmap with evidence",
                "BYOK — your own AI key",
                "EU hosting (Frankfurt)",
              ].map(f => (
                <div key={f} className="flex items-start gap-2 text-[12px] text-[#9698b0]">
                  <span className="text-emerald-400 text-xs mt-0.5">✓</span>{f}
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-[12px] text-[#4a4b60] mb-12">
            Enterprise plans with SSO, audit logs, and sovereign mode — coming soon.
          </p>

          {/* Final CTA */}
          <div className="text-center">
            <h3 className="reveal text-[20px] font-bold mb-3">
              <span className="gradient-text">Product memory for teams that</span> <em className="text-[#818cf8] not-italic">ship fast.</em>
            </h3>
            <p className="reveal text-[14px] text-[#6b6c82] mb-6" style={{ animationDelay: "0.1s" }}>
              The faster you build, the more important it becomes to know what matters.
            </p>
            {!ctaSubmitted ? (
              <div className="reveal flex gap-2 max-w-[400px] mx-auto" style={{ animationDelay: "0.2s" }}>
                <input type="email" value={ctaEmail} onChange={(e)=>setCtaEmail(e.target.value)} placeholder="you@company.com"
                  className="flex-1 h-12 px-4 rounded-xl border border-[#252640] bg-[#12131a] text-white text-sm outline-none focus:border-[#6366f1] transition-colors" />
                <button onClick={()=>submitEmail(ctaEmail)} className="h-12 px-6 rounded-xl bg-[#6366f1] text-white text-sm font-bold hover:bg-[#818cf8] transition-all cursor-pointer border-none hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(99,102,241,0.4)]">Get early access</button>
              </div>
            ) : <p className="text-emerald-400 text-sm font-semibold">You're on the list. We'll reach out soon.</p>}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-[#252640]/40">
        <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center"><span className="text-white text-[10px] font-bold">G</span></div>
            <span className="text-xs font-semibold text-[#6b6c82]">Gravii</span>
            <span className="text-[10px] text-[#4a4b60] ml-2">Product memory for B2B teams</span>
          </div>
          <span className="text-[10px] text-[#4a4b60]">EU hosted · GDPR compliant · © {new Date().getFullYear()}</span>
        </div>
      </footer>
    </>
  );
}
