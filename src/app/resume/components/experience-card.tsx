"use client";

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronDown, ChevronUp, Building } from "lucide-react"
import { useLanguage } from "@/context/language-content";
import { FaExternalLinkAlt } from "react-icons/fa";
import Image from "next/image";

interface ExperienceCardProps {
  experience: {
    title: string
    company: string
    period: string
    hook: string
    icon: string
    roleFunctions: string[]
  }
  index: number
}

export default function ExperienceCard({ experience, index }: ExperienceCardProps) {
  
  const [isExpanded, setIsExpanded] = useState(false);
  const prefix = process.env.NODE_ENV === "production" ? "" : "";

  return (
    <motion.div
      className="rounded-xl p-5 border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}>

      <div className="flex justify-between items-start">
        
        {/* role details */}
        <div className="flex gap-4 items-center">
          
          {/* company logo */}
          <div className="
            flex 
            h-12
            w-12 
            items-center 
            justify-center">
            {
              experience.icon
                ? <Image 
                    src={`${prefix}/${experience.icon}`}
                    alt={experience.company} 
                    className="flex h-8 w-8 rounded-full bg:primary-foreground border-primary border-3" /> 
                : <Building className="flex h-8 w-8 rounded-full bg:primary-foreground border-primary border-3" />
            }
          </div>
          
          <div onClick={() => setIsExpanded(true)}>
            <h3 className="text-xl font-bold">
              {experience.title}
            </h3>
            <p>
              {experience.company}
            </p>
            
            <p className="text-sm">
              {experience.period}
            </p>
          </div>
        </div>
        
        <div className="flex gap-1 justify-end items-center">
          <motion.a
            className="
              flex
              p-2 
              rounded-full
              hover:scale-[1.5]
              transition-all"
            href={experience.hook}
            target="_blank">
            <FaExternalLinkAlt size={14}/>
          </motion.a>

          <motion.button
            className="flex p-2 rounded-full"
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.9 }}>
            {
              isExpanded 
                ? <ChevronUp size={18} /> 
                : <ChevronDown size={18} />
            }
          </motion.button>
        </div>
      </div>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
          paddingTop: isExpanded ? 25 : 0}        }
        transition={{ duration: 0.3 }}
        style={{ overflow: "hidden" }}>
        <ul className="list-disc list-inside space-y-2">
          {
            experience.roleFunctions.map(
              (item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}>
                  
                  {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}

