import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

/**
 * Case Studies component schema for the page builder.
 * Displays a grid/mosaic of case studies with filtering options.
 */

export const caseStudies = defineType({
  name: 'caseStudies',
  title: 'Case Studies',
  type: 'object',
  icon: DocumentIcon,
  groups: [
    {name: 'header', title: 'Header', default: true},
    {name: 'selection', title: 'Case Study Selection'},
  ],
  fields: [
    // Header
    defineField({
      name: 'header',
      title: 'Header',
      type: 'localisedHeader',
      group: 'header',
    }),
    // Button
    defineField({
      name: 'button',
      title: 'Button',
      type: 'object',
      group: 'header',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'localisedString',
        }),
        defineField({
          name: 'link',
          title: 'Link',
          type: 'link',
        }),
      ],
      preview: {
        select: {
          en: 'text.en',
          jp: 'text.jp',
        },
        prepare({en, jp}) {
          return {
            title: en || jp || 'Button',
          }
        },
      },
    }),
    // Selection
    defineField({
      name: 'selectionType',
      title: 'Selection Type',
      type: 'string',
      group: 'selection',
      initialValue: 'all',
      options: {
        list: [
          {title: 'All Case Studies', value: 'all'},
          {title: 'Manual Selection', value: 'manual'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'caseStudies',
      title: 'Case Studies',
      type: 'array',
      group: 'selection',
      hidden: ({parent}) => parent?.selectionType !== 'manual',
      of: [
        {
          type: 'reference',
          to: [{type: 'caseStudy'}],
        },
      ],
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent?.selectionType === 'manual' && (!value || value.length === 0)) {
            return 'Please select at least one case study when using manual selection'
          }
          return true
        }),
    }),
  ],
  preview: {
    select: {
      headerEn: 'header.en',
      headerJp: 'header.jp',
      selectionType: 'selectionType',
    },
    prepare({headerEn, headerJp, selectionType}) {
      return {
        title: headerEn || headerJp || 'Case Studies',
        subtitle: selectionType === 'manual' ? 'Manual Selection' : 'All Case Studies',
      }
    },
  },
})

