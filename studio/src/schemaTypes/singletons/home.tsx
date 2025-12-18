import {HomeIcon} from '@sanity/icons'
import {defineType, defineField} from 'sanity'

import {pageBuilderField} from '../fields/pageBuilder'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localisedString',
    }),
    // TODO: Create SEO fields
    pageBuilderField,
  ],
  preview: {
    select: {
      en: 'title.en',
      jp: 'title.jp',
    },
    prepare({en, jp}) {
      const titles = [en, jp].filter(Boolean).join(', ')
      return {
        title: titles || 'Home Page',
      }
    },
  },
})
