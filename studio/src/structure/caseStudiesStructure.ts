import {DocumentIcon, TagIcon, BoltIcon, FolderIcon} from '@sanity/icons'
import {StructureBuilder} from 'sanity/structure'

/**
 * Case Studies structure.
 * Groups Case Studies, Industries, and Services under one collection.
 */
export const caseStudiesStructure = (S: StructureBuilder) => {
  return S.listItem()
    .title('Case Studies')
    .icon(FolderIcon)
    .child(
      S.list()
        .title('Case Studies')
        .items([
          S.listItem()
            .title('Case Studies')
            .icon(DocumentIcon)
            .schemaType('caseStudy')
            .child(S.documentTypeList('caseStudy').title('Case Studies')),
          S.listItem()
            .title('Industries')
            .icon(TagIcon)
            .schemaType('industry')
            .child(S.documentTypeList('industry').title('Industries')),
          S.listItem()
            .title('Services')
            .icon(BoltIcon)
            .schemaType('service')
            .child(S.documentTypeList('service').title('Services')),
        ])
    )
}

