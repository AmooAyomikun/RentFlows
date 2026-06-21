import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import Button from '../../components/ui/Button';

const fadeUp = (i = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] } },
});

const landlordSteps = [
  { num: '01', title: 'Sign up as a landlord', desc: 'Create your account with your name, email and business name. Takes under 2 minutes.', icon: '🏗️' },
  { num: '02', title: 'Add your property', desc: 'Enter the property name, address and create your units. Set the rent amount and due date for each.', icon: '🏢' },
  { num: '03', title: 'Invite your tenants', desc: 'Each tenant gets a personalised invite link by email. They set a password and land directly in their lease.', icon: '📧' },
  { num: '04', title: 'Track payments', desc: 'Your dashboard shows every payment in real time. Overdue alerts fire automatically so you never have to chase.', icon: '📊' },
  { num: '05', title: 'Get paid out', desc: 'Rent collected goes straight to your registered bank account. Receipts are generated automatically.', icon: '💰' },
];

const tenantSteps = [
  { num: '01', title: 'Receive your invite', desc: 'Your landlord sends you a personalised invite link. No need to search for an app or create an account separately.', icon: '📨' },
  { num: '02', title: 'View your lease', desc: 'Your rent amount, due date, lease start/end and landlord contact details are all there in one place.', icon: '📃' },
  { num: '03', title: 'Pay rent', desc: 'Tap Pay Rent, choose your method — card, bank transfer or Paystack — and confirm. Done.', icon: '💳' },
  { num: '04', title: 'Download your receipt', desc: 'Your receipt is ready immediately. Download the PDF and keep it as long as you need.', icon: '🧾' },
  { num: '05', title: 'Log maintenance issues', desc: 'Something broken? Log a request with a description and photo. Track its progress from received to resolved.', icon: '🔧' },
];

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState('landlord');
  const navigate = useNavigate();

  const steps = activeTab === 'landlord' ? landlordSteps : tenantSteps;

  return (
    <>
      {/* Header */}
      <section className="bg-charcoal py-20" aria-label="How it works header">
        <div className="max-w-marketing mx-auto px-6 text-center">
          <motion.h1
            className="font-display text-white mb-4"
            style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            How RentFlow works.
          </motion.h1>
          <motion.p
            className="text-white/60 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.1 } }}
          >
            Two journeys. One platform. Built for both sides of the rental relationship.
          </motion.p>
        </div>
      </section>

      {/* Tab toggle */}
      <section className="section-py bg-warm" aria-label="Journey steps">
        <div className="max-w-marketing mx-auto px-6">
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
                        <span aria-hidden="true">{step.icon}</span>
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
