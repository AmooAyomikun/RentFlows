import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Building2, CreditCard, FileText, Clock, Wrench, BarChart3,
  CheckCircle, ArrowRight, TrendingUp, AlertCircle, Wifi,
  ShieldCheck, Zap, Smartphone, MessageSquare, BarChart,
  Banknote, Landmark, Receipt
} from 'lucide-react';
import portfolioImg from '../../assets/portfolio_architecture_1782337365729.png';
import residentImg from '../../assets/resident_experience_1782337375877.png';
import reportingImg from '../../assets/reporting_dashboard_1782337386277.png';
import Button from '../../components/ui/Button';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

/** Stats shown in the header */
const headerStats = [
  { value: '2,400+', label: 'Units managed' },
  { value: '₦180M+', label: 'Rent collected' },
  { value: '98%', label: 'On-time receipts' },
];

const features = [
  {
    icon: Building2,
    title: 'Property & Tenant Management',
    description: 'Manage your entire portfolio from one screen. Add properties, create units, and invite tenants with a personalised email link.',
    bullets: ['Multi-property dashboard', 'Unit-level occupancy tracking', 'Tenant invite system', 'Lease storage & access'],
    image: 'right',
    iconColor: 'text-primary',
    accentColor: 'bg-primary/10',
    heroFeature: true,
  },
  {
    icon: CreditCard,
    title: 'Online Rent Payment',
    description: 'Tenants pay rent in three taps using card, bank transfer or Paystack. No more bank-transfer screenshots on WhatsApp.',
    bullets: ['Multiple payment methods', 'Real-time payment confirmation', 'Automated due-date reminders', 'Late fee calculation'],
    image: 'left',
    iconColor: 'text-accent',
    accentColor: 'bg-accent/10',
    heroFeature: false,
  },
  {
    icon: FileText,
    title: 'Auto-Generated Receipts',
    description: 'Every payment triggers an official, branded PDF receipt before the tenant has put their phone away.',
    bullets: ['Instant receipt delivery', 'Downloadable PDF format', 'Transaction reference numbers', 'Landlord branding on receipts'],
    image: 'right',
    iconColor: 'text-success',
    accentColor: 'bg-success/10',
    heroFeature: false,
  },
  {
    icon: Clock,
    title: 'Late Payment Tracking',
    description: "Know who's overdue before it becomes a problem. Automated reminders go out 7, 3 and 1 day before rent is due.",
    bullets: ['7/3/1 day automated reminders', 'Overdue dashboard alerts', 'Late fee automation', 'Payment history per tenant'],
    image: 'left',
    iconColor: 'text-warning',
    accentColor: 'bg-warning/10',
    heroFeature: true,
  },
  {
    icon: Wrench,
    title: 'Maintenance Requests',
    description: 'Tenants log issues with photos directly in the app. Landlords track progress from received to resolved on a visual board.',
    bullets: ['Photo upload support', 'Priority categorisation', 'Status timeline for tenants', 'Kanban board for landlords'],
    image: 'right',
    iconColor: 'text-info',
    accentColor: 'bg-info/10',
    heroFeature: false,
  },
  {
    icon: BarChart3,
    title: 'Financial Dashboard',
    description: 'Revenue trends, occupancy rates and outstanding balances — all in one place, ready to export for tax season.',
    bullets: ['Monthly revenue chart', 'Property-by-property breakdown', 'CSV export for accountants', 'Outstanding balance summary'],
    image: 'left',
    iconColor: 'text-primary',
    accentColor: 'bg-primary/10',
    heroFeature: false,
  },
];

/** Background alternation: 3 tones */
const sectionBgs = ['bg-white', 'bg-warm', 'bg-[#F0EDE7]'];

