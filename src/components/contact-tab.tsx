'use client';

import { useLanguage } from '@/context/language-content'
import { Badge, Linkedin, Mail, Twitter } from 'lucide-react';
import ContactForm from './contact-form';
import { forwardRef } from 'react';

import { IoIosMail } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { RiTimeZoneFill } from "react-icons/ri";

const ContactTab = forwardRef<HTMLDivElement>((props, ref) => {
  
  const { t } = useLanguage();

  return (
    <section 
      id="contact" 
      className="w-full py-12 py-[8%] bg-muted/50">
      
      <div className="container px-4 md:px-6" id="chat-stopper">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {t('contact.title')}
            </h2>   
            
            <p className="
              max-w-[900px] 
              text-muted-foreground 
              md:text-xl/relaxed 
              lg:text-base/relaxed 
              xl:text-xl/relaxed">
             
             {t('contact.description')}
            </p>
          </div>
        </div>
        
        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
          <div>
            <div className="space-y-12">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">
                  {t('contact.contactInfoTitle')}
                </h3>
              
                <div className="flex flex-col gap-2 text-muted-foreground px-[5%]">
                  {t('contact.contactInfoDescription')}
                  
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <IoIosMail className="h-5 w-5 text-primary" />
                    
                      <a 
                        href="mailto:contact2.iakee@gmail.com" 
                        className="text-sm hover:underline">
                        contact2.iakee@gmail.com
                      </a>
                    </div>
                  
                    <div className="flex items-center gap-2">
                      <FaLinkedin className="h-5 w-5 text-primary" />
                    
                      <a 
                        href="https://linkedin.com/in/giordanogi" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-sm hover:underline">
                        linkedin.com/in/giordanogi
                      </a>
                    </div>
                </div>
                
                </div>
              </div>
            
            
              <div className="space-y-2">
                <h3 className="text-xl font-bold">
                  {t('contact.contactStatusTitle')}
                </h3>

                <div className="flex flex-row items-center gap-2 text-muted-foreground px-[5%]">
                  <MdEventAvailable className="text-primary h-5 w-5" />
                  {t('contact.workStatus')}	
                </div>

                  <div className="flex flex-row items-center gap-2 text-muted-foreground px-[5%]">
                    <RiTimeZoneFill className="text-primary h-5 w-5" />
                    {t('contact.flexible')}
                    
                  </div>
              </div>
            </div>
          </div>
          <div ref={ref}>
            <ContactForm />
          </div>
      
        </div>
      </div>
    </section>
  )
})

ContactTab.displayName = 'ContactTab';

export default ContactTab;