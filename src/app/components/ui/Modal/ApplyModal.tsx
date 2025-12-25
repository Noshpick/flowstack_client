'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import "../../../../../i18n/i18n";
import { useTranslation } from "react-i18next";

type ApplyModalProps = {
  vacancySlug: string
  vacancyTitle: string
  onClose: () => void
  apiBase?: string
}

const PHONE_MASK = '+7 (___) ___ __-__'
const phoneRegex = /^\+7 \(\d{3}\) \d{3} \d{2}-\d{2}$/
const tgRegex = /^@[a-zA-Z0-9_]{5,32}$/

function formatFromDigits(digits10: string) {
  const d = (digits10 + '__________').slice(0, 10)
  return `+7 (${d.slice(0,3)}) ${d.slice(3,6)} ${d.slice(6,8)}-${d.slice(8,10)}`
}

function caretPosByDigitCount(n: number) {
  const map = [4,5,6,9,10,11,13,14,16,17]
  if (n <= 0) return 4
  if (n >= 10) return 24
  return map[n - 1] + 1
}

function digitCountLeftOfCaret(masked: string, caret: number) {
  const left = masked.slice(0, caret)
  const digits = left.replace(/\D/g, '')
  return Math.max(0, Math.min(10, digits.replace(/^7/, '').length))
}

function normalizeDigits(input: string) {
  let d = input.replace(/\D/g, '')
  if (d.startsWith('8')) d = '7' + d.slice(1)
  if (!d.startsWith('7')) d = '7' + d
  return d.slice(1, 11)
}

function useRuPhoneMask() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [digits10, setDigits10] = useState('')
  const masked = useMemo(() => formatFromDigits(digits10), [digits10])
  const valid = useMemo(() => phoneRegex.test(masked), [masked])

  useEffect(() => {
    const el = inputRef.current
    if (!el) return
    const caret = caretPosByDigitCount(0)
    el.setSelectionRange(caret, caret)
  }, [])

  function setWithCaret(nextDigits10: string, nextDigitCountForCaret: number) {
    nextDigits10 = nextDigits10.slice(0, 10)
    setDigits10(nextDigits10)
    requestAnimationFrame(() => {
      const el = inputRef.current
      if (!el) return
      const caret = caretPosByDigitCount(Math.max(0, Math.min(nextDigitCountForCaret, nextDigits10.length)))
      el.setSelectionRange(caret, caret)
    })
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const el = e.target
    const newMasked = el.value
    const caret = el.selectionStart ?? newMasked.length
    const desiredDigitsLeft = digitCountLeftOfCaret(newMasked, caret)
    const only10 = normalizeDigits(newMasked)
    setWithCaret(only10, desiredDigitsLeft)
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const el = e.currentTarget
    const caret = el.selectionStart ?? 0
    const selEnd = el.selectionEnd ?? caret
    const allow = ['Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End']
    if (allow.includes(e.key)) return

    if (e.key === 'Backspace') {
      e.preventDefault()
      if (selEnd > caret) {
        const leftBefore = digitCountLeftOfCaret(masked, caret)
        const leftAfter = digitCountLeftOfCaret(masked, selEnd)
        const before = digits10.slice(0, leftBefore)
        const after = digits10.slice(leftAfter)
        setWithCaret(before + after, leftBefore)
        return
      }
      const leftCount = digitCountLeftOfCaret(masked, caret)
      if (leftCount <= 0) {
        setWithCaret(digits10, 0)
        return
      }
      const delIndex = leftCount - 1
      const next = digits10.slice(0, delIndex) + digits10.slice(delIndex + 1)
      setWithCaret(next, delIndex)
      return
    }

    if (e.key === 'Delete') {
      e.preventDefault()
      const leftCount = digitCountLeftOfCaret(masked, caret)
      const rightCount = digitCountLeftOfCaret(masked, (el.selectionEnd ?? caret))
      if (rightCount > leftCount) {
        const before = digits10.slice(0, leftCount)
        const after = digits10.slice(rightCount)
        setWithCaret(before + after, leftCount)
        return
      }
      if (leftCount >= digits10.length) return
      const next = digits10.slice(0, leftCount) + digits10.slice(leftCount + 1)
      setWithCaret(next, leftCount)
      return
    }

    if (!/^\d$/.test(e.key)) {
      e.preventDefault()
      return
    }
    e.preventDefault()
    const leftCount = digitCountLeftOfCaret(masked, caret)
    if (digits10.length >= 10) {
      const next = digits10.slice(0, leftCount) + e.key + digits10.slice(leftCount + 1)
      setWithCaret(next, leftCount + 1)
    } else {
      const next = digits10.slice(0, leftCount) + e.key + digits10.slice(leftCount)
      setWithCaret(next, leftCount + 1)
    }
  }

  function onPaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault()
    const text = e.clipboardData.getData('text') || ''
    const only10 = normalizeDigits(text)
    setWithCaret(only10, only10.length)
  }

  return { inputRef, masked, valid, onChange, onKeyDown, onPaste }
}

