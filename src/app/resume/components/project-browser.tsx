import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";

import ProjectTab from "./project-tab";
import { NotableProject } from "./skills-tab";

export default function ProjectBrowser(
  { 
    projects,
    activeProjectId,
    activeProject  
  }: { 
      projects: NotableProject[] ;
      activeProjectId: number;
      activeProject: NotableProject;
    }
) {
  return (
    <div className="flex flex-col">
      <div className="flex overflow-x-auto hide-scrollbar border-b border-[#333] mb-2">
        {
          projects.map(
            (project) => {
              const isActive = project.id === activeProjectId;
          return (
            <ProjectTab 
              key={project.id} 
              project={project} 
              isActive={isActive} 
            />
          );
        })}
      </div>

      {/*
       * Project Content Container
       * - Shows details of the currently selected project
       * - Animated with Framer Motion for smooth transitions
       * - Only renders if there is an active project
       */}
      <AnimatePresence mode="wait">
        {activeProject && (
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="rounded-lg p-3 border border-[#333]"
          >
            {/* Project title - truncated to first 4 words */}
            <h4 className="font-medium text-sm mb-2 text-white">
              {activeProject.description.split(" ").slice(0, 4).join(" ")}...
            </h4>

            <div className="flex flex-col gap-3">
              {/*
               * Project Preview Image Container
               * - Only shown if the project has a preview image
               * - Fixed height with overflow handling
               */}
              {activeProject.preview && (
                <div className="relative w-full h-32 rounded overflow-hidden">
                  <img
                    src={activeProject.preview || "/placeholder.svg"}
                    alt={`Preview de ${activeProject.title}`}
                    className="object-cover"
                  />
                </div>
              )}

              {/* Project description text */}
              <p className="text-sm text-gray-300">{activeProject.description}</p>

              {/*
               * Project Link Container
               * - Only shown if the project has a hook URL
               * - Positioned at the bottom right of the content area
               */}
              {activeProject.hook && (
                <Link
                  href={activeProject.hook}
                  target="_blank"
                  className="
                    text-sm 
                    text-blue-400 
                    flex 
                    items-center 
                    gap-1 
                    hover:text-blue-300 
                    transition-colors 
                    self-end 
                    mt-1"
                >
                  Ver projeto
                  <ExternalLink className="w-4 h-4" />
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/*
       * Custom CSS for hiding scrollbar
       * - Applied to elements with the hide-scrollbar class
       * - Works across different browsers
       */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}