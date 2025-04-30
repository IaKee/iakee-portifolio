import ExperienceCard from "@/app/resume/components/experience-card";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/context/language-content";
import { motion } from "framer-motion";

export default function ExperiencesTab() {

  const { t } = useLanguage();

  const exp = Array.isArray(t('resume.professionalExperience')) ? t('resume.professionalExperience') : [];
  
  const professionalExperience = exp as unknown as {
  title: string;
  company: string;
  period: string;
  hook: string;	
  icon: string;
  roleFunctions: string[];
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
            professionalExperience.map(
              (exp, index) => (
                <ExperienceCard key={index} experience={exp} index={index} />
              )
            )
          }
        </div>
      </motion.div>
    </Card>
  )
}