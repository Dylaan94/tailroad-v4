'use client'

import {PortableText} from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'

import {DynamicHeading, sanitizeHeadingLevel} from '@/app/components/DynamicHeading'
import ResolvedLink from '@/app/components/ResolvedLink'
import {useLanguage} from '@/app/contexts/LanguageContext'
import {urlForImage} from '@/sanity/lib/utils'
import type {CaseStudiesProps, LocalisedString} from '@/types'

const headingStyles = {
  h1: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
  h2: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
  h3: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
  h4: 'text-lg sm:text-xl md:text-2xl lg:text-3xl',
  h5: 'text-lg sm:text-xl md:text-2xl lg:text-3xl',
  h6: 'text-lg sm:text-xl md:text-2xl lg:text-3xl',
}

type CaseStudy = {
  _id: string
  title?: LocalisedString
  slug?: {
    current?: string
  }
  jpSlug?: {
    current?: string
  }
  featuredImage?: {
    asset?: any
    alt?: LocalisedString
  }
  industries?: Array<{
    _id: string
    name?: LocalisedString
  }>
  services?: Array<{
    _id: string
    name?: LocalisedString
  }>
  projectOutline?: any
}

export default function CaseStudies({block, caseStudiesData}: CaseStudiesProps) {
  const {header, button, selectionType, caseStudies: selectedCaseStudies} = block
  const {language, getLocalisedString, getLocalisedContent} = useLanguage()
  const prefix = language === 'jp' ? '/jp' : ''

  const headingLevel = sanitizeHeadingLevel(header?.headingLevel)
  const headerText = getLocalisedString(header)
  const buttonText = getLocalisedString(button?.text)

  // Determine which case studies to display
  // If selectionType is 'all', use caseStudiesData (fetched separately)
  // If 'manual', use the selectedCaseStudies from the block
  let caseStudiesToDisplay: CaseStudy[] = []
  
  if (selectionType === 'all') {
    caseStudiesToDisplay = Array.isArray(caseStudiesData) ? caseStudiesData : []
  } else {
    // Manual selection - use the case studies from the block
    caseStudiesToDisplay = Array.isArray(selectedCaseStudies) 
      ? selectedCaseStudies.filter((cs: any) => cs && cs._id) 
      : []
  }

  const getCaseStudyUrl = (caseStudy: CaseStudy) => {
    const slug = language === 'jp' ? caseStudy.jpSlug?.current : caseStudy.slug?.current
    return slug ? `${prefix}/case-studies/${slug}` : '#'
  }

  return (
    <section className="py-20 px-5 md:px-10">
        {/* Header & Button */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
          {headerText && (
            <DynamicHeading
              level={headingLevel}
              className={`font-bold tracking-tight md:w-[40%] w-full ${headingStyles[headingLevel]} text-gray-900 `}
            >
              {headerText}
            </DynamicHeading>
          )}
          {button && buttonText && (
            <ResolvedLink
              link={button.link}
              className="px-6 py-3 text-sm font-medium text-white bg-black rounded-full hover:bg-gray-800 transition-colors whitespace-nowrap"
            >
              {buttonText}
            </ResolvedLink>
          )}
        </div>

        {/* Case Studies Cards Grid */}
        {caseStudiesToDisplay.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudiesToDisplay.map((caseStudy: CaseStudy) => {
              const title = getLocalisedString(caseStudy.title)
              const imageAlt = getLocalisedString(caseStudy.featuredImage?.alt) || title || 'Case study image'
              const url = getCaseStudyUrl(caseStudy)
              const projectOutline = getLocalisedContent(caseStudy.projectOutline)

              return (
                <Link
                  key={caseStudy._id}
                  href={url}
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Featured Image */}
                  <div className="relative w-full aspect-4/3 overflow-hidden bg-gray-100">
                    {caseStudy.featuredImage?.asset ? (
                      <Image
                        src={urlForImage(caseStudy.featuredImage)?.width(800).height(600).url() || ''}
                        alt={imageAlt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col p-6">
                    {/* Tags - Above Title */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {/* Industry Tags */}
                      {caseStudy.industries && caseStudy.industries.length > 0 && (
                        <>
                          {caseStudy.industries.map((industry) => {
                            const industryName = getLocalisedString(industry.name)
                            return industryName ? (
                              <button
                                key={industry._id}
                                type="button"
                                className="inline-flex items-center px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                                onClick={(e) => e.preventDefault()}
                              >
                                {industryName}
                              </button>
                            ) : null
                          })}
                        </>
                      )}

                      {/* Service Tags */}
                      {caseStudy.services && caseStudy.services.length > 0 && (
                        <>
                          {caseStudy.services.map((service) => {
                            const serviceName = getLocalisedString(service.name)
                            return serviceName ? (
                              <button
                                key={service._id}
                                type="button"
                                className="inline-flex items-center px-3 py-1 text-xs font-medium bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                                onClick={(e) => e.preventDefault()}
                              >
                                {serviceName}
                              </button>
                            ) : null
                          })}
                        </>
                      )}
                    </div>

                
                    {title ? (
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-black transition-colors">
                        {title}
                      </h3>
                    ) : null}
                    
        
                    {projectOutline ? (
                      <div className="prose prose-sm max-w-none text-gray-600 line-clamp-3">
                        <PortableText value={projectOutline as any} />
                      </div>
                    ) : null}
            
                  </div>
                  
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No case studies found.</p>
          </div>
        )}

    </section>
  )
}

