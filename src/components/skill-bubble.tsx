"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface SkillBubbleProps {
  skill: {
    name: string
    level: number
  }
  index: number
}

export default function SkillBubble({ skill, index }: SkillBubbleProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Calculate size based on skill level (70-90)
  const size = 60 + (skill.level - 70) * 1.5

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: index * 0.1,
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 cursor-pointer"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
        whileHover={{
          scale: 1.15,
          boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="text-xs font-medium text-white">{skill.name}</span>
      </motion.div>

      {isHovered && (
        <motion.div
          className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-slate-700 px-3 py-1 rounded text-xs whitespace-nowrap"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
        >
          Proficiency: {skill.level}%
        </motion.div>
      )}
    </motion.div>
  )
}

