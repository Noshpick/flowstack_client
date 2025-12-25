"use client"

import "../../../../i18n/i18n"
import { useTranslation } from "react-i18next"
import { VacancyContent } from "./VacancyContent"

type Vacancy = {
  title: string
  location: string
  salary?: string
  responsibilities: ReadonlyArray<string>
  requirements: ReadonlyArray<string>
  conditions: ReadonlyArray<string>
}

export function VacancyClient({ slug }: { slug: string }) {
  const { t } = useTranslation()

  const v = t(`VACANCIES.${slug}`, { returnObjects: true }) as unknown as Vacancy

  if (!v || !v.title) {
    return (
      <div className="max-w-3xl mx-auto py-10 dark:text-white">
        <h1 className="text-2xl font-semibold">Vacancy not found</h1>
      </div>
    )
  }

  return <VacancyContent v={v} slug={slug} />
}