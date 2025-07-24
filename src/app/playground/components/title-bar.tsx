import { FaCode, FaGear, FaRobot } from "react-icons/fa6";
import ScrollingIcons from "./scrolling-icons";
import { IoIosRocket } from "react-icons/io";
import { useLanguage } from "@/context/language-content";
import { SiGlitch } from "react-icons/si";
import { GrBug } from "react-icons/gr";

export default function TitleBar() {
  const { t } = useLanguage();
  return (
    <div className="
      flex
      flex-col
      w-[60%]
      mx-auto
      justify-center
      border-2
      border-muted
      rounded-xl
      my-8
      py-4">
          
      <div className="
        flex
        items-center
        gap-4
        justify-center 
        text-6xl 
        font-bold"> 
        <ScrollingIcons
          icons={
            [
              FaGear, 
              FaCode, 
              FaRobot, 
              IoIosRocket, 
              SiGlitch,
              GrBug
            ]
          }
          delay={3000} />
        {t('playground.title')}
      </div>
      
      <p className="
        text-center 
        text-muted 
        mt-4"> 
        {t('playground.description')}
      </p>
    </div>
  );
}