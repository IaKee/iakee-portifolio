"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { UseFormReturn } from "react-hook-form"

interface PrefillHandlerProps {
  form: UseFormReturn<any>
}

export default function PrefillHandler({ form }: PrefillHandlerProps) {
  const searchParams = useSearchParams()
  const prefillMessage = searchParams.get("prefillMessage")

  useEffect(() => {
    const prefill = prefillMessage || (typeof window !== "undefined" ? localStorage.getItem("prefillMessage") : null)
    if (prefill) {
      form.setValue("message", prefill)
    }
  }, [form, prefillMessage])

  return null
}
