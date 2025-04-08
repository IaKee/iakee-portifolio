"use client"

import { motion } from "framer-motion"
import { GraduationCap, BookOpen } from "lucide-react"

interface EducationProps {
  education: {
    institution: string
    degree: string
    period: string
    details: string
    courses: string
  }[]
}

export default function EducationTimeline({ education }: EducationProps) {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-0 md:left-1/2 top-0 h-full w-0.5 bg-blue-500/30 transform -translate-x-1/2"></div>

      {/* Timeline items */}
      <div className="space-y-12">
        {education.map((edu, index) => (
          <motion.div
            key={index}
            className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.3 }}
          >
            {/* Timeline dot */}
            <div className="absolute left-0 md:left-1/2 top-0 w-6 h-6 rounded-full bg-blue-500 transform -translate-x-1/2 flex items-center justify-center">
              {index === 0 ? (
                <GraduationCap size={14} className="text-white" />
              ) : (
                <BookOpen size={14} className="text-white" />
              )}
            </div>

            {/* Content */}
            <div
              className={`w-full md:w-1/2 ${
                index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
              } pl-10 md:pl-0`}
            >
              <motion.div
                className="bg-slate-700/50 p-5 rounded-xl border border-blue-500/20"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-bold text-white">{edu.institution}</h3>
                <p className="text-blue-300">{edu.degree}</p>
                <p className="text-sm text-gray-400 mb-2">
                  {edu.period} • {edu.details}
                </p>
                <div className="mt-3 p-3 bg-slate-800/50 rounded-lg">
                  <h4 className="text-sm font-semibold text-blue-300 mb-1">Relevant Courses:</h4>
                  <p className="text-xs text-gray-300">{edu.courses}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

