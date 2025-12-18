'use client'

import {useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'

import {urlForImage, linkResolver} from '@/sanity/lib/utils'
import type {NavbarData, NavItem, MegamenuColumn, LocalisedString, SanityLink} from '@/types'

type NavbarProps = {
  data: NavbarData
}

function resolveLink(link: SanityLink | undefined): string {
  if (!link) return '#'
  if (link.linkType === 'href' && link.href) return link.href
  if (link.linkType === 'page' && link.page) return `/${link.page}`
  if (link.linkType === 'post' && link.post) return `/posts/${link.post}`
  return '#'
}

function NavLink({
  link,
  children,
  className,
}: {
  link?: SanityLink
  children: React.ReactNode
  className?: string
}) {
  const href = resolveLink(link)
  const isExternal = link?.openInNewTab || href.startsWith('http')

  return (
    <Link
      href={href}
      className={className}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      {children}
    </Link>
  )
}

function MegamenuDropdown({
  columns,
  isOpen,
}: {
  columns: MegamenuColumn[]
  isOpen: boolean
}) {
  if (!isOpen) return null

  return (
    <div className="absolute top-full right-0 mt-4 min-w-[500px] p-6 bg-white/90 backdrop-blur-xl rounded-2xl border border-gray-200/50 shadow-2xl shadow-black/10">
      <div className="grid grid-cols-2 gap-8">
        {columns.map((column) => (
          <div key={column._key}>
            {column.title && (column.title.en || column.title.jp) && (
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                {column.title.en || column.title.jp}
              </h3>
            )}
            <ul className="space-y-2">
              {column.links?.map((item) => (
                <li key={item._key}>
                  <NavLink
                    link={item.link}
                    className="group flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-100/80 transition-colors"
                  >
                    {item.icon?.asset && (
                      <div className="shrink-0 w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                        <Image
                          src={urlForImage(item.icon)?.width(40).height(40).url() || ''}
                          alt=""
                          width={24}
                          height={24}
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div>
                      <span className="block text-sm font-medium text-gray-900 group-hover:text-black">
                        {item.label?.en || item.label?.jp}
                      </span>
                      {item.description && (item.description.en || item.description.jp) && (
                        <span className="block text-xs text-gray-500 mt-0.5">
                          {item.description.en || item.description.jp}
                        </span>
                      )}
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

function NavItemComponent({item}: {item: NavItem}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {item.hasMegamenu ? (
        <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-black transition-colors px-3 py-2">
          {item.label?.en || item.label?.jp}
          <svg
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      ) : (
        <NavLink
          link={item.link}
          className="text-sm font-medium text-gray-700 hover:text-black transition-colors px-3 py-2"
        >
          {item.label?.en || item.label?.jp}
        </NavLink>
      )}

      {item.hasMegamenu && item.megamenu && (
        <MegamenuDropdown columns={item.megamenu} isOpen={isOpen} />
      )}
    </div>
  )
}

export default function Navbar({data}: NavbarProps) {
  // Handle null data (settings not yet created)
  if (!data) {
    return (
      <nav className="fixed top-6 right-6 z-50">
        <div className="flex items-center gap-1 px-4 py-2 bg-white/70 backdrop-blur-xl rounded-full border border-gray-200/50 shadow-lg shadow-black/5">
          <Link href="/" className="flex items-center gap-2 px-2">
            <Image
              src="/images/tailroad-logo.svg"
              alt="Tailroad Labs"
              width={28}
              height={30}
              className="h-7 w-auto"
            />
            <span className="font-medium text-gray-900">Tailroad Labs</span>
          </Link>
        </div>
      </nav>
    )
  }

  const {navbar, navbarCta} = data

  return (
    <nav className="fixed top-6 right-6 z-50">
      {/* Bubble Container */}
      <div className="flex items-center gap-1 px-2 py-2 bg-white/70 backdrop-blur-xl rounded-full border border-gray-200/50 shadow-lg shadow-black/5">
        {/* Logo & Site Title */}
        <Link href="/" className="flex items-center gap-2 px-3">
          <Image
            src="/images/tailroad-logo.svg"
            alt="Tailroad Labs"
            width={28}
            height={30}
            className="h-7 w-auto"
          />
          <span className="font-medium text-gray-900">Tailroad Labs</span>
        </Link>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-200" />

        {/* Nav Items */}
        <div className="flex items-center">
          {navbar?.map((item) => (
            <NavItemComponent key={item._key} item={item} />
          ))}
        </div>

        {/* CTA Button */}
        {navbarCta?.label && (navbarCta.label.en || navbarCta.label.jp) && (
          <>
            <div className="w-px h-6 bg-gray-200" />
            <NavLink
              link={navbarCta.link}
              className="ml-1 px-4 py-2 text-sm font-medium text-white bg-black rounded-full hover:bg-gray-800 transition-colors"
            >
              {navbarCta.label.en || navbarCta.label.jp}
            </NavLink>
          </>
        )}
      </div>
    </nav>
  )
}

