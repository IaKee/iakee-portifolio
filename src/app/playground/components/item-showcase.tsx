import { Button } from "@/components/ui/button";
import { ShowcaseCategory } from "../page";
import { useLanguage } from "@/context/language-content";
import { MdOutlineExpandMore } from "react-icons/md";

type ItemShowcaseProps = {
  key: string;
  item: ShowcaseCategory;
  expandedIds: string[];
  toggleExpand: (id: string) => void;
};

export default function ItemShowcase(
  {key, item, expandedIds, toggleExpand}: ItemShowcaseProps) {

  const { t } = useLanguage();
  
  return (
    <div key={key} className="bg-secondary/45 p-4 rounded-xl shadow-md group">
      {/* item header */}
      <div className="flex justify-between items-center">
        {/* item title */}
        <h2 className="text-xl font-semibold text-white">
          {item.title}
        </h2>
        
        {/* expand button */}
        <Button 
          className={`
            rounded-full
            cursor-pointer
            group-hover:scale-[1.05] 
            ${expandedIds.includes(item.id) 
              ? "" 
              : "group-hover:animate-text-hint-ping"}`}
          variant="ghost" 
          size="sm" 
          onClick={
            () => toggleExpand(item.id)
          }>
          
          {
            expandedIds.includes(item.id) 
              ? 
                <div className="flex items-center gap-1">
                  {t('playground.buttons.hideDetails')}
                  <MdOutlineExpandMore />
                </div>
                            
              : 
                <div className="flex items-center gap-1">
                  {t('playground.buttons.showDetails')}
                  <MdOutlineExpandMore />
                </div>
          }
        </Button>
      </div>
      
      {/* item description */}
      <p className="text-muted mt-2">
        {item.description}
      </p> 

      {/* item tags */}              
      <div className="flex flex-wrap gap-2 mt-3">
        {
          item.tags.map(
            (tag, idx) => (
              <span 
              key={idx} 
              className="
              text-xs 
              bg-primary
              text-secondary
              font-semibold 
              px-2 
              py-1 
              rounded-full">
                {tag}
              </span>
            )
          )
        }
      </div>
      
      {/* horizontal separator here */}
      <div className="flex items-center justify-center mt-4 w-full h-px bg-muted hidden md:block" />

      {
        expandedIds.includes(item.id) && 
        (
          <div className="mt-4 space-y-3">
            {
              item.components.map(
                (Component, index) => (
                  <div className="
                    w-full 
                    flex 
                    justify-center
                    items-center" 
                    key={index}>
                  
                    {/* main contents*/}
                    {Component}
                  </div>
                )
              )
            }
          </div>
        )
      }
    </div>
  )
}