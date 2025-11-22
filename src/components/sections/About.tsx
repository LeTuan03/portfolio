'use client'
import { motion } from 'framer-motion'
import { Code2, Cpu, Globe, Palette } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const skills = [
    { name: 'Frontend', icon: Globe, items: ['Next.js', 'React', 'TypeScript', 'Tailwind'] },
    { name: 'Creative', icon: Palette, items: ['Three.js', 'Framer Motion', 'WebGL'] },
    { name: 'Backend', icon: Cpu, items: ['Java', 'MongoDB', 'Spring Boot', 'Redis'] },
    { name: 'Architecture', icon: Code2, items: ['System Design', 'CI/CD', 'Testing', 'Cloud'] },
]

export default function About() {
    return (
        <section className="py-32 relative z-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <ScrollReveal>
                        <h2 className="text-4xl md:text-6xl font-bold font-heading mb-8">
                            Beyond the <br />
                            <span className="text-gradient">Code</span>
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-6">
                            I am a creative technologist who bridges the gap between design and engineering. With a passion for interactive 3D web experiences, I push the boundaries of what&apos;s possible in the browser.
                        </p>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            My approach combines technical precision with artistic vision, ensuring every pixel serves a purpose and every interaction feels natural.
                        </p>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {skills.map((skill, index) => (
                            <ScrollReveal key={skill.name} delay={index * 0.1} width="100%">
                                <div className="glass p-6 rounded-2xl hover:bg-white/5 transition-colors group h-full">
                                    <skill.icon className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform duration-300" />
                                    <h3 className="text-xl font-bold mb-4">{skill.name}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {skill.items.map((item) => (
                                            <span
                                                key={item}
                                                className="text-xs font-medium px-2 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
