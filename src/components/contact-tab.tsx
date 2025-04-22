'use client';

import { useLanguage } from '@/context/language-content'
import { Badge, Linkedin, Mail, Twitter } from 'lucide-react';
import ContactForm from './contact-form';
import { forwardRef } from 'react';

const ContactTab = forwardRef<HTMLDivElement>((props, ref) => {
  
  const { t } = useLanguage();

  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Get In Touch
            </h2>
            
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Have a project in mind or want to collaborate? I'd love to hear from you.
            </p>
          </div>
        </div>
        
        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-bold">
                Contact Information
              </h3>
              
              <p className="text-muted-foreground">
                Feel free to reach out through the form or directly via email or social media.
              </p>
            </div>
            
            <div className="grid gap-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                
                <a href="mailto:hello@example.com" className="text-sm hover:underline">
                  hello@example.com
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Linkedin className="h-5 w-5 text-primary" />
                
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-sm hover:underline">
                  linkedin.com/in/username
                </a>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-bold">
                Current Status
              </h3>
              
              <Badge variant="outline" className="text-sm">
                Available for freelance work
              </Badge>
              
              <p className="text-muted-foreground">
                I'm currently taking on new projects and open to both short and long-term opportunities.
              </p>
            </div>
          </div>
          
          <div ref={ref}>
            <ContactForm />
          </div>
      
        </div>
      </div>
    </section>
  )
}
)

ContactTab.displayName = 'ContactTab';

export default ContactTab;