"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

interface HoverPreviewProps {
  children: React.ReactNode,
  title: string
  description: string
  image?: string
  stats?: Array<{
    label: string
    value: string
    }>
}

export default function HoverPreview(
    { 
        children, 
        title, 
        description, 
        image, 
        stats }: HoverPreviewProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="cursor-pointer">{children}</div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 z-50"
          >
            <Card className="w-64 shadow-lg">
              <CardContent className="p-3">
                {image && (
                  <div className="relative w-full h-32 mb-3 overflow-hidden rounded-md">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <h3 className="font-semibold text-sm">{title}</h3>
                <p className="text-xs text-muted-foreground mt-1 mb-2">{description}</p>

                {stats && (
                  <div className="grid gap-2 mt-2">
                    {
                      stats.map((stat, index) => {
                        const isLastSingle = stats.length % 2 !== 0 && index === stats.length - 1;
                        
                        return (
                          <div 
                            key={index} 
                            className={`text-center p-1 bg-muted rounded-md ${isLastSingle || stats.length === 1 ? "col-span-2" : "col-span-1"}`}>

                              <p className="text-xs font-medium">
                                {stat.label}
                              </p>

                              <p className="text-xs">
                                {stat.value}
                              </p>
                          </div>
                        );
                      })
                    }
                  </div>
                  )
                }
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}