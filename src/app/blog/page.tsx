import { getAllPosts } from '@/lib/blog'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Icon } from '@/components/site/icons'

export const metadata: Metadata = {
  title: 'Field notes - Gravii',
  description: 'Notes on grounded knowledge, honest abstention and sovereignty for teams that hold confidential, regulated data.',
  openGraph: {
    title: 'Field notes - Gravii',
    description: 'Notes on grounded knowledge, honest abstention and sovereignty for teams that hold confidential, regulated data.',
    url: 'https://gravii.app/blog',
    siteName: 'Gravii',
    type: 'website',
  },
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

const ctr = { marginLeft: 'auto', marginRight: 'auto' } as const

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main>
      <section className="gv-section" style={{ paddingBottom: 'calc(var(--sec-y) * 0.5)' }}>
        <div className="gv-wrap">
          <div className="gv-eyebrow" style={{ marginBottom: 'var(--s5)' }}><span className="rule" />field notes</div>
          <h1 className="gv-h1" style={{ fontSize: 'var(--fs-h2)', maxWidth: 760 }}>Writing on grounded knowledge.</h1>
          <p className="gv-lead" style={{ marginTop: 'var(--s4)', maxWidth: 560 }}>
            Notes on grounding, honest abstention and sovereignty for teams that hold other people&apos;s confidential data.
          </p>
        </div>
      </section>

      <section className="gv-section" style={{ paddingTop: 0 }}>
        <div className="gv-wrap" style={{ maxWidth: 820 }}>
          {posts.length === 0 ? (
            <p style={{ color: 'var(--muted)' }}>More notes soon.</p>
          ) : (
            <div style={{ borderTop: '1px solid var(--line)' }}>
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}
                  style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 'var(--s5)', padding: 'var(--s6) 0', borderBottom: '1px solid var(--line)', alignItems: 'baseline' }}>
                  <div className="gv-mono" style={{ fontSize: 12, color: 'var(--faint)', lineHeight: 1.6 }}>
                    {post.tags[0] && <div style={{ color: 'var(--accent)' }}>{post.tags[0]}</div>}
                    <div style={{ marginTop: 4 }}>{formatDate(post.date)}</div>
                    <div>{post.readingTime}</div>
                  </div>
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 2.4vw, 30px)', lineHeight: 1.18, letterSpacing: '-0.01em', color: 'var(--ink)', fontWeight: 700 }}>{post.title}</h2>
                    <p style={{ fontSize: 16, lineHeight: 'var(--lh-normal)', color: 'var(--muted)', margin: 'var(--s3) 0 var(--s4)', maxWidth: 560 }}>{post.description}</p>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13.5, color: 'var(--ink)', fontWeight: 500 }}>
                      {post.author} <span style={{ color: 'var(--faint)' }}>· read</span> {Icon.arrow({ width: 13, height: 13, style: { color: 'var(--accent)' } })}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
