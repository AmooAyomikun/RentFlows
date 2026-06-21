import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, CreditCard, FileText, Wrench, BarChart3,
  CheckCircle, Star, ChevronRight, Building2, TrendingUp, Shield
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/** Trust strip stats */
const stats = [
  { value: '2,400+', label: 'Units managed' },
  { value: '₦180M+', label: 'Collected' },
  { value: '320+', label: 'Landlords' },
  { value: '98%', label: 'On-time receipts' },
];

/** Feature highlight cards */
const features = [
  {
    icon: CreditCard,
    title: 'Online Rent Payment',
    desc: 'Pay rent in 3 taps. Card, bank transfer or Paystack — tenants choose what works.',
    color: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    icon: FileText,
    title: 'PDF Receipts',
    desc: 'Every payment generates a timestamped receipt instantly — no chasing, no disputes.',
    color: 'bg-accent/10',
    iconColor: 'text-accent',
  },
  {
    icon: Wrench,
    title: 'Maintenance Tracking',
    desc: 'Tenants log issues with photos. Landlords track progress from received to resolved.',
    color: 'bg-info/10',
    iconColor: 'text-info',
  },
  {
    icon: BarChart3,
    title: 'Financial Dashboard',
    desc: 'Revenue trends, overdue alerts and export-ready reports — everything in one view.',
    color: 'bg-success/10',
    iconColor: 'text-success',
  },
];

/** How it works steps */
const steps = [
  { num: '01', title: 'Sign up', desc: 'Create your account in under 2 minutes.' },
  { num: '02', title: 'Add properties', desc: 'List your properties and units — as many as you manage.' },
  { num: '03', title: 'Invite tenants', desc: 'Send a personalized invite link to each tenant.' },
];

