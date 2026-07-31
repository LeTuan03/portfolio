import Navbar from '@/components/ui/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/ui/Footer'
import Portfolio from '@/components/ui/Portfolio'
import Services from '@/components/ui/Services'

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-black">
      <Navbar />
      <Hero />
      <About />
      <Portfolio />
      <Services />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </main>
  )
}
