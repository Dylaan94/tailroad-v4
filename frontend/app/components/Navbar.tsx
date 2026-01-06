'use client'

import {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'

import {useLanguage} from '@/app/contexts/LanguageContext'
import {urlForImage, linkResolver} from '@/sanity/lib/utils'
import type {NavbarData, NavItem, MegamenuColumn, LocalisedString, SanityLink} from '@/types'

type NavbarProps = {
  data: NavbarData
}

function resolveLink(link: SanityLink | undefined, language: 'en' | 'jp'): string {
  if (!link) return '#'
  const prefix = language === 'jp' ? '/jp' : ''
  if (link.linkType === 'href' && link.href) return link.href
  if (link.linkType === 'page' && link.page) return `${prefix}/${link.page}`
  if (link.linkType === 'post' && link.post) return `${prefix}/posts/${link.post}`
  return '#'
}

function NavLink({
  link,
  children,
  className,
  language,
  onClick,
}: {
  link?: SanityLink
  children: React.ReactNode
  className?: string
  language: 'en' | 'jp'
  onClick?: () => void
}) {
  const href = resolveLink(link, language)
  const isExternal = link?.openInNewTab || href.startsWith('http')

  return (
    <Link
      href={href}
      className={className}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}

function MegamenuDropdown({
  columns,
  isOpen,
  language,
  getLocalisedString,
}: {
  columns: MegamenuColumn[]
  isOpen: boolean
  language: 'en' | 'jp'
  getLocalisedString: (localised?: {en?: string; jp?: string}) => string | undefined
}) {
  if (!isOpen) return null

  return (
    <div className="absolute top-full right-0 mt-4 min-w-[500px] p-6 bg-white/90 backdrop-blur-xl rounded-2xl border border-gray-200/50 shadow-2xl shadow-black/10">
      <div className="grid grid-cols-2 gap-8">
        {columns.map((column) => (
          <div key={column._key}>
            {getLocalisedString(column.title) && (
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                {getLocalisedString(column.title)}
              </h3>
            )}
            <ul className="space-y-2">
              {column.links?.map((item) => (
                <li key={item._key}>
                  <NavLink
                    link={item.link}
                    language={language}
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
                        {getLocalisedString(item.label)}
                      </span>
                      {getLocalisedString(item.description) && (
                        <span className="block text-xs text-gray-500 mt-0.5">
                          {getLocalisedString(item.description)}
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

function NavItemComponent({
  item,
  language,
  getLocalisedString,
}: {
  item: NavItem
  language: 'en' | 'jp'
  getLocalisedString: (localised?: {en?: string; jp?: string}) => string | undefined
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {item.hasMegamenu ? (
        <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-black transition-colors px-3 py-2">
          {getLocalisedString(item.label)}
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
          language={language}
          className="text-sm font-medium text-gray-700 hover:text-black transition-colors px-3 py-2"
        >
          {getLocalisedString(item.label)}
        </NavLink>
      )}

      {item.hasMegamenu && item.megamenu && (
        <MegamenuDropdown
          columns={item.megamenu}
          isOpen={isOpen}
          language={language}
          getLocalisedString={getLocalisedString}
        />
      )}
    </div>
  )
}

function MobileMenu({
  isOpen,
  onClose,
  navbar,
  navbarCta,
  language,
  getLocalisedString,
  setLanguage,
}: {
  isOpen: boolean
  onClose: () => void
  navbar?: NavItem[]
  navbarCta?: any
  language: 'en' | 'jp'
  getLocalisedString: (localised?: {en?: string; jp?: string}) => string | undefined
  setLanguage: (lang: 'en' | 'jp') => void
}) {
  const [openMegamenus, setOpenMegamenus] = useState<Set<string>>(new Set())

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const toggleMegamenu = (key: string) => {
    const newSet = new Set(openMegamenus)
    if (newSet.has(key)) {
      newSet.delete(key)
    } else {
      newSet.add(key)
    }
    setOpenMegamenus(newSet)
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[90%] max-w-sm bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <span className="font-semibold text-gray-900">Menu</span>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1">
              {navbar?.map((item) => (
                <div key={item._key}>
                  {item.hasMegamenu && item.megamenu ? (
                    <>
                      <button
                        onClick={() => toggleMegamenu(item._key)}
                        className="w-full flex items-center justify-between px-4 py-3 text-left text-gray-900 hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium">{getLocalisedString(item.label)}</span>
                        <svg
                          className={`w-5 h-5 transition-transform ${
                            openMegamenus.has(item._key) ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {openMegamenus.has(item._key) && item.megamenu && (
                        <div className="bg-gray-50">
                          {item.megamenu.map((column) => (
                            <div key={column._key} className="px-4 py-3 border-b border-gray-200 last:border-b-0">
                              {getLocalisedString(column.title) && (
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                                  {getLocalisedString(column.title)}
                                </h3>
                              )}
                              <ul className="space-y-1">
                                {column.links?.map((linkItem) => (
                                  <li key={linkItem._key}>
                                    <NavLink
                                      link={linkItem.link}
                                      language={language}
                                      className="block px-2 py-2 text-sm text-gray-700 hover:text-black hover:bg-gray-100 rounded transition-colors"
                                      onClick={onClose}
                                    >
                                      {getLocalisedString(linkItem.label)}
                                    </NavLink>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <NavLink
                      link={item.link}
                      language={language}
                      className="block px-4 py-3 text-gray-900 hover:bg-gray-50 transition-colors font-medium"
                      onClick={onClose}
                    >
                      {getLocalisedString(item.label)}
                    </NavLink>
                  )}
                </div>
              ))}

              {/* CTA Button */}
              {navbarCta && getLocalisedString(navbarCta.label) && (
                <div className="px-4 py-3 border-t border-gray-200 mt-4">
                  <NavLink
                    link={navbarCta.link}
                    language={language}
                    className="block w-full px-4 py-2 text-sm font-medium text-center text-white bg-black rounded-full hover:bg-gray-800 transition-colors"
                    onClick={onClose}
                  >
                    {getLocalisedString(navbarCta.label)}
                  </NavLink>
                </div>
              )}
            </nav>
          </div>

          {/* Language Selector Footer */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center justify-center gap-2">
              <span className="text-xs text-gray-500 mr-2">Language:</span>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                  language === 'en' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('jp')}
                className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                  language === 'jp' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                JP
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default function Navbar({data}: NavbarProps) {
  const {language, setLanguage, getLocalisedString} = useLanguage()
  const prefix = language === 'jp' ? '/jp' : ''
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle null data (settings not yet created)
  if (!data) {
    return (
      <nav className="fixed top-4 left-4 right-4 md:top-6 md:right-6 md:left-auto z-50">
        <div className="flex items-center justify-between px-4 py-2 bg-white/70 backdrop-blur-xl rounded-full border border-gray-200/50 shadow-lg shadow-black/5">
          <Link href={prefix || '/'} className="flex items-center gap-2">
            <Image
              src="/images/tailroad-logo.svg"
              alt="Tailroad Labs"
              width={28}
              height={30}
              className="h-7 w-auto"
            />
            <span className="font-medium text-gray-900">Tailroad Labs</span>
          </Link>
          {/* Language Selector */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                language === 'en' ? 'bg-black text-white' : 'text-gray-600 hover:text-black'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('jp')}
              className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                language === 'jp' ? 'bg-black text-white' : 'text-gray-600 hover:text-black'
              }`}
            >
              JP
            </button>
          </div>
        </div>
      </nav>
    )
  }

  const {navbar, navbarCta} = data

  return (
    <>
      <nav className="fixed top-4 left-4 right-4 md:top-6 md:right-6 md:left-auto z-50">
        {/* Mobile: Simple bar with logo and hamburger */}
        <div className="md:hidden flex items-center justify-between px-4 py-2 bg-white/70 backdrop-blur-xl rounded-full border border-gray-200/50 shadow-lg shadow-black/5">
          <Link href={prefix || '/'} className="flex items-center gap-2">
            <Image
              src="/images/tailroad-logo.svg"
              alt="Tailroad Labs"
              width={28}
              height={30}
              className="h-7 w-auto"
            />
            <span className="font-medium text-gray-900">Tailroad Labs</span>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Desktop: Full bubble container */}
        <div className="hidden md:flex items-center gap-1 px-2 py-2 bg-white/70 backdrop-blur-xl rounded-full border border-gray-200/50 shadow-lg shadow-black/5">
          {/* Logo & Site Title */}
          <Link href={prefix || '/'} className="flex items-center gap-2 px-3">
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
              <NavItemComponent
                key={item._key}
                item={item}
                language={language}
                getLocalisedString={getLocalisedString}
              />
            ))}
          </div>

          {/* CTA Button */}
          {navbarCta && getLocalisedString(navbarCta.label) && (
            <>
              <div className="w-px h-6 bg-gray-200" />
              <NavLink
                link={navbarCta.link}
                language={language}
                className="ml-1 px-4 py-2 text-sm font-medium text-white bg-black rounded-full hover:bg-gray-800 transition-colors"
              >
                {getLocalisedString(navbarCta.label)}
              </NavLink>
            </>
          )}

          {/* Language Selector */}
          <div className="w-px h-6 bg-gray-200" />
          <div className="flex items-center gap-1 px-2">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                language === 'en' ? 'bg-black text-white' : 'text-gray-600 hover:text-black'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('jp')}
              className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                language === 'jp' ? 'bg-black text-white' : 'text-gray-600 hover:text-black'
              }`}
            >
              JP
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navbar={navbar}
        navbarCta={navbarCta}
        language={language}
        getLocalisedString={getLocalisedString}
        setLanguage={setLanguage}
      />
    </>
  )
}

