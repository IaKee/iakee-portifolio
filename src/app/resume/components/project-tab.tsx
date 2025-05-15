import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  preview?: string;
  hook?: string;
}

interface ProjectTabProps {
  isActive: boolean;
  handleTabClick: (project: Project) => void;
  handleCloseTab: (e: React.MouseEvent, id: number) => void; // Alterado para number
  project: Project;
}

export default function ProjectTab({
  isActive,
  handleTabClick,
  handleCloseTab,
  project
}: ProjectTabProps) {
  return (
    <motion.button
      onClick={() => handleTabClick(project)}
      className={`
        relative flex items-center gap-2 px-4 py-2 text-sm
        ${isActive 
          ? 'bg-[#333] text-white' 
          : 'text-gray-400 hover:text-white hover:bg-[#222]'
        }
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="truncate max-w-[120px]">
        {project.title}
      </span>
      
      {isActive && (
        <button
          onClick={(e) => handleCloseTab(e, project.id)}
          className="p-1 rounded-full hover:bg-[#444]"
          aria-label="Fechar aba"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </motion.button>
  );
}