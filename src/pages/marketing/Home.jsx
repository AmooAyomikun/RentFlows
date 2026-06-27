import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, CreditCard, FileText, Wrench, BarChart3, CheckCircle,
  Star, Building2, UserPlus, Mail, Wallet, Bell, LayoutDashboard,
  Shield, TrendingUp, Search, FileSpreadsheet, Calculator, DollarSign,
  MessageSquare, CheckCircle2, XCircle, Send, Play, ChevronRight,
  Activity, Lock, Zap, Globe, Users
} from 'lucide-react';
import Button from '../../components/ui/Button';

// Real Unsplash images — African property management context
const IMG_HERO_MOCKUP      = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=85&w=900';  // laptop analytics
const IMG_PROPERTIES       = 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=900';  // modern apartment block
const IMG_MOBILE           = 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=700';  // person using phone / mobile app
const IMG_ANALYTICS        = 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=900';  // financial documents/laptop
const IMG_BLOG_1           = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=700';  // property keys
const IMG_BLOG_2           = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=700';  // dashboard screen
const IMG_BLOG_3           = 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=700';  // signing documents

// ─── Animation helpers ──────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

// ─── Static data ────────────────────────────────────────────────────────
const trustLogos = [
  'ShelterHQ', 'LagosLiving', 'PropertyPro', 'EstateManagers',
  'Haven', 'PrimeShelter', 'Oakwood', 'TerraFirma',
];

const testimonials = [
  {
    name: 'Chukwuma Obi',
    title: 'Landlord, Lagos',
    quote: 'Before RentFlow I was manually chasing 18 tenants every month. Now I check one dashboard and every payment comes in on time. It has completely changed how I run my portfolio.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    stars: 5,
  },
  {
    name: 'Micheal Johnson',
    title: 'Property Manager',
    quote: 'The automated receipts alone save me 4 hours a week. Our tenants love getting instant confirmation. RentFlow made us look like a professional outfit overnight.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    stars: 5,
  },
  {
    name: 'Adaeze Nwofor',
    title: 'Tenant, Kano',
    quote: 'Paying rent used to be stressful — waiting for confirmation, no receipt. Now I pay in seconds and get a PDF receipt instantly. I wish all my landlords used this.',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150',
    stars: 5,
  },
];

const faqs = [
  { q: 'How long does it take to get set up?', a: 'You can create an account and add your first property in less than 5 minutes. The intuitive onboarding wizard guides you step-by-step with zero technical knowledge needed.' },
  { q: 'Is my financial data secure?', a: 'Absolutely. We use bank-level AES-256 encryption and partner with Paystack to ensure all transactions and financial details are 100% secure and compliant.' },
  { q: 'Do tenants need to download an app?', a: 'No — tenants access their portal directly through any web browser on any device. No app downloads, no friction.' },
  { q: 'Can I upgrade my plan later?', a: 'Yes. You can upgrade or downgrade at any time from your billing dashboard. We prorate charges fairly so you only pay for what you use.' },
  { q: 'What payment methods are supported?', a: 'We support bank transfers, card payments via Paystack, Flutterwave, and Monnify virtual accounts. Your tenants can pay however works best for them.' },
];

