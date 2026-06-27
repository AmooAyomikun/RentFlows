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
import solutionsHeroBg from '../../assets/solutions_hero_bg.png';

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

const solutionsTabs = [
  {
    title: "Independent Landlords",
    badge: "1 - 20 Units",
    headline: "Put your rental income on autopilot.",
    desc: "Stop chasing bank transfers. Collect rent automatically, issue digital NDPR-compliant receipts, and track maintenance requests without WhatsApp drama.",
    stats: "98% On-Time Collection",
    ctaText: "Start Free Trial",
    targetId: "independent"
  },
  {
    title: "Property Managers",
    badge: "20 - 150 Units",
    headline: "Scale your portfolio without scaling headcount.",
    desc: "Multi-owner accounting, automated tenant reminder cascades, vendor dispatch boards, and one-click financial CSV reports for your property clients.",
    stats: "15+ Hrs Saved Weekly",
    ctaText: "Explore Pro Features",
    targetId: "professional"
  },
  {
    title: "Institutional Portfolios",
    badge: "150+ Units",
    headline: "Enterprise-grade infrastructure & custom APIs.",
    desc: "Custom ERP integrations, dedicated account managers, custom branded tenant apps, and custom SLA guarantees tailored for large real estate funds.",
    stats: "99.9% Uptime SLA",
    ctaText: "Contact Enterprise Sales",
    targetId: "enterprise"
  }
];

