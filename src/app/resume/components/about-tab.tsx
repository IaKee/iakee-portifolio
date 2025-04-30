"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function AboutTab() {
  return (
    <Card className="w-full flex mx-auto rounded-2xl">
      <motion.div
        className="w-[80%] items-center flex-col justify-center mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}>
        <h2 className="flex justify-center md:text-3xl font-bold my-6">
          About Me
        </h2>

        <motion.p
          className="text-lg leading-relaxed mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}>
          
          I am a Computer Engineering student at the Federal University of Rio Grande do Sul (UFRGS), currently in
          my 5th semester with an expected graduation in 2026. I am seeking a challenging position as a developer
          where I can apply my problem-solving skills while expanding my experience through a fresh professional
          perspective.
        </motion.p>
        
        <motion.p
          className="text-lg leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}>
          
          I am adaptable, a quick learner, and feel comfortable working both independently and in collaborative
          team environments. With experience as a freelance developer and in technical support, I have developed
          strong skills in programming, problem-solving, and client communication.
        </motion.p>

        {/* language section */}
        <motion.div
          className="my-8 p-4 rounded-xl border-2 border-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}>
          <h3 className="text-xl font-semibold mb-3">
            Languages
          </h3>
          
          <div className="flex flex-wrap gap-4">
            {/* portuguese */}
            <div className="flex items-center gap-2 rounded-full bg-accent px-2">
              {/* level indicator - icon */}
              <div className="w-3 h-3 rounded-full bg-green-500"/>

              {/* language name */}
              <span className="font-medium text-primary">
                Portuguese
              </span>
              
              {/* knowledge level */}
              <span className="text-sm text-gray-400 text-destructive">
                (Native)
              </span>
            </div>
            
            {/* english */}
            <div className="flex items-center gap-2 rounded-full bg-accent px-2">
              {/* level indicator - icon */}
              <div className="w-3 h-3 rounded-full bg-green-500"/>

              {/* language name */}
              <span className="font-medium text-primary">
                English
              </span>

              {/* knowledge level */}
              <span className="text-sm text-gray-400 text-destructive">
                (C2 - Advanced)
              </span>
            </div>

            {/* spanish */}
            <div className="flex items-center gap-2 rounded-full bg-accent px-2">
              {/* level indicator - icon */}
              <div className="w-3 h-3 rounded-full bg-yellow-500"/>

              {/* language name */}
              <span className="font-medium text-primary">
                Spanish
              </span>

              {/* knowledge level */}
              <span className="text-sm text-gray-400 text-destructive">
                (Intermediate)
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Card>
  )
}