"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, CheckCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { useLanguage } from "@/context/language-content"
import { IoSend } from "react-icons/io5"
import { TranslatedFormMessage } from "./translated-form-message"
import { ErrorTooltipWrapper } from "./error-tooltip-wrapper"
import { FaCopy } from "react-icons/fa"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const [showCopyEmail, setShowCopyEmail] = useState(false)
  const [showCopiedEmail, setShowCopiedEmail] = useState(false)
  
  const { t } = useLanguage()
  
  const formSchema = z.object({
    name: z.string()
      .min(2, {message: "contact.form.error.name.short"})
      .max(50, {message: "contact.form.error.name.long"}),
    email: z.string()
      .email({message: "contact.form.error.email.invalid"}),
    subject: z.string()
      .min(5, {message: "contact.form.error.subject.short"})
      .max(100, {message: "contact.form.error.subject.long"}),
    message: z.string()
      .min(10, {message: "contact.form.error.message.short"})
      .max(500, {message: "contact.form.error.message.long"}),
  })

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

  useEffect(
    () => {
      const prefill = typeof window !== "undefined" && window.localStorage.getItem("prefillMessage")
      
      if (prefill) {
        form.setValue("message", prefill)
      }
    }, 
    [form]
  )

  async function onSubmit(values: z.infer<typeof formSchema>) {
    
    setIsSubmitting(true)
    setShowCopyEmail(false) // reset copy email state in case of it working again

    try {
      const response = await fetch(
        '/api/sendForm', 
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        }
      )

      if (!response.ok) 
      {
        toast(
          {
            title: t("form.error.response.title"),
            description: t("form.error.response.description"),
          }
        )
        setShowCopyEmail(true)
        throw new Error('Could not send the email form!')
      }

      form.reset()
      setShowThankYou(true)
      setTimeout(() => setShowThankYou(false), 15000)

      toast(
        {
          title: t("form.success.title"),
          description: t("form.success.description"),
        }
      )
    } 
    catch (error) {
      toast(
        {
          title: t("form.error.send.title"),
          description: t("form.error.send.description"),
        }
      )
      setShowCopyEmail(true)
      console.error(error)
    } 
    finally {
      setIsSubmitting(false)
    }
  }

  function inputClass(fieldName: keyof z.infer<typeof formSchema>) {
    return form.formState.errors[fieldName]
      ? "ring-2 ring-red-500 border-2 border-red-500"
      : "ring-0 ring-transparent"
  }

  async function copyEmailToClipboard() {
    try {
      await navigator.clipboard.writeText(t('contact2.iakee@gmail.com'))
      setShowCopiedEmail(true)
      toast(
        {
          title: t("contact.form.emailCopiedTitle"),
          description: t("contact.form.emailCopiedDescription"),
        }
      )
    } 
    catch {
      toast(
        {
          title: t("contact.form.emailCopyErrorTitle"),
          description: t("contact.form.emailCopyErrorDescription"),
        }
      )
    }
    setTimeout(() => setShowCopiedEmail(false), 1500)
  }

  return (
    <div className="relative flex justify-center items-center space-y-4 bg-muted mx-auto p-4 rounded-2xl w-[90%] min-h-[400px]">
      <AnimatePresence mode="wait">
        {
          showThankYou 
            ? <motion.div
                key="thank-you"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 p-6 text-center">
                
                {/* sucess screen contents */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="mx-auto">  
                  <CheckCircle className="mx-auto w-20 h-20 text-green-500" />
                </motion.div>
                
                <h3 className="font-bold text-2xl">
                  {t("contact.form.thankYou")}
                </h3>
                
                <p className="text-muted-foreground">
                  {t("contact.form.thankYouDescription")}
                </p>
              </motion.div>
            : <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full">
                
                {/* form body widgets */}
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    
                    {/* name + email label + input fields */}
                    <div className="gap-4 grid sm:grid-cols-2">
                    
                      {/* name */}
                      <FormField
                        control={form.control}
                        name="name"
                        render={
                          ({ field }) => (
                            <FormItem>
                              <FormLabel className="pb-2 font-semibold text-foreground">
                                {t("contact.form.senderName")}
                              </FormLabel>

                              <ErrorTooltipWrapper errorMessage={
                                t(`${form.formState.errors.name?.message + "Tooltip"}`)}>
                                <FormControl className="rounded-2xl">
                                  <Input
                                    placeholder={t("contact.form.senderNameDescription")}
                                    className={inputClass("name") + " rounded-2xl"}
                                    {...field}/>
                                </FormControl>
                              </ErrorTooltipWrapper>

                              {/* translated error status message */}
                              <TranslatedFormMessage name="name" />
                            </FormItem>
                          )
                        }/>

                      {/* email */}
                      <FormField
                        control={form.control}
                        name="email"
                        render={
                          ({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {t("contact.form.senderEmail")}
                              </FormLabel>

                              <ErrorTooltipWrapper errorMessage={
                                t(`${form.formState.errors.email?.message + "Tooltip"}`)}>
                                <FormControl className="rounded-2xl">
                                  <Input
                                    placeholder={t("contact.form.senderEmailDescription")}
                                    className={inputClass("email") + " rounded-2xl"}
                                    {...field} />
                                </FormControl>
                              </ErrorTooltipWrapper>
                              
                              {/* translated error status message */}
                              <TranslatedFormMessage name="email" />
                            </FormItem>
                          )
                        } />
                    </div>

                    {/* subject label + input fields*/}
                    <FormField
                      control={form.control}
                      name="subject"
                      render={
                        ({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {t("contact.form.subject")}
                            </FormLabel>
                        
                            <ErrorTooltipWrapper errorMessage={
                              t(`${form.formState.errors.subject?.message + "Tooltip"}`)}>
                              <FormControl className="rounded-2xl">
                                <Input
                                  placeholder={t("contact.form.subjectDescription")}
                                  {...field}
                                  className={inputClass("subject") + " rounded-2xl"}/>
                              </FormControl>
                            </ErrorTooltipWrapper>
                            
                            {/* translated error status message */}
                            <TranslatedFormMessage name="subject" />
                          </FormItem>
                        )
                      }/>

                    {/* message */}
                    <FormField
                      control={form.control}
                      name="message"
                      render={
                        ({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {t("contact.form.message")}
                            </FormLabel>
                            
                            <ErrorTooltipWrapper errorMessage={
                              t(`${form.formState.errors.message?.message + "Tooltip"}`)}>
                              <FormControl className="rounded-2xl">
                                <Textarea
                                  placeholder={t("contact.form.messageDescription")}
                                  className={"min-h-[150px] resize-none rounded-2xl " + inputClass("message")}
                                  {...field}
                                  ref={
                                    (el) => {
                                      field.ref(el)
                                      inputRef.current = el
                                    }
                                  } />
                              </FormControl>
                            </ErrorTooltipWrapper>

                            {/* translated error status message */}
                            <TranslatedFormMessage name="message" />
                          </FormItem>
                        )
                      } />

                    <Button
                      type="submit"
                      className="gap-2 rounded-full w-full cursor-pointer"
                      disabled={isSubmitting}>
                      
                      {
                        isSubmitting 
                        ? <>
                            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                            {t("contact.form.submitLoading")}
                          </>
                      
                        : <>
                            <IoSend className="ml-1" />
                            {t("contact.form.submitButton")}
                          </>
                      }
                    </Button>
                    {
                      showCopiedEmail
                        ? <Button
                            type="button"
                            variant="outline"
                            className="gap-2 hover:bg-muted-secondary rounded-full w-full text-muted hover:text-muted transition-all">
                            <FaCopy className="animate-spin"/>
                            {t("contact.form.copiedEmailButton")}
                          </Button>
                        : <Button
                            type="button"
                            variant="outline"
                            className={`
                              w-full 
                              gap-2 
                              rounded-full 
                              cursor-pointer 
                              ${showCopyEmail ? "animate-pulse-border" : ""} 
                              ${showCopyEmail ? "animate-pulse" : ""}
                              active:scale-95
                              transition-all`}
                            onClick={copyEmailToClipboard}>
                            
                            <FaCopy />
                            {t("contact.form.copyEmailButton")}
                          </Button>
                    }
                    
                  </form>
                </Form>

                <Suspense fallback={null}>
                  <PrefillHandler form={form} />
                </Suspense>
              </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}
