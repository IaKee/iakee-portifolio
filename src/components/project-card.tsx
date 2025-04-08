"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, FileCode, Github } from "lucide-react"
import { motion } from "framer-motion"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tags: any,
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

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
    
      <Card className="h-full flex flex-col overflow-hidden">
        <div className="relative aspect-video overflow-hidden">
          {
            image ? 
            <Image
              src = {image || "/placeholder.svg"}
              alt = {title}
              fill
              className={`object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}/>
            : <FileCode className={`h-full w-full p-5 object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}/>
        }
        </div>

        <CardHeader>
          <CardTitle>
            {title}
          </CardTitle>

          <CardDescription>
            {description}
          </CardDescription>
        </CardHeader>

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
          
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="sm" asChild>
            <Link href={actionHook1} target="_blank" rel="noreferrer">
              <Github className="mr-2 h-4 w-4" />
                {actionButton1}
            </Link>
          </Button>
          
          {
            actionButton2 && actionHook2 && (
              <Link href={actionHook2} target="_blank" rel="noreferrer">
                <Button size="sm">
                  <ExternalLink className="mr-2 h-4 w-4" />
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

