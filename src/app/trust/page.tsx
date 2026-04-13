import type { Metadata } from "next";
import { Shield, Key, Lock, ShieldOff, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Gravii - How we protect your data",
  description: "EU-hosted, BYOK, org-isolated. Here's exactly how Gravii handles your product data.",
};

export default function TrustPage() {
  return (
    <div className="min-h-screen bg-[#0a0b10] text-white">
      {/* Nav */}
      <nav className="max-w-[1100px] mx-auto px-6 py-5 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center">
            <span className="text-white text-sm font-bold">G</span>
          </div>
          <span className="text-[17px] font-bold tracking-tight">Gravii</span>
        </a>
        <a href="/" className="text-sm text-[#9698b0] hover:text-white transition-colors">&larr; Back to home</a>
      </nav>

      {/* ═══ SECTION 1: HERO ═══ */}
      <section className="py-20">
        <div className="max-w-[700px] mx-auto px-6 text-center">
          <p className="text-xs font-semibold text-[#818cf8] uppercase tracking-[2px] mb-4">Trust &amp; Security</p>
          <h1 className="text-[clamp(30px,5vw,48px)] font-bold tracking-tight mb-5 leading-[1.1]">
            Your product intelligence stays yours
          </h1>
          <p className="text-[16px] text-[#9698b0] max-w-[520px] mx-auto leading-relaxed">
            Gravii is built for teams that handle sensitive product and customer data. Here's exactly how we protect it.
          </p>
        </div>
      </section>

      <div className="max-w-[900px] mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#252640] to-transparent" />
      </div>

      {/* ═══ SECTION 2: DATA FLOW ═══ */}
      <section className="py-20">
        <div className="max-w-[900px] mx-auto px-6">
          <p className="text-xs font-semibold text-[#818cf8] uppercase tracking-[2px] mb-3">Data Flow</p>
          <h2 className="text-[clamp(22px,3.5vw,32px)] font-bold tracking-tight mb-10">What happens to your data</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "You share context",
                desc: "Meeting notes, emails, or transcripts. Pasted manually or forwarded via email. Nothing is collected automatically.",
              },
              {
                step: "2",
                title: "AI extracts intelligence",
                desc: "Sent to Anthropic Claude using your own API key (BYOK). Zero data retention on Anthropic's side. The raw text exists in server memory only during processing (10-30 seconds), then it's discarded. Only structured entities and signals are kept.",
              },
              {
                step: "3",
                title: "Intelligence is stored",
                desc: "Extracted entities, signals, and relationships are stored in your org's isolated database in Frankfurt. The original transcript is never persisted.",
              },
            ].map((s, i) => (
              <div key={s.step} className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-7 h-7 rounded-full bg-[#6366f1]/15 flex items-center justify-center flex-shrink-0">
                    <span className="text-[12px] font-bold text-[#818cf8]">{s.step}</span>
                  </div>
                  <h3 className="text-[15px] font-bold">{s.title}</h3>
                </div>
                <p className="text-[13px] text-[#9698b0] leading-relaxed">{s.desc}</p>
                {i < 2 && (
                  <div className="hidden md:flex absolute top-3.5 -right-3 text-[#252640]">
                    <ArrowRight size={14} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-[900px] mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#252640] to-transparent" />
      </div>

      {/* ═══ SECTION 3: WHAT'S IN PLACE ═══ */}
      <section className="py-20">
        <div className="max-w-[900px] mx-auto px-6">
          <p className="text-xs font-semibold text-[#818cf8] uppercase tracking-[2px] mb-3">Security</p>
          <h2 className="text-[clamp(22px,3.5vw,32px)] font-bold tracking-tight mb-10">What's in place today</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                icon: Shield,
                title: "EU hosting",
                desc: "All data stored in Frankfurt (eu-central-1). No US data transfer for storage.",
              },
              {
                icon: Key,
                title: "Bring Your Own Key",
                desc: "Use your own Anthropic API key. AI calls go directly to Anthropic under their zero data retention policy. Gravii never sees your prompts or responses.",
              },
              {
                icon: Lock,
                title: "Org isolation",
                desc: "Row-level security enforced at the database level on every table. Your data is invisible to other organizations.",
              },
              {
                icon: ShieldOff,
                title: "No training on your data",
                desc: "Gravii doesn't train models. With BYOK, Anthropic's zero retention policy means your content isn't used for training either.",
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="p-5 rounded-2xl border border-[#252640] bg-[#0d0e15]">
                  <div className="w-9 h-9 rounded-lg bg-[#6366f1]/10 flex items-center justify-center mb-3">
                    <Icon size={18} className="text-[#818cf8]" />
                  </div>
                  <h3 className="text-[15px] font-bold mb-1.5">{card.title}</h3>
                  <p className="text-[13px] text-[#9698b0] leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="max-w-[900px] mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#252640] to-transparent" />
      </div>

      {/* ═══ SECTION 4: INFRASTRUCTURE ═══ */}
      <section className="py-20">
        <div className="max-w-[900px] mx-auto px-6">
          <p className="text-xs font-semibold text-[#818cf8] uppercase tracking-[2px] mb-3">Infrastructure</p>
          <h2 className="text-[clamp(22px,3.5vw,32px)] font-bold tracking-tight mb-10">Built on infrastructure you already trust</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Supabase", note: "SOC 2 Type II. Database and auth." },
              { name: "Vercel", note: "SOC 2 Type II. Application hosting." },
              { name: "Anthropic", note: "Zero data retention API. AI processing." },
              { name: "Cloudflare", note: "SOC 2 Type II. DNS, email routing, edge security." },
            ].map((item) => (
              <div key={item.name} className="p-4 rounded-xl border border-[#252640]/60 bg-[#0d0e15]/50">
                <p className="text-[14px] font-semibold mb-1">{item.name}</p>
                <p className="text-[11px] text-[#6b6c82] leading-relaxed">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-[900px] mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#252640] to-transparent" />
      </div>

      {/* ═══ SECTION 5: SECURITY ROADMAP ═══ */}
      <section className="py-20">
        <div className="max-w-[900px] mx-auto px-6">
          <p className="text-xs font-semibold text-[#818cf8] uppercase tracking-[2px] mb-3">Roadmap</p>
          <h2 className="text-[clamp(22px,3.5vw,32px)] font-bold tracking-tight mb-10">What's coming</h2>

          <div className="space-y-4 max-w-[500px]">
            {[
              { label: "Data Processing Agreement (DPA)", pill: "This month", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
              { label: "GDPR data export and deletion", pill: "This month", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
              { label: "Data access audit log", pill: "Q2 2026", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
              { label: "SOC 2 Type I", pill: "2026", color: "bg-[#252640] text-[#6b6c82] border-[#252640]" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-4">
                <span className="text-[14px] font-medium">{item.label}</span>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border flex-shrink-0 ${item.color}`}>
                  {item.pill}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-[900px] mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#252640] to-transparent" />
      </div>

      {/* ═══ SECTION 6: HONEST GAPS ═══ */}
      <section className="py-20">
        <div className="max-w-[900px] mx-auto px-6">
          <p className="text-xs font-semibold text-[#818cf8] uppercase tracking-[2px] mb-3">Transparency</p>
          <h2 className="text-[clamp(22px,3.5vw,32px)] font-bold tracking-tight mb-10">What we're upfront about</h2>

          <div className="space-y-6 max-w-[640px]">
            <div className="pl-5 border-l-2 border-[#252640]">
              <p className="text-[14px] text-[#9698b0] leading-relaxed">
                During AI processing, your transcript exists in cleartext in server memory for 10-30 seconds. After extraction, only structured data is stored. With BYOK, Anthropic never retains the content.
              </p>
            </div>
            <div className="pl-5 border-l-2 border-[#252640]">
              <p className="text-[14px] text-[#9698b0] leading-relaxed">
                Gravii is an early-stage product. We don't have SOC 2 yet, but every infrastructure provider we depend on does. We're building security into the architecture from day one.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[900px] mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#252640] to-transparent" />
      </div>

      {/* ═══ SECTION 7: CONTACT ═══ */}
      <section className="py-20">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <p className="text-[15px] text-[#9698b0]">
            Have a security question?{" "}
            <a href="mailto:tommy@gravii.app" className="text-[#818cf8] font-semibold hover:text-white transition-colors">
              Reach out directly
            </a>.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-[#252640]/40">
        <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">G</span>
            </div>
            <span className="text-xs font-semibold text-[#6b6c82]">Gravii</span>
            <span className="text-[10px] text-[#4a4b60] ml-2">Product memory for B2B teams</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/trust" className="text-[10px] text-[#6b6c82] hover:text-white transition-colors">Trust</a>
            <span className="text-[10px] text-[#4a4b60]">EU hosted &middot; GDPR compliant &middot; &copy; {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
