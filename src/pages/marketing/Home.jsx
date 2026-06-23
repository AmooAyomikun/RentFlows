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
        className="relative bg-charcoal overflow-hidden py-2 lg:py-0 flex flex-col overflow-hidden" 
        aria-label="Hero"
      >
        {/* Subtle background accents */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#C75B30]/15 blur-[120px] rounded-full -translate-x-1/3 translate-y-1/3" />
        </div>
        
        <div className="max-w-marketing mx-auto px-6 w-full relative z-10 my-auto lg:py-0.5">
          <div className="grid lg:grid-cols-2 gap-3 lg:gap-6 items-center">
            
            {/* Left Content */}
            <div className="max-w-xl">
              <motion.div 
                className="inline-flex items-center gap-6 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-[11px] font-medium tracking-wide mb-4"
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
                className="text-white/70 text-sm md:text-xs mb-3 leading-relaxed max-w-lg"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              >
                Replace notebooks, spreadsheets, and WhatsApp with a modern rent management platform built for landlords and tenants. High performance tooling for clarity amidst high-density data.
              </motion.p>
              
              <motion.div 
                className="flex flex-col overflow-hidden sm:flex-row gap-6 mb-4"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              >
                <Button 
                  size="lg" 
                  className="rounded-full px-4 bg-primary hover:bg-primary-dark text-white shadow-xl shadow-primary/20"
                  onClick={() => navigate('/signup')}
                >
                  Get Started
                </Button>
                <Button 
                  size="lg" 
                  variant="whiteOutline"
                  className="rounded-full px-4 border-white/20 text-white hover:bg-white/10"
                  onClick={() => navigate('/services')}
                >
                  Explore Services
                </Button>
              </motion.div>

              {/* Trusted By inline badge */}
              <motion.div 
                className="flex flex-col overflow-hidden gap-3"
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
            <div className="relative w-full max-h-[200px] md:h-[240px] aspect-[4/3] flex items-center justify-center mt-4 lg:mt-0">
              
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
                className="absolute top-[0%] left-[0%] z-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-xl flex flex-col overflow-hidden gap-1 min-w-[140px]"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              >
                <p className="text-white/60 text-[10px] uppercase font-medium tracking-wide">Active Properties</p>
                <p className="text-white font-display font-bold text-sm">1,425 Units</p>
                <div className="flex items-center gap-6 mt-1">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <Building2 className="text-primary" size={20} />
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
      <section className="h-[calc(100vh-72px)] flex flex-col overflow-hidden bg-warm overflow-hidden snap-start scroll-mt-[72px] justify-center" aria-label="Mobile Management">
        <div className="max-w-marketing mx-auto px-6 w-full my-auto py-2">
          <div className="grid lg:grid-cols-2 gap-3 lg:gap-6 lg:gap-3 items-center">
            {/* Image Left */}
            <motion.div 
              className="relative w-full aspect-[4/5] max-h-[60vh] lg:max-h-[500px] flex justify-center"
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              {/* Mockup Container */}
              <div className="relative w-[260px] md:w-[300px] bg-charcoal rounded-[40px] border-[12px] border-charcoal shadow-2xl overflow-hidden shrink-0 flex flex-col overflow-hidden">
                {/* Dynamic Island Notch */}
                <div className="absolute top-0 inset-x-0 h-6 bg-charcoal rounded-b-2xl w-1/3 mx-auto z-20" />
                
                {/* App UI Simulation */}
                <div className="bg-white w-full h-full flex flex-col overflow-hidden relative z-10 flex-1">
                  <div className="bg-primary pt-6 pb-4 px-6 text-white text-center">
                    <p className="text-white/70 text-[10px] uppercase tracking-wider mb-4 font-medium">Total Balance</p>
                    <p className="font-display text-xs font-bold">₦4,250,000</p>
                  </div>
                  <div className="flex-1 p-2 bg-warm flex flex-col overflow-hidden gap-3">
                    <div className="bg-white p-2 rounded-lg shadow-sm border border-border">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold text-charcoal">Recent Rent</span>
                        <span className="text-[10px] text-success bg-success/10 px-2 py-0.5 rounded font-bold">Paid</span>
                      </div>
                      <p className="text-sm font-bold text-charcoal">₦850,000</p>
                      <p className="text-[10px] text-body mt-1">Adebayo - Unit 4B</p>
                    </div>
                    <div className="bg-white p-2 rounded-lg shadow-sm border border-border opacity-50">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold text-charcoal">Maintenance</span>
                        <span className="text-[10px] text-accent bg-accent/10 px-2 py-0.5 rounded font-bold">Pending</span>
                      </div>
                      <p className="text-sm font-bold text-charcoal">-₦45,000</p>
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
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-charcoal mb-4 font-bold tracking-tight">
                Manage on the go
              </h2>
              <p className="text-body text-base md:text-lg leading-relaxed mb-6 max-w-lg">
                Take your business anywhere. Our mobile-optimized platform puts you in control, with easy tracking of your tenants and payments, direct from any device.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#E8F3F1] flex items-center justify-center shrink-0 shadow-sm border border-[#D1E8E4]">
                    <Wallet className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-charcoal mb-4 text-sm md:text-base">Instant Rent Tracking</h3>
                    <p className="text-body text-sm md:text-base leading-relaxed">See who has paid and who hasn't the second the payment hits your account.</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFF4ED] flex items-center justify-center shrink-0 shadow-sm border border-[#FFE8D6]">
                    <TrendingUp className="text-[#C75B30]" size={20} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-charcoal mb-4 text-sm md:text-base">Quick Financial Insights</h3>
                    <p className="text-body text-sm md:text-base leading-relaxed">Understand cash flow instantly with visual charts optimized for mobile screens.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

{/* ΓöÇΓöÇΓöÇ Split Section 1 ΓöÇΓöÇΓöÇ */}
      <section className="h-[calc(100vh-72px)] flex flex-col overflow-hidden bg-white overflow-hidden snap-start scroll-mt-[72px] justify-center" aria-label="Landlord Features">
        <div className="max-w-marketing mx-auto px-6 w-full my-auto">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-6 items-center">
            {/* Image Box */}
            <motion.div 
              className="relative w-full h-[200px] md:h-[300px] lg:h-[45vh] lg:max-h-[400px] bg-warm rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border border-charcoal/5"
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
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-charcoal mb-4 font-bold tracking-tight">
                Manage all your properties in one place
              </h2>
              <p className="text-body text-base md:text-lg mb-6 leading-relaxed max-w-lg">
                Centralize your operations. From tenant communication to tracking utility bills, RentFlow provides a single unified dashboard to monitor your real estate portfolio, minimizing manual data entry and human error.
              </p>
              <ul className="space-y-4 lg:space-y-6">
                {['No hidden setup fees.', '100% data security. Guaranteed.', 'No training or maintenance needed.'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm md:text-base text-charcoal font-medium">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <CheckCircle size={20} className="text-primary" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

{/* ΓöÇΓöÇΓöÇ Split Section 2 ΓöÇΓöÇΓöÇ */}
      <section className="h-[calc(100vh-72px)] flex flex-col overflow-hidden bg-warm overflow-hidden snap-start scroll-mt-[72px] justify-center" aria-label="Tenant Features">
        <div className="max-w-marketing mx-auto px-6 w-full my-auto">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-6 items-center">
            {/* Text Left */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-charcoal mb-4 font-bold tracking-tight" className="text-2xl md:text-3xl lg:text-4xl text-charcoal mb-4 font-bold tracking-tight">
                Pay rent, on time every time, effortlessly
              </h2>
              <p className="text-body text-base md:text-lg mb-6 leading-relaxed max-w-lg">
                Empower your tenants with flexible payment options. Avoid late fees and penalties, and capture every early payment discount with automated reminders, flexible payment gateways, and immediate PDF receipts.
              </p>
              <Button 
                variant="outline" 
                className="border-charcoal text-charcoal hover:bg-charcoal hover:text-white rounded-full px-5 py-2 text-sm md:text-base h-auto"
                rightIcon={<ArrowRight size={14}/>}
              >
                LEARN MORE
              </Button>
            </motion.div>

            {/* Image Box */}
            <motion.div 
              className="relative order-1 lg:order-2 w-full h-[200px] md:h-[300px] lg:h-[45vh] lg:max-h-[400px] bg-white rounded-2xl lg:rounded-3xl border border-border overflow-hidden shadow-2xl"
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

{/* ΓöÇΓöÇΓöÇ Bento Box Features ΓöÇΓöÇΓöÇ */}
      <section className="h-[calc(100vh-72px)] flex flex-col overflow-hidden bg-white overflow-hidden snap-start scroll-mt-[72px] justify-center" aria-label="Features Bento">
        <div className="max-w-marketing mx-auto px-6 w-full my-auto lg:py-2">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            
            {/* Hero Bento Box (Dark) */}
            <motion.div 
              className="lg:col-span-2 bg-charcoal rounded-2xl p-5 lg:p-3 text-white relative overflow-hidden flex flex-col overflow-hidden justify-between min-h-0 h-full flex-1"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            >
              <div className="relative z-10 max-w-lg">
                <h2 className="font-display text-sm md:text-base lg:text-xs mb-4 leading-tight text-white font-bold" className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-white">
              Property software that handles it all.
                </h2>
                <Button variant="primary" className="bg-primary hover:bg-primary-dark text-white rounded-full px-6 py-1 text-sm h-auto shadow-xl" rightIcon={<ArrowRight size={18}/>}>
                  SEE ALL FEATURES
                </Button>
              </div>
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-tl from-primary/50 to-transparent rounded-tl-full blur-3xl" />
            </motion.div>

            {/* Top Right Box */}
            <motion.div 
              className="bg-white rounded-2xl p-5 lg:p-3 text-charcoal border border-border flex flex-col overflow-hidden justify-between min-h-0 h-full flex-1"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            >
              <div className="w-10 h-10 bg-warm rounded-xl flex items-center justify-center mb-3">
                <FileText size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm md:text-xs mb-4">Easy Invoicing & Receipts</h3>
                <p className="text-body text-[11px] md:text-xs leading-relaxed">Automate recurring invoices and save time. Get paid on time with instant PDF generation.</p>
              </div>
            </motion.div>

            {/* Bottom 3 Boxes */}
            {bentoFeatures.slice(1).map((feature, idx) => (
              <motion.div 
                key={idx}
                className="bg-white rounded-lg p-2 border border-border min-h-0 h-full flex-1 flex flex-col overflow-hidden justify-between shadow-sm hover:shadow-md transition-all group"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + (idx * 0.1) }}
              >
                <div className="w-10 h-10 bg-warm rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <feature.icon size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm md:text-xs mb-4">{feature.title}</h3>
                  <p className="text-body text-[11px] md:text-xs leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

{/* ─── Engineered for Operations ─── */}
      <section className="h-[calc(100vh-72px)] flex flex-col overflow-hidden bg-warm overflow-hidden snap-start scroll-mt-[72px] justify-center" aria-label="Engineered for Operations">
        <div className="max-w-marketing mx-auto px-6 w-full my-auto py-2">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-4"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <h2 className="font-display text-xs text-charcoal mb-1 font-bold">
              Engineered for Operations
            </h2>
            <p className="text-body text-[10px]">
              A comprehensive suite to power your property operations and simplify management at scale.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[1.5vh] lg:gap-[2.5vh]">
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
                className="bg-white rounded-[2vh] p-[2vh] lg:p-[3vh] border border-border shadow-sm hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              >
                <div className="w-[5vh] h-[5vh] rounded-[1vh] bg-warm border border-border flex items-center justify-center mb-[1.5vh]">
                  <feature.icon size={18} className="text-primary" />
                </div>
                <h3 className="font-display font-bold text-[1.8vh] lg:text-[2vh] mb-[1vh] text-charcoal">{feature.title}</h3>
                <p className="text-body text-[1.5vh] lg:text-[1.6vh] leading-snug">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

{/* ─── Visual Maintenance Routing ─── */}
      <section className="h-[calc(100vh-72px)] flex flex-col overflow-hidden bg-white overflow-hidden snap-start scroll-mt-[72px] justify-center" aria-label="Maintenance">
        <div className="max-w-marketing mx-auto px-6 w-full my-auto py-2">
          <div className="grid lg:grid-cols-2 gap-[2vh] lg:gap-[4vh] items-center">
            {/* Left Box */}
            <motion.div 
              className="bg-warm rounded-[3vh] p-[3vh] overflow-hidden relative"
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <h2 className="font-display text-[3vh] lg:text-[4vh] text-charcoal mb-[1.5vh] font-bold tracking-tight leading-tight">
                Visual Maintenance Routing
              </h2>
              <p className="text-body text-[1.8vh] leading-relaxed mb-[3vh] max-w-sm">
                Drag-and-drop workflow builder. Set up rules and triggers to auto-assign maintenance issues.
              </p>

              {/* UI Mockup boxes */}
              <div className="flex flex-col gap-3 relative z-10">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-border max-w-[80%] flex items-center gap-3">
                  <div className="w-[1vh] h-[1vh] rounded-full bg-accent"></div>
                  <div>
                    <p className="text-xs font-bold text-charcoal">Leaking pipe in Kitchen</p>
                    <p className="text-[10px] text-body">Unit 4B - Urgent priority</p>
                  </div>
                </div>
                <div className="w-px h-6 bg-border ml-10"></div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-border max-w-[80%] flex items-center gap-3 ml-8">
                  <div className="w-[1vh] h-[1vh] rounded-full bg-primary"></div>
                  <div>
                    <p className="text-xs font-bold text-charcoal">Assign to Plumber (Ade)</p>
                    <p className="text-[10px] text-body">Auto-routed rule #3</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Cards */}
            <div className="flex flex-col overflow-hidden gap-6">
              <motion.div 
                className="bg-primary rounded-[24px] p-4 text-white shadow-xl relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
                <h3 className="font-display font-bold text-xs mb-4 relative z-10">Auto-routing</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-4 relative z-10 max-w-sm">
                  Set logic to assign vendors automatically based on issue category or unit.
                </p>
                <div className="flex items-center gap-6 text-white font-bold text-sm bg-white/10 w-max px-4 py-2 rounded-full border border-white/20 relative z-10">
                  <Wrench size={16} /> Assign vendor
                </div>
              </motion.div>

              <motion.div 
                className="bg-[#C75B30] rounded-[24px] p-4 text-white shadow-xl"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              >
                <h3 className="font-display font-bold text-xs mb-4">Zero Service Motion</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-4 max-w-sm">
                  Tenants and vendors handle the workflow independently. You just review and approve.
                </p>
                <div className="flex items-center text-white/90 text-sm font-bold gap-6 cursor-pointer hover:underline">
                  Read API <ArrowRight size={14} />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

{/* ─── Works with your existing stack ─── */}
      <section className="h-[calc(100vh-72px)] flex flex-col overflow-hidden bg-warm overflow-hidden snap-start scroll-mt-[72px] justify-center" aria-label="Integrations">
        <div className="max-w-marketing mx-auto px-6 w-full my-auto lg:py-0.5 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-xs text-charcoal mb-1 font-bold">
              Works with your existing stack
            </h2>
            <p className="text-body text-sm md:text-xs max-w-xl mx-auto mb-4">
              Connect RentFlow to your favorite accounting and payment gateways.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: 'Paystack', desc: 'Secure payment processing and instant bank transfers.' },
              { title: 'QuickBooks', desc: 'Sync all transactions directly to your accounting software.' },
              { title: 'Xero', desc: 'Seamlessly reconcile bank statements and rent payments.' },
              { title: 'Monnify', desc: 'Dedicated virtual accounts for every single tenant.' }
            ].map((integration, idx) => (
              <motion.div 
                key={idx}
                className="bg-white rounded-2xl p-3 border border-border shadow-sm flex flex-col overflow-hidden items-center text-center hover:shadow-md transition-all"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              >
                <div className="w-8 h-8 bg-warm rounded-full flex items-center justify-center mb-4 border border-border">
                  <span className="font-bold text-primary font-display">{integration.title[0]}</span>
                </div>
                <h3 className="font-display font-bold text-sm mb-4 text-charcoal">{integration.title}</h3>
                <p className="text-[11px] md:text-xs text-body leading-relaxed">{integration.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

{/* ─── RentFlow vs. The Old Way ─── */}
      <section className="h-[calc(100vh-72px)] flex flex-col overflow-hidden bg-white overflow-hidden snap-start scroll-mt-[72px] justify-center" aria-label="Comparison">
        <div className="max-w-marketing mx-auto px-6 w-full my-auto py-2">
          <motion.div 
            className="text-center mb-4"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <h2 className="font-display text-xs text-charcoal mb-1 font-bold">
              RentFlow vs. The Old Way
            </h2>
            <p className="text-body text-[10px]">
              The difference between manual chaos and streamlined operations.
            </p>
          </motion.div>

          <motion.div 
            className="bg-warm border border-border rounded-2xl overflow-hidden shadow-sm"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <div className="grid grid-cols-3 bg-white border-b border-border p-1 text-[8px] md:text-sm font-bold text-charcoal/60 uppercase tracking-wider">
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
                <div key={idx} className="grid grid-cols-3 p-1 items-center gap-1 hover:bg-white transition-colors">
                  <div className="font-bold text-charcoal text-sm md:text-base">{row.feature}</div>
                  <div className="flex items-center gap-1 text-body text-sm md:text-base">
                    <div className="w-3 h-3 rounded-full bg-accent/10 flex items-center justify-center shrink-0 text-accent font-bold text-[8px]">✕</div>
                    <span>{row.old}</span>
                  </div>
                  <div className="flex items-center gap-1 text-primary font-bold text-sm md:text-base">
                    <div className="w-3 h-3 rounded-full bg-success/20 flex items-center justify-center shrink-0 text-success font-bold text-[8px]">✓</div>
                    <span>{row.new}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

{/* ─── Your data, fortified ─── */}
      <section className="h-[calc(100vh-72px)] flex flex-col overflow-hidden bg-warm overflow-hidden snap-start scroll-mt-[72px] justify-center" aria-label="Security">
        <div className="max-w-marketing mx-auto px-6 w-full my-auto py-2">
          <motion.div 
            className="bg-warm rounded-[24px] p-3 lg:p-4 border border-border/50 shadow-sm"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <div className="grid lg:grid-cols-2 gap-[2vh] lg:gap-[4vh] items-center">
              <div>
                <h2 className="font-display text-[3vh] lg:text-[4vh] text-charcoal mb-[1.5vh] font-bold tracking-tight leading-tight">
                  Your data, fortified
                </h2>
                <p className="text-body text-sm md:text-xs leading-relaxed mb-3">
                  Security is our baseline. All your sensitive information is encrypted using industry-standard protocols. We utilize bank-grade security to ensure everything is strictly confidential and fully protected.
                </p>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Shield className="text-primary mb-3" size={24} />
                    <h3 className="font-bold text-charcoal text-sm mb-4">Bank-Grade Encryption</h3>
                    <p className="text-body text-xs">Your data is encrypted at rest and in transit using AES-256 standards.</p>
                  </div>
                  <div>
                    <CheckCircle className="text-primary mb-3" size={24} />
                    <h3 className="font-bold text-charcoal text-sm mb-4">SOC2 Compliance</h3>
                    <p className="text-body text-xs">Our infrastructure meets the highest security and compliance requirements.</p>
                  </div>
                </div>
              </div>

              {/* Right Side Card */}
              <div className="flex justify-center lg:justify-end">
                <div className="bg-white rounded-[24px] p-4 border border-border shadow-xl w-full max-w-sm text-center">
                  <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
                    <Shield className="text-white" size={28} />
                  </div>
                  <h3 className="font-display font-bold text-sm text-charcoal mb-4">Highly Secure</h3>
                  <p className="text-body text-xs">Your data is safe and protected 24/7.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

{/* ΓöÇΓöÇΓöÇ Timeline ΓöÇΓöÇΓöÇ */}
      <section className="relative h-[calc(100vh-72px)] flex flex-col overflow-hidden bg-charcoal text-white overflow-hidden snap-start scroll-mt-[72px] justify-center" aria-label="Steps Timeline">
        <div className="max-w-marketing mx-auto px-6 relative z-10 w-full my-auto">
          <motion.div 
            className="max-w-3xl mb-4 lg:mb-4"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <h2 className="font-display text-sm md:text-base lg:text-xs mb-4 leading-tight text-white">
              The 4 steps route to better rental management. <span className="text-white/50">Smarter renting for faster growth.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-3 lg:gap-6 mt-4 lg:mt-2">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                className="bg-[#1A1D1C] rounded-2xl p-4 lg:p-5 text-white border border-white/5 shadow-xl relative"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * index }}
              >
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mb-3 lg:mb-4">
                  <span className="text-primary font-display font-bold text-xs lg:text-sm">{step.num}</span>
                </div>
                <h3 className="font-display text-sm md:text-base mb-4">{step.title}</h3>
                <p className="text-white/60 text-xs lg:text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

{/* ─── 4 Steps to Effortless Management ─── */}
      <section className="h-[calc(100vh-72px)] flex flex-col overflow-hidden bg-warm border-t border-border overflow-hidden snap-start scroll-mt-[72px] justify-center" aria-label="4 Steps">
        <div className="max-w-marketing mx-auto px-6 w-full my-auto py-2">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-4"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <h2 className="font-display text-xs text-charcoal mb-1 font-bold">
              4 Steps to Effortless Management
            </h2>
            <p className="text-body text-[10px]">
              Our proven onboarding completely eliminates the stress of transitioning. It's fast, simple, and straightforward.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Connect', desc: 'Add your properties and sync your bank account.', active: false },
              { num: '02', title: 'Automate', desc: 'Set rent amounts, cycles, and late fees.', active: true },
              { num: '03', title: 'Monitor', desc: 'Invite tenants. They onboard and start paying.', active: false },
              { num: '04', title: 'Scale', desc: 'Grow your portfolio with perfect records.', active: false }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                className={`rounded-[24px] p-3 lg:p-4 flex flex-col overflow-hidden justify-between min-h-0 h-full flex-1 transition-all duration-300 ${
                  step.active ? 'bg-primary text-white shadow-2xl lg:scale-110 relative z-10' : 'bg-warm text-charcoal border border-border hover:bg-white hover:shadow-lg'
                }`}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${step.active ? 'bg-white/10 border border-white/20' : 'bg-white border border-border shadow-sm'}`}>
                    {idx === 0 && <UserPlus size={20} className={step.active ? 'text-white' : 'text-primary'} />}
                    {idx === 1 && <Wrench size={20} className={step.active ? 'text-white' : 'text-primary'} />}
                    {idx === 2 && <BarChart3 size={20} className={step.active ? 'text-white' : 'text-primary'} />}
                    {idx === 3 && <TrendingUp size={20} className={step.active ? 'text-white' : 'text-primary'} />}
                  </div>
                  <span className={`font-display font-bold text-xs ${step.active ? 'text-white/40' : 'text-body/30'}`}>{step.num}</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm mb-4">{step.title}</h3>
                  <p className={`text-sm leading-relaxed ${step.active ? 'text-white/80' : 'text-body'}`}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

{/* ΓöÇΓöÇΓöÇ Testimonials ΓöÇΓöÇΓöÇ */}
      <section className="h-[calc(100vh-72px)] flex flex-col overflow-hidden bg-white overflow-hidden snap-start scroll-mt-[72px] justify-center" aria-label="Testimonials">
        <div className="max-w-marketing mx-auto px-6 text-center w-full my-auto">
          <motion.h2 
            className="font-display text-sm md:text-base lg:text-xs text-charcoal mb-4 max-w-2xl mx-auto leading-tight"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            Clients trust us and our exclusive service
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-3 text-left mt-2">
            {testimonials.map((t, idx) => (
              <motion.div 
                key={idx}
                className="relative bg-[#1A1D1C] rounded-2xl p-5 flex flex-col overflow-hidden justify-between min-h-0 h-full flex-1 overflow-hidden border border-[#272B2A] shadow-2xl"
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
                  <p className="text-[#a0a3a2] text-sm md:text-base leading-relaxed font-body">
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
      <section className="h-[calc(100vh-72px)] flex flex-col overflow-hidden bg-warm overflow-hidden snap-start scroll-mt-[72px] justify-center" aria-label="Insights">
        <div className="max-w-marketing mx-auto px-6 w-full my-auto py-2">
          <div className="flex flex-col overflow-hidden md:flex-row justify-between items-end mb-3 md:mb-4">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-charcoal mb-4 font-bold tracking-tight">
                Latest Insights
              </h2>
              <p className="text-body text-sm md:text-xs max-w-lg">
                Stay updated with the latest in property management, guides, and industry trends.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="mt-4 md:mt-0">
              <Link to="/blog" className="text-primary font-bold text-sm hover:underline flex items-center gap-6">
                View all articles <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { category: 'GUIDES', title: 'Maximizing ROI on Multi-Family Developments', date: 'Oct 12, 2023', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800' },
              { category: 'INDUSTRY', title: 'The Future of Real Estate PropTech in 2024', date: 'Oct 05, 2023', img: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=800' },
              { category: 'TIPS', title: 'Tenant Onboarding Checklists for Success', date: 'Sep 28, 2023', img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800' }
            ].map((post, idx) => (
              <motion.div 
                key={idx}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              >
                <div className="w-full aspect-[21/9] lg:aspect-[21/9] rounded-2xl mb-4 overflow-hidden bg-warm shadow-md group-hover:shadow-xl transition-all duration-500">
                  {/* Abstract blur effect for the image placeholder */}
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] font-bold text-primary tracking-wider uppercase px-2 py-0.5 bg-primary/10 rounded">{post.category}</span>
                  <span className="text-[10px] text-body">{post.date}</span>
                </div>
                <h3 className="font-display font-bold text-charcoal text-sm group-hover:text-primary transition-colors leading-tight">
                  {post.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

{/* ─── Common Questions ─── */}
      <section className="h-[calc(100vh-72px)] flex flex-col overflow-hidden bg-white overflow-hidden snap-start scroll-mt-[72px] justify-center" aria-label="FAQ">
        <div className="max-w-marketing mx-auto px-6 w-full my-auto py-2">
          <motion.div className="text-center mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-xs text-charcoal mb-1 font-bold">
              Common Questions
            </h2>
            <p className="text-body text-[10px]">
              Find out how RentFlow can streamline your workflow.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-0.5">
            {faqs.map((faq, idx) => (
              <motion.div 
                key={idx}
                className="bg-white rounded-md p-1.5 border border-border shadow-sm"
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              >
                <div className="flex justify-between items-start gap-6">
                  <h3 className="font-display font-bold text-charcoal text-sm md:text-base">{faq.q}</h3>
                  <div className="w-10 h-10 rounded-full bg-warm flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold leading-none mt-[-2px]">+</span>
                  </div>
                </div>
                {idx === 0 && (
                  <p className="text-body text-sm mt-0.5 leading-none border-t border-border pt-0.5 text-[10px]">
                    {faq.a}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

{/* ΓöÇΓöÇΓöÇ Footer Section CTA ΓöÇΓöÇΓöÇ */}
      <section className="h-[calc(100vh-72px)] flex flex-col overflow-hidden bg-charcoal text-white overflow-hidden snap-start scroll-mt-[72px] justify-center" aria-label="Call to Action">
        <div className="max-w-marketing mx-auto px-6 w-full my-auto py-2">
          <div className="bg-gradient-to-br from-charcoal to-[#1A1D1C] rounded-2xl p-3 lg:p-4 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-display text-sm md:text-sm mb-4 leading-tight text-white">
                Ready to transform your property management?
              </h2>
              <p className="text-sm md:text-xs text-white/80 mb-4 leading-relaxed">
                Join thousands of modern landlords across Africa using RentFlow to save time, reduce stress, and get paid faster.
              </p>
              <div className="flex flex-col overflow-hidden sm:flex-row gap-3 justify-center">
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

{/* ─── Final CTA ─── */}
      <section className="py-1 lg:py-0 flex flex-col overflow-hidden bg-white" aria-label="Call to Action">
        <div className="max-w-marketing mx-auto px-6 w-full my-auto lg:py-0.5 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-sm md:text-base lg:text-xs font-bold text-charcoal mb-4 leading-tight tracking-tight max-w-3xl mx-auto">
              Stop Tracking Rent in Notebooks.
            </h2>
            <p className="text-body text-sm md:text-base mb-3 max-w-2xl mx-auto">
              Join thousands of modern landlords across Africa using RentFlow to save time, reduce stress, and grow their portfolios.
            </p>
            <div className="flex flex-col overflow-hidden sm:flex-row gap-6 justify-center">
              <Button size="lg" className="rounded-full px-4 bg-charcoal hover:bg-black text-white shadow-xl">
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-4 border-border text-charcoal hover:bg-warm">
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
