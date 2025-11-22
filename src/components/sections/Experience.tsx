'use client'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'

const experiences = [
    {
        year: '2023 - Present',
        role: 'Senior Creative Developer',
        company: 'Tech Visionaries',
        description: 'Leading the frontend team in building immersive web experiences for Fortune 500 clients.'
    },
    {
        year: '2021 - 2023',
        role: 'Frontend Engineer',
        company: 'Digital Crafters',
        description: 'Developed high-performance e-commerce platforms using Next.js and Shopify Hydrogen.'
    },
    {
        year: '2019 - 2021',
        role: 'UI/UX Developer',
        company: 'Creative Studio',
        description: 'Collaborated with designers to implement pixel-perfect responsive interfaces.'
    }
]

export default function Experience() {
    return (
        <section className="py-32 relative z-10">
            <div className="container mx-auto px-4">
                <ScrollReveal className="mb-16 text-center">
                    <h2 className="text-4xl md:text-6xl font-bold font-heading">
                        Work <span className="text-gradient">History</span>
                    </h2>
                </ScrollReveal>

                <div className="max-w-3xl mx-auto">
                    {experiences.map((exp, index) => (
                        <ScrollReveal key={index} delay={index * 0.2} width="100%">
                            <div className="relative pl-8 pb-12 border-l border-white/10 last:pb-0">
                                <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_10px_rgba(78,240,228,0.5)]" />

                                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 mb-2">
                                    <span className="text-accent font-mono text-sm">{exp.year}</span>
                                    <h3 className="text-xl font-bold">{exp.role}</h3>
                                </div>

                                <p className="text-gray-400 text-sm mb-2">{exp.company}</p>
                                <p className="text-gray-300 leading-relaxed">{exp.description}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
