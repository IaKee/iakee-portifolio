import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-content";
import { ArrowRight, Download, Loader2, Send, ThumbsUp } from "lucide-react";
import { useState } from "react";

export default function ButtonsShowCaseTab (){
  const { t } = useLanguage();

  const [loading, setLoading] = useState(false)
  const [clicked, setClicked] = useState(false)

  const handleLoadingClick = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  const handleAnimatedClick = () => {
    setClicked(true)
    setTimeout(() => setClicked(false), 1000)
  }

  const variants = ["default", "destructive", "secondary", "ghost", "outline"];
  const sizes = ["default", "sm", "lg", "icon"];

  return (
    <div className="space-y-6">
      {/* button variants */}
      <div className="w-full px-[5%] rounded-xl border-2 border-muted p-4">
        <h3 className="flex flex-row gap-2 mb-2">

          {/* title */}
          <h4 className="flex items-bottom text-lg font-semibold">
            {t('playground.buttons.variant.title')}
          </h4>

          {/* vertical separator */}
          <div className="flex items-center justify-center w-px h-5 bg-muted hidden md:block" />

          {/* description here */}
          <h4 className="flex items-center text-sm text-muted">
            {t('playground.buttons.variant.description')}
          </h4>
        </h3>
        
        {/* button variants iterator */}
        <div className="flex flex-wrap gap-4">
          {
            variants.map(
              (variant) => (
                <Button 
                  key={variant} 
                  variant={variant as any} 
                  className="
                    cursor-pointer 
                    hover:scale-[1.1]
                    rounded-full
                    transition-all">
                  {t(`playground.buttons.variant.${variant}`)}
                </Button>
              )
            )
          }
        </div>
      </div>

      {/* button sizes */}
      <div className="w-full px-[5%] rounded-xl border-2 border-muted p-4">
        <h3 className="flex flex-row gap-2 mb-2">
          {/* title */}
          <h4 className="flex items-bottom text-lg font-semibold">
            {t('playground.buttons.size.title')}
          </h4>

          {/* vertical separator */}
          <div className="flex items-center justify-center w-px h-5 bg-muted hidden md:block" />

          {/* description here */}
          <h4 className="flex items-center text-sm text-muted">
            {t('playground.buttons.size.description')}
          </h4>
        </h3>

        <div className="flex flex-wrap gap-4 items-center">
          {
            sizes.map(
              (size) => (
                <Button 
                  key={size} 
                  size={size as any} 
                  className="
                    cursor-pointer 
                    hover:scale-[1.1]
                    rounded-full
                    transition-all">
                  {
                    size === "icon"
                      ? <Send className="h-4 w-4" />
                      : t(`playground.buttons.size.${size}`)
                  }
                </Button>
              )
            )
          }
        </div>
      </div>

      {/* button states */}
      <div className="w-full px-[5%] rounded-xl border-2 border-muted p-4">
        <h3 className="flex flex-row gap-2 mb-2">
          {/* title */}
          <h4 className="flex items-bottom text-lg font-semibold">
            {t('playground.buttons.state.title')}
          </h4>

          {/* vertical separator */}
          <div className="flex items-center justify-center w-px h-5 bg-muted hidden md:block" />
          
          {/* description here */}
          <h4 className="flex items-center text-sm text-muted">
            {t('playground.buttons.state.description')}
          </h4>
        </h3>

        <div className="flex flex-wrap gap-4 items-center">
          <Button className="
            cursor-pointer
            rounded-full
            hover:scale-[1.1]
            transition-all">
            {t('playground.buttons.state.default')}
          </Button>

          <Button className="
            cursor-pointer
            rounded-full
            hover:scale-[1.1]
            transition-all"
            disabled>
            {t('playground.buttons.state.disabled')}
          </Button>

          <Button className="
            cursor-pointer
            rounded-full
            hover:scale-[1.1]
            transition-all"
            variant="outline" 
            disabled>
            {t('playground.buttons.state.outlineDisabled')}
          </Button>
        </div>
      </div>

      {/* button with icons and effects */}    
      <div className="w-full px-[5%] rounded-xl border-2 border-muted p-4">
        <h3 className="flex flex-row gap-2 mb-2">
          {/* title */}
          <h4 className="flex items-bottom text-lg font-semibold">
            {t('playground.buttons.iconsAndEffects.title')}
          </h4>

          {/* vertical separator */}
          <div className="flex items-center justify-center w-px h-5 bg-muted hidden md:block" />

          {/* description here */}
          <h4 className="flex items-center text-sm text-muted">
            {t('playground.buttons.iconsAndEffects.description')}
          </h4>
        </h3>
        
        <div className="flex flex-wrap gap-4 my-4">
          <Button className="
            cursor-pointer
            rounded-full
            hover:scale-[1.1]
            transition-all">
            <Send className="mr-2 h-4 w-4" /> 
            {t('playground.buttons.iconsAndEffects.send')}
          </Button>
          
          <Button className="
            cursor-pointer
            rounded-full
            hover:scale-[1.1]
            transition-all"
            variant="outline">
            <Download className="mr-2 h-4 w-4" /> 
            {t('playground.buttons.iconsAndEffects.download')}
          </Button>

          <Button className="
            cursor-pointer
            rounded-full
            hover:scale-[1.1]
            transition-all"
            variant="secondary">
            {t('playground.buttons.iconsAndEffects.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <Button className="
            cursor-pointer
            rounded-full
            border-1
            hover:scale-[1.1]
            transition-all"
            variant="ghost">
            <ThumbsUp className="mr-2 h-4 w-4" /> 
            {t('playground.buttons.iconsAndEffects.like')}
          </Button>

          <Button className="
            cursor-pointer
            rounded-full
            hover:scale-[1.1]
            transition-all"
            onClick={handleLoadingClick} 
            disabled={loading}>
            {
              loading && 
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            } 
            {
              loading 
                ? t('playground.buttons.iconsAndEffects.loading') 
                : t('playground.buttons.iconsAndEffects.load')
            }
          </Button>
    
          <Button 
            className="
              cursor-pointer
              rounded-full
              hover:scale-[1.1]
              transition-all 
              active:scale-95">
            {t('playground.buttons.iconsAndEffects.shrinkClick')}
          </Button>
          
          <Button 
            className="
              relative 
              overflow-hidden 
              cursor-pointer
              rounded-full
              hover:scale-[1.1]
              transition-all 
              hover:bg-primary/90 
              active:bg-primary/80">
            {t('playground.buttons.iconsAndEffects.colorHover')}
          </Button>

          <Button 
            className={
              `relative 
              ${clicked 
                ? "animate-pulse" 
                : ""} 
              bg-gradient-to-r 
              from-pink-500 
              to-violet-500 
              cursor-pointer
              rounded-full
              hover:scale-[1.1]
              hover:from-pink-600 
              hover:to-violet-600`} 
            onClick={handleAnimatedClick}>
              {t('playground.buttons.iconsAndEffects.pulse')}
          </Button>

          <Button 
            className="
              relative 
              cursor-pointer
              rounded-full
              hover:scale-[1.1]
              transition-all
              overflow-hidden 
              before:absolute 
              before:inset-0 
              before:-z-10 
              before:translate-x-[100%] 
              before:translate-y-[100%] 
              before:rotate-45 
              before:bg-white 
              before:opacity-20 
              before:transition 
              hover:before:translate-x-[-50%] 
              hover:before:translate-y-[-50%]">
            {t('playground.buttons.iconsAndEffects.glow')}
          </Button>
        </div>
      </div>
    </div>
  )
}