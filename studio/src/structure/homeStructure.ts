// create home structure its a singleton document type
import { HomeIcon } from "@sanity/icons"
import { StructureBuilder } from "sanity/structure"

export const homeStructure = (S: StructureBuilder) => {
  return S.listItem()
    .title('Home Page')
    .icon(HomeIcon)
    .child(
      S.document()
        .schemaType('homePage')
        .documentId('homePage')
    )
}