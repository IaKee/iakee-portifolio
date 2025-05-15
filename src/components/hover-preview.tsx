"use client"

import type React from "react"
import {
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
} from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

interface HoverPreviewProps {
  children: React.ReactNode
  title: string
  description: string
  image?: string
  stats?: Array<{
    label: string
    value: string
  }>
}

type Position = "top" | "bottom" | "overlay"

export default function HoverPreview({
  children,
  title,
  description,
  image,
  stats,
}: HoverPreviewProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    arrowLeft: 0,
    placement: "top" as Position,
  })

  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const prefix = process.env.NODE_ENV === "production" ? "" : "";
   
  const updatePosition = () => {
    if(isHovered && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect()
      const tooltipRect = tooltipRef.current.getBoundingClientRect()

      const triggerCenter = triggerRect.left + triggerRect.width / 2
      let x = triggerCenter - tooltipRect.width / 2

      if (x < 16) x = 16
      if (x + tooltipRect.width > window.innerWidth - 16) {
        x = window.innerWidth - tooltipRect.width - 16
      }

      const arrowLeft = triggerCenter - x - 8

      let y = 0
      let placement: Position = "top"

      const spaceAbove = triggerRect.top
      const spaceBelow = window.innerHeight - triggerRect.bottom
      const minRequiredSpace = tooltipRect.height + 12

      if (spaceAbove >= minRequiredSpace) {
        y = triggerRect.top - tooltipRect.height - 12
        placement = "top"
      } else if (spaceBelow >= minRequiredSpace) {
        y = triggerRect.bottom + 12
        placement = "bottom"
      } else {
        y = Math.max(
          16,
          triggerRect.top - (tooltipRect.height - triggerRect.height) / 2
        )
        if (y < 16) y = 16
        if (y + tooltipRect.height > window.innerHeight - 16) {
          y = window.innerHeight - tooltipRect.height - 16
        }
        placement = "overlay"
      }

      setPosition({ x, y, arrowLeft, placement })
    }
  }

  useLayoutEffect(() => {
    updatePosition()
  }, [isHovered, updatePosition])

  useEffect(() => {
    if (isHovered) {
      window.addEventListener("scroll", updatePosition)
      window.addEventListener("resize", updatePosition)
      return () => {
        window.removeEventListener("scroll", updatePosition)
        window.removeEventListener("resize", updatePosition)
      }
    }
  }, [isHovered, updatePosition])

  return (
    <div
      ref={triggerRef}
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="cursor-pointer">
        {children}
      </div>
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            ref={tooltipRef}
            initial={{
              opacity: 0,
              y:
                position.placement === "top"
                  ? -5
                  : position.placement === "bottom" ? 5 : 0,
            }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y:
                position.placement === "top"
                  ? -5
                  : position.placement === "bottom" ? 5 : 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: position.y,
              left: position.x,
              zIndex: 50,
            }}
            className="
              w-64 
              bg-primary-foreground 
              rounded-xl
              shadow-2xl
              shadow-[0_0_10px_rgba(255,255,255,0.2)]">
            <Card className="shadow-lg rounded-xl relative">
              {position.placement !== "overlay" && (
                <div
                  className={`
                    absolute w-4 h-4 bg-card rotate-45
                    ${
                      position.placement === "top"
                        ? "bottom-[-8px] border-r border-b"
                        : "top-[-8px] border-l border-t"
                    }
                  `}
                  style={{
                    left: `${Math.max(
                      Math.min(
                        position.arrowLeft,
                        tooltipRef.current?.offsetWidth! - 24
                      ),
                      16
                    )}px`,
                  }}
                />
              )}
        
              <CardContent className="p-3">
                {image && (
                  <div className="relative w-full h-32 mb-3 overflow-hidden rounded-md">
                    <Image
                      src={`${prefix}/${image}`}
                      alt={title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <h3 className="font-semibold text-sm">
                  {title}
                </h3>

                <p className="text-xs text-muted-foreground mt-1 mb-2">
                  {description}
                </p>

                {stats && (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {stats.map((stat, index) => {
                      const isLastSingle =
                        stats.length % 2 !== 0 &&
                        index === stats.length - 1

                      return (
                        <div
                          key={index}
                          className={`
                            text-center
                            p-1
                            rounded-lg
                            bg-muted
                            ${
                              isLastSingle || stats.length === 1
                                ? "col-span-2"
                                : "col-span-1"
                            }
                          `}>
                          <p className="text-xs font-medium">
                            {stat.label}
                          </p>

                          <p className="text-xs">
                            {stat.value}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