const pricingPlans = [
  {
    name: 'Starter',
    price: 'Free',
    desc: 'Perfect for landlords managing a few properties.',
    features: ['Up to 5 Units', 'Basic Rent Collection', 'Tenant Portal', 'Email Support'],
    isPopular: false,
    cta: 'Get Started Free',
  },
  {
    name: 'Professional',
    price: '₦10,000',
    interval: '/month',
    desc: 'For growing portfolios that need automation and insights.',
    features: ['Unlimited Units', 'Automated Receipts & Invoicing', 'Maintenance Tracking', 'Advanced Analytics', 'Priority Support'],
    isPopular: true,
    cta: 'Start Free Trial',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    desc: 'Dedicated account management for large portfolios.',
    features: ['Everything in Pro', 'API Access', 'Custom Integrations', 'White-label Options', 'SLA Guarantee'],
    isPopular: false,
    cta: 'Talk to Sales',
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="bg-white overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════════════
          1. HERO — Full-bleed dark photo with split layout
         ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-screen overflow-hidden flex flex-col" aria-label="Hero">

        {/* Background photo */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=85&w=1920"
            alt="Modern property"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071A16]/95 via-[#071A16]/82 to-[#071A16]/40" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#071A16]/70 to-transparent" />
        </div>

        {/* Nav spacer */}
        <div className="h-20 shrink-0" />

        {/* Main hero content */}
        <div className="relative z-10 flex-1 flex items-center">
          <div className="max-w-marketing mx-auto px-6 w-full py-16 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">

              {/* LEFT: Copy */}
              <div>
                {/* Category pill */}
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0B4F45]/80 border border-[#C75B30]/40 text-white text-[11px] font-bold tracking-[0.15em] uppercase mb-7 backdrop-blur-md"
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C75B30] animate-pulse" />
                  Property Management Platform for Africa
                </motion.div>

                {/* Headline */}
                <motion.h1
                  className="font-display text-white font-black leading-[1.08] tracking-tight mb-6"
                  style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }}
                >
                  The Smarter Way<br />
                  to Manage Rent<br />
                  <span className="text-[#C75B30]">in Africa.</span>
                </motion.h1>

                {/* Subheading */}
                <motion.p
                  className="text-white/75 text-base md:text-lg leading-relaxed mb-8 max-w-[500px]"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.16 }}
                >
                  Stop chasing rent through WhatsApp. RentFlow gives landlords and tenants one professional platform to collect payments, track maintenance, and manage leases — all in one place.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  className="flex flex-wrap gap-3 mb-10"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.24 }}
                >
                  <button
                    onClick={() => navigate('/signup')}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#0B4F45] hover:bg-[#073A33] text-white font-bold text-sm tracking-wide transition-all duration-200 shadow-[0_8px_30px_rgba(11,79,69,0.4)] active:scale-[0.98] cursor-pointer border border-white/10"
                  >
                    Get Started Free
                    <ArrowRight size={16} className="text-[#E79868]" />
                  </button>
                  <button
                    onClick={() => navigate('/features')}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/30 text-white hover:bg-white/10 font-semibold text-sm tracking-wide transition-all duration-200 active:scale-[0.98] cursor-pointer backdrop-blur-md"
                  >
                    See Features
                  </button>
                </motion.div>

                {/* Social proof */}
                <motion.div
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.32 }}
                >
                  <div className="flex -space-x-2.5">
                    {[
                      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face&auto=format',
                      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=48&h=48&fit=crop&crop=face&auto=format',
                      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=48&h=48&fit=crop&crop=face&auto=format',
                    ].map((src, i) => (
                      <img key={i} src={src} alt="User" className="w-9 h-9 rounded-full border-2 border-[#0B4F45]/60 object-cover" />
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-0.5 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={11} className="text-[#C75B30] fill-[#C75B30]" />
                      ))}
                    </div>
                    <p className="text-white/65 text-xs">
                      Trusted by <span className="text-white font-semibold">2,400+ landlords</span> across Africa
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* RIGHT: Product mockup image */}
              <motion.div
                className="relative hidden lg:flex items-center justify-center"
                initial={{ opacity: 0, x: 24, y: 8 }} animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Glow */}
                <div className="absolute inset-0 bg-[#C75B30]/12 blur-[80px] rounded-3xl scale-90 pointer-events-none" />

                {/* Mockup */}
                <div className="relative z-10 w-full max-w-[520px] rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.55)] border border-white/10">
                  <img
                    src={IMG_HERO_MOCKUP}
                    alt="Property management analytics dashboard on laptop"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tl from-[#0B4F45]/8 via-transparent to-white/4 pointer-events-none" />
                </div>

                {/* Floating badge: Rent received */}
                <motion.div
                  className="absolute -bottom-6 -left-6 bg-white rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.20)] flex items-center gap-3 z-20 border border-gray-100"
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
                >
                  <div className="w-9 h-9 bg-emerald-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={18} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-900 leading-none mb-0.5">Rent Received</p>
                    <p className="text-[10px] text-gray-500">₦850,000 · Unit 4B</p>
                  </div>
                </motion.div>

                {/* Floating badge: Units managed */}
                <motion.div
                  className="absolute -top-5 -right-4 bg-[#C75B30] rounded-2xl px-4 py-3 shadow-[0_12px_30px_rgba(199,91,48,0.4)] flex items-center gap-2.5 z-20"
                  initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                >
                  <Building2 size={16} className="text-white/90" />
                  <div>
                    <p className="text-white font-bold text-sm leading-none">1,425 Units</p>
                    <p className="text-white/75 text-[10px]">managed today</p>
                  </div>
                </motion.div>
              </motion.div>

            </div>
          </div>
        </div>

        {/* Bottom stat strip */}
        <div className="relative z-10 border-t border-white/10 bg-[#071A16]/55 backdrop-blur-sm">
          <div className="max-w-marketing mx-auto px-6">
            <div className="grid grid-cols-3 divide-x divide-white/10">
              {[
                { value: '₦180M+', label: 'Rent Processed', icon: TrendingUp },
                { value: '2,400+', label: 'Active Landlords', icon: Building2 },
                { value: '98%',    label: 'On-Time Payments', icon: CheckCircle2 },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 px-4 py-5 md:px-8"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-[#C75B30]/15 border border-[#C75B30]/25 flex items-center justify-center flex-shrink-0">
                    <stat.icon size={14} className="text-[#E79868]" />
                  </div>
                  <div>
                    <p className="text-white font-display font-black text-lg leading-none tracking-tight">{stat.value}</p>
                    <p className="text-white/50 text-[11px] mt-0.5">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2. TRUST LOGOS — Scrolling ticker
         ══════════════════════════════════════════════════════════════ */}
      <section className="py-10 bg-warm border-y border-border overflow-hidden" aria-label="Trusted by">
        <p className="text-center text-micro font-bold text-muted tracking-[0.15em] uppercase mb-6">
          Trusted by leading property managers across Africa
        </p>
        <div className="flex gap-10 whitespace-nowrap overflow-hidden">
          <div className="flex gap-10 animate-[scroll_22s_linear_infinite]" style={{ animation: 'scroll 22s linear infinite' }}>
            {[...trustLogos, ...trustLogos].map((logo, i) => (
              <span key={i} className="text-charcoal/30 font-display font-black text-h4 tracking-tight select-none shrink-0">
                {logo}
              </span>
            ))}
          </div>
        </div>
        <style>{`@keyframes scroll { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          3. PRODUCT OVERVIEW — Laptop mockup split
         ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24 bg-white" aria-label="Product overview">
        <div className="max-w-marketing mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

            {/* Left: Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <div className="absolute -inset-6 bg-gradient-to-br from-[#0B4F45]/6 to-[#C75B30]/4 rounded-3xl blur-2xl pointer-events-none" />
              <img
                src={IMG_PROPERTIES}
                alt="Modern apartment building in Africa"
                className="relative w-full rounded-2xl shadow-lg border border-border object-cover aspect-[4/3]"
              />
            </motion.div>

            {/* Right: Copy */}
            <motion.div
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <span className="text-micro font-bold text-accent tracking-[0.12em] uppercase">Built for African Landlords</span>
              <h2 className="font-display text-h2-sm md:text-h2 text-charcoal mt-2 mb-4 font-bold tracking-tight leading-tight">
                Manage all your properties in one place
              </h2>
              <p className="text-body text-body mb-8 leading-relaxed max-w-lg">
                Centralize your entire operation. From tenant communication to tracking utility bills, RentFlow provides a unified dashboard to monitor your real-estate portfolio — eliminating manual data entry and human error.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  'No hidden fees or complex setup',
                  '100% data security, bank-grade encryption',
                  'Works on any device, no training needed',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-body text-charcoal font-medium">
                    <div className="w-6 h-6 rounded-full bg-[#0B4F45]/10 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-3.5 h-3.5 text-[#0B4F45]" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => navigate('/features')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0B4F45] text-white font-semibold text-sm hover:bg-[#073A33] transition-all cursor-pointer"
              >
                Explore Features <ArrowRight size={15} />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          4. FEATURES BENTO GRID
         ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24 bg-warm" aria-label="Features">
        <div className="max-w-marketing mx-auto px-6 w-full">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-14"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <span className="text-micro font-bold text-accent tracking-[0.12em] uppercase">Features</span>
            <h2 className="font-display text-h2-sm md:text-h2 text-charcoal mt-2 mb-3 font-bold tracking-tight leading-tight">
              Property software that handles it all
            </h2>
            <p className="text-body text-muted">
              Every tool you need, in one platform. No spreadsheets, no WhatsApp chases, no confusion.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Hero card — full-width top row */}
            <motion.div
              className="lg:col-span-3 bg-[#0B4F45] rounded-2xl p-8 md:p-10 text-white relative overflow-hidden flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}
            >
              <div className="max-w-xl">
                <span className="text-micro font-bold text-[#E79868] tracking-[0.12em] uppercase">Everything you need</span>
                <h3 className="font-display font-bold text-h3 md:text-h2-sm mt-2 mb-3 leading-tight text-white">
                  From payments to maintenance — fully automated.
                </h3>
                <p className="text-white/65 text-small leading-relaxed">One platform handles rent collection, tenant comms, maintenance, receipts, and reporting. No switching between tools.</p>
              </div>
              <button
                onClick={() => navigate('/features')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#0B4F45] font-bold text-sm hover:bg-white/90 transition-all cursor-pointer shrink-0"
              >
                See All Features <ArrowRight size={15} />
              </button>
              <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-[#C75B30]/15 rounded-full blur-3xl pointer-events-none" />
            </motion.div>

            {/* Feature cards — 3 columns × 2 rows = 6 cards, perfectly even */}
            {[
              { icon: FileText,       title: 'Easy Invoicing',       desc: 'Automate recurring invoices and get paid on time with instant PDF receipts for every transaction.' },
              { icon: LayoutDashboard, title: 'Portfolio Dashboard',  desc: 'View all your properties, units, and revenue in one unified screen. No spreadsheets needed.' },
              { icon: Bell,           title: 'Automated Reminders',   desc: 'Set rent reminders for every tenant automatically. Stop the awkward chasing calls for good.' },
              { icon: BarChart3,      title: 'Financial Analytics',   desc: 'Real-time cash flow charts, P&L reports, and occupancy metrics — investor-ready in one click.' },
              { icon: Wrench,         title: 'Maintenance Routing',   desc: 'Tenants submit issues with photos, you auto-assign vendors. Resolve problems in hours, not weeks.' },
              { icon: Shield,         title: 'Secure & Compliant',    desc: 'Bank-grade encryption and Paystack integration keeps every payment and data point protected.' },
            ].map((f, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-all group"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 + i * 0.07 }}
              >
                <div className="w-10 h-10 bg-warm rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#0B4F45]/10 transition-colors">
                  <f.icon className="text-[#0B4F45] w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-h4 text-charcoal mb-2">{f.title}</h3>
                <p className="text-small leading-relaxed text-muted">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          5. MANAGE ON THE GO — Mobile section
         ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24 bg-white" aria-label="Mobile management">
        <div className="max-w-marketing mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

            {/* Text */}
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <span className="text-micro font-bold text-accent tracking-[0.12em] uppercase">Mobile-First</span>
              <h2 className="font-display text-h2-sm md:text-h2 text-charcoal mt-2 mb-4 font-bold tracking-tight leading-tight">
                Manage on the go, from anywhere
              </h2>
              <p className="text-body text-body leading-relaxed mb-8 max-w-lg">
                Take your business anywhere. Our mobile-optimised platform puts you fully in control — track tenants, view payments, and handle maintenance requests directly from any device.
              </p>

              <div className="space-y-6">
                {[
                  { icon: Wallet, color: '#0B4F45', bg: '#E8F4F1', title: 'Instant Rent Tracking', desc: 'See who has paid and who hasn\'t the second the payment hits your account.' },
                  { icon: TrendingUp, color: '#C75B30', bg: '#FCECE7', title: 'Quick Financial Insights', desc: 'Understand cash flow instantly with visual charts optimised for mobile screens.' },
                  { icon: Bell, color: '#0B4F45', bg: '#E8F4F1', title: 'Push Notifications', desc: 'Get alerted the moment a payment comes in or a maintenance issue is raised.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-border" style={{ background: item.bg }}>
                      <item.icon className="w-4 h-4" style={{ color: item.color }} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-charcoal mb-1">{item.title}</h3>
                      <p className="text-body text-small leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Mobile mockup image */}
            <motion.div
              className="relative order-1 lg:order-2 flex justify-center"
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#0B4F45]/6 to-[#C75B30]/5 rounded-3xl blur-2xl pointer-events-none" />
              <img
                src={IMG_MOBILE}
                alt="Landlord managing properties on mobile phone"
                className="relative w-full max-w-[440px] rounded-2xl shadow-xl border border-border object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          6. HOW IT WORKS — 4 steps
         ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24 bg-warm" aria-label="How it works">
        <div className="max-w-marketing mx-auto px-6 w-full">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-14"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <span className="text-micro font-bold text-accent tracking-[0.12em] uppercase">Get Started In Minutes</span>
            <h2 className="font-display text-h2-sm md:text-h2 text-charcoal mt-2 mb-3 font-bold leading-tight">
              4 Steps to Effortless Management
            </h2>
            <p className="text-body text-muted">
              Our streamlined onboarding gets you up and running in under 5 minutes — no training required.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: UserPlus, num: '01', title: 'Register', desc: 'Create your account in under 2 minutes. No credit card required to start.', active: false },
              { icon: Building2, num: '02', title: 'Add Properties', desc: 'Add your units, set monthly rent, and upload key documents.', active: true },
              { icon: Mail, num: '03', title: 'Invite Tenants', desc: 'Send a unique link. Tenants onboard themselves securely.', active: false },
              { icon: TrendingUp, num: '04', title: 'Collect Rent', desc: 'Money flows directly to your account on time, every month.', active: false },
            ].map((step, i) => (
              <motion.div
                key={i}
                className={`rounded-2xl p-7 flex flex-col justify-between min-h-[220px] relative overflow-hidden shadow-sm border transition-all duration-300 ${step.active ? 'bg-[#0B4F45] text-white border-[#0B4F45]' : 'bg-white text-charcoal border-border hover:shadow-md'}`}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 * i }}
              >
                <span className={`absolute top-4 right-5 font-display font-black text-5xl leading-none select-none ${step.active ? 'text-white/10' : 'text-charcoal/8'}`}>
                  {step.num}
                </span>
                <div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 ${step.active ? 'bg-white/15' : 'bg-warm'}`}>
                    <step.icon className={`w-5 h-5 ${step.active ? 'text-white' : 'text-[#0B4F45]'}`} />
                  </div>
                  <h4 className="font-display font-bold text-h4 mb-2">{step.title}</h4>
                  <p className={`text-small leading-relaxed ${step.active ? 'text-white/75' : 'text-muted'}`}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          7. ANALYTICS — Reporting dashboard split
         ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24 bg-white" aria-label="Analytics">
        <div className="max-w-marketing mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

            {/* Copy */}
            <motion.div
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <span className="text-micro font-bold text-accent tracking-[0.12em] uppercase">Financial Intelligence</span>
              <h2 className="font-display text-h2-sm md:text-h2 text-charcoal mt-2 mb-4 font-bold tracking-tight leading-tight">
                Real-time analytics built for landlords
              </h2>
              <p className="text-body text-body leading-relaxed mb-8 max-w-lg">
                Get instant, investor-ready reports with one click. Track cash flow, occupancy rates, and maintenance costs without a spreadsheet in sight.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  { label: 'Rent Roll Reports', icon: FileSpreadsheet },
                  { label: 'Cash Flow Charts', icon: TrendingUp },
                  { label: 'Occupancy Tracking', icon: Building2 },
                  { label: 'Expense Breakdown', icon: BarChart3 },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl border border-border bg-warm">
                    <div className="w-8 h-8 rounded-lg bg-[#0B4F45]/10 flex items-center justify-center flex-shrink-0">
                      <item.icon size={15} className="text-[#0B4F45]" />
                    </div>
                    <span className="text-small font-semibold text-charcoal">{item.label}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate('/features')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#0B4F45] text-[#0B4F45] font-semibold text-sm hover:bg-[#0B4F45] hover:text-white transition-all cursor-pointer"
              >
                View Analytics Features <ArrowRight size={15} />
              </button>
            </motion.div>

            {/* Dashboard image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <div className="absolute -inset-6 bg-gradient-to-tl from-[#0B4F45]/6 to-[#C75B30]/4 rounded-3xl blur-2xl pointer-events-none" />
              <img
                src={IMG_ANALYTICS}
                alt="Landlord reviewing financial reports and analytics"
                className="relative w-full rounded-2xl shadow-lg border border-border object-cover aspect-[4/3]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          8. COMPARISON TABLE — RentFlow vs Old Way
         ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24 bg-warm" aria-label="Comparison">
        <div className="max-w-marketing mx-auto px-6 w-full">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <span className="text-micro font-bold text-accent tracking-[0.12em] uppercase">Why RentFlow</span>
            <h2 className="font-display text-h2-sm md:text-h2 text-charcoal mt-2 mb-3 font-bold">
              RentFlow vs. The Old Way
            </h2>
            <p className="text-body text-muted">
              The difference is in the speed and reliability of your operations.
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-3 bg-warm/80 border-b border-border px-6 py-4 text-micro font-bold text-charcoal uppercase tracking-wider">
                <div>Feature</div>
                <div className="text-muted">Old School (Spreadsheets)</div>
                <div className="text-[#0B4F45]">RentFlow Modern Stack</div>
              </div>
              {[
                { feature: 'Rent Collection',  old: 'Manual checks & bank logs', newVal: 'Automated Instant Payments' },
                { feature: 'Maintenance',       old: 'Sticky notes & WhatsApp', newVal: 'Real-time Kanban Tracking' },
                { feature: 'Reporting',         old: '3 days to export & pivot', newVal: '1-Click Investor Reports' },
                { feature: 'Late Rent Chasing', old: 'Awkward phone calls', newVal: 'Auto-reminders & alerts' },
                { feature: 'Total Efficiency',  old: 'Slow & error-prone', newVal: '10× Faster Automation' },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-3 px-6 py-4 border-b border-border last:border-0 text-small items-center">
                  <div className="font-bold text-charcoal">{row.feature}</div>
                  <div className="flex items-center gap-2 text-muted">
                    <XCircle size={14} className="text-red-400 flex-shrink-0" />
                    {row.old}
                  </div>
                  <div className="flex items-center gap-2 text-[#1E9E6A] font-semibold">
                    <CheckCircle2 size={14} className="flex-shrink-0" />
                    {row.newVal}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          9. INTEGRATIONS
         ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24 bg-white" aria-label="Integrations">
        <div className="max-w-marketing mx-auto px-6 w-full">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <span className="text-micro font-bold text-accent tracking-[0.12em] uppercase">Integrations</span>
            <h2 className="font-display text-h2-sm md:text-h2 text-charcoal mt-2 mb-3 font-bold tracking-tight">
              Works with your existing stack
            </h2>
            <p className="text-body text-muted max-w-xl mx-auto">
              Connect RentFlow to your favourite payment gateways and accounting software.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { icon: CreditCard,    title: 'Paystack',   desc: 'Secure payment processing and instant transfers.' },
              { icon: FileSpreadsheet, title: 'QuickBooks', desc: 'Sync transactions directly to accounting.' },
              { icon: Calculator,    title: 'Xero',       desc: 'Seamlessly reconcile bank statements.' },
              { icon: Wallet,        title: 'Monnify',    desc: 'Dedicated virtual accounts for tenants.' },
              { icon: DollarSign,    title: 'Flutterwave', desc: 'Global card payments and mobile money.' },
              { icon: MessageSquare, title: 'Slack',      desc: 'Real-time notifications for your team.' },
            ].map((integration, i) => (
              <motion.div
                key={i}
                className="bg-warm rounded-2xl p-5 border border-border shadow-sm hover:shadow-md transition-all group"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-border group-hover:bg-[#0B4F45]/8 transition-colors">
                    <integration.icon className="w-5 h-5 text-[#0B4F45]" />
                  </div>
                  <h3 className="font-display font-bold text-h4-sm text-charcoal">{integration.title}</h3>
                </div>
                <p className="text-small text-muted leading-relaxed">{integration.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          10. SECURITY — Dark card
         ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24 bg-warm" aria-label="Security">
        <div className="max-w-marketing mx-auto px-6 w-full">
          <motion.div
            className="bg-[#1B1F1D] rounded-3xl p-10 md:p-14 relative overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            {/* Glows */}
            <div className="absolute top-[-15%] right-[-8%] w-[500px] h-[500px] bg-[#0B4F45]/25 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-15%] left-[-8%] w-[350px] h-[350px] bg-[#C75B30]/20 rounded-full blur-[80px] pointer-events-none" />

            <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
                  <Shield className="w-4 h-4 text-[#0B4F45]" />
                  <span className="text-micro font-bold tracking-wider uppercase text-white/90">Enterprise Security</span>
                </div>
                <h2 className="font-display text-h3 md:text-h2-sm text-white mb-4 font-bold tracking-tight leading-tight">
                  Your data is fortified.
                </h2>
                <p className="text-white/65 text-body leading-relaxed mb-8 max-w-md">
                  Security isn't just a feature — it's our foundation. We employ the same protocols as major financial institutions to ensure your assets and data remain protected.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { icon: Lock, title: 'Bank-Grade Encryption', desc: '256-bit AES protection, all data in transit and at rest.' },
                    { icon: Shield, title: 'SOC2 Compliance', desc: 'Independently audited security controls and processes.' },
                    { icon: Globe, title: 'Global Redundancy', desc: 'Multi-region deployment with automated failover.' },
                    { icon: Activity, title: '99.99% Uptime SLA', desc: 'Guaranteed availability with real-time status monitoring.' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/8 transition-colors">
                      <item.icon className="text-[#0B4F45] w-5 h-5 mb-2" />
                      <h3 className="font-bold text-white text-small mb-1">{item.title}</h3>
                      <p className="text-white/55 text-micro leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right stat */}
              <div className="flex justify-center lg:justify-end">
                <div className="text-center bg-white/5 border border-white/15 rounded-3xl p-10 shadow-xl max-w-xs w-full">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#0B4F45] to-[#073A33] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(11,79,69,0.35)]">
                    <CheckCircle2 className="text-white w-9 h-9" />
                  </div>
                  <h3 className="font-display font-black text-5xl text-white mb-1">99.99%</h3>
                  <p className="text-white/80 font-bold text-small uppercase tracking-wider mb-3">Uptime SLA</p>
                  <p className="text-white/50 text-micro leading-relaxed">Global redundant infrastructure with automated failover.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          11. TESTIMONIALS
         ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24 bg-white" aria-label="Testimonials">
        <div className="max-w-marketing mx-auto px-6 w-full">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <span className="text-micro font-bold text-accent tracking-[0.12em] uppercase">Testimonials</span>
            <h2 className="font-display text-h2-sm md:text-h2 text-charcoal mt-2 mb-3 font-bold leading-tight">
              Landlords across Africa love RentFlow
            </h2>
            <p className="text-body text-muted">Real stories from landlords and tenants who made the switch.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl p-7 flex flex-col border border-border shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group cursor-default"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              >
                {/* Subtle top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0B4F45] via-[#C75B30] to-[#0B4F45] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Decorative large quote mark */}
                <div className="absolute top-4 right-5 font-display font-black text-[80px] leading-none text-[#0B4F45]/6 select-none pointer-events-none">
                  &ldquo;
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(t.stars)].map((_, si) => (
                    <Star key={si} size={13} className="text-[#C75B30] fill-[#C75B30]" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-body text-small leading-relaxed flex-1 mb-6 relative z-10">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="relative flex-shrink-0">
                    <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover border-2 border-[#0B4F45]/20" />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#1E9E6A] rounded-full border-2 border-white flex items-center justify-center">
                      <CheckCircle2 size={7} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-charcoal text-small">{t.name}</p>
                    <p className="text-[10px] font-semibold tracking-wider text-[#0B4F45] uppercase mt-0.5">{t.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          12. PRICING
         ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24 bg-warm" aria-label="Pricing">
        <div className="max-w-marketing mx-auto px-6 w-full">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <span className="text-micro font-bold text-accent tracking-[0.12em] uppercase">Pricing</span>
            <h2 className="font-display text-h2-sm md:text-h2 text-charcoal mt-2 mb-3 font-bold leading-tight">
              Simple, transparent pricing
            </h2>
            <p className="text-body text-muted">
              Start free, scale when you're ready. No hidden fees, no surprises.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={i}
                className={`rounded-2xl border relative flex flex-col overflow-hidden ${plan.isPopular ? 'md:-mt-4' : ''}`}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              >
                {plan.isPopular ? (
                  <>
                    {/* Popular banner */}
                    <div className="bg-[#C75B30] px-8 py-2 flex items-center justify-center gap-1.5">
                      <Zap size={11} className="text-white" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-white">Most Popular</span>
                    </div>
                    <div className="p-8 bg-[#0B4F45] flex flex-col flex-1 border-[#0B4F45] shadow-[0_24px_80px_rgba(11,79,69,0.35)]">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-[#C75B30]/10 rounded-full blur-3xl pointer-events-none" />
                      <div className="mb-6 relative z-10">
                        <h3 className="font-display font-bold text-h4 mb-1 text-white">{plan.name}</h3>
                        <p className="text-small mb-4 text-white/65">{plan.desc}</p>
                        <div className="flex items-end gap-1">
                          <span className="font-display font-black text-h2 leading-none text-white">{plan.price}</span>
                          {plan.interval && <span className="text-small mb-1 text-white/60">{plan.interval}</span>}
                        </div>
                      </div>
                      <ul className="space-y-3 mb-8 flex-1 relative z-10">
                        {plan.features.map((f, fi) => (
                          <li key={fi} className="flex items-center gap-2.5 text-small text-white/85">
                            <CheckCircle2 size={15} className="text-[#E79868]" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => navigate('/signup')}
                        className="relative z-10 w-full py-3.5 rounded-xl font-bold text-sm cursor-pointer transition-all bg-white text-[#0B4F45] hover:bg-white/90 shadow-[0_4px_14px_rgba(255,255,255,0.15)]"
                      >
                        {plan.cta}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="p-8 bg-white border-border shadow-sm hover:shadow-md transition-shadow flex flex-col flex-1">
                    <div className="mb-6">
                      <h3 className="font-display font-bold text-h4 mb-1 text-charcoal">{plan.name}</h3>
                      <p className="text-small mb-4 text-muted">{plan.desc}</p>
                      <div className="flex items-end gap-1">
                        <span className="font-display font-black text-h2 leading-none text-charcoal">{plan.price}</span>
                        {plan.interval && <span className="text-small mb-1 text-muted">{plan.interval}</span>}
                      </div>
                    </div>
                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.features.map((f, fi) => (
                        <li key={fi} className="flex items-center gap-2.5 text-small text-body">
                          <CheckCircle2 size={15} className="text-[#0B4F45]" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => navigate('/signup')}
                      className="w-full py-3 rounded-xl font-bold text-sm cursor-pointer transition-all bg-[#0B4F45] text-white hover:bg-[#073A33]"
                    >
                      {plan.cta}
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.p
            className="text-center text-small text-muted mt-8"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            All plans include a <strong className="text-charcoal">14-day free trial</strong>. No credit card required to start.
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          13. LATEST INSIGHTS — Blog previews
         ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24 bg-white" aria-label="Insights">
        <div className="max-w-marketing mx-auto px-6 w-full">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-micro font-bold text-accent tracking-[0.12em] uppercase">Resources</span>
              <h2 className="font-display text-h2-sm md:text-h2 text-charcoal mt-2 mb-2 font-bold tracking-tight leading-tight">
                Latest Insights
              </h2>
              <p className="text-body text-muted max-w-lg">
                Stay ahead of the market with property management guides and industry trends.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Link to="/blog" className="inline-flex items-center gap-1.5 text-[#0B4F45] font-bold text-small hover:underline">
                View all resources <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                category: 'Strategy',
                title: 'Maximising NOI in a High-Interest Environment',
                desc: '5 tactical shifts African landlords are making to protect portfolio yields this year.',
                img: IMG_BLOG_1,
                readTime: '5 min read',
              },
              {
                category: 'Automation',
                title: 'The Future of Zero-Touch Rent Collection',
                desc: 'How automation and real-time bank feeds are eliminating manual reconciliation.',
                img: IMG_BLOG_2,
                readTime: '4 min read',
              },
              {
                category: 'Guide',
                title: 'Tenant Onboarding Checklist for 2024',
                desc: 'A comprehensive guide to digital screening, lease signing, and tenant onboarding.',
                img: IMG_BLOG_3,
                readTime: '6 min read',
              },
            ].map((post, i) => (
              <motion.div
                key={i}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              >
                <div className="w-full aspect-[16/9] rounded-2xl mb-4 overflow-hidden bg-warm border border-border">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold text-[#0B4F45] tracking-wider uppercase px-2 py-0.5 bg-[#0B4F45]/8 rounded-full">{post.category}</span>
                  <span className="text-micro text-muted">{post.readTime}</span>
                </div>
                <h3 className="font-display font-bold text-charcoal text-h4-sm mb-1.5 leading-tight group-hover:text-[#0B4F45] transition-colors">
                  {post.title}
                </h3>
                <p className="text-small text-muted line-clamp-2">{post.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          14. FAQ
         ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24 bg-warm" aria-label="FAQ">
        <div className="max-w-marketing mx-auto px-6 w-full">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <span className="text-micro font-bold text-accent tracking-[0.12em] uppercase">FAQ</span>
            <h2 className="font-display text-h2-sm md:text-h2 text-charcoal mt-2 mb-3 font-bold tracking-tight">
              Common Questions
            </h2>
            <p className="text-body text-muted">
              Everything you need to know about RentFlow. Can't find the answer? Chat with our team.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm"
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              >
                <button
                  className="w-full flex justify-between items-center px-6 py-5 cursor-pointer group text-left"
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                >
                  <span className={`font-display font-bold text-body group-hover:text-[#0B4F45] transition-colors pr-4 ${openFaq === i ? 'text-[#0B4F45]' : 'text-charcoal'}`}>
                    {faq.q}
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${openFaq === i ? 'bg-[#0B4F45] rotate-45' : 'bg-warm'}`}>
                    <span className={`font-bold text-lg leading-none mt-[-1px] ${openFaq === i ? 'text-white' : 'text-[#0B4F45]'}`}>+</span>
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-small text-muted leading-relaxed border-t border-border">
                    <p className="pt-4">{faq.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          15. FINAL CTA — Newsletter / call to action
         ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24 bg-white" aria-label="Call to action">
        <div className="max-w-marketing mx-auto px-6 w-full">
          <motion.div
            className="bg-[#0B4F45] rounded-3xl px-10 py-16 md:px-16 md:py-20 text-center text-white relative overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          >
            {/* Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#073A33]/80 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-[-20%] right-[-10%] w-[350px] h-[350px] bg-[#C75B30]/15 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="text-[#E79868] text-micro font-bold tracking-[0.15em] uppercase mb-4 block">
                Stop Tracking Rent in Notebooks
              </span>
              <h2 className="font-display font-bold text-h3 md:text-h2-sm text-white mb-5 leading-tight">
                Ready to transform your property management?
              </h2>
              <p className="text-white/70 text-body mb-8 leading-relaxed">
                Join thousands of modern landlords across Africa using RentFlow to save time, reduce stress, and get paid faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => navigate('/signup')}
                  className="px-8 py-3.5 rounded-xl bg-[#C75B30] hover:bg-[#A94A24] text-white font-bold text-sm cursor-pointer transition-all shadow-lg active:scale-[0.98]"
                >
                  Start for Free — No Credit Card
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="px-8 py-3.5 rounded-xl border-2 border-white/25 text-white hover:bg-white/10 font-semibold text-sm cursor-pointer transition-all backdrop-blur-md"
                >
                  Talk to Sales
                </button>
              </div>
              <p className="text-white/40 text-micro mt-5">Free plan available · No credit card required · Cancel anytime</p>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;
