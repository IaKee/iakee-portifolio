'use client'

import Link from "next/link";
import { TbBrandFiverr } from "react-icons/tb";
import { FaCalendar, FaLinkedinIn } from "react-icons/fa";
import { TbBrandGithubFilled } from "react-icons/tb";

import { useLanguage } from '@/context/language-content'
import SiteStatsWidget from "./ui/view-counter";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full border-t max-h-12">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        
        {/* updated message - left side */}
        <span  
          className="
            flex
            flex-row
            items-center
            gap-2
            text-xs 
            bg-muted
            font-semibold 
            px-2
            py-1 
            rounded-full">
            <FaCalendar />
            {t('footer.updated')}
            &nbsp;
            {new Date().getFullYear()}
        </span>

        {/* licensing message */}
        <p className="flex flex-row items-center text-sm text-muted-foreground">
          {t('footer.main')} - {t('footer.licensing')}
        </p>

        {/* stats + socials */}
        <div className="flex items-center gap-4 ml-auto">
          <SiteStatsWidget />
          
          {/* vertical separator */}
          <div className="w-px h-4 bg-muted-foreground/30" />

          {/* social links */}
          <Link 
            href="https://github.com/iakee" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-foreground"
          >
            <TbBrandGithubFilled className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>

          <Link 
            href="https://linkedin.com/in/giordanogi" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-foreground"
>
            <FaLinkedinIn className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>

          <Link 
            href="https://fiverr.com/giordano_gi" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-foreground"
          >
            <TbBrandFiverr className="h-5 w-5" />
            <span className="sr-only">Fiverr</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
