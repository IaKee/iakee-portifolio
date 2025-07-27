"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaDownload,
  FaCode,
  FaServer,
  FaLayerGroup,
  FaFileAlt,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaQuestionCircle,
  FaPython,
  FaJava,
  FaDocker,
  FaGithub,
  FaLinux,
  FaWindows,
  FaAndroid,
  FaHtml5,
  FaCss3,
  FaSass,
  FaClock,
} from "react-icons/fa";
import { PiUserFocusFill } from "react-icons/pi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-content";
import { Badge } from "@/components/ui/badge";
import { RiNextjsFill, RiTimeZoneFill } from "react-icons/ri";
import { SiAwsorganizations, SiTarget, SiTypescript } from "react-icons/si";
import { GrServer } from "react-icons/gr";
import { LuProjector } from "react-icons/lu";
import { MdAutoGraph } from "react-icons/md";
import ScrollingIcons from "@/app/playground/components/scrolling-icons";
import { AiOutlineJavaScript } from "react-icons/ai";

export function ResumeDownloadDialog() {
  const { locale, t } = useLanguage();

  const [open, setOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<"download" | "explanation">("download");

  const handleDownload = (
    type: "frontend" | "backend" | "fullstack" | "complete"
  ) => {
    // TODO: complete + fullstack resumes
    const resumeUrls = {
      frontend: "/resume/Giordano Souza - Frontend JS - ",
      backend: "/resume/Giordano Souza - Backend Python - ",
      fullstack: "/resume/Giordano Souza - Backend Java - ",
      complete: "resume/Giordano Souza - Backend Python - ",
    };
    
    const link = document.createElement("a");

    const path = locale === 'ptbr'
      ? link.href = `${resumeUrls[type]}Curriculo.pdf`
      : link.href = `${resumeUrls[type]}Resume.pdf`;

    const file = locale === 'ptbr'
      ? link.download = `Giordano Souza - Curriculo.pdf`
      : link.download = `Giordano Souza - Resume.pdf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setOpen(false);
  };

  const showExplanation = () => {
    setCurrentScreen("explanation");
  }

  const backToDownload = () => {
    setCurrentScreen("download");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.button
          className="flex items-center gap-2 bg-primary px-4 py-2 rounded-full text-primary-foreground text-sm md:text-base capitalize transition-all cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}>
          <FaDownload className="w-4 h-4" />
          <span className="font-semibold">
            {t("resume.download")}
          </span>
        </motion.button>
      </DialogTrigger>

      {/* dialog popup */}
      <DialogContent className="flex flex-col gap-2 w-full">
        <div className="flex flex-col flex-1">
          {/* screen switcher */}
          <AnimatePresence mode="wait">
            {
              currentScreen === "download" 
                ? <motion.div
                    key="download-screen"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col flex-1">
                    
                    {/* popup title*/}
                    <DialogHeader>
                      <DialogTitle className="font-bold text-xl text-center underline">
                        {t("resume.dialog.title")}
                      </DialogTitle>
                      <DialogDescription className="font-xs text-muted-foreground text-center">
                        {t("resume.dialog.description")}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="flex flex-col gap-3 mt-2">
                      {/* frontend */}
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          onClick={() => handleDownload("frontend")}
                          className="group flex justify-start items-center gap-3 rounded-xl w-full h-16 text-lg cursor-pointer"
                          variant="outline"
                        >
                          <FaCode className="w-15 h-15 text-blue-500 group-hover:text-secondary-foreground transition-all" />
                          <div className="text-left">
                            <div className="flex flex-row items-start gap-1 font-semibold">
                              <span className="pr-1 group-hover:text-secondary-foreground transition-all group-hover:animate-text-hint-ping">
                                {t("resume.dialog.frontend")}
                              </span>

                              {/* react */}
                              <Badge
                                className="flex flex-row items-center gap-1 group-hover:bg-secondary px-2 py-1 group-hover:border-primary font-semibold text-muted group-hover:text-primary text-xs transition-all"
                                variant="outline"
                              >
                                <FaReact />
                                React
                              </Badge>

                              {/* nextjs */}
                              <Badge
                                className="flex flex-row items-center gap-1 group-hover:bg-secondary px-2 py-1 group-hover:border-primary font-semibold text-muted group-hover:text-primary text-xs transition-all"
                                variant="outline"
                              >
                                <RiNextjsFill />
                                Next.JS
                              </Badge>

                              {/* typescript */}
                              <Badge
                                className="flex flex-row items-center gap-1 group-hover:bg-secondary px-2 py-1 group-hover:border-primary font-semibold text-muted group-hover:text-primary text-xs transition-all"
                                variant="outline"
                              >
                                <SiTypescript />
                                TS
                              </Badge>

                            </div>

                            <div className="text-muted-foreground group-hover:text-secondary text-xs transition-color">
                              {t("resume.dialog.frontendDesc")}
                            </div>
                          </div>
                        </Button>
                      </motion.div>

                      {/* backend */}
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          onClick={() => handleDownload("backend")}
                          className="group flex justify-start items-center gap-3 rounded-xl w-full h-16 text-lg cursor-pointer"
                          variant="outline"
                        >
                          <FaServer className="w-6 h-6 text-green-500 group-hover:text-secondary-foreground transition-all" />
                          <div className="text-left">
                            <div className="flex flex-row items-start gap-1 font-semibold">
                              <span className="pr-1 group-hover:text-secondary-foreground transition-all group-hover:animate-text-hint-ping">
                                {t("resume.dialog.backend")}
                              </span>

                              {/* node.js */}
                              <Badge
                                className="flex flex-row items-center gap-1 group-hover:bg-secondary px-2 py-1 group-hover:border-primary font-semibold text-muted group-hover:text-primary text-xs transition-all"
                                variant="outline"
                              >
                                <FaNodeJs />
                                Node.js
                              </Badge>

                              {/* API */}
                              <Badge
                                className="flex flex-row items-center gap-1 group-hover:bg-secondary px-2 py-1 group-hover:border-primary font-semibold text-muted group-hover:text-primary text-xs transition-all"
                                variant="outline"
                              >
                                <SiAwsorganizations />
                                APIs
                              </Badge>

                              {/* database */}
                              <Badge
                                className="flex flex-row items-center gap-1 group-hover:bg-secondary px-2 py-1 group-hover:border-primary font-semibold text-muted group-hover:text-primary text-xs transition-all"
                                variant="outline"
                              >
                                <FaDatabase />
                                Databases
                              </Badge>
                            </div>

                            <div className="text-muted-foreground group-hover:text-secondary text-xs transition-color">
                              {t("resume.dialog.backendDesc")}
                            </div>
                          </div>
                        </Button>
                      </motion.div>

                      {/* fullstack */}
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          onClick={() => handleDownload("fullstack")}
                          className="group flex justify-start items-center gap-3 rounded-xl w-full h-16 text-lg cursor-pointer"
                          variant="outline"
                        >
                          <FaLayerGroup className="w-6 h-6 text-purple-500 group-hover:text-secondary-foreground transition-al" />
                          <div className="text-left">
                            <div className="flex flex-row items-start gap-1 font-semibold">
                              <span className="pr-1 group-hover:text-secondary-foreground transition-all group-hover:animate-text-hint-ping">
                                {t("resume.dialog.fullstack")}
                              </span>

                              {/* integrations */}
                              <Badge
                                className="flex flex-row items-center gap-1 group-hover:bg-secondary px-2 py-1 group-hover:border-primary font-semibold text-muted group-hover:text-primary text-xs transition-all"
                                variant="outline"
                              >
                                <FaCode />
                                {t('resume.dialog.integrations')}
                              </Badge>

                              {/* microservices */}
                              <Badge
                                className="flex flex-row items-center gap-1 group-hover:bg-secondary px-2 py-1 group-hover:border-primary font-semibold text-muted group-hover:text-primary text-xs transition-all"
                                variant="outline"
                              >
                                <GrServer />
                                {t('resume.dialog.microservices')}
                              </Badge>
                            </div>
                            <div className="text-muted-foreground group-hover:text-secondary text-xs transition-color">
                              {t("resume.dialog.fullstackDesc")}
                            </div>
                          </div>
                        </Button>
                      </motion.div>

                      {/* complete */}
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          onClick={() => handleDownload("complete")}
                          className="group flex justify-start items-center gap-3 rounded-xl w-full h-16 text-lg cursor-pointer"
                          variant="outline">
                          <FaFileAlt className="w-6 h-6 text-orange-500 group-hover:text-secondary-foreground transition-all" />
                          <div className="text-left">
                            <div className="flex flex-row items-start gap-1 font-semibold">
                              <span className="pr-1 group-hover:text-secondary-foreground transition-all group-hover:animate-text-hint-ping">
                                {t("resume.dialog.complete")}
                              </span>

                              {/* project briefings */}
                              <Badge
                                className="flex flex-row items-center gap-1 group-hover:bg-secondary px-2 py-1 group-hover:border-primary font-semibold text-muted group-hover:text-primary text-xs transition-all"
                                variant="outline"
                              >
                                <LuProjector />
                                {t("resume.dialog.projectBriefings")}
                              </Badge>
                            </div>
                            <div className="text-muted-foreground group-hover:text-secondary text-xs transition-color">
                              {t("resume.dialog.completeDesc")}
                            </div>
                          </div>
                        </Button>
                      </motion.div>
                    </div>

                    {/* action buttons */}
                    
                    <div className="flex flex-row justify-center items-center gap-4 mt-4 text-center">
                      <Button
                        variant="default"
                        onClick={() => showExplanation()}
                        className="rounded-full font-bold text-secondary animate-pulse">
                        <FaQuestionCircle />
                        {t("resume.dialog.help")}
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        className="rounded-full text-muted-foreground">
                        {t("resume.dialog.cancel")}
                      </Button>
                    </div>
                  </motion.div>
                : <motion.div
                    key="explanation-screen"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col flex-1 justify-center items-center gap-4">
                    
                    <DialogHeader>
                      <DialogTitle className="pt-2 pb-4 font-bold text-xl text-center">
                        {t("resume.dialog.explanationTitle")}
                      </DialogTitle>
                    </DialogHeader>
                    
                    <div className="flex flex-col flex-1 justify-center">
                      <div className="flex flex-col justify-center items-center text-center">
                        <ScrollingIcons 
                          icons={[FaPython, FaJava, AiOutlineJavaScript, FaDocker, FaGithub, FaLinux, FaWindows, FaAndroid, FaHtml5, FaCss3, FaSass]} 
                          delay={1000}
                          className="pb-8 text-primary text-8xl" />

                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                          <div className="flex flex-row items-center gap-4 mr-auto px-4">
                            <FaClock className="mt-1 text-4xl shrink-0"/>
                            <p className="flex flex-col items-start text-lg text-left">
                              {t("resume.dialog.explanationText")}
                            </p>
                          </div>

                          <div className="flex flex-row items-center gap-4 mr-auto px-4">
                            <PiUserFocusFill className="mt-1 text-4xl shrink-0"/>
                            <p className="flex flex-col items-start text-md text-left">
                              {t("resume.dialog.explanationDetailed")}
                            </p>
                          </div>

                          <div className="flex flex-row items-center gap-4 bg-secondary my-6 py-2 pr-2 pl-4 rounded-full">
                              <MdAutoGraph className="w-10 h-10 font-bold text-primary"/>
                              <p className="font-medium font-semibold text-primary">
                              {t("resume.dialog.explanationBenefit")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center gap-4">
                      <Button
                        onClick={backToDownload}
                        className="rounded-full font-semibold text-secondary hover:scale-[1.05] active:scale-[0.95] transition-all animate-pulse cursor-pointer">
                        {t("resume.dialog.back")}
                      </Button>

                        <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        className="rounded-full text-muted-foreground hover:scale-[1.05] active:scale-[0.95] transition-all cursor-pointer">
                        {t("resume.dialog.cancel")}
                      </Button>
                    </div>
                  </motion.div>
            }
          </AnimatePresence>
        </div>


      </DialogContent>
    </Dialog>
  );
}
