import { getAllPosts } from '@/lib/blog'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - Gravii',
  description: 'Thoughts on product decision-making, customer signals, and building product memory for B2B product teams.',
  openGraph: {
    title: 'Blog - Gravii',
    description: 'Thoughts on product decision-making, customer signals, and building product memory for B2B product teams.',
    url: 'https://gravii.app/blog',
    siteName: 'Gravii',
    type: 'website',
  },
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogPage() {
  const posts = getAllPosts()

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
        <div className="flex items-center gap-6">
          <a href="/" className="text-sm text-[#9698b0] hover:text-white transition-colors">Home</a>
          <a href="/trust" className="text-sm text-[#9698b0] hover:text-white transition-colors">Trust</a>
          <a href="https://app.gravii.app/login" className="px-5 py-2.5 bg-[#6366f1] hover:bg-[#818cf8] text-white text-sm font-semibold rounded-lg transition-all hover:-translate-y-0.5">Sign in</a>
        </div>
      </nav>

      <div className="max-w-[800px] mx-auto px-6 pt-16 pb-24">
        <h1 className="text-[clamp(30px,5vw,44px)] font-bold tracking-tight mb-4">Blog</h1>
        <p className="text-[16px] text-[#9698b0] mb-16 max-w-[560px]">
          Thoughts on product decision-making, customer signals, and building product memory.
        </p>

        {posts.length === 0 ? (
          <p className="text-[15px] text-[#6b6c82]">Coming soon. We're writing about product decision-making for B2B teams.</p>
        ) : (
          <div className="space-y-0">
            {posts.map((post, i) => (
              <div key={post.slug}>
                {i > 0 && <div className="h-px bg-[#252640]/50 my-10" />}
                <Link href={`/blog/${post.slug}`} className="block group">
                  <h2 className="text-[22px] font-bold tracking-tight mb-2 group-hover:text-[#818cf8] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-[15px] text-[#9698b0] leading-relaxed mb-3 line-clamp-2">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-3 text-[12px] text-[#6b6c82]">
                    <span>{formatDate(post.date)}</span>
                    <span>&middot;</span>
                    <span>{post.readingTime}</span>
                    {post.tags.length > 0 && (
                      <>
                        <span>&middot;</span>
                        {post.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 rounded-full bg-[#252640]/50 text-[#6b6c82]">{tag}</span>
                        ))}
                      </>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

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
