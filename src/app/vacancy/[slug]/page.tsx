import { notFound } from "next/navigation"
import { VacancyClient } from "./VacancyClient"

const slugs = ["frontend-dev", "backend-dev" ,"pm-flowstack", "smm-flowstack"] as const
type Slug = (typeof slugs)[number]

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: Slug }>
}) {
  const { slug } = await params
  return {
    title: `${slug} — Vacancies — FlowStack`,
    description: `Vacancy page for ${slug}`,
  }
}

export default async function VacancyPage({
  params,
}: {
  params: Promise<{ slug: Slug }>
}) {
  const { slug } = await params
  if (!slugs.includes(slug)) return notFound()

  return <VacancyClient slug={slug} />
}