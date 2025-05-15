'use client';

import { useLanguage } from '@/context/language-content'
import ProjectCard from "./project-card";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { MdWork } from "react-icons/md";
import { FaListAlt } from "react-icons/fa";
import { forwardRef } from "react"

const FeaturedProjects = forwardRef<HTMLDivElement>((props, ref) => {
  const { t } = useLanguage();

  return(
    <main ref={ref}>
      <section id="projects" className="w-full py-[8%]">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {t('featured.title')}
              </h2>

              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t('featured.description')}
              </p>
            </div>
          </div>

          <div className="mx-auto grid max-w-5xl items-stretch gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            <ProjectCard
              title = {t('featured.projects.runelingual.title')}
              description = {t('featured.projects.runelingual.description')}
              image = "/runelingual-preview.webp?height=300&width=400"
              tags = {t('featured.projects.runelingual.tags') as unknown as string[]}
              actionButton1 = {t('featured.projects.runelingual.actionButton1')}
              actionHook1 = {t('featured.projects.runelingual.actionHook1')}
              actionButton2 = {t('featured.projects.runelingual.actionButton2')}
              actionHook2 = {t('featured.projects.runelingual.actionHook2')}/>

            <ProjectCard
              title = {t('featured.projects.syncwizard.title')}
              description = {t('featured.projects.syncwizard.description')}
              image = "/syncwizard.png?height=300&width=400"
              tags = {t('featured.projects.syncwizard.tags') as unknown as string[]}
              actionButton1 = {t('featured.projects.syncwizard.actionButton1')}
              actionHook1 = {t('featured.projects.syncwizard.actionHook1')}
              actionButton2 = ""
              actionHook2 = ""/>

            <ProjectCard
              title = {t('featured.projects.iam.title')}
              description = {t('featured.projects.iam.description')}
              image = "/tarico.png?height=300&width=400"
              tags = {t('featured.projects.iam.tags') as unknown as string[]}
              actionButton1 = {t('featured.projects.iam.actionButton1')}
              actionHook1 = {t('featured.projects.iam.actionHook1')}
              actionButton2 = ""
              actionHook2 = ""/>

            <ProjectCard
              title = {t('featured.projects.portfolio.title')}
              description = {t('featured.projects.portfolio.description')}
              image = "/portifolio.png?height=300&width=400"
              tags = {t('featured.projects.portfolio.tags') as unknown as string[]}
              actionButton1 = {t('featured.projects.portfolio.actionButton1')}
              actionHook1 = {t('featured.projects.portfolio.actionHook1')}
              actionButton2 = ""
              actionHook2 = ""/>

            <ProjectCard
              title = {t('featured.projects.chatbot.title')}
              description = {t('featured.projects.chatbot.description')}
              image = ""
              tags = {t('featured.projects.chatbot.tags') as unknown as string[]}
              actionButton1 = {t('featured.projects.chatbot.actionButton1')}
              actionHook1 = {t('featured.projects.chatbot.actionHook1')}
              actionButton2 = ""
              actionHook2 = ""/>

            <ProjectCard
              title = {t('featured.projects.nundertale.title')}
              description = {t('featured.projects.nundertale.description')}
              image = "/nundertale.png?height=300&width=400"
              tags = {t('featured.projects.nundertale.tags') as unknown as string[]}
              actionButton1 = {t('featured.projects.nundertale.actionButton1')}
              actionHook1 = {t('featured.projects.nundertale.actionHook1')}
              actionButton2 = ""
              actionHook2 = ""/>
          </div>

        </div>
          <div className="flex justify-center gap-2">
            <Link href="/projects">
              <Button 
                variant="secondary" 
                className="rounded-full cursor-pointer">
                
                <FaListAlt />
                {t('featured.actionButton1')} 
              </Button>
            </Link>
            
  
              <Button 
                variant="default" 
                className="rounded-full cursor-pointer"
                onClick={
                  () => {
                    localStorage.setItem("prefillMessage", t("prefill.orderProject"))
                    window.location.href = "/"
                  }
                }>
                
                <MdWork className="h-4 w-4" />
                {t('featured.actionButton2')} 
              </Button>
          </div>
      </section>
    </main>
  )
}
)

export default FeaturedProjects;