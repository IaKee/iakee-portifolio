"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, CheckCircle } from "lucide-react"
import emailjs from "emailjs-com"
import { motion, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { useLanguage } from "@/context/language-content"
import { IoSend } from "react-icons/io5"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })
  const inputRef = useRef<HTMLTextAreaElement | null>(null)

  const PrefillHandler = dynamic(() => import("./prefill-handler"), { ssr: false })

  const { t } = useLanguage()

  useEffect(() => {
    const prefill = typeof window !== "undefined" && window.localStorage.getItem("prefillMessage")
    if (prefill) {
      form.setValue("message", prefill)
    }
  }, [form])

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // TODO: enviroment variables here
    emailjs
      .send(
        process.env.EMAIL_SERVICE_KEY!,
        process.env.EMAIL_TEMPLATE_KEY!,
        {
          from_name: values.name,
          from_email: values.email,
          subject: values.subject,
          message: values.message,
        },
        process.env.EMAIL_API_KEY!,
      )
      .then(() => {
        setIsSubmitting(false)
        // Show thank you message
        setShowThankYou(true)

        // Reset form
        form.reset()

        // Hide thank you message after 3 seconds
        setTimeout(() => {
          setShowThankYou(false)
        }, 5000)

        toast({
          title: "Mensagem enviada!",
          description: "Vou te responder o quanto antes 💜",
        })
      })
      .catch((error) => {
        setIsSubmitting(false)
        toast({
          title: "Erro ao enviar!",
          description: "Tenta de novo mais tarde ou me chama no LinkedIn.",
        })
        console.error(error)
      })
  }

  return (
    <div className="w-[90%] mx-auto space-y-4 bg-muted rounded-2xl p-4 relative min-h-[400px] flex items-center justify-center">
      <AnimatePresence mode="wait">
        {showThankYou ? (
          <motion.div
            key="thank-you"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4 p-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto"
            >
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
            </motion.div>
            <h3 className="text-2xl font-bold">
              {t("contact.form.thankYou")}
            </h3>
            <p className="text-muted-foreground">
              {t("contact.form.thankYouDescription")}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("contact.form.senderName")}</FormLabel>

                        <FormControl className="rounded-2xl">
                          <Input placeholder={t("contact.form.senderNameDescription")} {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("contact.form.senderEmail")}</FormLabel>

                        <FormControl className="rounded-2xl">
                          <Input placeholder={t("contact.form.senderEmailDescription")} {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* subject */}
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("contact.form.subject")}</FormLabel>

                      <FormControl className="rounded-2xl">
                        <Input placeholder={t("contact.form.subjectDescription")} {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("contact.form.message")}</FormLabel>

                      <FormControl className="rounded-2xl">
                        <Textarea
                          placeholder={t("contact.form.messageDescription")}
                          className="min-h-[150px] resize-none"
                          {...field}
                          ref={(el) => {
                            field.ref(el)
                            inputRef.current = el
                          }}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full gap-2 rounded-full cursor-pointer"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("contact.form.submitLoading")}
                    </>
                  ) : (
                    <>
                      {t("contact.form.submitButton")}
                      <IoSend className="ml-1" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
            
            {typeof window !== "undefined" && <PrefillHandler form={form} />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
