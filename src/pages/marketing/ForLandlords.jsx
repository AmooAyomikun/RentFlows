import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, ArrowRight, Shield, Clock, TrendingUp, Building2, 
  Play, X, Check, FileText, Search, Wrench, Quote, Activity,
  AlertTriangle, CreditCard, Users
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Accordion from '../../components/ui/Accordion';

// Assets
import landlordHeroMockup from '../../assets/landlord_hero_mockup.png';
import landlordLaptopHub from '../../assets/landlord_laptop_hub.png';
import olumideProfile from '../../assets/olumide_profile.png';

const perks = [
  { icon: TrendingUp, title: 'See your revenue in real time', desc: 'One dashboard. Every property, every unit, every payment — at a glance.' },
  { icon: Clock, title: 'Stop chasing rent', desc: 'Automated reminders go out before rent is due so you never have to send the first "please pay" message again.' },
  { icon: Building2, title: 'Scale without chaos', desc: 'Manage 1 or 50 properties from the same interface. No extra spreadsheets, no extra WhatsApp groups.' },
  { icon: Shield, title: 'Dispute protection', desc: 'Every payment has a timestamped receipt and transaction reference. No more "I already paid" arguments.' },
];

const faqItems = [
  { id: 'l1', question: 'How does the payout work?', answer: 'Rent collected through RentFlow is transferred to your registered bank account within 1–2 business days. During the frontend phase, this is simulated.' },
  { id: 'l2', question: 'What are your fees?', answer: 'A 0.5% transaction fee is deducted per payment received. Your subscription starts from ₦3,000 per property per month, with a 14-day free trial.' },
  { id: 'l3', question: 'Is my tenant data safe?', answer: 'Yes. Data is encrypted in transit and at rest. We never sell your or your tenants\' data to third parties.' },
  { id: 'l4', question: 'Can I add multiple properties?', answer: 'Yes — there\'s no limit on properties or units per plan. You pay per property per month.' },
];

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

