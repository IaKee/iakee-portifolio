"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

import { ExternalLink, FileCode } from "lucide-react"
import { TbBrandGithubFilled } from "react-icons/tb";

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/context/language-content"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tags: string[],
  actionButton1: string, 
  actionHook1: string,
  actionButton2: string,
  actionHook2: string
}

export default function ProjectCard(
  { 
    title, 
    description, 
    image, 
    tags, 
    actionButton1, 
    actionHook1,
    actionButton2,
    actionHook2 }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const { t } = useLanguage();
  
  const prefix = process.env.NODE_ENV === "production" ? "" : "";

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
    
      <Card className="
        h-full 
        flex 
        flex-col 
        overflow-hidden 
        border-2
        rounded-4xl 
        bg-muted/15
        hovershadow-2xl
        hover:shadow-[0_0_10px_rgba(255,255,255,0.2)]
        transition-all">
        
        {/* project preview image */}
        <div className="relative aspect-video overflow-hidden">
          {
            image ? 
            <Image
              src = {`${image}`}
              alt = {title}
              fill
              className={`object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}/>
            : <FileCode className={`h-full w-full p-5 object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}/>
          }
        </div>
        
        {/* project title and description */}
        <CardHeader>
          <CardTitle>
            {title}
          </CardTitle>

          <CardDescription>
            {description}
          </CardDescription>
        </CardHeader>
        
        {/* project tags */}
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {/* Iterates over projects listed on language file */}
            {
              tags.map(
                (tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                )
              )
            }
          </div>
        </CardContent>
        
        {/* action buttons */}
        <CardFooter className="
          mt-auto 
          flex 
          justify-center 
          items-center 
          gap-2">
          

          {/* main action button */}
          {
            actionButton1 === "Demo"
              ? (
                <Link href="">
                  <Button 
                    variant={actionButton2 && actionHook2 ? "outline" : "default"}
                    className="
                      rounded-full 
                      cursor-pointer 
                      hover:ring-2 
                      hover:bg-bg 
                      hover:ring-primary 
                      hover:ring-offset-2 
                      transition-all"
                    onClick={
                      () => {
                        localStorage.setItem("prefillMessage", t("prefill.demonstration"))
                        window.location.href = `${prefix}/`
                      }
                    }>
                    <TbBrandGithubFilled className="h-5 w-5" />
                    {actionButton1}
                  </Button>
                </Link>)
              : (
                <Link href={actionHook1} target="_blank" rel="noreferrer">
                  <Button 
                    variant={actionButton2 && actionHook2 ? "outline" : "default"}
                    className="
                      rounded-full 
                      cursor-pointer 
                      hover:ring-2 
                      hover:bg-bg 
                      hover:ring-primary 
                      hover:ring-offset-2 
                      transition-all" >
                    <TbBrandGithubFilled className="h-5 w-5" />
                    {actionButton1}
                  </Button>
                </Link>
              )
          }
          
          { /* secondary action button */
            actionButton2 && actionHook2 && (
              <Link href={actionHook2} target="_blank" rel="noreferrer">
                <Button size="sm" className="rounded-full cursor-pointer hover:ring-2 hover:ring-primary hover:ring-offset-2 transition-all">
                  <ExternalLink className="h-5 w-5" />
                  {actionButton2}
                </Button>
              </Link>
            )
          }
        </CardFooter>
   
      </Card>
    </motion.div>
  )
}

