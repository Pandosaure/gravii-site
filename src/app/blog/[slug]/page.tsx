import { getAllSlugs, getPostBySlug } from '@/lib/blog'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { MDXRemote } from '@/components/blog/MDXRemote'

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
    <div className="min-h-screen bg-[#0a0b10] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Nav */}
      <nav className="max-w-[1100px] mx-auto px-6 py-5 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center">
            <span className="text-white text-sm font-bold">G</span>
          </div>
          <span className="text-[17px] font-bold tracking-tight">Gravii</span>
        </a>
        <div className="flex items-center gap-6">
          <a href="/" className="text-sm text-[#9698b0] hover:text-white transition-colors">Home</a>
          <a href="/blog" className="text-sm text-[#9698b0] hover:text-white transition-colors">Blog</a>
          <a href="/trust" className="text-sm text-[#9698b0] hover:text-white transition-colors">Trust</a>
        </div>
      </nav>

      <article className="max-w-[680px] mx-auto px-6 pt-12 pb-24">
        {/* Back */}
        <Link href="/blog" className="text-[13px] text-[#6b6c82] hover:text-white transition-colors mb-8 inline-block">&larr; Blog</Link>

        {/* Header */}
        <h1 className="text-[clamp(26px,4vw,32px)] font-bold tracking-tight leading-[1.2] mb-4">{post.title}</h1>
        <p className="text-[16px] text-[#9698b0] leading-relaxed mb-6">{post.description}</p>

        <div className="flex items-center gap-3 text-[12px] text-[#6b6c82] mb-4">
          <a href={post.authorLinkedIn} target="_blank" rel="noopener noreferrer" className="text-[#818cf8] hover:text-white transition-colors font-medium">
            {post.author}
          </a>
          <span>&middot;</span>
          <span>{formatDate(post.date)}</span>
          <span>&middot;</span>
          <span>{post.readingTime}</span>
        </div>

        {post.tags.length > 0 && (
          <div className="flex gap-2 mb-8">
            {post.tags.map(tag => (
              <span key={tag} className="text-[11px] px-2.5 py-1 rounded-full bg-[#252640]/50 text-[#6b6c82]">{tag}</span>
            ))}
          </div>
        )}

        <div className="h-px bg-[#252640]/50 mb-12" />

        {/* Article body */}
        <div className="prose-gravii">
          <MDXRemote source={post.content} />
        </div>

        {/* Author bio */}
        <div className="h-px bg-[#252640]/50 mt-16 mb-8" />
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-[13px] font-bold">TJ</span>
          </div>
          <div>
            <a href={post.authorLinkedIn} target="_blank" rel="noopener noreferrer" className="text-[14px] font-semibold text-[#818cf8] hover:text-white transition-colors">
              {post.author}
            </a>
            <p className="text-[12px] text-[#6b6c82] mt-0.5">{post.authorRole}</p>
            <p className="text-[13px] text-[#9698b0] mt-2 leading-relaxed">
              Tommy writes about product decision-making based on his experience managing 50+ B2B accounts and building Gravii, a product memory system for B2B product teams.
            </p>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="py-8 border-t border-[#252640]/40">
        <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">G</span>
            </div>
            <span className="text-xs font-semibold text-[#6b6c82]">Gravii</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/trust" className="text-[10px] text-[#6b6c82] hover:text-white transition-colors">Trust</a>
            <a href="/blog" className="text-[10px] text-[#6b6c82] hover:text-white transition-colors">Blog</a>
            <span className="text-[10px] text-[#4a4b60]">EU hosted &middot; &copy; {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
