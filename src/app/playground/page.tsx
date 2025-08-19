"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Search, ArrowRight, Download, Loader2, Send, ThumbsUp } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useLanguage } from "@/context/language-content"
import { useState, useEffect, useCallback } from "react"

import { FaCode, FaGear, FaRobot } from "react-icons/fa6";
import ScrollingIcons from "./components/scrolling-icons"
import ScrollingProps from "./components/scrolling-props"
import { IoIosRocket } from "react-icons/io"
import { MdOutlineExpandMore } from "react-icons/md"
import TitleBar from "./components/title-bar"
import SearchBar from "./components/search-bar"
import ItemShowcase from "./components/item-showcase"
import ButtonShowCaseTab from "./components/buttons-showcase-tab"
import ButtonsShowCaseTab from "./components/buttons-showcase-tab"


export type ShowcaseCategory = {
  title: string;
  description: string;
  tags: string[];
  id: string;
  components: React.ReactNode[];
}

export default function PlaygroundShowcase() {
  const router = useRouter();
  const { t } = useLanguage();

  const contentData = [
    {
      title: t('playground.buttons.title'),
      description: t('playground.buttons.description'),
      tags: t('playground.buttons.tags') as unknown as string[],
      id: "0",
      components: [<ButtonsShowCaseTab />]
    }
  ]

  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [filteredContent, setFilteredContent] = useState<ShowcaseCategory[]>([]);

  const handleFilter = useCallback(
    (results: ShowcaseCategory[]) => {
      setFilteredContent(
        (prev) => {
          if(
            prev.length === results.length &&
            prev.every(
              (item, i) => item.id === results[i].id)) {
                return prev;
              }
          return results;
        }
      );
    }, 
    []
  );

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
  }

  return (
    <main className="">
      <Header />

      <div className="flex flex-col min-h-screen">
        <TitleBar />

        <SearchBar 
          contentData={contentData}
          onFilter={handleFilter}/>
        
          
        {/* content background */}
        <div className={`
          flex 
          flex-col 
          w-[60%]
          mx-auto
          justify-center
          border-2
          border-muted
          rounded-xl
          py-6
          items-center 
          px-4
          my-8`}>
          
          
          { /* playground components */}
          <div className="flex flex-col gap-4 p-5 w-full">
            {
              filteredContent.map(
                (item) => (
                  <ItemShowcase
                    key={item.id} 
                    toggleExpand={toggleExpand}
                    item={item} 
                    expandedIds={expandedIds} />
                )
              )
            }

            {
              // if no results, show this
              filteredContent.length === 0 && 
              (
                <p className="text-gray-400 text-center">
                  {t('resume.noResults')}
                </p>
              )
            }
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}