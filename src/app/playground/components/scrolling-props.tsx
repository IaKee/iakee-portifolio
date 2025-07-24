import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState, ReactElement } from "react"

type ScrollingProps = {
  variants: Record<string, any>[]
  render: (props: Record<string, any>) => ReactElement
  delay?: number
}

export default function ScrollingProps(
  { variants, render, delay = 1000 }: ScrollingProps) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % variants.length)
    }, delay)

    return () => clearInterval(interval)
  }, [variants.length, delay])

  const props = variants[current]

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={current}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 5 }}
        transition={{ duration: 0.3 }}
      >
        {render(props)}
      </motion.div>
    </AnimatePresence>
  )
}
