import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Shield, FileText, Wrench, CheckCircle,
  Bell, CreditCard, Clock, Check, ChevronDown, MonitorSmartphone, HeartHandshake, MapPin, Users
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Accordion from '../../components/ui/Accordion';

// Mockup image for Hero
import residentExperienceImg from '../../assets/resident_experience_1782337375877.png';

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

const steps = [
  { num: '01', title: 'Receive your invite', desc: 'Your landlord sends you a personalised link. No searching, no downloading.' },
  { num: '02', title: 'Set your password', desc: 'Create a secure password and you\'re in — your lease details are already there.' },
  { num: '03', title: 'Pay rent anytime', desc: 'Three taps. Card, bank transfer or Paystack. Receipt downloads instantly.' },
];

const trustPoints = [
  { icon: Shield, title: 'Bank-grade security', desc: 'Your payment data is encrypted end-to-end using industry-standard TLS/SSL.' },
  { icon: FileText, title: 'Official receipts', desc: 'Every payment generates an official, timestamped receipt with a unique transaction reference.' },
  { icon: CheckCircle, title: 'NDPR compliant', desc: 'We handle your personal data in line with Nigeria\'s Data Protection Regulation.' },
];

const faqItems = [
  { id: 't1', question: 'Is it safe to pay rent through RentFlow?', answer: 'Yes. Payments are processed via Paystack, one of Africa\'s most trusted payment processors, with full fraud monitoring.' },
  { id: 't2', question: 'What if my landlord isn\'t on RentFlow yet?', answer: 'Ask your landlord to sign up — it takes under 5 minutes. Once they list your unit, they\'ll send you an invite link.' },
  { id: 't3', question: 'Do I pay any fees as a tenant?', answer: 'No. RentFlow is completely free for tenants. You pay your rent amount and nothing more.' },
  { id: 't4', question: 'Can I download proof of payment?', answer: 'Yes — every payment generates a PDF receipt that you can download and keep indefinitely.' },
];

