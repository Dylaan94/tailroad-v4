import {defineField, defineType} from 'sanity'

/**
 * Text Columns component schema for the page builder.
 * Displays multiple columns of text content with optional header.
 */

export const textColumns = defineType({
  name: 'textColumns',
  title: 'Text Columns',
  type: 'object',
  
  groups: [
    {name: 'header', title: 'Header', default: true},
    {name: 'columns', title: 'Columns'},
  ],
  fields: [
    // Optional Header
    defineField({
      name: 'header',
      title: 'Header',
      type: 'localisedHeader',
      group: 'header',
      description: 'Optional header above the columns',
    }),
    // Columns
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'array',
      group: 'columns',
      of: [
        {
          type: 'object',
          name: 'column',
          title: 'Column',
          fields: [
            defineField({
              name: 'content',
              title: 'Content',
              type: 'localisedBlockContent',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              contentEn: 'content.en',
              contentJp: 'content.jp',
            },
            prepare({contentEn, contentJp}) {
              const hasContent = (contentEn && contentEn.length > 0) || (contentJp && contentJp.length > 0)
              return {
                title: hasContent ? 'Column with content' : 'Empty column',
                subtitle: 'Text Column',
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(4).error('Please add between 1 and 4 columns'),
    }),
  ],
  preview: {
    select: {
      headerEn: 'header.en',
      headerJp: 'header.jp',
      columnCount: 'columns',
    },
    prepare({headerEn, headerJp, columnCount}) {
      const count = Array.isArray(columnCount) ? columnCount.length : 0
      return {
        title: headerEn || headerJp || 'Text Columns',
        subtitle: `${count} ${count === 1 ? 'column' : 'columns'}`,
      }
    },
  },
})

