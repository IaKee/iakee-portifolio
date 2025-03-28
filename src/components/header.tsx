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
          <div className="flex items-center">
            <img src="/terminal_icon.png" alt="icon" className="h-6 w-6" />
            <span className="text-lg font-bold">
              {t('header.name')}
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="#about" className="text-sm font-medium hover:underline underline-offset-4">
              {t('header.about')}
            </Link>

            <Link href="#projects" className="text-sm font-medium hover:underline underline-offset-4">
              {t('header.projects')}
            </Link>

            <Link href="#skills" className="text-sm font-medium hover:underline underline-offset-4">
              {t('header.skills')}
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

            <Button variant="outline" size="icon" className="md:hidden">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}