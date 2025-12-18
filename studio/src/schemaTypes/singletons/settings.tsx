import {CogIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * Settings schema Singleton.  Singletons are single documents that are displayed not in a collection, handy for things like site settings and other global configurations.
 * Learn more: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
 */

export const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'general', title: 'General', default: true},
    {name: 'navbar', title: 'Navigation'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // General
    defineField({
      name: 'title',
      description: 'Site title',
      title: 'Site Title',
      type: 'string',
      group: 'general',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'general',
      options: {
        hotspot: true,
      },
    }),

    // Navbar
    defineField({
      name: 'navbar',
      title: 'Navigation Items',
      type: 'array',
      group: 'navbar',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'navItem',
          title: 'Navigation Item',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'localisedString',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'link',
            }),
            defineField({
              name: 'hasMegamenu',
              title: 'Has Megamenu',
              type: 'boolean',
              initialValue: false,
              description: 'Enable to show a dropdown megamenu with columns',
            }),
            defineField({
              name: 'megamenu',
              title: 'Megamenu Columns',
              type: 'array',
              hidden: ({parent}) => !parent?.hasMegamenu,
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'megamenuColumn',
                  title: 'Column',
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
                        defineArrayMember({
                          type: 'object',
                          name: 'megamenuLink',
                          title: 'Link',
                          fields: [
                            defineField({
                              name: 'label',
                              title: 'Label',
                              type: 'localisedString',
                              validation: (Rule) => Rule.required(),
                            }),
                            defineField({
                              name: 'description',
                              title: 'Description',
                              type: 'localisedString',
                            }),
                            defineField({
                              name: 'link',
                              title: 'Link',
                              type: 'link',
                            }),
                            defineField({
                              name: 'icon',
                              title: 'Icon',
                              type: 'image',
                            }),
                          ],
                          preview: {
                            select: {
                              title: 'label.en',
                              subtitle: 'description.en',
                              media: 'icon',
                            },
                          },
                        }),
                      ],
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'title.en',
                      links: 'links',
                    },
                    prepare({title, links}) {
                      return {
                        title: title || 'Column',
                        subtitle: `${links?.length || 0} links`,
                      }
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'label.en',
              hasMegamenu: 'hasMegamenu',
            },
            prepare({title, hasMegamenu}) {
              return {
                title: title || 'Nav Item',
                subtitle: hasMegamenu ? 'Megamenu' : 'Link',
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'navbarCta',
      title: 'Navbar CTA Button',
      type: 'object',
      group: 'navbar',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'localisedString',
        }),
        defineField({
          name: 'link',
          title: 'Link',
          type: 'link',
        }),
      ],
    }),

    // SEO
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      group: 'seo',
      description: 'Displayed on social cards and search engine results.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          description: 'Important for accessibility and SEO.',
          title: 'Alternative text',
          type: 'string',
        }),
        defineField({
          name: 'metadataBase',
          type: 'url',
          description: 'Base URL for metadata',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Settings',
      }
    },
  },
})
