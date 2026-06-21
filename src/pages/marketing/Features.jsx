import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, AlertCircle, Wifi } from 'lucide-react';
import Button from '../../components/ui/Button';
import { 
  PropertyMockup, PaymentMockup, ReceiptMockup, LatePaymentMockup, KanbanMockup, ChartMockup 
} from '../../components/ui/Mockups';

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

/** Stats shown in the header */
const headerStats = [
  { value: '2,400+', label: 'Units managed' },
  { value: '₦180M+', label: 'Rent collected' },
  { value: '98%', label: 'On-time receipts' },
];

/** Feature sections - strict bullet pattern */
const featureSections = [
  {
    title: 'Property & Tenant Management',
    desc: 'Manage your entire portfolio from one central dashboard.',
    bullets: [
      'Multi-property portfolio view',
      'Track occupancy and unit details',
      'One-click tenant email invites',
      'Lease agreement storage',
    ],
    mockup: PropertyMockup,
    imageAlign: 'right',
  },
  {
    title: 'Online Rent Payment',
    desc: 'Stop tracking payments on WhatsApp. Let tenants pay securely online.',
    bullets: [
      'Accept Card, Transfer, and Paystack',
      'Real-time payment dashboard confirmation',
      'Zero manual reconciliation needed',
    ],
    mockup: PaymentMockup,
    imageAlign: 'left',
  },
  {
    title: 'Auto-Generated Receipts',
    desc: 'Automated, branded receipts eliminate disputes and save hours of admin work.',
    bullets: [
      'Instantly generated on every payment',
      'Downloadable PDF format for tenants',
      'Landlord branding and specific transaction refs',
    ],
    mockup: ReceiptMockup,
    imageAlign: 'right',
  },
  {
    title: 'Late Payment Tracking',
    desc: "Know who is overdue before it becomes a problem.",
    bullets: [
      'Automated 7, 3, and 1 day reminders',
      'Clear outstanding balance dashboards',
      'Late fee calculation automation',
    ],
    mockup: LatePaymentMockup,
    imageAlign: 'left',
  },
  {
    title: 'Maintenance Requests',
    desc: 'A central kanban board to track issues from received to resolved.',
    bullets: [
      'Tenants upload photos of issues',
      'Visual ticket progress tracking',
      'Internal notes and priority categorization',
    ],
    mockup: KanbanMockup,
    imageAlign: 'right',
  },
  {
    title: 'Financial Dashboard',
    desc: 'Revenue trends, occupancy rates and outstanding balances all in one place.',
    bullets: [
      'Monthly revenue trend charts',
      'Property-by-property breakdown',
      'Export-ready data for accountants',
    ],
    mockup: ChartMockup,
    imageAlign: 'left',
  },
];

/** Background alternation: 3 tones */
const sectionBgs = ['bg-white', 'bg-warm', 'bg-[#F0EDE7]'];

const Features = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* ─── Header ─── */}
      <section className="bg-charcoal pt-24 pb-16 lg:pt-32 lg:pb-24" aria-label="Features header">
        <div className="max-w-marketing mx-auto px-6">
          <div className="text-center mb-12">
            <motion.p
              className="text-xs font-semibold uppercase tracking-widest text-accent/90 mb-4"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            >
              Platform features
            </motion.p>
            <motion.h1
              className="font-display text-white mb-5"
              style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            >
              Everything you need to run a rental business.
            </motion.h1>
            <motion.p
              className="text-white/70 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            >
              Six core capabilities designed to automate rent collection, eliminate WhatsApp chaos, 
              and give you complete visibility over your properties.
            </motion.p>
          </div>

          {/* Stat row inside header */}
          <motion.div
            className="grid grid-cols-3 gap-6 max-w-lg mx-auto pt-8 border-t border-white/10"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          >
            {headerStats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-mono font-bold text-white text-xl lg:text-2xl">{s.value}</p>
                <p className="text-white/50 text-xs mt-1 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Feature sections ─── */}
      {featureSections.map((feature, i) => {
        const isLeft = feature.imageAlign === 'left';
        const bg = sectionBgs[i % sectionBgs.length];

        return (
          <section key={feature.title} className={`${bg} py-16 lg:py-24 overflow-hidden`} aria-label={feature.title}>
            <div className="max-w-marketing mx-auto px-6">
              <motion.div
                className={`grid items-center gap-12 lg:gap-20 ${isLeft ? 'lg:grid-cols-[1.1fr_0.9fr]' : 'lg:grid-cols-[0.9fr_1.1fr]'}`}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              >
                {/* Text side */}
                <motion.div className={isLeft ? 'lg:order-2' : ''} variants={fadeUp}>
                  <h2 className="font-display text-charcoal text-3xl md:text-4xl mb-4">{feature.title}</h2>
                  <p className="text-lg text-body mb-8 leading-relaxed">{feature.desc}</p>
                  <ul className="space-y-4">
                    {feature.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-base text-charcoal font-medium">
                        <CheckCircle size={20} className="text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Mockup side */}
                <motion.div className={isLeft ? 'lg:order-1' : ''} variants={{ hidden: { opacity: 0, x: isLeft ? -24 : 24 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } }}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full scale-110" aria-hidden="true" />
                    <feature.mockup />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>
        );
      })}

      {/* ─── Comparison: RentFlow vs WhatsApp/Spreadsheets ─── */}
      <section className="section-py bg-charcoal" aria-label="Comparison">
        <div className="max-w-marketing mx-auto px-6">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent/80 mb-3">Why switch</p>
            <h2 className="font-display text-white text-3xl md:text-4xl">RentFlow vs the old way.</h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          >
            {/* Old way */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-full bg-error/20 flex items-center justify-center">
                  <AlertCircle size={16} className="text-error" aria-hidden="true" />
                </span>
                <p className="font-semibold text-white/70 text-lg">WhatsApp + Spreadsheets</p>
              </div>
              <ul className="space-y-4">
                {[
                  'Chase tenants one by one every month',
                  'No receipts — disputes happen constantly',
                  'Zero visibility across properties',
                  'Manual calculations, errors everywhere',
                  'No paper trail for tax or legal matters',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base text-white/50">
                    <span className="w-5 h-5 rounded-full bg-error/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-error text-xs font-bold">✕</span>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* RentFlow */}
            <div className="bg-primary/20 border border-primary/30 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                  <Wifi size={16} className="text-success" aria-hidden="true" />
                </span>
                <p className="font-semibold text-white text-lg">RentFlow</p>
              </div>
              <ul className="space-y-4">
                {[
                  'Automated reminders — no chasing needed',
                  'Instant PDF receipts on every payment',
                  'All properties visible in one dashboard',
                  'Automated calculations, zero errors',
                  'Complete audit trail, export-ready',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base text-white/90 font-medium">
                    <CheckCircle size={20} className="text-success flex-shrink-0 mt-0.5" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-gradient-warm py-24" aria-label="Call to action">
        <div className="max-w-marketing mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="font-display text-white mb-6" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
              Ready to automate your properties?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              14 days free. No credit card. Cancel anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="accent" rightIcon={<ArrowRight size={18} />} onClick={() => navigate('/signup')}>
                Start your 14-day free trial
              </Button>
              <Button size="lg" className="border-white/30 text-white bg-white/10 hover:bg-white/20" onClick={() => navigate('/pricing')}>
                See pricing
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Features;
