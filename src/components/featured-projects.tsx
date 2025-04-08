'use client';

import { useLanguage } from '@/context/language-content'
import ProjectCard from "./project-card";
import { Button } from "./ui/button";
import { ArrowRight, Link } from "lucide-react";

export default function FeaturedProjects() {
  const { t } = useLanguage();

  return(
    <main>
      <section id="projects" className="w-full py-12 md:py-24 lg:py-32">
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
              tags = {t('featured.projects.runelingual.tags')}
              actionButton1 = {t('featured.projects.runelingual.actionButton1')}
              actionHook1 = {t('featured.projects.runelingual.actionHook1')}
              actionButton2 = {t('featured.projects.runelingual.actionButton2')}
              actionHook2 = {t('featured.projects.runelingual.actionHook2')}/>

            <ProjectCard
              title = {t('featured.projects.syncwizard.title')}
              description = {t('featured.projects.syncwizard.description')}
              image = ""
              tags = {t('featured.projects.syncwizard.tags')}
              actionButton1 = {t('featured.projects.syncwizard.actionButton1')}
              actionHook1 = {t('featured.projects.syncwizard.actionHook1')}
              actionButton2 = ""
              actionHook2 = ""/>

            <ProjectCard
              title = {t('featured.projects.iam.title')}
              description = {t('featured.projects.iam.description')}
              image = ""
              tags = {t('featured.projects.iam.tags')}
              actionButton1 = {t('featured.projects.iam.actionButton1')}
              actionHook1 = {t('featured.projects.iam.actionHook1')}
              actionButton2 = ""
              actionHook2 = ""/>

            <ProjectCard
              title = {t('featured.projects.portfolio.title')}
              description = {t('featured.projects.portfolio.description')}
              image = ""
              tags = {t('featured.projects.portfolio.tags')}
              actionButton1 = {t('featured.projects.portfolio.actionButton1')}
              actionHook1 = {t('featured.projects.portfolio.actionHook1')}
              actionButton2 = ""
              actionHook2 = ""/>
          </div>

          <div className="flex justify-center">
            <Button variant="outline" asChild>
              <Link href="/projects">
                View all projects 
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}