import Link from "next/link"

import Header from "@/components/header"
import HeroSection from "@/components/hero-section"

import { Github, Linkedin, Twitter } from "lucide-react"
import AboutTab from "@/components/about-tab"
import FeaturedProjects from "@/components/featured-projects"
import Skills from "@/components/skills"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <HeroSection />

      {/*<AboutTab />*/}

      <FeaturedProjects />

      <Skills />
     
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} DevName. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

