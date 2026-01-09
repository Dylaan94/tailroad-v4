import {defineQuery} from 'next-sanity'

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`)

const linkReference = /* groq */ `
  _type == "link" => {
    "page": page->slug.current,
    "post": post->slug.current
  }
`

const linkFields = /* groq */ `
  link {
      ...,
      ${linkReference}
      }
`

const heroFields = /* groq */ `
  _type == "hero" => {
    ...,
    buttons[]{
      ...,
      ${linkFields}
    }
  }
`

const servicesColumnsFields = /* groq */ `
  _type == "servicesColumns" => {
    ...,
    column1 {
      ...,
      links[]{
        ...,
        ${linkFields}
      }
    },
    column2 {
      ...,
      links[]{
        ...,
        ${linkFields}
      }
    }
  }
`

const caseStudiesFields = /* groq */ `
  _type == "caseStudies" => {
    ...,
    button {
      ...,
      ${linkFields}
    },
    caseStudies[]-> {
      _id,
      title,
      slug,
      jpSlug,
      featuredImage {
        asset,
        alt
      },
      projectOutline,
      "industries": industries[]-> {
        _id,
        name
      },
      "services": services[]-> {
        _id,
        name
      }
    }
  }
`

const textColumnsFields = /* groq */ `
  _type == "textColumns" => {
    ...,
    columns[]{
      ...,
      content {
        en[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        },
        jp[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      }
    }
  }
`

export const navbarQuery = defineQuery(`
  *[_type == "settings"][0]{
    title,
    logo,
    navbar[]{
      _key,
      label,
      link {
        ...,
        linkType,
        href,
        "page": page->slug.current,
        "post": post->slug.current,
        openInNewTab
      },
      hasMegamenu,
      megamenu[]{
        _key,
        title,
        links[]{
          _key,
          label,
          description,
          link {
            ...,
            linkType,
            href,
            "page": page->slug.current,
            "post": post->slug.current,
            openInNewTab
          },
          icon
        }
      }
    },
    navbarCta {
      label,
      link {
        ...,
        linkType,
        href,
        "page": page->slug.current,
        "post": post->slug.current,
        openInNewTab
      }
    }
  }
`)

export const homePageQuery = defineQuery(`
  *[_type == "homePage" && _id == "homePage"][0]{
    _id,
    _type,
    title,
    "clients": *[_type == "client" && defined(logo.asset)] | order(_createdAt desc) {
      _id,
      companyName,
      logo {
        asset,
        alt
      }
    },
    "caseStudiesData": *[_type == "caseStudy"] | order(_createdAt desc) {
      _id,
      title,
      slug,
      jpSlug,
      featuredImage {
        asset,
        alt
      },
      projectOutline,
      "industries": industries[]-> {
        _id,
        name
      },
      "services": services[]-> {
        _id,
        name
      }
    },
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        link {
          ...,
          _type == "link" => {
            "page": page->slug.current,
            "post": post->slug.current
          }
        }
      },
      _type == "infoSection" => {
        content[]{
          ...,
          markDefs[]{
            ...,
            _type == "link" => {
              "page": page->slug.current,
              "post": post->slug.current
            }
          }
        }
      },
      _type == "hero" => {
        ...,
        buttons[]{
          ...,
          link {
            ...,
            _type == "link" => {
              "page": page->slug.current,
              "post": post->slug.current
            }
          }
        }
      },
      ${servicesColumnsFields},
      ${caseStudiesFields},
    },
  }
`)

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture},
`

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    jpSlug,
    heading,
    subheading,
    "caseStudiesData": *[_type == "caseStudy"] | order(_createdAt desc) {
      _id,
      title,
      slug,
      jpSlug,
      featuredImage {
        asset,
        alt
      },
      projectOutline,
      "industries": industries[]-> {
        _id,
        name
      },
      "services": services[]-> {
        _id,
        name
      }
    },
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ${linkFields},
      },
      _type == "infoSection" => {
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      },
      ${heroFields},
      ${servicesColumnsFields},
      ${caseStudiesFields},
      ${textColumnsFields},
    },
  }
`)

export const getPageQueryByJpSlug = defineQuery(`
  *[_type == 'page' && jpSlug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    jpSlug,
    heading,
    subheading,
    "caseStudiesData": *[_type == "caseStudy"] | order(_createdAt desc) {
      _id,
      title,
      slug,
      jpSlug,
      featuredImage {
        asset,
        alt
      },
      projectOutline,
      "industries": industries[]-> {
        _id,
        name
      },
      "services": services[]-> {
        _id,
        name
      }
    },
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ${linkFields},
      },
      _type == "infoSection" => {
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      },
      ${heroFields},
      ${servicesColumnsFields},
      ${caseStudiesFields},
      ${textColumnsFields},
    },
  }
`)

export const sitemapData = defineQuery(`
  *[_type == "page" || _type == "post" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`)

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`)

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`)

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content[]{
    ...,
    markDefs[]{
      ...,
      ${linkReference}
    }
  },
    ${postFields}
  }
`)

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`)

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)] {
    "slug": slug.current,
    "jpSlug": jpSlug.current
  }
`)

export const allClientsQuery = defineQuery(`
  *[_type == "client" && defined(logo.asset)] | order(_createdAt desc) {
    _id,
    companyName,
    logo {
      asset,
      alt
    }
  }
`)

export const allCaseStudiesQuery = defineQuery(`
  *[_type == "caseStudy"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    jpSlug,
    featuredImage {
      asset,
      alt
    },
    "industries": industries[]-> {
      _id,
      name
    },
    "services": services[]-> {
      _id,
      name
    }
  }
`)

export const getCaseStudyQuery = defineQuery(`
  *[_type == "caseStudy" && slug.current == $slug][0]{
    _id,
    _type,
    title,
    slug,
    jpSlug,
    featuredImage {
      asset,
      alt
    },
    "client": client-> {
      _id,
      companyName,
      logo {
        asset,
        alt
      }
    },
    "industries": industries[]-> {
      _id,
      name
    },
    "services": services[]-> {
      _id,
      name
    },
    projectOutline,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ${linkFields},
      },
      _type == "infoSection" => {
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      },
      ${heroFields},
      ${servicesColumnsFields},
      ${caseStudiesFields},
      ${textColumnsFields},
    },
  }
`)

export const getCaseStudyQueryByJpSlug = defineQuery(`
  *[_type == "caseStudy" && jpSlug.current == $slug][0]{
    _id,
    _type,
    title,
    slug,
    jpSlug,
    featuredImage {
      asset,
      alt
    },
    "client": client-> {
      _id,
      companyName,
      logo {
        asset,
        alt
      }
    },
    "industries": industries[]-> {
      _id,
      name
    },
    "services": services[]-> {
      _id,
      name
    },
    projectOutline,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ${linkFields},
      },
      _type == "infoSection" => {
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      },
      ${heroFields},
      ${servicesColumnsFields},
      ${caseStudiesFields},
      ${textColumnsFields},
    },
  }
`)

export const caseStudySlugs = defineQuery(`
  *[_type == "caseStudy" && defined(slug.current)] {
    "slug": slug.current,
    "jpSlug": jpSlug.current
  }
`)
