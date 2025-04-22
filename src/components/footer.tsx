'use client'

import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

import { useLanguage } from '@/context/language-content'

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="w-full border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()}
          {' '}
          {t('footer.name')}. {t('footer.reserved')}
        </p>

        <div className="flex items-center gap-4">
          <Link 
            href="https://github.com/iakee" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-foreground">
          
            <Github className="h-5 w-5" />
          
            <span className="sr-only">
              GitHub
            </span>
          </Link>
       
          <Link 
            href="https://linkedin.com/in/giordanogi" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-foreground">
            
            <Linkedin className="h-5 w-5" />
            
            <span className="sr-only">
              LinkedIn
            </span>
          </Link>

          <Link 
            href="https://fiverr.com/giordano_gi" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-foreground">

            <img src="fiverr_icon.png" alt="fiverr.logo" className="h-5 w-5" />

            <span className="sr-only">
              Fiverr
            </span>
          </Link>
            </div>
            </div>
        </footer>
    )
}