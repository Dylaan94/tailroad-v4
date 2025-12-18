'use client'

import {PortableText} from '@portabletext/react'
import Image from 'next/image'

import ResolvedLink from '@/app/components/ResolvedLink'
import {urlForImage} from '@/sanity/lib/utils'

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

type LocalisedString = {
  en?: string
  jp?: string
}

type LocalisedHeader = LocalisedString & {
  headingLevel?: HeadingLevel
}

type LocalisedBlockContent = {
  en?: any[]
  jp?: any[]
}

type Button = {
  _key: string
  text?: LocalisedString
  link?: any
  variant?: 'primary' | 'secondary'
}

type HeroBlock = {
  _key: string
  _type: 'hero'
  header?: LocalisedHeader
  content?: LocalisedBlockContent
  buttons?: Button[]
  backgroundType?: 'none' | 'image' | 'video'
  backgroundImage?: {
    asset?: any
    alt?: string
  }
  backgroundVideo?: string
  overlayOpacity?: number
}

type HeroProps = {
  block: HeroBlock
  index: number
}

const headingStyles: Record<HeadingLevel, string> = {
  h1: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
  h2: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
  h3: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
  h4: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
  h5: 'text-lg sm:text-xl md:text-2xl lg:text-3xl',
  h6: 'text-lg sm:text-xl md:text-2xl lg:text-3xl',
}

const validHeadingLevels: HeadingLevel[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

function sanitizeHeadingLevel(level: string | undefined): HeadingLevel {
  if (!level) return 'h1'
  // Extract valid heading level, stripping any stega encoding characters
  const match = level.match(/h[1-6]/)
  if (match && validHeadingLevels.includes(match[0] as HeadingLevel)) {
    return match[0] as HeadingLevel
  }
  return 'h1'
}

function DynamicHeading({
  level = 'h1',
  children,
  className,
}: {
  level?: HeadingLevel
  children: React.ReactNode
  className?: string
}) {
  // Ensure the tag name is sanitized to prevent stega encoding issues
  const Tag = sanitizeHeadingLevel(level)
  return <Tag className={className}>{children}</Tag>
}

export default function Hero({block}: HeroProps) {
  const {header, content, buttons, backgroundType, backgroundImage, backgroundVideo, overlayOpacity = 50} = block

  const hasBackground = backgroundType === 'image' || backgroundType === 'video'
  const textColor = hasBackground ? 'text-white' : 'text-gray-900'
  const headingLevel = sanitizeHeadingLevel(header?.headingLevel)

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
          alt={backgroundImage.alt || ''}
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
      <div className="relative z-10 flex w-full px-5 md:px-10 h-screen">
        <div className="max-w-4xl space-y-8 w-[40%] mt-auto mb-16">
          {/* Header */}
          {header && (header.en || header.jp) && (
            <div className="space-y-2">
              {header.en && (
                <DynamicHeading
                  level={headingLevel}
                  className={`font-bold tracking-tight ${headingStyles[headingLevel]} ${textColor}`}
                >
                  {header.en}
                </DynamicHeading>
              )}
 
            </div>
          )}

          {/* Content */}
          {content && (content.en || content.jp) && (
            <div className={`prose  ${hasBackground ? 'prose-invert' : ''} w-[70%]`}>
              {content.en && <PortableText value={content.en} />}
              {content.jp && (
                <div className={`mt-4 ${hasBackground ? 'text-white/70' : 'text-gray-500'}`}>
                  <PortableText value={content.jp} />
                </div>
              )}
            </div>
          )}

          {/* Buttons */}
          {buttons && buttons.length > 0 && (
            <div className="flex flex-wrap items-center justify-start gap-4">
              {buttons.map((button) => {
                const buttonText = button.text?.en || button.text?.jp || 'Button'
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
        <div className="w-2/3"></div>
      </div>
    </section>
  )
}

