'use client';
import { Layout, LayoutDashboard, Building2, Check, Zap, Star, ArrowRight } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

const services = [
  {
    icon: Layout,
    title: 'Landing Page',
    subtitle: 'Brand Showcase Website',
    price: '$500 – $800',
    timeline: '7 – 14 days',
    description:
      'A professional website that helps businesses create a strong first impression, improve conversion rates, and attract more clients.',
    features: [
      'Responsive design for all devices',
      'Basic SEO optimization & fast loading speed',
      'Contact form & map integration',
      'Google Analytics support',
      '3-month maintenance',
    ],
    popular: false,
    gradient: 'from-white/[0.06] via-white/[0.03] to-transparent',
    iconColor: 'text-slate-300',
  },
  {
    icon: LayoutDashboard,
    title: 'Admin Dashboard',
    subtitle: 'Management System',
    price: '$1,000 – $2,000',
    timeline: '14 – 30 days',
    description:
      'Modern admin interface with complete CRUD functionality, flexible role-based access, and clear reporting dashboards.',
    features: [
      'Full data management (CRUD)',
      'Role-based access control',
      'Analytics charts & reports',
      'Excel / PDF / Print export',
      'Complete API documentation',
      '6-month maintenance',
    ],
    popular: true,
    gradient: 'from-accent/15 via-primary/10 to-transparent',
    iconColor: 'text-accent',
  },
  {
    icon: Building2,
    title: 'Management Web App',
    subtitle: 'Business Solution',
    price: '$2,000 – $4,000',
    timeline: '30 – 90 days',
    description:
      'A full business management system (inventory, assets, HR, operations) tailored to your company workflow and processes.',
    features: [
      'Complete business process coverage',
      'High-performance database design',
      'Advanced security (JWT, RBAC)',
      'Third-party API integration',
      'Training & user documentation',
      '12-month maintenance',
    ],
    popular: false,
    gradient: 'from-primary/10 via-secondary/10 to-transparent',
    iconColor: 'text-blue-300',
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' as const },
  }),
};

export default function Services() {
  return (
    <section id="services" className="py-32 relative z-10-1">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold font-heading mb-4">
            Service Packages <span className="text-gradient">Tailored for You</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Choose the right package — from a simple landing page to a complex enterprise management system.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {services.map((service, i) => (
            <motion.article
              key={service.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className={`relative flex flex-col h-full overflow-hidden rounded-3xl border transition-all duration-300 ${
                service.popular
                  ? 'border-accent/40 bg-white/[0.04] shadow-2xl shadow-accent/10 lg:-translate-y-2'
                  : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
              }`}
            >
              {service.popular && (
                <div className="absolute -top-4 inset-x-0 flex justify-center z-10-1">
                  <span className="flex items-center gap-1.5 bg-gradient-to-r from-accent to-primary text-slate-950 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]">
                    <Star className="w-3.5 h-3.5 fill-slate-950" aria-hidden="true" />
                    Popular
                  </span>
                </div>
              )}

              <div className={`p-8 border-b border-white/10 bg-gradient-to-br ${service.gradient}`}>
                <div className="flex justify-between items-start mb-6">
                  <span className="p-3 bg-slate-950/50 rounded-2xl border border-white/10 backdrop-blur-md">
                    <service.icon className={`w-6 h-6 ${service.iconColor}`} aria-hidden="true" />
                  </span>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{service.price}</div>
                    <div className="text-[10px] font-medium text-gray-300 mt-1 uppercase tracking-[0.2em]">
                      {service.timeline}
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-300 text-sm font-medium">{service.subtitle}</p>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <p className="text-gray-400 text-sm leading-relaxed mb-8">{service.description}</p>
                <ul className="space-y-4 mb-8">
                  {service.features.map(feature => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" strokeWidth={3} aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`mt-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-bold transition-all duration-300 ${
                    service.popular
                      ? 'bg-white text-slate-950 hover:bg-gray-200'
                      : 'border border-white/10 bg-white/5 text-white hover:bg-white/10'
                  }`}
                  aria-label={`Contact to start the ${service.title} package`}
                >
                  {service.popular ? 'Choose this package' : 'Get a consultation'}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 flex flex-col items-center gap-5 text-center"
        >
          <p className="text-gray-400 text-sm max-w-xl">
            Pricing may vary depending on the real complexity of the project. Is your project outside these three packages?
            I will assess it and provide a custom quote for free.
          </p>
          <a
            href="#contact"
            className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-transform hover:scale-105"
          >
            <span className="relative z-10-1 flex items-center gap-2">
              Get a quote
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </span>
            <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
