"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react"
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"


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

  const searchParams = useSearchParams();
  const prefillMessage = searchParams.get('prefillMessage');
  useEffect(
    () => {
      const prefill =
        prefillMessage || (typeof window !== "undefined" ? localStorage.getItem("prefillMessage") : null);
      
      if (prefill) {
        console.log("pegou a mensagem")
        form.setValue('message', prefill);
        console.log("mensagem preenchida automaticamente:", prefill)
      }
  }, [form, prefillMessage]);

  
  useEffect(
    () => {
      console.log("tentei pegar a mensagem")
      const prefill = typeof window !== 'undefined' && window.localStorage.getItem('prefillMessage')
      if (prefill) {
        form.setValue('message', prefill)
      }
    },
    [form]
  )

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // TODO: pop up a notification here
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      form.reset()
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      })
    }, 1500)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="Subject of your message" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>
          
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Message
              </FormLabel>

              <FormControl>
                <Textarea 
                  placeholder="Your message" 
                  className="min-h-[150px] resize-none" 
                  {...field} 
                  ref={
                    (el) => {
                      field.ref(el)
                      inputRef.current = el
                    }
                  }/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    </Form>
  )
}

