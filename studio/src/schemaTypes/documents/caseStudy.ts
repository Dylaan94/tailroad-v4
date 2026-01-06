import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

import {pageBuilderField} from '../fields/pageBuilder'

/**
 * Case Study schema. Similar to pages but with additional fields for industries and services.
 */

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localisedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (English)',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: (doc: any) => doc.title?.en || doc.title?.jp || 'untitled',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'jpSlug',
      title: 'Slug (Japanese)',
      type: 'slug',
      description: 'Japanese version of the slug. If not set, will use the English slug.',
      options: {
        source: (doc: any) => doc.title?.en || doc.title?.jp || 'untitled',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'localisedString',
          description: 'Important for accessibility and SEO',
        }),
      ],
    }),
    defineField({
      name: 'industries',
      title: 'Industries',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'industry'}],
        },
      ],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'service'}],
        },
      ],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'projectOutline',
      title: 'Project Outline',
      type: 'localisedBlockContent',
      description: 'Brief text outlining the project that appears in the case studies list',
    }),
    pageBuilderField,
  ],
  preview: {
    select: {
      en: 'title.en',
      jp: 'title.jp',
      media: 'featuredImage',
    },
    prepare({en, jp, media}) {
      return {
        title: en || jp || 'Untitled Case Study',
        subtitle: jp && en ? jp : undefined,
        media,
      }
    },
  },
})

