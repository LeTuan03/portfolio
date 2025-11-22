'use client'
import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const projects = [
    {
        title: 'Neon Horizon',
        category: 'Immersive Web Experience',
        description: 'A 3D racing game built with React Three Fiber and physics engine.',
        tech: ['R3F', 'Zustand', 'WebGL'],
        color: 'from-purple-500 to-blue-500'
    },
    {
        title: 'Cyber Dashboard',
        category: 'SaaS Interface',
        description: 'Real-time data visualization platform with futuristic UI components.',
        tech: ['Next.js', 'D3.js', 'Tailwind'],
        color: 'from-blue-500 to-cyan-500'
    },
    {
        title: 'Void Commerce',
        category: 'E-commerce',
        description: 'High-performance headless Shopify storefront with page transitions.',
        tech: ['Shopify', 'Framer Motion', 'Redis'],
        color: 'from-cyan-500 to-emerald-500'
    }
]

export default function Projects() {
    return (
        <section className="py-32 relative z-10">
            <div className="container mx-auto px-4">
                <ScrollReveal className="mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold font-heading mb-4">
                        Selected <span className="text-gradient">Works</span>
                    </h2>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <ScrollReveal key={index} delay={index * 0.2}>
                            <div className="group relative h-full">
                                <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-6">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-4xl font-bold text-white/10 group-hover:text-white/20 transition-colors uppercase tracking-widest">
                                            {project.title.split(' ')[0]}
                                        </span>
                                    </div>

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
                                        <button className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform">
                                            <ExternalLink className="w-5 h-5" />
                                        </button>
                                        <button className="p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors">
                                            <Github className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
                                <p className="text-sm text-accent mb-3 uppercase tracking-wider">{project.category}</p>
                                <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>

                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((t) => (
                                        <span key={t} className="text-xs text-gray-500 border border-gray-800 px-2 py-1 rounded-md">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
