"use client"

import { useLanguage } from "@/context/language-content"
import { useFormContext } from "react-hook-form"

export function TranslatedFormMessage({ name }: { name: string }) {
  const { t } = useLanguage()
  const {formState: { errors }} = useFormContext()

  const error = errors[name as keyof typeof errors]
  if (!error || typeof error.message !== "string") return null

  return <p className="text-sm font-medium text-destructive">{t(error.message)}</p>
}
