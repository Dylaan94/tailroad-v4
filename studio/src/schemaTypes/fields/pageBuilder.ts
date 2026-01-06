import {defineField} from 'sanity'

/**
 * Reusable pageBuilder field definition.
 * Import and spread this into any document's fields array.
 */
export const pageBuilderField = defineField({
  name: 'pageBuilder',
  title: 'Page builder',
  type: 'array',
  of: [{type: 'hero'}, {type: 'callToAction'}, {type: 'infoSection'}, {type: 'servicesColumns'}, {type: 'caseStudies'}, {type: 'faq'}],
  options: {
    insertMenu: {
      views: [
        {
          name: 'grid',
          previewImageUrl: (schemaTypeName) =>
            `/static/page-builder-thumbnails/${schemaTypeName}.webp`,
        },
      ],
    },
  },
})

