'use client'

import { PortableText } from '@portabletext/react'

import { DynamicHeading, sanitizeHeadingLevel } from '@/app/components/DynamicHeading'
import { useLanguage } from '@/app/contexts/LanguageContext'
import type { TextColumnsProps } from '@/types'

const headingStyles = {
  h1: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
  h2: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
  h3: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
  h4: 'text-lg sm:text-xl md:text-2xl lg:text-3xl',
  h5: 'text-lg sm:text-xl md:text-2xl lg:text-3xl',
  h6: 'text-lg sm:text-xl md:text-2xl lg:text-3xl',
}

export default function TextColumns({ block }: TextColumnsProps) {
  const { header, columns } = block
  const { getLocalisedString, getLocalisedContent } = useLanguage()

  const headingLevel = sanitizeHeadingLevel(header?.headingLevel)
  const headerText = getLocalisedString(header)

  if (!columns || columns.length === 0) {
    return null
  }

  // Determine grid columns based on number of columns
  const getGridCols = (count: number) => {
    switch (count) {
      case 1:
        return 'grid-cols-1'
      case 2:
        return 'grid-cols-1 md:grid-cols-2'
      case 3:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      case 4:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
      default:
        return 'grid-cols-1 md:grid-cols-2'
    }
  }

  return (
    <section className="py-20 px-5 md:px-10">

      {/* Optional Header */}
      {headerText && (
        <div className="mb-12">
          <DynamicHeading
            level={headingLevel}
            className={`font-bold tracking-tight ${headingStyles[headingLevel]} text-gray-900`}
          >
            {headerText}
          </DynamicHeading>
        </div>
      )}

      {/* Columns Grid */}
      <div className={`grid ${getGridCols(columns.length)} gap-8 lg:gap-12`}>
        {columns.map((column, index) => {
          const content = getLocalisedContent(column.content)
          return (
            <div key={index} className="prose prose-lg max-w-none text-gray-700">
              {content && <PortableText value={content} />}
            </div>
          )
        })}
      </div>

    </section>
  )
}

