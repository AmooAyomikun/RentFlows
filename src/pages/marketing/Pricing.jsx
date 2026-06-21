import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, X, ArrowRight, Zap } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Accordion from '../../components/ui/Accordion';

const plans = [
  {
    name: 'Starter',
    monthlyPrice: 1000,
    annualPrice: 800,
    desc: 'Perfect for individual landlords with up to 50 units.',
    features: [
      { text: 'Unlimited tenants per property', included: true },
      { text: 'Online rent collection', included: true },
      { text: 'Instant PDF receipts', included: true },
      { text: 'Maintenance request tracking', included: true },
      { text: 'Basic financial dashboard', included: true },
      { text: 'Email support', included: true },
      { text: 'Bulk SMS reminders', included: false },
      { text: 'CSV export', included: false },
      { text: 'Priority support', included: false },
    ],
    cta: 'Start free trial',
    highlighted: false,
  },
  {
    name: 'Growth',
    monthlyPrice: 2500,
    annualPrice: 2000,
    desc: 'For growing portfolios that need more automation and reporting.',
    features: [
      { text: 'Everything in Starter', included: true },
      { text: 'Bulk SMS reminders', included: true },
      { text: 'CSV export for accountants', included: true },
      { text: 'Advanced financial reports', included: true },
      { text: 'Priority email support', included: true },
      { text: 'Tenant portal branding', included: true },
      { text: 'API access', included: false },
      { text: 'Dedicated account manager', included: false },
      { text: 'Custom integrations', included: false },
    ],
    cta: 'Start free trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    monthlyPrice: null,
    annualPrice: null,
    desc: 'For portfolios of 150+ units with custom needs.',
    features: [
      { text: 'Everything in Growth', included: true },
      { text: 'API access', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'Custom integrations', included: true },
      { text: 'SLA guarantee', included: true },
      { text: 'Onboarding assistance', included: true },
      { text: 'Custom reporting', included: true },
      { text: 'White-label option', included: true },
      { text: 'Negotiated transaction fees', included: true },
    ],
    cta: 'Contact sales',
    highlighted: false,
  },
];

const faqItems = [
  { id: 'f1', question: 'Is there a free trial?', answer: 'Yes. Every plan includes a 14-day free trial with no credit card required. You can add units and invite tenants immediately.' },
  { id: 'f2', question: 'What are the transaction fees?', answer: 'We charge a flat 0.5% fee per successful rent payment. This is automatically deducted during the payout. There are no hidden processing fees.' },
  { id: 'f3', question: 'Can I switch or cancel my plan?', answer: 'Yes, you can upgrade, downgrade, or cancel at any time. Upgrades are prorated immediately; downgrades take effect at the end of your billing cycle.' },
  { id: 'f4', question: 'Do tenants pay to use the platform?', answer: 'No. The tenant portal is 100% free. Tenants can pay rent, submit maintenance tickets, and download PDF receipts at no cost.' },
  { id: 'f5', question: 'What payment methods are supported?', answer: 'Tenants can pay via Credit/Debit Card, direct Bank Transfer, or Paystack. Funds settle to your account in 24 hours.' },
];

const Pricing = () => {
  const [annual, setAnnual] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* Header */}
      <section className="bg-charcoal py-20" aria-label="Pricing header">
        <div className="max-w-marketing mx-auto px-6 text-center">
          <motion.h1
            className="font-display text-white mb-4"
            style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Simple, transparent pricing.
          </motion.h1>
          <motion.p className="text-white/60 text-lg mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.1 } }}>
            Priced per unit. Tenants always pay nothing.
          </motion.p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-lg p-1.5">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-2 text-sm font-medium rounded transition-all ${!annual ? 'bg-white text-charcoal' : 'text-white/60 hover:text-white'}`}
              aria-pressed={!annual}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-2 text-sm font-medium rounded transition-all flex items-center gap-2 ${annual ? 'bg-white text-charcoal' : 'text-white/60 hover:text-white'}`}
              aria-pressed={annual}
            >
              Annual
              <span className="bg-success text-white text-xs px-1.5 py-0.5 rounded-full font-semibold">−20%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="section-py bg-warm" aria-label="Pricing plans">
        <div className="max-w-marketing mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 items-start">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div
                  className={[
                    'bg-white rounded-lg border shadow-card overflow-hidden',
                    plan.highlighted
                      ? 'border-primary shadow-lg scale-105 relative z-10'
                      : 'border-border',
                  ].join(' ')}
                >
                  {plan.highlighted && (
                    <div className="bg-primary text-white text-xs font-semibold text-center py-2 flex items-center justify-center gap-1.5">
                      <Zap size={12} aria-hidden="true" />
                      Most popular
                    </div>
                  )}

                  <div className="p-6">
                    <h2 className="font-display font-bold text-charcoal text-xl mb-1">{plan.name}</h2>
                    <p className="text-sm text-muted mb-5">{plan.desc}</p>

                    <div className="mb-6">
                      {plan.monthlyPrice ? (
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={annual ? 'annual' : 'monthly'}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                          >
                            <span className="font-mono text-3xl font-bold text-charcoal">
                              ₦{(annual ? plan.annualPrice : plan.monthlyPrice).toLocaleString()}
                            </span>
                            <span className="text-muted text-sm"> /unit/month</span>
                          </motion.div>
                        </AnimatePresence>
                      ) : (
                        <p className="font-mono text-3xl font-bold text-charcoal">Custom</p>
                      )}
                    </div>

                    <Button
                      size="md"
                      variant={plan.highlighted ? 'primary' : 'secondary'}
                      className="w-full mb-6"
                      onClick={() => navigate(plan.name === 'Enterprise' ? '/contact' : '/signup')}
                    >
                      {plan.cta}
                    </Button>

                    <ul className="space-y-2.5">
                      {plan.features.map((f) => (
                        <li key={f.text} className="flex items-start gap-2.5 text-sm">
                          {f.included ? (
                            <Check size={15} className="text-success flex-shrink-0 mt-0.5" aria-hidden="true" />
                          ) : (
                            <X size={15} className="text-muted/40 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          )}
                          <span className={f.included ? 'text-body' : 'text-muted/60 line-through'}>{f.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Transaction fee note */}
          <motion.p
            className="text-center text-sm text-muted mt-8 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <strong className="text-charcoal">Transparent transaction fee:</strong> 0.5% per rent collected, shown clearly on every receipt. No hidden charges, ever.
          </motion.p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-py bg-white" aria-label="Pricing FAQ">
        <div className="max-w-marketing mx-auto px-6 max-w-2xl mx-auto">
          <h2 className="font-display text-charcoal text-center mb-8">Pricing questions, answered.</h2>
          <Accordion items={faqItems} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-warm py-20" aria-label="CTA">
        <div className="max-w-marketing mx-auto px-6 text-center">
          <h2 className="font-display text-white mb-6" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            Start your 14-day free trial.
          </h2>
          <Button size="lg" variant="accent" rightIcon={<ArrowRight size={18} />} onClick={() => navigate('/signup')}>
            Get started — no card required
          </Button>
        </div>
      </section>
    </>
  );
};

export default Pricing;
