import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, CreditCard, FileText, Wrench, BarChart3,
  CheckCircle, Star, Building2, UserPlus, Mail, Wallet,
  Bell, LayoutDashboard, Shield, TrendingUp, Search
} from 'lucide-react';
import Button from '../../components/ui/Button';

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
    desc: 'Create your account in under 2 minutes with no credit card required.',
  },
  {
    num: '02.',
    title: 'Add Properties',
    desc: 'Gather information about your units and set monthly rent amounts easily.',
  },
  {
    num: '03.',
    title: 'Invite Tenants',
    desc: 'Send a unique link. Tenants onboard themselves securely.',
  },
  {
    num: '04.',
    title: 'Collect Rent',
    desc: 'Money flows directly to your account seamlessly, on time every month.',
  },
];

/** Dark Testimonials matching the design */
const testimonials = [
  {
    name: 'Chukwuma Obi',
    title: 'LANDLORD, LAGOS',
    quote: 'A real team made up of experienced consumer investors and consumer of tech with complementary skill sets and a track record in investing.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
  },
  {
    name: 'Micheal Johnson',
    title: 'PROPERTY MANAGER',
    quote: 'Before RentFlow, I was chasing 12 tenants on WhatsApp every month. Now I check one dashboard, and the money comes in effortlessly.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
  },
  {
    name: 'Adaeze Nwofor',
    title: 'TENANT, KANO',
    quote: 'A real team made up of experienced developers built this. It handles everything from maintenance to massive rent collections.',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150',
  },
];

/** Stats */
const stats = [
  { value: '98%', label: 'Customer satisfaction', desc: 'Consistently rated 5-stars by users.' },
  { value: '₦5B+', label: 'Rent Processed', desc: 'Securely processed and tracked in 2023.' },
  { value: '12K+', label: 'Active Units', desc: 'Managed daily across multiple cities.' }
];

/** Pricing */
const pricingPlans = [
  {
    name: 'Basic',
    price: 'Free',
    desc: 'Perfect for landlords starting out with a few properties.',
    features: ['Up to 5 Units', 'Basic Rent Collection', 'Standard Support'],
    isPopular: false
  },
  {
    name: 'Professional',
    price: '₦10,000',
    interval: '/month',
    desc: 'For property managers needing advanced automation and insights.',
    features: ['Unlimited Units', 'Automated Receipts', 'Maintenance Tracking', 'Advanced Analytics'],
    isPopular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    desc: 'Custom workflows and dedicated account management.',
    features: ['Everything in Pro', 'API Access', 'Custom Integrations'],
    isPopular: false
  }
];

