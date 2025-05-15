import { Card } from "@/components/ui/card";
import { useLanguage } from "@/context/language-content";
import { motion } from "framer-motion";
import EducationCard from "./education-card";

interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  hook: string;
  icon: string;
  courses: string[];
}

export default function EducationTab() {
  const { t } = useLanguage();

  const education = (Array.isArray(t('resume.education')) 
    ? t('resume.education') 
    : []) as EducationItem[];

  return (
    <Card className="w-full flex mx-auto rounded-2xl">
      <motion.div
        className="w-[80%] items-center flex-col justify-center mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}>
        
        <h2 className="flex justify-center md:text-3xl font-bold my-6">
          {t('resume.educationTitle')} {/* Corrigido para educationTitle */}
        </h2>
        
        <div className="space-y-8 mb-8">
          {education.map((item, index) => (
            <EducationCard 
              key={index} 
              course={item} 
              index={index} 
            />
          ))}
        </div>
      </motion.div>
    </Card>
  );
}