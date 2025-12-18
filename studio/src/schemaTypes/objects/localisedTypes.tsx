import {defineField, defineType} from 'sanity'

export const localisedString = defineType({
  name: 'localisedString',
  title: 'Localised String',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'string',
    }),
    defineField({
      name: 'jp',
      title: '日本語',
      type: 'string',
    }),
  ],
})

export const localisedBlockContent = defineType({
  name: 'localisedBlockContent',
  title: 'Localised Block Content',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'blockContent',
    }),
    defineField({
      name: 'jp',
      title: '日本語',
      type: 'blockContent',
    }),
  ],
})

export const localisedHeader = defineType({
  name: 'localisedHeader',
  title: 'Localised Header',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'string',
    }),
    defineField({
      name: 'jp',
      title: '日本語',
      type: 'string',
    }),
    defineField({
      name: 'headingLevel',
      title: 'Heading Level',
      type: 'string',
      initialValue: 'h1',
      options: {
        list: [
          {title: 'H1', value: 'h1'},
          {title: 'H2', value: 'h2'},
          {title: 'H3', value: 'h3'},
          {title: 'H4', value: 'h4'},
          {title: 'H5', value: 'h5'},
          {title: 'H6', value: 'h6'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
  ],
  preview: {
    select: {
      en: 'en',
      jp: 'jp',
      level: 'headingLevel',
    },
    prepare({en, jp, level}) {
      return {
        title: en || jp || 'Untitled',
        subtitle: level?.toUpperCase() || 'H1',
      }
    },
  },
})
