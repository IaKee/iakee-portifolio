'use client';

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useLanguage } from '@/context/language-content'
import { ArrowRight, Github, Linkedin} from "lucide-react"
import Link from "next/link"

import HoverPreview from "./hover-preview";


export default function HeroSection() {
  const { t } = useLanguage();
  var rawStats = t('hover.github.stats')
  const githubStats = Array.isArray(rawStats) ? rawStats as Array<{ label: string, value: string }> : [];
  rawStats = t('hover.linkedin.stats')
  const linkedinStats = Array.isArray(rawStats) ? rawStats as Array<{ label: string, value: string }> : [];
  rawStats = t('hover.fiverr.stats')
  const fiverrStats = Array.isArray(rawStats) ? rawStats as Array<{ label: string, value: string }> : [];

  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 font-sans bg-red">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <Badge className="inline-block" variant="secondary">
                  {t('hero.availableLabel')}
                </Badge>

                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  {t('hero.title')}
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  {t('hero.summary')}
                </p>
              </div>

              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button variant="default" asChild >
                  <Link href="#contact">
                    {t('hero.actionButton1')} 
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="#projects">
                    {t('hero.actionButton2')}
                  </Link>
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
                  
                    <Github className="h-5 w-5" />
                  
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
                    
                    <Linkedin className="h-5 w-5" />
                    
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

                    <img src="fiverr_icon.png" alt="fiverr.logo" className="h-5 w-5" />

                    <span className="sr-only">
                      Fiverr
                    </span>
                  </Link>
                </HoverPreview>

              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative aspect-square w-full max-w-[400px] overflow-hidden rounded-xl bg-muted">
                <Image
                  src="/opc3.png?height=400&width=400"
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