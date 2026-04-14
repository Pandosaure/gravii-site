import { getAllPosts } from '@/lib/blog'

export default function sitemap() {
  const posts = getAllPosts()

  const blogUrls = posts.map(post => ({
    url: `https://gravii.app/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    { url: 'https://gravii.app', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: 'https://gravii.app/trust', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: 'https://gravii.app/blog', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    ...blogUrls,
  ]
}
