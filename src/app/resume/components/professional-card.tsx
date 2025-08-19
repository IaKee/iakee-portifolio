"use client";

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, Mail, MapPin, Phone, Shield } from "lucide-react"
import { FaCalendarAlt, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useLanguage } from "@/context/language-content"
import ReCAPTCHA from "react-google-recaptcha"
import { IoMdText } from "react-icons/io";
import { Badge } from "@/components/ui/badge";
import { MdEventAvailable } from "react-icons/md";
import { RiTimeZoneFill } from "react-icons/ri";

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

  const [bookingInfo, setBookingInfo] = useState<{ url?: string }>({});

  const handleCaptchaSuccess = () => {
    setCaptchaVerified(true);

    fetch("/api/getContact")
      .then(res => res.json())
      .then(data => { setContactInfo(data); })
      .catch(err => {
        console.error("Error fetching contact info from getContact route:", err);
      },
    ),
    []
  };

  const handleBooking = () => {
    // open the booking page in a new tabs
    window.open("/api/getBooking", "_blank")
  };


  {/* NOTE: remove this to enable captcha - or not im not your dad */}
  if(!captchaVerified) {
    handleCaptchaSuccess();
    setCaptchaVerified(true)
  }

  return (
    <Card className="flex mx-auto my-10 rounded-2xl w-full">
      <div className="flex-col justify-center items-center mx-auto w-[80%]">
        <CardHeader className="p-4 hover:scale-[1.02] transition-all"> {/* ensure padding here */}
          <div className="flex sm:flex-row justify-center items-center gap-4 w-full h-full">

            {/* profile image */}
            <div className="flex-shrink-0 border-4 border-primary/10 rounded-full w-32 h-32 overflow-hidden">
            <Image
              src={`${prefix}/opc3.png`}
              alt={t("resume.fullName")}
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
            </div>

            {/* profile name and title */}
            <div className="flex flex-col justify-center items-center sm:items-start space-y-1">
              <h1 className="font-bold text-3xl lg:text-4xl">
                {t("resume.fullName")}
              </h1>

              <div className="text-muted-foreground text-lg">
                {/* main title */}
                {t("resume.professionalTitle")}

                {/* vertical separator */}
                <div className="inline-block bg-muted-foreground/50 mx-2 w-px h-4"/>

                {/* academic title */}
                {t("resume.educationTitle")}
              </div>

              {/* badges */}
              <div className="flex flex-row gap-2">
                <Badge className="flex flex-row items-center gap-1 px-2 py-1 text-muted-foreground text-xs" variant="outline">
                    <MdEventAvailable />
                      {t('hero.workStatus')}
                    </Badge>

                    <Badge className="flex flex-row items-center gap-1 px-2 py-1 text-muted-foreground text-xs" variant="outline">
                      <RiTimeZoneFill />
                      {t('hero.workHours')}
                    </Badge>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="justify-center items-center mx-auto w-[80%]">
          <div className="flex flex-row justify-center items-center gap-3">
            {/* github */}
            <Button
              variant="outline"
              size="lg"
              className="flex items-center gap-2 hover:bg-primary/5 px-4 rounded-full hover:scale-[1.05] transition-all"
              onClick={() => window.open("https://github.com/iakee", "_blank")}>
              
              <FaGithub className="w-5 h-5" />
              <span className="font-semibold">
                GitHub
              </span>
            </Button>
            
            {/* linkedin */}
            <Button
              variant="outline"
              size="lg"
              className="flex items-center gap-2 hover:bg-primary/5 px-4 rounded-full hover:scale-[1.05] transition-all"
              onClick={() => window.open(
                "https://www.linkedin.com/in/giordanogi/", 
                "_blank")}>
              
              <FaLinkedin className="w-5 h-5" />
              <span className="font-semibold">
                LinkedIn
              </span>
            </Button>
            
            {/* schedule call - message */}
            <Button
              variant="default"
              size="lg"
              className="flex flex-row justify-start items-center gap-[4px] hover:opacity-90 px-4 rounded-full hover:scale-[1.05] transition-all"
              onClick={() => {
                localStorage.setItem("prefillMessage", t("resume.contactMessage"));
                window.location.href = "/";
              }}>

              <IoMdText className="w-6 h-6" />
              
              <div className="flex flex-col justify-center items-start text-left">
                <span className="font-semibold text-base leading-none">
                  {t("resume.scheduleCall")}
                </span>

                <span className="text-xs leading-tight">
                  {t("resume.scheduleCallMessage")}
                </span>
              </div>
            </Button>


            {/* schedule call - calendly */}
            <Button
              variant="default"
              size="lg"
              className="flex flex-row justify-start items-center gap-[4px] hover:opacity-90 px-4 rounded-full hover:scale-[1.05] transition-all"
              onClick={handleBooking}>
  
              <FaCalendarAlt className="w-6 h-6" />

              <div className="flex flex-col justify-center items-start text-left">
                <span className="font-semibold text-base leading-none">
                  {t("resume.scheduleCall")}
                </span>
                <span className="text-xs leading-tight">
                  {t("resume.scheduleCallCalendly")}
                </span>
              </div>
            </Button>

          </div>

        </CardContent>
        <div className="flex flex-col justify-center items-center mx-auto w-[70%]">
          <Button
            onClick={() => setRevealContact(!revealContact)}
            variant="outline"
            className={`
              flex 
              items-center 
              justify-center 
              rounded-full 
              gap-2
              font-semibold

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
              ? <ChevronUp className="w-4 h-4" /> 
              : <ChevronDown className="w-4 h-4" />}
          </Button>

          {revealContact && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="my-6 border rounded-2xl overflow-hidden">
              <div className="gap-4 grid grid-cols-1 md:grid-cols-2 p-4">
                <div className="space-y-4">
                  <h3 className="pb-2 border-b font-medium text-lg">
                    {t("resume.mainInformation")}
                  </h3>

                  <div className="space-y-3">
                    <a 
                      href="mailto:giordano.s.mail@gmail.com" 
                      target="_blank"
                      className="flex items-center gap-2 hover:underline hover:scale-[1.05] transition-all">
                      <Mail className="w-5 h-5 text-primary" />
                      <p className="tracking-tighter">
                        giordano.s.mail@gmail.com
                      </p>
                    </a>
      
                    <div className="flex items-center gap-3 hover:scale-[1.05] transition-all">
                      <a
                        href="https://www.google.com/maps/place/Sapucaia+do+Sul,+RS"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:underline hover:scale-[1.05] transition-all">
                        <MapPin className="w-5 h-5 text-primary" />
                        <p className="tracking-tighter">
                          {t("resume.locationShort")}
                        </p>
                        
                      </a>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="pb-2 border-b font-medium text-lg">
                    {t("resume.moreInformation")}
                  </h3>

                  {!captchaVerified ? (
                    <div className="items-center w-full">
                      <div className="flex justify-center w-full">
                        <ReCAPTCHA 
                          size="compact"
                          theme="dark"
                          onChange={handleCaptchaSuccess}
                          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} />
                      </div>

                      <div className="flex flex-row items-center gap-1 text-[12px] text-muted-foreground text-justify">
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
                        className="flex items-center gap-2 hover:underline hover:scale-[1.05] transition-all">
                        <Phone className="w-5 h-5 text-primary" />
                        <p className="tracking-tighter">
                          {contactInfo.phone}
                        </p>
                      </a>

                      {/* whatsapp */}
                      <div className="flex items-center gap-3">
                        <a 
                          href={`https://wa.me/${contactInfo.phone?.replace(/\D/g, '')}`}
                          target="_blank"
                          className="flex items-center gap-2 hover:underline hover:scale-[1.05] transition-all">
                          <FaWhatsapp className="w-5 h-5 text-primary"/>
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
