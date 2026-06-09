"use client";

import { useEffect, useState } from "react";
import { Wordmark } from "./primitives";
import { PILOT_HREF, SIGNIN_HREF } from "./constants";

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
        <a href={SIGNIN_HREF}>Sign in</a>
        <a className="cta-link" href={PILOT_HREF}>Request a pilot</a>
      </div>
    </nav>
  );
}
