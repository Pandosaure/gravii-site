import type { Metadata } from "next";
import { Reveal } from "@/components/site/primitives";
import { Icon } from "@/components/site/icons";
import { REGISTER_HREF } from "@/components/site/constants";

export const metadata: Metadata = {
  title: "Security & Sovereignty - Gravii",
  description:
    "How Gravii protects confidential, regulated data: isolated per-tenant database, encrypted with your own revocable key, EU region, BYOK and fail-closed, zero-retention, NDA and DPA available. Written plainly, with the honest caveats.",
  openGraph: {
    title: "Security & Sovereignty - Gravii",
    description:
      "Isolated and encrypted with your own revocable key. BYOK, fail-closed, zero-retention. The honest version.",
    url: "https://gravii.app/security",
    siteName: "Gravii",
    type: "website",
  },
};

const ctr = { marginLeft: "auto", marginRight: "auto" } as const;

const CLAIMS: [string, string][] = [
  ["Your own revocable key", "Your data is isolated in a per-tenant database and encrypted with a key held in your own KMS. Disable the key and Gravii loses access. The control is unilateral and yours."],
  ["EU region", "Your data is stored in the EU. Where the database physically lives is a property you can ask us to pin."],
  ["Bring your own model key", "You connect your own model provider key. Gravii runs answers through your key under your provider's zero-retention terms."],
  ["Fail-closed", "With no key configured, Gravii does not run on your real data. There is no shared Gravii key quietly standing in."],
  ["Zero-retention posture", "We do not train on your data. Captured material is what you confirmed, nothing more."],
  ["On paper", "NDA and a Data Processing Agreement on request. Deletion and export are guaranteed in writing."],
];

const HONEST: [string, string][] = [
  ["Encryption is not the same as residency", "Your own revocable key controls who can decrypt your data, not where it physically sits. If your policy requires data to live in a database you own, that is a residency option we offer, not the default. We will not blur the two."],
  ["Plaintext transits our app tier at request time", "To answer a question, your text is processed in our application tier for the moment it takes to respond. We do not claim your data never touches us. Closing that last gap with confidential computing is on the roadmap, not a claim we make today."],
  ["We are early", "Gravii is an early-stage product run with care. We would rather state the limits plainly than imply certifications we do not yet hold."],
];

export default function SecurityPage() {
  return (
    <main>
      {/* hero */}
      <section className="gv-section" style={{ paddingBottom: "calc(var(--sec-y) * 0.55)" }}>
        <div className="gv-wrap" style={{ textAlign: "center" }}>
          <Reveal><div className="gv-eyebrow" style={{ marginBottom: "var(--s5)" }}><span className="rule" />security &amp; sovereignty</div></Reveal>
          <Reveal delay={60} as="h1" className="gv-h1" style={{ fontSize: "var(--fs-h2)", maxWidth: 820, textWrap: "balance", ...ctr }}>
            Isolated, and encrypted with your own revocable key.
          </Reveal>
          <Reveal delay={130} as="p" className="gv-lead" style={{ marginTop: "var(--s5)", maxWidth: 600, ...ctr }}>
            This page is written for the person who reads it like a contract. Here is what Gravii commits to, stated precisely, including the honest caveats and where we are today.
          </Reveal>
        </div>
      </section>

      {/* the claims */}
      <section className="gv-section tinted" style={{ paddingTop: "var(--s8)", paddingBottom: "var(--s8)" }}>
        <div className="gv-wrap" style={{ maxWidth: 880, ...ctr }}>
          <Reveal as="p" style={{ fontSize: 15, lineHeight: "var(--lh-relaxed)", color: "var(--muted)", maxWidth: 720, ...ctr, textAlign: "center", marginBottom: "var(--s7)" }}>
            Gravii is early. The commitments below describe how Gravii is built and what each pilot firm is set up with. If you need to know exactly what is live today, ask and we will show you.
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--s5)" }}>
            {CLAIMS.map(([t, d]) => (
              <Reveal key={t} className="gv-card" style={{ padding: "var(--s6)", textAlign: "left" }}>
                <div style={{ color: "var(--accent)", marginBottom: "var(--s3)" }}>{Icon.lock({ width: 16, height: 16 })}</div>
                <div style={{ fontWeight: 600, fontSize: 16.5, color: "var(--ink)", marginBottom: "var(--s2)" }}>{t}</div>
                <p style={{ fontSize: 14.5, lineHeight: "var(--lh-relaxed)", color: "var(--muted)", margin: 0 }}>{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* honest gaps */}
      <section className="gv-section">
        <div className="gv-wrap" style={{ maxWidth: 760, ...ctr }}>
          <Reveal as="h2" className="gv-h2" style={{ fontSize: "clamp(26px, 3vw, 38px)", textWrap: "balance" }}>What we are upfront about</Reveal>
          <div style={{ marginTop: "var(--s7)" }}>
            {HONEST.map(([t, d]) => (
              <Reveal key={t} style={{ paddingLeft: "var(--s5)", borderLeft: "2px solid var(--accent)", marginBottom: "var(--s6)" }}>
                <div style={{ fontWeight: 600, fontSize: 17, color: "var(--ink)", marginBottom: "var(--s2)" }}>{t}</div>
                <p style={{ fontSize: 16, lineHeight: "var(--lh-relaxed)", color: "var(--muted)", margin: 0, maxWidth: 620 }}>{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* contact / CTA */}
      <section className="gv-section tinted" style={{ textAlign: "center" }}>
        <div className="gv-wrap">
          <Reveal as="h2" className="gv-h2" style={{ maxWidth: 640, textWrap: "balance", ...ctr }}>Have a question your compliance team needs answered?</Reveal>
          <Reveal delay={120} as="p" className="gv-lead" style={{ marginTop: "var(--s5)", maxWidth: 520, ...ctr }}>
            Ask it directly. We would rather have the hard conversation early.
          </Reveal>
          <Reveal delay={200} style={{ marginTop: "var(--s6)", display: "flex", gap: "var(--s4)", justifyContent: "center", flexWrap: "wrap" }}>
            <a className="gv-cta" href={REGISTER_HREF}>Register interest {Icon.arrow({})}</a>
            <a href="mailto:tommy@gravii.app?subject=Security%20question" style={{ display: "inline-flex", alignItems: "center", gap: "var(--s2)", height: 50, color: "var(--ink)", fontWeight: 600 }}>
              Email a security question
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
