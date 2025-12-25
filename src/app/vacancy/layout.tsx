export default function VacancyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="pt-24 px-4 mx-auto max-w-5xl">
       {children}
    </main>
  )
}