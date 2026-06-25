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
    <div className="w-full bg-[#FDFBF7]">
      {/* =====================================================================
          NEW SECTIONS FROM DESIGN MOCKUP
          ===================================================================== */}
          
      {/* 1. New Hero */}
      <section className="relative pt-[60px] pb-[40px] md:pt-[80px] md:pb-[60px] overflow-hidden" aria-label="New Landlord hero">
        <div className="max-w-[1100px] mx-auto px-[24px]">
          <div className="flex flex-col lg:flex-row items-center gap-[32px] lg:gap-[48px]">
            <motion.div className="flex-1 w-full max-w-2xl lg:max-w-xl" initial="hidden" animate="visible" variants={fadeUp}>
              <div className="inline-block bg-[#FFF0E6] text-[#8D3B1E] text-[10px] md:text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-[16px]">
                Made for modern landlords
              </div>
              <h1 className="font-display text-charcoal text-display-sm lg:text-display mb-[16px] leading-[1.1] tracking-tight">
                The Only Tool You Need to Manage Your Portfolio with <span className="text-[#8D3B1E]">Confidence.</span>
              </h1>
              <p className="text-muted text-body mb-[24px] leading-relaxed max-w-lg">
                Move from manual bank alerts and WhatsApp chats to automated, professional property management. Designed for the high-performance landlord.
              </p>
              <div className="flex flex-wrap gap-[12px]">
                <Button size="lg" className="bg-[#8D3B1E] hover:bg-[#732f17] text-white border-none" onClick={() => navigate('/signup?role=landlord')}>
                  Start for Free
                </Button>
                <Button size="lg" variant="outline" className="bg-[#EBE9E4] hover:bg-[#dfdddc] border-none text-charcoal" onClick={() => {}}>
                  <Play size={18} className="mr-2" /> See How It Works
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex-1 w-full max-w-[440px] lg:max-w-[500px]"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="relative w-full mx-auto">
                <img src={landlordHeroMockup} alt="RentFlow Dashboard Mockup" className="w-full h-auto object-contain drop-shadow-2xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Stop Chasing Bank Alerts */}
      <section className="py-[60px] md:py-[80px] bg-[#FDFBF7]" aria-label="Stop Chasing Bank Alerts">
        <div className="max-w-[1000px] mx-auto px-[24px]">
          <div className="text-center mb-[40px]">
            <motion.h2 className="text-h2-sm lg:text-h2 font-display font-bold text-charcoal mb-[12px] tracking-tight" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              Stop Chasing Bank Alerts.
            </motion.h2>
            <motion.p className="text-muted text-body max-w-xl mx-auto leading-relaxed" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              Managing properties shouldn't feel like a part-time job of cross-referencing bank statements and chasing screenshots on WhatsApp.
            </motion.p>
          </div>

          <motion.div className="grid md:grid-cols-3 gap-[20px] md:gap-[24px]" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
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
      <section className="py-[60px] md:py-[80px] bg-[#FDFBF7] border-t border-border/20" aria-label="Features Hub">
        <div className="max-w-[1050px] mx-auto px-[24px]">
          <div className="flex flex-col lg:flex-row items-center gap-[32px] lg:gap-[64px]">
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
      <section className="py-[60px] md:py-[80px] bg-[#0B4F45] text-center relative overflow-hidden" aria-label="Testimonial">
        <Quote size={200} className="absolute left-1/2 -translate-x-1/2 top-4 text-white/5 pointer-events-none" />
        <div className="max-w-[800px] mx-auto px-[24px] relative z-10">
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
      <section className="py-[60px] md:py-[80px] bg-[#FDFBF7]" aria-label="Pricing">
        <div className="max-w-[1000px] mx-auto px-[24px]">
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
              <span className="text-display-sm lg:text-display font-display font-bold text-charcoal">$0</span>
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
      <section className="py-[40px] px-[20px] bg-[#FDFBF7]" aria-label="CTA Banner">
        <motion.div 
          className="max-w-[900px] mx-auto bg-gradient-to-br from-[#8D3B1E] to-[#6a2a14] rounded-[24px] p-[32px] md:p-[48px] text-center shadow-2xl"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
        >
          <h2 className="font-display font-bold text-white text-2xl md:text-3xl lg:text-4xl mb-[12px]">Join 2,000+ landlords managing ₦15B in rent.</h2>
          <p className="text-white/80 text-xs md:text-sm max-w-2xl mx-auto mb-[24px]">Experience the peace of mind that comes with professional automation.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-[12px]">
            <Button size="lg" className="bg-white text-[#8D3B1E] hover:bg-gray-100 border-none">Get Started Now</Button>
            <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10">Talk to Sales</Button>
          </div>
        </motion.div>
      </section>

      {/* =====================================================================
          ORIGINAL SECTIONS FROM PREVIOUS DESIGN
          ===================================================================== */}

      {/* Original Hero (Optional - kept to fulfill "don't replace the ones before") */}
      <section className="bg-charcoal py-24 hidden" aria-label="Original Landlord hero">
        <div className="max-w-marketing mx-auto px-6">
          <div className="max-w-2xl">
            <motion.p
              className="text-accent text-micro uppercase tracking-widest mb-4"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            >
              For Landlords
            </motion.p>
            <motion.h1
              className="font-display text-white mb-6 text-display-sm lg:text-display font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            >
              Run your rental business like a pro.
            </motion.h1>
            <motion.p className="text-white/70 text-body mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.15 } }}>
              Stop chasing rent on WhatsApp. Start collecting it on RentFlow — with receipts, reminders and full financial visibility built in.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.25 } }}>
              <Button size="lg" variant="accent" rightIcon={<ArrowRight size={18} />} onClick={() => navigate('/signup?role=landlord')}>
                List your first property free
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Original What you get */}
      <section className="py-[60px] md:py-[80px] bg-warm" aria-label="Original Landlord features">
        <div className="max-w-[1000px] mx-auto px-[24px]">
          <h2 className="font-display font-bold text-charcoal text-center mb-[32px] text-h2-sm lg:text-h2">Additional Landlord Features</h2>
          <div className="grid sm:grid-cols-2 gap-[20px] md:gap-[24px]">
            {perks.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="h-full group p-[24px]">
                  <div className="relative mb-[16px] w-fit">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 blur-xl scale-150 opacity-60 group-hover:opacity-90 transition-opacity duration-300" aria-hidden="true" />
                    <div className="relative bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center">
                      <p.icon size={22} className="text-primary" aria-hidden="true" />
                    </div>
                  </div>
                  <h3 className="font-display font-semibold text-charcoal text-h3-sm lg:text-h3 mb-[8px]">{p.title}</h3>
                  <p className="text-small text-muted">{p.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Original Multi-property visual */}
      <section className="relative py-[60px] md:py-[80px] overflow-hidden" aria-label="Multi-property management">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/trust-bg.png)' }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-[#073A33]/85" aria-hidden="true" />

        <div className="max-w-[900px] mx-auto px-[24px] text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-micro font-medium uppercase tracking-widest text-accent/90 mb-[12px]">Scale freely</p>
            <h2 className="font-display font-bold text-white text-h2-sm lg:text-h2 mb-[16px]">One dashboard. Any number of properties.</h2>
            <p className="text-white/70 text-small max-w-xl mx-auto mb-[24px]">Whether you manage 1 duplex or a 50-unit portfolio across multiple cities, RentFlow shows you everything in one place.</p>
          </motion.div>
          <motion.div
            className="grid grid-cols-3 md:grid-cols-5 gap-[12px] max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            {['Lekki', 'GRA', 'Wuse', 'Enugu', '+More'].map((loc) => (
              <div key={loc} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-[12px] text-center hover:bg-white/15 transition-colors">
                <Building2 size={16} className="text-white/80 mx-auto mb-[4px]" aria-hidden="true" />
                <p className="text-micro font-medium text-white/90">{loc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Original FAQ */}
      <section className="py-[60px] md:py-[80px] bg-white" aria-label="Landlord FAQ">
        <div className="max-w-[760px] mx-auto px-[24px]">
          <h2 className="font-display font-bold text-charcoal text-center text-h2-sm lg:text-h2 mb-[32px]">Common landlord questions.</h2>
          <Accordion items={faqItems} />
        </div>
      </section>
    </div>
  );
};

export default ForLandlords;
