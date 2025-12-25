"use client"

import Link from "next/link"
import "../../../i18n/i18n"
import { useTranslation } from "react-i18next"

type Vacancy = {
  slug: string
  title: string
  short?: string
  location: string
  salary?: string
}

const slugs = ["frontend-dev", "backend-dev", "pm-flowstack", "smm-flowstack"] as const
type Slug = (typeof slugs)[number]

export default function VacancyListPage() {
  const { t } = useTranslation()

  const vacancies: Vacancy[] = (slugs as readonly Slug[]).map((slug) => ({
    slug,
    title: t(`VACANCIES.${slug}.title`),
    short: t(`VACANCIES.${slug}.short`),
    location: t(`VACANCIES.${slug}.location`),
    salary: t(`VACANCIES.${slug}.salary`),
  }))

  return (
    <div className="max-w-3xl mx-auto pb-10">
      <h1 className="text-3xl font-bold mb-6 border-zinc-700 dark:text-white">
        {t("VACANCY_MODAL.vacancies")}
      </h1>

      <ul className="space-y-4">
        {vacancies.map((v) => (
          <li key={v.slug} className="rounded-xl border border-zinc-700 dark:bg-zinc-100 p-4">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-xl font-semibold">{v.title}</h2>
              {v.salary && <span className="text-sm opacity-70">{v.salary}</span>}
            </div>

            {!!v.short && <p className="opacity-80 mt-1">{v.short}</p>}
            <p className="text-sm opacity-60 mt-1">{v.location}</p>

            <Link
              className="inline-block mt-3 text-sm underline underline-offset-4 hover:no-underline"
              href={`/vacancy/${v.slug}`}
            >
              {t("VACANCY_MODAL.more")}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}