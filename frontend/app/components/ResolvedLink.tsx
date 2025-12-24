'use client'

import Link from 'next/link'

import {useLanguage} from '@/app/contexts/LanguageContext'
import {linkResolver} from '@/sanity/lib/utils'

interface ResolvedLinkProps {
  link: any
  children: React.ReactNode
  className?: string
}

export default function ResolvedLink({link, children, className}: ResolvedLinkProps) {
  const {language} = useLanguage()
  // resolveLink() is used to determine the type of link and return the appropriate URL.
  let resolvedLink = linkResolver(link)

  // Add language prefix for internal links (not external hrefs)
  if (typeof resolvedLink === 'string' && language === 'jp' && !resolvedLink.startsWith('http')) {
    // Don't add prefix if it's already there or if it's the root path
    if (!resolvedLink.startsWith('/jp') && resolvedLink !== '/') {
      resolvedLink = `/jp${resolvedLink}`
    }
  }

  if (typeof resolvedLink === 'string') {
    return (
      <Link
        href={resolvedLink}
        target={link?.openInNewTab ? '_blank' : undefined}
        rel={link?.openInNewTab ? 'noopener noreferrer' : undefined}
        className={className}
      >
        {children}
      </Link>
    )
  }
  return <>{children}</>
}
