'use client'

import {useState} from 'react'
import {PortableText} from '@portabletext/react'

import ResolvedLink from '@/app/components/ResolvedLink'
import {useLanguage} from '@/app/contexts/LanguageContext'
import type {FAQProps, LocalisedString} from '@/types'

type FAQItem = {
  _key: string
  question?: LocalisedString
  answer?: any
}

export default function FAQ({block}: FAQProps) {
  const {content, button, faqItems} = block
  const {getLocalisedString, getLocalisedContent} = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const contentValue = getLocalisedContent(content)
  const buttonText = getLocalisedString(button?.text)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 px-5 md:px-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Side - Content */}
          <div className="flex flex-col">
            {contentValue && (
              <div className="prose prose-lg max-w-none text-gray-700 mb-8 w-2/3">
                <PortableText value={contentValue} />
              </div>
            )}
            {button && buttonText && (
              <div className="mt-auto">
                <ResolvedLink
                  link={button.link}
                  className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-black rounded-full hover:bg-gray-800 transition-colors"
                >
                  {buttonText}
                </ResolvedLink>
              </div>
            )}
          </div>

          {/* Right Side - FAQ Dropdowns */}
          <div className="space-y-4">
            {faqItems && faqItems.length > 0 ? (
              faqItems.map((item: FAQItem, index: number) => {
                const question = getLocalisedString(item.question)
                const answer = getLocalisedContent(item.answer)
                const isOpen = openIndex === index

                return (
                  <div
                    key={item._key || index}
                    className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:border-gray-300"
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(index)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors duration-200"
                      aria-expanded={isOpen}
                    >
                      <span className="font-semibold text-gray-900 pr-4">{question}</span>
                      <svg
                        className={`w-5 h-5 text-gray-500 shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-6 py-5 bg-gray-50 border-t border-gray-200">
                        {answer ? (
                          <div className="prose prose-sm max-w-none text-gray-700">
                            <PortableText value={answer as any} />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>No FAQ items available.</p>
              </div>
            )}
          </div>
        </div>

    </section>
  )
}