function isTelegramValid(s: string) {
  return tgRegex.test(s)
}

export default function ApplyModal({
  vacancySlug,
  vacancyTitle,
  onClose,
  apiBase = process.env.NEXT_PUBLIC_API_BASE || ''
}: ApplyModalProps) {
  const [open, setOpen] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const { inputRef: phoneRef, masked: phone, valid: phoneValid, onChange: onPhoneChange, onKeyDown: onPhoneKeyDown, onPaste: onPhonePaste } = useRuPhoneMask()
  const [telegram, setTelegram] = useState('@')
  const telegramValid = isTelegramValid(telegram)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [hp, setHp] = useState('')

  function onTelegramChange(e: React.ChangeEvent<HTMLInputElement>) {
    let val = e.target.value
    if (!val.startsWith('@')) val = '@' + val.replace(/@+/g, '')
    val = val.replace(/\s+/g, '')
    setTelegram(val)
  }

  function onTelegramKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if ((e.key === 'Backspace' || e.key === 'Delete') && telegram === '@') {
      e.preventDefault()
    }
  }

  useEffect(() => {
    if (!open) onClose()
  }, [open, onClose])

  const valid = useMemo(() => {
    if (!firstName.trim() || !lastName.trim()) return false
    if (!phoneValid) return false
    if (!telegramValid) return false
    if (!resumeFile) return false
    return true
  }, [firstName, lastName, phoneValid, telegramValid, resumeFile])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!apiBase) {
      setError('NEXT_PUBLIC_API_BASE не задан')
      return
    }
    if (!valid) return
    setLoading(true)
    try {
      const fd = new FormData()
      fd.append('vacancySlug', vacancySlug)
      fd.append('vacancyTitle', vacancyTitle)
      fd.append('firstName', firstName.trim())
      fd.append('lastName', lastName.trim())
      fd.append('phone', phone)
      fd.append('telegram', telegram)
      if (resumeFile) fd.append('resume', resumeFile)
      fd.append('hp', hp)
      const res = await fetch(`${apiBase}/api/v1/applications`, {
        method: 'POST',
        body: fd,
        headers: { 'x-shared-secret': process.env.NEXT_PUBLIC_SHARED_SECRET || '' }
      })
      if (!res.ok) {
        const payload = await res.json().catch(() => ({}))
        throw new Error(payload?.error || `HTTP ${res.status}`)
      }
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || 'Ошибка отправки')
    } finally {
      setLoading(false)
    }
  }

