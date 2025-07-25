"use client"

import { useState, useEffect, useRef } from "react"
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
import {Tooltip} from "@heroui/react";

const formSchema = z.object({
  name: z.string()
    .min(2, {message: "form.error.shortName"})
    .max(50, {message: "form.error.longName"}),
  email: z.string()
    .email({message: "form.error.invalidEmail"}),
  subject: z.string()
    .min(5, {message: "form.error.shortSubject"})
    .max(100, {message: "form.error.longSubject"}),
  message: z.string()
    .min(10, {message: "form.error.shortMessage"})
    .max(500, {message: "form.error.longMessage"}),
})

function ErrorTooltipWrapper({
  children,
  errorMessage
}: {
  children: React.ReactNode,
  errorMessage?: string
}) {
  const { t } = useLanguage()
  return (
    <Tooltip
      content={errorMessage ? t(errorMessage) : ""}
      showArrow
      placement="top"
      isDisabled={!errorMessage}
      className="rounded-full bg-red-500 text-sm"
    >
      {children}
    </Tooltip>
  )
}


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
    const { t } = useLanguage()
    
    setIsSubmitting(true)

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

  return (
    <div className="
      w-[90%] 
      mx-auto 
      space-y-4 
      bg-muted 
      rounded-2xl 
      p-4 relative 
      min-h-[400px] 
      flex 
      items-center 
      justify-center">
      <AnimatePresence mode="wait">
        {
          showThankYou 
            ? <motion.div
                key="thank-you"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-4 p-6">
                
                {/* sucess screen contents */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="mx-auto">  
                  <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
                </motion.div>
                
                <h3 className="text-2xl font-bold">
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
                    <div className="grid gap-4 sm:grid-cols-2">
                    
                      {/* name */}
                      <FormField
                        control={form.control}
                        name="name"
                        render={
                          ({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground font-semibold pb-2">
                                {t("contact.form.senderName")}
                              </FormLabel>

                              <ErrorTooltipWrapper errorMessage={form.formState.errors.name?.message}>
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

                              <ErrorTooltipWrapper errorMessage={form.formState.errors.email?.message}>
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
                        
                            <ErrorTooltipWrapper errorMessage={form.formState.errors.subject?.message}>
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
                            
                            <ErrorTooltipWrapper errorMessage={form.formState.errors.message?.message}>
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

                    {/* TODO: copy email button */}
                    <Button
                      type="submit"
                      className="w-full gap-2 rounded-full cursor-pointer"
                      disabled={isSubmitting}>
                      
                      {
                        isSubmitting 
                        ? <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {t("contact.form.submitLoading")}
                          </>
                      
                        : <>
                            {t("contact.form.submitButton")}
                            <IoSend className="ml-1" />
                          </>
                      }
                    </Button>
                  </form>
                </Form>

                {typeof window !== "undefined" && <PrefillHandler form={form} />}
              </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}
