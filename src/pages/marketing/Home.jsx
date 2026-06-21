import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, CreditCard, FileText, Clock, Building2, UserPlus, Shield, CheckCircle
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { 
  HeroMockup, PropertyMockup, PaymentMockup, ReceiptMockup, KanbanMockup
} from '../../components/ui/Mockups';

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/** Trust badges (moved directly under CTA) */
const trustBadges = [
  { value: '2,400+', label: 'Units managed' },
  { value: '₦180M+', label: 'Revenue processed' },
  { value: '99.9%', label: 'Uptime guarantee' },
  { value: '98%', label: 'On-time payments' },
];

/** Feature highlight sections - strict bullet pattern */
const featureSections = [
  {
    title: 'Property & Tenant Management',
    desc: 'Manage your entire portfolio from one central dashboard.',
    bullets: [
      'Multi-property portfolio view',
      'Track occupancy and unit details',
      'One-click tenant email invites',
    ],
    mockup: PropertyMockup,
    imageAlign: 'right',
  },
  {
    title: 'Online Rent Collection',
    desc: 'Stop tracking payments on WhatsApp. Let tenants pay securely online.',
    bullets: [
      'Accept Card, Transfer, and Paystack',
      'Automated rent due reminders',
      'Real-time payment dashboard',
    ],
    mockup: PaymentMockup,
    imageAlign: 'left',
  },
  {
    title: 'Instant PDF Receipts',
    desc: 'Automated, branded receipts eliminate disputes and save hours of admin work.',
    bullets: [
      'Instantly generated on every payment',
      'Downloadable PDF for tenants',
      'Full transaction audit trail',
    ],
    mockup: ReceiptMockup,
    imageAlign: 'right',
  },
  {
    title: 'Maintenance Tracking',
    desc: 'A central kanban board to track issues from received to resolved.',
    bullets: [
      'Tenants upload photos of issues',
      'Visual ticket progress tracking',
      'Priority levels (Urgent, Medium)',
    ],
    mockup: KanbanMockup,
    imageAlign: 'left',
  },
];

