"use client";

// Gravii - core home sections + capture surfaces (Concept A · Plainspoken).
// Ported from gravii-sections-core.jsx and gravii-surfaces.jsx, specialized to
// the chosen direction. Block flow (not flex) so wrapped headlines reserve full
// height; centering via text-align + auto margins.

import { type CSSProperties, type RefObject } from "react";
import { SourceChip, Reveal, useInView, useSlowCycle, useReveal } from "./primitives";
import { Icon } from "./icons";
import { SlackThreadMockup } from "./SlackThread";
import { PILOT_HREF } from "./constants";

const ctr: CSSProperties = { marginLeft: "auto", marginRight: "auto" };

function splitLines(s: string) {
  return s.split("\n").map((l, i, arr) => (
    <span key={i}>{l}{i < arr.length - 1 && <br />}</span>
  ));
}

// ---- Answer: one grounded or abstaining response (calm card) ----
function Answer({ q, a, source, mode = "grounded" }: {
  q: string; a: string; source?: { name: string; date: string }; mode?: "grounded" | "abstain";
}) {
  const grounded = mode === "grounded";
  return (
    <div className="gv-card" style={{ maxWidth: 640, ...ctr, padding: "var(--s6) var(--s7)", textAlign: "left" }}>
      <div className="gv-ask-label" style={{ marginBottom: "var(--s4)" }}>You ask</div>
      <div style={{ fontSize: 21, fontWeight: 600, letterSpacing: "-0.015em", lineHeight: 1.35, color: "var(--ink)" }}>{q}</div>
      <p style={{ fontSize: 16.5, lineHeight: "var(--lh-relaxed)", color: grounded ? "var(--ink)" : "var(--muted)", margin: "var(--s4) 0 0", fontStyle: grounded ? "normal" : "italic" }}>{a}</p>
      <div style={{ marginTop: "var(--s5)", paddingTop: "var(--s4)", borderTop: "1px solid var(--line)" }}>
        {grounded && source ? (
          <div style={{ display: "flex", alignItems: "center", gap: "var(--s3)", flexWrap: "wrap" }}>
            <span className="gv-grounded-label">Grounded in</span>
            <SourceChip name={source.name} date={source.date} />
          </div>
        ) : (
          <div className="gv-abstain"><span className="ring" />No evidence on file</div>
        )}
      </div>
    </div>
  );
}

function StepHead({ n, kicker, title, lead }: { n: string; kicker: string; title: string; lead?: string }) {
  return (
    <div style={{ maxWidth: 720, ...ctr, textAlign: "center" }}>
      <div className="gv-mono" style={{ fontSize: 12.5, color: "var(--accent)", letterSpacing: "0.08em", marginBottom: "var(--s4)" }}>{n} / {kicker}</div>
      <h2 className="gv-h2" style={{ maxWidth: 720, textWrap: "balance" }}>{title}</h2>
      {lead && <p className="gv-lead" style={{ margin: "var(--s4) 0 0", maxWidth: 560, ...ctr }}>{lead}</p>}
    </div>
  );
}

// ---- HERO (the animated Slack interaction is the centerpiece) ----
function Hero() {
  return (
    <section className="gv-section" style={{ paddingTop: "calc(var(--sec-y) * 0.85)", paddingBottom: "var(--sec-y)" }}>
      <div className="gv-wrap" style={{ textAlign: "center" }}>
        <Reveal delay={60} as="h1" className="gv-h1" style={{ maxWidth: 820, textWrap: "balance", ...ctr }}>Answers, with receipts.</Reveal>
        <Reveal delay={130} as="p" className="gv-lead" style={{ marginTop: "var(--s5)", maxWidth: 580, ...ctr }}>
          Ask your company&apos;s knowledge in plain language, right in Slack. Every answer is grounded in the evidence behind it.
        </Reveal>
        <Reveal delay={200} style={{ marginTop: "var(--s6)" }}><a className="gv-cta" href={PILOT_HREF}>Request a pilot</a></Reveal>
        <Reveal delay={300} style={{ marginTop: "var(--s8)" }}>
          <SlackThreadMockup />
        </Reveal>
      </div>
    </section>
  );
}

