'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const navLinks = [
        { href: '/', label: 'HOME' },
        { href: '#projects', label: 'PROJECTS' },
        { href: '#services', label: 'SERVICES' },
        { href: '#contact', label: 'CONTACT' },
    ]

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={`fixed top-0 left-0 w-full z-50 px-6 md:px-10 py-5 flex justify-between items-center transition-colors duration-300 ${
                    scrolled ? 'bg-black/70 backdrop-blur-md' : 'bg-transparent'
                } text-white`}
            >
                <a href="/" className="text-lg font-bold font-heading tracking-widest">
                    TUAN'S PORTFOLIO
                </a>

                <div className="hidden md:flex items-center gap-10 text-sm font-medium tracking-widest">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="relative group text-white/80 hover:text-white transition-colors"
                        >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
                        </a>
                    ))}
                </div>

                <button
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="md:hidden relative z-50"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </motion.nav>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center gap-8 md:hidden"
                    >
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.08 }}
                                className="text-2xl font-light tracking-widest text-white hover:text-white/60 transition-colors"
                            >
                                {link.label}
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}