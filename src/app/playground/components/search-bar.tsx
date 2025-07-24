import { useLanguage } from "@/context/language-content";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { ShowcaseCategory } from "../page";
import { Button } from "@/components/ui/button";
import { FaGear } from "react-icons/fa6";

type SearchBarProps = {
  contentData: ShowcaseCategory[];
  onFilter: (results: ShowcaseCategory[]) => void;
};

export default function SearchBar({ contentData, onFilter }: SearchBarProps) {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filtered = searchTerm.trim() === ""
      ? contentData
      : contentData.filter(
          item =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );

    onFilter(filtered);
  }, [searchTerm, contentData]);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="
        flex
        w-full 
        max-w-md 
        h-12
        flex-row 
        items-center
        transition-all
        ring-8
        ring-offset-4
        ring-offset-background
        ring-primary/50
        rounded-full">
        
        {/* input + icon */}
        <div className="w-full h-full">
          <div className="
            flex 
            flex-row
            items-center
            pr-2
            pl-4
            gap-2
            h-full
            rounded-l-full 
            border 
            border-input 
            bg-bg 
            hover:bg-accent 
            hover:text-accent-foreground
            transition-colors">
            <Search className="text-primary w-5 h-5" />
            <input
              type="text"
              placeholder={t('playground.searchPrefill')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="
                w-full
                pr-4 
                text-primary
                placeholder-text-muted
                truncate
                focus:outline-none 
                focus:ring-0
                transition-all">
            </input>
          </div>
        </div>

        {/* settings button */}
        <Button
          className="
            flex
            items-center
            cursor-pointer
            h-full
            group
            bg-primary
            rounded-r-full"
          variant="default"
          onClick={() => console.log("action")}>
          <FaGear className="w-5 h-5 group-active:animate-spin-ping" />
          <p>{t('playground.style.button')}</p>
        </Button>
      </div>
    </div>
  );
}
