"use client";

// Gravii - animated Slack interaction mockup (the hero centerpiece).
// A restrained, original Slack-flavoured frame (no Slack trademark/logo). The
// conversation builds one message at a time on JS timers, so it plays even if
// the CSS animation clock is throttled. Ported from gravii-slack.jsx.

import { useState, useEffect, type ReactNode, type RefObject } from "react";
import { SourceChip, useInView, prefersReduced } from "./primitives";
import { Icon } from "./icons";

// stage 0 context, 1 question, 2 thinking, 3 grounded reply,
// 4 second question, 5 thinking, 6 abstain reply, 7 hold -> loop
const SLK_DUR = [1600, 1300, 1400, 3000, 1300, 1400, 3200, 1500];

function SlkAvatar({ t, app }: { t?: string; app?: boolean }) {
  return (
    <span style={{ width: 34, height: 34, flex: "0 0 auto", borderRadius: app ? 8 : 9,
      display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700,
      background: app ? "var(--accent)" : "var(--accent-soft)", color: app ? "var(--accent-ink)" : "var(--muted)",
      border: app ? "none" : "1px solid var(--line)" }}>{app ? Icon.spark({ width: 17, height: 17 }) : t}</span>
  );
}

function MsgRow({ who, name, time, app, children, settle }: {
  who?: string; name: string; time: string; app?: boolean; children: ReactNode; settle?: boolean;
}) {
  return (
    <div className={`reply ${settle ? "show" : ""}`} style={{ display: "flex", gap: "var(--s3)", alignItems: "flex-start", padding: "10px 0" }}>
      <SlkAvatar t={who} app={app} />
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ lineHeight: 1.25, whiteSpace: "nowrap" }}>
          <span style={{ fontWeight: 700, fontSize: 14, color: "var(--ink)" }}>{name}</span>
          {app && <span className="gv-mono" style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: "0.04em", color: "var(--accent)", background: "var(--accent-soft)", border: "1px solid var(--line)", borderRadius: 3, padding: "1px 5px", marginLeft: 8 }}>APP</span>}
          <span className="gv-mono" style={{ fontSize: 11, color: "var(--faint)", marginLeft: 8 }}>{time}</span>
        </div>
        <div style={{ marginTop: 3 }}>{children}</div>
      </div>
    </div>
  );
}

function Mention({ children }: { children: ReactNode }) {
  return <span><span style={{ color: "var(--accent)", fontWeight: 600, background: "var(--accent-soft)", borderRadius: 4, padding: "0 4px" }}>@Gravii</span> {children}</span>;
}

function Typing() {
  return (
    <MsgRow name="Gravii" time="now" app settle>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--faint)", fontSize: 14 }}>
        <span style={{ display: "inline-flex", gap: 4 }}>
          {[0, 1, 2].map((i) => <span key={i} className="gv-live-dot" style={{ width: 6, height: 6, animationDelay: `${i * 0.25}s` }} />)}
        </span>
        is responding
      </div>
    </MsgRow>
  );
}

