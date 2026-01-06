'use client'

import {PortableText} from '@portabletext/react'
import Image from 'next/image'
import Marquee from 'react-fast-marquee'

import ResolvedLink from '@/app/components/ResolvedLink'
import {DynamicHeading, sanitizeHeadingLevel} from '@/app/components/DynamicHeading'
import {useLanguage} from '@/app/contexts/LanguageContext'
import {urlForImage} from '@/sanity/lib/utils'
import type {HeadingLevel, LocalisedString, Client, HeroProps} from '@/types'

const headingStyles: Record<HeadingLevel, string> = {
  h1: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
  h2: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
  h3: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
  h4: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
  h5: 'text-lg sm:text-xl md:text-2xl lg:text-3xl',
  h6: 'text-lg sm:text-xl md:text-2xl lg:text-3xl',
}

function ClientMarquee({ clients, title, hasBackground, getLocalisedString }: { clients: Client[], title?: LocalisedString, hasBackground: boolean, getLocalisedString: (localised?: {en?: string; jp?: string}) => string | undefined }) {
  const titleText = getLocalisedString(title)
  
  return (
    <div className="flex flex-col justify-end pb-16 h-full w-full">
      {titleText && (
        <p className={`text-sm uppercase tracking-widest mb-6 ${hasBackground ? 'text-white/60' : 'text-gray-400'}`}>
          {titleText}
        </p>
      )}
      <Marquee
        speed={40}
        gradient={false}
        pauseOnHover
      >
        {clients.map((client) => (
          <div
            key={client._id}
            className="mx-8"
          >
            {client.logo?.asset && (
              <Image
                src={urlForImage(client.logo)?.url() || ''}
                width={150}
                height={50}
                objectFit="contain"
                
                alt={client.logo.alt?.en || client.companyName?.en || 'Client logo'}
                className={`  ${hasBackground ? 'brightness-0 invert opacity-70' : 'opacity-60 grayscale'} hover:opacity-100 hover:grayscale-0 transition-all duration-300`}
              />
            )}
          </div>
        ))}
      </Marquee>
    </div>
  )
}

export default function Hero({block, clients}: HeroProps) {
  const {header, content, buttons, backgroundType, backgroundImage, backgroundVideo, overlayOpacity = 50, showClientMarquee, clientMarqueeTitle} = block
  const {getLocalisedString, getLocalisedContent} = useLanguage()

  const hasBackground = backgroundType === 'image' || backgroundType === 'video'
  const textColor = hasBackground ? 'text-white' : 'text-gray-900'
  const headingLevel = sanitizeHeadingLevel(header?.headingLevel)
  
  const headerText = getLocalisedString(header)
  const contentValue = getLocalisedContent(content)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      {backgroundType === 'video' && backgroundVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      )}

      {backgroundType === 'image' && backgroundImage?.asset && (
        <Image
          src={urlForImage(backgroundImage)?.width(1920).height(1080).url() || ''}
          alt={typeof backgroundImage.alt === 'string' ? backgroundImage.alt : backgroundImage.alt?.en || ''}
          fill
          className="object-cover"
          priority
        />
      )}

      {/* Overlay */}
      {hasBackground && (
        <div
          className="absolute inset-0 bg-black"
          style={{opacity: overlayOpacity / 100}}
        />
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row w-full px-5 md:px-10 h-screen justify-between">
        <div className="max-w-4xl space-y-8 md:w-[40%] w-full mt-auto mb-16">
          {/* Header */}
          {headerText && (
            <div className="space-y-2">
              <DynamicHeading
                level={headingLevel}
                className={`font-bold tracking-tight ${headingStyles[headingLevel]} ${textColor}`}
              >
                {headerText}
              </DynamicHeading>
            </div>
          )}

          {/* Content */}
          {contentValue && (
            <div className={`prose text-gray-400  ${hasBackground ? 'prose-invert' : ''} sm:w-[70%] w-full`}>
              <PortableText value={contentValue} />
            </div>
          )}

          {/* Buttons */}
          {buttons && buttons.length > 0 && (
            <div className="flex flex-wrap items-center justify-start gap-4">
              {buttons.map((button) => {
                const buttonText = getLocalisedString(button.text) || 'Button'
                const isPrimary = button.variant !== 'secondary'

                return (
                  <ResolvedLink
                    key={button._key}
                    link={button.link}
                    className={`
                      inline-flex items-center justify-center
                      px-4 py-2 text-base font-light
                      rounded-full transition-all duration-300 ease-out
                      ${
                        isPrimary
                          ? 'bg-black text-white hover:bg-gray-800 hover:scale-105 active:scale-95'
                          : hasBackground
                            ? 'bg-transparent text-white border border-white hover:bg-white hover:text-black'
                            : 'bg-transparent text-black border border-black hover:bg-black hover:text-white'
                      }
                    `}
                  >
                    {buttonText}
                  </ResolvedLink>
                )
              })}
            </div>
          )}
        </div>
        
        {/* Client Marquee */}
        <div className="md:w-[40%] w-full flex ">
          {showClientMarquee && clients && clients.length > 0 && (
            <ClientMarquee 
              clients={clients} 
              title={clientMarqueeTitle}
              hasBackground={hasBackground}
              getLocalisedString={getLocalisedString}
            />
          )}
        </div>
      </div>
    </section>
  )
}

