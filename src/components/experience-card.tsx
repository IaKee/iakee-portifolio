"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronDown, ChevronUp, Building } from "lucide-react"

interface ExperienceCardProps {
  experience: {
    title: string
    company: string
    period: string
    description: string[]
  }
  index: number
}

export default function ExperienceCard({ experience, index }: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      className="bg-slate-700/50 rounded-xl p-5 border border-blue-500/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <div className="hidden sm:flex h-12 w-12 rounded-full bg-blue-500/20 items-center justify-center">
            <Building className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{experience.title}</h3>
            <p className="text-blue-300">{experience.company}</p>
            <p className="text-sm text-gray-400">{experience.period}</p>
          </div>
        </div>
        <motion.button
          className="p-2 rounded-full bg-slate-800 hover:bg-blue-500/20 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </motion.button>
      </div>

      <motion.div
        className="mt-4"
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{ overflow: "hidden" }}
      >
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          {experience.description.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}

