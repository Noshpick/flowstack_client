'use client'
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { TranslationTypes } from "./translations/TranslationTypes";
import en from "./translations/en_translation.json";
import ru from "./translations/ru_translation.json";

const resources = { en: { translation: en }, ru: { translation: ru } } as const

const serverHtmlLang =
  typeof window !== 'undefined'
    ? (document.documentElement.getAttribute('lang') || 'ru').split('-')[0]
    : undefined

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: serverHtmlLang,
    fallbackLng: 'ru',
    detection: {
      order: ['cookie'],
      caches: ['cookie'],
      lookupCookie: 'i18next',
    },
    load: 'currentOnly',
    lowerCaseLng: true,
    interpolation: { escapeValue: false },
    initImmediate: false,
  })

export default i18n;