const ForTenants = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#FDFBF7]">
      {/* =====================================================================
          NEW SECTIONS FROM DESIGN MOCKUP
          ===================================================================== */}
          
      {/* 1. Hero */}
      <section className="relative pt-[60px] pb-[40px] md:pt-[100px] md:pb-[80px] bg-[#0B4F45] overflow-hidden" aria-label="Tenant Hero">
        <div className="max-w-[1100px] mx-auto px-[24px]">
          <div className="flex flex-col lg:flex-row items-center gap-[40px] lg:gap-[60px]">
            <motion.div className="flex-1 w-full" initial="hidden" animate="visible" variants={fadeUp}>
              <div className="inline-block bg-[#D35400] text-white text-[10px] md:text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-[24px]">
                FOR PROFESSIONALS / TENANTS
              </div>
              <h1 className="font-display text-white text-display-sm lg:text-display mb-[20px] leading-tight font-bold tracking-tight">
                Rent Smarter,<br/>Build Your Future.
              </h1>
              <p className="text-white/80 text-body mb-[32px] leading-relaxed max-w-lg">
                Experience rental living designed for the 21st century. Pay rent, build credit, and manage your lifestyle from one unified dashboard.
              </p>
              <div className="flex flex-wrap gap-[16px]">
                <Button size="lg" className="bg-[#D35400] hover:bg-[#b04500] text-white border-none px-8" onClick={() => navigate('/signup?role=tenant')}>
                  Create Account
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8" onClick={() => {}}>
                  How it works
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex-1 w-full max-w-[400px] lg:max-w-[500px] mx-auto relative"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-white/5 rounded-[40px] -rotate-6 scale-105"></div>
                <img src={residentExperienceImg} alt="Tenant Dashboard on Phone" className="relative z-10 w-full h-auto drop-shadow-2xl" />
                <div className="absolute top-10 -right-6 z-20 bg-white rounded-xl shadow-xl p-3 flex items-center gap-3 animate-bounce">
                  <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center text-success"><Check size={16} className="stroke-[3]" /></div>
                  <div>
                    <p className="text-[10px] text-muted font-bold uppercase tracking-wider">Rent Paid</p>
                    <p className="font-display font-bold text-charcoal text-small">+$1,200</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Financial Empowerment */}
      <section className="py-[60px] md:py-[100px] bg-[#F4F3F0]" aria-label="Financial Empowerment">
        <div className="max-w-[1100px] mx-auto px-[24px]">
          <div className="flex flex-col lg:flex-row items-center gap-[40px] lg:gap-[80px]">
            {/* Graphic side */}
            <motion.div className="flex-1 w-full max-w-[500px]" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="bg-white p-6 md:p-8 rounded-[32px] shadow-sm border border-border/50">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-display font-bold text-charcoal text-small">Credit Builder Pro</span>
                  <span className="text-[10px] font-bold text-[#D35400] bg-[#FFF0E6] px-3 py-1 rounded-full uppercase">Active</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="border border-border/40 rounded-xl p-4">
                    <p className="text-[11px] text-muted mb-1">On-Time Payments</p>
                    <p className="font-display font-bold text-[#D35400] text-3xl">100%</p>
                  </div>
                  <div className="border border-border/40 rounded-xl p-4">
                    <p className="text-[11px] text-muted mb-1">Credit Score (avg)</p>
                    <p className="font-display font-bold text-[#D35400] text-3xl">+42 <span className="text-[11px] font-sans font-normal text-muted">pts</span></p>
                  </div>
                </div>
                <div className="bg-[#0B4F45] text-white p-4 rounded-xl flex flex-col justify-center">
                  <span className="text-[10px] text-white/70 font-bold uppercase tracking-wider mb-1">NEXT BUREAU REPORTING</span>
                  <span className="font-display font-bold text-sm">June 30, 2024</span>
                </div>
              </div>
            </motion.div>
            
            {/* Text side */}
            <motion.div className="flex-1" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="text-[11px] font-bold text-[#D35400] uppercase tracking-widest mb-3">FINANCIAL EMPOWERMENT</p>
              <h2 className="font-display font-bold text-charcoal text-h2-sm lg:text-h2 mb-6">Let Your Rent Work For You.</h2>
              <p className="text-body text-muted leading-relaxed mb-8">
                Traditionally, rent is your biggest expense that doesn't help your financial future. With RentFlow, we report every on-time payment to major credit bureaus, helping you build a mortgage-ready score while you rent.
              </p>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="shrink-0 mt-1"><Shield size={20} className="text-[#D35400]" /></div>
                  <div>
                    <h4 className="font-bold text-charcoal text-small mb-1">Automated Bureau Reporting</h4>
                    <p className="text-small text-muted leading-relaxed">Direct integration with Equifax, Experian, and TransUnion.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="shrink-0 mt-1"><Clock size={20} className="text-[#D35400]" /></div>
                  <div>
                    <h4 className="font-bold text-charcoal text-small mb-1">24-Month Back-Reporting</h4>
                    <p className="text-small text-muted leading-relaxed">Optionally report your past rental history for an instant boost.</p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. The "Rent Day" Harmony */}
      <section className="py-[60px] md:py-[100px] bg-[#EBE9E4]" aria-label="Rent Day Harmony">
        <div className="max-w-[1100px] mx-auto px-[24px]">
          <div className="text-center mb-[60px]">
            <motion.h2 className="font-display font-bold text-charcoal text-h2-sm lg:text-h2 mb-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>The "Rent Day" Harmony</motion.h2>
            <motion.p className="text-body text-muted max-w-xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              No more friction, no more anxiety. See how RentFlow turns payment day into a seamless 30-second ritual.
            </motion.p>
          </div>
          
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-[20px] lg:gap-[40px]" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {[
              { title: "1. Rent Reminder", desc: "Get a nudge 7 days before rent is due via in-app alerts and SMS.", icon: <Bell size={20} />, bg: "bg-[#D35400]", color: "text-white" },
              { title: "2. Instant Payment", desc: "Pay via Bank Transfer, Card, or Apple Pay in under 10 seconds.", icon: <CreditCard size={20} />, bg: "bg-[#0B4F45]", color: "text-white" },
              { title: "3. Digital Receipt", desc: "Receive a bank-grade digital PDF sent instantly to your email and app vault.", icon: <FileText size={20} />, bg: "bg-[#0B4F45]", color: "text-white" },
              { title: "4. Auto Updates", desc: "Dashboard reflects 'Paid' status and credit builder logs the action.", icon: <CheckCircle size={20} />, bg: "bg-[#0B4F45]", color: "text-white" }
            ].map((step, idx) => (
              <motion.div key={idx} className="text-center flex flex-col items-center" variants={fadeUp}>
                <div className={`w-14 h-14 ${step.bg} ${step.color} rounded-full flex items-center justify-center mb-6 shadow-lg`}>
                  {step.icon}
                </div>
                <h4 className="font-bold text-charcoal text-small mb-2">{step.title}</h4>
                <p className="text-[12px] text-muted leading-relaxed px-2">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Everything in One Vault */}
      <section className="py-[60px] md:py-[100px] bg-[#FDFBF7]" aria-label="Document Vault">
        <div className="max-w-[1100px] mx-auto px-[24px]">
          <div className="flex flex-col lg:flex-row items-center gap-[60px] lg:gap-[100px]">
            {/* Text Side */}
            <motion.div className="flex-1 w-full" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="font-display font-bold text-charcoal text-h2-sm lg:text-h2 mb-[40px] leading-tight">Everything in One Vault.</h2>
              <div className="space-y-[32px]">
                <div className="flex gap-[16px]">
                  <div className="w-10 h-10 bg-[#FFF0E6] text-[#D35400] rounded-xl flex items-center justify-center shrink-0">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal text-small mb-2">Digital Document Vault</h4>
                    <p className="text-small text-muted leading-relaxed">Access your lease agreements, move-in inspections, and tax receipts anytime. No more hunting through old emails.</p>
                  </div>
                </div>
                <div className="flex gap-[16px]">
                  <div className="w-10 h-10 bg-[#FFF0E6] text-[#D35400] rounded-xl flex items-center justify-center shrink-0">
                    <Wrench size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal text-small mb-2">Maintenance Tracker</h4>
                    <p className="text-small text-muted leading-relaxed">Track repairs like a FedEx package. See when it's assigned, when the plumber is arriving, and sign off digitally.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Graphic Side */}
            <motion.div className="flex-1 w-full" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="bg-[#0B4F45] rounded-[24px] p-8 shadow-xl">
                <div className="bg-white rounded-[16px] shadow-sm p-5 border border-border/40">
                  <div className="flex items-center justify-between border-b border-border/40 pb-4 mb-4">
                    <span className="font-display font-bold text-micro text-muted tracking-widest uppercase">DOCUMENT VAULT</span>
                    <div className="w-6 h-6 rounded-full bg-warm flex items-center justify-center"><ArrowRight size={12} className="text-muted"/></div>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between border border-border/40 p-3 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText size={16} className="text-[#D35400]" />
                        <span className="text-[11px] font-medium text-charcoal">Lease_Agreement_2024.pdf</span>
                      </div>
                      <ArrowRight size={14} className="text-muted" />
                    </div>
                    <div className="flex items-center justify-between border border-border/40 p-3 rounded-lg">
                      <div className="flex items-center gap-3">
                        <MonitorSmartphone size={16} className="text-primary" />
                        <span className="text-[11px] font-medium text-charcoal">Move-in_Inspection_Photos</span>
                      </div>
                      <ArrowRight size={14} className="text-muted" />
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border/40">
                    <span className="font-display font-bold text-[10px] text-muted tracking-widest uppercase mb-3 block">RECENT MAINTENANCE</span>
                    <div className="relative pl-4 border-l-2 border-[#10B981] space-y-4">
                      <div className="relative">
                        <div className="absolute w-2 h-2 rounded-full bg-[#10B981] -left-[21px] top-1 border-2 border-white"></div>
                        <p className="text-[11px] font-bold text-charcoal mb-0.5">Sink Leak Fixed</p>
                        <p className="text-[10px] text-muted">Today, 10:30 AM</p>
                      </div>
                      <div className="relative">
                        <div className="absolute w-2 h-2 rounded-full bg-border -left-[21px] top-1 border-2 border-white"></div>
                        <p className="text-[11px] font-bold text-charcoal mb-0.5">Plumber Dispatched</p>
                        <p className="text-[10px] text-muted">Today, 08:45 AM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Tenant Perks */}
      <section className="py-[60px] md:py-[100px] bg-[#FDFBF7] border-t border-border/40" aria-label="Tenant Perks">
        <div className="max-w-[1100px] mx-auto px-[24px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-[40px] gap-6">
            <div>
              <p className="text-[11px] font-bold text-[#D35400] uppercase tracking-widest mb-3">TENANT PERKS</p>
              <h2 className="font-display font-bold text-charcoal text-h2-sm lg:text-h2">The Resident Advantage.</h2>
              <p className="text-body text-muted max-w-lg mt-4">
                Being a RentFlow resident comes with privileges. Access exclusive discounts and pre-vetted services for your home.
              </p>
            </div>
            <Button className="bg-[#0B4F45] hover:bg-[#083b33] text-white shrink-0 border-none">Browse Marketplace <ArrowRight size={16} className="ml-2" /></Button>
          </div>

          <motion.div className="grid md:grid-cols-3 gap-[24px]" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div className="bg-white p-6 rounded-[24px] border border-border/60 shadow-sm" variants={fadeUp}>
              <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-6">
                <Shield size={18} />
              </div>
              <h4 className="font-bold text-charcoal text-small mb-2">Pro-Cleaning</h4>
              <p className="text-[12px] text-muted mb-6 leading-relaxed">10% off recurring cleaning services from top-rated local partners.</p>
              <button className="text-[11px] font-bold text-[#D35400] uppercase tracking-wider hover:underline">CLAIM DISCOUNT</button>
            </motion.div>
            
            <motion.div className="bg-white p-6 rounded-[24px] border border-border/60 shadow-sm" variants={fadeUp}>
              <div className="w-10 h-10 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center mb-6">
                <HeartHandshake size={18} />
              </div>
              <h4 className="font-bold text-charcoal text-small mb-2">Relocation Pros</h4>
              <p className="text-[12px] text-muted mb-6 leading-relaxed">Discounted moving packages with guaranteed white-glove service.</p>
              <button className="text-[11px] font-bold text-[#D35400] uppercase tracking-wider hover:underline">VIEW PREFERRED MOVERS</button>
            </motion.div>

            <motion.div className="bg-white p-6 rounded-[24px] border border-border/60 shadow-sm" variants={fadeUp}>
              <div className="w-10 h-10 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
                <MonitorSmartphone size={18} />
              </div>
              <h4 className="font-bold text-charcoal text-small mb-2">Instant Internet</h4>
              <p className="text-[12px] text-muted mb-6 leading-relaxed">Pre-activated high-speed fiber waiting for you the day you move in.</p>
              <button className="text-[11px] font-bold text-[#D35400] uppercase tracking-wider hover:underline">SHOW PROVIDERS</button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 6. More Than Just Four Walls */}
      <section className="py-[80px] md:py-[120px] bg-[#0B4F45] relative overflow-hidden" aria-label="Community">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#D35400]/20 to-transparent pointer-events-none"></div>
        <div className="max-w-[1100px] mx-auto px-[24px] relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-[60px] lg:gap-[100px]">
            {/* Grid Side */}
            <motion.div className="flex-1 w-full grid grid-cols-2 gap-4" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.div className="bg-[#0A3D36] border border-white/10 rounded-2xl p-5" variants={fadeUp}>
                <div className="text-[#D35400] mb-3"><MapPin size={20} /></div>
                <h4 className="font-bold text-white text-[13px] mb-2">Estate Hubs</h4>
                <p className="text-[11px] text-white/60 leading-relaxed">Real-time updates on estate maintenance or security notices.</p>
              </motion.div>
              <motion.div className="bg-[#0A3D36] border border-white/10 rounded-2xl p-5 mt-6" variants={fadeUp}>
                <div className="text-[#D35400] mb-3"><Users size={20} /></div>
                <h4 className="font-bold text-white text-[13px] mb-2">Community Board</h4>
                <p className="text-[11px] text-white/60 leading-relaxed">Connect with neighbors, sell items, or organize meetups.</p>
              </motion.div>
              <motion.div className="bg-[#0A3D36] border border-white/10 rounded-2xl p-5 -mt-6" variants={fadeUp}>
                <div className="text-[#D35400] mb-3"><HeartHandshake size={20} /></div>
                <h4 className="font-bold text-white text-[13px] mb-2">Local Perks</h4>
                <p className="text-[11px] text-white/60 leading-relaxed">Flash deals from neighborhood cafes and gyms.</p>
              </motion.div>
              <motion.div className="bg-[#0A3D36] border border-white/10 rounded-2xl p-5" variants={fadeUp}>
                <div className="text-[#D35400] mb-3"><Bell size={20} /></div>
                <h4 className="font-bold text-white text-[13px] mb-2">Instant Support</h4>
                <p className="text-[11px] text-white/60 leading-relaxed">Direct line to property management for general inquiries.</p>
              </motion.div>
            </motion.div>

            {/* Text Side */}
            <motion.div className="flex-1 w-full" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="font-display font-bold text-white text-h2-sm lg:text-h2 mb-6">More Than Just Four Walls.</h2>
              <p className="text-white/80 text-body leading-relaxed mb-8">
                RentFlow connects you to your community. Stay informed about what's happening in your building and enjoy the benefits of neighborhood living.
              </p>
              <div className="flex items-center gap-4 bg-white/5 rounded-full p-2 pr-6 border border-white/10 w-fit">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-[#0B4F45]"></div>
                  <div className="w-8 h-8 rounded-full bg-red-400 border-2 border-[#0B4F45]"></div>
                  <div className="w-8 h-8 rounded-full bg-orange-400 border-2 border-[#0B4F45]"></div>
                </div>
                <span className="text-[11px] font-bold text-white uppercase tracking-wider">Join 5,000+ residents in your network.</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. Upgrade Your Rental Life (Comparison) */}
      <section className="py-[80px] md:py-[100px] bg-[#FDFBF7]" aria-label="Comparison">
        <div className="max-w-[1100px] mx-auto px-[24px]">
          <div className="text-center mb-[40px]">
            <motion.h2 className="font-display font-bold text-charcoal text-h2-sm lg:text-h2 mb-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>Upgrade Your Rental Life</motion.h2>
            <motion.p className="text-body text-muted max-w-xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              Stop settling for manual processes. Compare the experience.
            </motion.p>
          </div>

          <motion.div className="overflow-x-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr>
                  <th className="p-5 bg-[#EBE9E4] text-charcoal font-bold text-[13px] border-b border-border/40 rounded-tl-xl w-1/3">Feature</th>
                  <th className="p-5 bg-[#EBE9E4] text-charcoal font-bold text-[13px] border-b border-border/40 w-1/3">The Old Way</th>
                  <th className="p-5 bg-[#FFF0E6] text-[#D35400] font-bold text-[13px] border-b border-[#D35400]/20 rounded-tr-xl w-1/3">The RentFlow Way</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr>
                  <td className="p-5 border-b border-border/40 text-[13px] font-medium text-charcoal">Rent Payments</td>
                  <td className="p-5 border-b border-border/40 text-[13px] text-muted">Cash, Checks, Manual Transfers</td>
                  <td className="p-5 border-b border-border/40 text-[13px] font-medium text-charcoal bg-[#FFF0E6]/30">Instant In-App Payments</td>
                </tr>
                <tr>
                  <td className="p-5 border-b border-border/40 text-[13px] font-medium text-charcoal">Proof of Payment</td>
                  <td className="p-5 border-b border-border/40 text-[13px] text-muted">SMS confirmation (if lucky)</td>
                  <td className="p-5 border-b border-border/40 text-[13px] font-medium text-charcoal bg-[#FFF0E6]/30">Official Digital Receipts</td>
                </tr>
                <tr>
                  <td className="p-5 border-b border-border/40 text-[13px] font-medium text-charcoal">Credit Building</td>
                  <td className="p-5 border-b border-border/40 text-[13px] text-muted">Non-existent</td>
                  <td className="p-5 border-b border-border/40 text-[13px] font-medium text-charcoal bg-[#FFF0E6]/30">Bureau Reporting Included</td>
                </tr>
                <tr>
                  <td className="p-5 border-b border-border/40 text-[13px] font-medium text-charcoal">Lease Documents</td>
                  <td className="p-5 border-b border-border/40 text-[13px] text-muted">Physical folder or email abyss</td>
                  <td className="p-5 border-b border-border/40 text-[13px] font-medium text-charcoal bg-[#FFF0E6]/30">Secure Digital Vault</td>
                </tr>
                <tr>
                  <td className="p-5 border-b border-border/40 text-[13px] font-medium text-charcoal rounded-bl-xl">Repairs</td>
                  <td className="p-5 border-b border-border/40 text-[13px] text-muted">Endless WhatsApp follow ups</td>
                  <td className="p-5 border-b border-border/40 text-[13px] font-medium text-charcoal rounded-br-xl bg-[#FFF0E6]/30">Trackable Tickets</td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* 8. CTA */}
      <section className="py-[80px] md:py-[100px] bg-[#FDFBF7] text-center border-t border-border/40" aria-label="Call to Action">
        <div className="max-w-[600px] mx-auto px-[24px]">
          <motion.h2 className="font-display font-bold text-charcoal text-[36px] md:text-[48px] mb-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>Ready to live better?</motion.h2>
          <motion.p className="text-body text-muted mb-8 leading-relaxed" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            Download the app today and transform how you interact with your home. If your landlord isn't on RentFlow yet, refer them and get a month of credit builder for free.
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row justify-center gap-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Button size="lg" className="bg-[#D35400] hover:bg-[#b04500] text-white border-none">Refer your Landlord</Button>
            <Button size="lg" variant="outline" className="border-border text-charcoal hover:bg-warm bg-white">Download App</Button>
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
          ORIGINAL SECTIONS
          ===================================================================== */}
          
      <div className="border-t-[4px] border-border/30 mt-12"></div>
      
      {/* Original Hero */}
      <section className="bg-charcoal py-24 hidden" aria-label="Original Tenant hero">
        <div className="max-w-[1100px] mx-auto px-[24px]">
          <div className="max-w-2xl">
            <motion.p className="text-accent text-micro font-semibold uppercase tracking-widest mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              For Tenants
            </motion.p>
            <motion.h1 className="font-display text-white mb-6 text-display-sm lg:text-display font-bold" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              Pay rent. Get proof. Done.
            </motion.h1>
            <motion.p className="text-white/70 text-body mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.15 } }}>
              No more bank alerts. No more "I'll send the screenshot later." Pay rent in three taps and download your official receipt immediately.
            </motion.p>
            <motion.p className="text-white/50 text-small" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }}>
              Already have an invite? <button onClick={() => navigate('/login')} className="text-accent hover:underline">Log in here</button>
            </motion.p>
          </div>
        </div>
      </section>

      {/* Original 3-step payment visual */}
      <section className="py-[60px] md:py-[80px] bg-warm" aria-label="How paying rent works">
        <div className="max-w-[1100px] mx-auto px-[24px]">
          <h2 className="font-display text-charcoal text-center mb-12 text-h2-sm lg:text-h2 font-bold">How paying rent works.</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {steps.map((step, i) => (
              <motion.div key={step.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-white font-mono font-bold text-sm flex items-center justify-center mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="font-display font-semibold text-charcoal text-h3-sm lg:text-h3 mb-2">{step.title}</h3>
                <p className="text-small text-muted">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Original Trust section */}
      <section className="py-[60px] md:py-[80px] bg-white" aria-label="Security and trust">
        <div className="max-w-[1100px] mx-auto px-[24px]">
          <h2 className="font-display text-charcoal text-center mb-4 text-h2-sm lg:text-h2 font-bold">Your money and data are safe with us.</h2>
          <p className="text-body text-body text-center max-w-xl mx-auto mb-12">
            We know that trusting a new platform with your rent payment is a big deal. Here's how we protect you.
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {trustPoints.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="h-full group p-[24px]">
                  <div className="w-11 h-11 bg-success/10 rounded flex items-center justify-center mb-4">
                    <p.icon size={22} className="text-success" aria-hidden="true" />
                  </div>
                  <h3 className="font-display font-semibold text-charcoal text-h3-sm lg:text-h3 mb-2">{p.title}</h3>
                  <p className="text-small text-muted">{p.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Original Maintenance highlight */}
      <section className="py-[60px] md:py-[80px] bg-warm" aria-label="Maintenance requests">
        <div className="max-w-[1100px] mx-auto px-[24px] text-center max-w-xl mx-auto">
          <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-5">
            <Wrench size={26} className="text-accent" aria-hidden="true" />
          </div>
          <h2 className="font-display font-bold text-charcoal mb-4 text-h2-sm lg:text-h2">Report issues without the phone call.</h2>
          <p className="text-body text-body mb-6 text-muted">
            Something broken in your unit? Log a maintenance request with a photo and description. Track its status from received to resolved — no WhatsApp, no chasing.
          </p>
        </div>
      </section>

      {/* Original FAQ */}
      <section className="py-[60px] md:py-[80px] bg-white" aria-label="Tenant FAQ">
        <div className="max-w-[1100px] mx-auto px-[24px] max-w-2xl mx-auto">
          <h2 className="font-display font-bold text-charcoal text-center mb-8 text-h2-sm lg:text-h2">Tenant questions, answered.</h2>
          <Accordion items={faqItems} />
        </div>
      </section>

      {/* Original CTA */}
      <section className="bg-gradient-warm py-20" aria-label="Original CTA">
        <div className="max-w-[1100px] mx-auto px-[24px] text-center">
          <h2 className="font-display font-bold text-white mb-4 text-h2-sm lg:text-h2">Ask your landlord about RentFlow.</h2>
          <p className="text-white/60 mb-8 text-body">Already have an account? Log in below.</p>
          <Button size="lg" variant="accent" onClick={() => navigate('/login')}>Log in to your account</Button>
        </div>
      </section>
    </div>
  );
};

export default ForTenants;
