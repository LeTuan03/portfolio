'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface ScrollRevealProps {
    children: React.ReactNode
    width?: 'fit-content' | '100%'
    className?: string
    delay?: number
}

export default function ScrollReveal({ children, width = 'fit-content', className = "", delay = 0 }: ScrollRevealProps) {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 1", "1.2 1"] // Starts animating when top of element enters bottom of viewport
    })

    // Standard fade in/up
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: false, margin: "-10% 0px -10% 0px" }} // Re-animates when entering/leaving
            transition={{ duration: 0.8, delay: delay, ease: [0.25, 0.1, 0.25, 1.0] }}
            style={{ width }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
