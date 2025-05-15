"use client";

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, ChevronDown, ChevronUp, Github, Linkedin, Mail, MapPin, Phone, Shield } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useLanguage } from "@/context/language-content"
import ReCAPTCHA from "react-google-recaptcha"

export default function ProfessionalCard() {
  const { t } = useLanguage();
  const prefix = process.env.NODE_ENV === "production" ? "" : "";

  const [revealContact, setRevealContact] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [loadedContact, setLoadedContact] = useState(false);

  const [contactInfo, setContactInfo] = useState<{
    phone?: string,
    location?: string
  }>({});

  const handleCaptchaSuccess = () => {
    setCaptchaVerified(true);

    {/* TODO: this should be server sided */}
    fetch(
      'https://hrom66w5z9.execute-api.sa-east-1.amazonaws.com/prod/contact',
      { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        setContactInfo(data);
      })
      .catch(err => {
        console.error("Erro ao buscar dados de contato:", err);
      });
  };

  {/* TODO: remove this to enable captcha - or not im not your dad */}
  if(!captchaVerified) {
    handleCaptchaSuccess();
    setCaptchaVerified(true)
  }

  return (
    <Card className="w-full flex mx-auto my-10 rounded-2xl">
      <div className="w-[80%] items-center flex-col justify-center mx-auto">
        <CardHeader className="
          p-4 
          hover:scale-[1.02] 
          transition-all"> {/* ensure padding here */}
          <div className="flex sm:flex-row h-full w-full gap-4 justify-center items-center">

            {/* profile image */}
            <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-primary/10 flex-shrink-0">
            <Image
              src={`${prefix}/opc3.png`}
              alt={t("resume.fullName")}
              width={128}
              height={128}
              className="h-full w-full object-cover"
            />
            </div>

            {/* profile name and title */}
            <div className="flex flex-col justify-center items-center sm:items-start space-y-1">
              <h1 className="text-3xl lg:text-4xl font-bold">{t("resume.fullName")}</h1>
              <p className="text-muted-foreground text-lg">{t("resume.professionalTitle")}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="w-[65%] items-center justify-center mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* github */}
            <Button
              variant="outline"
              size="lg"
              className="
                flex 
                items-center 
                rounded-full 
                gap-2 
                hover:bg-primary/5 
                hover:scale-[1.05]
                transition-all"
              onClick={() => window.open("https://github.com/iakee", "_blank")}>
              
              <Github className="h-5 w-5" />
              <span>
                GitHub
              </span>
            </Button>
            
            {/* linkedin */}
            <Button
              variant="outline"
              size="lg"
              className="
                flex 
                items-center 
                rounded-full 
                gap-2 
                hover:bg-primary/5 
                hover:scale-[1.05]
                transition-all"
              onClick={() => window.open(
                "https://www.linkedin.com/in/giordanogi/", 
                "_blank")}>
              
              <Linkedin className="h-5 w-5" />
              <span>
                LinkedIn
              </span>
            </Button>
            
            {/* schedule call */}
            <Button
              variant="default"
              size="lg"
              className="
                flex 
                items-center 
                rounded-full
                gap-2 
                hover:opacity-90 
                hover:scale-[1.05]
                transition-all"
              onClick={
                () => {
                  localStorage.setItem("prefillMessage", t("resume.contactMessage"))
                  window.location.href = `/`
                }
              }>
                  
              <Calendar className="h-5 w-5" />
              <span>{t("resume.scheduleCall")}</span>
            </Button>
          </div>

        </CardContent>
        <div className="w-[70%] flex flex-col items-center justify-center mx-auto">
          <Button
            onClick={() => setRevealContact(!revealContact)}
            variant="outline"
            className={`
              flex 
              items-center 
              justify-center 
              rounded-full 
              gap-2

              w-full 
              hover:bg-muted/50 
              hover:scale-[1.05]
              transition-all
              ${!revealContact
                ? `animate-pulse-border 
                mb-6
                relative 
                after:absolute 
                after:inset-0 
                after:rounded-full
                after:border-2 
                after:border-primary 
                after:opacity-0 
                after:animate-[pulse_1.5s_ease-in-out_infinite]`
                : `
                  scale-[1.05]
                  bg-muted/50
                  hover:scale-[1.1]`
              }`
            }>
            <span>
              {revealContact 
                ? t("resume.hideContact") 
                : t("resume.revealContact")}
              </span>
            
            {revealContact 
              ? <ChevronUp className="h-4 w-4" /> 
              : <ChevronDown className="h-4 w-4" />}
          </Button>

          {revealContact && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="border rounded-2xl overflow-hidden my-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                <div className="space-y-4">
                  <h3 className="font-medium text-lg border-b pb-2">
                    {t("resume.mainInformation")}
                  </h3>

                  <div className="space-y-3">
                    <a 
                      href="mailto:giordano.s.mail@gmail.com" 
                      target="_blank"
                      className="
                        flex 
                        items-center 
                        gap-2 
                        hover:underline 
                        hover:scale-[1.05]
                        transition-all">
                      <Mail className="h-5 w-5 text-primary" />
                      <p className="tracking-tighter">
                        giordano.s.mail@gmail.com
                      </p>
                    </a>
      
                    <div className="flex items-center gap-3 hover:scale-[1.05] transition-all">
                      <a
                        href="https://www.google.com/maps/place/Sapucaia+do+Sul,+RS"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          flex  
                          items-center
                          gap-2
                          hover:underline
                          hover:scale-[1.05]	
                          transition-all">
                        <MapPin className="h-5 w-5 text-primary" />
                        <p className="tracking-tighter">
                          {t("resume.locationShort")}
                        </p>
                        
                      </a>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-lg border-b pb-2">
                    {t("resume.moreInformation")}
                  </h3>

                  {!captchaVerified ? (
                    <div className="w-full items-center">
                      <div className="w-full flex justify-center">
                        <ReCAPTCHA 
                          size="compact"
                          theme="dark"
                          onChange={handleCaptchaSuccess}
                          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} />
                      </div>

                      <div className="
                        flex flex-row 
                        text-[12px]
                        text-muted-foreground 
                        text-justify
                        items-center
                        gap-1">
                        <Shield/>
                        {t('resume.captchaDescription')}
                      </div>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3">
                      
                      {/* phone */}
                      <a 
                        href={`tel:+${contactInfo.phone?.replace(/\D/g, '')}`} 
                        className="
                          flex  
                          items-center
                          gap-2
                          hover:underline
                          hover:scale-[1.05]	
                          transition-all">
                        <Phone className="h-5 w-5 text-primary" />
                        <p className="tracking-tighter">
                          {contactInfo.phone}
                        </p>
                      </a>

                      {/* whatsapp */}
                      <div className="flex items-center gap-3">
                        <a 
                          href={`https://wa.me/${contactInfo.phone?.replace(/\D/g, '')}`}
                          target="_blank"
                          className="
                            flex items-center 
                            gap-2 
                            hover:scale-[1.05] hover:underline
                            transition-all">
                          <FaWhatsapp className="h-5 w-5 text-primary"/>
                          <p className="tracking-tighter">
                            {t('resume.whatsappDirect')}
                          </p>
                        </a>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </Card>
  )
}
