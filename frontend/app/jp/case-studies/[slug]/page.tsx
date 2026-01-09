import type {Metadata} from 'next'
import {notFound} from 'next/navigation'

import PageBuilderPage from '@/app/components/PageBuilder'
import {sanityFetch} from '@/sanity/lib/live'
import {getCaseStudyQueryByJpSlug, caseStudySlugs} from '@/sanity/lib/queries'
import {GetPageQueryResult} from '@/sanity.types'
import CaseStudyHeader from '@/app/partials/CaseStudyHeader'

type Props = {
  params: Promise<{slug: string}>
}

/**
 * Generate the static params for the page.
 */
export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: caseStudySlugs,
    perspective: 'published',
    stega: false,
  })
  return (data || [])
    .map((item: any) => ({slug: item.jpSlug}))
    .filter((item: any) => item.slug)
}

/**
 * Generate metadata for the page.
 */
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const {data: caseStudy} = await sanityFetch({
    query: getCaseStudyQueryByJpSlug,
    params,
    stega: false,
  })

  const title = caseStudy?.title?.jp || caseStudy?.title?.en || 'Case Study'

  return {
    title,
    description: caseStudy?.projectOutline?.jp || caseStudy?.projectOutline?.en,
  } satisfies Metadata
}

export default async function CaseStudyPage(props: Props) {
  const params = await props.params
  const [{data: caseStudy}] = await Promise.all([
    sanityFetch({query: getCaseStudyQueryByJpSlug, params}),
  ])

  if (!caseStudy?._id) {
    return notFound()
  }

  // Transform case study data to match PageBuilderPage expected format
  const pageData = {
    ...caseStudy,
    _type: 'caseStudy' as const,
    pageBuilder: caseStudy.pageBuilder || [],
  }

  return (
    <div>
      <CaseStudyHeader caseStudy={caseStudy} language="jp" />
      <PageBuilderPage page={pageData as GetPageQueryResult} />
    </div>
  )
}

