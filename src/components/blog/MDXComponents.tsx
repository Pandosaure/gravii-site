import Link from 'next/link'
import type { ReactNode } from 'react'

// Restyled to the Gravii design system. The article body is wrapped in
// `.gv-prose`, so base elements (h2, p, ul, blockquote, code...) are styled by
// element selectors in globals.css. Here we only override the pieces that need
// behaviour or extra structure: links, images, and the Callout.

function CustomLink({ href, children, ...props }: { href?: string; children: ReactNode; [key: string]: any }) {
  if (!href) return <span {...props}>{children}</span>
  const isExternal = href.startsWith('http') || href.startsWith('//')
  if (isExternal) {
    return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
  }
  return <Link href={href} {...props}>{children}</Link>
}

function CustomImage({ src, alt, ...props }: { src?: string; alt?: string; [key: string]: any }) {
  return (
    <figure style={{ margin: 'var(--s6) 0' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt || ''} loading="lazy" {...props} />
      {alt && <figcaption style={{ fontSize: 13, color: 'var(--faint)', marginTop: 'var(--s2)', textAlign: 'center' }}>{alt}</figcaption>}
    </figure>
  )
}

export function Callout({ type = 'info', children }: { type?: 'info' | 'warning' | 'tip'; children: ReactNode }) {
  return (
    <div style={{ margin: 'var(--s6) 0', borderRadius: 'var(--r-panel)', padding: 'var(--s4) var(--s5)', borderLeft: '3px solid var(--accent)', background: 'var(--accent-soft)' }}>
      <div style={{ fontSize: 15.5, color: 'var(--ink)', lineHeight: 'var(--lh-relaxed)' }}>{children}</div>
    </div>
  )
}

export const mdxComponents = {
  a: CustomLink,
  img: CustomImage,
  Callout,
}
