"use client"

import { useEffect, useState } from "react"
import { Check, Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/context/language-content"

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  const { t } = useLanguage();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentTheme = localStorage.getItem("theme") as "light" | "dark" | null
      const appliedTheme = currentTheme || "light"

      setTheme(appliedTheme)

      if (appliedTheme === "dark") {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
  }, [])

  const toggleTheme = (forcedTheme?: "light" | "dark") => {
    const newTheme = forcedTheme ?? (theme === "light" ? "dark" : "light")
    localStorage.setItem("theme", newTheme)

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    setTheme(newTheme)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="
            flex 
            items-center 
            rounded-full 
            gap-2 
            border-2
            border-primary
            hover:bg-primary/32
            hover:scale-[1.05]
            cursor-pointer
            transition-all">
          <span className="flex relative items-center h-[1.2rem] w-[1.2rem]">
            <Sun
              className={`
                absolute 
                transition-all 
                duration-300 
                h-[1.2rem] w-[1.2rem]
                ${
                  theme === "light" 
                    ? "rotate-0 scale-100 opacity-100" 
                    : "-rotate-90 scale-0 opacity-0"
                }
              `}
            />
            <Moon
              className={`
                absolute 
                transition-all 
                duration-300 
                h-[1.2rem] w-[1.2rem]
                ${
                  theme === "dark" 
                    ? "rotate-0 scale-100 opacity-100" 
                    : "rotate-90 scale-0 opacity-0"
                }
              `}
            />
          </span>
          
          {t('header.theme')}

        </Button>
      </DropdownMenuTrigger>

      {/* dropdown menu content */}
      <DropdownMenuContent 
        align="end" 
        className="bg-primary-foreground rounded-xl">
        
        {/* light mode button */}
        <DropdownMenuItem 
          onClick={() => toggleTheme("light")} 
          className="flex items-center justify-between rounded-xl cursor-pointer">
          
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4" />
            <span>
              {t('theme.light')}
            </span>
          </div>
          {theme === "light" && <Check className="h-4 w-4 ml-2" />}
        </DropdownMenuItem>
        
        {/* light mode button */}
        <DropdownMenuItem 
          onClick={() => toggleTheme("dark")} 
          className="flex items-center justify-between rounded-xl cursor-pointer">
          
          <div className="flex items-center gap-2">
            <Moon className="h-4 w-4" />
            <span>
              {t('theme.dark')}
            </span>
          </div>

          {/* selected mode checkmark */}
          {
            theme === "dark" && 
            <Check className="h-4 w-4 ml-2" />
          }
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