/** FAQs */
const faqs = [
  { q: 'How long does it take to get set up?', a: 'You can create an account and add your first property in less than 5 minutes. The intuitive onboarding wizard guides you through the entire process step-by-step.' },
  { q: 'Is my financial data secure?', a: 'Absolutely. We use bank-level AES-256 encryption and partner with Paystack to ensure all transactions and financial details are 100% secure.' },
  { q: 'Do tenants need to download an app?', a: 'No, tenants can access their portal directly through any web browser on their smartphone, tablet, or computer.' },
  { q: 'Can I upgrade my plan later?', a: 'Yes, you can easily upgrade or downgrade your plan at any time from your billing dashboard, and we will prorate the charges.' }
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white overflow-hidden">
      {/* ─── Dark SaaS Hero (No scroll-animations to prevent invisible content) ─── */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 px-6 bg-[#1A1A1A] overflow-hidden" aria-label="Hero">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C75B30]/10 blur-[100px] rounded-full" />
        </div>
        
        <div className="max-w-marketing mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="max-w-xl">
              <h1 
                className="font-display text-white mb-6 leading-[1.1] tracking-tight"
                style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}
              >
                Collect Rent,<br />
                Manage Tenants, and<br />
                Properties in One<br />
                Place
              </h1>
              
              <p className="text-white/70 text-base md:text-lg mb-10 leading-relaxed">
                Replace notebooks, spreadsheets, and WhatsApp with a modern rent management platform built for landlords and tenants. High performance tooling for clarity amidst high-density data.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="rounded-full px-8 bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20"
                  rightIcon={<ArrowRight size={18} />}
                  onClick={() => navigate('/signup')}
                >
                  Get Started
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="rounded-full px-8 border-white/20 text-white hover:bg-white/10"
                  onClick={() => navigate('/services')}
                >
                  Explore Services
                </Button>
              </div>
            </div>

            {/* Right Hero Graphic - Captivating Image */}
            <div className="relative w-full aspect-[4/3] rounded-3xl shadow-2xl overflow-hidden group border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200" 
                alt="Modern luxury property"
                className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-[2s] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1A1A1A]/80 via-[#1A1A1A]/20 to-transparent" />
              
              {/* Subtle overlay elements for context */}
              <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center border border-success/30">
                    <CheckCircle className="text-success" size={20} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Rent Collected</p>
                    <p className="text-success text-xs font-medium">+₦1,200,000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Scrolling Trust Strip ─── */}
      <section className="bg-charcoal border-t border-white/5 py-8 overflow-hidden" aria-label="Trusted companies">
        <div className="flex whitespace-nowrap animate-shimmer" style={{ animationDuration: '30s', animationTimingFunction: 'linear' }}>
          {[...trustLogos, ...trustLogos].map((logo, i) => (
            <div key={i} className="inline-flex items-center gap-10 px-10">
              <span className="text-white/40 font-display font-bold text-xl tracking-tight opacity-50 hover:opacity-100 transition-opacity cursor-default">
                {logo}
              </span>
              <span className="text-white/10 text-xs">✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Bento Box Features (Ultra Compact) ─── */}
      <section className="py-20 bg-warm" aria-label="Features Bento">
        <div className="max-w-marketing mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Hero Bento Box (Dark) */}
            <motion.div 
              className="lg:col-span-2 bg-charcoal rounded-2xl p-5 md:p-6 text-white relative overflow-hidden flex flex-col justify-between min-h-[160px]"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            >
              <div className="relative z-10 max-w-sm">
                <h2 className="font-display text-xl md:text-2xl mb-3 leading-tight text-white">
                  Property software that handles it all.
                </h2>
                <Button variant="primary" className="bg-primary hover:bg-primary-dark text-white rounded-full px-4 py-1 text-[10px] h-auto" rightIcon={<ArrowRight size={12}/>}>
                  SEE ALL FEATURES
                </Button>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tl from-primary/40 to-transparent rounded-tl-full blur-xl" />
            </motion.div>

            {/* Top Right Box */}
            <motion.div 
              className="bg-white rounded-2xl p-4 border border-border flex flex-col justify-center min-h-[140px]"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            >
              <div className="w-8 h-8 bg-warm rounded-md flex items-center justify-center mb-3">
                {(() => {
                  const Icon = bentoFeatures[0].icon;
                  return <Icon size={16} strokeWidth={1.5} className="text-charcoal" />;
                })()}
              </div>
              <h3 className="font-display font-bold text-sm mb-1 text-charcoal">{bentoFeatures[0].title}</h3>
              <p className="text-body text-[11px] leading-relaxed line-clamp-2">{bentoFeatures[0].desc}</p>
            </motion.div>

            {/* Bottom 3 Boxes */}
            {bentoFeatures.slice(1).map((feature, idx) => (
              <motion.div 
                key={idx}
                className="bg-white rounded-2xl p-4 border border-border min-h-[140px] flex flex-col justify-center"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + (idx * 0.1) }}
              >
                <div className="w-8 h-8 bg-warm rounded-md flex items-center justify-center mb-3">
                  <feature.icon size={16} strokeWidth={1.5} className="text-charcoal" />
                </div>
                <h3 className="font-display font-bold text-sm mb-1 text-charcoal">{feature.title}</h3>
                <p className="text-body text-[11px] leading-relaxed line-clamp-2">{feature.desc}</p>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* ─── Split Section 1 (Landlord focus) ─── */}
      <section className="py-20 bg-white" aria-label="Landlord Features">
        <div className="max-w-marketing mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Box */}
            <motion.div 
              className="relative w-full aspect-[4/3] bg-warm rounded-2xl border border-border overflow-hidden"
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" 
                alt="Manage Properties" 
                className="absolute inset-0 object-cover w-full h-full opacity-90 mix-blend-multiply transition-transform hover:scale-105 duration-700"
              />
            </motion.div>

            {/* Text Right */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-4 leading-tight">
                Manage all your properties in one place
              </h2>
              <p className="text-body text-sm md:text-base mb-6 leading-relaxed">
                Centralize your operations. From tenant communication to tracking utility bills, RentFlow provides a single unified dashboard to monitor your real estate portfolio, minimizing manual data entry and human error.
              </p>
              <ul className="space-y-3">
                {['No hidden setup fees.', '100% data security. Guaranteed.', 'No training or maintenance needed.'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-charcoal font-medium">
                    <div className="w-5 h-5 rounded-full bg-charcoal flex items-center justify-center shrink-0">
                      <CheckCircle size={12} className="text-white" />
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
      <section className="py-20 bg-warm" aria-label="Tenant Features">
        <div className="max-w-marketing mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Left */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-4 leading-tight">
                Pay rent, on time every time, effortlessly
              </h2>
              <p className="text-body text-sm md:text-base mb-6 leading-relaxed">
                Empower your tenants with flexible payment options. Avoid late fees and penalties, and capture every early payment discount with automated reminders, flexible payment gateways, and immediate PDF receipts.
              </p>
              <Button 
                variant="outline" 
                className="border-charcoal text-charcoal hover:bg-charcoal hover:text-white rounded-full px-5 py-2 text-sm h-auto"
                rightIcon={<ArrowRight size={14}/>}
              >
                LEARN MORE
              </Button>
            </motion.div>

            {/* Image Box */}
            <motion.div 
              className="relative order-1 lg:order-2 w-full aspect-[4/3] bg-white rounded-2xl border border-border overflow-hidden"
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800" 
                alt="Pay rent seamlessly" 
                className="absolute inset-0 object-cover w-full h-full opacity-90 mix-blend-multiply transition-transform hover:scale-105 duration-700"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Dark Timeline (4 Steps) ─── */}
      <section className="relative py-20 bg-charcoal text-white overflow-hidden" aria-label="Steps Timeline">
        <div className="max-w-marketing mx-auto px-6 relative z-10">
          <motion.div 
            className="max-w-2xl mb-12"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl mb-4 leading-tight text-white">
              The 4 steps route to better rental management. <span className="text-white/50">Smarter renting for faster growth.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                className={`bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-5 hover:bg-white/10 transition-colors ${idx === 1 ? 'md:-translate-y-4' : ''}`}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              >
                <div className="font-mono text-xs text-white/40 mb-4 border-b border-white/10 pb-2 inline-block">
                  {step.num}
                </div>
                <h3 className="font-display font-bold text-sm mb-2 text-white">{step.title}</h3>
                <p className="text-[11px] text-white/60 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Dark Testimonials (Bento Grid) - Ultra Compact ─── */}
      <section className="py-20 bg-white" aria-label="Testimonials">
        <div className="max-w-marketing mx-auto px-6 text-center">
          <motion.h2 
            className="font-display text-3xl md:text-4xl text-charcoal mb-10 max-w-xl mx-auto leading-tight"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            Clients trust us and our exclusive service
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            {testimonials.map((t, idx) => (
              <motion.div 
                key={idx}
                className="relative bg-[#1A1D1C] rounded-2xl p-5 flex flex-col justify-between min-h-[180px] overflow-hidden border border-[#272B2A] shadow-xl"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              >
                {/* Subtle Hexagon Pattern Background */}
                <div 
                  className="absolute inset-0 opacity-[0.05] pointer-events-none"
                  style={{ 
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='103.923' viewBox='0 0 60 103.923' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 17.32v34.64L30 69.28 0 51.96V17.32zm0 103.923L0 86.603V51.96l30 17.32 30-17.32v34.643zM30 69.283l30-17.32v34.64l-30 17.32-30-17.32v-34.64z' fill='none' stroke='%23ffffff' stroke-width='1.5'/%3E%3C/svg%3E")`,
                    backgroundSize: '40px'
                  }}
                />
                
                <div className="relative z-10 mb-4">
                  {/* Green Quotes */}
                  <svg width="20" height="16" viewBox="0 0 32 28" fill="none" className="mb-3">
                    <path d="M0 0h10v16l-4 12H0l4-12H0V0zm18 0h10v16l-4 12h-6l4-12h-6V0z" fill="#10b981"/>
                  </svg>
                  <p className="text-[#a0a3a2] text-xs leading-relaxed font-body">
                    {t.quote}
                  </p>
                </div>

                <div className="relative z-10 flex items-center gap-3 mt-auto pt-3 border-t border-white/[0.08]">
                  <div className="w-8 h-8 rounded-full bg-charcoal overflow-hidden shrink-0 border border-transparent">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover grayscale opacity-90" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-[11px]">{t.name}</p>
                    <p className="text-[9px] font-semibold tracking-widest text-[#10b981]">{t.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Stats / Why Choose Us ─── */}
      <section className="py-20 bg-white" aria-label="Stats">
        <div className="max-w-marketing mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-4 leading-tight">
                Why Choose RentFlow?
              </h2>
              <p className="text-body text-sm md:text-base mb-8 leading-relaxed">
                We believe in creating solutions that deliver real value. Our platform works relentlessly to empower landlords and property managers through innovative automation, giving you more time to focus on scaling your business.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {stats.slice(0, 2).map((s, i) => (
                  <div key={i}>
                    <h3 className="font-display text-3xl md:text-4xl font-bold text-primary mb-1">{s.value}</h3>
                    <p className="font-bold text-sm text-charcoal mb-0.5">{s.label}</p>
                    <p className="text-xs text-muted">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/2 relative">
              <div className="aspect-square bg-warm rounded-full absolute -inset-8 -z-10 blur-3xl opacity-50" />
              <img 
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800" 
                alt="Happy customer" 
                className="rounded-2xl shadow-xl object-cover w-full aspect-video"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Pricing - Ultra Compact ─── */}
      <section className="py-20 bg-warm" aria-label="Pricing">
        <div className="max-w-marketing mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-4 leading-tight">
            Choose the Plan that Suits You
          </h2>
          <p className="text-body text-sm md:text-base max-w-xl mx-auto mb-10">
            Simple, transparent pricing that scales automatically with your property portfolio. No hidden fees or surprise charges.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {pricingPlans.map((plan, i) => (
              <div key={i} className={`rounded-2xl p-5 border transition-transform hover:-translate-y-1 ${plan.isPopular ? 'bg-charcoal text-white border-charcoal shadow-xl' : 'bg-white border-border'}`}>
                {plan.isPopular && <div className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full inline-block mb-3">MOST POPULAR</div>}
                <h3 className={`font-display text-lg font-bold mb-1 ${plan.isPopular ? 'text-white' : 'text-charcoal'}`}>{plan.name}</h3>
                <p className={`text-[11px] mb-4 min-h-[30px] ${plan.isPopular ? 'text-white/70' : 'text-muted'}`}>{plan.desc}</p>
                <div className="mb-5">
                  <span className={`font-display text-2xl font-bold ${plan.isPopular ? 'text-white' : 'text-charcoal'}`}>{plan.price}</span>
                  {plan.interval && <span className={`text-[11px] ${plan.isPopular ? 'text-white/70' : 'text-muted'}`}>{plan.interval}</span>}
                </div>
                <Button 
                  size="sm"
                  variant={plan.isPopular ? 'primary' : 'outline'} 
                  className={`w-full rounded-full mb-5 py-1.5 text-xs h-auto ${plan.isPopular ? 'bg-primary hover:bg-primary-dark text-white border-none' : 'border-border text-charcoal hover:bg-warm'}`}
                >
                  Get Started
                </Button>
                <ul className="space-y-2">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-[11px]">
                      <CheckCircle size={12} className={plan.isPopular ? 'text-primary' : 'text-success'} />
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
      <section className="py-20 bg-white" aria-label="FAQ">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-2xl md:text-3xl text-charcoal mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-border rounded-xl p-4 bg-warm hover:bg-white transition-colors cursor-pointer group">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-sm text-charcoal group-hover:text-primary transition-colors">{faq.q}</h4>
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                    <span className="text-primary font-bold text-xs">+</span>
                  </div>
                </div>
                {i === 0 && <p className="text-xs text-body mt-3 leading-relaxed border-t border-border pt-3">{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section className="py-20 bg-white" aria-label="Call to Action">
        <div className="max-w-marketing mx-auto px-6">
          <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-8 text-center text-white relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
            <div className="relative z-10 max-w-xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl mb-4 leading-tight text-white">
                Ready to transform your property management?
              </h2>
              <p className="text-sm text-white/80 mb-8 leading-relaxed">
                Join thousands of modern landlords across Africa using RentFlow to save time, reduce stress, and get paid faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="md" variant="white" className="rounded-full px-6 shadow-xl text-sm">
                  Create Free Account
                </Button>
                <Button size="md" variant="whiteOutline" className="rounded-full px-6 text-sm">
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