const Features = () => (
  <>
    {/* ─── Header ─── */}
    <section className="bg-charcoal py-24 md:py-28 relative overflow-hidden" aria-label="Features header">
      <div className="absolute top-[-20%] right-[-5%] w-[500px] h-[500px] bg-[#0B4F45]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-5%] w-[400px] h-[400px] bg-[#C75B30]/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="max-w-marketing mx-auto px-6 w-full relative z-10">
        <div className="text-center mb-12">
          <motion.p
            className="text-xs font-semibold uppercase tracking-widest text-accent/90 mb-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Platform features
          </motion.p>
          <motion.h1
            className="font-display text-white mb-5"
            style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Everything you need to run a rental business.
          </motion.h1>
          <motion.p
            className="text-white/60 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Six core capabilities designed around the real experience of Nigerian landlords and tenants.
          </motion.p>
        </div>

        {/* Stat row inside header */}
        <motion.div
          className="grid grid-cols-3 gap-6 max-w-lg mx-auto pt-8 border-t border-white/10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {headerStats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-mono font-bold text-white text-xl lg:text-2xl">{s.value}</p>
              <p className="text-white/50 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* ─── NEW: Platform Overview ─── */}
    <PlatformOverview />

    {/* ─── Feature sections ─── */}
    {features.map((feature, i) => {
      const isLeft = feature.image === 'left';
      const bg = sectionBgs[i % sectionBgs.length];
      const isHero = feature.heroFeature;

      return (
        <section
          key={feature.title}
          className={`${bg} ${isHero ? 'py-16' : 'py-12'}`}
          aria-label={feature.title}
        >
          <div className="max-w-marketing mx-auto px-6">
            <motion.div
              className={`grid items-center gap-12 lg:gap-16 ${
                isHero
                  ? isLeft
                    ? 'lg:grid-cols-[5fr_7fr]'
                    : 'lg:grid-cols-[7fr_5fr]'
                  : 'lg:grid-cols-2'
              }`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
            >
              {/* Text side */}
              <motion.div
                className={isLeft ? 'lg:order-2' : ''}
                variants={fadeUp}
              >
                <div className={`${feature.accentColor} w-12 h-12 rounded-xl flex items-center justify-center mb-5`}>
                  <feature.icon size={24} className={feature.iconColor} aria-hidden="true" />
                </div>
                <h2 className={`font-display text-charcoal mb-4 ${isHero ? 'text-[clamp(28px,3.5vw,44px)]' : ''}`}>
                  {feature.title}
                </h2>
                <p className="text-body text-body mb-6 leading-relaxed">{feature.description}</p>
                <ul className="space-y-2.5">
                  {feature.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-body">
                      <CheckCircle size={16} className="text-success mt-0.5 flex-shrink-0" aria-hidden="true" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Visual/mockup side */}
              <motion.div
                className={isLeft ? 'lg:order-1' : ''}
                variants={{ hidden: { opacity: 0, x: isLeft ? -24 : 24 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } }}
              >
                <FeatureMockup index={i} feature={feature} />
              </motion.div>
            </motion.div>
          </div>
        </section>
      );
    })}

    {/* ─── NEW: Master Your Portfolio Architecture ─── */}
    <PortfolioArchitecture />

    {/* ─── NEW: Autonomous Financial Reconciliation ─── */}
    <FinancialReconciliation />

    {/* ─── NEW: Effortless Resident Experience ─── */}
    <ResidentExperience />

    {/* ─── NEW: Precision Reporting & Intelligence ─── */}
    <PrecisionReporting />

    {/* ─── NEW: Integrations Stack ─── */}
    <IntegrationsStack />

    {/* ─── Comparison: RentFlow vs WhatsApp/Spreadsheets ─── */}
    <section className="section-py bg-charcoal" aria-label="Comparison">
      <div className="max-w-marketing mx-auto px-6">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-accent/80 mb-3">Why switch</p>
          <h2 className="font-display text-white">RentFlow vs the old way.</h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Old way */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-7 h-7 rounded-full bg-error/20 flex items-center justify-center">
                <AlertCircle size={14} className="text-error" aria-hidden="true" />
              </span>
              <p className="font-semibold text-white/70">WhatsApp + Spreadsheets</p>
            </div>
            <ul className="space-y-3">
              {[
                'Chase tenants one by one every month',
                'No receipts — disputes happen constantly',
                'Zero visibility across properties',
                'Manual calculations, errors everywhere',
                'No paper trail for tax or legal matters',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-white/50">
                  <span className="w-4 h-4 rounded-full bg-error/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-error text-[10px] font-bold">✕</span>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* RentFlow */}
          <div className="bg-primary/20 border border-primary/30 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-7 h-7 rounded-full bg-success/20 flex items-center justify-center">
                <Wifi size={14} className="text-success" aria-hidden="true" />
              </span>
              <p className="font-semibold text-white">RentFlow</p>
            </div>
            <ul className="space-y-3">
              {[
                'Automated reminders — no chasing needed',
                'Instant PDF receipts on every payment',
                'All properties visible in one dashboard',
                'Automated calculations, zero errors',
                'Complete audit trail, export-ready',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-white/90">
                  <CheckCircle size={16} className="text-success flex-shrink-0 mt-0.5" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>

    {/* ─── CTA ─── */}
    <section className="bg-gradient-warm py-16" aria-label="Call to action">
      <div className="max-w-marketing mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-white mb-6" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            Ready to try it for yourself?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
            14 days free. No credit card. Cancel anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" variant="accent" rightIcon={<ArrowRight size={18} />} onClick={() => window.location.href = '/signup'}>
              Start your free trial
            </Button>
            <Button size="lg" className="border-white/30 text-white bg-white/10 hover:bg-white/20">
              <Link to="/pricing">See pricing</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  </>
);

// ─── NEW DESIGN COMPONENTS ────────────────────────────────────────────────────

const PlatformOverview = () => (
  <section className="bg-white py-16 border-b border-border" aria-label="Platform Overview">
    <div className="max-w-marketing mx-auto px-6 text-center">
      <motion.p className="text-xs font-semibold uppercase tracking-widest text-primary/80 mb-4" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        A Global Standard Operating Engine
      </motion.p>
      <motion.h2 className="font-display text-charcoal mb-6" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)' }} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        Powering Every Dimension of <br className="hidden md:block" />
        <span className="text-primary">Property Management</span>
      </motion.h2>
      <motion.p className="text-body text-lg max-w-2xl mx-auto mb-10" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
        Scale from a single unit to a global, multi-asset portfolio with RentFlow's high performance operational engine. Unrivaled financial, maintenance, and relationships in one unified ecosystem.
      </motion.p>
      <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
        <Button size="lg" className="bg-charcoal text-white hover:bg-charcoal/90">Request Demo</Button>
        <Button size="lg" variant="outline" className="border-border text-charcoal bg-white">Watch Overview</Button>
      </motion.div>
    </div>
  </section>
);

const PortfolioArchitecture = () => (
  <section className="bg-[#FAF7F2] py-16 section-py" aria-label="Master Your Portfolio Architecture">
    <div className="max-w-marketing mx-auto px-6">
      <motion.div className="grid lg:grid-cols-2 gap-16 items-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}>
        <motion.div variants={fadeUp}>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary/80 mb-3">Core Operating Infrastructure</p>
          <h2 className="font-display text-charcoal text-4xl mb-6">Master Your Portfolio Architecture</h2>
          <p className="text-body text-lg mb-10">Centralise every touchpoint of asset management. From digital lease execution to intelligent unit allocation, RentFlow automates the friction out of daily operations.</p>
          
          <div className="space-y-8">
             <div className="flex gap-4">
               <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                 <Building2 size={20} className="text-primary" />
               </div>
               <div>
                 <h4 className="font-bold text-charcoal mb-1">Unified Portfolio Tracking</h4>
                 <p className="text-sm text-body">Cross-asset visibility with real-time occupancy reporting and performance metrics across multiple portfolios.</p>
               </div>
             </div>
             <div className="flex gap-4">
               <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center shrink-0">
                 <FileText size={20} className="text-success" />
               </div>
               <div>
                 <h4 className="font-bold text-charcoal mb-1">End-to-End Digital Leases</h4>
                 <p className="text-sm text-body">Automated lease generation and e-signatures. Templates that enforce standard policies for every new unit.</p>
               </div>
             </div>
             <div className="flex gap-4">
               <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center shrink-0">
                 <Wrench size={20} className="text-info" />
               </div>
               <div>
                 <h4 className="font-bold text-charcoal mb-1">Unit & Repairs Management</h4>
                 <p className="text-sm text-body">Track every unit's history from resolution to turnover. Predictive analytics identify unit decay trends before they happen.</p>
               </div>
             </div>
          </div>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, x: 24 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } }}>
           <img src={portfolioImg} alt="Portfolio Architecture" className="w-full rounded-[2rem] shadow-2xl object-cover border-4 border-white" />
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const FinancialReconciliation = () => (
  <section className="bg-[#08211B] py-16 text-white relative overflow-hidden" aria-label="Autonomous Financial Reconciliation">
    <div className="max-w-marketing mx-auto px-6 relative z-10">
      <div className="text-center mb-12">
        <motion.h2 className="font-display text-3xl md:text-4xl mb-4" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Autonomous Financial Reconciliation</motion.h2>
        <motion.p className="text-white/70 text-sm md:text-base max-w-2xl mx-auto" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          Stop chasing rent. Our bank-grade financial engine automates collection, reconciliation, and reporting with 99.9% accuracy.
        </motion.p>
      </div>

      <motion.div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
        {/* Card 1 */}
        <motion.div className="bg-[#135043] rounded-2xl p-6 flex flex-col" variants={fadeUp}>
           <div className="w-10 h-10 flex items-center mb-4">
              <Banknote size={24} className="text-white/80" />
           </div>
           <h3 className="text-base font-bold mb-2">Instant Rent Collection</h3>
           <p className="text-white/60 text-xs mb-8 flex-1 leading-relaxed">ACH, credit, and digital wallet support with automated late fee triggers and payment reminders.</p>
           {/* Mini UI element */}
           <div className="mt-auto">
              <div className="flex justify-between items-center text-[10px] mb-1.5 font-semibold text-white/80">
                <span>Collection Rate</span>
                <span>98.4%</span>
              </div>
              <div className="w-full h-1 bg-black/20 rounded-full overflow-hidden"><div className="w-[98.4%] h-full bg-[#E5F5E3] rounded-full"></div></div>
           </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div className="bg-[#135043] rounded-2xl p-6 flex flex-col" variants={fadeUp}>
           <div className="w-10 h-10 flex items-center mb-4">
              <Landmark size={24} className="text-white/80" />
           </div>
           <h3 className="text-base font-bold mb-2">Bank-Grade Reconciliation</h3>
           <p className="text-white/60 text-xs mb-8 flex-1 leading-relaxed">Direct bank feeds with intelligent ledger matching. Auto-reconcile thousands of transactions in seconds.</p>
           {/* Mini UI element */}
           <div className="mt-auto space-y-2 text-[10px]">
             <div className="flex justify-between items-center border-b border-black/10 pb-1.5">
                <span className="text-white/60">Batch : TDL_582</span>
                <span className="text-[#36D399] font-bold tracking-wider">MATCHED</span>
             </div>
             <div className="flex justify-between items-center border-b border-black/10 pb-1.5">
                <span className="text-white/60">Batch : TDL_583</span>
                <span className="text-[#36D399] font-bold tracking-wider">MATCHED</span>
             </div>
             <div className="flex justify-between items-center">
                <span className="text-white/60">Batch : TDL_584</span>
                <span className="text-[#FBBD23] font-bold tracking-wider">PENDING</span>
             </div>
           </div>
        </motion.div>

        {/* Card 3 */}
        <motion.div className="bg-[#135043] rounded-2xl p-6 flex flex-col" variants={fadeUp}>
           <div className="w-10 h-10 flex items-center mb-4">
              <Receipt size={24} className="text-white/80" />
           </div>
           <h3 className="text-base font-bold mb-2">Automated Payouts</h3>
           <p className="text-white/60 text-xs mb-8 flex-1 leading-relaxed">Programmatic owner distributions and vendor payments. Set your rules and let the platform handle the wires.</p>
           {/* Mini UI element */}
           <div className="mt-auto flex gap-1.5">
              <div className="w-6 h-6 rounded-full bg-white/30"></div>
              <div className="w-6 h-6 rounded-full bg-white/30"></div>
              <div className="w-6 h-6 rounded-full bg-white/30"></div>
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[8px] font-bold text-white/80">+12</div>
           </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const ResidentExperience = () => (
  <section className="bg-warm py-16" aria-label="Effortless Resident Experience as a Standard">
    <div className="max-w-marketing mx-auto px-6">
      <motion.div className="grid lg:grid-cols-2 gap-16 items-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}>
        <motion.div className="order-2 lg:order-1 flex justify-center" variants={{ hidden: { opacity: 0, x: -24 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } }}>
           <img src={residentImg} alt="Resident Experience App" className="w-full max-w-[320px] rounded-[2.5rem] shadow-2xl object-cover border-[6px] border-charcoal" />
        </motion.div>

        <motion.div className="order-1 lg:order-2" variants={fadeUp}>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary/80 mb-3">Community Management</p>
          <h2 className="font-display text-charcoal text-4xl mb-6">Effortless Resident Experience as a Standard</h2>
          
          <div className="space-y-8 mt-10">
             <div className="flex gap-4">
               <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                 <Smartphone size={20} className="text-primary" />
               </div>
               <div>
                 <h4 className="font-bold text-charcoal mb-1">Integrated Tenant Portal</h4>
                 <p className="text-sm text-body">A custom branded mobile experience for rent payments, lease documents, and communication history.</p>
               </div>
             </div>
             <div className="flex gap-4">
               <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center shrink-0">
                 <Wrench size={20} className="text-info" />
               </div>
               <div>
                 <h4 className="font-bold text-charcoal mb-1">Intelligent Maintenance</h4>
                 <p className="text-sm text-body">Resident-reported issues instantly ping your preferred vendor pool with priority status tagging for fast resolution.</p>
               </div>
             </div>
             <div className="flex gap-4">
               <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center shrink-0">
                 <MessageSquare size={20} className="text-success" />
               </div>
               <div>
                 <h4 className="font-bold text-charcoal mb-1">Centralized Communication</h4>
                 <p className="text-sm text-body">Announcements, lease expiries, and direct messaging in a single inbox beyond email and WhatsApp.</p>
               </div>
             </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const PrecisionReporting = () => (
  <section className="bg-[#FAF7F2] py-16" aria-label="Precision Reporting & Intelligence">
    <div className="max-w-marketing mx-auto px-6">
      <div className="mb-12">
        <motion.h2 className="font-display text-charcoal text-4xl mb-4" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Precision Reporting & Intelligence</motion.h2>
        <motion.p className="text-body text-lg max-w-2xl" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          Don't just collect data—command it. Our analytics engine translates raw property metrics into actionable investment strategies.
        </motion.p>
      </div>

      <motion.div className="grid md:grid-cols-[2fr_1fr] gap-6 mb-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
        <motion.div className="bg-charcoal rounded-2xl p-6 md:p-8 flex flex-col justify-between overflow-hidden" variants={fadeUp}>
           <div className="mb-6 relative z-10">
             <h3 className="text-white font-bold text-xl mb-1">Portfolio ROI Tracking</h3>
             <p className="text-white/50 text-sm">Revenue vs Expenses (Year-to-Date)</p>
           </div>
           {/* Image Mockup */}
           <div className="rounded-xl overflow-hidden mt-4 relative w-full h-48 md:h-64 border border-white/10">
              <img src={reportingImg} alt="Reporting Dashboard" className="absolute inset-0 w-full h-full object-cover object-top" />
           </div>
        </motion.div>

        <motion.div className="bg-[#1C3E3A] rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center" variants={fadeUp}>
           <h3 className="text-white/80 font-semibold mb-6">Avg. On-Time Payments</h3>
           <div className="text-6xl font-display text-white mb-4">98%</div>
           <div className="flex gap-1 justify-center">
             <div className="w-1.5 h-8 bg-warning rounded-full"></div>
             <div className="w-1.5 h-12 bg-warning rounded-full"></div>
             <div className="w-1.5 h-6 bg-warning/40 rounded-full"></div>
             <div className="w-1.5 h-10 bg-warning rounded-full"></div>
             <div className="w-1.5 h-4 bg-warning/40 rounded-full"></div>
           </div>
        </motion.div>
      </motion.div>

      <motion.div className="grid md:grid-cols-[1fr_2fr] gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
        <motion.div className="bg-white rounded-2xl p-6 border border-border" variants={fadeUp}>
           <h3 className="text-charcoal font-bold mb-6">Regional Distribution</h3>
           <div className="space-y-4">
             <div>
               <div className="flex justify-between text-xs mb-1.5 font-medium"><span className="text-charcoal">Lagos Island</span><span className="text-charcoal">45%</span></div>
               <div className="w-full h-1.5 bg-border rounded-full overflow-hidden"><div className="w-[45%] h-full bg-charcoal rounded-full"></div></div>
             </div>
             <div>
               <div className="flex justify-between text-xs mb-1.5 font-medium"><span className="text-charcoal">Abuja (FCT)</span><span className="text-charcoal">30%</span></div>
               <div className="w-full h-1.5 bg-border rounded-full overflow-hidden"><div className="w-[30%] h-full bg-primary rounded-full"></div></div>
             </div>
             <div>
               <div className="flex justify-between text-xs mb-1.5 font-medium"><span className="text-charcoal">Port Harcourt</span><span className="text-charcoal">25%</span></div>
               <div className="w-full h-1.5 bg-border rounded-full overflow-hidden"><div className="w-[25%] h-full bg-error rounded-full"></div></div>
             </div>
           </div>
        </motion.div>

        <motion.div className="bg-white rounded-2xl p-6 border border-border flex items-center justify-between" variants={fadeUp}>
           <div>
             <h3 className="text-charcoal font-bold mb-2">Automated Compliance</h3>
             <p className="text-body text-sm max-w-md">Real-time monitoring of local tax shifts, insurance renewals, and safety certifications across all assets.</p>
           </div>
           <div className="hidden sm:flex gap-4 shrink-0">
             <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-success"><CheckCircle size={20} /></div>
             <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-info"><FileText size={20} /></div>
           </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const IntegrationsStack = () => (
  <section className="bg-white py-12 border-y border-border overflow-hidden" aria-label="Integrations">
    <div className="max-w-marketing mx-auto px-6 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-8">Connects to your existing stack</p>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
         <span className="font-display font-bold text-xl text-charcoal">QuickBooks</span>
         <span className="font-display font-bold text-xl text-charcoal">Stripe</span>
         <span className="font-display font-bold text-xl text-charcoal">Salesforce</span>
         <span className="font-display font-bold text-xl text-charcoal">Plaid</span>
         <span className="font-display font-bold text-xl text-charcoal">DocuSign</span>
      </div>
    </div>
  </section>
);

// ─── Specific Mockup Components ────────────────────────────────────────────────

/** Shell wrapper for all mockups */
const MockupShell = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl border border-border shadow-lg overflow-hidden ${className}`}>
    {/* Browser chrome */}
    <div className="bg-warm/80 px-4 py-2.5 border-b border-border flex items-center gap-1.5">
      <div className="w-2 h-2 rounded-full bg-error/50" />
      <div className="w-2 h-2 rounded-full bg-warning/50" />
      <div className="w-2 h-2 rounded-full bg-success/50" />
      <div className="flex-1 bg-border/70 h-4 rounded-sm mx-2 max-w-[160px]" />
    </div>
    <div className="p-5 bg-[#FAF7F2]">
      {children}
    </div>
  </div>
);

/** 1. Property & Tenant Management mockup */
const PropertyMockup = () => (
  <MockupShell>
    <p className="text-[10px] text-muted font-semibold uppercase tracking-widest mb-3">My Properties</p>
    <div className="space-y-2">
      {[
        { name: 'Lekki Gardens Estate', units: '12 units', occupied: 11, total: 12, status: 'bg-success/10 text-success', label: 'High occupancy' },
        { name: 'Ikeja Court Block A', units: '8 units', occupied: 6, total: 8, status: 'bg-warning/10 text-warning', label: 'Partial' },
        { name: 'Ajah Terrace', units: '6 units', occupied: 6, total: 6, status: 'bg-success/10 text-success', label: 'Full' },
      ].map((p) => (
        <div key={p.name} className="bg-white rounded-lg border border-border p-3 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-charcoal">{p.name}</p>
            <p className="text-[10px] text-muted mt-0.5">{p.occupied}/{p.total} occupied · {p.units}</p>
          </div>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${p.status}`}>{p.label}</span>
        </div>
      ))}
    </div>
    {/* Occupancy bar */}
    <div className="mt-4 bg-white rounded-lg border border-border p-3">
      <div className="flex justify-between text-[10px] text-muted mb-1.5">
        <span>Total occupancy</span>
        <span className="font-semibold text-charcoal">23/26 units</span>
      </div>
      <div className="h-2 bg-border rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full" style={{ width: '88%' }} />
      </div>
    </div>
  </MockupShell>
);

