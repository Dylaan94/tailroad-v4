import {Suspense} from 'react'
import Link from 'next/link'

import {AllPosts} from '@/app/components/Posts'
import PageBuilder from '@/app/components/PageBuilder'
import {homePageQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import {studioUrl} from '@/sanity/lib/api'

export default async function Page() {
  const {data: homePage} = await sanityFetch({
    query: homePageQuery,
  })

  return (
    <>
      <div className="">
        {homePage?._id ? (
          <PageBuilder page={homePage as any} />
        ) : (
          <div className="container py-12">
            <h2 className="text-2xl font-bold text-gray-900">No home page content yet</h2>
            <p className="mt-2 text-gray-500">
              Open Sanity Studio to add content to your home page.
            </p>
            <Link
              className="mt-4 inline-flex rounded-full bg-black hover:bg-brand py-3 px-6 text-white transition-colors duration-200"
              href={`${studioUrl}/structure/homePage`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Edit Home Page
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
