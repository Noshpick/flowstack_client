"use client"

import "../../../../i18n/i18n"
import { useTranslation } from "react-i18next"
import ApplyButton from "../../components/ui/ApplyButton"

type Vacancy = {
  title: string
  location: string
  salary?: string
  responsibilities: ReadonlyArray<string>
  requirements: ReadonlyArray<string>
  conditions: ReadonlyArray<string>
}

export function VacancyContent({ v, slug }: { v: Vacancy; slug: string }) {
  const { t } = useTranslation()

  return (
    <div className="max-w-3xl mx-auto py-10 dark:text-white">
      <h1 className="text-3xl font-bold">{v.title}</h1>
      <p className="opacity-80 mt-2">
        {v.location}{v.salary ? ` • ${v.salary}` : ""}
      </p>

      <section className="mt-6 space-y-6">
        <Block title={t("VACANCY_MODAL.responsibilities")} items={v.responsibilities} />
        <Block title={t("VACANCY_MODAL.requirements")} items={v.requirements} />
        <Block title={t("VACANCY_MODAL.conditions")} items={v.conditions} />
      </section>

      <div className="mt-8">
        <div>
          <ApplyButton vacancySlug={slug} vacancyTitle={v.title} />
        </div>
      </div>
    </div>
  )
}

function Block({ title, items }: { title: string; items: ReadonlyArray<string> }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <ul className="list-disc pl-6 space-y-1">
        {items.map((x, i) => (<li key={i} className="opacity-90">{x}</li>))}
      </ul>
    </div>
  )
}