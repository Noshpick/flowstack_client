"use client"

import { useState } from "react"
import ApplyModal from "./Modal/ApplyModal"
import i18n from "../../../../i18n/i18n"
import { useTranslation } from "react-i18next";

export default function ApplyButton({
  vacancySlug,
  vacancyTitle,
}: {
  vacancySlug: string
  vacancyTitle: string
}) {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation();
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="cursor-pointer inline-block rounded-lg border px-4 py-2 hover:bg-white/10"
      >
        {t("VACANCY_MODAL.apply")}
      </button>

      {open && (
        <ApplyModal
          vacancySlug={vacancySlug}
          vacancyTitle={vacancyTitle}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}