// ---- PAIN beat ----
function PainBeat() {
  return (
    <section className="gv-section tinted">
      <div className="gv-wrap" style={{ textAlign: "center" }}>
        <Reveal as="h2" className="gv-h2" style={{ maxWidth: 760, textWrap: "balance", ...ctr }}>The answer is in a ChatGPT tab right now.</Reveal>
        <Reveal delay={120} as="p" className="gv-lead" style={{ marginTop: "var(--s5)", maxWidth: 580, ...ctr }}>
          Your team is pasting confidential data into a chatbot to get it. Under your compliance regime, that is a breach. Gravii is the sanctioned alternative.
        </Reveal>
        <Reveal delay={220} style={{ marginTop: "var(--s8)" }}>
          <div style={{ maxWidth: 560, ...ctr, border: "1px dashed var(--line)", borderRadius: "var(--r-panel)", padding: "var(--s5) var(--s6)", background: "var(--surface)", textAlign: "left" }}>
            <div style={{ fontSize: 14, color: "var(--faint)", marginBottom: "var(--s3)" }}>Pasted into a public chatbot</div>
            <div style={{ fontSize: 16, color: "var(--muted)", lineHeight: "var(--lh-relaxed)" }}>&quot;Here are Meridian&apos;s financials and the draft terms, summarise the risk...&quot;</div>
            <div style={{ marginTop: "var(--s4)", display: "inline-flex", alignItems: "center", gap: "var(--s2)", color: "var(--accent)", fontSize: "var(--fs-small)", fontWeight: 600 }}>
              {Icon.lock({ style: { transform: "translateY(1px)" } })} Leaves your perimeter
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---- ABSTAIN beat ----
function AbstainBeat() {
  return (
    <section className="gv-section">
      <div className="gv-wrap" style={{ textAlign: "center" }}>
        <Reveal as="h2" className="gv-h2" style={{ maxWidth: 820, textWrap: "balance", ...ctr }}>{splitLines("When it has nothing,\nit says so.")}</Reveal>
        <Reveal delay={120} as="p" className="gv-lead" style={{ marginTop: "var(--s5)", maxWidth: 540, ...ctr }}>
          No guessing, no filler. Gravii answers only from your evidence, and tells you plainly when there is none.
        </Reveal>
        <Reveal delay={220} style={{ marginTop: "var(--s8)" }}>
          <Answer mode="abstain"
            q="Any view on SOC 2 readiness for healthcare clients?"
            a="I don't have anything on that. Nothing in your evidence covers it." />
        </Reveal>
      </div>
    </section>
  );
}

// ---- TRUST close ----
function TrustClose() {
  const facts: [string, string][] = [
    ["Your own revocable key", "Per-tenant database, customer-held KMS key, EU region."],
    ["Bring your own model key", "Fail-closed: no Gravii key ever runs on your real data."],
    ["Zero-retention posture", "NDA and DPA on request. Deletion and export guaranteed."],
  ];
  return (
    <section className="gv-section tinted">
      <div className="gv-wrap" style={{ textAlign: "center" }}>
        <Reveal><div className="gv-eyebrow" style={{ marginBottom: "var(--s5)" }}><span className="rule" />why you&apos;re allowed to use it</div></Reveal>
        <Reveal delay={80} as="h2" className="gv-h2" style={{ maxWidth: 760, textWrap: "balance", ...ctr }}>Sanctioned, because it&apos;s sovereign.</Reveal>
        <Reveal delay={160} as="p" className="gv-lead" style={{ marginTop: "var(--s5)", maxWidth: 560, ...ctr }}>
          Sovereignty is not the headline. It is the reason your compliance team signs off.
        </Reveal>
        <Reveal delay={240} style={{ marginTop: "var(--s7)", maxWidth: 760, ...ctr }}>
          <div style={{ borderTop: "1px solid var(--line)" }}>
            {facts.map(([t, d]) => (
              <div key={t} style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "var(--s5)", padding: "var(--s5) 0", borderBottom: "1px solid var(--line)", textAlign: "left" }}>
                <div style={{ fontWeight: 600, color: "var(--ink)", fontSize: 16 }}>{t}</div>
                <div style={{ color: "var(--muted)", fontSize: 15.5, lineHeight: "var(--lh-normal)" }}>{d}</div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={300} style={{ marginTop: "var(--s6)" }}>
          <a href="/security" style={{ display: "inline-flex", alignItems: "center", gap: "var(--s2)", color: "var(--accent)", fontWeight: 600, fontSize: 15 }}>
            How your data is protected {Icon.arrow({})}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

// ---- final CTA ----
function FinalCTA() {
  return (
    <section className="gv-section" style={{ textAlign: "center" }}>
      <div className="gv-wrap">
        <Reveal as="h2" className="gv-h2" style={{ maxWidth: 720, textWrap: "balance", ...ctr }}>Put your company&apos;s knowledge to work.</Reveal>
        <Reveal delay={120} as="p" className="gv-lead" style={{ marginTop: "var(--s5)", maxWidth: 500, ...ctr }}>
          A done-with-you pilot. No self-serve signup, no pricing games.
        </Reveal>
        <Reveal delay={200} style={{ marginTop: "var(--s6)" }}><a className="gv-cta" href={PILOT_HREF}>Request a pilot {Icon.arrow({})}</a></Reveal>
      </div>
    </section>
  );
}

// ============================ capture surfaces ============================

function Av({ t, tone = "muted" }: { t: string; tone?: "muted" | "accent" }) {
  return (
    <span style={{ width: 26, height: 26, borderRadius: 26, flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center",
      fontSize: 11, fontWeight: 600, color: tone === "accent" ? "var(--accent-ink)" : "var(--muted)",
      background: tone === "accent" ? "var(--accent)" : "var(--accent-soft)", border: "1px solid var(--line)" }}>{t}</span>
  );
}

function ChannelTab({ name, active, captured }: { name: string; active: boolean; captured: boolean }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "var(--s2)", padding: "7px 12px", borderRadius: 8,
      color: active ? "var(--ink)" : "var(--faint)", fontWeight: active ? 600 : 500, fontSize: 13.5,
      background: active ? "var(--accent-soft)" : "transparent", border: `1px solid ${active ? "var(--line)" : "transparent"}`, opacity: captured ? 1 : 0.5 }}>
      {Icon.hash({ style: { opacity: 0.7 } })}{name}
      <span style={{ width: 13, height: 13, borderRadius: 13, border: `1.5px solid ${captured ? "var(--accent)" : "var(--faint)"}`, display: "inline-flex", alignItems: "center", justifyContent: "center", background: captured ? "var(--accent)" : "transparent", color: "var(--accent-ink)", marginLeft: 2 }}>
        {captured && Icon.check({ width: 8, height: 8 })}
      </span>
    </div>
  );
}

const SLACK_SCN = [
  { ch: "#deal-room", who: "PA", name: "Priya", msg: "Agreed Meridian liability cap at 12 months of fees, confidentiality uncapped.",
    knowledge: "Meridian: 12-month liability cap, confidentiality uncapped.", date: "#deal-room · Mar 14" },
  { ch: "#customer-calls", who: "JR", name: "Jordan", msg: "Northwind wants SOC 2 confirmed before signing. Legal to scope.",
    knowledge: "Northwind requires SOC 2 confirmation pre-signature.", date: "#customer-calls · Apr 2" },
  { ch: "#compliance", who: "SA", name: "Sam", msg: "DPA template v2 approved for EU customers.",
    knowledge: "DPA template v2 approved for EU customers.", date: "#compliance · Apr 9" },
];

function SlackCapture() {
  const [ref, inView] = useInView({ threshold: 0.35 });
  const [step] = useSlowCycle(SLACK_SCN.length, 4200, inView);
  const s = SLACK_SCN[step];
  const kept = useReveal(900, step);
  const resolved = useReveal(1150, step);
  const channels = ["#deal-room", "#customer-calls", "#compliance", "#watercooler"];

  return (
    <section className="gv-section">
      <div className="gv-wrap">
        <StepHead n="01" kicker="Capture · Slack"
          title="From across your conversations." lead="You choose the channels. Gravii keeps only what matters, and you confirm it. Nothing is vacuumed up." />
        <div ref={ref as RefObject<HTMLDivElement>} className="gv-panel" style={{ maxWidth: 880, margin: "var(--s8) auto 0" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--s2)", padding: "var(--s4) var(--s5)", borderBottom: "1px solid var(--line)", alignItems: "center" }}>
            {Icon.lock({ style: { color: "var(--faint)", marginRight: 4 } })}
            {channels.map((c) => <ChannelTab key={c} name={c.slice(1)} active={c === s.ch} captured={c !== "#watercooler"} />)}
            <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--faint)" }} className="gv-mono">3 of 4 selected</span>
          </div>
          <div style={{ padding: "var(--s5) var(--s6)" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--s3)" }} className="msg sel">
              <div style={{ padding: 6, display: "flex", gap: "var(--s3)", alignItems: "flex-start" }}>
                <Av t={s.who} tone="accent" />
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "var(--s2)" }}>
                    <span style={{ fontWeight: 600, fontSize: 14, color: "var(--ink)" }}>{s.name}</span>
                    <span className="gv-mono" style={{ fontSize: 11, color: "var(--faint)" }}>9:24</span>
                  </div>
                  <div style={{ fontSize: 15, color: "var(--ink)", lineHeight: "var(--lh-normal)", marginTop: 2, maxWidth: 560 }}>{s.msg}</div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--s2)", marginTop: "var(--s4)", marginLeft: 44 }}>
              <span className={`confirm-tick ${kept ? "show" : ""}`} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--accent)", fontWeight: 600, background: "var(--accent-soft)", border: "1px solid var(--line)", borderRadius: 99, padding: "3px 9px" }}>
                {Icon.check({})} Kept
              </span>
              <span style={{ fontSize: 12.5, color: "var(--faint)", opacity: 0.7 }}>other messages left untouched</span>
            </div>
          </div>
          <div style={{ borderTop: "1px solid var(--line)", background: "var(--wash)", padding: "var(--s5) var(--s6) var(--s6)" }}>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "-30px", marginBottom: "var(--s4)" }}>
              <span style={{ width: 1, height: 26, background: "var(--accent)", opacity: 0.5 }} />
            </div>
            <div className="gv-mono" style={{ fontSize: 11.5, color: "var(--faint)", letterSpacing: "0.06em", marginBottom: "var(--s3)", textTransform: "uppercase" }}>Resolved into your company brain</div>
            <div key={step} className={`k-line ${resolved ? "show" : ""}`} style={{ display: "flex", alignItems: "center", gap: "var(--s3)", flexWrap: "wrap" }}>
              <span style={{ color: "var(--accent)", display: "inline-flex" }}>{Icon.spark({})}</span>
              <span style={{ fontSize: 15.5, color: "var(--ink)", fontWeight: 500 }}>{s.knowledge}</span>
              <span className="gv-chip" style={{ marginLeft: "auto" }}><span className="src-dot" /><span className="gv-mono" style={{ fontSize: 12 }}>{s.date}</span></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EmailCapture() {
  const [ref, inView] = useInView({ threshold: 0.35 });
  const kept = useReveal(950, inView ? "go" : "wait");
  const resolved = useReveal(1250, inView ? "go" : "wait");
  const inbox = [
    { from: "Counsel · Meridian", subj: "Re: Engagement terms - final", time: "Mar 18", sel: true },
    { from: "Stripe", subj: "Your monthly receipt", time: "Mar 18", sel: false },
    { from: "Northwind Ops", subj: "Security questionnaire attached", time: "Mar 17", sel: false },
    { from: "Team newsletter", subj: "This week at the firm", time: "Mar 17", sel: false },
  ];
  return (
    <section className="gv-section tinted">
      <div className="gv-wrap">
        <StepHead n="02" kicker="Capture · Email"
          title="And from the inbox, selectively." lead="One relevant email becomes cited knowledge. The receipts and the newsletters stay where they are." />
        <div ref={ref as RefObject<HTMLDivElement>} className="gv-panel" style={{ maxWidth: 880, margin: "var(--s8) auto 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--s2)", padding: "var(--s4) var(--s5)", borderBottom: "1px solid var(--line)", color: "var(--faint)", fontSize: 13 }}>
            {Icon.mail({})}<span style={{ color: "var(--muted)", fontWeight: 500 }}>Inbox</span>
            <span className="gv-mono" style={{ marginLeft: "auto", fontSize: 12 }}>1 selected</span>
          </div>
          <div style={{ padding: "var(--s3) var(--s4)" }}>
            {inbox.map((m, i) => (
              <div key={i} className={`msg ${m.sel ? "sel" : "dim-when-captured captured"}`} style={{ display: "flex", alignItems: "center", gap: "var(--s4)", padding: "11px 12px" }}>
                <span style={{ width: 14, height: 14, borderRadius: 4, border: `1.5px solid ${m.sel ? "var(--accent)" : "var(--faint)"}`, background: m.sel ? "var(--accent)" : "transparent", color: "var(--accent-ink)", display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>{m.sel && Icon.check({ width: 9, height: 9 })}</span>
                <span style={{ width: 150, flex: "0 0 auto", fontSize: 14, fontWeight: m.sel ? 600 : 500, color: m.sel ? "var(--ink)" : "var(--muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.from}</span>
                <span style={{ flex: 1, fontSize: 14, color: m.sel ? "var(--ink)" : "var(--faint)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.subj}</span>
                <span className="gv-mono" style={{ fontSize: 11.5, color: "var(--faint)" }}>{m.time}</span>
                {m.sel && <span className={`confirm-tick ${kept ? "show" : ""}`} style={{ fontSize: 11.5, color: "var(--accent)", fontWeight: 600 }}>Kept</span>}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid var(--line)", background: "var(--wash)", padding: "var(--s5) var(--s6) var(--s6)" }}>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "-30px", marginBottom: "var(--s4)" }}>
              <span style={{ width: 1, height: 26, background: "var(--accent)", opacity: 0.5 }} />
            </div>
            <div className="gv-mono" style={{ fontSize: 11.5, color: "var(--faint)", letterSpacing: "0.06em", marginBottom: "var(--s3)", textTransform: "uppercase" }}>Resolved into your company brain</div>
            <div className={`k-line ${resolved ? "show" : ""}`} style={{ display: "flex", alignItems: "center", gap: "var(--s3)", flexWrap: "wrap" }}>
              <span style={{ color: "var(--accent)", display: "inline-flex" }}>{Icon.spark({})}</span>
              <span style={{ fontSize: 15.5, color: "var(--ink)", fontWeight: 500 }}>Meridian: 12-month liability cap, confidentiality uncapped.</span>
              <span className="gv-chip" style={{ marginLeft: "auto" }}><span className="src-dot" /><span className="gv-mono" style={{ fontSize: 12 }}>Email · Mar 18</span></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Home() {
  return (
    <>
      <Hero />
      <PainBeat />
      <SlackCapture />
      <EmailCapture />
      <AbstainBeat />
      <TrustClose />
      <FinalCTA />
    </>
  );
}
