'use client';

import { Code } from "lucide-react";
import { Progress } from "./ui/progress";
import { useLanguage } from '@/context/language-content'
import Image from "next/image";
import { Card } from "./ui/card";

export default function AboutTab() {
  const { t } = useLanguage();

  const skills = Array.isArray(t('about.skills')) ? t('about.skills') : [];
  const descriptionRaw = Array.isArray(t('about.description')) ? t('about.description') : [];
  const description = descriptionRaw as unknown as string[];
  

  return(
    <main className="flex justify-center items-center bg-muted w-full h-full">
      <Card id="about" className="bg-muted my-6 py-12 border-2 border-muted-foreground w-[80%]">
        <div className="px-4 md:px-6 container">
          <div className="flex flex-col justify-center items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="mb-6 font-bold text-3xl sm:text-4xl md:text-5xl tracking-tighter">
                {t('about.title')}
              </h2>

              <ul className="pl-5 max-w-[900px] text-muted-foreground marker:text-primary lg:text-base/relaxed md:text-xl/relaxed xl:text-xl/relaxed marker:text-xl text-left list-disc">
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

          <div className="items-center gap-6 lg:gap-12 grid lg:grid-cols-2 mx-auto py-12 max-w-5xl">
            <div className="flex flex-col justify-center space-y-4">
              <ul className="gap-6 grid">
              
                {/* Key professional skills */}
                <li className="flex items-center gap-3">
                  <div className="flex justify-center items-center bg-primary/10 rounded-full h-10 aspect-square">
                    <Code className="w-5 h-5 text-primary" />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {t('about.skill1Title')}
                    </h3>

                    <p className="text-muted-foreground text-sm">
                      {t('about.skill1Description')}
                    </p>
                  </div>
                </li>

                <li className="flex items-center gap-3">
                  <div className="flex justify-center items-center bg-primary/10 rounded-full h-10 aspect-square">
                    <Code className="w-5 h-5 text-primary" />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {t('about.skill2Title')}
                    </h3>

                    <p className="text-muted-foreground text-sm">
                      {t('about.skill2Description')}
                    </p>
                  </div>
                </li>

                <li className="flex items-center gap-3">
                  <div className="flex justify-center items-center bg-primary/10 rounded-full h-10 aspect-square">
                    <Code className="w-5 h-5 text-primary" />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {t('about.skill3Title')}
                    </h3>

                    <p className="text-muted-foreground text-sm">
                      {t('about.skill3Description')}
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-4 text-center">
              <p className="my-2 font-semibold text-[80%] md:text">
                {t('about.usedToolsTitle')}
              </p>
              
              <a href="https://github.com/iakee" target="_blank" rel="noopener noreferrer">
                <div className="space-y-2 mx-auto w-[70%] max-w-mdc">
                  <Image 
                    className = "w-full object-contain !relative"
                    width={350}
                    height={165}
                    style={{ height: 'auto' }}
                    src={`https://github-readme-stats.vercel.app/api/top-langs?username=iakee&show_icons=true&locale=${t("about.locale")}&layout=compact`}
                    alt="Github stats"/>

                  <div className="text-[80%] text-muted-foreground text-sm">
                    {t('about.usedToolsDescription')}
                    <p className="text-[80%] text-muted-foreground/30 text-sm">
                      {t('about.usedToolsDescription2')}
                    </p>
                  </div>

                </div>
              </a>

            </div>

          </div>
        </div>
      </Card>
    </main>
  )    
}