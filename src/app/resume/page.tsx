"use client";

import { useState, useEffect } from "react"

import { motion } from "framer-motion"
import { Calendar, Github, Linkedin, MapPin } from "lucide-react"
import SkillBubble from "@/components/skill-bubble"
import ExperienceCard from "@/components/experience-card"
import ProjectCard from "@/components/project-card"
import EducationTimeline from "@/components/education-timeline"
import ContactProtection from "@/components/contact-protection"
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useLanguage } from "@/context/language-content";
import ProfessionalCard from "./components/professional-card";

export default function ResumePage() {
  const [activeSection, setActiveSection] = useState("about")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { t } = useLanguage();
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition(
        { x: e.clientX, y: e.clientY }
      )
    }

    window.addEventListener(
      "mousemove", 
      handleMouseMove)
    return () => {
      window.removeEventListener(
        "mousemove", 
        handleMouseMove)
    }
  }, 
  [])


  return (
    <div className="flex min-h-screen flex-col">
      <Header/>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header section */}
        <motion.header
          className="flex flex-col md:flex-row items-center justify-between"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>
  
          <ProfessionalCard />  
        </motion.header>

        {/* Navigation */}
        <motion.nav
          className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}>
          {
            [
              "about", 
              "experience", 
              "skills", 
              "projects", 
              "education"
            ].map(
              (section) => (
                <motion.button
                  key={section}
                  className={
                    `px-4 py-2 rounded-full text-sm md:text-base capitalize transition-all 
                    ${
                      activeSection === section ? 
                      "bg-blue-500 text-white" : "bg-slate-800 text-gray-300 hover:bg-slate-700"
                    }`
                  }
                  onClick={() => setActiveSection(section)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  
                  {t(`resume.sections.${section}`)}
                </motion.button>
          ))}
        </motion.nav>

        {/* Main content */}
        <motion.main
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}>
          
          {/* About section */}
          {activeSection === "about" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-400">About Me</h2>
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

              <motion.div
                className="mt-8 p-4 bg-slate-700/50 rounded-xl border border-blue-500/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}>
                <h3 className="text-xl font-semibold mb-3 text-blue-300">Languages</h3>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="font-medium">Portuguese</span>
                    <span className="text-sm text-gray-400">(Native)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="font-medium">English</span>
                    <span className="text-sm text-gray-400">(C2 - Advanced)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="font-medium">Spanish</span>
                    <span className="text-sm text-gray-400">(Intermediate)</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Experience section */}
          {activeSection === "experience" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-400">Work Experience</h2>
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <ExperienceCard key={index} experience={exp} index={index} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Skills section */}
          {activeSection === "skills" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-400">Skills & Abilities</h2>
              <div className="flex flex-wrap gap-3 justify-center">
                {skills.map((skill, index) => (
                  <SkillBubble key={index} skill={skill} index={index} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Projects section */}
          {activeSection === "projects" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-400">Notable Projects</h2>
              <div className="space-y-8">
                {projects.map((project, index) => (
                  <ProjectCard key={index} project={project} index={index} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Education section */}
          {activeSection === "education" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-400">Education</h2>
              <EducationTimeline education={education} />
            </motion.div>
          )}
        </motion.main>

        <Footer/>
      </div>
    </div>
  )
}

