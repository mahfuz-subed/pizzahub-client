"use client"

import type { ReactNode } from "react"
import { motion, useReducedMotion } from "motion/react"

type FadeInProps = {
  children: ReactNode
  delay?: number
  className?: string
}

export function FadeIn({ children, delay = 0, className }: FadeInProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }} // starting look
      whileInView={{ opacity: 1, y: 0 }} // final look
      viewport={{ once: true, amount: 0.2 }} // play once, when 20% is visible
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
