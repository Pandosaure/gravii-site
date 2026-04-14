import Link from 'next/link'
import type { ReactNode } from 'react'

function CustomLink({ href, children, ...props }: { href?: string; children: ReactNode; [key: string]: any }) {
  if (!href) return <span {...props}>{children}</span>
  const isExternal = href.startsWith('http') || href.startsWith('//')
  if (isExternal) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#818cf8] hover:text-white underline-offset-2 hover:underline transition-colors" {...props}>{children}</a>
  }
  return <Link href={href} className="text-[#818cf8] hover:text-white underline-offset-2 hover:underline transition-colors" {...props}>{children}</Link>
}

function CustomImage({ src, alt, ...props }: { src?: string; alt?: string; [key: string]: any }) {
  return (
    <figure className="my-8">
      <img src={src} alt={alt || ''} loading="lazy" className="w-full rounded-lg border border-[#252640]/50" {...props} />
      {alt && <figcaption className="text-[12px] text-[#6b6c82] mt-2 text-center">{alt}</figcaption>}
    </figure>
  )
}

export function Callout({ type = 'info', children }: { type?: 'info' | 'warning' | 'tip'; children: ReactNode }) {
  const colors = {
    info: { border: '#6366f1', bg: 'rgba(99, 102, 241, 0.06)' },
    warning: { border: '#f59e0b', bg: 'rgba(245, 158, 11, 0.06)' },
    tip: { border: '#10b981', bg: 'rgba(16, 185, 129, 0.06)' },
  }
  const c = colors[type]
  return (
    <div className="my-6 rounded-lg px-5 py-4 border-l-[3px]" style={{ borderColor: c.border, backgroundColor: c.bg }}>
      <div className="text-[14px] text-[#c8c8d0] leading-relaxed">{children}</div>
    </div>
  )
}

export const mdxComponents = {
  a: CustomLink,
  img: CustomImage,
  Callout,
  h1: (props: any) => <h1 className="text-[28px] font-bold tracking-tight mt-12 mb-4 text-white" {...props} />,
  h2: (props: any) => <h2 className="text-[22px] font-bold tracking-tight mt-12 mb-4 text-white" {...props} />,
  h3: (props: any) => <h3 className="text-[18px] font-semibold mt-8 mb-3 text-white" {...props} />,
  p: (props: any) => <p className="text-[16px] leading-[1.75] text-[#c8c8d0] mb-6" {...props} />,
  ul: (props: any) => <ul className="text-[16px] leading-[1.75] text-[#c8c8d0] mb-6 pl-6 list-disc space-y-1" {...props} />,
  ol: (props: any) => <ol className="text-[16px] leading-[1.75] text-[#c8c8d0] mb-6 pl-6 list-decimal space-y-1" {...props} />,
  li: (props: any) => <li className="text-[16px] text-[#c8c8d0]" {...props} />,
  blockquote: (props: any) => <blockquote className="border-l-[3px] border-[#6366f1] pl-5 italic text-[#9698b0] my-6" {...props} />,
  code: (props: any) => {
    const isBlock = props.className?.includes('language-')
    if (isBlock) return <code className="block bg-[#12131a] rounded-lg p-4 text-[14px] font-mono text-[#c8c8d0] overflow-x-auto my-6" {...props} />
    return <code className="bg-[#1a1b25] text-[#c8c8d0] rounded px-1.5 py-0.5 text-[14px] font-mono" {...props} />
  },
  pre: (props: any) => <pre className="bg-[#12131a] rounded-lg p-4 overflow-x-auto my-6 border border-[#252640]/50" {...props} />,
  hr: () => <hr className="border-0 h-px bg-[#252640]/50 my-12" />,
  strong: (props: any) => <strong className="text-white font-semibold" {...props} />,
}
