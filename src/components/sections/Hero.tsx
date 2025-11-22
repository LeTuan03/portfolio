'use client'
import { motion } from 'framer-motion'
import Scene from '@/components/3d/Scene'
import { ArrowRight, Download } from 'lucide-react'

export default function Hero() {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            <Scene />

            <div className="relative z-10 container mx-auto px-4">
                <div className=" mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="mb-6 relative"
                    >
                        <h1 className="text-[15vw] leading-[0.8] font-bold font-heading tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mix-blend-overlay select-none">
                            TUAN LE
                        </h1>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20 z-20" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-xl md:text-3xl font-light tracking-[0.5em] text-accent uppercase mb-12"
                    >
                        Creative Developer
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col md:flex-row items-center justify-center gap-4"
                    >
                        <button className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-transform hover:scale-105">
                            <span className="relative z-10 flex items-center gap-2">
                                View Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>

                        <button className="group px-8 py-4 border border-white/20 rounded-full font-medium hover:bg-white/5 transition-colors flex items-center gap-2">
                            Resume <Download className="w-4 h-4" />
                        </button>
                    </motion.div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs text-gray-500"
            >
                <span>SCROLL TO EXPLORE</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent" />
            </motion.div>
        </section>
    )
}
