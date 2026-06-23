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
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#C75B30]/15 blur-[120px] rounded-full -translate-x-1/3 translate-y-1/3" />
        </div>
        
        <div className="max-w-marketing mx-auto px-6 w-full relative z-10 my-auto lg:py-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-[11px] font-medium tracking-wide mb-4">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Next-Gen Property Management
              </div>
              
              <h1 
                className="font-display text-white mb-4 leading-[1.1] tracking-tight"
                style={{ fontSize: 'clamp(38px, 4.5vw, 52px)' }}
              >
                Collect Rent,<br />
                Manage Tenants, and<br />
                Properties in One<br />
                Place
              </h1>
              
              <p className="text-white/70 text-sm md:text-base mb-6 leading-relaxed max-w-lg">
                Replace notebooks, spreadsheets, and WhatsApp with a modern rent management platform built for landlords and tenants. High performance tooling for clarity amidst high-density data.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Button 
                  size="lg" 
                  className="rounded-full px-8 bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20"
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
              </div>

              {/* Trusted By inline badge */}
              <div className="flex items-center gap-4">
                <span className="text-white/40 text-[10px] uppercase tracking-widest font-semibold">Trusted by</span>
                <div className="flex gap-4">
                  <span className="text-white/60 font-display font-bold text-sm tracking-tight opacity-70">ShelterHQ</span>
                  <span className="text-white/60 font-display font-bold text-sm tracking-tight opacity-70">LagosLiving</span>
                  <span className="text-white/60 font-display font-bold text-sm tracking-tight opacity-70">TerraFirma</span>
                </div>
              </div>
            </div>

            {/* Right Hero Graphic - Dribbble Composition */}
            <div className="relative w-full max-h-[360px] md:max-h-[420px] aspect-[4/3] flex items-center justify-center mt-10 lg:mt-0">
              {/* Subtle Image Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/30 blur-[120px] rounded-full" />
              
              {/* Main Rounded Image */}
              <div className="relative z-10 w-[80%] h-[80%] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200" 
                  alt="Modern luxury property"
                  className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-[3s] ease-out"
                />
                {/* Internal gradient to make badges pop */}
                <div className="absolute inset-0 bg-gradient-to-tr from-charcoal/90 via-transparent to-transparent opacity-80" />
              </div>

              {/* Floating Badge 1 - Top Right */}
              <motion.div 
                className="absolute top-[5%] right-[0%] z-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              >
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                  <Building2 className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-white/60 text-[11px] font-medium uppercase tracking-wider mb-0.5">Active Properties</p>
                  <p className="text-white font-display font-bold text-xl">1,425 Units</p>
                </div>
              </motion.div>

              {/* Floating Badge 2 - Bottom Left */}
              <motion.div 
                className="absolute bottom-[10%] left-[0%] z-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              >
                <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center border border-success/30">
                  <CheckCircle className="text-success" size={24} />
                </div>
                <div>
                  <p className="text-white/60 text-[11px] font-medium uppercase tracking-wider mb-0.5">Rent Collected</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-white font-display font-bold text-2xl">+₦4.2M</p>
                    <span className="text-success text-[10px] font-bold bg-success/10 px-1.5 py-0.5 rounded">↑ 12%</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Bento Box Features ─── */}
      <section className="py-8 lg:py-0 lg:min-h-[calc(100vh-72px)] flex flex-col bg-warm snap-start scroll-mt-[72px]" aria-label="Features Bento">
        <div className="max-w-marketing mx-auto px-6 w-full my-auto lg:py-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            
            {/* Hero Bento Box (Dark) */}
            <motion.div 
              className="lg:col-span-2 bg-charcoal rounded-2xl p-5 lg:p-6 text-white relative overflow-hidden flex flex-col justify-between min-h-[220px]"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            >
              <div className="relative z-10 max-w-lg">
                <h2 className="font-display text-xl md:text-2xl lg:text-3xl mb-2 leading-tight text-white font-bold">
                  Property software that handles it all.
                </h2>
                <Button variant="primary" className="bg-primary hover:bg-primary-dark text-white rounded-full px-6 py-3 text-sm h-auto shadow-xl" rightIcon={<ArrowRight size={18}/>}>
                  SEE ALL FEATURES
                </Button>
              </div>
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-tl from-primary/50 to-transparent rounded-tl-full blur-3xl" />
            </motion.div>

            {/* Top Right Box */}
            <motion.div 
              className="bg-white rounded-2xl p-5 lg:p-6 text-charcoal border border-border flex flex-col justify-between min-h-[180px]"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            >
              <div className="w-10 h-10 bg-warm rounded-xl flex items-center justify-center mb-3">
                <FileText size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm md:text-base mb-1">Easy Invoicing & Receipts</h3>
                <p className="text-body text-[11px] md:text-xs leading-relaxed">Automate recurring invoices and save time. Get paid on time with instant PDF generation.</p>
              </div>
            </motion.div>

            {/* Bottom 3 Boxes */}
            {bentoFeatures.slice(1).map((feature, idx) => (
              <motion.div 
                key={idx}
                className="bg-white rounded-2xl p-5 lg:p-6 border border-border min-h-[180px] flex flex-col justify-between shadow-sm hover:shadow-md transition-all group"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + (idx * 0.1) }}
              >
                <div className="w-10 h-10 bg-warm rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <feature.icon size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm md:text-base mb-1">{feature.title}</h3>
                  <p className="text-body text-[11px] md:text-xs leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* ─── Split Section 1 ─── */}
      <section className="py-8 lg:py-0 lg:min-h-[calc(100vh-72px)] flex flex-col bg-white snap-start scroll-mt-[72px]" aria-label="Landlord Features">
        <div className="max-w-marketing mx-auto px-6 w-full my-auto">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
            {/* Image Box */}
            <motion.div 
              className="relative w-full h-[240px] md:h-[320px] lg:h-[45vh] lg:max-h-[360px] bg-warm rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border border-charcoal/5"
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" 
                alt="Modern property" 
                className="absolute inset-0 object-cover w-full h-full opacity-90 transition-transform hover:scale-105 duration-[2s] ease-out"
              />
            </motion.div>

            {/* Text Box */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl md:text-3xl text-charcoal mb-2 leading-tight">
                Manage all your properties in one place
              </h2>
              <p className="text-body text-xs md:text-sm mb-4 leading-relaxed max-w-lg">
                Centralize your operations. From tenant communication to tracking utility bills, RentFlow provides a single unified dashboard to monitor your real estate portfolio, minimizing manual data entry and human error.
              </p>
              <ul className="space-y-2 lg:space-y-3">
                {['No hidden setup fees.', '100% data security. Guaranteed.', 'No training or maintenance needed.'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs md:text-sm text-charcoal font-medium">
                    <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <CheckCircle size={12} className="text-primary" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Split Section 2 ─── */}
      <section className="py-8 lg:py-0 lg:min-h-[calc(100vh-72px)] flex flex-col bg-warm snap-start scroll-mt-[72px]" aria-label="Tenant Features">
        <div className="max-w-marketing mx-auto px-6 w-full my-auto">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
            {/* Text Left */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <h2 className="font-display text-2xl md:text-3xl text-charcoal mb-2 leading-tight">
                Pay rent, on time every time, effortlessly
              </h2>
              <p className="text-body text-xs md:text-sm mb-4 leading-relaxed max-w-lg">
                Empower your tenants with flexible payment options. Avoid late fees and penalties, and capture every early payment discount with automated reminders, flexible payment gateways, and immediate PDF receipts.
              </p>
              <Button 
                variant="outline" 
                className="border-charcoal text-charcoal hover:bg-charcoal hover:text-white rounded-full px-5 py-2 text-xs md:text-sm h-auto"
                rightIcon={<ArrowRight size={14}/>}
              >
                LEARN MORE
              </Button>
            </motion.div>

            {/* Image Box */}
            <motion.div 
              className="relative order-1 lg:order-2 w-full h-[240px] md:h-[320px] lg:h-[45vh] lg:max-h-[360px] bg-white rounded-2xl lg:rounded-3xl border border-border overflow-hidden shadow-2xl"
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800" 
                alt="Pay rent seamlessly" 
                className="absolute inset-0 object-cover w-full h-full opacity-90 transition-transform hover:scale-105 duration-[2s] ease-out"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Timeline ─── */}
      <section className="relative py-8 lg:py-0 lg:min-h-[calc(100vh-72px)] flex flex-col bg-charcoal text-white overflow-hidden snap-start scroll-mt-[72px]" aria-label="Steps Timeline">
        <div className="max-w-marketing mx-auto px-6 relative z-10 w-full my-auto">
          <motion.div 
            className="max-w-3xl mb-4 lg:mb-6"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <h2 className="font-display text-xl md:text-2xl lg:text-3xl mb-1 leading-tight text-white">
              The 4 steps route to better rental management. <span className="text-white/50">Smarter renting for faster growth.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-3 lg:gap-4 mt-4 lg:mt-6">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                className="bg-[#1A1D1C] rounded-2xl p-4 lg:p-5 text-white border border-white/5 shadow-xl relative"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * index }}
              >
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mb-3 lg:mb-4">
                  <span className="text-primary font-display font-bold text-xs lg:text-sm">{step.num}</span>
                </div>
                <h3 className="font-display text-base md:text-lg mb-1">{step.title}</h3>
                <p className="text-white/60 text-xs lg:text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
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

      {/* ─── Footer Section CTA ─── */}
      <section className="py-12 lg:py-0 lg:min-h-[calc(100vh-72px)] flex flex-col bg-warm snap-start scroll-mt-[72px]" aria-label="Call to Action">
        <div className="max-w-marketing mx-auto px-6 w-full my-auto lg:py-8">
          <div className="bg-gradient-to-br from-charcoal to-[#1A1D1C] rounded-2xl p-6 lg:p-8 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-display text-2xl md:text-4xl mb-2 leading-tight text-white">
                Ready to transform your property management?
              </h2>
              <p className="text-sm md:text-base text-white/80 mb-6 leading-relaxed">
                Join thousands of modern landlords across Africa using RentFlow to save time, reduce stress, and get paid faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" className="rounded-full px-6 shadow-xl bg-primary hover:bg-primary-dark">
                  Create Free Account
                </Button>
                <Button size="lg" variant="whiteOutline" className="rounded-full px-6 text-white border-white/20 hover:bg-white/10">
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
