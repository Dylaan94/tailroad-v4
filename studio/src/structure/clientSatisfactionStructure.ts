import {UsersIcon, TagIcon, BoltIcon, StarIcon} from '@sanity/icons'
import {StructureBuilder} from 'sanity/structure'

/**
 * Client Satisfaction structure.
 * Groups Clients, Industries, and Services under one collection.
 */
export const clientSatisfactionStructure = (S: StructureBuilder) => {
  return S.listItem()
    .title('Client Satisfaction')
    .icon(StarIcon)
    .child(
      S.list()
        .title('Client Satisfaction')
        .items([
          S.listItem()
            .title('Clients')
            .icon(UsersIcon)
            .schemaType('client')
            .child(S.documentTypeList('client').title('Clients')),
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

