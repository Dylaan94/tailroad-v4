import {defineField, defineType} from 'sanity'
import {ListIcon} from '@sanity/icons'  

/**
 * Services Columns schema object for the page builder.
 * Displays a header on the left, content and two columns of links on the right.
 */

export const servicesColumns = defineType({
  name: 'servicesColumns',
  title: 'Services Columns',
  type: 'object',
  icon: ListIcon,
  groups: [
    {name: 'header', title: 'Header', default: true},
    {name: 'content', title: 'Content'},
    {name: 'columns', title: 'Columns'},
  ],
  fields: [
    // Header
    defineField({
      name: 'header',
      title: 'Header',
      type: 'localisedHeader',
      group: 'header',
    }),
    // Content
    defineField({
      name: 'content',
      title: 'Content',
      type: 'localisedBlockContent',
      group: 'content',
    }),
    // Columns
    defineField({
      name: 'column1',
      title: 'Column 1',
      type: 'object',
      group: 'columns',
      fields: [
        defineField({
          name: 'title',
          title: 'Column Title',
          type: 'localisedString',
        }),
        defineField({
          name: 'links',
          title: 'Links',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'serviceLink',
              title: 'Service Link',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Link Title',
                  type: 'localisedString',
                  validation: (Rule) => Rule.required(),
                  description: 'Custom title for this link (not automatically taken from page)',
                }),
                defineField({
                  name: 'link',
                  title: 'Link',
                  type: 'link',
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {
                  en: 'title.en',
                  jp: 'title.jp',
                },
                prepare({en, jp}) {
                  return {
                    title: en || jp || 'Untitled Link',
                  }
                },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'column2',
      title: 'Column 2',
      type: 'object',
      group: 'columns',
      fields: [
        defineField({
          name: 'title',
          title: 'Column Title',
          type: 'localisedString',
        }),
        defineField({
          name: 'links',
          title: 'Links',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'serviceLink',
              title: 'Service Link',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Link Title',
                  type: 'localisedString',
                  validation: (Rule) => Rule.required(),
                  description: 'Custom title for this link (not automatically taken from page)',
                }),
                defineField({
                  name: 'link',
                  title: 'Link',
                  type: 'link',
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {
                  en: 'title.en',
                  jp: 'title.jp',
                },
                prepare({en, jp}) {
                  return {
                    title: en || jp || 'Untitled Link',
                  }
                },
              },
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      headerEn: 'header.en',
      headerJp: 'header.jp',
    },
    prepare({headerEn, headerJp}) {
      return {
        title: headerEn || headerJp || 'Services Columns',
        subtitle: 'Services Columns',
      }
    },
  },
})

