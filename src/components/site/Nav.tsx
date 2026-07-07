"use client";

import { useEffect, useState } from "react";
import { Wordmark } from "./primitives";
import { REGISTER_HREF } from "./constants";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`gv-nav ${scrolled ? "scrolled" : ""}`}>
      <a href="/" aria-label="Gravii home"><Wordmark /></a>
      <div className="links">
        <a className="nav-page" href="/security">Security</a>
        <a className="nav-page" href="/blog">Blog</a>
        <a className="cta-link" href={REGISTER_HREF}>Register interest</a>
      </div>
    </nav>
  );
}
