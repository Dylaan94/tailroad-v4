'use client'

import {SanityDocument} from 'next-sanity'
import {useOptimistic} from 'next-sanity/hooks'
import Link from 'next/link'

import BlockRenderer from '@/app/components/BlockRenderer'
import {GetPageQueryResult} from '@/sanity.types'
import {dataAttr} from '@/sanity/lib/utils'
import {studioUrl} from '@/sanity/lib/api'
import type {Client, PageBuilderSection, PageData, CaseStudy} from '@/types'

type PageBuilderPageProps = {
  page: GetPageQueryResult & { clients?: Client[]; caseStudiesData?: any[] }
}

/**
 * The PageBuilder component is used to render the blocks from the `pageBuilder` field in the Page type in your Sanity Studio.
 */

function renderSections(pageBuilderSections: PageBuilderSection[], page: GetPageQueryResult & { clients?: Client[]; caseStudiesData?: CaseStudy[] }) {
  if (!page) {
    return null
  }
  
  // Extract case studies data from blocks that need it
  const allCaseStudies: CaseStudy[] = []
  pageBuilderSections.forEach((block: any) => {
    if (block._type === 'caseStudies') {
      if (block.selectionType === 'all') {
        // For "all" selection, we'll need to fetch all case studies
        // This will be handled by the query, but we can also extract from block if available
        if (block.caseStudies && Array.isArray(block.caseStudies)) {
          allCaseStudies.push(...block.caseStudies)
        }
      } else if (block.caseStudies && Array.isArray(block.caseStudies)) {
        allCaseStudies.push(...block.caseStudies)
      }
    }
  })
  
  return (
    <div
      data-sanity={dataAttr({
        id: page._id,
        type: page._type,
        path: `pageBuilder`,
      }).toString()}
    >
      {pageBuilderSections.map((block: any, index: number) => {
        // Get case studies data for this specific block if it's a caseStudies block
        let blockCaseStudiesData: CaseStudy[] | undefined
        if (block._type === 'caseStudies') {
          if (block.selectionType === 'all') {
            blockCaseStudiesData = page.caseStudiesData
          } else {
            blockCaseStudiesData = block.caseStudies
          }
        }
        
        return (
          <BlockRenderer
            key={block._key}
            index={index}
            block={block}
            pageId={page._id}
            pageType={page._type}
            clients={page.clients}
            caseStudiesData={blockCaseStudiesData}
          />
        )
      })}
    </div>
  )
}

function renderEmptyState(page: GetPageQueryResult) {
  if (!page) {
    return null
  }
  return (
    <div className="container">
      <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
        This page has no content!
      </h1>
      <p className="mt-2 text-base text-gray-500">Open the page in Sanity Studio to add content.</p>
      <div className="mt-10 flex">
        <Link
          className="rounded-full flex gap-2 mr-6 items-center bg-black hover:bg-brand focus:bg-blue py-3 px-6 text-white transition-colors duration-200"
          href={`${studioUrl}/structure/intent/edit/template=page;type=page;path=pageBuilder;id=${page._id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Add content to this page
        </Link>
      </div>
    </div>
  )
}

export default function PageBuilder({page}: PageBuilderPageProps) {
  const pageBuilderSections = useOptimistic<
    PageBuilderSection[] | undefined,
    SanityDocument<PageData>
  >(page?.pageBuilder || [], (currentSections, action) => {
    // The action contains updated document data from Sanity
    // when someone makes an edit in the Studio

    // If the edit was to a different document, ignore it
    if (action.id !== page?._id) {
      return currentSections
    }

    // If there are sections in the updated document, use them
    if (action.document.pageBuilder) {
      // Reconcile References. https://www.sanity.io/docs/enabling-drag-and-drop#ffe728eea8c1
      return action.document.pageBuilder.map(
        (section) => currentSections?.find((s) => s._key === section?._key) || section,
      )
    }

    // Otherwise keep the current sections
    return currentSections
  })

  if (!page) {
    return renderEmptyState(page)
  }

  return pageBuilderSections && pageBuilderSections.length > 0
    ? renderSections(pageBuilderSections, page)
    : renderEmptyState(page)
}
