import {CogIcon} from '@sanity/icons'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import pluralize from 'pluralize-esm'
import {homeStructure} from './homeStructure'
import {clientSatisfactionStructure} from './clientSatisfactionStructure'

/**
 * Structure builder is useful whenever you want to control how documents are grouped and
 * listed in the studio or for adding additional in-studio previews or content to documents.
 * Learn more: https://www.sanity.io/docs/structure-builder-introduction
 */

// Types to hide from the auto-generated list (singletons, grouped items, internal types)
const DISABLED_TYPES = ['settings', 'assist.instruction.context', 'homePage', 'client', 'industry', 'service']

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Website Content')
    .items([
      homeStructure(S),
      S.divider(),
      ...S.documentTypeListItems()
        // Remove disabled types from the auto-generated list
        .filter((listItem: any) => !DISABLED_TYPES.includes(listItem.getId()))
        // Pluralize the title of each document type
        .map((listItem) => {
          return listItem.title(pluralize(listItem.getTitle() as string))
        }),
      S.divider(),
      clientSatisfactionStructure(S),
      // Settings Singleton
      S.listItem()
        .title('Site Settings')
        .child(S.document().schemaType('settings').documentId('siteSettings'))
        .icon(CogIcon),
    ])
