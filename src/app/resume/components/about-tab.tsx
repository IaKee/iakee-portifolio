"use client";

import { Card } from "@/components/ui/card";
import { useLanguage } from "@/context/language-content";
import { motion } from "framer-motion";

export default function AboutTab() {
  const { t } = useLanguage();

  return (
    <Card className="w-full flex mx-auto rounded-2xl">
      <motion.div
        className="w-[80%] items-center flex-col justify-center mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}>
        <h2 className="flex justify-center md:text-3xl font-bold my-6">
          {t('about.title')}
        </h2>

        <motion.p
          className="text-lg leading-relaxed mb-6"
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
          className="my-8 p-4 rounded-xl border-2 border-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}>
          <h3 className="text-xl font-semibold mb-3">
            {t('about.languages')}
          </h3>
          
          <div className="flex flex-wrap gap-4">
            {/* portuguese */}
            <div className="flex items-center gap-2 rounded-full border-2 px-2">
              {/* level indicator - icon */}
              <div className="w-3 h-3 rounded-full bg-green-500"/>

              {/* language name */}
              <span className="font-medium text-primary">
                {t('about.portuguese')}
              </span>
              
              {/* knowledge level */}
              <span className="text-sm text-muted text-destructive">
                {t('about.portugueseLevel')}
              </span>
            </div>
            
            {/* english */}
            <div className="flex items-center gap-2 rounded-full border-2 px-2">
              {/* level indicator - icon */}
              <div className="w-3 h-3 rounded-full bg-green-500"/>

              {/* language name */}
              <span className="font-medium text-primary">
                {t('about.english')}
              </span>

              {/* knowledge level */}
              <span className="text-sm text-muted text-destructive">
                {t('about.englishLevel')}
              </span>
            </div>

            {/* spanish */}
            <div className="flex items-center gap-2 rounded-full border-2 px-2">
              {/* level indicator - icon */}
              <div className="w-3 h-3 rounded-full bg-yellow-500"/>

              {/* language name */}
              <span className="font-medium text-primary">
                {t('about.spanish')}
              </span>

              {/* knowledge level */}
              <span className="text-sm text-muted text-destructive">
                {t('about.spanishLevel')}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Card>
  )
}