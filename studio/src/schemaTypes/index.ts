import {person} from './documents/person'
import {page} from './documents/page'
import {post} from './documents/post'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {hero} from './objects/hero'
import {settings} from './singletons/settings'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import {localisedString, localisedBlockContent, localisedHeader} from './objects/localisedTypes'
import {homePage} from './singletons/home'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

const singletonTypes = [homePage]
const documentTypes = [page, post, person, settings]
const objectTypes = [blockContent, infoSection, callToAction, hero, link, localisedString, localisedBlockContent, localisedHeader]

export const schemaTypes = [
  ...singletonTypes,
  ...documentTypes,
  ...objectTypes,
]
