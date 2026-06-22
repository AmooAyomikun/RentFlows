import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, CreditCard, FileText, Wrench, BarChart3,
  CheckCircle, Star, Building2, UserPlus, Mail, Wallet,
  Bell, LayoutDashboard, Shield, TrendingUp, Search
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/** Trust Logos */
const trustLogos = ['ShelterHQ', 'LagosLiving', 'PropertyPro', 'EstateManagers', 'Haven', 'PrimeShelter', 'Oakwood', 'TerraFirma'];

/** Features Bento Box */
const bentoFeatures = [
  {
    icon: FileText,
    title: 'Easy Invoicing & Receipts',
    desc: 'Automate recurring invoices and save time. Get paid on time with instant PDF generation.',
  },
  {
    icon: LayoutDashboard,
    title: 'Manage properties',
    desc: 'Categorize your properties in seconds and link your bank account for direct deposits.',
  },
  {
    icon: Bell,
    title: 'Automated Reminders',
    desc: 'Set up rent reminders for all your tenants, and never deal with awkward chasing again.',
  },
  {
    icon: Search,
    title: 'Complete Visibility',
    desc: 'Get real-time visibility into every expense and payment, with a neat dashboard.',
  }
];

/** 4 Steps */
const steps = [
  {
    num: '01.',
    title: 'Register',
    desc: 'Create your account in under 2 minutes.',
  },
  {
    num: '02.',
    title: 'Add Properties',
    desc: 'Gather information about your units and set rent amounts.',
  },
  {
    num: '03.',
    title: 'Invite Tenants',
    desc: 'Send a link. Tenants onboard themselves securely.',
  },
  {
    num: '04.',
    title: 'Collect Rent',
    desc: 'Money flows directly to your account seamlessly.',
  },
];

/** Dark Testimonials */
const testimonials = [
  {
    name: 'Chukwuma Obi',
    title: 'Landlord, Lagos',
    quote: 'Before RentFlow, I was chasing 12 tenants on WhatsApp every month. Now I check one dashboard, and the money comes in.',
  },
  {
    name: 'Micheal Johnson',
    title: 'Property Manager, Abuja',
    quote: 'A real team made up of experienced developers built this. It handles everything from maintenance to massive rent collections effortlessly.',
  },
  {
    name: 'Adaeze Nwofor',
    title: 'Tenant, Kano',
    quote: 'I pay rent, download my receipt, and I have proof whenever I need it. This is what renting should feel like.',
  },
];

/** Stats */
const stats = [
  { value: '98%', label: 'Customer satisfaction', desc: 'Consistently rated 5-stars.' },
  { value: '₦5B+', label: 'Rent Processed', desc: 'Securely processed in 2023.' },
  { value: '12K+', label: 'Active Units', desc: 'Managed daily on RentFlow.' }
];

/** Pricing */
const pricingPlans = [
  {
    name: 'Basic',
    price: 'Free',
    desc: 'Perfect for landlords starting out with a few properties.',
    features: ['Up to 5 Units', 'Basic Rent Collection', 'Standard Support', 'Tenant Portal'],
    isPopular: false
  },
  {
    name: 'Professional',
    price: '₦10,000',
    interval: '/month',
    desc: 'For property managers needing advanced automation and insights.',
    features: ['Unlimited Units', 'Automated Receipts', 'Maintenance Tracking', 'Priority Support', 'Advanced Analytics'],
    isPopular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    desc: 'Custom workflows and dedicated account management for large portfolios.',
    features: ['Everything in Pro', 'API Access', 'Custom Integrations', 'Dedicated Account Manager'],
    isPopular: false
  }
];

