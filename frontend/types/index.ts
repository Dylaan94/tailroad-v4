/**
 * Shared types for the frontend application.
 * Import from '@/types' to use these types across components.
 */

// ============================================
// Localisation Types
// ============================================

export type LocalisedString = {
  en?: string
  jp?: string
}

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type LocalisedHeader = LocalisedString & {
  headingLevel?: HeadingLevel
}

export type LocalisedBlockContent = {
  en?: any[]
  jp?: any[]
}

// ============================================
// Sanity Asset Types
// ============================================

export type SanityImage = {
  asset?: any
  alt?: string | LocalisedString
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export type SanityLink = {
  _type?: 'link'
  linkType?: 'href' | 'page' | 'post'
  href?: string
  page?: string
  post?: string
  openInNewTab?: boolean
}

// ============================================
// Client Types
// ============================================

export type Client = {
  _id: string
  companyName?: LocalisedString
  logo?: {
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
  testimonial?: LocalisedBlockContent
  testimonialAuthor?: LocalisedString
  testimonialAuthorRole?: LocalisedString
  image?: SanityImage
}

// ============================================
// Page Builder Block Types
// ============================================

export type BaseBlock = {
  _key: string
  _type: string
}

export type Button = {
  _key: string
  text?: LocalisedString
  link?: SanityLink
  variant?: 'primary' | 'secondary'
}

export type HeroBlock = BaseBlock & {
  _type: 'hero'
  header?: LocalisedHeader
  content?: LocalisedBlockContent
  buttons?: Button[]
  backgroundType?: 'none' | 'image' | 'video'
  backgroundImage?: SanityImage
  backgroundVideo?: string
  overlayOpacity?: number
  showClientMarquee?: boolean
  clientMarqueeTitle?: LocalisedString
}

export type CallToActionBlock = BaseBlock & {
  _type: 'callToAction'
  heading?: string
  text?: string
  buttonText?: string
  link?: SanityLink
}

export type InfoSectionBlock = BaseBlock & {
  _type: 'infoSection'
  heading?: string
  content?: any[]
}

export type ServiceLink = {
  _key: string
  title?: LocalisedString
  link?: SanityLink
}

export type ServiceColumn = {
  title?: LocalisedString
  links?: ServiceLink[]
}

export type ServicesColumnsBlock = BaseBlock & {
  _type: 'servicesColumns'
  header?: LocalisedHeader
  content?: LocalisedBlockContent
  column1?: ServiceColumn
  column2?: ServiceColumn
}

export type PageBuilderBlock = HeroBlock | CallToActionBlock | InfoSectionBlock | ServicesColumnsBlock

// ============================================
// Component Props Types
// ============================================

export type BlockRendererProps = {
  index: number
  block: BaseBlock
  pageId: string
  pageType: string
  clients?: Client[]
}

export type HeroProps = {
  block: HeroBlock
  index: number
  clients?: Client[]
}

export type ServicesColumnsProps = {
  block: ServicesColumnsBlock
  index: number
}

// ============================================
// Navigation Types
// ============================================

export type MegamenuLink = {
  _key: string
  label?: LocalisedString
  description?: LocalisedString
  link?: SanityLink
  icon?: SanityImage
}

export type MegamenuColumn = {
  _key: string
  title?: LocalisedString
  links?: MegamenuLink[]
}

export type NavItem = {
  _key: string
  label?: LocalisedString
  link?: SanityLink
  hasMegamenu?: boolean
  megamenu?: MegamenuColumn[]
}

export type NavbarCta = {
  label?: LocalisedString
  link?: SanityLink
}

export type NavbarData = {
  title?: string
  logo?: SanityImage
  navbar?: NavItem[]
  navbarCta?: NavbarCta
}

// ============================================
// Page Data Types
// ============================================

export type PageBuilderSection = {
  _key: string
  _type: string
}

export type PageData = {
  _id: string
  _type: string
  pageBuilder?: PageBuilderSection[]
  clients?: Client[]
}