const Solutions = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    { q: "How secure is my data?", a: "We use bank-grade 256-bit encryption for all data storage and transmission. Our infrastructure is continuously audited by third-party security firms to ensure the highest level of protection." },
    { q: "Can I upgrade as my portfolio grows?", a: "Absolutely. RentFlow is designed to scale with you. You can move from our Foundation plan to Optimization or Institutional tiers at any time without data loss or service interruption." },
    { q: "Is there a limit on how many properties I can add?", a: "No, there are no limits on the number of properties you can add on our Optimization and Institutional plans. Our Foundation plan is optimized for portfolios up to 10 units." }
  ];

  return (
    <div className="w-full bg-white overflow-x-hidden">
      {/* 1. Hero Section — Interactive Segmented Control Showcase */}
      <section className="relative py-20 md:py-28 bg-[#061714] overflow-hidden" aria-label="Hero">
        {/* Glowing Background Elements */}
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-[#0B4F45]/30 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-[#C75B30]/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />

        <div className="relative z-10 max-w-marketing mx-auto px-6 w-full">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#E79868] text-xs font-bold tracking-widest uppercase mb-4">
              Tailored Architecture
            </span>
            <h1 className="font-display text-white font-black leading-[1.08] tracking-tight mb-4" style={{ fontSize: 'clamp(36px, 5vw, 58px)' }}>
              Solutions Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E79868] to-[#C75B30]">Your Exact Scale.</span>
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Select your portfolio scale below to see how RentFlow transforms your day-to-day real estate operations.
            </p>
          </div>

          {/* Segmented Control Tabs */}
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto p-1.5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md mb-10">
            {solutionsTabs.map((tab, idx) => (
              <button
                key={tab.title}
                onClick={() => setActiveTab(idx)}
                className={`flex-1 min-w-[160px] py-3 px-4 rounded-xl font-display font-bold text-sm transition-all duration-300 cursor-pointer ${
                  activeTab === idx
                    ? 'bg-[#0B4F45] text-white shadow-[0_4px_20px_rgba(11,79,69,0.5)] border border-white/20'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>

          {/* Active Tab Preview Showcase Card */}
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="bg-gradient-to-br from-white/[0.09] to-white/[0.03] border border-white/15 rounded-3xl p-8 md:p-12 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#C75B30]/15 rounded-full blur-[80px] pointer-events-none" />
                
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative z-10">
                  <div className="max-w-xl">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#C75B30]/20 text-[#E79868] font-mono text-xs font-bold mb-4 border border-[#C75B30]/30">
                      Portfolio Scale: {solutionsTabs[activeTab].badge}
                    </span>
                    <h3 className="font-display font-bold text-white text-2xl md:text-3xl mb-4 leading-tight">
                      {solutionsTabs[activeTab].headline}
                    </h3>
                    <p className="text-white/70 text-sm md:text-base leading-relaxed mb-6">
                      {solutionsTabs[activeTab].desc}
                    </p>
                    <div className="flex items-center gap-4">
                      <Button
                        size="lg"
                        className="bg-[#D35400] hover:bg-[#b04500] text-white border-none shadow-lg cursor-pointer"
                        onClick={() => navigate('/signup')}
                      >
                        {solutionsTabs[activeTab].ctaText}
                      </Button>
                      <button
                        onClick={() => document.getElementById(solutionsTabs[activeTab].targetId)?.scrollIntoView({ behavior: 'smooth' })}
                        className="text-white/80 hover:text-white text-sm font-semibold underline underline-offset-4 cursor-pointer flex items-center gap-1.5"
                      >
                        Learn more <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="w-full md:w-auto shrink-0 bg-[#0B4F45]/60 border border-white/10 rounded-2xl p-6 text-center min-w-[200px]">
                    <span className="text-white/50 text-xs uppercase tracking-wider block mb-1">Impact Metric</span>
                    <span className="font-display font-black text-[#E79868] text-2xl md:text-3xl block mb-1">
                      {solutionsTabs[activeTab].stats}
                    </span>
                    <span className="text-white/70 text-[11px] flex items-center justify-center gap-1 mt-2">
                      <CheckCircle2 size={12} className="text-emerald-400" /> Guaranteed Results
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 2. For the Independent Landlord */}
      <section id="independent" className="py-20 md:py-24 bg-warm" aria-label="Independent Landlord">
        <div className="max-w-marketing mx-auto px-6 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div className="flex-1" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center text-red-400 mb-5">
                <Home size={16} />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal mb-4">For the Independent Landlord</h2>
              <p className="text-body text-base md:text-lg mb-10 leading-relaxed max-w-lg">
                Scaling a single property or a small portfolio requires focus, not friction. We built RentFlow to eliminate the manual overhead and the "WhatsApp Problem."
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-xl border border-border/50 shadow-sm">
                  <Activity size={16} className="text-primary mb-3" />
                  <h3 className="font-bold text-charcoal text-[13px] mb-1.5">Online Rent Payments</h3>
                  <p className="text-[11px] text-muted leading-relaxed">Secure, instant bank-to-bank transfers with automated tracking.</p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-border/50 shadow-sm">
                  <Mail size={16} className="text-primary mb-3" />
                  <h3 className="font-bold text-charcoal text-[13px] mb-1.5">Auto-Generated Receipts</h3>
                  <p className="text-[11px] text-muted leading-relaxed">End-to-end audit trails for every transaction, automatically emailed.</p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-border/50 shadow-sm">
                  <CheckCircle2 size={16} className="text-primary mb-3" />
                  <h3 className="font-bold text-charcoal text-[13px] mb-1.5">Maintenance Tracking</h3>
                  <p className="text-[11px] text-muted leading-relaxed">Centralized requests with photo uploads and progress updates.</p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-border/50 shadow-sm">
                  <Building size={16} className="text-primary mb-3" />
                  <h3 className="font-bold text-charcoal text-[13px] mb-1.5">Bank-Grade Trust</h3>
                  <p className="text-[11px] text-muted leading-relaxed">Enterprise-level security for every tenant and transaction.</p>
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
      <section className="py-20 md:py-24 bg-white" aria-label="Bank-Grade Infrastructure">
        <div className="max-w-marketing mx-auto px-6 w-full text-center">
          <motion.p className="text-[11px] md:text-xs font-bold text-[#D35400] uppercase tracking-widest mb-3" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>UNCOMPROMISING SAFETY</motion.p>
          <motion.h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal mb-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>Bank-Grade Infrastructure</motion.h2>
          <motion.p className="text-body text-base md:text-lg max-w-2xl mx-auto mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            We protect your assets and data with the same rigorous standards as leading global financial institutions.
          </motion.p>
          
          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {[
              { icon: <Lock size={16} />, title: "Data Encryption", desc: "Industry-standard 256-bit AES encryption for all financial and personal data at rest and in transit." },
              { icon: <Shield size={16} />, title: "Secure Payments", desc: "PCI-DSS Level 1 compliant payment processing ensures every transaction is handled with maximum security." },
              { icon: <Activity size={16} />, title: "Activity Audit", desc: "Comprehensive real-time logs for every transaction and administrative action for total accountability." },
              { icon: <Eye size={16} />, title: "Privacy First", desc: "Full GDPR compliance and adherence to local data protection laws. Your data belongs to you, always." }
            ].map((item, idx) => (
              <motion.div key={idx} className="bg-white p-5 md:p-6 rounded-xl border border-border/40 shadow-sm" variants={fadeUp}>
                <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center text-red-400 mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-charcoal text-[13px] mb-2">{item.title}</h3>
                <p className="text-[11px] text-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. For Professional Managers */}
      <section className="py-20 md:py-24 bg-warm" aria-label="Professional Managers">
        <div className="max-w-marketing mx-auto px-6 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              className="flex-1 order-2 lg:order-1 rounded-2xl overflow-hidden shadow-xl border border-border/60 w-full bg-white"
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <img src={professionalWeb} alt="RentFlow Web Dashboard" className="w-full h-auto object-cover" />
            </motion.div>
            
            <motion.div className="flex-1 order-1 lg:order-2" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600 mb-5">
                <Briefcase size={16} />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal mb-4">For Professional Managers</h2>
              <p className="text-body text-base md:text-lg mb-8 leading-relaxed max-w-lg">
                Designed for teams managing complex portfolio architectures. Elevate your operational excellence with high-density data and workflow automation.
              </p>
              
              <ul className="space-y-5">
                {[
                  { title: "Multi-property Dashboards", desc: "Aggregated views across your entire portfolio with one-click drill-downs." },
                  { title: "Automated Late Payment Reminders", desc: "Customizable nudge engine that reduces delinquency by 40% on average." },
                  { title: "Kanban Maintenance Boards", desc: "Visual task management for your field staff and external vendors." }
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <div className="shrink-0 mt-0.5"><CheckCircle2 size={16} className="text-teal-600" /></div>
                    <div>
                      <h4 className="font-bold text-charcoal text-[13px] mb-1">{item.title}</h4>
                      <p className="text-[11px] text-muted leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. The Growth Journey */}
      <section className="py-20 md:py-24 bg-white border-t border-border" aria-label="Growth Journey">
        <div className="max-w-marketing mx-auto px-6 w-full">
          <div className="text-center mb-16">
            <motion.h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal mb-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>The Growth Journey</motion.h2>
            <motion.p className="text-body text-base md:text-lg max-w-2xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              RentFlow natively shifts as your portfolio scales to new architectures.
            </motion.p>
          </div>
          
          <motion.div className="grid lg:grid-cols-3 gap-6 items-stretch" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {/* Foundation Tier */}
            <motion.div className="bg-white rounded-[24px] p-6 lg:p-8 border border-border/60 shadow-sm flex flex-col items-center justify-between" variants={fadeUp}>
              <div className="w-full text-center">
                <div className="inline-block bg-[#EBE9E4] px-3 py-1 rounded-full text-[10px] font-bold text-charcoal mb-5">TIER 1</div>
                <h3 className="text-2xl font-display font-bold text-charcoal mb-1">Foundation</h3>
                <p className="text-[#D35400] font-bold text-[13px] mb-6">1-10 Properties</p>
                <ul className="space-y-3 text-[13px] text-muted w-full text-left mb-6">
                  <li className="flex items-center gap-3"><Check size={16} className="text-primary shrink-0" /> <span>Automated rent collection</span></li>
                  <li className="flex items-center gap-3"><Check size={16} className="text-primary shrink-0" /> <span>Digital lease storage</span></li>
                  <li className="flex items-center gap-3"><Check size={16} className="text-primary shrink-0" /> <span>In-app phone support</span></li>
                </ul>
              </div>
              <Button variant="outline" className="w-full text-[13px] py-2.5">Get Started</Button>
            </motion.div>
            
            {/* Optimization Tier (Highlighted) */}
            <motion.div className="bg-[#0B4F45] rounded-[24px] p-6 lg:p-8 shadow-xl flex flex-col items-center justify-between relative transform lg:-translate-y-4" variants={fadeUp}>
              <div className="absolute top-0 right-0 bg-[#D35400] text-white text-[10px] font-bold px-3 py-1.5 uppercase rounded-bl-xl rounded-tr-[24px]">Popular</div>
              <div className="w-full text-center">
                <div className="inline-block bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold text-white mb-5">TIER 2</div>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-1">Optimization</h3>
                <p className="text-[#D35400] font-bold text-[13px] mb-6 border-b border-white/10 pb-6">10-50 Properties</p>
                <ul className="space-y-3 text-[13px] text-white/90 w-full text-left mb-6">
                  <li className="flex items-start gap-3"><Check size={16} className="text-primary-300 shrink-0 mt-0.5" /> <span>Multi-property dashboard</span></li>
                  <li className="flex items-start gap-3"><Check size={16} className="text-primary-300 shrink-0 mt-0.5" /> <span>Vendor management portal</span></li>
                  <li className="flex items-start gap-3"><Check size={16} className="text-primary-300 shrink-0 mt-0.5" /> <span>Advanced API tracking</span></li>
                </ul>
              </div>
              <Button className="w-full !bg-[#D35400] hover:!bg-[#e66a1a] text-white text-[13px] py-2.5 border-none">Upgrade Now</Button>
            </motion.div>
            
            {/* Institutional Tier */}
            <motion.div className="bg-white rounded-[24px] p-6 lg:p-8 border border-border/60 shadow-sm flex flex-col items-center justify-between" variants={fadeUp}>
              <div className="w-full text-center">
                <div className="inline-block bg-[#EBE9E4] px-3 py-1 rounded-full text-[10px] font-bold text-charcoal mb-5">TIER 3</div>
                <h3 className="text-2xl font-display font-bold text-charcoal mb-1">Institutional</h3>
                <p className="text-[#D35400] font-bold text-[13px] mb-6">50+ Properties</p>
                <ul className="space-y-3 text-[13px] text-muted w-full text-left mb-6">
                  <li className="flex items-center gap-3"><Check size={16} className="text-primary shrink-0" /> <span>Custom SSO Integrations</span></li>
                  <li className="flex items-center gap-3"><Check size={16} className="text-primary shrink-0" /> <span>Dedicated account executive</span></li>
                  <li className="flex items-center gap-3"><Check size={16} className="text-primary shrink-0" /> <span>Multi-level sub-ledgers</span></li>
                </ul>
              </div>
              <Button variant="outline" className="w-full text-[13px] py-2.5">Contact Sales</Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 6. For Institutional Investors */}
      <section className="py-20 md:py-28 bg-[#0B4F45] text-white" aria-label="Institutional Investors">
        <div className="max-w-marketing mx-auto px-6 w-full">
          <div className="text-center mb-16">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-primary-100 mb-5 mx-auto">
              <TrendingUp size={16} />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">For Institutional Investors</h2>
            <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">
              Precision reporting and total financial transparency for multi-asset management teams.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-5 mb-10">
            <motion.div className="bg-[#0A3D36] rounded-xl p-5 md:p-6 border border-white/5" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h3 className="font-bold text-[14px] mb-2 text-white">Financial Dashboards</h3>
              <p className="text-[11px] md:text-[12px] text-white/60 mb-5 leading-relaxed">Real-time IRR and ROI tracking with customizable fiscal period reporting.</p>
              <div className="flex items-end gap-1.5 h-10 opacity-70">
                <div className="w-2.5 md:w-3 bg-white h-1/3 rounded-t-sm"></div>
                <div className="w-2.5 md:w-3 bg-white h-2/3 rounded-t-sm"></div>
                <div className="w-2.5 md:w-3 bg-white h-full rounded-t-sm"></div>
              </div>
            </motion.div>
            
            <motion.div className="bg-[#0A3D36] rounded-xl p-5 md:p-6 border border-white/5" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h3 className="font-bold text-[14px] mb-2 text-white">CSV Export Engine</h3>
              <p className="text-[11px] md:text-[12px] text-white/60 mb-5 leading-relaxed">One-click data portability for accountants and external auditing platforms.</p>
              <div className="flex items-center gap-2 text-[10px] md:text-[11px] font-mono text-white/80">
                <FileText size={14} /> RENTFLOW_Q4_FINAL.CSV
              </div>
            </motion.div>
            
            <motion.div className="bg-[#0A3D36] rounded-xl p-5 md:p-6 border border-white/5" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h3 className="font-bold text-[14px] mb-2 text-white">ROI Tracking</h3>
              <p className="text-[11px] md:text-[12px] text-white/60 mb-5 leading-relaxed">Advanced yield analysis and capital improvement tracking per asset.</p>
              <div className="text-2xl font-display font-bold text-white">
                +12.4% <span className="text-[10px] font-sans font-normal text-white/50 ml-1">YoY Net Yield</span>
              </div>
            </motion.div>
          </div>
          
          {/* Chart Graphic */}
          <motion.div 
            className="bg-[#0A3D36] border border-white/5 rounded-xl p-5 md:p-8"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <h4 className="text-[10px] font-bold text-white/70 uppercase tracking-widest">PORTFOLIO PERFORMANCE OVERVIEW</h4>
              <div className="flex items-center gap-4 text-[10px] font-medium text-white/60">
                <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#D35400]"></div> Revenue</div>
                <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-primary-200"></div> Occupancy</div>
              </div>
            </div>
            
            <div className="flex items-end justify-between h-32 md:h-48 gap-2 md:gap-3 border-b border-white/10 pb-1">
              {[40, 45, 50, 58, 65, 70, 75, 80, 85, 95].map((height, i) => (
                <div key={i} className="w-full h-full relative group">
                  <div className="absolute bottom-0 w-full bg-[#7C6146] hover:bg-[#8D7053] transition-colors rounded-t-sm" style={{ height: `${height}%` }}></div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. Seamless Ecosystem Connectivity */}
      <section className="py-20 md:py-24 bg-warm" aria-label="Ecosystem">
        <div className="max-w-marketing mx-auto px-6 w-full text-center">
          <motion.h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal mb-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>Seamless Ecosystem Connectivity</motion.h2>
          <motion.p className="text-body text-base md:text-lg max-w-2xl mx-auto mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            RentFlow doesn't exist in a vacuum. We connect with the tools you already rely on to create a unified management architecture.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap justify-center items-center gap-6 md:gap-10 mb-16 opacity-80"
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            {/* Logo representations */}
            <div className="flex flex-col items-center gap-2 text-[11px] md:text-xs font-semibold text-charcoal"><div className="w-10 h-10 bg-white border border-border/50 rounded-xl flex items-center justify-center shadow-sm"><Server size={18}/></div>QuickBooks</div>
            <div className="flex flex-col items-center gap-2 text-[11px] md:text-xs font-semibold text-charcoal"><div className="w-10 h-10 bg-white border border-border/50 rounded-xl flex items-center justify-center shadow-sm"><Activity size={18}/></div>Stripe</div>
            <div className="flex flex-col items-center gap-2 text-[11px] md:text-xs font-semibold text-charcoal"><div className="w-10 h-10 bg-white border border-border/50 rounded-xl flex items-center justify-center shadow-sm"><Briefcase size={18}/></div>Salesforce</div>
            <div className="flex flex-col items-center gap-2 text-[11px] md:text-xs font-semibold text-charcoal"><div className="w-10 h-10 bg-white border border-border/50 rounded-xl flex items-center justify-center shadow-sm"><Shield size={18}/></div>Xero</div>
            <div className="flex flex-col items-center gap-2 text-[11px] md:text-xs font-semibold text-charcoal"><div className="w-10 h-10 bg-white border border-border/50 rounded-xl flex items-center justify-center shadow-sm"><Building size={18}/></div>Plaid</div>
          </motion.div>
          
          <motion.div 
            className="bg-[#0B4F45] rounded-xl px-5 py-4 md:py-5 relative flex flex-col md:flex-row items-center justify-between gap-5 shadow-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#D35400] text-white text-[9px] font-bold px-3 py-0.5 uppercase rounded-full tracking-wider shadow-sm">Integrations</div>
            <p className="text-[12px] md:text-[13px] text-white/90 text-center md:text-left max-w-sm mt-2 md:mt-0 leading-relaxed">Browse our robust API to build custom integrations or securely sync critical portfolio ledgers.</p>
            <Button variant="ghost" className="text-white hover:bg-white/10 text-[10px] md:text-[11px] font-bold tracking-wider uppercase" onClick={() => {}}>
              View API Dashboard <ArrowRight size={14} className="ml-1.5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 8. The RentFlow Process */}
      <section className="py-20 md:py-24 bg-white" aria-label="Process">
        <div className="max-w-marketing mx-auto px-6 w-full">
          <div className="text-center mb-14">
            <motion.h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal mb-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>The RentFlow Process</motion.h2>
            <motion.p className="text-body text-base md:text-lg max-w-2xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              Four simple steps to modernize your operations.
            </motion.p>
          </div>
          
          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {[
              { title: "1. Onboard Properties", desc: "Bulk import or manually add details into secure digital vaults.", icon: <Building size={16} /> },
              { title: "2. Invite Residents", desc: "Automated SMS/Email links invite tenants directly to the portal.", icon: <Mail size={16} /> },
              { title: "3. Automate Rent", desc: "Sync bank accounts and set recurring billing reminders and auto-drafts.", icon: <Activity size={16} /> },
              { title: "4. Analyze Growth", desc: "Visualize portfolio health in real-time, generate reports, and plan.", icon: <LineChart size={16} /> },
            ].map((item, idx) => (
              <motion.div key={idx} className="text-center flex flex-col items-center bg-white p-6 rounded-[20px] border border-border/40 shadow-sm" variants={fadeUp}>
                <div className="w-8 h-8 bg-red-50 text-red-400 rounded-lg flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-charcoal text-[14px] mb-2">{item.title}</h3>
                <p className="text-[11px] md:text-[12px] text-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 9. FAQ Section */}
      <section className="py-20 md:py-24 bg-warm" aria-label="FAQ">
        <div className="max-w-marketing mx-auto px-6 w-full">
          <div className="text-center mb-12">
            <motion.h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal mb-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>Frequently Asked Questions</motion.h2>
            <motion.p className="text-body text-base md:text-lg" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>Common inquiries regarding our platform and security.</motion.p>
          </div>
          
          <div className="space-y-3">
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
                  className="w-full text-left px-5 py-4 flex items-center justify-between font-bold text-charcoal text-[13px] md:text-[14px] focus-visible:outline-none hover:bg-black/5 transition-colors"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={openFaq === idx}
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp size={16} className="text-muted shrink-0 ml-4" /> : <ChevronDown size={16} className="text-muted shrink-0 ml-4" />}
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 text-muted text-[12px] md:text-[13px] leading-relaxed border-t border-border/20 pt-3">
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
      <section className="py-20 md:py-24 bg-white" aria-label="Call to Action">
        <div className="max-w-marketing mx-auto px-6 w-full">
          <motion.div
            className="bg-[#0B4F45] rounded-3xl px-10 py-16 md:px-16 md:py-20 text-center text-white relative overflow-hidden shadow-2xl"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#073A33]/80 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-[-20%] right-[-10%] w-[350px] h-[350px] bg-[#C75B30]/15 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="text-[#E79868] text-micro font-bold tracking-[0.15em] uppercase mb-4 block">
                Join 500+ top asset managers
              </span>
              <motion.h2
                className="font-display font-bold text-h3 md:text-h2-sm text-white mb-5 leading-tight"
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              >
                Ready to modernize your operations?
              </motion.h2>
              <motion.p
                className="text-white/70 text-body mb-8 leading-relaxed max-w-xl mx-auto"
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              >
                Join 500+ top asset managers who scale their portfolios with RentFlow.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row justify-center gap-4"
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              >
                <button
                  onClick={() => navigate('/signup')}
                  className="px-8 py-3.5 rounded-xl bg-[#C75B30] hover:bg-[#A94A24] text-white font-bold text-sm cursor-pointer transition-all shadow-lg"
                >
                  Start Free Trial
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="px-8 py-3.5 rounded-xl border-2 border-white/25 text-white hover:bg-white/10 font-semibold text-sm cursor-pointer transition-all backdrop-blur-md"
                >
                  Contact Sales
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Solutions;
