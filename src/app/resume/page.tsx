"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Github, Linkedin, MapPin } from "lucide-react"
import SkillBubble from "@/components/skill-bubble"
import ExperienceCard from "@/components/experience-card"
import ProjectCard from "@/components/project-card"
import EducationTimeline from "@/components/education-timeline"
import ContactProtection from "@/components/contact-protection"

export default function ResumePage() {
  const [activeSection, setActiveSection] = useState("about")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

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

  const skills = [
    { name: "Python", level: 90 },
    { name: "Java", level: 85 },
    { name: "C/C++", level: 80 },
    { name: "PHP", level: 75 },
    { name: "Assembly", level: 70 },
    { name: "Tkinter", level: 85 },
    { name: "Django", level: 80 },
    { name: "Laravel", level: 75 },
    { name: "Pandas", level: 85 },
    { name: "Git", level: 90 },
    { name: "SQL", level: 85 },
    { name: "Photoshop", level: 70 },
    { name: "WordPress", level: 75 },
    { name: "MS Office", level: 80 },
  ]

  const experiences = [
    {
      title: "Freelance Developer",
      company: "Fiverr",
      period: "NOV/2021 – AUG/2024",
      description: [
        "Developed standalone visual applications and integrated modules for streamers.",
        "Designed dynamically animated characters and their interactions with streamers' hardware (keyboard, mouse, microphone, joysticks, etc.).",
        "Maintained detailed documentation and high organization in my software, even working independently.",
        "Managed the entire development cycle as a freelancer, from client communication, requirement gathering, and sales, ensuring client satisfaction.",
      ],
    },
    {
      title: "Technical Support",
      company: "Veloce.Tech",
      period: "DEC/2020 – MAR/2021",
      description: [
        "Provided technical support for a suite of POS (Point of Sale) applications by Veloce, handling troubleshooting, installations, documentation, and technical requests.",
        "Collaborated with development teams to resolve issues and improve product functionality.",
      ],
    },
  ]

  const projects = [
    {
      title: "RuneLingual",
      description:
        "Translation system plugin for the game OldSchool RuneScape, using the RuneLite game client as the engine.",
      details: [
        "Non-profit, open-source project.",
        "OldSchool RuneScape is a highly established MMORPG with over 20 years of development, a high level of complexity, and a loyal player base. However, the language barrier limits access for thousands of players.",
        "Gathered requirements and collaborated directly with game moderators and RuneLite client maintainers (also fan-led) to create most of the core systems for the plugin.",
        "Implemented a translation management system with a transcription repository.",
        "Recruited multilingual developers after documenting and promoting the project in various player groups.",
      ],
      icon: "🎮",
    },
    {
      title: "SyncWizard",
      description:
        "File synchronization system, similar to Dropbox. Developed for the Operating Systems course in the Computer Engineering program at UFRGS.",
      details: [
        "Non-profit, open-source project.",
        "Contributed to the development of a client-server architecture system based on UNIX, along with three colleagues. It implements login, quota limits, synchronization mechanisms, and secure file handling.",
      ],
      icon: "🔄",
    },
    {
      title: "IaKee's Avatar Manager (IAM)",
      description:
        "Avatar management software for streamers, developed during my freelance work on the Fiverr platform.",
      details: [
        "Closed-source project, supported for Windows.",
        "The software includes an installer, modifier, uninstaller, launcher, and standalone applications with security processes for handling registries, disk, and files.",
        "Although I cannot disclose the source code, I am available for demonstrations of samples, documentation, and key challenges faced.",
      ],
      icon: "👤",
    },
  ]

  const education = [
    {
      institution: "Federal University of Rio Grande do Sul (UFRGS)",
      degree: "B.S. in Computer Engineering",
      period: "Expected graduation 2026",
      details: "5th semester",
      courses:
        "Data structures, Algorithms, Object-Oriented-Programming, Database Fundamentals, and Program Construction Techniques.",
    },
    {
      institution: "Liberato Salzano Vieira da Cunha Technical School",
      degree: "Technical course in Electrotechnics",
      period: "2017",
      details: "Integrated with high school",
      courses: "Electricity, Automation, Workplace Safety, Entrepreneurship.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 md:p-10 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500/3"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.3 + 0.2,
            }}
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: Math.random() * 40 + 40,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            style={{
              width: `${Math.random() * 150 + 50}px`,
              height: `${Math.random() * 150 + 50}px`,
            }}
          />
        ))}
      </div>

      {/* Mouse follower effect */}
      <motion.div
        className="hidden md:block absolute w-64 h-64 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 pointer-events-none"
        animate={{
          x: mousePosition.x - 128,
          y: mousePosition.y - 128,
        }}
        transition={{ type: "spring", damping: 15 }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header section */}
        <motion.header
          className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <motion.div
              className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg shadow-blue-500/20"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/opc1.jpg"
                alt="Giordano Souza"
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            <div className="text-center md:text-left">
              <motion.h1
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Giordano Souza
              </motion.h1>

              <motion.h2
                className="text-xl md:text-2xl text-blue-300 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Computer Engineering Student & Developer
              </motion.h2>

              <motion.div
                className="flex flex-wrap justify-center md:justify-start gap-4 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <div className="flex items-center gap-1 text-sm text-gray-300">
                  <MapPin size={16} className="text-blue-400" />
                  <span>
                    Sapucaia do Sul/RS - Brazil
                  </span>
                </div>
                <ContactProtection />
              </motion.div>

              <motion.div
                className="flex justify-center md:justify-start gap-4 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                <motion.a
                  href="https://github.com/iakee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-800 rounded-full hover:bg-blue-500 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={20} />
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/giordanogi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-800 rounded-full hover:bg-blue-500 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin size={20} />
                </motion.a>
              </motion.div>
            </div>
          </div>
        </motion.header>

        {/* Navigation */}
        <motion.nav
          className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          {["about", "experience", "skills", "projects", "education"].map((section) => (
            <motion.button
              key={section}
              className={`px-4 py-2 rounded-full text-sm md:text-base capitalize transition-all ${
                activeSection === section ? "bg-blue-500 text-white" : "bg-slate-800 text-gray-300 hover:bg-slate-700"
              }`}
              onClick={() => setActiveSection(section)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {section}
            </motion.button>
          ))}
        </motion.nav>

        {/* Main content */}
        <motion.main
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          {/* About section */}
          {activeSection === "about" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-400">About Me</h2>
              <motion.p
                className="text-lg leading-relaxed mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                I am a Computer Engineering student at the Federal University of Rio Grande do Sul (UFRGS), currently in
                my 5th semester with an expected graduation in 2026. I am seeking a challenging position as a developer
                where I can apply my problem-solving skills while expanding my experience through a fresh professional
                perspective.
              </motion.p>
              <motion.p
                className="text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                I am adaptable, a quick learner, and feel comfortable working both independently and in collaborative
                team environments. With experience as a freelance developer and in technical support, I have developed
                strong skills in programming, problem-solving, and client communication.
              </motion.p>

              <motion.div
                className="mt-8 p-4 bg-slate-700/50 rounded-xl border border-blue-500/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
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
              transition={{ duration: 0.5 }}
            >
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
              transition={{ duration: 0.5 }}
            >
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

        {/* Footer */}
        <motion.footer
          className="mt-12 text-center text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <p>© {new Date().getFullYear()} Giordano Souza. All rights reserved.</p>
          <p className="mt-1">Built with Next.js, Tailwind CSS, and Framer Motion</p>
        </motion.footer>
      </div>
    </div>
  )
}

