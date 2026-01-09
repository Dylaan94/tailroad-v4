import Image from 'next/image'
import {urlForImage} from '@/sanity/lib/utils'
import type {CaseStudyHeaderProps} from '@/types'
import AnimatedBackground from '@/app/components/AnimatedBackground'


// Server-side localization utility (no hooks needed)
function getLocalisedString(
  localised?: {en?: string; jp?: string},
  language: 'en' | 'jp' = 'en'
): string | undefined {
  if (!localised) return undefined
  return language === 'jp' ? localised.jp || localised.en : localised.en || localised.jp
}

export default function CaseStudyHeader({caseStudy, language = 'en'}: CaseStudyHeaderProps) {
  
  const title = getLocalisedString(caseStudy.title, language)
  const clientName = getLocalisedString(caseStudy.client?.companyName, language)
  const logoAlt = getLocalisedString(caseStudy.client?.logo?.alt, language) || clientName || 'Client logo'
  const imageAlt = getLocalisedString(caseStudy.featuredImage?.alt, language) || title || 'Case study featured image'

  return (
    <header className="pt-24 px-5 md:px-10 border-b border-gray-100">
      <div className=" mx-auto">
        <div className="flex justify-between">
          {/* Title */}
          {title && (
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-8">
              {title}
            </h1>
          )}

          {/* Client Info */}
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
            {/* Client Logo & Name */}
            {caseStudy.client && (
              <div className="flex-col items-center gap-4">
                {caseStudy.client.logo?.asset && (
                  <div className="relative h-12 w-auto">
                    <Image
                      src={urlForImage(caseStudy.client.logo)?.width(200).height(80).url() || ''}
                      alt={'image for client: ' + clientName}
                      width={200}
                      height={80}
                      className="h-12 w-auto object-contain"
                    />
                  </div>
                )}
                
              </div>
            )}
          </div>
        </div>

        {/* Industries & Services Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {/* Industries */}
          {caseStudy.industries && caseStudy.industries.length > 0 && (
            <>
              {caseStudy.industries.map((industry, index) => {
                const industryName = getLocalisedString(industry.name, language)
                return industryName ? (
                  <span key={industry._id} className="flex items-center">
                    <span className="text-sm font-mono uppercase text-gray-400 tracking-wider">
                      {industryName}
                    </span>
                    {(index < caseStudy.industries!.length - 1 || (caseStudy.services && caseStudy.services.length > 0)) && (
                      <span className="mx-2 text-gray-400">|</span>
                    )}
                  </span>
                ) : null
              })}
            </>
          )}

          {/* Services */}
          {caseStudy.services && caseStudy.services.length > 0 && (
            <>
              {caseStudy.services.map((service, index) => {
                const serviceName = getLocalisedString(service.name, language)
                return serviceName ? (
                  <span key={service._id} className="flex items-center">
                    <span className="text-sm font-mono uppercase text-gray-400 tracking-wider">
                      {serviceName}
                    </span>
                    {index < caseStudy.services!.length - 1 && (
                      <span className="mx-2 text-gray-400">|</span>
                    )}
                  </span>
                ) : null
              })}
            </>
          )}
        </div>

        {/* Featured Image */}
        {caseStudy.featuredImage?.asset && (
          <div className="relative w-screen -mx-5 md:-mx-10 min-h-[60vh] overflow-hidden">
            <AnimatedBackground />
            <div className="relative z-10 w-full h-full p-8 md:p-12 lg:p-16">
              <div className="relative w-full h-full max-w-5xl mx-auto aspect-video">
                <Image
                  src={urlForImage(caseStudy.featuredImage)?.url() || ''}
                  alt={imageAlt}
                  fill
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
