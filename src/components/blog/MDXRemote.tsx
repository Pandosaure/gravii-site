import { MDXRemote as MDXRemoteBase } from 'next-mdx-remote/rsc'
import { mdxComponents } from './MDXComponents'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'

export function MDXRemote({ source }: { source: string }) {
  return (
    <MDXRemoteBase
      source={source}
      components={mdxComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug],
        },
      }}
    />
  )
}
