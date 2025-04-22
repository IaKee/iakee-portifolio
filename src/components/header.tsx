'use client';

import { useLanguage } from '@/context/language-content'

import { ArrowRight, Code, } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/theme-toggle"
import LanguageToggle from './locale-toggle';


export default function Header() {
  const { t } = useLanguage();

  return(
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 
      backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className='container mx-auto px-4'>
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <img 
              src="/terminal_icon.png" 
              alt="icon" 
              className="h-6 w-6" />
            <span className="text-lg font-bold">
              {t('header.name')}
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href = "/resume" 
              className = "text-sm font-medium hover:underline underline-offset-4">
              {t('header.resume')}
            </Link>
            
            <Link 
              href="/projects" 
              className="text-sm font-medium hover:underline underline-offset-4">
              {t('header.projects')}
            </Link>

            <Link 
              href="#skills" 
              className="text-sm font-medium hover:underline underline-offset-4">
              {t('header.skills')}
            </Link>
            
            <Link 
              href="#about" 
              className="text-sm font-medium hover:underline underline-offset-4">
              {t('header.about')}
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageToggle/>
            <ThemeToggle />
            <Link href="#contact" target="_blank" >
              <Button>
                {t('header.actionbutton')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}