/** Testimonials */
const testimonials = [
  {
    name: 'Chukwuma Obi',
    role: 'Property Manager',
    quote: 'Before RentFlow, I was chasing 12 tenants on WhatsApp every month. Now I check one dashboard, and the money comes in.',
    highlight: 'Reduced late payments by 40%',
  },
  {
    name: 'Adaeze Nwofor',
    role: 'Tenant',
    quote: 'I pay rent, download my receipt, and I have proof whenever I need it. The process is completely seamless and secure.',
    highlight: 'Loves instant receipts',
  },
  {
    name: 'Ibrahim Suleiman',
    role: 'Landlord',
    quote: 'I manage properties from three cities. RentFlow gives me visibility I never had before. It is an absolute game-changer.',
    highlight: 'Saves 15 hours a week',
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-charcoal pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden" aria-label="Hero">
        <div className="max-w-marketing mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full mb-6 border border-white/15">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
              The operating system for African real estate
            </motion.div>

            <motion.h1
              variants={fadeUp} initial="hidden" animate="visible" custom={1}
              className="font-display text-white text-balance mb-6"
              style={{ fontSize: 'clamp(44px, 6vw, 72px)', letterSpacing: '-0.02em', lineHeight: 1.05 }}
            >
              Rent management, <span className="text-accent">automated.</span>
            </motion.h1>

            <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2} className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Replace the notebook-and-WhatsApp chaos with one powerful platform. 
              Collect rent online, issue instant receipts, and manage maintenance without the headaches.
            </motion.p>

            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3} className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
              <Button size="lg" variant="accent" rightIcon={<ArrowRight size={18} />} onClick={() => navigate('/signup?role=landlord')}>
                Start your free trial
              </Button>
              <Button size="lg" variant="secondary" className="border-white/30 text-white hover:bg-white/10" onClick={() => navigate('/pricing')}>
                View pricing
              </Button>
            </motion.div>

            {/* Trust Badges directly under CTA */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4} className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-white/10">
              {trustBadges.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-mono text-xl md:text-2xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-xs text-white/50 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dominant Hero Screenshot */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-5xl mx-auto"
          >
            <div className="absolute inset-0 bg-accent/20 blur-[100px] -z-10 rounded-full" aria-hidden="true" />
            <HeroMockup />
          </motion.div>
        </div>
      </section>

      {/* ─── Integration Partners Strip ─── */}
      <section className="bg-warm border-b border-border py-8" aria-label="Integration Partners">
        <div className="max-w-marketing mx-auto px-6 flex flex-col items-center">
          <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-6">Seamless Integrations</p>
          <div className="flex flex-wrap justify-center gap-10 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
            {/* Mock partner logos */}
            <div className="text-xl font-bold font-display text-charcoal flex items-center gap-2">
              <div className="w-6 h-6 bg-[#09A5DB] rounded" /> Paystack
            </div>
            <div className="text-xl font-bold font-display text-charcoal flex items-center gap-2">
              <div className="w-6 h-6 bg-[#FB9129] rounded-full" /> Flutterwave
            </div>
            <div className="text-xl font-bold font-display text-charcoal flex items-center gap-2">
              <div className="w-6 h-6 bg-charcoal rounded" /> Stripe
            </div>
          </div>
        </div>
      </section>

      {/* ─── Problem -> Solution (Kept as requested) ─── */}
      <section className="section-py bg-white" aria-label="Problem and solution">
        <div className="max-w-marketing mx-auto px-6">
          <motion.div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">The problem</p>
              <h2 className="font-display text-charcoal mb-5">Chasing rent on WhatsApp is not a business.</h2>
              <p className="text-body text-body mb-6 leading-relaxed">
                Most landlords manage their properties with notebooks, bank alerts and
                endless WhatsApp messages. Tenants pay into personal accounts with no receipts.
                Disputes happen. Money gets lost. It doesn't have to be this way.
              </p>
              <div className="space-y-3">
                {['No payment records', 'No receipts for tenants', 'No visibility across properties'].map((pain) => (
                  <div key={pain} className="flex items-center gap-2 text-sm text-body">
                    <span className="w-5 h-5 rounded-full bg-error/10 flex items-center justify-center flex-shrink-0"><span className="text-error text-xs font-bold">✕</span></span>
                    {pain}
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} custom={1}>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">The solution</p>
              <h2 className="font-display text-charcoal mb-5">One dashboard. Every property, every payment.</h2>
              <p className="text-body text-body mb-6 leading-relaxed">
                RentFlow replaces the chaos with a clean, branded digital experience. Landlords
                see everything. Tenants pay easily and get proof instantly.
              </p>
              <div className="space-y-3">
                {['Automated payment records', 'Instant receipts on every payment', 'Multi-property dashboard'].map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2 text-sm text-body">
                    <CheckCircle size={18} className="text-success flex-shrink-0" aria-hidden="true" />
                    {benefit}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Feature Sections (Alternating) ─── */}
      <div className="bg-warm py-8">
        {featureSections.map((feature, i) => (
          <section key={feature.title} className="py-16 md:py-24 overflow-hidden" aria-label={feature.title}>
            <div className="max-w-marketing mx-auto px-6">
              <motion.div 
                className={`grid items-center gap-12 lg:gap-20 ${feature.imageAlign === 'left' ? 'lg:grid-cols-[1.1fr_0.9fr]' : 'lg:grid-cols-[0.9fr_1.1fr]'}`}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              >
                {/* Text Side */}
                <motion.div variants={fadeUp} className={feature.imageAlign === 'left' ? 'lg:order-2' : ''}>
                  <h2 className="font-display text-charcoal text-3xl md:text-4xl mb-4">{feature.title}</h2>
                  <p className="text-lg text-body mb-8">{feature.desc}</p>
                  <ul className="space-y-4 mb-8">
                    {feature.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-base text-charcoal font-medium">
                        <CheckCircle size={20} className="text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link to="/features" className="inline-flex items-center gap-1.5 font-semibold text-primary hover:text-primary/80 transition-colors">
                    Learn more <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </motion.div>

                {/* Mockup Side */}
                <motion.div variants={fadeUp} className={feature.imageAlign === 'left' ? 'lg:order-1' : ''}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full scale-110" aria-hidden="true" />
                    <feature.mockup />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>
        ))}
      </div>

      {/* ─── Persona Cards (Dual Path) ─── */}
      <section className="section-py bg-white" aria-label="Built for Landlords, Loved by Tenants">
        <div className="max-w-marketing mx-auto px-6">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="font-display text-charcoal text-3xl md:text-4xl mb-4">Built for Landlords. Loved by Tenants.</h2>
            <p className="text-body text-lg max-w-xl mx-auto">A seamless experience for both sides of the rental equation.</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <Card hoverable className="h-full flex flex-col items-start border-border shadow-md">
                <div className="w-14 h-14 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-6">
                  <Building2 size={28} />
                </div>
                <h3 className="text-2xl font-display font-semibold text-charcoal mb-2">Property Managers</h3>
                <p className="text-body mb-8 leading-relaxed flex-1">
                  Automate rent collection, track maintenance, and manage your entire portfolio from a single dashboard. 
                  Say goodbye to late payments.
                </p>
                <Link to="/for-landlords" className="inline-flex items-center gap-2 font-semibold text-accent hover:underline">
                  See Landlord Features <ArrowRight size={16} />
                </Link>
              </Card>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <Card hoverable className="h-full flex flex-col items-start border-border shadow-md">
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                  <UserPlus size={28} />
                </div>
                <h3 className="text-2xl font-display font-semibold text-charcoal mb-2">Tenants</h3>
                <p className="text-body mb-8 leading-relaxed flex-1">
                  Pay rent securely using your preferred payment method, download official PDF receipts instantly, 
                  and easily report maintenance issues online.
                </p>
                <Link to="/for-tenants" className="inline-flex items-center gap-2 font-semibold text-primary hover:underline">
                  See Tenant Features <ArrowRight size={16} />
                </Link>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Testimonials (No Lifestyle Photos) ─── */}
      <section className="section-py bg-charcoal" aria-label="Testimonials">
        <div className="max-w-marketing mx-auto px-6">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Proven Results</p>
            <h2 className="font-display text-white text-3xl md:text-4xl">Trusted by the best.</h2>
          </motion.div>

          <motion.div className="grid md:grid-cols-3 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {testimonials.map((t, i) => (
              <motion.div key={t.name} variants={fadeUp} custom={i}>
                <div className="bg-white/5 border border-white/10 rounded-xl p-8 h-full flex flex-col">
                  <div className="mb-6">
                    {/* Star rating equivalent to reference pattern */}
                    <div className="flex gap-1 mb-3 text-warning">
                      {[...Array(5)].map((_, j) => <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                    </div>
                    <span className="inline-block px-3 py-1 bg-white/10 text-white/90 text-xs font-semibold rounded-full border border-white/10">
                      {t.highlight}
                    </span>
                  </div>
                  <p className="text-white/80 text-base leading-relaxed flex-1 mb-6">"{t.quote}"</p>
                  <div>
                    <p className="font-semibold text-white">{t.name}</p>
                    <p className="text-sm text-white/50">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="bg-gradient-warm py-24" aria-label="Call to action">
        <div className="max-w-marketing mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="font-display text-white mb-6" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
              Ready to automate your properties?
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
              Join hundreds of property managers who have eliminated late payments and automated their rent collection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="accent" rightIcon={<ArrowRight size={18} />} onClick={() => navigate('/signup?role=landlord')}>
                Start your 14-day free trial
              </Button>
              <Button size="lg" className="border-white/30 text-white bg-white/10 hover:bg-white/20" onClick={() => navigate('/contact')}>
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
