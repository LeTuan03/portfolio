'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Briefcase, ExternalLink, X, MonitorPlay, Code, Activity, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

type Project = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  category: string;
  categoryColor: string;
  description: string;
  tech: string[];
  image: string;
  features: string[];
  demoUrl?: string;
  isContain?: boolean;
};

const projects: Project[] = [
  {
    icon: MonitorPlay,
    title: 'Learning Management System (LMS)',
    subtitle: 'Online learning platform',
    category: 'Education',
    categoryColor: 'bg-indigo-950 text-indigo-300 border-indigo-800',
    description:
      'A comprehensive LMS for managing courses, learners, online assessments, tuition payments, and automatic certificate issuance.',
    tech: ['React', 'Spring Boot', 'MySQL', 'Redis'],
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=1200',
    features: ['Course management', 'Online exams', 'VNPay integration', 'Role-based permissions'],
  },
  {
    icon: Code,
    title: 'Hoang Mai Legal Office Software',
    subtitle: 'Legal case management system',
    category: 'Legal Tech',
    categoryColor: 'bg-blue-950 text-blue-300 border-blue-800',
    description:
      'A digital workflow system for legal operations including document issuance, service of process, enforcement checks, and legal advisory support.',
    tech: ['React', 'Node.js', 'PostgreSQL'],
    image: 'https://thuaphatlaihoangmai.com/logo.png',
    features: ['Document drafting', 'Legal notices', 'Enforcement verification', 'Enhanced security'],
    isContain: true,
  },
  {
    icon: Activity,
    title: 'Veterinary Biotechnology Company',
    subtitle: 'Biotechnology ERP system',
    category: 'Biotechnology',
    categoryColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
    description:
      'A full management system for research, production, and distribution of vaccines and veterinary medicines serving the livestock industry.',
    tech: ['Vue.js', 'Spring Boot', 'MySQL', 'Docker'],
    image: 'https://biotechvet.com.vn/images/about.webp',
    features: ['Production management', 'Warehouse logistics', 'Distributor management', 'Revenue reporting'],
  },
  {
    icon: Code,
    title: 'AIWORK SEA',
    subtitle: 'AI & Automation recruitment platform',
    category: 'Job Board',
    categoryColor: 'bg-purple-950 text-purple-300 border-purple-800',
    description:
      'A job board focused on hiring AI, Machine Learning, and Automation freelancers across Southeast Asia, including remote, contract, and part-time work.',
    tech: ['Next.js', 'TailwindCSS', 'TypeScript', 'Node.js'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
    features: ['Remote job search', 'Freelancer profile creation', 'Hiring postings', 'AI market insights'],
    demoUrl: 'https://aiworksea.netlify.app/',
  },
  {
    icon: ExternalLink,
    title: 'GlobalEdu',
    subtitle: 'Study abroad consulting system',
    category: 'Education',
    categoryColor: 'bg-orange-950 text-orange-300 border-orange-800',
    description:
      'GlobalEdu — a reputable study-abroad consultancy helping students succeed in the US, Canada, Australia, UK, South Korea, Japan, and beyond.',
    tech: ['React', 'Vite', 'TailwindCSS', 'TypeScript'],
    image: 'https://images.unsplash.com/photo-1758270705087-76e81a5117bd?auto=format&fit=crop&q=80&w=1200',
    features: ['Study pathway consulting', 'Application tracking', 'Visa support', 'Scholarship search'],
    demoUrl: 'https://global-ed.netlify.app/',
  },
  {
    icon: ShoppingBag,
    title: 'Fashion Boutique',
    subtitle: 'Fashion e-commerce platform',
    category: 'E-commerce',
    categoryColor: 'bg-pink-950 text-pink-300 border-pink-800',
    description:
      'A complete online fashion store with customer-facing features and an admin dashboard for products, orders, and store management.',
    tech: ['React', 'Vite', 'TailwindCSS', 'Redux'],
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1200',
    features: ['Cart & checkout', 'Admin dashboard', 'Product management', 'Purchase history'],
    demoUrl: 'https://fashion-boutique-demo.netlify.app/',
  },
];

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const openProject = (index: number, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setSelectedProject(index);
  };

  const closeProject = useCallback(() => {
    setSelectedProject(null);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (selectedProject === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeProject();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedProject, closeProject]);

  const active = selectedProject !== null ? projects[selectedProject] : null;

  return (
    <section id="projects" className="py-32 relative z-10-1">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold font-heading mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Each project is a real testament to quality, dedication, and the ability to solve
            business problems through technology.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-full"
            >
              <button
                type="button"
                onClick={e => openProject(index, e.currentTarget)}
                aria-haspopup="dialog"
                className="group relative w-full h-full text-left overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] hover:border-accent/40 hover:bg-white/[0.05] transition-all duration-300 flex flex-col"
              >
                <div className="relative h-56 overflow-hidden flex-shrink-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-full ${project?.isContain ? 'object-contain' : 'object-cover'} transition-transform duration-700 group-hover:scale-105`}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-[#070b14]/50 to-transparent" />

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 bg-black/55 backdrop-blur-sm z-20">
                    <span className="flex items-center gap-2 bg-white text-slate-950 px-5 py-2.5 rounded-full text-sm font-semibold translate-y-4 group-hover:translate-y-0 group-focus-visible:translate-y-0 transition-transform duration-300">
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                      View Details
                    </span>
                  </div>

                  <span
                    className={`absolute top-4 left-4 z-10-1 text-[10px] font-semibold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full border ${project.categoryColor}`}
                  >
                    {project.category}
                  </span>
                </div>

                <div className="p-6 relative z-10-1 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm font-mono text-accent mb-4">{project.subtitle}</p>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-col items-center gap-5 text-center"
        >
          <p className="text-gray-400 text-sm max-w-xl">
            Looking for a similar system for your business?
          </p>
          <a href="#contact" className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-transform hover:scale-105">
            <span className="relative z-10-1 flex items-center gap-2">
              Request a quote
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </span>
            <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
        </motion.div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#070b14]/80 backdrop-blur-md"
            onClick={closeProject}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-dialog-title"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#0b1120] border border-white/10 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative h-56 sm:h-64 flex-shrink-0">
                <img
                  src={active.image}
                  alt={active.title}
                  className={`w-full h-full ${active.isContain ? 'object-contain' : 'object-cover'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-[#0b1120]/30 to-transparent" />
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeProject}
                  className="absolute top-4 right-4 p-2.5 bg-black/50 hover:bg-black text-white rounded-full backdrop-blur-md transition-colors"
                  aria-label="Close project details"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto">
                <div className="mb-6">
                  <h3 id="project-dialog-title" className="text-2xl font-bold text-white mb-2">
                    {active.title}
                  </h3>
                  <span className="text-accent font-mono text-sm">{active.subtitle}</span>
                </div>

                <p className="text-gray-300 leading-relaxed mb-8">{active.description}</p>

                <div className="mb-8">
                  <h4 className="text-white font-semibold mb-4 border-b border-white/10 pb-2">
                    Key Features
                  </h4>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {active.features.map(f => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-gray-300 text-sm bg-white/[0.03] px-3 py-2 rounded-lg border border-white/5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-8">
                  <h4 className="text-white font-semibold mb-4 border-b border-white/10 pb-2">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {active.tech.map(t => (
                      <span
                        key={t}
                        className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-gray-300 text-xs font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 text-sm text-accent/90 mb-8 flex items-start gap-3">
                  <Briefcase className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <strong className="block text-white mb-1">Client Confidentiality</strong>
                    Source code and production systems are protected under confidentiality agreements (NDA). Please contact us directly for detailed architecture discussions.
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    className="group relative w-full px-6 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-transform hover:scale-[1.01]"
                    onClick={closeProject}
                  >
                    <span className="relative z-10-1 flex items-center justify-center gap-2">
                      Close
                    </span>
                  </button>
                  {active.demoUrl && (
                    <a
                      href={active.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group relative w-full px-6 py-4 bg-accent text-slate-950 font-bold rounded-full overflow-hidden transition-transform hover:scale-[1.01] inline-flex items-center justify-center gap-2"
                    >
                      View Demo
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
