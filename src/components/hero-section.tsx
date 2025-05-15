'use client';

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { ArrowRight, Github, Linkedin} from "lucide-react"
import Link from "next/link"

import HoverPreview from "./hover-preview";
import { TbBrandFiverr, TbBrandGithubFilled } from "react-icons/tb";
import { FaLinkedinIn } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { RiTimeZoneFill } from "react-icons/ri";

import { useLanguage } from '@/context/language-content'

export default function HeroSection() {
  const { locale, t } = useLanguage();

  const prefix = process.env.NODE_ENV === "production" ? "/iakee-portifolio" : "";

  var rawStats = t('hover.github.stats')
  const githubStats = Array.isArray(rawStats) 
    ? rawStats as Array<{ label: string, value: string }> 
    : [];

  rawStats = t('hover.linkedin.stats')
  const linkedinStats = Array.isArray(rawStats) 
    ? rawStats as Array<{ label: string, value: string }> 
    : [];

  rawStats = t('hover.fiverr.stats')
  const fiverrStats = Array.isArray(rawStats) 
    ? rawStats as Array<{ label: string, value: string }> 
    : [];

  const handleDownload = () => {
    const path = locale === 'ptbr'
      ? '/resume/Curriculo - Giordano Souza.pdf'
      : '/resume/Resume - Giordano Souza.pdf';

    const link = document.createElement('a');
    link.href = path;
    link.download = path.split('/').pop() || 'resume.pdf';
    link.click();
  };

  return (
    <main className="flex-1">
      <section className="w-full py-[8%]">
        <div className="container mx-auto px-[5%]">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              {/* main info */}
              <div className="space-y-2">

                {/* status badges */}
                <div className="flex flex-wrap gap-2">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="flex flex-row items-center gap-1 px-2 py-1 text-xs" variant="outline">
                      <MdEventAvailable className="text-base" />
                      {t('hero.workStatus')}
                    </Badge>

                    <Badge className="flex flex-row items-center gap-1 px-2 py-1 text-xs" variant="outline">
                      <RiTimeZoneFill />
                      {t('hero.workHours')}
                    </Badge>
                  </div>
                </div>

                {/* main title */}
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">
                  {t('hero.title')}
                </h1>

                {/* main description */}
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  {t('hero.summary')}
                </p>
              </div>

              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="#contact">
                  <Button 
                    variant="default" 
                    className="rounded-full cursor-pointer">
                    {t('hero.actionButton1')} 
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
               
                <Button 
                  variant="outline" 
                  className="rounded-full cursor-pointer" 
                  onClick={handleDownload}>
                  {t('hero.actionButton2')}
                </Button>
          
              </div>

              <div className="flex items-center gap-4 text-muted-foreground">
                <HoverPreview 
                  title = {t('hover.github.title')}
                  description = {t('hover.github.description')}
                  stats = {githubStats}>

                  <Link 
                    href="https://github.com/iakee" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="hover:text-foreground">
                  
                    <TbBrandGithubFilled className="h-5 w-5" />
                  
                    <span className="sr-only">
                      GitHub
                    </span>
                  </Link>
                </HoverPreview>

                <HoverPreview
                  title = {t('hover.linkedin.title')}
                  description = {t('hover.linkedin.description')}
                  stats = {linkedinStats}>

                  <Link 
                    href="https://linkedin.com/in/giordanogi" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="hover:text-foreground">
                    
                    <FaLinkedinIn className="h-5 w-5" />
                    
                    <span className="sr-only">
                      LinkedIn
                    </span>
                  </Link>
                </HoverPreview>

                <HoverPreview
                  title = {t('hover.fiverr.title')}
                  description = {t('hover.fiverr.description')}
                  stats = {fiverrStats}>
                  <Link 
                    href="https://fiverr.com/giordano_gi" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="hover:text-foreground">

                    <TbBrandFiverr className="h-5 w-5" />

                    <span className="sr-only">
                      Fiverr
                    </span>
                  </Link>
                </HoverPreview>

              </div>
            </div>
            
            {/* profile picture */}
            <div className="flex items-center justify-center">
              <div className="relative aspect-square w-full max-w-[400px] max-h-[400px] overflow-hidden rounded-xl bg-muted">
                <Image
                  src={`${prefix}/opc3.png?height=400&width=400`}
                  alt="portrait"
                  width={400}
                  height={400}
                  className="object-cover"
                  priority/>
              	<div className="absolute inset-0 border border-foreground/10 rounded-xl" />
            	</div>
          	</div>
        	</div>
        </div>
      </section>
    </main>
  )
}