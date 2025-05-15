"use client";

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useLanguage } from "@/context/language-content";
import ProfessionalCard from "./components/professional-card";
import AboutTab from "./components/about-tab";
import ExperiencesTab from "./components/experiences-tab";
import { FaDownload } from "react-icons/fa";
import SkillsTab from "./components/skills-tab";
import EducationTab from "./components/education-tab";

export default function ResumePage() {
  const [activeSection, setActiveSection] = useState("about")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const { locale, t } = useLanguage();
  const prefix = process.env.NODE_ENV === "production" ? "" : "";
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
      ? `${prefix}/resume/Curriculo - Giordano Souza.pdf`
      : `${prefix}/resume/Resume - Giordano Souza.pdf`;

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
            items-center
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
                    h-10
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

          {/* download button and description*/}
          <div>
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
                bg-primary
                cursor-pointer'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              
              {/* does not respect hovering colors, as it is not a selectable tab */}
              <FaDownload className="h-4 w-4"/>
              {t('resume.download')}

            </motion.button>
            
            <p className="text-xs text-muted-foreground text-center mt-2">
              {t('resume.downloadDescription')}
            </p>
            
          </div>
        </motion.nav>

        {/* main contents */}
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
          
          {/* about section */}
          {activeSection === "about" && <AboutTab />}

          {/* experience section */}
          {activeSection === "experience" && <ExperiencesTab/>}

          {/* skills section */}
          {activeSection === "skills" && <SkillsTab />}

          {/* projects section */}
          {/* TODO: this*/}

          {/* Education section */}
          {activeSection === "education" && <EducationTab/>}

        </motion.main>

        <Footer/>
      </div>
    </div>
  )
}

