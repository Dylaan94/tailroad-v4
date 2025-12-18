import {defineField, defineType} from 'sanity'
import {BoltIcon} from '@sanity/icons'

/**
 * Service document schema.
 * Used to define services offered to clients.
 */

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: BoltIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Service Name',
      type: 'localisedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localisedBlockContent',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      description: 'Optional icon for this service',
    }),
  ],
  preview: {
    select: {
      en: 'name.en',
      jp: 'name.jp',
      media: 'icon',
    },
    prepare({en, jp, media}) {
      return {
        title: en || jp || 'Untitled Service',
        subtitle: jp && en ? jp : undefined,
        media,
      }
    },
  },
})

