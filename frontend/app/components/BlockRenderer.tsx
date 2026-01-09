import React from 'react'

import Cta from '@/app/components/Cta'
import Info from '@/app/components/InfoSection'
import Hero from '@/app/components/Hero'
import ServicesColumns from '@/app/components/ServicesColumns'
import CaseStudies from '@/app/components/CaseStudies'
import FAQ from '@/app/components/FAQ'
import TextColumns from '@/app/components/TextColumns'
import { dataAttr } from '@/sanity/lib/utils'
import type { BaseBlock, BlockRendererProps } from '@/types'

type BlocksType = {
  [key: string]: React.FC<any>
}

const Blocks: BlocksType = {
  callToAction: Cta,
  infoSection: Info,
  hero: Hero,
  servicesColumns: ServicesColumns,
  caseStudies: CaseStudies,
  faq: FAQ,
  textColumns: TextColumns,
}

/**
 * Used by the <PageBuilder>, this component renders a the component that matches the block type.
 */
export default function BlockRenderer({ block, index, pageId, pageType, clients, caseStudiesData }: BlockRendererProps) {
  // Block does exist
  if (typeof Blocks[block._type] !== 'undefined') {
    return (
      <div
        key={block._key}
        data-sanity={dataAttr({
          id: pageId,
          type: pageType,
          path: `pageBuilder[_key=="${block._key}"]`,
        }).toString()}
      >
        {React.createElement(Blocks[block._type], {
          key: block._key,
          block: block,
          index: index,
          clients: clients,
          caseStudiesData: caseStudiesData,
        })}
      </div>
    )
  }
  // Block doesn't exist yet
  return React.createElement(
    () => (
      <div className="w-full bg-gray-100 text-center text-gray-500 p-20 rounded">
        A &ldquo;{block._type}&rdquo; block hasn&apos;t been created
      </div>
    ),
    { key: block._key },
  )
}
