"use client";

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import SkillBubble from "@/app/resume/components/skill-bubble"
import ProjectCard from "@/components/project-card"
import EducationTimeline from "@/components/education-timeline"
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useLanguage } from "@/context/language-content";
import ProfessionalCard from "./components/professional-card";
import AboutTab from "./components/about-tab";
import ExperiencesTab from "./components/experiences-tab";
import { FaDownload } from "react-icons/fa";
import SkillsTab from "./components/skills-tab";

export default function ResumePage() {
  const [activeSection, setActiveSection] = useState("skills")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const { locale, t } = useLanguage();
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
  []);

  const handleDownload = () => {
    const path = locale === 'ptbr'
      ? '/resume/Curriculo - Giordano Souza.pdf'
      : '/resume/Resume - Giordano Souza.pdf';

    const link = document.createElement('a');
    link.href = path;
    link.download = path.split('/').pop() || 'resume.pdf';
    link.click();
  };

  return (
    <div className="flex w-full min-h-screen flex-col">
      <Header/>

      <div className="w-[80%] mx-auto relative z-10">
        {/* Header section */}
        <motion.header
          className="
            flex flex-col 
            md:flex-row 
            items-center 
            justify-between"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>
  
          <ProfessionalCard />  
        </motion.header>

        {/* navigation tabs */}
        {/* TODO: outline bubble here */}
        <motion.nav
          className="
            flex 
            flex-wrap 
            justify-center 
            gap-2 
            md:gap-4"
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
                  onMouseEnter={() => setHoveredSection(section)}
                  onMouseLeave={() => setHoveredSection(null)}
                  className={`
                    px-4 
                    py-2 
                    rounded-full 
                    text-sm 
                    md:text-base 
                    capitalize 
                    transition-all 
                    ${
                      activeSection === section 
                      ? hoveredSection && hoveredSection !== section
                        // active section but when another section is being hovered
                        ? "bg-muted text-secondary-foreground underline hover:bg-primary hover:text-primary-foreground scale-[1.05] transition-all"
                        
                        // when the section is active
                        : 'bg-primary text-primary-foreground scale-[1.10] transition-all'

                      // when the section is not active and not being hovered over
                      : "bg-muted text-secondary-foreground hover:bg-primary hover:text-primary-foreground hover:scale-[1.05] transition-all"
                    }`
                  }
                  onClick={() => setActiveSection(section)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  
                  {t(`resume.sections.${section}`)}
                </motion.button>
              )
            )
          }
          
          {/* vertical separator between tab buttons and download button */}
          <div className="flex items-center justify-center w-px h-10 bg-muted-foreground hidden md:block" />

          {/* download button */}
          <motion.button
            onClick={handleDownload}
            className='
              px-4 
              py-2 
              flex
              items-center
              gap-2 
              rounded-full 
              text-sm 
              md:text-base 
              capitalize 
              transition-all
              text-primary-foreground
              bg-primary'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            
            {/* does not respect hovering colors, as it is not a selectable tab */}
            <FaDownload className="h-4 w-4"/>
            {t('resume.download')}
                
          </motion.button>
        </motion.nav>

        {/* Main content */}
        <motion.main
          className="
            flex flex-col
            md:flex-row
            items-center
            backdrop-blur-sm 
            rounded-2xl 
            my-10
            shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}>
          
          {/* About section */}
          {activeSection === "about" && <AboutTab />}

          {/* Experience section */}
          {activeSection === "experience" && <ExperiencesTab/>}

          {/* Skills section */}
          {activeSection === "skills" && <SkillsTab />}

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

