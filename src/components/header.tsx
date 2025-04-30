'use client';

import { useLanguage } from '@/context/language-content'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/theme-toggle"
import LanguageToggle from './locale-toggle';
import { IoTerminal } from "react-icons/io5";


export default function Header() {
  const { t } = useLanguage();

  return(
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 
      backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className='container mx-auto px-4'>
        <div className="container flex h-16 items-center justify-between">
          
          {/* title logo and text */}
          <a 
            href="/"
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
            
            <Link 
              href="#about" 
              className="
                font-small 
                hover:underline 
                hover:scale-[1.1]
                transition-all
                underline-offset-4">
              {t('header.about')}
            </Link>
          </nav>
          
            
          {/* action buttons */}
          <div className="flex items-center gap-4">
            {/* language selection dropdown button */}
            <LanguageToggle/>
            
              
            {/* lighing selection toggle button */}
            <ThemeToggle />
              
              
            {/* contact - main button */}
            <Link href="#contact" target="_blank" >
              <Button
                size="lg"
                className="
                flex 
                items-center 
                rounded-full 
                gap-2 
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