const ForLandlords = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white overflow-x-hidden">
      {/* ══════════════════════════════════════════════════════════════
          NEW SECTIONS FROM DESIGN MOCKUP
          ══════════════════════════════════════════════════════════════ */}
          
      {/* 1. New Hero: Interactive Portfolio Command Center */}
      <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 overflow-hidden bg-gradient-to-b from-[#04120F] via-[#08221D] to-[#0A2D27]" aria-label="New Landlord hero">
        {/* Dynamic Background Glows */}
        <div className="absolute top-[-20%] left-[30%] w-[600px] h-[600px] bg-[#0B4F45]/30 rounded-full blur-[150px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-[0%] right-[10%] w-[500px] h-[500px] bg-[#C75B30]/20 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative z-10 max-w-marketing mx-auto px-6 w-full">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <motion.div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-[11px] font-bold tracking-[0.15em] uppercase mb-8 backdrop-blur-md shadow-2xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <span className="w-2 h-2 rounded-full bg-[#C75B30] animate-ping" />
              Built for High-Performance Landlords
            </motion.div>
            <motion.h1
              className="font-display text-white font-black leading-[1.08] tracking-tight mb-6"
              style={{ fontSize: 'clamp(38px, 5.5vw, 64px)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              Control Your Rental Empire with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E79868] via-white to-[#C75B30]">Total Precision.</span>
            </motion.h1>
            <motion.p
              className="text-white/75 text-base md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              Replace messy bank alerts, manual receipts, and unread WhatsApp messages with an automated command center designed to maximize cash flow and minimize stress.
            </motion.p>
            
            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-14"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
            >
              <button
                onClick={() => navigate('/signup?role=landlord')}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[#D35400] hover:bg-[#b04500] text-white font-bold text-base tracking-wide transition-all duration-200 shadow-[0_10px_35px_rgba(211,84,0,0.4)] cursor-pointer border border-white/10 transform hover:-translate-y-0.5"
              >
                Launch Your Dashboard Free <ArrowRight size={18} />
              </button>
              <button
                onClick={() => {}}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-semibold text-base transition-all cursor-pointer border border-white/20 backdrop-blur-md"
              >
                <Play size={18} className="text-[#E79868]" /> Watch 2-Min Demo
              </button>
            </motion.div>

            {/* Live Command Deck Ticker */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto p-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
            >
              <div className="p-3 border-r border-white/10 last:border-none text-left">
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold mb-1">
                  <Activity size={14} /> Live Revenue
                </div>
                <div className="font-display font-black text-white text-xl">₦14,850,000</div>
                <div className="text-[10px] text-white/50">+12% vs last month</div>
              </div>
              <div className="p-3 border-r border-white/10 last:border-none text-left">
                <div className="flex items-center gap-1.5 text-blue-400 text-xs font-bold mb-1">
                  <Building2 size={14} /> Occupancy Rate
                </div>
                <div className="font-display font-black text-white text-xl">98.4%</div>
                <div className="text-[10px] text-white/50">48 units active</div>
              </div>
              <div className="p-3 border-r border-white/10 last:border-none text-left">
                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold mb-1">
                  <Clock size={14} /> Collection Speed
                </div>
                <div className="font-display font-black text-white text-xl">Instant</div>
                <div className="text-[10px] text-white/50">Automated settlement</div>
              </div>
              <div className="p-3 text-left">
                <div className="flex items-center gap-1.5 text-purple-400 text-xs font-bold mb-1">
                  <Shield size={14} /> Dispute Defense
                </div>
                <div className="font-display font-black text-white text-xl">100% Audit</div>
                <div className="text-[10px] text-white/50">NDPR bank vault</div>
              </div>
            </motion.div>
          </div>

          {/* Hero Mockup Showcase */}
          <motion.div
            className="relative max-w-5xl mx-auto pt-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A2D27] via-transparent to-transparent z-20 pointer-events-none h-full w-full" />
            <div className="relative z-10 rounded-3xl overflow-hidden border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.6)] bg-white/5 p-2 md:p-4 backdrop-blur-md">
              <img src={landlordHeroMockup} alt="RentFlow Dashboard Mockup" className="w-full h-auto rounded-2xl object-cover" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Stop Chasing Bank Alerts */}
      <section className="py-20 md:py-24 bg-warm" aria-label="Stop Chasing Bank Alerts">
        <div className="max-w-marketing mx-auto px-6 w-full">
          <div className="text-center mb-12">
            <motion.span className="text-micro font-bold text-accent tracking-[0.12em] uppercase" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>The Problem</motion.span>
            <motion.h2 className="font-display text-h2-sm md:text-h2 text-charcoal mt-2 mb-3 font-bold tracking-tight leading-tight" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              Stop Chasing Bank Alerts.
            </motion.h2>
            <motion.p className="text-body text-muted max-w-xl mx-auto leading-relaxed" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              Managing properties shouldn't feel like a part-time job of cross-referencing bank statements and chasing screenshots on WhatsApp.
            </motion.p>
          </div>

          <motion.div className="grid md:grid-cols-3 gap-5 md:gap-6" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {/* Card 1: Current Chaos */}
            <motion.div className="bg-white rounded-[24px] p-[24px] md:p-[28px] shadow-sm flex flex-col justify-between h-full border border-border/30" variants={fadeUp}>
              <div>
                <div className="w-10 h-10 bg-[#FDF2F0] rounded-xl flex items-center justify-center text-[#E05A47] mb-[20px]">
                  <AlertTriangle size={20} />
                </div>
                <h3 className="font-display font-semibold text-h3-sm lg:text-h3 text-charcoal mb-[12px]">Current Chaos</h3>
                <ul className="space-y-[12px] mb-[20px]">
                  <li className="flex items-start gap-[10px] text-small text-muted">
                    <X size={14} className="text-[#E05A47] mt-0.5 shrink-0" />
                    <span>Manual bank statement checks.</span>
                  </li>
                  <li className="flex items-start gap-[10px] text-small text-muted">
                    <X size={14} className="text-[#E05A47] mt-0.5 shrink-0" />
                    <span>No central paper trail.</span>
                  </li>
                  <li className="flex items-start gap-[10px] text-small text-muted">
                    <X size={14} className="text-[#E05A47] mt-0.5 shrink-0" />
                    <span>Stressful, disorganized tax season.</span>
                  </li>
                </ul>
              </div>
              <div className="bg-[#0B4F45] rounded-[16px] p-[16px] text-white mt-[16px]">
                <div className="flex items-center gap-[8px] mb-[6px]">
                  <div className="w-4 h-4 rounded-full bg-[#10B981] flex items-center justify-center text-white shrink-0">
                    <Check size={10} className="stroke-[3]" />
                  </div>
                  <span className="font-display font-bold text-micro uppercase tracking-wider">RentFlow Clarity</span>
                </div>
                <p className="text-micro text-white/80 leading-relaxed">Automated tracking, instant branded receipts, and tax-ready exports.</p>
              </div>
            </motion.div>

            {/* Card 2: Professional Payments */}
            <motion.div className="bg-white rounded-[24px] p-[24px] md:p-[28px] shadow-sm flex flex-col justify-between h-full border border-border/30" variants={fadeUp}>
              <div>
                <div className="w-10 h-10 bg-[#E6F4EA] rounded-xl flex items-center justify-center text-[#137333] mb-[20px]">
                  <CreditCard size={20} />
                </div>
                <h3 className="font-display font-semibold text-h3-sm lg:text-h3 text-charcoal mb-[12px]">Professional Payments</h3>
                <p className="text-small text-muted mb-[20px] leading-relaxed">Move away from "I've sent it" screenshots. Tenants pay through secure portals.</p>
              </div>
              
              <div className="bg-[#FDFBF7] border border-border/40 rounded-[16px] p-[16px] mt-[16px]">
                <div className="flex items-center justify-between mb-[12px]">
                  <span className="text-small font-bold text-charcoal">Payment Link</span>
                  <span className="text-micro font-bold bg-[#E6F4EA] text-[#137333] px-[8px] py-[2px] rounded-full uppercase tracking-wider">Active</span>
                </div>
                <div className="w-full bg-[#EBE9E4] h-[5px] rounded-full mb-[10px] overflow-hidden">
                  <div className="bg-[#D35400] h-full w-[20%] rounded-full"></div>
                </div>
                <div className="flex justify-between text-micro font-medium text-muted">
                  <span>20% Collected</span>
                  <span>Due: 5th of Month</span>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Digital Governance */}
            <motion.div className="bg-[#0B4F45] rounded-[24px] p-[24px] md:p-[28px] shadow-sm flex flex-col justify-between h-full relative overflow-hidden" variants={fadeUp}>
              <Shield size={120} className="absolute -bottom-6 -right-6 text-white/5 pointer-events-none" />
              <div className="relative z-10 flex flex-col justify-between h-full w-full">
                <div>
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-[#A7F3D0] mb-[20px]">
                    <Shield size={20} />
                  </div>
                  <h3 className="font-display font-semibold text-h3-sm lg:text-h3 text-white mb-[12px]">Digital Governance</h3>
                  <p className="text-small text-white/70 mb-[20px] leading-relaxed">Every payment, maintenance request, and communication is logged and legally defensible.</p>
                </div>
                
                <div className="space-y-[10px] mt-[16px]">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-[16px] p-[12px] flex items-center gap-[10px]">
                    <div className="w-4 h-4 rounded-full bg-[#10B981]/20 flex items-center justify-center text-[#A7F3D0] shrink-0">
                      <Check size={10} className="stroke-[3]" />
                    </div>
                    <span className="text-small font-medium text-white">Tenancy agreement Signed</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-[16px] p-[12px] flex items-center gap-[10px]">
                    <div className="w-4 h-4 rounded-full bg-[#10B981]/20 flex items-center justify-center text-[#A7F3D0] shrink-0">
                      <Check size={10} className="stroke-[3]" />
                    </div>
                    <span className="text-small font-medium text-white">Annual Statement Generated</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. Everything you need in one powerful hub */}
      <section className="py-20 md:py-24 bg-white border-t border-border" aria-label="Features Hub">
        <div className="max-w-marketing mx-auto px-6 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <motion.div className="flex-1 w-full max-w-lg lg:max-w-xl mx-auto" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="bg-[#0B4F45] rounded-[24px] p-[24px] sm:p-[32px] md:p-[40px] flex items-center justify-center aspect-[4/3] sm:aspect-square shadow-lg">
                <img src={landlordLaptopHub} alt="RentFlow Web App on Laptop" className="w-full h-auto object-contain drop-shadow-2xl" />
              </div>
            </motion.div>
            
            <motion.div className="flex-1 w-full" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="font-display font-bold text-h2-sm lg:text-h2 text-charcoal mb-[12px] tracking-tight leading-tight">
                Everything you need in one powerful hub.
              </h2>
              <p className="text-muted text-body mb-[28px] leading-relaxed max-w-xl">
                Built specifically for the African real estate context, RentFlow bridges the gap between bank silos and tenant needs.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-x-[32px] gap-y-[20px]">
                <div>
                  <CreditCard size={18} className="text-[#8D3B1E] mb-[10px]" />
                  <h4 className="font-display font-semibold text-charcoal text-h4-sm lg:text-h4 mb-[4px]">Online Rent Collection</h4>
                  <p className="text-small text-muted leading-relaxed">Secure payments via card or direct bank transfer with 99.9% uptime.</p>
                </div>
                <div>
                  <FileText size={18} className="text-[#8D3B1E] mb-[10px]" />
                  <h4 className="font-display font-semibold text-charcoal text-h4-sm lg:text-h4 mb-[4px]">Automated Receipts</h4>
                  <p className="text-small text-muted leading-relaxed">Professional PDF receipts are generated and emailed the moment rent hits your account.</p>
                </div>
                <div>
                  <Users size={18} className="text-[#8D3B1E] mb-[10px]" />
                  <h4 className="font-display font-semibold text-charcoal text-h4-sm lg:text-h4 mb-[4px]">Tenant Screening</h4>
                  <p className="text-small text-muted leading-relaxed">Simple digital onboarding for new residents with background checks.</p>
                </div>
                <div>
                  <Wrench size={18} className="text-[#8D3B1E] mb-[10px]" />
                  <h4 className="font-display font-semibold text-charcoal text-h4-sm lg:text-h4 mb-[4px]">Maintenance Tracking</h4>
                  <p className="text-small text-muted leading-relaxed">A centralized dashboard to manage and track all repair requests.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Testimonial */}
      <section className="py-20 md:py-24 bg-[#0B4F45] text-center relative overflow-hidden" aria-label="Testimonial">
        <Quote size={200} className="absolute left-1/2 -translate-x-1/2 top-4 text-white/5 pointer-events-none z-0" />
        <div className="max-w-marketing mx-auto px-6 w-full relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="text-white font-display text-h3-sm lg:text-h3 italic leading-relaxed mb-[24px]">
              "Since switching to RentFlow, I've stopped waking up to bank alerts and tenant WhatsApp messages. Everything is automated. It literally saved me 10 hours a week on administration alone. I can finally focus on acquiring my next property instead of chasing rent for the current ones."
            </p>
            <div className="flex flex-col items-center justify-center">
              <img src={olumideProfile} alt="Olumide Adebayo" className="w-[50px] h-[50px] rounded-full object-cover border-2 border-white/20 mb-[12px]" />
              <h5 className="text-white font-bold text-body mb-[4px]">Olumide Adebayo</h5>
              <p className="text-white/60 text-small">Property Portfolio Manager, Lagos</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. Pricing Teaser */}
      <section className="py-20 md:py-24 bg-warm" aria-label="Pricing">
        <div className="max-w-marketing mx-auto px-6 w-full">
          <div className="text-center mb-[32px]">
            <motion.h2 className="text-h2-sm lg:text-h2 font-display font-bold text-charcoal mb-[10px]" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>Ready to scale your portfolio?</motion.h2>
            <motion.p className="text-muted text-body" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>Start small, grow big. Our pricing scales with you.</motion.p>
          </div>
          
          <motion.div 
            className="max-w-md mx-auto bg-white rounded-[24px] border border-border/60 shadow-xl overflow-hidden text-center p-[24px] md:p-[32px] relative"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <div className="absolute top-0 left-0 w-full bg-[#8D3B1E] text-white text-[10px] font-bold uppercase tracking-widest py-1.5">
              Most Popular For Landlords
            </div>
            <h3 className="font-display font-bold text-h3-sm lg:text-h3 text-charcoal mt-[20px] mb-[8px]">Landlord Starter</h3>
            <div className="flex items-center justify-center gap-1 mb-[12px]">
              <span className="text-display-sm lg:text-display font-display font-bold text-charcoal">₦0</span>
              <span className="text-muted text-small">/month</span>
            </div>
            <p className="text-small text-muted mb-[20px] pb-[20px] border-b border-border/40">Perfect for independent landlords with up to 5 units.</p>
            
            <ul className="space-y-[12px] mb-[24px] text-left max-w-[220px] mx-auto">
              <li className="flex items-center gap-[10px] text-small text-muted"><Check size={14} className="text-charcoal shrink-0" /> Manage up to 5 units</li>
              <li className="flex items-center gap-[10px] text-small text-muted"><Check size={14} className="text-charcoal shrink-0" /> Automated digital receipts</li>
              <li className="flex items-center gap-[10px] text-small text-muted"><Check size={14} className="text-charcoal shrink-0" /> Basic tenant screening</li>
              <li className="flex items-center gap-[10px] text-small text-muted"><Check size={14} className="text-charcoal shrink-0" /> Monthly financial reports</li>
            </ul>
            
            <Button className="w-full bg-[#0B4F45] hover:bg-[#083b33] text-white mb-[10px] py-[10px]">Create Free Account</Button>
            <p className="text-[10px] text-muted">No credit card required to start.</p>
          </motion.div>
        </div>
      </section>

      {/* 6. Final Banner CTA */}
      <section className="py-20 md:py-24 bg-white" aria-label="CTA Banner">
        <div className="max-w-marketing mx-auto px-6 w-full">
          <motion.div
            className="bg-[#0B4F45] rounded-3xl px-10 py-16 md:px-16 md:py-20 text-center text-white relative overflow-hidden shadow-2xl"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#073A33]/80 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-[-20%] right-[-10%] w-[350px] h-[350px] bg-[#C75B30]/15 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="text-[#E79868] text-micro font-bold tracking-[0.15em] uppercase mb-4 block">
                Join 2,000+ successful landlords
              </span>
              <h2 className="font-display font-bold text-h3 md:text-h2-sm text-white mb-5 leading-tight">
                Join 2,000+ landlords managing ₦15B in rent.
              </h2>
              <p className="text-white/70 text-body mb-8 leading-relaxed">
                Experience the peace of mind that comes with professional automation.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => navigate('/signup')}
                  className="px-8 py-3.5 rounded-xl bg-white text-[#0B4F45] font-bold text-sm cursor-pointer hover:bg-white/90 transition-all shadow-lg"
                >
                  Get Started Now
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="px-8 py-3.5 rounded-xl border-2 border-white/25 text-white hover:bg-white/10 font-semibold text-sm cursor-pointer transition-all backdrop-blur-md"
                >
                  Talk to Sales
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ForLandlords;
