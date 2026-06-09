import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy - Gravii",
  description: "How the Gravii marketing site handles your data: EU-hosted analytics, no selling, and your rights.",
  openGraph: {
    title: "Privacy - Gravii",
    description: "How the Gravii marketing site handles your data.",
    url: "https://gravii.app/privacy",
    siteName: "Gravii",
    type: "website",
  },
};

const ctr = { marginLeft: "auto", marginRight: "auto" } as const;

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "var(--s7)" }}>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px, 2.2vw, 26px)", letterSpacing: "-0.01em", color: "var(--ink)", marginBottom: "var(--s3)" }}>{heading}</h2>
      <div style={{ fontSize: 16.5, lineHeight: "var(--lh-relaxed)", color: "var(--muted)" }}>{children}</div>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <main className="gv-section">
      <div className="gv-wrap" style={{ maxWidth: 720, ...ctr }}>
        <div className="gv-eyebrow" style={{ marginBottom: "var(--s5)" }}><span className="rule" />privacy</div>
        <h1 className="gv-h1" style={{ fontSize: "var(--fs-h2)", maxWidth: 640 }}>How this site handles your data</h1>
        <p className="gv-lead" style={{ marginTop: "var(--s4)", maxWidth: 600 }}>
          This covers the marketing site, gravii.app. How the Gravii product handles confidential data is described separately on the <a href="/security" style={{ color: "var(--accent)", textDecoration: "underline", textUnderlineOffset: 2 }}>security page</a>.
        </p>
        <div style={{ height: 1, background: "var(--line)", margin: "var(--s7) 0" }} />

        <Section heading="What we collect">
          We keep this site minimal. We use privacy-respecting product analytics (PostHog, hosted in the EU) to understand which pages are read, in aggregate. If you email us about a pilot, we keep the contact details and context you send, so we can reply. We do not run advertising trackers and we do not sell or share your data with third parties for their own use.
        </Section>

        <Section heading="Analytics and cookies">
          Our analytics record page views and basic interaction events to help us improve the site. They may set a cookie or use local storage to avoid double-counting a visit. We do not build advertising profiles. You can block these with your browser or an extension without losing access to anything on the site.
        </Section>

        <Section heading="If you contact us about a pilot">
          When you request a pilot, you share your name, email, and whatever context you choose to include. We use it only to have that conversation. We do not add you to a marketing list without asking. Any confidential or client data involved in an actual pilot is governed by a separate NDA and data-processing agreement, not by this page.
        </Section>

        <Section heading="Where data lives">
          The site and its analytics are operated in the EU. We use established infrastructure providers (hosting, analytics) that are themselves bound by data-protection terms.
        </Section>

        <Section heading="Your rights">
          If you are in the EU or UK, you have the right to access, correct, or delete the personal data we hold about you, and to object to its processing. Email us and we will action it. There is no account to manage on this site, so for most visitors there is nothing stored that identifies you personally.
        </Section>

        <Section heading="Contact">
          Questions, or a request about your data, go to <a href="mailto:tommy@gravii.app?subject=Privacy" style={{ color: "var(--accent)", textDecoration: "underline", textUnderlineOffset: 2 }}>tommy@gravii.app</a>. We will reply directly.
        </Section>

        <p className="gv-mono" style={{ fontSize: "var(--fs-small)", color: "var(--faint)", marginTop: "var(--s7)" }}>Last updated 9 June 2026.</p>
      </div>
    </main>
  );
}
