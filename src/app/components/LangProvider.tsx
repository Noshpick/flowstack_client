'use client'

import { useEffect } from 'react'
import i18n from '../../../i18n/i18n'

export default function LangProvider() {
  useEffect(() => {
    const savedLang = document.cookie
      .split('; ')
      .find(row => row.startsWith('i18next='))
      ?.split('=')[1]

    console.log('[LangProvider] Saved lang from cookie:', savedLang)
    console.log('[LangProvider] Current i18n.language:', i18n.language)

    if (savedLang && savedLang !== i18n.language) {
      console.log('[LangProvider] Changing language to:', savedLang)
      i18n.changeLanguage(savedLang)
    }

    const updateLang = () => {
      if (typeof document !== 'undefined') {
        console.log('[LangProvider] Updating document.lang to:', i18n.language)
        document.documentElement.lang = i18n.language
      }
    }

    updateLang()
    i18n.on('languageChanged', updateLang)

    return () => {
      i18n.off('languageChanged', updateLang)
    }
  }, [])

  return null
}
