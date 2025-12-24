import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

import {pageBuilderField} from '../fields/pageBuilder'

/**
 * Page schema.  Define and edit the fields for the 'page' content type.
 * Learn more: https://www.sanity.io/docs/schema-types
 */

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug (English)',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'jpSlug',
      title: 'Slug (Japanese)',
      type: 'slug',
      description: 'Japanese version of the slug. If not set, will use the English slug.',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    pageBuilderField,
  ],
})
