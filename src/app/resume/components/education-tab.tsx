import { Card } from "@/components/ui/card";
import { useLanguage } from "@/context/language-content";
import { motion } from "framer-motion";
import EducationCard from "./education-card";

export default function ExperiencesTab() {

  const { t } = useLanguage();

  const edu = Array.isArray(t('resume.education')) ? t('resume.education') : [];
  
  const education = edu as unknown as {
  institution: string;
  degree: string;
  period: string;
  hook: string;	
  icon: string;
  courses: string[];
}[];

  return (
    <Card className="w-full flex mx-auto rounded-2xl">
      <motion.div
        className="w-[80%] items-center flex-col justify-center mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}>
        
        <h2 className="flex justify-center md:text-3xl font-bold my-6">
          {t('resume.workExperience')}
        </h2>
        
        <div className="space-y-8 mb-8">
          {
            edu.map(
              (exp, index) => (
                <EducationCard key={index} course={exp} index={index} />
              )
            )
          }
        </div>
      </motion.div>
    </Card>
  )
}