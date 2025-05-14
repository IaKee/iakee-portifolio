"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ChatButton } from "@/components/chat-button"
import { useLanguage } from "@/context/language-content"

import { LuConstruction } from "react-icons/lu";
import { FaClock } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { TbBrandGithubFilled } from "react-icons/tb";
import { FaFileAlt } from "react-icons/fa";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";


type UnderConstructionProps = {
  title?: string
  description?: string
  estimatedCompletion?: string
}

export default function UnderConstruction() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <main>

      <Header />

      {/* body */}
      <div className="
        flex 
        flex-col 
        items-center 
        justify-center 
        h-full
        py-[4%]
        px-4 
        text-center 
        bg-gradient-to-b 
        from-background 
        to-muted">
      <div className="max-w-md space-y-8" id="chat-stopper">
        {/* construction icon and animations */}
        <div className="relative">
          <div className="
            w-32 
            h-32 
            mx-auto 
            bg-foreground  
            rounded-full 
            flex 
            items-center 
            justify-center">
            <LuConstruction className="w-16 h-16 text-background" />
          </div>

          {/* Animated elements */}
          <div className="absolute top-0 left-1/2 -translate-x-20 -translate-y-2">
            <div className="w-6 h-6 bg-primary/20 rounded-full animate-ping" />
          </div>
          <div className="absolute bottom-0 right-1/2 translate-x-16 translate-y-2">
            <div className="w-4 h-4 bg-primary/20 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
          </div>
        </div>

        {/* main title and description */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            {t('missing.title')}  
          </h1>

          <p className="text-xl text-muted-foreground">
            {t('missing.description')}
          </p>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-4">
            <FaClock className="w-4 h-4" />
            <span>
              {t('missing.estimatedTime')}
            </span>
          </div>

          <p className="text-xl text-muted-foreground">
            {t('missing.alternative')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <Link href="/">
            <Button 
              className="
                gap-2 
                cursor-pointer 
                rounded-full 
                hover:ring-2 
                hover:bg-bg 
                hover:ring-primary 
                hover:ring-offset-2 
                transition-all"
              variant="outline">
              <FaHome className="w-4 h-4" />
              {t('missing.home')}
            </Button>
          </Link>

          <Link href="github.com/iakee">
            <Button className="
              gap-2 
              cursor-pointer 
              rounded-full
              hover:ring-2 
              hover:bg-bg 
              hover:ring-primary 
              hover:ring-offset-2 
              transition-all">
              <TbBrandGithubFilled className="w-4 h-4" />
              GitHub
            </Button>
          </Link>

          <Link href="/resume">
            <Button className="
              gap-2 
              cursor-pointer 
              rounded-full
              hover:ring-2 
              hover:bg-bg 
              hover:ring-primary 
              hover:ring-offset-2 
              transition-all">
              <FaFileAlt className="w-4 h-4" />
              {t('missing.resume')}
            </Button>
          </Link>

          <Link href="/">
            <Button className="
              gap-2 
              cursor-pointer 
              rounded-full
              hover:ring-2 
              hover:bg-bg 
              hover:ring-primary 
              hover:ring-offset-2 
              transition-all"
              onClick={
                () => {
                  localStorage.setItem("scrollTo", "projects");
                }
              }>
              <AiOutlineFundProjectionScreen className="w-4 h-4" />
              {t('missing.notableProjects')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
      <Footer />
      
      <ChatButton/>
    </main>
  )
}
