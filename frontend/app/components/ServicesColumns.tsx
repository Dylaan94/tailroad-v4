'use client'

import {PortableText} from '@portabletext/react'

import {DynamicHeading, sanitizeHeadingLevel} from '@/app/components/DynamicHeading'
import ResolvedLink from '@/app/components/ResolvedLink'
import {useLanguage} from '@/app/contexts/LanguageContext'
import type {ServicesColumnsProps, LocalisedHeader, LocalisedBlockContent, LocalisedString} from '@/types'

const headingStyles = {
  h1: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
  h2: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
  h3: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
  h4: 'text-lg sm:text-xl md:text-2xl lg:text-3xl',
  h5: 'text-lg sm:text-xl md:text-2xl lg:text-3xl',
  h6: 'text-lg sm:text-xl md:text-2xl lg:text-3xl',
}

type ServiceLink = {
  _key: string
  title?: LocalisedString
  link?: any
}

type ServiceColumn = {
  title?: LocalisedString
  links?: ServiceLink[]
}

export default function ServicesColumns({block}: ServicesColumnsProps) {
  const {header, content, column1, column2} = block
  const {getLocalisedString, getLocalisedContent} = useLanguage()

  const headingLevel = sanitizeHeadingLevel(header?.headingLevel)
  const headerText = getLocalisedString(header)
  const contentValue = getLocalisedContent(content)

  return (
    <section className="py-20 px-5 md:px-10">
      <div className=" mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Side - Header */}
          <div>
            {headerText && (
              <div className="sticky top-20">
                <DynamicHeading
                  level={headingLevel}
                  className={`font-bold tracking-tight ${headingStyles[headingLevel]} text-gray-900`}
                >
                  {headerText}
                </DynamicHeading>
              </div>
            )}
          </div>

          {/* Right Side - Content & Columns */}
          <div className="space-y-12">
            {/* Content Block */}
            {contentValue && (
              <div className=" max-w-none text-gray-400">
                <PortableText value={contentValue} />
              </div>
            )}

            {/* Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Column 1 */}
              {column1 && (
                <div className=" pb-4">
                  {getLocalisedString(column1.title) && (
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 pb-2 border-b border-gray-200">
                      {getLocalisedString(column1.title)}
                    </h3>
                  )}
                  {column1.links && column1.links.length > 0 && (
                    <ul className="space-y-1">
                      {column1.links.map((linkItem: ServiceLink) => {
                        const linkTitle = getLocalisedString(linkItem.title) || 'Link'
                        return (
                          <li key={linkItem._key}>
                            <ResolvedLink
                              link={linkItem.link}
                              className="text-gray-700 hover:text-black transition-colors duration-200 inline-block"
                            >
                             - {linkTitle}
                            </ResolvedLink>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </div>
              )}

              {/* Column 2 */}
              {column2 && (
                <div>
                  {getLocalisedString(column2.title) && (
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 pb-2 border-b border-gray-200">
                      {getLocalisedString(column2.title)}
                    </h3>
                  )}
                  {column2.links && column2.links.length > 0 && (
                    <ul className="space-y-1">
                      {column2.links.map((linkItem: ServiceLink) => {
                        const linkTitle = getLocalisedString(linkItem.title) || 'Link'
                        return (
                          <li key={linkItem._key}>
                            <ResolvedLink
                              link={linkItem.link}
                              className="text-gray-700 hover:text-black transition-colors duration-200 inline-block"
                            >
                             - {linkTitle}
                            </ResolvedLink>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

