import { motion } from "framer-motion";
import { X } from "lucide-react";

interface Project {
  id: string
  name: string
  description: string
  preview?: string
  hook?: string
}

export default function ProjectTab(
  { 
    isActive, 
    handleTabClick, 
    handleCloseTab, 
    project 
  }: 
    { 
      isActive: boolean, 
      handleTabClick: (project: Project) => void, 
      handleCloseTab: (e: React.MouseEvent, id: string) => void, 
      project: Project 
    }
) {
  return (
    <motion.div
      key={project.id}
      onClick={() => handleTabClick(project)}
      className={`
        flex items-center gap-2 px-3 py-2 min-w-[120px] max-w-[200px]
        cursor-pointer relative rounded-t-lg mr-1
        ${isActive ? "bg-[#333] text-white" : "bg-[#222] text-gray-400 hover:bg-[#2a2a2a]"}
        transition-colors duration-200
        `}
      layout>
      
      <div className="flex-1 truncate text-sm font-medium">
        {project.name}
      </div>

      <button
        onClick={
          (e) => 
            handleCloseTab(e, project.id)
        }
        className="opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Close tab">
        
        <X size={14} />
      </button>

      {
        isActive && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
            layoutId="active-tab-indicator"/>
        )
      }
    </motion.div>
  )
}