/** FAQs */
const faqs = [
  { q: 'How long does it take to get set up?', a: 'You can create an account and add your first property in less than 5 minutes.' },
  { q: 'Is my financial data secure?', a: 'Absolutely. We use bank-level encryption and partner with Paystack to ensure all transactions are 100% secure.' },
  { q: 'Do tenants need to download an app?', a: 'No, tenants can access their portal directly through any web browser on their phone or computer.' },
  { q: 'Can I upgrade my plan later?', a: 'Yes, you can upgrade or downgrade your plan at any time from your billing dashboard.' }
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white overflow-hidden">
      {/* ─── Modern SaaS Hero ─── */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 px-6" aria-label="Hero">
        <div className="max-w-marketing mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-16 relative z-10">
            <motion.h1 
              className="font-display text-charcoal mb-6 leading-tight"
              style={{ fontSize: 'clamp(48px, 8vw, 84px)', letterSpacing: '-0.04em' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              We Provide <span className="text-primary italic font-light">Modern</span> Solutions
            </motion.h1>
            
            <motion.p 
              className="text-body text-xl md:text-2xl max-w-2xl mx-auto mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Know where your rent is going and manage your properties more efficiently with RentFlow.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Button 
                size="lg" 
                className="rounded-full px-8 bg-charcoal text-white hover:bg-charcoal/90 text-lg shadow-xl shadow-charcoal/20"
                rightIcon={<ArrowRight size={18} />}
                onClick={() => navigate('/signup')}
              >
                Try it on browser
              </Button>
            </motion.div>
          </div>

          {/* Hero Image & Floating Elements */}
          <motion.div 
            className="relative max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Abstract Background blobs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/10 blur-[120px] rounded-full -z-10" />
            <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 blur-[100px] rounded-full -z-10" />
            
            {/* Central Graphic */}
            <div className="relative aspect-[16/9] md:aspect-[21/9] bg-warm rounded-3xl border border-border shadow-2xl overflow-hidden flex items-center justify-center">
              {/* Replace with actual photography */}
              <img 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000" 
                alt="Modern property"
                className="absolute inset-0 w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
              
              {/* Dashboard peek overlay */}
              <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[80%] max-w-2xl bg-white rounded-t-2xl shadow-2xl border-t border-x border-border p-4">
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
                  <div className="w-3 h-3 rounded-full bg-error/60" />
                  <div className="w-3 h-3 rounded-full bg-warning/60" />
                  <div className="w-3 h-3 rounded-full bg-success/60" />
                </div>
                <div className="flex gap-4">
                  <div className="w-1/3 space-y-3">
                    <div className="h-2 bg-warm rounded w-full" />
                    <div className="h-2 bg-warm rounded w-2/3" />
                    <div className="h-2 bg-warm rounded w-4/5" />
                  </div>
                  <div className="w-2/3">
                    <div className="h-24 bg-primary/5 rounded-lg border border-primary/10 w-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating App/Review Badges */}
            <div className="absolute -left-6 top-1/4 bg-white p-4 rounded-2xl shadow-xl border border-border animate-float hidden md:block" style={{ animationDelay: '0s' }}>
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-warning text-warning" />)}
              </div>
              <p className="text-xs text-muted font-medium">"The interface is excellent"</p>
              <p className="text-[10px] font-bold text-charcoal mt-1">Capterra</p>
            </div>

            <div className="absolute -right-8 bottom-1/3 bg-white p-4 rounded-2xl shadow-xl border border-border animate-float hidden md:block" style={{ animationDelay: '2s' }}>
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-success text-success" />)}
              </div>
              <p className="text-xs text-muted font-medium">"Improvements in every release"</p>
              <p className="text-[10px] font-bold text-success mt-1">Trustpilot</p>
            </div>
            
            {/* Floating Floating Icon 1 */}
            <div className="absolute left-1/4 -top-8 w-16 h-16 bg-white rounded-2xl shadow-lg border border-border flex items-center justify-center animate-float hidden md:flex" style={{ animationDelay: '1s' }}>
               <Wallet size={28} className="text-accent" />
            </div>
            {/* Floating Floating Icon 2 */}
            <div className="absolute right-1/4 -top-4 w-14 h-14 bg-white rounded-2xl shadow-lg border border-border flex items-center justify-center animate-float hidden md:flex" style={{ animationDelay: '3s' }}>
               <Building2 size={24} className="text-primary" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Scrolling Trust Strip ─── */}
      <section className="bg-charcoal py-8 overflow-hidden" aria-label="Trusted companies">
        <div className="flex whitespace-nowrap animate-shimmer" style={{ animationDuration: '30s', animationTimingFunction: 'linear' }}>
          {[...trustLogos, ...trustLogos].map((logo, i) => (
            <div key={i} className="inline-flex items-center gap-12 px-12">
              <span className="text-white/40 font-display font-bold text-2xl tracking-tight opacity-50 hover:opacity-100 transition-opacity cursor-default">
                {logo}
              </span>
              <span className="text-white/20">✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Bento Box Features ─── */}
      <section className="section-py bg-warm" aria-label="Features Bento">
        <div className="max-w-marketing mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* Hero Bento Box (Dark) */}
            <motion.div 
              className="lg:col-span-2 bg-charcoal rounded-[2rem] p-10 md:p-14 text-white relative overflow-hidden flex flex-col justify-between min-h-[400px]"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            >
              <div className="relative z-10 max-w-md">
                <h2 className="font-display text-4xl md:text-5xl mb-8 leading-tight text-white">
                  Property software that handles it all.
                </h2>
                <Button variant="primary" className="bg-primary hover:bg-primary-dark text-white rounded-full px-6" rightIcon={<ArrowRight size={16}/>}>
                  SEE ALL FEATURES
                </Button>
              </div>
              {/* Graphic in bottom right */}
              <div className="absolute -bottom-10 -right-10 w-2/3 h-2/3 bg-gradient-to-tl from-primary/40 to-transparent rounded-tl-full blur-2xl" />
              <div className="absolute bottom-0 right-0 p-8 opacity-50 md:opacity-100 hidden sm:block">
                <div className="w-64 h-48 bg-sidebar-bg rounded-t-2xl border-t-4 border-l-4 border-white/10 p-4 shadow-2xl">
                   <div className="flex gap-2 mb-4"><div className="w-8 h-8 rounded-full bg-primary/50" /><div className="w-8 h-8 rounded-full bg-accent/50" /></div>
                   <div className="space-y-2"><div className="h-2 w-full bg-white/10 rounded" /><div className="h-2 w-2/3 bg-white/10 rounded" /></div>
                </div>
              </div>
            </motion.div>

            {/* Top Right Box */}
            <motion.div 
              className="bg-white rounded-[2rem] p-10 border border-border flex flex-col justify-center"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} delay={0.1}
            >
              <div className="w-14 h-14 bg-warm rounded-2xl flex items-center justify-center mb-6">
                {(() => {
                  const Icon = bentoFeatures[0].icon;
                  return <Icon size={28} strokeWidth={1.5} className="text-charcoal" />;
                })()}
              </div>
              <h3 className="font-display font-bold text-xl mb-3 text-charcoal">{bentoFeatures[0].title}</h3>
              <p className="text-body text-sm leading-relaxed">{bentoFeatures[0].desc}</p>
            </motion.div>

            {/* Bottom 3 Boxes */}
            {bentoFeatures.slice(1).map((feature, idx) => (
              <motion.div 
                key={idx}
                className="bg-white rounded-[2rem] p-8 border border-border"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} delay={0.2 + (idx * 0.1)}
              >
                <div className="w-12 h-12 bg-warm rounded-xl flex items-center justify-center mb-6">
                  <feature.icon size={24} strokeWidth={1.5} className="text-charcoal" />
                </div>
                <h3 className="font-display font-bold text-lg mb-3 text-charcoal">{feature.title}</h3>
                <p className="text-body text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* ─── Split Section 1 (Landlord focus) ─── */}
      <section className="py-24 bg-white" aria-label="Landlord Features">
        <div className="max-w-marketing mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Mockup Left */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-primary/5 rounded-[3rem] -rotate-3 scale-105" />
              <div className="relative bg-white rounded-[2rem] p-6 border border-border shadow-xl">
                <div className="flex items-center gap-2 mb-6 border-b border-border pb-4">
                  <div className="w-3 h-3 rounded-full bg-error/60" />
                  <div className="w-3 h-3 rounded-full bg-warning/60" />
                  <div className="w-3 h-3 rounded-full bg-success/60" />
                </div>
                <h4 className="font-display font-bold text-xl mb-6">Property Insights</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-warm rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center"><TrendingUp className="text-success" size={20}/></div>
                      <div><p className="text-sm text-muted">Total Revenue</p><p className="font-mono font-bold">₦15,450,000</p></div>
                    </div>
                    <Badge status="success" label="+4.34%" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-warm rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center"><BarChart3 className="text-error" size={20}/></div>
                      <div><p className="text-sm text-muted">Overdue Rent</p><p className="font-mono font-bold">₦1,350,000</p></div>
                    </div>
                    <Badge status="error" label="-2.07%" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Text Right */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-6 leading-tight">
                Manage all your properties in one place
              </h2>
              <p className="text-body text-lg mb-8 leading-relaxed">
                Centralize and simplify payments, and get comprehensive insights on your financials. 
                Connect your bank account and track rent flows instantly across your entire portfolio.
              </p>
              <ul className="space-y-4">
                {['No hidden fees.', '100% security. Guaranteed.', 'No training or maintenance needed.'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-charcoal font-medium">
                    <div className="w-6 h-6 rounded-full bg-charcoal flex items-center justify-center shrink-0">
                      <CheckCircle size={14} className="text-white" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Split Section 2 (Tenant focus) ─── */}
      <section className="py-24 bg-warm" aria-label="Tenant Features">
        <div className="max-w-marketing mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Left */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-6 leading-tight">
                Pay rent, on time every time, effortlessly
              </h2>
              <p className="text-body text-lg mb-6 leading-relaxed">
                Send and receive payments seamlessly. Avoid late fees and penalties, and capture 
                every early payment discount with automated reminders and immediate PDF receipts.
              </p>
              <Button 
                variant="outline" 
                className="border-charcoal text-charcoal hover:bg-charcoal hover:text-white rounded-full px-6"
                rightIcon={<ArrowRight size={16}/>}
              >
                LEARN MORE
              </Button>
            </motion.div>

            {/* Mockup Right */}
            <motion.div 
              className="relative order-1 lg:order-2"
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-accent/5 rounded-[3rem] rotate-3 scale-105" />
              <div className="relative bg-white rounded-[2rem] p-8 border border-border shadow-xl">
                <div className="flex items-center gap-2 mb-8 border-b border-border pb-4">
                  <div className="w-3 h-3 rounded-full bg-error/60" />
                  <div className="w-3 h-3 rounded-full bg-warning/60" />
                  <div className="w-3 h-3 rounded-full bg-success/60" />
                </div>
                <h4 className="font-display font-bold text-2xl mb-2">Pay Rent</h4>
                <p className="text-sm text-muted mb-8">Balance : <span className="font-mono font-bold text-charcoal">₦450,000</span></p>
                
                <div className="space-y-6">
                  <div className="bg-warm rounded-xl p-4 flex justify-between items-center border border-primary/20">
                    <div>
                      <p className="text-xs text-muted mb-1">You pay</p>
                      <p className="font-mono font-bold text-xl">₦450,000</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <CreditCard size={16} className="text-primary"/>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-semibold mb-3">Choose Method</p>
                    <div className="border-2 border-charcoal rounded-xl p-4 flex items-start gap-3 bg-charcoal/5">
                      <CheckCircle size={20} className="text-charcoal mt-0.5 shrink-0" />
                      <div>
                        <p className="font-semibold text-charcoal">Bank Transfer / Card</p>
                        <p className="text-xs text-muted">Instant processing via Paystack</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Dark Timeline (4 Steps) ─── */}
      <section className="relative py-32 bg-charcoal text-white overflow-hidden" aria-label="Steps Timeline">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 opacity-20 mix-blend-overlay bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=2000)' }}
        />
        
        <div className="max-w-marketing mx-auto px-6 relative z-10">
          <motion.div 
            className="max-w-2xl mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl mb-6 leading-tight text-white">
              The 4 steps route to better rental management. <span className="text-white/50">Smarter renting for faster growth.</span>
            </h2>
            {/* Squiggle decoration */}
            <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-50 mt-8 hidden md:block">
              <path d="M2 38C2 38 18 12 36 26C54 40 48 64 68 64C88 64 94 40 118 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                className={`bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-colors ${idx === 1 ? 'md:-translate-y-8' : ''}`}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} delay={idx * 0.1}
              >
                <div className="font-mono text-xl text-white/40 mb-12 border-b border-white/10 pb-4 inline-block">
                  {step.num}
                </div>
                <h3 className="font-display font-bold text-xl mb-3 text-white">{step.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Dark Testimonials (Bento Grid) ─── */}
      <section className="py-24 bg-white" aria-label="Testimonials">
        <div className="max-w-marketing mx-auto px-6 text-center">
          <motion.h2 
            className="font-display text-3xl md:text-4xl text-charcoal mb-16 max-w-xl mx-auto leading-tight"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            Clients trust us and our exclusive service
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            {testimonials.map((t, idx) => (
              <motion.div 
                key={idx}
                className="bg-charcoal text-white rounded-[2rem] p-8 md:p-10 flex flex-col justify-between"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} delay={idx * 0.1}
              >
                <div className="mb-8">
                  <div className="text-primary font-display text-6xl leading-none mb-4">"</div>
                  <p className="text-white/80 leading-relaxed text-sm md:text-base">
                    {t.quote}
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30">
                    <span className="font-bold text-sm">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className="text-xs text-white/50">{t.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Stats / Why Choose Us ─── */}
      <section className="py-24 bg-white" aria-label="Stats">
        <div className="max-w-marketing mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2">
              <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-6 leading-tight">
                Why Choose RentFlow?
              </h2>
              <p className="text-body text-lg mb-8 leading-relaxed">
                We believe in creating solutions that deliver real value. Our platform works relentlessly to empower landlords and property managers through innovative automation and result-driven insights.
              </p>
              <div className="grid grid-cols-2 gap-8">
                {stats.slice(0, 2).map((s, i) => (
                  <div key={i}>
                    <h3 className="font-display text-5xl font-bold text-primary mb-2">{s.value}</h3>
                    <p className="font-bold text-charcoal mb-1">{s.label}</p>
                    <p className="text-sm text-muted">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/2 relative">
              <div className="aspect-square bg-warm rounded-full absolute -inset-8 -z-10 blur-3xl opacity-50" />
              <img 
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800" 
                alt="Happy customer" 
                className="rounded-[2rem] shadow-2xl object-cover w-full h-[500px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Pricing ─── */}
      <section className="py-24 bg-warm" aria-label="Pricing">
        <div className="max-w-marketing mx-auto px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl text-charcoal mb-6 leading-tight">
            Choose the Plan that Suits You
          </h2>
          <p className="text-body text-lg max-w-2xl mx-auto mb-16">
            Simple, transparent pricing that scales with your property portfolio. No hidden fees.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {pricingPlans.map((plan, i) => (
              <div key={i} className={`rounded-[2rem] p-8 border transition-transform hover:-translate-y-2 ${plan.isPopular ? 'bg-charcoal text-white border-charcoal shadow-2xl md:scale-105' : 'bg-white border-border'}`}>
                {plan.isPopular && <div className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">MOST POPULAR</div>}
                <h3 className={`font-display text-2xl font-bold mb-2 ${plan.isPopular ? 'text-white' : 'text-charcoal'}`}>{plan.name}</h3>
                <p className={`text-sm mb-6 min-h-[40px] ${plan.isPopular ? 'text-white/70' : 'text-muted'}`}>{plan.desc}</p>
                <div className="mb-8">
                  <span className={`font-display text-4xl font-bold ${plan.isPopular ? 'text-white' : 'text-charcoal'}`}>{plan.price}</span>
                  {plan.interval && <span className={`text-sm ${plan.isPopular ? 'text-white/70' : 'text-muted'}`}>{plan.interval}</span>}
                </div>
                <Button 
                  variant={plan.isPopular ? 'primary' : 'outline'} 
                  className={`w-full rounded-full mb-8 ${plan.isPopular ? 'bg-primary hover:bg-primary-dark text-white border-none' : 'border-border text-charcoal hover:bg-warm'}`}
                >
                  Get Started
                </Button>
                <ul className="space-y-4">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm">
                      <CheckCircle size={16} className={plan.isPopular ? 'text-primary' : 'text-success'} />
                      <span className={plan.isPopular ? 'text-white/90' : 'text-charcoal font-medium'}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQs ─── */}
      <section className="py-24 bg-white" aria-label="FAQ">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-border rounded-2xl p-6 bg-warm hover:bg-white transition-colors cursor-pointer group">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-charcoal group-hover:text-primary transition-colors">{faq.q}</h4>
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                    <span className="text-primary font-bold">+</span>
                  </div>
                </div>
                {i === 0 && <p className="text-sm text-body mt-4 leading-relaxed border-t border-border pt-4">{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Blog/Insights Teaser ─── */}
      <section className="py-24 bg-warm" aria-label="Recent Blog">
        <div className="max-w-marketing mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <h2 className="font-display text-3xl md:text-4xl text-charcoal">Recent Insights</h2>
            <Button variant="primary" className="rounded-full shrink-0" rightIcon={<ArrowRight size={16}/>}>
              SEE ALL ARTICLES
            </Button>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Featured Post (Left, spans 7 cols) */}
            <motion.div 
              className="lg:col-span-7 bg-white rounded-[2rem] overflow-hidden border border-border group cursor-pointer"
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <div className="aspect-[16/9] overflow-hidden bg-warm">
                <img 
                  src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000" 
                  alt="Blog cover" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 text-xs font-bold mb-4">
                  <span className="bg-success text-white px-3 py-1 rounded-full uppercase tracking-wider">Business</span>
                  <span className="text-muted font-medium">• 8 MIN READ</span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-4 leading-tight group-hover:text-primary transition-colors">
                  The worst advice we've ever heard about property management
                </h3>
                <p className="text-body mb-6 line-clamp-2">
                  Leverage agile frameworks to provide a robust synopsis for high level overviews. 
                  Iterative approaches to corporate strategy foster collaborative thinking and reduce overhead.
                </p>
                <div className="inline-flex items-center gap-2 font-bold text-sm uppercase tracking-wider">
                  <div className="w-8 h-8 rounded-full bg-charcoal text-white flex items-center justify-center">
                    <ArrowRight size={14} />
                  </div>
                  READ MORE
                </div>
              </div>
            </motion.div>

            {/* Side Posts (Right, spans 5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {[
                { img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=500', title: 'The History of Property Tech in Africa', time: '5 MIN READ' },
                { img: 'https://images.unsplash.com/photo-1560518883-ce09059eeefa?auto=format&fit=crop&q=80&w=500', title: '10 Things nobody told you about being a Landlord', time: '8 MIN READ' },
                { img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=500', title: 'Maximizing Rent Collections in 2026', time: '4 MIN READ' }
              ].map((post, i) => (
                <motion.div 
                  key={i}
                  className="bg-white rounded-2xl p-4 border border-border flex gap-4 items-center group cursor-pointer hover:border-primary/30 transition-colors"
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} delay={i * 0.1}
                >
                  <div className="w-28 h-24 rounded-xl overflow-hidden shrink-0 bg-warm">
                    <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted mb-2">• {post.time}</p>
                    <h4 className="font-display font-bold text-charcoal leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section className="py-24 bg-white" aria-label="Call to Action">
        <div className="max-w-marketing mx-auto px-6">
          <div className="bg-gradient-to-br from-primary to-primary-dark rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-display text-4xl md:text-5xl mb-6 leading-tight text-white">
                Ready to transform your property management?
              </h2>
              <p className="text-lg text-white/80 mb-10 leading-relaxed">
                Join thousands of modern landlords across Africa using RentFlow to save time, reduce stress, and get paid faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="rounded-full bg-white text-primary hover:bg-warm px-8 shadow-xl">
                  Create Free Account
                </Button>
                <Button size="lg" variant="outline" className="rounded-full border-white/20 text-white hover:bg-white/10 px-8">
                  Book a Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
