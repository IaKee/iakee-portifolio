'use client';

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { ArrowRight, Github, Linkedin} from "lucide-react"
import Link from "next/link"
import { FaPlay } from 'react-icons/fa';

import HoverPreview from "./hover-preview";
import { TbBrandFiverr, TbBrandGithubFilled } from "react-icons/tb";
import { FaLinkedinIn } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { RiTimeZoneFill } from "react-icons/ri";

import { useLanguage } from '@/context/language-content'
import { Card } from "./ui/card";

export default function HeroSection() {
  const { locale, t } = useLanguage();

  const prefix = process.env.NODE_ENV === "production" ? "" : "";

  var rawStats = t('hover.github.stats')
  const githubStats = Array.isArray(rawStats) 
    ? rawStats as Array<{ label: string, value: string }> 
    : [];

  rawStats = t('hover.linkedin.stats')
  const linkedinStats = Array.isArray(rawStats) 
    ? rawStats as Array<{ label: string, value: string }> 
    : [];

  rawStats = t('hover.fiverr.stats')
  const fiverrStats = Array.isArray(rawStats) 
    ? rawStats as Array<{ label: string, value: string }> 
    : [];

  const handleDownload = () => {
    const path = locale === 'ptbr'
      ? `${prefix}/resume/Curriculo - Giordano Souza.pdf`
      : `${prefix}/resume/Resume - Giordano Souza.pdf`;

    const link = document.createElement('a');
    link.href = path;
    link.download = path.split('/').pop() || 'resume.pdf';
    link.click();
  };

  // URLs for the videos
  const shortVideoUrl = "https://drive.google.com/file/d/1bjzwu18DzUv-AyqAnXsIlWWU2BmehbcB/preview";
  const longVideoUrl = "https://drive.google.com/file/d/LONG_VIDEO_ID/preview"; // Replace with your actual long video ID

  return (
    <main className="flex justify-center items-center w-full h-[calc(100vh-64px)]">
      <Card className="flex justify-center items-center bg-background mx-auto py-16 border-2 w-[80%]">
        <div className="mx-auto px-[5%] container">
          <div className="flex md:flex-row flex-col-reverse items-center gap-8 md:gap-16">
            {/* Left side - Introduction text */}
            <div className="flex flex-col justify-center space-y-4 w-full md:w-3/5">
              {/* intro title */}
              <h2 className="font-bold text-4xl md:text-5xl tracking-tighter">
                {t('hero.introTitleHello')}
                <span className="ml-2 text-primary">
                  {t('hero.introTitleName')}
                </span>
              </h2>

              {/* main title */}
              <h1 className="font-bold text-muted-foreground text-xl md:text-2xl tracking-tighter">
                {t('hero.mainTitle')}
              </h1>

              {/* main description */}
              <p className="text-muted-foreground md:text-xl">
                {t('hero.summary')}
              </p>

              <div className="flex sm:flex-row flex-col gap-3 pt-2">
                <Link href="#contact">
                  <Button 
                    variant="default" 
                    className="rounded-full w-full sm:w-auto cursor-pointer">
                    {t('hero.actionButton1')} 
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                
                <Button 
                  variant="outline" 
                  className="rounded-full w-full sm:w-auto cursor-pointer" 
                  onClick={handleDownload}>
                  {t('hero.actionButton2')}
                </Button>
              </div>

              <div className="flex items-center gap-4 pt-2 text-muted-foreground">
                <HoverPreview 
                  title={t('hover.github.title')}
                  description={t('hover.github.description')}
                  stats={githubStats}>
                  <Link 
                    href="https://github.com/iakee" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="hover:text-foreground">
                    <TbBrandGithubFilled className="w-5 h-5" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                </HoverPreview>

                <HoverPreview
                  title={t('hover.linkedin.title')}
                  description={t('hover.linkedin.description')}
                  stats={linkedinStats}>
                  <Link 
                    href="https://linkedin.com/in/giordanogi" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="hover:text-foreground">
                    <FaLinkedinIn className="w-5 h-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                </HoverPreview>

                <HoverPreview
                  title={t('hover.fiverr.title')}
                  description={t('hover.fiverr.description')}
                  stats={fiverrStats}>
                  <Link 
                    href="https://fiverr.com/giordano_gi" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="hover:text-foreground">
                    <TbBrandFiverr className="w-5 h-5" />
                    <span className="sr-only">Fiverr</span>
                  </Link>
                </HoverPreview>
              </div>
            </div>
            
            {/* Right side - Profile picture */}
            <div className="flex flex-col justify-center items-center w-full md:w-2/5">
              <div className="relative rounded-full w-full max-w-[168px] md:max-w-[192px] lg:max-w-[240px] aspect-square overflow-hidden">
                <Image
                  src={`${prefix}/opc3.png`}
                  alt="portrait"
                  width={240}
                  height={240}
                  className="rounded-full object-cover"
                  style={{ height: '100%', width: '100%' }}
                  priority />
                <div className="absolute inset-0 border border-foreground/10 rounded-full" />
              </div>

              {/* status badges */}
              <div className="flex flex-wrap gap-2 mt-6">
                <div className="flex flex-wrap gap-2">
                  <Badge className="flex flex-row items-center gap-1 px-2 py-1 text-xs" variant="secondary">
                    <MdEventAvailable className="text-base" />
                    {t('hero.workStatus')}
                  </Badge>

                  <Badge className="flex flex-row items-center gap-1 px-2 py-1 text-xs" variant="secondary">
                    <RiTimeZoneFill />
                    {t('hero.workHours')}
                  </Badge>
                </div>
              </div>

              {/* action buttons - changed to open videos in new tab */}
              <div className="flex flex-row gap-2 mt-4">
                <Link href={shortVideoUrl} target="_blank" rel="noreferrer">
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 rounded-full cursor-pointer"
                  >
                    <FaPlay className="text-sm" />
                    {t('hero.watchShort')}
                  </Button>
                </Link>
                
                <Link href={longVideoUrl} target="_blank" rel="noreferrer">
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 rounded-full cursor-pointer"
                  >
                    <FaPlay className="text-sm" />
                    {t('hero.watchLong')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </main>
  )
}