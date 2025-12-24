import type {HeadingLevel} from '@/types'

const validHeadingLevels: HeadingLevel[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

export function sanitizeHeadingLevel(level: string | undefined): HeadingLevel {
  if (!level) return 'h1'
  // Extract valid heading level, stripping any stega encoding characters
  const match = level.match(/h[1-6]/)
  if (match && validHeadingLevels.includes(match[0] as HeadingLevel)) {
    return match[0] as HeadingLevel
  }
  return 'h1'
}

export function DynamicHeading({
  level = 'h1',
  children,
  className,
}: {
  level?: HeadingLevel | string
  children: React.ReactNode
  className?: string
}) {
  // Ensure the tag name is sanitized to prevent stega encoding issues
  const Tag = sanitizeHeadingLevel(level as string)
  return <Tag className={className}>{children}</Tag>
}

