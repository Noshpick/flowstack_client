'use client'
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { TranslationTypes } from "./translations/TranslationTypes";
import en from "./translations/en_translation.json";
import ru from "./translations/ru_translation.json";

const resources = { en: { translation: en }, ru: { translation: ru } } as const

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
    detection: {
      order: ['cookie', 'navigator'],
      caches: ['cookie'],
      lookupCookie: 'i18next',
    },
    load: 'currentOnly',
    lowerCaseLng: true,
    interpolation: { escapeValue: false },
  })

export default i18n;