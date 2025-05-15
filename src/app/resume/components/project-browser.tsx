import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";
import ProjectTab from "./project-tab";
import Image from "next/image";

// Definindo a interface com tipos explícitos
interface NotableProject {
  id: number; // Garantindo que id é number
  title: string;
  description: string;
  preview?: string;
  hook?: string;
  // Adicione outras propriedades conforme necessário
}

interface ProjectBrowserProps {
  projects: NotableProject[];
  activeProjectId: number;
  activeProject: NotableProject | null; // Permitindo null
}

export default function ProjectBrowser({
  projects,
  activeProjectId,
  activeProject
}: ProjectBrowserProps) {

  const prefix = process.env.NODE_ENV === "production" ? "/iakee-portifolio" : "";

  return (
    <div className="flex flex-col">
      <div className="flex overflow-x-auto hide-scrollbar border-b border-[#333] mb-2">
        {projects.map((project) => {
          const isActive = project.id === activeProjectId;
          return (
            <ProjectTab 
              isActive={activeProjectId === project.id}
              handleTabClick={() => {}}
              handleCloseTab={() => {}}
              project={project}
            />
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {activeProject && (
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="rounded-lg p-3 border border-[#333]"
          >
            <h4 className="font-medium text-sm mb-2 text-white">
              {activeProject.description.split(" ").slice(0, 4).join(" ")}...
            </h4>

            <div className="flex flex-col gap-3">
              {activeProject.preview && (
                <div className="relative w-full h-32 rounded overflow-hidden">
                  <Image
                    src={`${prefix}/${activeProject.preview}`}
                    alt={`Preview de ${activeProject.title}`}
                    className="object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                </div>
              )}

              <p className="text-sm text-gray-300">{activeProject.description}</p>

              {activeProject.hook && (
                <Link
                  href={activeProject.hook}
                  target="_blank"
                  className="text-sm text-blue-400 flex items-center gap-1 hover:text-blue-300 transition-colors self-end mt-1"
                >
                  Ver projeto
                  <ExternalLink className="w-4 h-4" />
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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