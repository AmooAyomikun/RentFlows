import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Building2, Home, Mail, TrendingUp, Wallet, Send, FileText, CreditCard, Download, Wrench } from 'lucide-react';
import Button from '../../components/ui/Button';

const fadeUp = (i = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] } },
});

const landlordSteps = [
  { num: '01', title: 'Sign up as a landlord', desc: 'Create your account with your name, email and business name. Takes under 2 minutes.', icon: Building2 },
  { num: '02', title: 'Add your property', desc: 'Enter the property name, address and create your units. Set the rent amount and due date for each.', icon: Home },
  { num: '03', title: 'Invite your tenants', desc: 'Each tenant gets a personalised invite link by email. They set a password and land directly in their lease.', icon: Mail },
  { num: '04', title: 'Track payments', desc: 'Your dashboard shows every payment in real time. Overdue alerts fire automatically so you never have to chase.', icon: TrendingUp },
  { num: '05', title: 'Get paid out', desc: 'Rent collected goes straight to your registered bank account. Receipts are generated automatically.', icon: Wallet },
];

const tenantSteps = [
  { num: '01', title: 'Receive your invite', desc: 'Your landlord sends you a personalised invite link. No need to search for an app or create an account separately.', icon: Send },
  { num: '02', title: 'View your lease', desc: 'Your rent amount, due date, lease start/end and landlord contact details are all there in one place.', icon: FileText },
  { num: '03', title: 'Pay rent', desc: 'Tap Pay Rent, choose your method — card, bank transfer or Paystack — and confirm. Done.', icon: CreditCard },
  { num: '04', title: 'Download your receipt', desc: 'Your receipt is ready immediately. Download the PDF and keep it as long as you need.', icon: Download },
  { num: '05', title: 'Log maintenance issues', desc: 'Something broken? Log a request with a description and photo. Track its progress from received to resolved.', icon: Wrench },
];

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState('landlord');
  const navigate = useNavigate();

  const steps = activeTab === 'landlord' ? landlordSteps : tenantSteps;

  return (
    <>
      {/* Header: Interactive Journey Deck */}
      <section className="bg-gradient-to-b from-[#081F1A] via-[#0E382E] to-[#0A261F] py-20 md:py-32 relative overflow-hidden text-center" aria-label="How it works header">
        <div className="absolute top-[-20%] right-[25%] w-[450px] h-[450px] bg-[#0B4F45]/35 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[15%] w-[350px] h-[350px] bg-[#C75B30]/25 rounded-full blur-[110px] pointer-events-none" />

        <div className="max-w-marketing mx-auto px-6 relative z-10">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#E79868] text-xs font-bold tracking-widest uppercase mb-5 shadow-lg backdrop-blur-md"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          >
            Frictionless Operational Flow
          </motion.div>
          <motion.h1
            className="font-display text-white font-black tracking-tight leading-[1.08] mb-4"
            style={{ fontSize: 'clamp(38px, 5.5vw, 62px)' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          >
            How RentFlow <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E79868] via-white to-[#C75B30]">Works.</span>
          </motion.h1>
          <motion.p
            className="text-white/75 text-base md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.1 } }}
          >
            Two distinct tailored journeys. One unified platform. Designed from the ground up to eliminate tension between African landlords and residents.
          </motion.p>

          {/* Quick Flow Visual Strip */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto p-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl text-left"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          >
            <div className="p-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-black flex items-center justify-center text-sm">1</div>
              <div>
                <div className="text-xs font-bold text-white">2-Min Setup</div>
                <div className="text-[11px] text-white/60">List unit & set due date</div>
              </div>
            </div>
            <div className="p-3 flex items-center gap-3 border-t sm:border-t-0 sm:border-l border-white/10">
              <div className="w-8 h-8 rounded-lg bg-[#C75B30]/20 text-[#E79868] font-black flex items-center justify-center text-sm">2</div>
              <div>
                <div className="text-xs font-bold text-white">Digital Invite</div>
                <div className="text-[11px] text-white/60">Tenant receives lease link</div>
              </div>
            </div>
            <div className="p-3 flex items-center gap-3 border-t sm:border-t-0 sm:border-l border-white/10">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 font-black flex items-center justify-center text-sm">3</div>
              <div>
                <div className="text-xs font-bold text-white">Auto-Settlement</div>
                <div className="text-[11px] text-white/60">Direct bank payout</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tab toggle */}
      <section className="py-20 md:py-24 bg-warm" aria-label="Journey steps">
        <div className="max-w-marketing mx-auto px-6 w-full">
          {/* Toggle */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white border border-border rounded-lg p-1 gap-1" role="tablist">
              {['landlord', 'tenant'].map((tab) => (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                  className={[
                    'px-6 py-2.5 text-sm font-semibold rounded transition-all duration-200',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                    activeTab === tab ? 'bg-primary text-white shadow-sm' : 'text-muted hover:text-charcoal',
                  ].join(' ')}
                >
                  For {tab === 'landlord' ? 'Landlords' : 'Tenants'}
                </button>
              ))}
            </div>
          </div>

          {/* Steps */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              role="tabpanel"
              aria-label={`${activeTab} journey`}
            >
              <div className="space-y-6 max-w-2xl mx-auto">
                {steps.map((step, i) => (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="flex gap-5 bg-white rounded-lg p-5 border border-border shadow-card"
                  >
                    <div className="flex-shrink-0 flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-primary text-white font-mono font-bold text-sm flex items-center justify-center">
                        {step.num}
                      </div>
                      {i < steps.length - 1 && (
                        <div className="flex-1 w-px bg-border mt-2 min-h-[24px]" aria-hidden="true" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span aria-hidden="true" className="w-8 h-8 rounded-lg bg-[#C75B30]/10 text-[#C75B30] flex items-center justify-center">
                          {typeof step.icon === 'function' || typeof step.icon === 'object' ? <step.icon size={18} /> : step.icon}
                        </span>
                        <h3 className="font-display font-semibold text-charcoal">{step.title}</h3>
                      </div>
                      <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-warm py-20" aria-label="CTA">
        <div className="max-w-marketing mx-auto px-6 text-center">
          <h2 className="font-display text-white mb-6" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            Ready to get started?
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" variant="accent" rightIcon={<ArrowRight size={18} />} onClick={() => navigate('/signup?role=landlord')}>
              I'm a Landlord
            </Button>
            <Button size="lg" className="border-white/30 text-white bg-white/10 hover:bg-white/20" onClick={() => navigate('/signup?role=tenant')}>
              I'm a Tenant
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorks;