/** Testimonials */
const testimonials = [
  {
    name: 'Chukwuma Obi',
    location: 'Lagos',
    quote: 'Before RentFlow, I was chasing 12 tenants on WhatsApp every month. Now I check one dashboard, and the money comes in.',
    result: '40% reduction in late payments',
  },
  {
    name: 'Adaeze Nwofor',
    location: 'Abuja',
    quote: 'I pay rent, download my receipt, and I have proof whenever I need it. This is what renting should feel like.',
    result: null,
  },
  {
    name: 'Ibrahim Suleiman',
    location: 'Kano',
    quote: 'I manage properties from three cities. RentFlow gives me visibility I never had before.',
    result: 'Manages 3 cities from one screen',
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-charcoal" aria-label="Hero">
        {/* Animated gradient mesh */}
        <div className="hero-mesh" aria-hidden="true" />

        {/* Content */}
        <div className="max-w-marketing mx-auto px-6 py-24 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="text-center lg:text-left"
            >
              <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full mb-6 border border-white/15">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
                Built for African landlords
              </motion.div>

              <motion.h1
                variants={fadeUp}
                custom={1}
                className="font-display text-white text-balance mb-6"
                style={{ fontSize: 'clamp(40px, 6vw, 68px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
              >
                Rent,{' '}
                <span className="text-accent">finally</span>
                {' '}organized.
              </motion.h1>

              <motion.p variants={fadeUp} custom={2} className="text-white/70 text-lg mb-8 max-w-md mx-auto lg:mx-0">
                Replace the notebook-and-WhatsApp chaos with one clean platform. Landlords
                collect rent, tenants get receipts — everyone wins.
              </motion.p>

              <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Button
                  size="lg"
                  variant="accent"
                  rightIcon={<ArrowRight size={18} />}
                  onClick={() => navigate('/signup?role=landlord')}
                >
                  I'm a Landlord
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={() => navigate('/signup?role=tenant')}
                >
                  I'm a Tenant
                </Button>
              </motion.div>
            </motion.div>

            {/* Hero dashboard mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative hidden lg:block"
              aria-hidden="true"
            >
              <div className="animate-float">
                <DashboardMockup />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-warm border-y border-border py-8" aria-label="Statistics">
        <div className="max-w-marketing mx-auto px-6">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.value}
                variants={fadeUp}
                custom={i}
                className="text-center"
              >
                <p className="font-mono text-2xl lg:text-3xl font-bold text-charcoal">{stat.value}</p>
                <p className="text-sm text-muted mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Problem → Solution */}
      <section className="section-py bg-white" aria-label="Problem and solution">
        <div className="max-w-marketing mx-auto px-6">
          <motion.div
            className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">The problem</p>
              <h2 className="font-display text-charcoal mb-5">
                Chasing rent on WhatsApp is not a business.
              </h2>
              <p className="text-body text-body mb-6 leading-relaxed">
                Most Nigerian landlords manage their properties with notebooks, bank alerts and
                endless WhatsApp messages. Tenants pay into personal accounts with no receipts.
                Disputes happen. Money gets lost. It doesn't have to be this way.
              </p>
              <div className="space-y-3">
                {['No payment records', 'No receipts for tenants', 'No visibility across properties', 'Disputes with no paper trail'].map((pain) => (
                  <div key={pain} className="flex items-center gap-2 text-sm text-body">
                    <span className="w-5 h-5 rounded-full bg-error/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-error text-xs font-bold">✕</span>
                    </span>
                    {pain}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} custom={1}>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">The solution</p>
              <h2 className="font-display text-charcoal mb-5">
                One dashboard. Every property, every payment.
              </h2>
              <p className="text-body text-body mb-6 leading-relaxed">
                RentFlow replaces the chaos with a clean, branded digital experience. Landlords
                see everything. Tenants pay easily and get proof instantly.
              </p>
              <div className="space-y-3">
                {['Automated payment records', 'Instant receipts on every payment', 'Multi-property dashboard', 'Dispute-free paper trail'].map((benefit) => (
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

      {/* Feature highlights */}
      <section className="section-py bg-warm" aria-label="Features">
        <div className="max-w-marketing mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="font-display text-charcoal mb-4">Everything you need. Nothing you don't.</h2>
            <p className="text-body text-body max-w-xl mx-auto">
              Four core capabilities that cover 80% of what landlords and tenants need every single month.
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {features.map((f, i) => (
              <motion.div key={f.title} variants={fadeUp} custom={i}>
                <Card hoverable className="h-full">
                  <div className={`${f.color} w-11 h-11 rounded flex items-center justify-center mb-4`}>
                    <f.icon size={22} className={f.iconColor} aria-hidden="true" />
                  </div>
                  <h3 className="font-display font-semibold text-charcoal text-lg mb-2">{f.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              to="/features"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              See all features <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-py bg-white" aria-label="How it works">
        <div className="max-w-marketing mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="font-display text-charcoal mb-4">Up and running in minutes.</h2>
            <p className="text-body text-body max-w-md mx-auto">No training. No IT. Just sign up, add your properties, and invite tenants.</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {steps.map((step, i) => (
              <motion.div key={step.num} variants={fadeUp} custom={i} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-white font-mono font-bold text-sm flex items-center justify-center mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="font-display font-semibold text-charcoal text-xl mb-2">{step.title}</h3>
                <p className="text-sm text-muted">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-8">
            <Link to="/how-it-works" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
              Full walkthrough <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-py bg-warm" aria-label="Testimonials">
        <div className="max-w-marketing mx-auto px-6">
          <motion.h2
            className="font-display text-charcoal text-center mb-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            What landlords and tenants say.
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-3 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {testimonials.map((t, i) => (
              <motion.div key={t.name} variants={fadeUp} custom={i}>
                <Card className="h-full flex flex-col">
                  <div className="flex gap-0.5 mb-4" aria-label={`5 stars`}>
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={14} className="text-warning fill-warning" aria-hidden="true" />
                    ))}
                  </div>
                  <p className="text-body text-sm leading-relaxed flex-1 mb-4">"{t.quote}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-charcoal text-sm">{t.name}</p>
                      <p className="text-xs text-muted">{t.location}</p>
                    </div>
                    {t.result && (
                      <Badge status="paid" label={t.result} className="text-xs text-right max-w-[120px] text-right" />
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="section-py bg-white" aria-label="Pricing teaser">
        <div className="max-w-marketing mx-auto px-6">
          <motion.div
            className="bg-warm rounded-lg border border-border p-8 md:p-12 text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Pricing</p>
            <h2 className="font-display text-charcoal mb-4">Start free. Scale as you grow.</h2>
            <p className="text-body text-body mb-2">From <span className="font-mono font-semibold text-charcoal">₦3,000</span> per property/month.</p>
            <p className="text-sm text-muted mb-8">Tenants always pay nothing. Landlords get a 14-day free trial.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" onClick={() => navigate('/signup')}>Start free trial</Button>
              <Button size="lg" variant="secondary" onClick={() => navigate('/pricing')}>See all plans</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-warm py-24" aria-label="Call to action">
        <div className="max-w-marketing mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-white mb-6" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
              Ready to get organized?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
              Join hundreds of landlords across Nigeria who've replaced WhatsApp chaos with
              professional rent management.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                variant="accent"
                rightIcon={<ArrowRight size={18} />}
                onClick={() => navigate('/signup?role=landlord')}
              >
                I'm a Landlord — Get Started
              </Button>
              <Button
                size="lg"
                className="border-white/30 text-white bg-white/10 hover:bg-white/20"
                onClick={() => navigate('/signup?role=tenant')}
              >
                I'm a Tenant
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

/** Inline dashboard mockup SVG/card */
const DashboardMockup = () => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-sm mx-auto border border-white/20">
    {/* Topbar */}
    <div className="bg-[#0E2522] px-4 py-3 flex items-center gap-2">
      <div className="w-2.5 h-2.5 rounded-full bg-error/60" />
      <div className="w-2.5 h-2.5 rounded-full bg-warning/60" />
      <div className="w-2.5 h-2.5 rounded-full bg-success/60" />
      <div className="flex-1 bg-white/10 h-5 rounded mx-2" />
    </div>

    {/* Content */}
    <div className="p-4 bg-[#FAF7F2]">
      <p className="text-xs text-muted mb-3 font-medium">Good morning, Chidi 👋</p>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {[
          { label: 'Properties', value: '4', color: 'bg-primary/10 text-primary' },
          { label: 'Revenue', value: '₦8.4M', color: 'bg-success/10 text-success' },
          { label: 'Occupied', value: '22/27', color: 'bg-accent/10 text-accent' },
          { label: 'Overdue', value: '3', color: 'bg-error/10 text-error' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded p-3 border border-[#E5E1DA]">
            <p className="text-[10px] text-muted mb-1">{s.label}</p>
            <p className={`font-mono font-bold text-sm ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Mini chart bars */}
      <div className="bg-white rounded p-3 border border-[#E5E1DA]">
        <p className="text-[10px] text-muted mb-2">Revenue trend</p>
        <div className="flex items-end gap-1 h-10">
          {[40, 55, 48, 62, 75, 68, 85].map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-primary/20 rounded-t"
              style={{ height: `${h}%`, background: i === 6 ? '#0B4F45' : 'rgba(11,79,69,0.2)' }}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Home;
