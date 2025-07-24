import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { IconType } from "react-icons"

export type ScrollingIconProps = {
  icons: IconType[]
  delay?: number
  className?: string
}

export default function ScrollingIcons({ icons, delay = 1000, className = "" }: ScrollingIconProps) {
  const [current, setCurrent] = useState(0)

  useEffect(
    () => {
      const interval = setInterval(
        () => {
          setCurrent(
            prev => {
              if (icons.length <= 1) 
                return prev;

              const options = icons
                .map((_, index) => index)
                // removes current index from options
                .filter(index => index !== prev); 

              const nextIndex = options[
                Math.floor(
                  Math.random() * options.length)
              ];
              
              return nextIndex;
            }
          );
        }, 
      delay);

      return () => clearInterval(interval);
    }, 
    [icons.length, delay]
  );


  const Icon = icons[current]

  return (
    <div className={`text-4xl ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}>
          <Icon />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
