'use client'
import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'

export default function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference text-white"
        >
            <div className="text-xl font-bold font-heading tracking-widest">
                {"TUAN'S PORTFOLIO"}
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-widest">
                <a href="/" className="hover:text-gray-300 transition-colors">HOME</a>
                <a href="#projects" className="hover:text-gray-300 transition-colors">PROJECTS</a>
                <a href="#services" className="hover:text-gray-300 transition-colors">SERVICES</a>
                <a href="#contact" className="hover:text-gray-300 transition-colors">CONTACT</a>
            </div>

            <button className="md:hidden">
                <Menu className="w-6 h-6" />
            </button>
        </motion.nav>
    )
}
