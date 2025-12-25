'use client'

import { useEffect } from 'react'
import i18n from '../../../i18n/i18n'

export default function LangProvider() {
  useEffect(() => {
    const savedLang = document.cookie
      .split('; ')
      .find(row => row.startsWith('i18next='))
      ?.split('=')[1]

    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang)
    }

    const updateLang = () => {
      if (typeof document !== 'undefined') {
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
