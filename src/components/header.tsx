'use client';

import { useLanguage } from '@/context/language-content'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/theme-toggle"
import LanguageToggle from './locale-toggle';
import { IoTerminal } from "react-icons/io5";


export default function Header() {
  const { t } = useLanguage();
  const prefix = process.env.NODE_ENV === "production" ? "/iakee-portifolio" : "";

  return(
    <header className="sticky top-0 z-40 w-full border-b bg-background
      backdrop-blur supports-[backdrop-filter]:bg-background">
      <div className='container mx-auto px-4'>
        <div className="container flex h-16 items-center justify-between">
          
          {/* title logo and text */}
          <a 
            href={`${prefix}/`}
            className="
            flex 
            items-center 
            space-x-4
            hover:scale-[1.05]
            transition-all">
            <IoTerminal className="h-5 w-5"/>

            <span className="
              lg:text-2xl 
              font-bold">
              {t('header.name')}
            </span>
          </a>

          {/* navigation links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href = "/" 
              className="
                font-small 
                hover:underline 
                hover:scale-[1.1]
                transition-all
                underline-offset-4">
              {t('header.home')}
            </Link>
            
            <Link 
              href = "/resume" 
              className="
                font-small 
                hover:underline 
                hover:scale-[1.1]
                transition-all
                underline-offset-4">
              {t('header.resume')}
            </Link>
            
            <Link 
              href="/projects" 
              className="
                font-small 
                hover:underline 
                hover:scale-[1.1]
                transition-all
                underline-offset-4">
              {t('header.projects')}
            </Link>

            <Link 
              href="#skills" 
              className="
                font-small 
                hover:underline 
                hover:scale-[1.1]
                transition-all
                underline-offset-4">
              {t('header.skills')}
            </Link>
          </nav>
          
          {/* action buttons */}
          <div className="flex items-center gap-4">
            {/* lighing selection toggle button - disabled */}
            {/*<ThemeToggle />*/}
            
            {/* language selection dropdown button */}
            <LanguageToggle />  
              
            {/* contact - main button */}
            <Link href="#contact">
              <Button
                size="lg"
                className="
                flex 
                items-center 
                rounded-full 
                gap-2 
                cursor-pointer
                hover:bg-primary/32
                hover:scale-[1.05]
                transition-all">

                {t('header.actionbutton')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}