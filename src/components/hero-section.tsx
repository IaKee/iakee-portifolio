'use client';

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useLanguage } from '@/context/language-content'
import { ArrowRight, Code, Github, Linkedin, Mail, Twitter } from "lucide-react"
import Link from "next/link"


import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Progress } from "@/components/ui/progress"
import ProjectCard from "@/components/project-card"
import ContactForm from "@/components/contact-form"
import SkillsChart from "@/components/skills-chart"
import BlogPreview from "@/components/blog-preview"


export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <Badge className="inline-block" variant="outline">
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
                <Button asChild>
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
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-foreground">

                  <Twitter className="h-5 w-5" />

                  <span className="sr-only">
                    Twitter
                  </span>
                </Link>

                <Link 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-foreground">
                  
                  <Linkedin className="h-5 w-5" />
                  
                  <span className="sr-only">
                    LinkedIn
                  </span>
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative aspect-square w-full max-w-[400px] overflow-hidden rounded-xl bg-muted">
                <Image
                  src="/profile.jpeg?height=400&width=400"
                  alt="portrait"
                  width={400}
                  height={400}
                  className="object-cover"
                  priority
                />
                
              	<div className="absolute inset-0 border border-foreground/10 rounded-xl" />
            	</div>
          	</div>
        	</div>
        </div>
      </section>
    </main>
  )
}