/** 2. Online Rent Payment mockup */
const PaymentMockup = () => (
  <MockupShell>
    <div className="text-center pb-1">
      <div className="w-12 h-12 rounded-full bg-success/15 flex items-center justify-center mx-auto mb-3">
        <CheckCircle size={24} className="text-success" aria-hidden="true" />
      </div>
      <p className="text-xs text-muted mb-1">Payment confirmed</p>
      <p className="font-mono font-bold text-charcoal text-2xl mb-4">₦85,000</p>
      <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold bg-success/10 text-success px-2.5 py-1 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-success" aria-hidden="true" />
        Paid via Paystack
      </span>
    </div>
    <div className="mt-5 space-y-2">
      {[
        { label: 'Tenant', value: 'Ngozi Eze' },
        { label: 'Property', value: 'Ikeja Court — Unit 4B' },
        { label: 'Period', value: 'July 2025' },
        { label: 'Ref', value: 'RF-TXN-29847' },
      ].map((row) => (
        <div key={row.label} className="flex justify-between text-xs border-b border-border pb-2">
          <span className="text-muted">{row.label}</span>
          <span className="font-medium text-charcoal">{row.value}</span>
        </div>
      ))}
    </div>
  </MockupShell>
);

/** 3. Auto-Generated Receipts mockup */
const ReceiptMockup = () => (
  <MockupShell>
    {/* Receipt header */}
    <div className="bg-primary rounded-lg px-4 py-3 flex items-center justify-between mb-4">
      <div>
        <p className="text-white font-semibold text-sm">RentFlow Receipt</p>
        <p className="text-white/60 text-[10px]">Invoice #RF-2847</p>
      </div>
      <span className="text-[10px] bg-success/20 text-green-200 border border-success/30 px-2 py-0.5 rounded font-bold tracking-widest">
        PAID
      </span>
    </div>
    {/* Receipt body */}
    <div className="space-y-2 text-xs">
      {[
        { label: 'Tenant', value: 'Emeka Nwosu' },
        { label: 'Property', value: 'Lekki Gardens — Unit 7' },
        { label: 'Rent period', value: 'June 2025' },
        { label: 'Amount', value: '₦120,000' },
        { label: 'Date paid', value: '01 Jun 2025, 09:42 AM' },
        { label: 'Method', value: 'Bank Transfer' },
      ].map((row) => (
        <div key={row.label} className="flex justify-between border-b border-border pb-2">
          <span className="text-muted">{row.label}</span>
          <span className="font-medium text-charcoal">{row.value}</span>
        </div>
      ))}
    </div>
    <button className="mt-4 w-full text-[11px] font-semibold text-primary bg-primary/8 border border-primary/20 rounded py-1.5 hover:bg-primary/15 transition-colors">
      Download PDF receipt
    </button>
  </MockupShell>
);

