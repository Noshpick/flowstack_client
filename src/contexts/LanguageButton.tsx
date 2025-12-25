'use client'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Cookies from 'js-cookie'

const norm = (l?: string) => (l?.toLowerCase().startsWith('en') ? 'en' : 'ru')

export default function LanguageButton() {
  const { i18n } = useTranslation()

  const initial =
    (typeof window !== 'undefined' && norm(document.documentElement.lang)) ||
    norm(i18n.language) || 'ru'

  const [language, setLanguage] = useState<'en' | 'ru'>(initial)

  useEffect(() => {
    const handler = (lng: string) => setLanguage(norm(lng))
    i18n.on('languageChanged', handler)
    setLanguage(norm(i18n.language))
    return () => i18n.off('languageChanged', handler)
  }, [i18n])

  const toggleLanguage = async () => {
    const next = language === 'en' ? 'ru' : 'en'
    console.log('[LanguageButton] Toggling to:', next)
    setLanguage(next)
    await i18n.changeLanguage(next)
    Cookies.set('i18next', next, { path: '/', expires: 365 })
    console.log('[LanguageButton] Cookie set, all cookies:', document.cookie)
  }

  return (
    <button
      onClick={toggleLanguage}
      className={`relative w-16 h-8 rounded-full p-1 transition-colors duration-300
        ${language === 'en' ? 'bg-zinc-300 dark:bg-zinc-600' : 'bg-zinc-400 dark:bg-zinc-700'}`}
      aria-label={`Switch language to ${language === 'en' ? 'Russian' : 'English'}`}
    >
      <div className="absolute inset-0 flex items-center justify-between px-2 text-xs font-medium">
        <span className="text-white">RU</span>
        <span className="text-white">EN</span>
      </div>
      <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300
        ${language === 'en' ? 'translate-x-0' : 'translate-x-8'}`} />
    </button>
  )
}