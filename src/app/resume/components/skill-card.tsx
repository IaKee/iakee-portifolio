import { AnimatePresence, motion } from "framer-motion"
import { Skill } from "./skills-tab"
import { use, useEffect, useRef, useState } from "react"
import { ExternalLink, Link, X } from "lucide-react"
import { Button } from "@/components/ui/button"

import DynamicFaIcon from "./dynamic-fa-icon"
import ProjectBrowser from "./project-browser"
import { useLanguage } from "@/context/language-content"

export default function SkillCard(
  {
    skill,
    index,
    isLoaded,
    categoryColor,
    getExpertiseLevel,
    getExpertiseColor,
    activePreview,
    setActivePreview,
  }: {
      skill: Skill
      index: number
      isLoaded: boolean
      categoryColor: string
      getExpertiseLevel: (evaluation: number) => string,
      getExpertiseColor: (expertise: number) => string,
      activePreview: string | null
      setActivePreview: (preview: string | null) => void
  } 
) {
  const expertiseLevel = getExpertiseLevel(skill.selfEvaluation);
  const expertiseColor = getExpertiseColor(skill.selfEvaluation);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inactivityTimer, setInactivityTimer] = useState<NodeJS.Timeout | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const currentProject = skill.notableProjects[activeProjectIndex];
  const cardId = `skill-${skill.name.toLowerCase().replace(/\s+/g, "-")}`;
  const isPreviewActive = activePreview === cardId;

  const { t } = useLanguage();
  
  const navigateProjects = (direction: "next" | "prev") => {
    // counts as activity, resets inactivity timer so this panel won't close
    resetInactivityTimer();

    if(direction === "next") {
      setActiveProjectIndex(
        (prevIndex) => 
          (prevIndex === skill.notableProjects.length - 1 
            ? 0 
            : prevIndex + 1
          )
      )
    } else {
      setActiveProjectIndex( 
        prevIndex => 
          prevIndex === 0 
            ? skill.notableProjects.length - 1 
            : prevIndex - 1 
      );
    }
    setIsExpanded(true);
  }

  const expandProject = () => {
    // counts as activity, resets inactivity timer so this panel won't close
    resetInactivityTimer();
    setIsExpanded(!isExpanded);
  }

  const resetInactivityTimer = () => {
    if(inactivityTimer) {
      clearTimeout(inactivityTimer);
    }
    
    // allows for 15 seconds of inactivity before closing the preview
    // TODO: change this
    const timer = setTimeout(
      () => {
        setIsExpanded(false);
        setActiveProjectIndex(0);
      }, 
      150000) 
    
    setInactivityTimer(timer);
  }
  
  // clears the inactivity timer when the component unmounts
  useEffect(
    () => {
      return () => {
        if(inactivityTimer) {
          clearTimeout(inactivityTimer);
        }
      }
    },
    [inactivityTimer]
  )

  useEffect(
    () => {
      return () => {
        // TODO: remove this after implementation
        if(isExpanded) {
          window.location.href = "/"
        }
      }
    }
  )
  const hasMultipleProjects = skill.notableProjects.length > 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isLoaded ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: { duration: 0.2 },
      }}
      onMouseEnter={resetInactivityTimer}
      className="
        relative 
        bg-[#252525] 
        rounded-xl 
        overflow-hidden 
        border 
        border-[#333] 
        hover:border-[#444] 
        transition-all 
        duration-300">
      <div className="p-5">
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3 mb-3">
            {/* language icon */}
            <div
              className={
                skill.icon
                  ? ""
                  :
                    `p-2.5 
                    rounded-lg 
                    ${`bg-${expertiseColor}`} 
                    bg-opacity-20 
                    flex 
                    items-center 
                    justify-center 
                    w-10 
                    h-10`
              }>
              
              {/* default language icon */}
              {
                skill.icon && expertiseColor
                  ? (
                    <DynamicFaIcon 
                      iconName={skill.icon.title} 
                      iconPackage={skill.icon.package}
                      className={`
                        w-10 
                        h-10 
                        fill-${expertiseColor}
                        text-${expertiseColor} `} />
                  ) : (
                    <span className="font-bold text-lg">
                      {skill.name.charAt(0)}
                    </span>
                  )
              }
            </div>
            
            {/* skill name and expertise level */}
            <div>
              {/* title */}
              <h3 className="text-lg font-bold">
                {skill.name}
              </h3>

              {/* subtitle */}
              <p className="text-sm text-gray-400">
                {expertiseLevel}
              </p>

            </div>
          </div>
          
          {/* close preview button */}
          { 
            isExpanded && (
              <button 
                className="
                  hover:bg-secondary
                  p-1
                  rounded-full
                  transition-all"  
                onClick={
                  () => {
                    setIsExpanded(false);
                  }
                }>
                
                <X className="flex items-center justify-center w-5 h-5"/>
              </button>
            )
          }
        </div>

        {/* skill contents and projects */}
        <div className="mt-3 relative min-h-[120px]">
          <AnimatePresence mode="wait">
            {
              isExpanded 
              ? (
                <ProjectBrowser projects={skill.notableProjects} activeProjectId={null} activeProject={null} />
              ) 
              : (
                // TODO: change this to expand project on click
                <motion.div
                  key="collapsed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-gray-300 line-clamp-3 cursor-pointer">

                  {/* list of notable projects */}
                  <ul className="flex flex-col gap-1">
                    {
                      skill.notableProjects.map(
                        (project, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 + 0.3 }}
                            className="
                              flex 
                              rounded-full
                              px-2
                              items-center 
                              gap-2
                              hover:py-1
                              hover:bg-accent/50
                              transition-all">
                            
                            {/* topic icon */}
                            <div className={`
                              h-2.5 
                              w-2.5
                              rounded-full 
                              bg-${expertiseColor}
                              flex 
                              items-center 
                              justify-center`}/>
                              
                            
                            {/* topic label */}
                            <span className="
                              hover:underline 
                              hover:scale-[1.05] 
                              origin-left 
                              transition-all 
                              cursor-pointer">
                              {project.title}
                            </span>
                          
                        </motion.li>
                        )
                      )
                    }
                  </ul>
                </motion.div>
              )
            }
          </AnimatePresence>
        </div>

        {/* project index indicator circles */}
        { 
          isExpanded && hasMultipleProjects && (
            <div className="flex justify-center gap-1 mt-3">
              {
                skill.notableProjects.map(
                  (_, i) => (
                    <button
                      key={i}
                      className={`
                        w-2 
                        h-2 
                        rounded-full 
                        transition-all 
                        ${
                          i === activeProjectIndex 
                            ? "bg-white scale-110" 
                            : "bg-gray-600"
                        }`
                      }
                      onClick={
                        () => {
                          //setActiveProjectIndex(i)
                          //expandProject()
                        }
                      }/>
                  )
                )
              }
            
            </div>
          )  
        }

        {/* skill evaluation progressbar */}
        <motion.div
          className="
            w-full 
            h-1 
            mt-4 
            bg-[#333] 
            rounded-full 
            overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, delay: index * 0.05 + 0.3 }}>
          
          <div
            className={`h-full bg-${expertiseColor}`}
            style={
              {
                width: `${skill.selfEvaluation * 10}%`,
              }
            }/>
        </motion.div>

        {/* numeric indicator */}
        <div className="text-right mt-1">
          <span className="flex flex-row justify-end text-xs text-gray-400">
            {/* TODO: this */}
            {t('resume.selfEvaluation')}
            <p>: </p> 
            {skill.selfEvaluation}/10
          </span>
        </div>
      </div>

      {/* side navigation buttons */}
      {/*
        hasMultipleProjects && isExpanded && (
          <>
            <button
              className="
                absolute 
                left-0 
                top-0 
                bottom-0 
                w-8 
                flex 
                items-center 
                justify-center 
                opacity-0 
                hover:opacity-100 
                transition-opacity 
                group"
              onClick={() => navigateProjects("prev")}>
              
              <div className="'
                w-6 
                h-6 
                rounded-full 
                bg-black 
                bg-opacity-50 
                group-hover:bg-opacity-70 
                flex 
                items-center 
                justify-center 
                transition-all">
                
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </div>
            </button>
            
            <button
              className="
                absolute 
                right-0 
                top-0 
                bottom-0 
                w-8 flex 
                items-center 
                justify-center 
                opacity-0 
                hover:opacity-100 
                transition-opacity 
                group"
              onClick={() => navigateProjects("next")}>
              
              <div className="
                w-6 
                h-6 
                rounded-full 
                bg-black 
                bg-opacity-50 
                group-hover:bg-opacity-70 
                flex 
                items-center 
                justify-center 
                transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </div>
            </button>
          </>
        )
      */} 
    </motion.div>
  )
}