/** 4. Late Payment Tracking mockup */
const LatePaymentMockup = () => (
  <MockupShell>
    <div className="flex items-center justify-between mb-3">
      <p className="text-[10px] text-muted font-semibold uppercase tracking-widest">Payment Status</p>
      <span className="text-[10px] bg-error/10 text-error font-semibold px-2 py-0.5 rounded-full">2 overdue</span>
    </div>
    <div className="space-y-2">
      {[
        { name: 'Emeka Nwosu', unit: 'Unit 7', status: 'Paid', daysLabel: 'Paid on time', statusClass: 'bg-success/10 text-success', chipClass: 'bg-success/10 text-success' },
        { name: 'Chinyere Obi', unit: 'Unit 3', status: 'Due', daysLabel: 'Due in 2 days', statusClass: 'bg-warning/10 text-warning', chipClass: 'bg-warning/10 text-warning' },
        { name: 'Tunde Bakare', unit: 'Unit 11', status: 'Overdue', daysLabel: '5 days overdue', statusClass: 'bg-error/10 text-error', chipClass: 'bg-error/10 text-error' },
        { name: 'Aisha Musa', unit: 'Unit 2', status: 'Overdue', daysLabel: '12 days overdue', statusClass: 'bg-error/10 text-error', chipClass: 'bg-error/10 text-error' },
      ].map((t) => (
        <div key={t.name} className="bg-white rounded-lg border border-border p-3 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-charcoal">{t.name}</p>
            <p className="text-[10px] text-muted mt-0.5">{t.unit}</p>
          </div>
          <div className="text-right">
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${t.statusClass}`}>{t.status}</span>
            <p className={`text-[10px] mt-1 ${t.status === 'Overdue' ? 'text-error font-medium' : 'text-muted'}`}>{t.daysLabel}</p>
          </div>
        </div>
      ))}
    </div>
  </MockupShell>
);

/** 5. Maintenance Requests kanban mockup */
const KanbanMockup = () => {
  const columns = [
    {
      label: 'Received',
      color: 'text-info',
      bg: 'bg-info/10',
      cards: [
        { title: 'Leaking pipe', unit: 'Unit 4B', priority: 'bg-error/10 text-error', pLabel: 'Urgent' },
      ],
    },
    {
      label: 'In Progress',
      color: 'text-warning',
      bg: 'bg-warning/10',
      cards: [
        { title: 'Broken door lock', unit: 'Unit 7', priority: 'bg-warning/10 text-warning', pLabel: 'Medium' },
        { title: 'AC not cooling', unit: 'Unit 2', priority: 'bg-warning/10 text-warning', pLabel: 'Medium' },
      ],
    },
    {
      label: 'Resolved',
      color: 'text-success',
      bg: 'bg-success/10',
      cards: [
        { title: 'Faulty light switch', unit: 'Unit 11', priority: 'bg-success/10 text-success', pLabel: 'Done' },
      ],
    },
  ];

  return (
    <MockupShell>
      <p className="text-[10px] text-muted font-semibold uppercase tracking-widest mb-3">Maintenance Board</p>
      <div className="grid grid-cols-3 gap-2">
        {columns.map((col) => (
          <div key={col.label}>
            <div className={`${col.bg} rounded-md px-2 py-1 mb-2 text-center`}>
              <p className={`text-[9px] font-bold uppercase tracking-wider ${col.color}`}>{col.label}</p>
            </div>
            <div className="space-y-1.5">
              {col.cards.map((card) => (
                <div key={card.title} className="bg-white rounded border border-border p-2">
                  <p className="text-[10px] font-semibold text-charcoal leading-snug">{card.title}</p>
                  <p className="text-[9px] text-muted mt-0.5">{card.unit}</p>
                  <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full mt-1 inline-block ${card.priority}`}>
                    {card.pLabel}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </MockupShell>
  );
};

/** 6. Financial Dashboard mockup with bar chart */
const ChartMockup = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const values = [62, 78, 55, 90, 84, 100];

  return (
    <MockupShell>
      {/* Top metrics */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: 'This month', value: '₦2.4M', color: 'text-primary', bg: 'bg-primary/8' },
          { label: 'Outstanding', value: '₦340K', color: 'text-error', bg: 'bg-error/8' },
          { label: 'Occupancy', value: '88%', color: 'text-success', bg: 'bg-success/8' },
        ].map((m) => (
          <div key={m.label} className={`${m.bg} rounded-lg p-2 text-center`}>
            <p className={`font-mono font-bold text-sm ${m.color}`}>{m.value}</p>
            <p className="text-[9px] text-muted mt-0.5">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="bg-white rounded-lg border border-border p-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] text-muted font-medium">Monthly Revenue</p>
          <div className="flex items-center gap-1 text-[10px] text-success font-semibold">
            <TrendingUp size={10} aria-hidden="true" />
            +19% MoM
          </div>
        </div>
        <div className="flex items-end gap-1.5 h-14">
          {values.map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-t transition-all duration-500"
                style={{
                  height: `${v}%`,
                  background: i === values.length - 1 ? '#0B4F45' : 'rgba(11,79,69,0.18)',
                }}
              />
              <span className="text-[8px] text-muted">{months[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </MockupShell>
  );
};

/** Route to correct mockup by index */
const FeatureMockup = ({ index }) => {
  const components = [PropertyMockup, PaymentMockup, ReceiptMockup, LatePaymentMockup, KanbanMockup, ChartMockup];
  const Component = components[index] || PropertyMockup;
  return <Component />;
};

export default Features;
