import {defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons'

/**
 * Industry document schema.
 * Used to categorize clients by their industry sector.
 */

export const industry = defineType({
  name: 'industry',
  title: 'Industry',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Industry Name',
      type: 'localisedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localisedBlockContent',
    }),
  ],
  preview: {
    select: {
      en: 'name.en',
      jp: 'name.jp',
    },
    prepare({en, jp}) {
      return {
        title: en || jp || 'Untitled Industry',
        subtitle: jp && en ? jp : undefined,
      }
    },
  },
})

