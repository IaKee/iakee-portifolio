"use client";

import { Card } from "@/components/ui/card";
import { useLanguage } from "@/context/language-content";
import { motion } from "framer-motion";

export default function AboutTab() {
  const { t } = useLanguage();

  return (
    <Card className="flex mx-auto rounded-2xl w-full">
      <motion.div
        className="flex-col justify-center items-center mx-auto w-[80%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}>
        <h2 className="flex justify-center my-6 font-bold md:text-3xl">
          {t('about.title')}
        </h2>

        <motion.p
          className="mb-6 text-lg leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}>
          {t('about.resumeDescription')}
        </motion.p>

        <motion.p
          className="text-lg leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}>
          {t('about.resumeDescription2')}
        </motion.p>

        {/* language section */}
        <motion.div
          className="my-8 p-4 border-2 border-primary rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}>
          <h3 className="mb-3 font-semibold text-xl">
            {t('about.languages')}
          </h3>
          
          <div className="flex flex-wrap gap-4">
            {/* portuguese */}
            <div className="flex items-center gap-2 px-2 border-2 rounded-full">
              {/* level indicator - icon */}
              <div className="bg-green-500 rounded-full w-3 h-3"/>

              {/* language name */}
              <span className="font-medium text-primary">
                {t('about.portuguese')}
              </span>
              
              {/* knowledge level */}
              <span className="text-muted-foreground text-sm">
                {t('about.portugueseLevel')}
              </span>
            </div>
            
            {/* english */}
            <div className="flex items-center gap-2 px-2 border-2 rounded-full">
              {/* level indicator - icon */}
              <div className="bg-green-500 rounded-full w-3 h-3"/>

              {/* language name */}
              <span className="font-medium text-primary">
                {t('about.english')}
              </span>

              {/* knowledge level */}
              <span className="text-muted-foreground text-sm">
                {t('about.englishLevel')}
              </span>
            </div>

            {/* spanish */}
            <div className="flex items-center gap-2 px-2 border-2 rounded-full">
              {/* level indicator - icon */}
              <div className="bg-yellow-500 rounded-full w-3 h-3"/>

              {/* language name */}
              <span className="font-medium text-primary">
                {t('about.spanish')}
              </span>

              {/* knowledge level */}
              <span className="text-muted-foreground text-sm">
                {t('about.spanishLevel')}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Card>
  )
}