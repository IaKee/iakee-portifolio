'use client';

import { Code } from "lucide-react";
import { Progress } from "./ui/progress";
import { useLanguage } from '@/context/language-content'

export default function AboutTab() {
  const { t } = useLanguage();

  const skills = Array.isArray(t('about.skills')) ? t('about.skills') : [];
  const descriptionRaw = Array.isArray(t('about.description')) ? t('about.description') : [];
  const description = descriptionRaw as unknown as string[];

  return(
    <main>
      <section id="about" className="w-full py-12 w-full py-[8%] bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold mb-6 tracking-tighter sm:text-4xl md:text-5xl">
                {t('about.title')}
              </h2>

              <ul className="
                max-w-[900px] 
                list-disc 
                pl-5 
                text-left 
                text-muted-foreground 
                md:text-xl/relaxed 
                lg:text-base/relaxed 
                xl:text-xl/relaxed 
                marker:text-xl 
                marker:text-primary">
                {
                  description.map(
                    (paragraph, index) => (
                      <li key={index}>
                        {paragraph}
                      </li>
                    )
                  )
                }
              </ul>
            </div>
          </div>

          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <ul className="grid gap-6">
              
                {/* Key professional skills */}
                <li className="flex items-center gap-3">
                  <div className="flex aspect-square h-10 items-center justify-center rounded-full bg-primary/10">
                    <Code className="h-5 w-5 text-primary" />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {t('about.skill1Title')}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {t('about.skill1Description')}
                    </p>
                  </div>
                </li>

                <li className="flex items-center gap-3">
                  <div className="flex aspect-square h-10 items-center justify-center rounded-full bg-primary/10">
                    <Code className="h-5 w-5 text-primary" />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {t('about.skill2Title')}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {t('about.skill2Description')}
                    </p>
                  </div>
                </li>

                <li className="flex items-center gap-3">
                  <div className="flex aspect-square h-10 items-center justify-center rounded-full bg-primary/10">
                    <Code className="h-5 w-5 text-primary" />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {t('about.skill3Title')}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {t('about.skill3Description')}
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-4 text-center">
              <p className="md:text font-semibold text-[80%]">
                {t('about.usedToolsTitle')}
              </p>
              
              <a href="https://github.com/iakee" target="_blank" rel="noopener noreferrer">
                <div className="mx-auto w-[70%] max-w-mdc space-y-2">
                  <img 
                    className = "w-full h-auto object-contain"
                    src={`https://github-readme-stats.vercel.app/api/top-langs?username=iakee&show_icons=true&locale=${t("about.locale")}&layout=compact`}
                    alt="If you are reading this, my stats tab is broken =/"/>

                  <div className="text-sm text-muted-foreground text-[80%]">
                    {t('about.usedToolsDescription')}
                    <p className="text-sm text-muted-foreground/30 text-[80%]">
                      {t('about.usedToolsDescription2')}
                    </p>
                  </div>

                </div>
              </a>

            </div>

          </div>
        </div>
      </section>
    </main>
  )    
}