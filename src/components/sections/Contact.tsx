'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

// Thay thế URL này bằng Web App URL từ Google Apps Script của bạn
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz6zOh-De2Cl52rCIeSzJLnxq4IM0kvDueF_jPnDzI_Le1-h7hN5XBtZn-Mo0-VeWZR/exec'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus('idle')

        try {
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Important for Google Apps Script
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            // With no-cors mode, we can't read the response, so we assume success
            setSubmitStatus('success')
            setFormData({ name: '', email: '', message: '' })

            // Reset success message after 5 seconds
            setTimeout(() => setSubmitStatus('idle'), 5000)
        } catch (error) {
            console.error('Error submitting form:', error)
            setSubmitStatus('error')

            // Reset error message after 5 seconds
            setTimeout(() => setSubmitStatus('idle'), 5000)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section className="py-32 relative z-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <ScrollReveal>
                        <h2 className="text-4xl md:text-6xl font-bold font-heading mb-8">
                            Let&apos;s <span className="text-gradient">Connect</span>
                        </h2>
                        <p className="text-gray-400 text-lg mb-12">
                            Interested in working together? I&apos;m always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-accent">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="text-lg font-medium">leetuaans03@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-accent">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Location</p>
                                    <p className="text-lg font-medium">Ha Noi, Viet Nam</p>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.2} width="100%">
                        <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors resize-none"
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            {submitStatus === 'success' && (
                                <div className="flex items-center gap-2 text-green-500 bg-green-500/10 p-3 rounded-lg">
                                    <CheckCircle className="w-5 h-5" />
                                    <span>Message sent successfully!</span>
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="flex items-center gap-2 text-red-500 bg-red-500/10 p-3 rounded-lg">
                                    <AlertCircle className="w-5 h-5" />
                                    <span>Failed to send message. Please try again.</span>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    )
}
