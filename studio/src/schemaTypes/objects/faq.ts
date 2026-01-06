import {defineField, defineType} from 'sanity'


/**
 * FAQ component schema for the page builder.
 * Displays content on the left with optional button, and FAQ dropdowns on the right.
 */

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'object',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'questions', title: 'Questions & Answers'},
  ],
  fields: [
    // Left side content
    defineField({
      name: 'content',
      title: 'Content',
      type: 'localisedBlockContent',
      group: 'content',
      description: 'Content displayed on the left side',
    }),
    // Optional button
    defineField({
      name: 'button',
      title: 'Button',
      type: 'object',
      group: 'content',
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
    // FAQ Items
    defineField({
      name: 'faqItems',
      title: 'FAQ Items',
      type: 'array',
      group: 'questions',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'localisedString',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'localisedBlockContent',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              questionEn: 'question.en',
              questionJp: 'question.jp',
            },
            prepare({questionEn, questionJp}) {
              return {
                title: questionEn || questionJp || 'FAQ Item',
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      faqCount: 'faqItems',
    },
    prepare({faqCount}) {
      const count = Array.isArray(faqCount) ? faqCount.length : 0
      return {
        title: 'FAQ',
        subtitle: `${count} ${count === 1 ? 'item' : 'items'}`,
      }
    },
  },
})

