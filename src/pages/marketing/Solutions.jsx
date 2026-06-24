import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, CheckCircle2, Shield, Lock, Activity, Eye, 
  TrendingUp, Building, Home, Briefcase, Mail, FileText, 
  ChevronDown, ChevronUp, BarChart3, LineChart, Server,
  Check
} from 'lucide-react';
import Button from '../../components/ui/Button';

// Mockups
import independentMobile from '../../assets/independent_mobile.png';
import professionalWeb from '../../assets/professional_web.png';
import aboutHeroBg from '../../assets/about_hero_bg.png'; // Reusing about page background as requested

// Motion variants
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  })
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const Solutions = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    { q: "How secure is my data?", a: "We use bank-grade 256-bit encryption for all data storage and transmission. Our infrastructure is continuously audited by third-party security firms to ensure the highest level of protection." },
    { q: "Can I upgrade as my portfolio grows?", a: "Absolutely. RentFlow is designed to scale with you. You can move from our Foundation plan to Optimization or Institutional tiers at any time without data loss or service interruption." },
    { q: "Is there a limit on how many properties I can add?", a: "No, there are no limits on the number of properties you can add on our Optimization and Institutional plans. Our Foundation plan is optimized for portfolios up to 10 units." }
  ];

  return (
    <div className="w-full bg-[#FDFBF7]">
      {/* 1. Hero Section (Matched exactly to About.jsx) */}
      <section className="relative py-24 md:py-32 bg-charcoal flex items-center min-h-[60vh] overflow-hidden" aria-label="Hero">
        <div className="absolute inset-0 z-0">
          <img src={aboutHeroBg} alt="Hero Background" className="w-full h-full object-cover object-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 to-charcoal/40" />
        </div>
        <div className="relative z-10 max-w-marketing mx-auto px-6 w-full">
          <motion.div className="max-w-3xl" initial="hidden" animate="visible" variants={fadeUp}>
            <p className="text-[12px] md:text-sm font-bold uppercase tracking-widest text-[#D35400] mb-4">Built Around Your Needs, Before You Need Them</p>
            <h1 className="font-display text-white text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
              Property Management Solutions for Every Scale
            </h1>
            <p className="text-white/80 text-base md:text-lg max-w-2xl mb-8 leading-relaxed">
              From individual landlords to institutional portfolios, RentFlow provides the infrastructure to automate rent, manage tenants, and scale your real estate business.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" variant="accent" className="bg-[#D35400] text-white hover:bg-[#D35400]/90 border-none" onClick={() => navigate('/signup')}>
                Request Demo
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" onClick={() => document.getElementById('independent').scrollIntoView({ behavior: 'smooth' })}>
                View Features
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. For the Independent Landlord */}
      <section id="independent" className="py-20 md:py-24 bg-[#FDFBF7]" aria-label="Independent Landlord">
        <div className="max-w-marketing mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div className="flex-1" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-400 mb-6">
                <Home size={24} />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal mb-4">For the Independent Landlord</h2>
              <p className="text-body text-base md:text-lg mb-10 leading-relaxed">
                Whether a single property or a small portfolio, RentFlow tracks full finance and automates rent to eliminate the headache of keeping the "WhatsApp promises."
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-border/50 shadow-sm">
                  <Activity size={24} className="text-primary mb-4" />
                  <h3 className="font-bold text-charcoal text-lg mb-2">Online Rent Payments</h3>
                  <p className="text-sm text-muted leading-relaxed">Secure, instant bank-to-bank transfers with automated tracking.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-border/50 shadow-sm">
                  <Mail size={24} className="text-primary mb-4" />
                  <h3 className="font-bold text-charcoal text-lg mb-2">Maintenance Requests</h3>
                  <p className="text-sm text-muted leading-relaxed">Directly receive and securely track tickets from your tenants in-app.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-border/50 shadow-sm">
                  <CheckCircle2 size={24} className="text-primary mb-4" />
                  <h3 className="font-bold text-charcoal text-lg mb-2">Automated Reminders</h3>
                  <p className="text-sm text-muted leading-relaxed">Pre-styled reminders before rent is due and automatic late notices.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-border/50 shadow-sm">
                  <Building size={24} className="text-primary mb-4" />
                  <h3 className="font-bold text-charcoal text-lg mb-2">Bank Reconciliation</h3>
                  <p className="text-sm text-muted leading-relaxed">Matching accounts directly to ledger balances with one click.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex-1 w-full max-w-[320px] lg:max-w-[400px] mx-auto shadow-2xl rounded-[40px] border-[8px] border-charcoal/5 overflow-hidden bg-white"
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <img src={independentMobile} alt="RentFlow Mobile App" className="w-full h-auto object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Bank-Grade Infrastructure */}
      <section className="py-20 md:py-24 bg-[#EBE9E4]" aria-label="Bank-Grade Infrastructure">
        <div className="max-w-marketing mx-auto px-6 text-center">
          <motion.p className="text-xs md:text-sm font-bold text-[#D35400] uppercase tracking-widest mb-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>ENTERPRISE SAFETY</motion.p>
          <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-charcoal mb-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>Bank-Grade Infrastructure</motion.h2>
          <motion.p className="text-body text-base md:text-lg max-w-2xl mx-auto mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            We protect your private data with the exact rigorous standards as leading global financial institutions.
          </motion.p>
          
          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {[
              { icon: <Lock size={24} />, title: "Data Encryption", desc: "End-to-end 256-bit AES encryption keeps financial and personal data secure at all times." },
              { icon: <Shield size={24} />, title: "Secure Payments", desc: "PCI-DSS Level 1 compliant payments processing natively built with enterprise tokenized bank security." },
              { icon: <Activity size={24} />, title: "Activity Audit", desc: "Comprehensive activity logs for every transaction and modification to hold teams accountable." },
              { icon: <Eye size={24} />, title: "Privacy First", desc: "In-depth compliance with enterprise privacy guidelines to prevent data leaks and legal risk." }
            ].map((item, idx) => (
              <motion.div key={idx} className="bg-white p-8 rounded-2xl border border-border/40 shadow-sm" variants={fadeUp}>
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-400 mb-6">
                  {item.icon}
                </div>
                <h3 className="font-bold text-charcoal text-xl mb-3">{item.title}</h3>
                <p className="text-sm md:text-base text-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. For Professional Managers */}
      <section className="py-20 md:py-24 bg-[#FDFBF7]" aria-label="Professional Managers">
        <div className="max-w-marketing mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              className="flex-1 order-2 lg:order-1 rounded-2xl overflow-hidden shadow-xl border border-border/60 w-full bg-white"
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <img src={professionalWeb} alt="RentFlow Web Dashboard" className="w-full h-auto object-cover" />
            </motion.div>
            
            <motion.div className="flex-1 order-1 lg:order-2" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center text-teal-500 mb-6">
                <Briefcase size={24} />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal mb-4">For Professional Managers</h2>
              <p className="text-body text-base md:text-lg mb-10 leading-relaxed">
                Designed for teams managing complex portfolios and hundreds of units. Eliminate admin bottlenecks and align leasing teams around one source of truth.
              </p>
              
              <ul className="space-y-6">
                {[
                  { icon: <BarChart3 size={20}/>, title: "Multi-property Dashboards", desc: "Aggregate views across multiple landlords and separate trust accounts." },
                  { icon: <FileText size={20}/>, title: "Automated Late Payment Reminders", desc: "Customizable ledger workflows escalate delinquency via office AI text calls." },
                  { icon: <Server size={20}/>, title: "Central Maintenance Board", desc: "Smart routing assigns handymen through rule sets to eliminate dispatch delays." }
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4">
                    <div className="shrink-0 mt-1"><div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">{item.icon}</div></div>
                    <div>
                      <h4 className="font-bold text-charcoal text-lg mb-1">{item.title}</h4>
                      <p className="text-sm md:text-base text-muted leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. The Growth Journey */}
      <section className="py-20 md:py-24 bg-[#FDFBF7] border-t border-border/40" aria-label="Growth Journey">
        <div className="max-w-marketing mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-charcoal mb-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>The Growth Journey</motion.h2>
            <motion.p className="text-body text-base md:text-lg max-w-2xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              RentFlow natively shifts as your portfolio scales to new architectures.
            </motion.p>
          </div>
          
          <motion.div className="grid lg:grid-cols-3 gap-8 items-stretch" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {/* Foundation Tier */}
            <motion.div className="bg-white rounded-3xl p-8 border border-border/60 shadow-sm flex flex-col items-center justify-between" variants={fadeUp}>
              <div className="w-full text-center">
                <div className="inline-block bg-[#EBE9E4] px-4 py-1.5 rounded-full text-xs font-bold text-charcoal mb-6">TIER 1</div>
                <h3 className="text-2xl font-display font-bold text-charcoal mb-2">Foundation</h3>
                <p className="text-[#D35400] font-bold text-sm md:text-base mb-8">1-10 Properties</p>
                <ul className="space-y-4 text-sm md:text-base text-muted w-full text-left mb-8">
                  <li className="flex items-center gap-3"><Check size={20} className="text-primary shrink-0" /> <span>Automated rent collection</span></li>
                  <li className="flex items-center gap-3"><Check size={20} className="text-primary shrink-0" /> <span>Digital lease storage</span></li>
                  <li className="flex items-center gap-3"><Check size={20} className="text-primary shrink-0" /> <span>In-app phone support</span></li>
                </ul>
              </div>
              <Button variant="outline" className="w-full">Get Started</Button>
            </motion.div>
            
            {/* Optimization Tier (Highlighted) */}
            <motion.div className="bg-[#0B4F45] rounded-3xl p-8 md:p-10 shadow-xl flex flex-col items-center justify-between relative transform lg:-translate-y-4" variants={fadeUp}>
              <div className="absolute top-0 right-0 bg-[#D35400] text-white text-xs font-bold px-4 py-2 uppercase rounded-bl-xl rounded-tr-3xl">Popular</div>
              <div className="w-full text-center">
                <div className="inline-block bg-white/10 px-4 py-1.5 rounded-full text-xs font-bold text-white mb-6">TIER 2</div>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">Optimization</h3>
                <p className="text-[#D35400] font-bold text-sm md:text-base mb-8 border-b border-white/20 pb-8">10-50 Properties</p>
                <ul className="space-y-4 text-sm md:text-base text-white/90 w-full text-left mb-8">
                  <li className="flex items-start gap-3"><Check size={20} className="text-primary-300 shrink-0 mt-0.5" /> <span>Multi-property dashboard</span></li>
                  <li className="flex items-start gap-3"><Check size={20} className="text-primary-300 shrink-0 mt-0.5" /> <span>Vendor management portal</span></li>
                  <li className="flex items-start gap-3"><Check size={20} className="text-primary-300 shrink-0 mt-0.5" /> <span>Advanced API tracking</span></li>
                </ul>
              </div>
              <Button className="w-full !bg-[#D35400] hover:!bg-[#e66a1a] text-white">Upgrade Now</Button>
            </motion.div>
            
            {/* Institutional Tier */}
            <motion.div className="bg-white rounded-3xl p-8 border border-border/60 shadow-sm flex flex-col items-center justify-between" variants={fadeUp}>
              <div className="w-full text-center">
                <div className="inline-block bg-[#EBE9E4] px-4 py-1.5 rounded-full text-xs font-bold text-charcoal mb-6">TIER 3</div>
                <h3 className="text-2xl font-display font-bold text-charcoal mb-2">Institutional</h3>
                <p className="text-[#D35400] font-bold text-sm md:text-base mb-8">50+ Properties</p>
                <ul className="space-y-4 text-sm md:text-base text-muted w-full text-left mb-8">
                  <li className="flex items-center gap-3"><Check size={20} className="text-primary shrink-0" /> <span>Custom SSO Integrations</span></li>
                  <li className="flex items-center gap-3"><Check size={20} className="text-primary shrink-0" /> <span>Dedicated account executive</span></li>
                  <li className="flex items-center gap-3"><Check size={20} className="text-primary shrink-0" /> <span>Multi-level sub-ledgers</span></li>
                </ul>
              </div>
              <Button variant="outline" className="w-full">Contact Sales</Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 6. For Institutional Investors */}
      <section className="py-20 md:py-32 bg-[#0B4F45] text-white" aria-label="Institutional Investors">
        <div className="max-w-marketing mx-auto px-6">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-primary-100 mb-6 mx-auto">
              <TrendingUp size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">For Institutional Investors</h2>
            <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">
              Track ROI, operating yields, and financial transparency for real estate asset management teams.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <motion.div className="bg-[#0A3D36] rounded-2xl p-8 border border-white/5" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h3 className="font-bold text-xl mb-3 text-white">Financial Dashboards</h3>
              <p className="text-sm md:text-base text-white/60 mb-6 leading-relaxed">Real-time IRR and NOI tracking over customizable fiscal period modeling.</p>
              <div className="flex items-end gap-2 h-12 opacity-60">
                <div className="w-4 bg-white h-1/3 rounded-t-sm"></div>
                <div className="w-4 bg-white h-2/3 rounded-t-sm"></div>
                <div className="w-4 bg-white h-full rounded-t-sm"></div>
              </div>
            </motion.div>
            
            <motion.div className="bg-[#0A3D36] rounded-2xl p-8 border border-white/5" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h3 className="font-bold text-xl mb-3 text-white">CSV Export Engine</h3>
              <p className="text-sm md:text-base text-white/60 mb-6 leading-relaxed">Export full ledgers seamlessly for external corporate auditing workflows.</p>
              <div className="flex items-center gap-3 text-sm font-mono text-white/80">
                <FileText size={20} /> DATA_PULL_Q3.CSV
              </div>
            </motion.div>
            
            <motion.div className="bg-[#0A3D36] rounded-2xl p-8 border border-white/5" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h3 className="font-bold text-xl mb-3 text-white">ROI Tracking</h3>
              <p className="text-sm md:text-base text-white/60 mb-6 leading-relaxed">See accurate live insights across your aggregated portfolio per asset.</p>
              <div className="text-3xl md:text-4xl font-display font-bold text-white">
                +12.4% <span className="text-sm font-sans font-normal text-white/50 ml-2">YoY Avg. Yield</span>
              </div>
            </motion.div>
          </div>
          
          {/* Chart Graphic */}
          <motion.div 
            className="bg-[#0A3D36] border border-white/5 rounded-2xl p-8 md:p-10"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
              <h4 className="text-sm md:text-base font-bold text-white/80 uppercase tracking-wide">YoY Rent Yield across all portfolios</h4>
              <div className="flex items-center gap-6 text-sm font-medium text-white/60">
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-[#D35400]"></div> Revenues</div>
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-primary-200"></div> Occupancy</div>
              </div>
            </div>
            
            <div className="flex items-end justify-between h-48 md:h-64 gap-2 md:gap-4">
              {[40, 45, 50, 58, 65, 70, 75, 80, 85, 95].map((height, i) => (
                <div key={i} className="w-full relative group">
                  <div className="absolute bottom-0 w-full bg-[#6D5A43] hover:bg-[#836C50] transition-colors rounded-t-md" style={{ height: `${height}%` }}></div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. Seamless Ecosystem Connectivity */}
      <section className="py-20 md:py-24 bg-[#EBE9E4]" aria-label="Ecosystem">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <motion.h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal mb-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>Seamless Ecosystem Connectivity</motion.h2>
          <motion.p className="text-body text-base md:text-lg max-w-2xl mx-auto mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            RentFlow doesn't exist in a vacuum. We connect with the tools you already rely on to create a unified management architecture.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mb-16 opacity-80"
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            {/* Logo representations */}
            <div className="flex flex-col items-center gap-3 text-sm md:text-base font-semibold text-charcoal"><div className="w-16 h-16 bg-white border border-border/50 rounded-2xl flex items-center justify-center shadow-md"><Server size={28}/></div>QuickBooks</div>
            <div className="flex flex-col items-center gap-3 text-sm md:text-base font-semibold text-charcoal"><div className="w-16 h-16 bg-white border border-border/50 rounded-2xl flex items-center justify-center shadow-md"><Activity size={28}/></div>Stripe</div>
            <div className="flex flex-col items-center gap-3 text-sm md:text-base font-semibold text-charcoal"><div className="w-16 h-16 bg-white border border-border/50 rounded-2xl flex items-center justify-center shadow-md"><Briefcase size={28}/></div>Salesforce</div>
            <div className="flex flex-col items-center gap-3 text-sm md:text-base font-semibold text-charcoal"><div className="w-16 h-16 bg-white border border-border/50 rounded-2xl flex items-center justify-center shadow-md"><Shield size={28}/></div>Xero</div>
            <div className="flex flex-col items-center gap-3 text-sm md:text-base font-semibold text-charcoal"><div className="w-16 h-16 bg-white border border-border/50 rounded-2xl flex items-center justify-center shadow-md"><Building size={28}/></div>Plaid</div>
          </motion.div>
          
          <motion.div 
            className="bg-[#0B4F45] rounded-2xl px-8 py-6 md:py-8 relative flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D35400] text-white text-xs font-bold px-4 py-1 uppercase rounded-full tracking-wider shadow-md">Integrations</div>
            <p className="text-sm md:text-base text-white/90 text-center md:text-left max-w-sm mt-4 md:mt-0 leading-relaxed">Browse our robust API to build custom integrations or securely sync critical portfolio ledgers to your systems.</p>
            <Button variant="ghost" className="text-white hover:bg-white/10 text-sm font-bold tracking-wider uppercase" onClick={() => {}}>
              View API Dashboard <ArrowRight size={18} className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 8. The RentFlow Process */}
      <section className="py-20 md:py-24 bg-[#FDFBF7]" aria-label="Process">
        <div className="max-w-marketing mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal mb-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>The RentFlow Process</motion.h2>
            <motion.p className="text-body text-base md:text-lg max-w-2xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              Four simple steps to modernize your operations.
            </motion.p>
          </div>
          
          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {[
              { title: "1. Onboard Properties", desc: "Bulk import or manually add details into secure digital vaults.", icon: <Building size={24} /> },
              { title: "2. Invite Residents", desc: "Automated SMS/Email links invite tenants directly to the portal.", icon: <Mail size={24} /> },
              { title: "3. Automate Rent", desc: "Sync bank accounts and set recurring billing reminders and auto-drafts.", icon: <Activity size={24} /> },
              { title: "4. Analyze Growth", desc: "Visualize portfolio health in real-time, generate reports, and plan.", icon: <LineChart size={24} /> },
            ].map((item, idx) => (
              <motion.div key={idx} className="text-center flex flex-col items-center bg-white p-8 rounded-3xl border border-border/40 shadow-sm hover:shadow-md transition-shadow" variants={fadeUp}>
                <div className="w-16 h-16 bg-red-50 text-red-400 rounded-full flex items-center justify-center mb-6 border border-red-100">
                  {item.icon}
                </div>
                <h3 className="font-bold text-charcoal text-xl mb-3">{item.title}</h3>
                <p className="text-sm md:text-base text-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 9. FAQ Section */}
      <section className="py-20 md:py-24 bg-[#EBE9E4]" aria-label="FAQ">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="text-center mb-12">
            <motion.h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal mb-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>Frequently Asked Questions</motion.h2>
            <motion.p className="text-body text-base md:text-lg" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>Common inquiries regarding our platform and security.</motion.p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div 
                key={idx} 
                className="bg-white border border-border/30 rounded-xl overflow-hidden shadow-sm"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <button 
                  className="w-full text-left px-6 py-5 flex items-center justify-between font-bold text-charcoal text-base md:text-lg focus-visible:outline-none hover:bg-black/5 transition-colors"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={openFaq === idx}
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp size={20} className="text-muted shrink-0 ml-4" /> : <ChevronDown size={20} className="text-muted shrink-0 ml-4" />}
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-muted text-base leading-relaxed border-t border-border/20 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. CTA */}
      <section className="py-24 md:py-32 bg-[#FDFBF7] text-center" aria-label="Call to Action">
        <div className="max-w-[800px] mx-auto px-6">
          <motion.h2 
            className="text-4xl md:text-5xl font-display font-bold text-charcoal mb-6"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            Ready to modernize your operations?
          </motion.h2>
          <motion.p 
            className="text-body text-lg md:text-xl max-w-2xl mx-auto mb-10"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            Join 500+ top asset managers who scale their portfolios with RentFlow.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <Button size="lg" className="!bg-[#0B4F45] text-white hover:!bg-[#093a33] md:w-auto w-full" onClick={() => navigate('/signup')}>
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg" className="text-charcoal border-charcoal/20 hover:bg-warm bg-white md:w-auto w-full" onClick={() => navigate('/contact')}>
              Contact Sales
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Solutions;
