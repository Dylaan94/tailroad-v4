import {defineField, defineType} from 'sanity'
import {BlockContentIcon} from '@sanity/icons'

/**
 * Hero schema object for the page builder.
 * Full-height hero section with localised header, content, buttons, and background options.
 */

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  icon: BlockContentIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'background', title: 'Background'},
  ],
  fields: [
    // Content fields
    defineField({
      name: 'header',
      title: 'Header',
      type: 'localisedHeader',
      group: 'content',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'localisedBlockContent',
      group: 'content',
    }),
    defineField({
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'button',
          title: 'Button',
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'localisedString',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'link',
            }),
            defineField({
              name: 'variant',
              title: 'Variant',
              type: 'string',
              initialValue: 'primary',
              options: {
                list: [
                  {title: 'Primary (Black)', value: 'primary'},
                  {title: 'Secondary (Outline)', value: 'secondary'},
                ],
                layout: 'radio',
                direction: 'horizontal',
              },
            }),
          ],
          preview: {
            select: {
              en: 'text.en',
              jp: 'text.jp',
              variant: 'variant',
            },
            prepare({en, jp, variant}) {
              return {
                title: en || jp || 'Button',
                subtitle: variant === 'secondary' ? 'Outline' : 'Primary',
              }
            },
          },
        },
      ],
    }),
    // Background fields
    defineField({
      name: 'backgroundType',
      title: 'Background Type',
      type: 'string',
      group: 'background',
      initialValue: 'none',
      options: {
        list: [
          {title: 'None (White)', value: 'none'},
          {title: 'Image', value: 'image'},
          {title: 'Video', value: 'video'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      group: 'background',
      hidden: ({parent}) => parent?.backgroundType !== 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Important for accessibility and SEO',
        }),
      ],
    }),
    defineField({
      name: 'backgroundVideo',
      title: 'Background Video URL',
      type: 'url',
      group: 'background',
      hidden: ({parent}) => parent?.backgroundType !== 'video',
      description: 'Enter a video URL (e.g., MP4 file URL)',
    }),
    defineField({
      name: 'overlayOpacity',
      title: 'Overlay Opacity',
      type: 'number',
      group: 'background',
      hidden: ({parent}) => parent?.backgroundType === 'none',
      initialValue: 50,
      validation: (Rule) => Rule.min(0).max(100),
      description: 'Darken the background (0-100%)',
    }),
  ],
  preview: {
    select: {
      headerEn: 'header.en',
      headerJp: 'header.jp',
      backgroundType: 'backgroundType',
      media: 'backgroundImage',
    },
    prepare({headerEn, headerJp, backgroundType, media}) {
      const title = headerEn || headerJp || 'Hero'
      const bgLabel =
        backgroundType === 'video' ? '🎬 Video' : backgroundType === 'image' ? '🖼 Image' : '⬜ White'

      return {
        title,
        subtitle: `Hero · ${bgLabel}`,
        media,
      }
    },
  },
})

