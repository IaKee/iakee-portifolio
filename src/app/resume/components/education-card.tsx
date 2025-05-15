"use client";

import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"
import { ChevronDown, ChevronUp, Building } from "lucide-react"
import { useLanguage } from "@/context/language-content";
import { FaExternalLinkAlt } from "react-icons/fa";
                
interface CourseCardProps {
  course: {
    degree: string
    institution: string
    period: string
    hook: string
    icon: string
    courses: string[]
  }
  index: number
}

export default function ExperienceCard({ course, index }: CourseCardProps) {
  
  const [isExpanded, setIsExpanded] = useState(false);
  const prefix = process.env.NODE_ENV === "production" ? "/iakee-portifolio" : "";

  return (
    <motion.div
      className="rounded-xl p-5 border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}>

      <div className="flex justify-between items-start">
        
        {/* role details */}
        <div className="flex gap-4 items-center">
          
          {/* school logo */}
          <div className="
            flex 
            h-12
            w-12 
            items-center 
            justify-center">
            {
              course.icon
                ? <Image 
                    src={`${prefix}/${course.icon}`} 
                    alt={course.institution} 
                    className="flex h-8 w-8 rounded-full bg:primary-foreground border-primary border-3" /> 
                : <Building className="flex h-8 w-8 rounded-full bg:primary-foreground border-primary border-3" />
            }
          </div>
          
          <div onClick={() => setIsExpanded(true)}>
            <h3 className="text-xl font-bold">
              {course.degree}
            </h3>
            <p>
              {course.institution}
            </p>
            
            <p className="text-sm">
              {course.period}
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
            href={course.hook}
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
            course.courses.map(
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

