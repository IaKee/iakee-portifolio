"use client";

import { useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { animate } from "framer-motion"

import Header from "@/components/header"
import HeroSection from "@/components/hero-section"

import AboutTab from "@/components/about-tab"
import FeaturedProjects from "@/components/featured-projects"
import Footer from "@/components/footer"
import ContactTab from "@/components/contact-tab"
import { ChatButton } from "@/components/chat-button";

export default function Home() {
  const contactRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  
  useEffect(
    () => {
      const section = localStorage.getItem("scrollTo");

      if (section && section === "projects" && projectsRef.current) {
        localStorage.removeItem("scrollTo");
        const top = projectsRef.current.getBoundingClientRect().top + window.scrollY;

        setTimeout(
          () => {
            animate(
              window.scrollY,
              top,
              {
                duration: 1.2,
                onUpdate: (latest) => window.scrollTo(0, latest),
              }
            )
          }, 
        300);
      }
    }, 
    []);

  
  useEffect(
    () => {
      {/* checks if there is queued message to be sent */}
      const shouldScroll = localStorage.getItem("prefillMessage")

      
      if (shouldScroll?.length! > 0 && contactRef.current) {
        const top = contactRef.current!.getBoundingClientRect().top + window.scrollY;
        
        {/* removes queued message from local storage */}
        localStorage.removeItem("prefillMessage");
        setTimeout(
          () => {
            animate(
              window.scrollY, 
              top,
              {
                duration: 1.2,
                onUpdate: (latest) => window.scrollTo(0, latest),
                onComplete: () => {
                  inputRef.current?.focus();
                  inputRef.current?.select();
                }
              }
              
            )
          }, 300
        )
      }
    },
    [])

  return (

    <div className="flex min-h-screen flex-col">
      <Header />

      <HeroSection />

      <AboutTab />

      <FeaturedProjects ref={projectsRef} />

      <ContactTab ref = {contactRef} />

      <Footer />
      
      <ChatButton/>
    </div>

  )
}

