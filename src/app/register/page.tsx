import type { Metadata } from "next";
import { RegisterForm } from "@/components/site/RegisterForm";

export const metadata: Metadata = {
  title: "Register interest - Gravii",
  description:
    "Gravii is in private pilot with a small number of design-partner firms that hold confidential, regulated knowledge. Register your interest and we'll be in touch personally.",
  openGraph: {
    title: "Register interest - Gravii",
    description:
      "Private pilot with design-partner firms. Answers inside the tools you already use, that cite their sources or admit they don't know. Register your interest.",
    url: "https://gravii.app/register",
    siteName: "Gravii",
    type: "website",
  },
};

export default function RegisterPage() {
  return (
    <main>
      <section className="gv-section">
        <div className="gv-wrap gv-narrow">
          <div className="gv-eyebrow">
            <span className="rule" />
            Private pilot
          </div>
          <h1 className="gv-h1" style={{ marginTop: "var(--s4)", maxWidth: 640 }}>
            Register interest
          </h1>
          <p className="gv-lead" style={{ marginTop: "var(--s5)", maxWidth: 560 }}>
            Gravii is in private pilot with a small number of firms that hold confidential,
            regulated knowledge. We onboard each design partner personally - answers inside the
            tools you already use, grounded in cited evidence or an honest &ldquo;I don&apos;t have
            anything on that.&rdquo; Tell us a little and we&apos;ll be in touch.
          </p>
          <div style={{ marginTop: "var(--s7)" }}>
            <RegisterForm />
          </div>
        </div>
      </section>
    </main>
  );
}
