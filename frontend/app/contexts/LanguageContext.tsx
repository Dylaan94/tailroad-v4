'use client'

import {createContext, useContext, useEffect, useState} from 'react'
import {usePathname, useRouter} from 'next/navigation'

export type Language = 'en' | 'jp'

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  getLocalisedString: (localised?: {en?: string; jp?: string}) => string | undefined
  getLocalisedContent: <T>(localised?: {en?: T; jp?: T}) => T | undefined
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({children}: {children: React.ReactNode}) {
  const pathname = usePathname()
  const router = useRouter()
  const [language, setLanguageState] = useState<Language>('en')

  // Detect language from URL path
  useEffect(() => {
    const isJapanese = pathname.startsWith('/jp') || pathname === '/jp'
    setLanguageState(isJapanese ? 'jp' : 'en')
  }, [pathname])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    
    // Get current path without language prefix
    let currentPath = pathname
    if (currentPath.startsWith('/jp')) {
      currentPath = currentPath.slice(3) || '/'
    }
    
    // Navigate to new path with appropriate language prefix
    if (lang === 'jp') {
      router.push(`/jp${currentPath}`)
    } else {
      router.push(currentPath)
    }
  }

  const getLocalisedString = (localised?: {en?: string; jp?: string}): string | undefined => {
    if (!localised) return undefined
    return language === 'jp' ? localised.jp || localised.en : localised.en || localised.jp
  }

  const getLocalisedContent = <T,>(localised?: {en?: T; jp?: T}): T | undefined => {
    if (!localised) return undefined
    return language === 'jp' ? localised.jp || localised.en : localised.en || localised.jp
  }

  return (
    <LanguageContext.Provider value={{language, setLanguage, getLocalisedString, getLocalisedContent}}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

