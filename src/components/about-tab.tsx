'use client';

import { Code } from "lucide-react";
import { Progress } from "./ui/progress";
import { useLanguage } from '@/context/language-content'

export default function AboutTab() {
  const { t } = useLanguage();

  const skills = Array.isArray(t('about.skills')) ? t('about.skills') : [];

  return(
    <main>
      <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {t('about.title')}
              </h2>

              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t('about.description')}
              </p>
            </div>
          </div>

          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <ul className="grid gap-6">
              
                {/* Key professional skills */}
                {skills.map((element: any, index: number) => (
                  <li className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                     <Code className="h-5 w-5 text-primary" />
                    </div>

                    <div>
                      <h3 className="font-semibold">
                       {element.title}
                      </h3>

                      <p className="text-sm text-muted-foreground">
                       {element.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">
                    {t('about.toolsTitle')}
                  </h3>

                </div>

                {/* programming tool icons here */}
                icons here
              
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )    
}