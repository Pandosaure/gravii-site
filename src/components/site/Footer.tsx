import { Wordmark } from "./primitives";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ borderTop: "1px solid var(--line)", padding: "var(--s7) var(--gutter)" }}>
      <div className="gv-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--s5)", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--s5)", flexWrap: "wrap" }}>
          <Wordmark />
          <a href="/security" style={{ fontSize: "var(--fs-small)", color: "var(--muted)" }}>Security</a>
          <a href="/blog" style={{ fontSize: "var(--fs-small)", color: "var(--muted)" }}>Blog</a>
          <a href="/privacy" style={{ fontSize: "var(--fs-small)", color: "var(--muted)" }}>Privacy</a>
        </div>
        <span style={{ fontSize: "var(--fs-small)", color: "var(--faint)" }} className="gv-mono">EU region · customer-held key · © {year}</span>
      </div>
    </footer>
  );
}
