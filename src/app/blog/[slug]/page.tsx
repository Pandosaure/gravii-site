import { getAllSlugs, getPostBySlug } from '@/lib/blog'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { MDXRemote } from '@/components/blog/MDXRemote'
import { Icon } from '@/components/site/icons'
import { REGISTER_HREF } from '@/components/site/constants'

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  return {
    title: `${post.title} - Gravii`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://gravii.app/blog/${post.slug}`,
      siteName: 'Gravii',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  }
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post || !post.published) return notFound()

  const initials = post.author.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Person', name: post.author, url: post.authorLinkedIn },
    publisher: { '@type': 'Organization', name: 'Gravii', url: 'https://gravii.app' },
  }

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="gv-section">
        <div className="gv-wrap" style={{ maxWidth: 720 }}>
          <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13.5, color: 'var(--muted)', marginBottom: 'var(--s6)' }}>
            <span style={{ transform: 'rotate(180deg)', display: 'inline-flex' }}>{Icon.arrow({ width: 13, height: 13 })}</span> Field notes
          </Link>

          {post.tags[0] && (
            <div className="gv-mono" style={{ fontSize: 12.5, color: 'var(--accent)', letterSpacing: '0.04em', marginBottom: 'var(--s4)' }}>{post.tags[0]}</div>
          )}
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4.2vw, 52px)', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--ink)', fontWeight: 700, textWrap: 'balance' }}>{post.title}</h1>
          <p className="gv-lead" style={{ marginTop: 'var(--s4)', maxWidth: 620 }}>{post.description}</p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s3)', margin: 'var(--s6) 0', paddingBottom: 'var(--s6)', borderBottom: '1px solid var(--line)' }}>
            <span style={{ width: 40, height: 40, flex: '0 0 auto', borderRadius: 40, background: 'var(--accent-soft)', border: '1px solid var(--line)', color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 14 }}>{initials}</span>
            <div style={{ fontSize: 14.5, color: 'var(--muted)' }}>
              <a href={post.authorLinkedIn} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600, color: 'var(--ink)' }}>{post.author}</a>
              {' · '}<span className="gv-mono" style={{ fontSize: 12.5, color: 'var(--faint)' }}>{formatDate(post.date)} · {post.readingTime}</span>
            </div>
          </div>

          <div className="gv-prose">
            <MDXRemote source={post.content} />
          </div>

          {/* author bio */}
          <div style={{ marginTop: 'var(--s8)', paddingTop: 'var(--s6)', borderTop: '1px solid var(--line)', display: 'flex', gap: 'var(--s4)', alignItems: 'flex-start' }}>
            <span style={{ width: 44, height: 44, flex: '0 0 auto', borderRadius: 44, background: 'var(--accent-soft)', border: '1px solid var(--line)', color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 15 }}>{initials}</span>
            <div>
              <a href={post.authorLinkedIn} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600, color: 'var(--ink)', fontSize: 15 }}>{post.author}</a>
              <p style={{ fontSize: 14.5, color: 'var(--muted)', margin: 'var(--s2) 0 0', lineHeight: 'var(--lh-relaxed)', maxWidth: 560 }}>
                {post.authorRole}. He writes about grounded knowledge, honest abstention, and data sovereignty for teams that hold confidential, regulated data.
              </p>
            </div>
          </div>

          <div style={{ marginTop: 'var(--s8)', textAlign: 'center' }}>
            <a className="gv-cta" href={REGISTER_HREF}>Register interest {Icon.arrow({})}</a>
          </div>
        </div>
      </article>
    </main>
  )
}