const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-zinc-900 shadow-xl p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold dark:text-white">{t("VACANCY_MODAL.feed")}</h3>
          <button className="px-2 py-1 rounded hover:bg-black/5 dark:hover:bg-white/10" onClick={() => setOpen(false)} aria-label="Закрыть">✕</button>
        </div>
        <p className="mt-1 text-sm opacity-70 dark:text-zinc-200">{vacancyTitle}</p>
        {success ? (
          <div className="mt-4 rounded-lg border border-green-500/40 bg-green-50 dark:bg-green-900/20 p-4 text-sm dark:text-green-200">
            {t("VACANCY_MODAL.apply_success")}
          </div>
        ) : (
          <form className="mt-4 space-y-3" onSubmit={handleSubmit} noValidate>
            <input 
            type="text" 
            name="hp" 
            value={hp} 
            onChange={(e) => setHp(e.target.value)} 
            className="hidden" 
            autoComplete="off" 
            tabIndex={-1} 
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm mb-1 dark:text-zinc-100">{t("VACANCY_MODAL.name")}</label>
                <input 
                className="w-full rounded-lg border px-3 py-2 dark:bg-zinc-800 dark:border-zinc-700" 
                value={firstName} onChange={(e) => setFirstName(e.target.value)} 
                placeholder={t("VACANCY_MODAL.Ivan")} 
                required autoComplete="given-name" 
                />
              </div>
              <div>
                <label className="block text-sm mb-1 dark:text-zinc-100">{t("VACANCY_MODAL.last_name")}</label>
                <input 
                className="w-full rounded-lg border px-3 py-2 dark:bg-zinc-800 dark:border-zinc-700" 
                value={lastName} onChange={(e) => setLastName(e.target.value)} 
                placeholder={t("VACANCY_MODAL.Ivanov")} 
                required autoComplete="family-name" 
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm mb-1 dark:text-zinc-100">{t("VACANCY_MODAL.phone")}</label>
                <input
                  ref={phoneRef}
                  type="tel"
                  className={`w-full rounded-lg border px-3 py-2 dark:bg-zinc-800 dark:border-zinc-700 ${phone && !phoneValid ? 'border-red-500' : ''}`}
                  value={phone}
                  onChange={onPhoneChange}
                  onKeyDown={onPhoneKeyDown}
                  onPaste={onPhonePaste}
                  inputMode="tel"
                  autoComplete="tel"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  placeholder={PHONE_MASK}
                  aria-invalid={Boolean(phone && !phoneValid)}
                  aria-describedby="phone-help"
                  required
                />
                <p id="phone-help" className="mt-1 text-xs opacity-60 dark:text-zinc-300">{t("VACANCY_MODAL.format")} +7 (999) 123 45-67</p>
              </div>
              <div>
                <label className="block text-sm mb-1 dark:text-zinc-100">Telegram</label>
                <input
                  type="text"
                  className={`w-full rounded-lg border px-3 py-2 dark:bg-zinc-800 dark:border-zinc-700 ${telegram && !telegramValid ? 'border-red-500' : ''}`}
                  value={telegram}
                  onChange={onTelegramChange}
                  onKeyDown={onTelegramKeyDown}
                  inputMode="text"
                  autoComplete="username"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  placeholder="@username"
                  aria-invalid={Boolean(telegram && !telegramValid)}
                  required
                />
                <p className="mt-1 text-xs opacity-60 dark:text-zinc-300">{t("VACANCY_MODAL.example")} @flowstack</p>
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1 dark:text-zinc-100">{t("VACANCY_MODAL.resume")} (PDF/DOC/DOCX)</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                className="block w-full text-sm file:mr-3 file:rounded-md file:border file:px-3 file:py-2 file:bg-black/5 dark:file:bg-white/10 file:hover:bg-black/10 dark:file:hover:bg-white/20"
                required
              />
              <p className="mt-1 text-xs opacity-60 dark:text-zinc-300">{t("VACANCY_MODAL.file_size")}</p>
            </div>
            {error && (
              <div className="rounded-lg border border-red-500/40 bg-red-50 dark:bg-red-900/20 p-3 text-sm dark:text-red-200">
                {error}
              </div>
            )}
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setOpen(false)} className="cursor-pointer rounded-lg border px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10">{t("VACANCY_MODAL.cancel")}</button>
              <button type="submit" disabled={!valid || loading} className="valid:cursor-pointer rounded-lg bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm disabled:opacity-50">{loading ? t("VACANCY_MODAL.loading") : t("VACANCY_MODAL.submit")}</button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}