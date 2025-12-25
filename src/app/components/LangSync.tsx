'use client'

import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function LangSync() {
  const { i18n } = useTranslation()

  useEffect(() => {
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
  }, [i18n])

  return null
}
