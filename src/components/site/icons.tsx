// Pure SVG icon functions (no hooks, no client state) so they can be invoked
// from both server and client components. Thin stroke, currentColor.

import type { CSSProperties } from "react";

type IconProps = { width?: number; height?: number; style?: CSSProperties };

export const Icon = {
  hash: (p: IconProps = {}) => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}><path d="M3 6h10M3 10h10M6.5 3 5 13M11 3 9.5 13" /></svg>),
  mail: (p: IconProps = {}) => (<svg width="15" height="15" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="3.5" width="14" height="11" rx="2" /><path d="m3 5 6 4.5L15 5" /></svg>),
  check: (p: IconProps = {}) => (<svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m2.5 7.5 3 3 6-7" /></svg>),
  lock: (p: IconProps = {}) => (<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}><rect x="3.5" y="7" width="9" height="6.5" rx="1.5" /><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" /></svg>),
  arrow: (p: IconProps = {}) => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 8h9.5M9 4.5 12.5 8 9 11.5" /></svg>),
  spark: (p: IconProps = {}) => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M8 2.5 9.2 6.3 13 7.5 9.2 8.7 8 12.5 6.8 8.7 3 7.5 6.8 6.3 8 2.5Z" /></svg>),
};
