import {defineField, defineType} from 'sanity'
import {UsersIcon} from '@sanity/icons'

/**
 * Client document schema.
 * Stores client information, testimonials, and relationships to industries/services.
 */

export const client = defineType({
  name: 'client',
  title: 'Client',
  type: 'document',
  icon: UsersIcon,
  groups: [
    {name: 'details', title: 'Details', default: true},
    {name: 'categories', title: 'Categories'},
    {name: 'testimonial', title: 'Testimonial'},
  ],
  fields: [
    // Details
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'localisedString',
      validation: (Rule) => Rule.required(),
      group: 'details',
    }),
    defineField({
      name: 'logo',
      title: 'Company Logo',
      type: 'image',
      group: 'details',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'localisedString',
          description: 'Alternative text for accessibility',
        }),
      ],
    }),
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      group: 'details',
      description: 'Image to display alongside the testimonial',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'localisedString',
          description: 'Alternative text for accessibility',
        }),
      ],
    }),

    // Categories
    defineField({
      name: 'industries',
      title: 'Industries',
      type: 'array',
      group: 'categories',
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
      group: 'categories',
      of: [
        {
          type: 'reference',
          to: [{type: 'service'}],
        },
      ],
      validation: (Rule) => Rule.unique(),
    }),

    // Testimonial
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'localisedBlockContent',
      group: 'testimonial',
      description: 'Client testimonial or quote',
    }),
    defineField({
      name: 'testimonialAuthor',
      title: 'Author Name',
      type: 'localisedString',
      group: 'testimonial',
      description: 'Name of the person who wrote the testimonial',
    }),
    defineField({
      name: 'testimonialAuthorRole',
      title: 'Author Role',
      type: 'localisedString',
      group: 'testimonial',
      description: 'Role/position (e.g., "CEO", "Marketing Director")',
    }),
  ],
  preview: {
    select: {
      en: 'companyName.en',
      jp: 'companyName.jp',
      media: 'logo',
      industry0: 'industries.0.name.en',
    },
    prepare({en, jp, media, industry0}) {
      return {
        title: en || jp || 'Untitled Client',
        subtitle: industry0 ? `Industry: ${industry0}` : undefined,
        media,
      }
    },
  },
})

