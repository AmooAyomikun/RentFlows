import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CreditCard, FileText, Wrench, BarChart3, CheckCircle, Star, Building2, UserPlus, Mail, Wallet, Bell, LayoutDashboard, Shield, TrendingUp, Search, FileSpreadsheet, Calculator, DollarSign, MessageSquare, CheckCircle2, XCircle, Send } from 'lucide-react';
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
        className="relative bg-charcoal overflow-hidden py-8 md:py-12 lg:py-12 flex flex-col" 
        aria-label="Hero"
      >
        {/* Subtle background accents */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 blur-[80px] rounded-full translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#C75B30]/15 blur-[120px] rounded-full -translate-x-1/3 translate-y-1/3" />
        </div>
        
        <div className="max-w-marketing mx-auto px-4 w-full relative z-10 my-auto ">
          <div className="grid lg:grid-cols-2 gap-3 lg:gap-3 items-center">
            
            {/* Left Content */}
            <div className="max-w-xl">
              <motion.div 
                className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-[11px] font-medium tracking-wide mb-4"
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
                className="text-white/70 text-small md:text-micro mb-3 leading-relaxed max-w-lg"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              >
                Replace notebooks, spreadsheets, and WhatsApp with a modern rent management platform built for landlords and tenants. High performance tooling for clarity amidst high-density data.
              </motion.p>
              
              <motion.div 
                className="flex flex-col overflow-hidden sm:flex-row gap-3 mb-4"
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
                <div className="flex flex-wrap gap-3 items-center">
                  {['ShelterHQ', 'LagosLiving', 'TerraFirma', 'Oakwood'].map((logo, idx) => (
                    <span key={idx} className="text-white/60 font-display font-bold text-small tracking-tight opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
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
                className="absolute top-[0%] left-[0%] z-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-3 shadow-xl flex flex-col overflow-hidden gap-1 min-w-[140px]"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              >
                <p className="text-white/60 text-[10px] uppercase font-medium tracking-wide">Active Properties</p>
                <p className="text-white font-display font-bold text-small">1,425 Units</p>
                <div className="flex items-center gap-3 mt-1">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                    <Building2 className="text-primary w-3 h-3" />
                  </div>
                  <span className="text-white/80 text-[11px] font-medium">+12 this week</span>
                </div>
              </motion.div>

              {/* Floating Badge 2 - Bottom Right */}
              <motion.div 
                className="absolute bottom-[5%] right-[-5%] z-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-3 shadow-xl flex items-center gap-3"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              >
                <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center border border-success/30">
                  <CheckCircle className="text-success" className="w-2 h-2" />
                </div>
                <div>
                  <p className="text-white font-display font-bold text-small">Rent Secured</p>
                  <p className="text-white/60 text-[10px] uppercase tracking-wider">100% on-time</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Manage on the go ─── */}
      <section className="py-8 md:py-12 lg:py-12 bg-warm" aria-label="Mobile Management">
        <div className="max-w-marketing mx-auto px-4 w-full">
          <div className="grid lg:grid-cols-2 gap-3 lg:gap-3 lg:gap-3 items-center">
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
                  <div className="bg-primary pt-4 pb-3 px-4 text-white text-center">
                    <p className="text-white/70 text-[10px] uppercase tracking-wider mb-4 font-medium">Total Balance</p>
                    <p className="font-display text-micro font-bold">₦4,250,000</p>
                  </div>
                  <div className="flex-1 p-1.5 bg-warm flex flex-col overflow-hidden gap-3">
                    <div className="bg-white p-1.5 rounded-lg shadow-sm border border-border">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-micro font-bold text-charcoal">Recent Rent</span>
                        <span className="text-[10px] text-success bg-success/10 px-2 py-0.5 rounded font-bold">Paid</span>
                      </div>
                      <p className="text-small font-bold text-charcoal">₦850,000</p>
                      <p className="text-[10px] text-body mt-1">Adebayo - Unit 4B</p>
                    </div>
                    <div className="bg-white p-1.5 rounded-lg shadow-sm border border-border opacity-50">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-micro font-bold text-charcoal">Maintenance</span>
                        <span className="text-[10px] text-accent bg-accent/10 px-2 py-0.5 rounded font-bold">Pending</span>
                      </div>
                      <p className="text-small font-bold text-charcoal">-₦45,000</p>
                      <p className="text-[10px] text-body mt-1">Plumbing - Unit 2A</p>
                    </div>
                  </div>
                  <div className="h-8 bg-white border-t border-border flex justify-around items-center px-4 shrink-0 pb-2">
                    <div className="w-2 h-2 rounded-full bg-primary/20 flex items-center justify-center"><LayoutDashboard size={14} className="text-primary"/></div>
                    <div className="w-2 h-2 rounded-full bg-warm" />
                    <div className="w-2 h-2 rounded-full bg-warm" />
                    <div className="w-2 h-2 rounded-full bg-warm" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Text Right */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-display text-h4 md:text-h3-sm lg:text-h3 text-charcoal mb-2 md:mb-3 font-bold tracking-tight leading-tight">
                Manage on the go
              </h2>
              <p className="text-body text-smallall md:text-body leading-relaxed mb-2 md:mb-3 max-w-lg">
                Take your business anywhere. Our mobile-optimized platform puts you in control, with easy tracking of your tenants and payments, direct from any device.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-[#D1E8E4]">
                    <Wallet className="text-primary w-3 h-3" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-charcoal mb-2 md:mb-3 text-xl">Instant Rent Tracking</h3>
                    <p className="text-body text-body leading-relaxed">See who has paid and who hasn't the second the payment hits your account.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-[#FFE8D6]">
                    <TrendingUp className="text-[#C75B30]" className="w-2 h-2" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-charcoal mb-2 md:mb-3 text-xl">Quick Financial Insights</h3>
                    <p className="text-body text-body leading-relaxed">Understand cash flow instantly with visual charts optimized for mobile screens.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

{/* ΓöÇΓöÇΓöÇ Split Section 1 ΓöÇΓöÇΓöÇ */}
      
<section className="py-8 md:py-12 lg:py-12 bg-white" aria-label="Landlord Features">
        <div className="max-w-marketing mx-auto px-4 w-full">
          <div className="grid lg:grid-cols-2 gap-4 lg:gap-6 items-center">
            {/* Text Box */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <h2 className="font-display text-h2-sm md:text-h2 text-charcoal mb-2 md:mb-3 font-bold tracking-tight leading-tight">
                Manage all your properties in one place
              </h2>
              <p className="text-body text-body mb-4 md:mb-6 leading-relaxed max-w-lg">
                Centralize your operations. From tenant communication to tracking utility bills, RentFlow provides a single unified dashboard to monitor your real estate portfolio, minimizing manual data entry and human error.
              </p>
              <ul className="space-y-3">
                {['No hidden setup fees.', '100% data security. Guaranteed.', 'No training or maintenance needed.'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-body text-charcoal font-medium">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-warm text-primary">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            
            {/* Image Box */}
            <motion.div 
              className="relative order-1 lg:order-2 w-full aspect-[4/3] bg-warm rounded-2xl overflow-hidden shadow-md border border-border"
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800" 
                alt="Modern property" 
                className="absolute inset-0 object-cover w-full h-full opacity-90 transition-transform hover:scale-105 duration-[2s] ease-out"
              />
            </motion.div>
          </div>
        </div>
      </section>




{/* ΓöÇΓöÇΓöÇ Split Section 2 ΓöÇΓöÇΓöÇ */}
      <section className="py-8 md:py-12 lg:py-12 bg-warm" aria-label="Tenant Features">
        <div className="max-w-marketing mx-auto px-4 w-full">
          <div className="grid lg:grid-cols-2 gap-3 lg:gap-3 items-center">
            {/* Text Left */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <h2 className="font-display text-h4 md:text-h3-sm lg:text-h3 text-charcoal mb-2 md:mb-3 font-bold tracking-tight leading-tight">
                Pay rent, on time every time, effortlessly
              </h2>
              <p className="text-body text-smallall md:text-body mb-2 md:mb-3 leading-relaxed max-w-lg">
                Empower your tenants with flexible payment options. Avoid late fees and penalties, and capture every early payment discount with automated reminders, flexible payment gateways, and immediate PDF receipts.
              </p>
              <Button 
                variant="outline" 
                className="border-charcoal text-charcoal hover:bg-charcoal hover:text-white rounded-full px-3 md:px-4 py-1 md:py-3 text-body h-auto"
                rightIcon={<ArrowRight size={14}/>}
              >
                LEARN MORE
              </Button>
            </motion.div>

            {/* Image Box */}
            <motion.div 
              className="relative order-1 lg:order-2 w-full h-[200px] md:h-[300px] lg:h-[45vh] lg:max-h-[400px] bg-white rounded-xl lg:rounded-xl border border-border overflow-hidden shadow-2xl"
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
      <section className="py-8 md:py-12 bg-white" aria-label="Features Bento">
        <div className="max-w-marketing mx-auto px-4 w-full">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            
            {/* Hero Bento Box (Dark) */}
            <motion.div 
              className="lg:col-span-2 bg-charcoal rounded-xl p-6 md:p-8 text-white relative overflow-hidden flex flex-col justify-center shadow-sm"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            >
              <div className="relative z-10 max-w-lg">
                <h2 className="font-display font-bold text-h3 md:text-h2-sm mb-4 leading-tight text-white">
                  Property software that handles it all.
                </h2>
                <Button variant="primary" className="bg-primary hover:bg-primary-dark text-white rounded-full px-6 py-2 text-body h-auto shadow-xl" rightIcon={<ArrowRight size={18} />}>
                  SEE ALL FEATURES
                </Button>
              </div>
              <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-tl from-primary/50 to-transparent rounded-tl-full blur-3xl pointer-events-none" />
            </motion.div>

            {/* Top Right Box */}
            <motion.div 
              className="bg-white rounded-xl p-5 border border-border flex flex-col justify-center shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-warm rounded-full flex items-center justify-center shrink-0">
                  <FileText className="text-primary w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-h4">Easy Invoicing</h3>
              </div>
              <p className="text-body text-small leading-relaxed text-muted">Automate recurring invoices and save time. Get paid on time with instant PDF generation.</p>
            </motion.div>

            {/* Bottom 3 Boxes */}
            {bentoFeatures.slice(1).map((feature, idx) => (
              <motion.div 
                key={idx}
                className="bg-white rounded-xl p-5 border border-border flex flex-col justify-center shadow-sm hover:shadow-md transition-all group"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + (idx * 0.1) }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-warm rounded-full flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-all">
                    <feature.icon className="text-primary w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-h4">{feature.title}</h3>
                </div>
                <p className="text-body text-small leading-relaxed text-muted">{feature.desc}</p>
              </motion.div>
            ))}

          </div>
        </div>
      </section>





{/* ─── Engineered for Operations ─── */}
      <section className="py-8 md:py-12 bg-warm" aria-label="Engineered for Operations">
        <div className="max-w-marketing mx-auto px-4 w-full">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <h2 className="font-display text-h2-sm md:text-h2 text-charcoal mb-2 font-bold">
              Engineered for Operations
            </h2>
            <p className="text-body text-body text-muted">
              A comprehensive suite to power your property operations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
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
                className="bg-white rounded-xl p-5 border border-border shadow-sm hover:shadow-md transition-all group cursor-default"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-warm flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                    <feature.icon className="text-primary group-hover:text-white transition-colors w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-h4 text-charcoal leading-tight">{feature.title}</h3>
                </div>
                <p className="text-body text-small leading-relaxed text-muted">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>





{/* ─── Visual Maintenance Routing ─── */}
      <section className="py-8 md:py-12 bg-white" aria-label="Maintenance">
        <div className="max-w-marketing mx-auto px-4 w-full">
          <div className="grid lg:grid-cols-2 gap-4 md:gap-5 items-stretch">
            {/* Left Box */}
            <motion.div 
              className="bg-warm rounded-2xl p-6 md:p-8 relative border border-border flex flex-col justify-center"
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <h2 className="font-display text-h3 md:text-h2-sm text-charcoal mb-2 font-bold tracking-tight leading-tight">
                Visual Maintenance Routing
              </h2>
              <p className="text-body text-body text-muted leading-relaxed mb-6 max-w-sm">
                Drag-and-drop workflow builder. Set up rules and triggers to auto-assign maintenance issues.
              </p>

              {/* UI Mockup boxes */}
              <div className="flex flex-col gap-2 relative z-10 w-full lg:w-4/5 mx-auto lg:mx-0">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-border w-full flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-accent shrink-0"></div>
                  <div>
                    <p className="font-bold text-body text-charcoal">Leaking pipe in Kitchen</p>
                    <p className="text-small text-muted">Unit 4B - Urgent priority</p>
                  </div>
                </div>
                <div className="w-[2px] h-4 bg-border ml-7"></div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-border w-full flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-primary-dark shrink-0"></div>
                  <div>
                    <p className="font-bold text-body text-charcoal">Assign to Plumber (Ade)</p>
                    <p className="text-small text-muted">Auto-routed rule #3</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Cards */}
            <div className="flex flex-col gap-4 md:gap-5">
              <motion.div 
                className="bg-primary-dark rounded-2xl p-6 text-white shadow-md relative overflow-hidden flex flex-col justify-center flex-1"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
                <h3 className="font-display font-bold text-h3-sm text-white mb-2 relative z-10">Auto-routing</h3>
                <p className="text-white/80 text-small leading-relaxed mb-4 relative z-10 max-w-sm">
                  Set logic to assign vendors automatically based on issue category or unit.
                </p>
                <div className="flex items-center gap-2 text-primary-dark font-bold text-small bg-white w-max px-4 py-2 rounded-full shadow-sm cursor-pointer hover:scale-105 transition-transform relative z-10">
                  <Wrench size={16} /> Assign vendor
                </div>
              </motion.div>

              <motion.div 
                className="bg-accent rounded-2xl p-6 text-white shadow-md flex flex-col justify-center flex-1"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              >
                <h3 className="font-display font-bold text-h3-sm text-white mb-2">Zero Service Motion</h3>
                <p className="text-white/90 text-small leading-relaxed mb-4 max-w-sm">
                  Tenants and vendors handle the workflow independently. You just review and approve.
                </p>
                <div className="flex items-center text-white text-small font-bold gap-2 cursor-pointer hover:opacity-80 group w-max">
                  Read API <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>





{/* ─── Works with your existing stack ─── */}
      <section className="py-8 md:py-12 bg-warm" aria-label="Integrations">
        <div className="max-w-marketing mx-auto px-4 w-full">
          <motion.div className="text-center mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-h3 md:text-h2-sm text-charcoal mb-2 font-bold tracking-tight">
              Works with your existing stack
            </h2>
            <p className="text-body text-body text-muted max-w-xl mx-auto">
              Connect RentFlow to your favorite accounting and payment gateways.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { icon: CreditCard, title: 'Paystack', desc: 'Secure payment processing and instant transfers.' },
              { icon: FileSpreadsheet, title: 'QuickBooks', desc: 'Sync transactions directly to accounting.' },
              { icon: Calculator, title: 'Xero', desc: 'Seamlessly reconcile bank statements.' },
              { icon: Wallet, title: 'Monnify', desc: 'Dedicated virtual accounts for tenants.' },
              { icon: DollarSign, title: 'Stripe', desc: 'Global card payments and subscriptions.' },
              { icon: MessageSquare, title: 'Slack', desc: 'Real-time notifications for your team.' }
            ].map((integration, idx) => (
              <motion.div 
                key={idx}
                className="bg-white rounded-xl p-4 md:p-5 border border-border shadow-sm flex flex-col justify-center hover:shadow-md transition-all group"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-warm rounded-full flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                    <integration.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-h4-sm md:text-h4 text-charcoal">{integration.title}</h3>
                </div>
                <p className="text-small leading-relaxed text-muted">{integration.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



{/* ─── RentFlow vs. The Old Way ─── */}
      
<section className="py-8 md:py-12 lg:py-12 bg-white" aria-label="Comparison">
        <div className="max-w-marketing mx-auto px-4 w-full">
          <motion.div 
            className="text-center mb-4 md:mb-6"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <h2 className="font-display text-h2-sm md:text-h2 text-charcoal mb-1 font-bold">
              RentFlow vs. The Old Way
            </h2>
            <p className="text-body text-body text-muted">
              The difference is in the speed and reliability of your operations.
            </p>
          </motion.div>

          <motion.div 
            className="max-w-4xl mx-auto bg-warm rounded-2xl p-4 md:p-6 lg:p-8"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden text-left">
              {/* Header Row */}
              <div className="grid grid-cols-3 bg-warm/50 border-b border-border p-3 lg:p-4 text-micro font-bold text-charcoal uppercase tracking-wider">
                <div>FEATURE</div>
                <div className="text-muted">OLD SCHOOL (SPREADSHEETS)</div>
                <div className="text-primary">RENTFLOW MODERN STACK</div>
              </div>
              
              {/* Rows */}
              {[
                { feature: 'Rent Collection', old: 'Manual checks, bank logs', new: 'Automated Instant Payments' },
                { feature: 'Maintenance', old: 'Sticky notes & WhatsApp', new: 'Real-time Kanban Tracking' },
                { feature: 'Reporting', old: '3 days to export & pivot', new: '1-Click Investor Ready' },
                { feature: 'Total Efficiency', old: 'Slow & error-prone', new: '10x Faster Automation' }
              ].map((row, idx) => (
                <div key={idx} className="grid grid-cols-3 p-3 lg:p-4 border-b border-border last:border-0 text-small">
                  <div className="font-bold text-charcoal flex items-center">{row.feature}</div>
                  <div className="text-body flex items-center text-muted">{row.old}</div>
                  <div className="text-success font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3" /> {row.new}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>


{/* ─── Your data, fortified ─── */}
      
<section className="py-8 md:py-16 bg-white" aria-label="Security">
        <div className="max-w-marketing mx-auto px-4 w-full">
          <motion.div 
            className="bg-charcoal rounded-3xl p-8 md:p-12 relative overflow-hidden text-white shadow-2xl"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            {/* Glow effects */}
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-accent/20 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 relative z-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-micro font-bold tracking-wider uppercase text-white/90">Enterprise Security</span>
                </div>
                <h2 className="font-display text-h3 md:text-h2-sm text-white mb-4 font-bold tracking-tight leading-tight">
                  Your data is fortified.
                </h2>
                <p className="text-white/70 text-body leading-relaxed mb-8 max-w-lg">
                  Security isn't just a feature—it's our foundation. We employ the same protocols as major financial institutions to ensure your assets and data remain strictly protected and confidential.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                  <div className="bg-white/5 rounded-xl p-5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                    <Shield className="text-primary w-6 h-6 mb-3" />
                    <h3 className="font-bold text-white text-h4-sm mb-2">Bank-Grade Encryption</h3>
                    <p className="text-white/60 text-small leading-relaxed">256-bit AES protection for all data in transit and at rest.</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                    <CheckCircle2 className="text-accent w-6 h-6 mb-3" />
                    <h3 className="font-bold text-white text-h4-sm mb-2">SOC2 Compliance</h3>
                    <p className="text-white/60 text-small leading-relaxed">Independently audited security controls and processes.</p>
                  </div>
                </div>
              </div>

              {/* Right side graphic */}
              <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
                <div className="relative w-full max-w-sm">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-accent/40 rounded-full blur-3xl opacity-50"></div>
                  <div className="bg-charcoal/80 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl relative z-10 text-center flex flex-col items-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                      <CheckCircle2 className="text-white w-8 h-8" />
                    </div>
                    <h3 className="font-display font-bold text-h2 text-white mb-1">99.99%</h3>
                    <p className="text-white/90 font-bold text-body mb-3 uppercase tracking-wide">Uptime SLA</p>
                    <p className="text-white/60 text-small leading-relaxed">Global redundant infrastructure with automated failover capabilities.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>






{/* ΓöÇΓöÇΓöÇ Timeline ΓöÇΓöÇΓöÇ */}
      

{/* ─── 4 Steps to Effortless Management ─── */}
      
<section className="py-8 md:py-12 lg:py-12 bg-warm border-t border-border" aria-label="4 Steps">
        <div className="max-w-marketing mx-auto px-4 w-full">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-4 md:mb-6"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <h2 className="font-display text-h2-sm md:text-h2 text-charcoal mb-2 font-bold leading-tight">
              4 Steps to Effortless Management
            </h2>
            <p className="text-body text-body">
              Get up and running in minutes, not months. Our streamlined onboarding ensures a smooth transition.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {[
              { icon: UserPlus, num: '01', title: 'Connect', desc: 'Sync your bank and import portfolios.', active: false },
              { icon: Building2, num: '02', title: 'Automate', desc: 'Set up billing cycles and rent rules.', active: true },
              { icon: BarChart3, num: '03', title: 'Monitor', desc: 'Track payments and maintenance in real-time.', active: false },
              { icon: Send, num: '04', title: 'Scale', desc: 'Use deep analytics to grow your portfolio.', active: false }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                className={`rounded-xl p-4 lg:p-6 flex flex-col justify-between min-h-[220px] transition-all duration-300 relative overflow-hidden shadow-sm border ${step.active ? 'bg-primary-dark text-white border-primary-dark shadow-md' : 'bg-white text-charcoal border-border'}`}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * idx }}
              >
                {/* Big Number */}
                <div className={`absolute top-3 right-4 font-display font-bold text-display-sm leading-none ${step.active ? 'text-white/10' : 'text-muted/15'}`}>
                  {step.num}
                </div>
                
                <div className="relative z-10">
                  <div className={`w-6 h-6 rounded-xl flex items-center justify-center shrink-0 mb-4 ${step.active ? 'bg-white/10' : 'bg-warm'}`}>
                    <step.icon className={`w-3 h-3 ${step.active ? 'text-white' : 'text-primary'}`} />
                  </div>
                  <h4 className="font-display font-bold text-h4 mb-1.5">{step.title}</h4>
                  <p className={`text-small leading-relaxed ${step.active ? 'text-white/80' : 'text-body'}`}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


{/* ΓöÇΓöÇΓöÇ Testimonials ΓöÇΓöÇΓöÇ */}
      <section className="py-8 md:py-12 lg:py-12 bg-white" aria-label="Testimonials">
        <div className="max-w-marketing mx-auto px-4 text-center w-full">
          <motion.h2 className="font-display text-h4 md:text-h3-sm lg:text-h3 text-charcoal mb-2 md:mb-3 max-w-2xl mx-auto leading-tight font-bold" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Clients trust us and our exclusive service</motion.h2>
          <div className="grid md:grid-cols-3 gap-3 text-left mt-2">
            {testimonials.map((t, idx) => (
              <motion.div 
                key={idx}
                className="relative bg-[#1A1D1C] rounded-xl p-3 flex flex-col overflow-hidden justify-between min-h-0 h-full flex-1 overflow-hidden border border-[#272B2A] shadow-2xl"
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
                  <p className="text-[#a0a3a2] text-smallall md:text-body leading-relaxed font-body">
                    {t.quote}
                  </p>
                </div>

                <div className="relative z-10 flex items-center gap-3 mt-auto pt-3 border-t border-white/[0.08]">
                  <div className="w-2 h-2 rounded-full bg-charcoal overflow-hidden shrink-0 border border-transparent">
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
      
<section className="py-8 md:py-12 lg:py-12 bg-white" aria-label="Insights">
        <div className="max-w-marketing mx-auto px-4 w-full">
          <div className="flex flex-col md:flex-row justify-between items-end mb-4 md:mb-6">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-display text-h2-sm md:text-h2 text-charcoal mb-1 font-bold tracking-tight leading-tight">
                Latest Insights
              </h2>
              <p className="text-body text-body max-w-lg">
                Stay ahead of the market with our latest property management guides and industry trends.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="mt-2 md:mt-0">
              <Link to="/blog" className="text-primary font-bold text-small hover:underline flex items-center gap-1.5">
                View all resources <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
            {[
              { category: 'STRATEGY', title: 'Maximizing NOI in a High-Interest Environment', desc: '5 tactical shifts asset managers are making to protect yields this year.', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600' },
              { category: 'AUTOMATION', title: 'The Future of Zero-Touch Rent Collection', desc: 'How AI and real-time bank feeds are eliminating manual reconciliation.', img: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&q=80&w=600' },
              { category: 'GUIDE', title: 'Tenant Onboarding Checklist for 2024', desc: 'A comprehensive guide to digital screening and lease execution.', img: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=600' }
            ].map((post, idx) => (
              <motion.div 
                key={idx}
                className="group cursor-pointer flex flex-col"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              >
                <div className="w-full aspect-[16/9] rounded-xl mb-3 overflow-hidden bg-warm shadow-sm border border-border group-hover:shadow-md transition-all duration-300">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="mb-1">
                  <span className="text-micro font-bold text-primary tracking-wider uppercase px-1 py-0.5 bg-primary/5 rounded">{post.category}</span>
                </div>
                <h3 className="font-display font-bold text-charcoal text-h4-sm mb-1 leading-tight group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-small text-muted line-clamp-2">
                  {post.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


{/* ─── Common Questions ─── */}
      <section className="py-8 md:py-12 bg-warm border-t border-border" aria-label="FAQ">
        <div className="max-w-marketing mx-auto px-4 w-full">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="font-display text-h3 md:text-h2-sm text-charcoal mb-2 font-bold tracking-tight">
              Common Questions
            </h2>
            <p className="text-body text-small md:text-body text-muted leading-relaxed">
              Everything you need to know about how RentFlow can streamline your workflow and secure your payments.
            </p>
          </div>

          <div className="max-w-3xl mx-auto flex flex-col gap-2">
            {faqs.map((faq, idx) => (
              <motion.div 
                key={idx}
                className="bg-white border border-border shadow-sm rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              >
                <div className="flex justify-between items-center p-3 md:p-4 cursor-pointer group hover:bg-warm/50 transition-colors">
                  <h3 className="font-display font-bold text-charcoal text-body group-hover:text-primary transition-colors pr-4">{faq.q}</h3>
                  <div className="w-6 h-6 rounded-full bg-warm flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                    <span className="text-primary font-bold text-lg leading-none mt-[-2px]">+</span>
                  </div>
                </div>
                {/* Simulate open state for the first item for demo purposes */}
                {idx === 0 && (
                  <div className="px-3 md:px-4 pb-3 md:pb-4 pt-0 text-body text-small text-muted leading-relaxed">
                    <p>{faq.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>





{/* ΓöÇΓöÇΓöÇ Footer Section CTA ΓöÇΓöÇΓöÇ */}
      <section className="py-8 md:py-12 bg-white" aria-label="Call to Action">
        <div className="max-w-4xl mx-auto px-4 w-full">
          <motion.div 
            className="bg-primary-dark rounded-2xl p-6 md:p-10 text-center text-white relative overflow-hidden shadow-xl"
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          >
            {/* Glow effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/30 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="relative z-10">
              <h3 className="font-bold text-micro text-accent mb-2 tracking-widest uppercase">
                Stop Tracking Rent in Notebooks
              </h3>
              <h2 className="font-display font-bold text-h3 md:text-h2-sm text-white mb-4 leading-tight tracking-tight">
                Ready to transform your property management?
              </h2>
              <p className="text-white/80 text-small md:text-body mb-6 leading-relaxed max-w-xl mx-auto">
                Join thousands of modern landlords across Africa using RentFlow to save time, reduce stress, and get paid faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  size="lg" 
                  className="rounded-full px-6 py-3 bg-accent hover:bg-[#A94A24] text-white text-body font-bold h-auto border-none shadow-md"
                >
                  Start for free
                </Button>
                <Button 
                  size="lg" 
                  variant="whiteOutline"
                  className="rounded-full px-6 py-3 border-white/20 text-white hover:bg-white/10 text-body font-bold h-auto bg-transparent border-2"
                >
                  Talk to Sales
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>





{/* ─── Final CTA ─── */}
      

    </div>
  );
};

export default Home;
