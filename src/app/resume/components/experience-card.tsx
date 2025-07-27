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
      className="p-5 border rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}>

      <div className="flex justify-between items-start">
        
        {/* role details */}
        <div className="flex items-center gap-4">
          
          {/* company logo */}
          <div className="flex justify-center items-center w-12 h-12">
            {
              experience.icon
                ? <Image 
                    src={`${prefix}/${experience.icon}`}
                    alt={experience.company} 
                    width={5}
                    height={5}
                    className="flex border-3 border-primary rounded-full w-8 h-8 bg:primary-foreground" /> 
                : <Building className="flex border-3 border-primary rounded-full w-8 h-8 bg:primary-foreground" />
            }
          </div>
          
          <div onClick={() => setIsExpanded(true)}>
            <div className="font-bold text-xl">
              {experience.title}
            </div>
            
            <div>
              {experience.company}
            <div/>
            
            <div className="text-sm">
              {experience.period}
            </div>
          </div>
        </div>
        </div>
        
        <div className="flex justify-end items-center gap-1">
          <motion.a
            className="flex p-2 rounded-full hover:scale-[1.5] transition-all"
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
        <ul className="space-y-2 list-disc list-inside">
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