export function SlackThreadMockup() {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const [stage, setStage] = useState(0);
  useEffect(() => {
    if (!inView || prefersReduced()) return;
    if (stage >= SLK_DUR.length - 2) return; // play once and hold on the full thread (stage 6)
    const t = setTimeout(() => setStage((s) => s + 1), SLK_DUR[stage]);
    return () => clearTimeout(t);
  }, [stage, inView]);
  const st = (inView && !prefersReduced()) ? stage : 6; // frozen / reduced: show full thread

  const src1 = { name: "Meridian engagement letter, v3", date: "Mar 14" };
  const src2 = { name: "Call summary, Meridian GC", date: "Mar 18" };

  return (
    <div ref={ref as RefObject<HTMLDivElement>} className="gv-card" style={{ maxWidth: 900, marginLeft: "auto", marginRight: "auto", overflow: "hidden", textAlign: "left" }}>
      {/* window bar */}
      <div style={{ height: 40, display: "flex", alignItems: "center", gap: "var(--s3)", padding: "0 var(--s5)", borderBottom: "1px solid var(--line)" }}>
        <span style={{ display: "inline-flex", gap: 6 }}>
          {[0, 1, 2].map((i) => <span key={i} style={{ width: 9, height: 9, borderRadius: 9, background: "var(--line)" }} />)}
        </span>
        <span className="gv-mono" style={{ fontSize: 12, color: "var(--faint)", marginLeft: "var(--s2)" }}>Northgate Advisory</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "172px 1fr" }}>
        {/* rail */}
        <div className="gv-hide-narrow" style={{ borderRight: "1px solid var(--line)", background: "var(--wash)", padding: "var(--s4) var(--s3)" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", padding: "0 8px var(--s4)" }}>Northgate Advisory</div>
          <div className="gv-mono" style={{ fontSize: 10.5, color: "var(--faint)", letterSpacing: "0.06em", padding: "0 8px 6px", textTransform: "uppercase" }}>Channels</div>
          {([["deal-room", true], ["compliance", false], ["customer-calls", false]] as const).map(([c, active]) => (
            <div key={c} style={{ display: "flex", alignItems: "center", gap: 7, padding: "6px 8px", borderRadius: 7, fontSize: 13.5,
              color: active ? "var(--ink)" : "var(--muted)", fontWeight: active ? 600 : 500, background: active ? "var(--accent-soft)" : "transparent" }}>
              {Icon.hash({ width: 12, height: 12, style: { opacity: 0.7 } })}{c}
            </div>
          ))}
          <div className="gv-mono" style={{ fontSize: 10.5, color: "var(--faint)", letterSpacing: "0.06em", padding: "var(--s4) 8px 6px", textTransform: "uppercase" }}>Apps</div>
          <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "6px 8px", borderRadius: 7, fontSize: 13.5, color: "var(--ink)", fontWeight: 600 }}>
            <span style={{ width: 14, height: 14, borderRadius: 4, background: "var(--accent)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--accent-ink)" }}>{Icon.spark({ width: 9, height: 9 })}</span>
            Gravii
          </div>
        </div>

        {/* thread */}
        <div style={{ minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "var(--s4) var(--s5)", borderBottom: "1px solid var(--line)" }}>
            {Icon.hash({ width: 15, height: 15, style: { color: "var(--muted)" } })}
            <span style={{ fontWeight: 700, fontSize: 15, color: "var(--ink)" }}>deal-room</span>
            <span style={{ fontSize: 12.5, color: "var(--faint)" }}>12 members</span>
          </div>

          <div style={{ padding: "var(--s4) var(--s5) var(--s2)", minHeight: 320 }}>
            {st >= 0 && (
              <MsgRow who="MR" name="Maya Rao" time="9:21" settle={st >= 0}>
                <span style={{ fontSize: 15, color: "var(--ink)", lineHeight: "var(--lh-normal)" }}>Counterparty just pushed back on the liability cap. What did we land on with Meridian?</span>
              </MsgRow>
            )}
            {st >= 1 && (
              <MsgRow who="JR" name="Jordan Ellis" time="9:23" settle={st >= 1}>
                <span style={{ fontSize: 15, color: "var(--ink)", lineHeight: "var(--lh-normal)" }}><Mention>what did we recommend on Meridian&apos;s liability cap?</Mention></span>
              </MsgRow>
            )}
            {st === 2 && <Typing />}
            {st >= 3 && (
              <MsgRow name="Gravii" time="9:23" app settle={st >= 3}>
                <span style={{ fontSize: 15, color: "var(--ink)", lineHeight: "var(--lh-relaxed)" }}>Capped at 12 months of fees, with an uncapped carve-out for breaches of confidentiality.</span>
                <div style={{ marginTop: "var(--s3)" }}>
                  <span className="gv-grounded-label">Grounded in</span>
                  <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 7, alignItems: "flex-start" }}>
                    <SourceChip name={src1.name} date={src1.date} />
                    <SourceChip name={src2.name} date={src2.date} />
                  </div>
                </div>
              </MsgRow>
            )}
            {st >= 4 && (
              <MsgRow who="PA" name="Priya Anand" time="9:25" settle={st >= 4}>
                <span style={{ fontSize: 15, color: "var(--ink)", lineHeight: "var(--lh-normal)" }}><Mention>any view on SOC 2 readiness for healthcare clients?</Mention></span>
              </MsgRow>
            )}
            {st === 5 && <Typing />}
            {st >= 6 && (
              <MsgRow name="Gravii" time="9:25" app settle={st >= 6}>
                <span style={{ fontSize: 15, color: "var(--muted)", fontStyle: "italic", lineHeight: "var(--lh-relaxed)" }}>I don&apos;t have anything on that. Nothing in your evidence covers it.</span>
                <div className="gv-abstain" style={{ marginTop: "var(--s3)" }}><span className="ring" />abstained, no evidence on file</div>
              </MsgRow>
            )}
          </div>

          {/* composer */}
          <div style={{ padding: "var(--s4) var(--s5) var(--s5)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--s3)", border: "1px solid var(--line)", borderRadius: 10, padding: "10px 14px", background: "var(--surface)" }}>
              <span style={{ flex: 1, fontSize: 14, color: "var(--faint)" }}>Message #deal-room</span>
              <span style={{ width: 26, height: 26, borderRadius: 6, background: "var(--accent-soft)", color: "var(--accent)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{Icon.arrow({ width: 13, height: 13 })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
