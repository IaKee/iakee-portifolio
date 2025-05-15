"use client"

import { useLanguage } from "@/context/language-content";
import { motion } from "framer-motion";
import { use, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";
import SkillCard from "./skill-card";
import { get } from "http";
import { IconPackage } from "./dynamic-fa-icon";

export type NotableProject = {
  id: number;
  title: string;
  description: string;
  hook?: string;
  preview?: string;
};

export interface SkillIcon {
  title: string;
  package: IconPackage;
}

export type Skill = {
  name: string;
  selfEvaluation: number;
  icon?: SkillIcon;
  package: string;
  notableProjects: NotableProject[];
  category: string;
};

export type SIcon = {
  title: string;
  package: string;
};

export type CategoryInfo = {
  label: string;
  description: string;
}

export default function SkillsTab() {
  const {t} = useLanguage();

  const skill = Array.isArray(t('resume.skills')) ? t('resume.skills') : [];
  const categories = t('resume.categories') as unknown as Record<string, CategoryInfo>;

  // maps skills and categories to their respective types
  const techSkill = skill as Skill[];
  const techCategories = typeof categories === 'object' && categories !== null 
    ? categories as unknown as Record<string, CategoryInfo[]>
    : {};

  const [skills, setSkills] = useState<Skill[]>([]);
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [activePreview, setActivePreview] = useState<string | null>(null);

  // handles search input and filters skills based on the search term
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    
    if(value.trim() === "") {
      setFilteredSkills(skills);
    } else {
      const filtered = skills.filter(
        (skill) => 
          skill.name.toLowerCase().includes(value) 
          || skill.category.toLowerCase().includes(value)
          || skill.notableProjects.some(
            (project) => 
              project.description.toLowerCase().includes(value)
            )
      )
      setFilteredSkills(filtered);
    }
  }

  const getExpertiseLevel = (evaluation: number): string => {
    if (evaluation >= 8) return t('resume.skillLevels.expert')
    if (evaluation >= 6) return t('resume.skillLevels.advanced')
    if (evaluation >= 4) return t('resume.skillLevels.intermediate')
    if (evaluation >= 2) return t('resume.skillLevels.begginer')
      
    // defaults to begginer
    return t('resume.skillLevels.begginer')
  }
  
  const getExpertiseColor = (evaluation: number): string => {
    if (evaluation >= 8) return "green-500"
    if (evaluation >= 6) return "blue-500"
    if (evaluation >= 4) return "yellow-500"
    if (evaluation >= 2) return "orange-500"

    // TODO: this should be a gradient, handle it later
    return "red-500"
  }

  const getCategoryColor = (category: string): string => {
    // returns a color based on the category number
    const categoryIndex = Object.keys(techCategories).indexOf(category);
    
    // TODO: these should be gradients, handle it later
    const colors = [
      "from-[#FF4D4D] to-[#FF4D4D]",
      "from-[#FF8C00] to-[#FF8C00]",
      "from-[#FFD700] to-[#FFD700]",
      "from-[#32CD32] to-[#32CD32]",
      "from-[#1E90FF] to-[#1E90FF]",
      "from-[#9370DB] to-[#9370DB]",
      "from-[#FF69B4] to-[#FF69B4]",
    ];
    return colors[categoryIndex % colors.length];
  }
  
  // groups skills by category
  const groupedSkills: Record<string, Skill[]> = {};
  filteredSkills.forEach((skill) => {
    const category = skill.category;
    if (!groupedSkills[category]) {
      groupedSkills[category] = [];
    }
    groupedSkills[category].push(skill);
  });


  useEffect(
    () => {
      setSkills(techSkill);
      setFilteredSkills(techSkill);

      // forces a little delay to simulate loading
      const timer = setTimeout(
        () => {
          setIsLoaded(true);
        }, 
        300
      );
    },
    []
  );

  return (
    <Card className="w-full flex flex-col mx-auto rounded-2xl">

      <p className="text-center text-2xl overflow-show font-semibold text-foreground mt-10 mb-4">
        {t('resume.skillsTitle')}
      </p>
      <motion.div
        className="w-[80%] items-center flex-col justify-center mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}>
      
        {/* search bar */}
        <div className="mb-10 relative max-w-md mx-auto">

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" />
            <input
              type="text"
              placeholder={t('resume.searchPlaceholder')}
              value={searchTerm}
              onChange={handleSearch}
              className="
                w-full 
                bg-[#252525] 
                border border-[#333] 
                rounded-lg 
                py-3 pl-10 pr-4 
                text-white 
                placeholder-gray-400 
                focus:outline-none 
                focus:ring-2 
                focus:ring-green-500 
                focus:border-transparent 
                transition-all"/>
          </div>

          {
            searchTerm && (
            <p className="text-sm text-gray-400 mt-2">
              {filteredSkills.length} {t('resume.searchResults')}
            </p>
            )
          }
        </div>
        
        {/* categories section */}
        {
          Object.keys(groupedSkills).length === 0 
            ? (
              <div className="text-center py-10">
                <p className="text-xl text-gray-400">
                  {t("resume.searchResultsEmpty")} "{searchTerm}"
                </p>
              </div>
              ) 
            : (
              Object.entries(groupedSkills).map(
                ([category, skills]) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="mb-12">
              
                    <div className="mb-6">
                      <h2
                        className={`
                          text-2xl 
                          font-bold 
                          bg-gradient-to-r 
                          bg-clip-text text-transparent inline-block
                          ${getCategoryColor(category)}`}>
                          
                          {/* category title */}
                          {categories[category]?.label || category}
                      </h2>
                      
                      <p className="text-gray-400 mt-1">
                        {/* category description */}
                        {categories[category]?.description || ""}
                      </p>
                    </div>
                    
                    {/* TODO: work on this*/}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {
                        skills.map(
                          (skill, index) => (
                            <SkillCard
                              key={skill.name}
                              skill={skill}
                              index={index}
                              isLoaded={isLoaded}
                              categoryColor={getCategoryColor(category) || "from-gray-500 to-gray-600"}
                              getExpertiseLevel={getExpertiseLevel}
                              getExpertiseColor={getExpertiseColor}
                              activePreview={activePreview}
                              setActivePreview={setActivePreview}/>
                          )
                        )
                      }
                    </div>
                  </motion.div>
                )
              )
            )
        }
      </motion.div>

    </Card>
  )
}