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
      
      {/* ─── Dribbble-Style Hero (100vh) ─── */}
      <section 
        className="relative bg-charcoal overflow-hidden py-12 lg:py-0 lg:min-h-[calc(100vh-72px)] flex flex-col snap-start scroll-mt-[72px]" 
        aria-label="Hero"
      >
        {/* Subtle background accents */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#C75B30]/15 blur-[120px] rounded-full -translate-x-1/3 translate-y-1/3" />
        </div>
        
        <div className="max-w-marketing mx-auto px-6 w-full relative z-10 my-auto lg:py-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="max-w-xl">
              <motion.div 
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-[11px] font-medium tracking-wide mb-6"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Next-Gen Property Management
              </motion.div>
              
              <motion.h1 
                className="font-display text-white mb-5 leading-[1.1] tracking-tight font-bold"
                style={{ fontSize: 'clamp(36px, 4.5vw, 52px)' }}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              >
                Collect Rent,<br />
                Manage Tenants, and<br />
                Properties in One<br />
                Place
              </motion.h1>
              
              <motion.p 
                className="text-white/70 text-sm md:text-base mb-8 leading-relaxed max-w-lg"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              >
                Replace notebooks, spreadsheets, and WhatsApp with a modern rent management platform built for landlords and tenants. High performance tooling for clarity amidst high-density data.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 mb-10"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              >
                <Button 
                  size="lg" 
                  className="rounded-full px-8 bg-primary hover:bg-primary-dark text-white shadow-xl shadow-primary/20"
                  onClick={() => navigate('/signup')}
                >
                  Get Started
                </Button>
                <Button 
                  size="lg" 
                  variant="whiteOutline"
                  className="rounded-full px-8 border-white/20 text-white hover:bg-white/10"
                  onClick={() => navigate('/services')}
                >
                  Explore Services
                </Button>
              </motion.div>

              {/* Trusted By inline badge */}
              <motion.div 
                className="flex flex-col gap-3"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              >
                <span className="text-white/40 text-[10px] uppercase tracking-widest font-semibold">Trusted by</span>
                <div className="flex flex-wrap gap-6 items-center">
                  {['ShelterHQ', 'LagosLiving', 'TerraFirma', 'Oakwood'].map((logo, idx) => (
                    <span key={idx} className="text-white/60 font-display font-bold text-sm tracking-tight opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                      {logo}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Hero Graphic - Dribbble Composition */}
            <div className="relative w-full max-h-[400px] aspect-[4/3] flex items-center justify-center mt-10 lg:mt-0">
              
              {/* Main Rounded Image */}
              <motion.div 
                className="relative z-10 w-[85%] h-[85%] rounded-[30px] overflow-hidden shadow-2xl"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200" 
                  alt="Modern luxury property"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-[3s] ease-out"
                />
              </motion.div>

              {/* Floating Badge 1 - Top Left */}
              <motion.div 
                className="absolute top-[0%] left-[0%] z-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-xl flex flex-col gap-1 min-w-[140px]"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              >
                <p className="text-white/60 text-[10px] uppercase font-medium tracking-wide">Active Properties</p>
                <p className="text-white font-display font-bold text-2xl">1,425 Units</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                    <Building2 className="text-primary" size={12} />
                  </div>
                  <span className="text-white/80 text-[11px] font-medium">+12 this week</span>
                </div>
              </motion.div>

              {/* Floating Badge 2 - Bottom Right */}
              <motion.div 
                className="absolute bottom-[5%] right-[-5%] z-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-3 shadow-xl flex items-center gap-3"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              >
                <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center border border-success/30">
                  <CheckCircle className="text-success" size={20} />
                </div>
                <div>
                  <p className="text-white font-display font-bold text-sm">Rent Secured</p>
                  <p className="text-white/60 text-[10px] uppercase tracking-wider">100% on-time</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Manage on the go ─── */}
      <section className="py-16 lg:py-24 bg-warm" aria-label="Mobile Management">
        <div className="max-w-marketing mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image Left */}
            <motion.div 
              className="relative w-full aspect-[4/5] max-h-[600px] flex justify-center"
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              {/* Mockup Container */}
              <div className="relative w-[280px] md:w-[320px] bg-charcoal rounded-[40px] border-[12px] border-charcoal shadow-2xl overflow-hidden shrink-0 flex flex-col">
                {/* Dynamic Island Notch */}
                <div className="absolute top-0 inset-x-0 h-6 bg-charcoal rounded-b-2xl w-1/3 mx-auto z-20" />
                
                {/* App UI Simulation */}
                <div className="bg-white w-full h-full flex flex-col relative z-10 flex-1">
                  <div className="bg-primary pt-14 pb-8 px-6 text-white text-center">
                    <p className="text-white/70 text-[10px] uppercase tracking-wider mb-1 font-medium">Total Balance</p>
                    <p className="font-display text-3xl font-bold">₦4,250,000</p>
                  </div>
                  <div className="flex-1 p-5 bg-warm flex flex-col gap-3">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-border">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-charcoal">Recent Rent</span>
                        <span className="text-[10px] text-success bg-success/10 px-2 py-0.5 rounded font-bold">Paid</span>
                      </div>
                      <p className="text-lg font-bold text-charcoal">₦850,000</p>
                      <p className="text-[10px] text-body mt-1">Adebayo - Unit 4B</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-border opacity-50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-charcoal">Maintenance</span>
                        <span className="text-[10px] text-accent bg-accent/10 px-2 py-0.5 rounded font-bold">Pending</span>
                      </div>
                      <p className="text-lg font-bold text-charcoal">-₦45,000</p>
                      <p className="text-[10px] text-body mt-1">Plumbing - Unit 2A</p>
                    </div>
                  </div>
                  <div className="h-16 bg-white border-t border-border flex justify-around items-center px-4 shrink-0 pb-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"><LayoutDashboard size={14} className="text-primary"/></div>
                    <div className="w-8 h-8 rounded-full bg-warm" />
                    <div className="w-8 h-8 rounded-full bg-warm" />
                    <div className="w-8 h-8 rounded-full bg-warm" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Text Right */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-charcoal mb-4 leading-tight font-bold">
                Manage on the go
              </h2>
              <p className="text-body text-sm md:text-base leading-relaxed mb-10 max-w-md">
                Take your business anywhere. Our mobile-optimized platform puts you in control, with easy tracking of your tenants and payments, direct from any device.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#E8F3F1] flex items-center justify-center shrink-0 shadow-sm border border-[#D1E8E4]">
                    <Wallet className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-charcoal mb-1 text-base md:text-lg">Instant Rent Tracking</h3>
                    <p className="text-body text-xs md:text-sm leading-relaxed">See who has paid and who hasn't the second the payment hits your account.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFF4ED] flex items-center justify-center shrink-0 shadow-sm border border-[#FFE8D6]">
                    <TrendingUp className="text-[#C75B30]" size={20} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-charcoal mb-1 text-base md:text-lg">Quick Financial Insights</h3>
                    <p className="text-body text-xs md:text-sm leading-relaxed">Understand cash flow instantly with visual charts optimized for mobile screens.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 4 Steps to Effortless Management ─── */}
      <section className="py-16 lg:py-24 bg-white border-t border-border" aria-label="4 Steps">
        <div className="max-w-marketing mx-auto px-6">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-charcoal mb-3 font-bold">
              4 Steps to Effortless Management
            </h2>
            <p className="text-body text-sm md:text-base">
              Our proven onboarding completely eliminates the stress of transitioning. It's fast, simple, and straightforward.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { num: '01', title: 'Connect', desc: 'Add your properties and sync your bank account.', active: false },
              { num: '02', title: 'Automate', desc: 'Set rent amounts, cycles, and late fees.', active: true },
              { num: '03', title: 'Monitor', desc: 'Invite tenants. They onboard and start paying.', active: false },
              { num: '04', title: 'Scale', desc: 'Grow your portfolio with perfect records.', active: false }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                className={`rounded-[24px] p-6 lg:p-8 flex flex-col justify-between min-h-[240px] transition-all duration-300 ${
                  step.active ? 'bg-primary text-white shadow-2xl lg:scale-110 relative z-10' : 'bg-warm text-charcoal border border-border hover:bg-white hover:shadow-lg'
                }`}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              >
                <div className="flex justify-between items-start mb-8">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${step.active ? 'bg-white/10 border border-white/20' : 'bg-white border border-border shadow-sm'}`}>
                    {idx === 0 && <UserPlus size={20} className={step.active ? 'text-white' : 'text-primary'} />}
                    {idx === 1 && <Wrench size={20} className={step.active ? 'text-white' : 'text-primary'} />}
                    {idx === 2 && <BarChart3 size={20} className={step.active ? 'text-white' : 'text-primary'} />}
                    {idx === 3 && <TrendingUp size={20} className={step.active ? 'text-white' : 'text-primary'} />}
                  </div>
                  <span className={`font-display font-bold text-xl ${step.active ? 'text-white/40' : 'text-body/30'}`}>{step.num}</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg mb-2">{step.title}</h3>
                  <p className={`text-sm leading-relaxed ${step.active ? 'text-white/80' : 'text-body'}`}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Engineered for Operations ─── */}
      <section className="py-16 lg:py-24 bg-warm" aria-label="Engineered for Operations">
        <div className="max-w-marketing mx-auto px-6">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-charcoal mb-3 font-bold">
              Engineered for Operations
            </h2>
            <p className="text-body text-sm md:text-base">
              A comprehensive suite to power your property operations and simplify management at scale.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {[
              { icon: Building2, title: 'Property Management', desc: 'Centralize your entire portfolio. Track units, leases, tenant information, and documents securely in one unified, cloud-based database.' },
              { icon: UserPlus, title: 'Tenant Management', desc: 'Automate onboarding, digital lease signing, and communication. Keep all messages, issues, and tenant histories in one location.' },
              { icon: CreditCard, title: 'Online Rent Payments', desc: 'Empower tenants to pay via bank transfer or integrated gateways. Automatically reconcile payments to units in real-time.' },
              { icon: FileText, title: 'Automated Receipts', desc: 'Instantly generate and email professional receipts upon payment confirmation. Eliminate manual data entry and save hours.' },
              { icon: Wrench, title: 'Maintenance Requests', desc: 'A dedicated portal for tenants to submit issues with photos. Assign vendors, track progress, and approve invoices seamlessly.' },
              { icon: BarChart3, title: 'Financial Reporting', desc: 'Get real-time insights into cash flow, rent rolls, P&L, and more with our automated accounting explicitly built for real estate.' }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                className="bg-white rounded-[20px] p-6 lg:p-8 border border-border shadow-sm hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              >
                <div className="w-10 h-10 rounded-xl bg-warm border border-border flex items-center justify-center mb-6">
                  <feature.icon size={18} className="text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2 text-charcoal">{feature.title}</h3>
                <p className="text-body text-xs md:text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Visual Maintenance Routing ─── */}
      <section className="py-16 lg:py-24 bg-white" aria-label="Maintenance">
        <div className="max-w-marketing mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Box */}
            <motion.div 
              className="bg-warm rounded-[32px] p-8 lg:p-12 overflow-hidden relative"
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-charcoal mb-4 font-bold leading-tight">
                Visual Maintenance Routing
              </h2>
              <p className="text-body text-sm md:text-base leading-relaxed mb-10 max-w-sm">
                Drag-and-drop workflow builder. Set up rules and triggers to auto-assign maintenance issues.
              </p>

              {/* UI Mockup boxes */}
              <div className="flex flex-col gap-4 relative z-10">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-border max-w-[80%] flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-accent"></div>
                  <div>
                    <p className="text-xs font-bold text-charcoal">Leaking pipe in Kitchen</p>
                    <p className="text-[10px] text-body">Unit 4B - Urgent priority</p>
                  </div>
                </div>
                <div className="w-px h-6 bg-border ml-10"></div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-border max-w-[80%] flex items-center gap-3 ml-8">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <div>
                    <p className="text-xs font-bold text-charcoal">Assign to Plumber (Ade)</p>
                    <p className="text-[10px] text-body">Auto-routed rule #3</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Cards */}
            <div className="flex flex-col gap-4">
              <motion.div 
                className="bg-primary rounded-[24px] p-8 text-white shadow-xl relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
                <h3 className="font-display font-bold text-xl mb-2 relative z-10">Auto-routing</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-6 relative z-10 max-w-sm">
                  Set logic to assign vendors automatically based on issue category or unit.
                </p>
                <div className="flex items-center gap-2 text-white font-bold text-sm bg-white/10 w-max px-4 py-2 rounded-full border border-white/20 relative z-10">
                  <Wrench size={16} /> Assign vendor
                </div>
              </motion.div>

              <motion.div 
                className="bg-[#C75B30] rounded-[24px] p-8 text-white shadow-xl"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              >
                <h3 className="font-display font-bold text-xl mb-2">Zero Service Motion</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-4 max-w-sm">
                  Tenants and vendors handle the workflow independently. You just review and approve.
                </p>
                <div className="flex items-center text-white/90 text-sm font-bold gap-2 cursor-pointer hover:underline">
                  Read API <ArrowRight size={14} />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Works with your existing stack ─── */}
      <section className="py-16 lg:py-24 bg-white" aria-label="Integrations">
        <div className="max-w-marketing mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-charcoal mb-3 font-bold">
              Works with your existing stack
            </h2>
            <p className="text-body text-sm md:text-base max-w-xl mx-auto mb-12">
              Connect RentFlow to your favorite accounting and payment gateways.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: 'Paystack', desc: 'Secure payment processing and instant bank transfers.' },
              { title: 'QuickBooks', desc: 'Sync all transactions directly to your accounting software.' },
              { title: 'Xero', desc: 'Seamlessly reconcile bank statements and rent payments.' },
              { title: 'Monnify', desc: 'Dedicated virtual accounts for every single tenant.' }
            ].map((integration, idx) => (
              <motion.div 
                key={idx}
                className="bg-white rounded-2xl p-6 border border-border shadow-sm flex flex-col items-center text-center hover:shadow-md transition-all"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              >
                <div className="w-12 h-12 bg-warm rounded-full flex items-center justify-center mb-4 border border-border">
                  <span className="font-bold text-primary font-display">{integration.title[0]}</span>
                </div>
                <h3 className="font-display font-bold text-sm mb-1 text-charcoal">{integration.title}</h3>
                <p className="text-[11px] md:text-xs text-body leading-relaxed">{integration.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RentFlow vs. The Old Way ─── */}
      <section className="py-16 lg:py-24 bg-white" aria-label="Comparison">
        <div className="max-w-marketing mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-charcoal mb-3 font-bold">
              RentFlow vs. The Old Way
            </h2>
            <p className="text-body text-sm md:text-base">
              The difference between manual chaos and streamlined operations.
            </p>
          </motion.div>

          <motion.div 
            className="bg-warm border border-border rounded-2xl overflow-hidden shadow-sm"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <div className="grid grid-cols-3 bg-white border-b border-border p-4 text-xs md:text-sm font-bold text-charcoal/60 uppercase tracking-wider">
              <div>Feature</div>
              <div>The Old Way</div>
              <div className="text-primary font-bold">RentFlow</div>
            </div>
            <div className="divide-y divide-border">
              {[
                { feature: 'Rent Collection', old: 'Manual tracking and cash', new: 'Automated digital payments' },
                { feature: 'Maintenance', old: 'Phone calls and lost messages', new: 'Tracked visual ticketing' },
                { feature: 'Reporting', old: 'Manual data entry, error prone', new: '1-click real-time P&L' },
                { feature: 'Tenant Portal', old: 'Non-existent', new: 'Full self-serve access' },
                { feature: 'Data Privacy', old: 'Scattered records', new: 'Bank-level encryption' }
              ].map((row, idx) => (
                <div key={idx} className="grid grid-cols-3 p-4 items-center gap-4 hover:bg-white transition-colors">
                  <div className="font-bold text-charcoal text-xs md:text-sm">{row.feature}</div>
                  <div className="flex items-center gap-2 text-body text-xs md:text-sm">
                    <div className="w-4 h-4 rounded-full bg-accent/10 flex items-center justify-center shrink-0 text-accent font-bold text-[10px]">✕</div>
                    <span>{row.old}</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary font-bold text-xs md:text-sm">
                    <div className="w-4 h-4 rounded-full bg-success/20 flex items-center justify-center shrink-0 text-success font-bold text-[10px]">✓</div>
                    <span>{row.new}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Your data, fortified ─── */}
      <section className="py-16 lg:py-24 bg-white" aria-label="Security">
        <div className="max-w-marketing mx-auto px-6">
          <motion.div 
            className="bg-warm rounded-[32px] p-8 lg:p-16 border border-border/50 shadow-sm"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-charcoal mb-4 font-bold leading-tight">
                  Your data, fortified
                </h2>
                <p className="text-body text-sm md:text-base leading-relaxed mb-8">
                  Security is our baseline. All your sensitive information is encrypted using industry-standard protocols. We utilize bank-grade security to ensure everything is strictly confidential and fully protected.
                </p>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Shield className="text-primary mb-3" size={24} />
                    <h3 className="font-bold text-charcoal text-sm mb-1">Bank-Grade Encryption</h3>
                    <p className="text-body text-xs">Your data is encrypted at rest and in transit using AES-256 standards.</p>
                  </div>
                  <div>
                    <CheckCircle className="text-primary mb-3" size={24} />
                    <h3 className="font-bold text-charcoal text-sm mb-1">SOC2 Compliance</h3>
                    <p className="text-body text-xs">Our infrastructure meets the highest security and compliance requirements.</p>
                  </div>
                </div>
              </div>

              {/* Right Side Card */}
              <div className="flex justify-center lg:justify-end">
                <div className="bg-white rounded-[24px] p-8 border border-border shadow-xl w-full max-w-sm text-center">
                  <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
                    <Shield className="text-white" size={28} />
                  </div>
                  <h3 className="font-display font-bold text-lg text-charcoal mb-2">Highly Secure</h3>
                  <p className="text-body text-xs">Your data is safe and protected 24/7.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="py-8 lg:py-0 lg:min-h-[calc(100vh-72px)] flex flex-col bg-white snap-start scroll-mt-[72px]" aria-label="Testimonials">
        <div className="max-w-marketing mx-auto px-6 text-center w-full my-auto">
          <motion.h2 
            className="font-display text-xl md:text-2xl lg:text-3xl text-charcoal mb-4 max-w-2xl mx-auto leading-tight"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            Clients trust us and our exclusive service
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-3 text-left mt-6">
            {testimonials.map((t, idx) => (
              <motion.div 
                key={idx}
                className="relative bg-[#1A1D1C] rounded-2xl p-5 flex flex-col justify-between min-h-[200px] overflow-hidden border border-[#272B2A] shadow-2xl"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              >
                {/* Subtle Hexagon Pattern Background */}
                <div 
                  className="absolute inset-0 opacity-[0.03] pointer-events-none"
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
                  <p className="text-[#a0a3a2] text-xs md:text-sm leading-relaxed font-body">
                    {t.quote}
                  </p>
                </div>

                <div className="relative z-10 flex items-center gap-3 mt-auto pt-3 border-t border-white/[0.08]">
                  <div className="w-8 h-8 rounded-full bg-charcoal overflow-hidden shrink-0 border border-transparent">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover grayscale opacity-90" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-[11px]">{t.name}</p>
                    <p className="text-[9px] font-semibold tracking-widest text-[#10b981] uppercase mt-0.5">{t.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Latest Insights ─── */}
      <section className="py-16 lg:py-24 bg-white" aria-label="Insights">
        <div className="max-w-marketing mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-charcoal mb-2 font-bold">
                Latest Insights
              </h2>
              <p className="text-body text-sm md:text-base max-w-lg">
                Stay updated with the latest in property management, guides, and industry trends.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="mt-4 md:mt-0">
              <Link to="/blog" className="text-primary font-bold text-sm hover:underline flex items-center gap-2">
                View all articles <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { category: 'GUIDES', title: 'Maximizing ROI on Multi-Family Developments', date: 'Oct 12, 2023', gradient: 'from-[#0B4F45] to-[#1a2f2b]' },
              { category: 'INDUSTRY', title: 'The Future of Real Estate PropTech in 2024', date: 'Oct 05, 2023', gradient: 'from-[#C75B30] to-[#E8A365]' },
              { category: 'TIPS', title: 'Tenant Onboarding Checklists for Success', date: 'Sep 28, 2023', gradient: 'from-[#2A9D8F] to-[#10b981]' }
            ].map((post, idx) => (
              <motion.div 
                key={idx}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              >
                <div className={`w-full aspect-[3/2] rounded-2xl mb-4 overflow-hidden bg-gradient-to-br ${post.gradient} shadow-md group-hover:shadow-xl transition-all duration-500`}>
                  {/* Abstract blur effect for the image placeholder */}
                  <div className="w-full h-full bg-white/10 backdrop-blur-3xl transform group-hover:scale-110 transition-transform duration-700"></div>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-bold text-primary tracking-wider uppercase px-2 py-0.5 bg-primary/10 rounded">{post.category}</span>
                  <span className="text-[10px] text-body">{post.date}</span>
                </div>
                <h3 className="font-display font-bold text-charcoal text-lg group-hover:text-primary transition-colors leading-tight">
                  {post.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Common Questions ─── */}
      <section className="py-16 lg:py-24 bg-warm" aria-label="FAQ">
        <div className="max-w-marketing mx-auto px-6">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-charcoal mb-3 font-bold">
              Common Questions
            </h2>
            <p className="text-body text-sm md:text-base">
              Find out how RentFlow can streamline your workflow.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div 
                key={idx}
                className="bg-white rounded-2xl p-5 lg:p-6 border border-border shadow-sm"
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              >
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-display font-bold text-charcoal text-base md:text-lg">{faq.q}</h3>
                  <div className="w-6 h-6 rounded-full bg-warm flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold leading-none mt-[-2px]">+</span>
                  </div>
                </div>
                {idx === 0 && (
                  <p className="text-body text-sm mt-3 leading-relaxed border-t border-border pt-3">
                    {faq.a}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="py-16 lg:py-24 bg-white" aria-label="Call to Action">
        <div className="max-w-marketing mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-4 leading-tight tracking-tight max-w-3xl mx-auto">
              Stop Tracking Rent in Notebooks.
            </h2>
            <p className="text-body text-base md:text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of modern landlords across Africa using RentFlow to save time, reduce stress, and grow their portfolios.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full px-8 bg-charcoal hover:bg-black text-white shadow-xl">
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 border-border text-charcoal hover:bg-warm">
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;
