import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Check, X, ArrowRight, Zap, Shield, Clock, BarChart3,
  MessageSquare, FileText, Users, TrendingUp, Star, Building2
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Accordion from '../../components/ui/Accordion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

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

const comparisonFeatures = [
  { feature: 'Properties', starter: 'Unlimited', growth: 'Unlimited', enterprise: 'Unlimited' },
  { feature: 'Online rent collection', starter: true, growth: true, enterprise: true },
  { feature: 'PDF receipts', starter: true, growth: true, enterprise: true },
  { feature: 'Maintenance tracking', starter: true, growth: true, enterprise: true },
  { feature: 'Financial dashboard', starter: 'Basic', growth: 'Advanced', enterprise: 'Custom' },
  { feature: 'SMS reminders', starter: false, growth: true, enterprise: true },
  { feature: 'CSV export', starter: false, growth: true, enterprise: true },
  { feature: 'Tenant portal branding', starter: false, growth: true, enterprise: true },
  { feature: 'API access', starter: false, growth: false, enterprise: true },
  { feature: 'Dedicated account manager', starter: false, growth: false, enterprise: true },
  { feature: 'Custom integrations', starter: false, growth: false, enterprise: true },
  { feature: 'SLA guarantee', starter: false, growth: false, enterprise: true },
  { feature: 'Support', starter: 'Email', growth: 'Priority email', enterprise: '24/7 dedicated' },
];

const trustLogos = ['ShelterHQ', 'LagosLiving', 'PropertyPro', 'EstateManagers', 'Haven', 'PrimeShelter'];

const faqItems = [
  { id: 'f1', question: 'Is there a free trial?', answer: 'Yes — every plan comes with a 14-day free trial, no credit card required. You can add properties and invite tenants during the trial.' },
  { id: 'f2', question: 'What is the transaction fee?', answer: 'We charge a transparent 0.5% fee on each rent collected. This is clearly shown on every receipt. There are no hidden charges.' },
  { id: 'f3', question: 'Can I switch plans?', answer: 'Yes, you can upgrade or downgrade at any time. Upgrades are effective immediately; downgrades take effect at the end of your billing period.' },
  { id: 'f4', question: 'Do tenants pay anything?', answer: 'No. RentFlow is free for tenants. They can pay rent, download receipts, and log maintenance requests at no cost.' },
  { id: 'f5', question: 'What payment methods do you accept?', answer: 'Card payments (Visa/Mastercard), bank transfers and Paystack wallet — all major methods used in Nigeria.' },
  { id: 'f6', question: 'Is the annual discount applied immediately?', answer: 'Yes. When you switch to annual billing, the discounted rate applies from your next billing cycle and you receive a prorated credit for unused monthly days.' },
];

const CellVal = ({ val }) => {
  if (val === true)  return <Check size={16} className="text-[#1E9E6A] mx-auto" />;
  if (val === false) return <X    size={14} className="text-muted/40 mx-auto" />;
  return <span className="text-small font-medium text-charcoal">{val}</span>;
};

const Pricing = () => {
  const [annual, setAnnual] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-white overflow-x-hidden">

      {/* ══ 1. HEADER ════════════════════════════════════════════════════ */}
      <section className="bg-charcoal py-24 md:py-28 relative overflow-hidden" aria-label="Pricing header">
        <div className="absolute top-[-20%] right-[-5%] w-[500px] h-[500px] bg-[#0B4F45]/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-5%] w-[400px] h-[400px] bg-[#C75B30]/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="max-w-marketing mx-auto px-6 w-full text-center relative z-10">
          <motion.span
            className="text-micro font-bold text-accent tracking-[0.12em] uppercase mb-4 block"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          >Pricing</motion.span>
          <motion.h1
            className="font-display text-white font-black leading-tight mb-4"
            style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          >
            Simple, transparent pricing.
          </motion.h1>
          <motion.p
            className="text-white/60 text-lg mb-8 max-w-xl mx-auto"
            initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.1 } }}
          >
            Priced per unit. Tenants always pay nothing. No hidden fees, no surprises.
          </motion.p>

          {/* Billing toggle */}
          <motion.div
            className="inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl p-1.5"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          >
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all ${!annual ? 'bg-white text-charcoal shadow-sm' : 'text-white/60 hover:text-white'}`}
              aria-pressed={!annual}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${annual ? 'bg-white text-charcoal shadow-sm' : 'text-white/60 hover:text-white'}`}
              aria-pressed={annual}
            >
              Annual
              <span className="bg-[#1E9E6A] text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">−20%</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* ══ 2. PRICING CARDS ═════════════════════════════════════════════ */}
      <section className="py-20 md:py-24 bg-warm" aria-label="Pricing plans">
        <div className="max-w-marketing mx-auto px-6 w-full">
          <div className="grid md:grid-cols-3 gap-6 items-start max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={plan.highlighted ? 'md:-mt-4' : ''}
              >
                <div className={[
                  'rounded-2xl border overflow-hidden flex flex-col',
                  plan.highlighted
                    ? 'bg-[#0B4F45] border-[#0B4F45] shadow-[0_20px_60px_rgba(11,79,69,0.35)]'
                    : 'bg-white border-border shadow-sm hover:shadow-md transition-shadow',
                ].join(' ')}>
                  {plan.highlighted && (
                    <div className="bg-[#C75B30] text-white text-[10px] font-black text-center py-2 flex items-center justify-center gap-1.5 uppercase tracking-widest">
                      <Zap size={11} /> Most Popular
                    </div>
                  )}

                  <div className="p-7 flex flex-col flex-1">
                    <h2 className={`font-display font-bold text-h4 mb-1 ${plan.highlighted ? 'text-white' : 'text-charcoal'}`}>
                      {plan.name}
                    </h2>
                    <p className={`text-small mb-5 ${plan.highlighted ? 'text-white/65' : 'text-muted'}`}>{plan.desc}</p>

                    <div className="mb-6">
                      {plan.monthlyPrice ? (
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={annual ? 'annual' : 'monthly'}
                            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
                          >
                            <div className="flex items-end gap-1">
                              <span className={`font-display font-black text-h2 leading-none ${plan.highlighted ? 'text-white' : 'text-charcoal'}`}>
                                ₦{(annual ? plan.annualPrice : plan.monthlyPrice).toLocaleString()}
                              </span>
                              <span className={`text-small mb-1 ${plan.highlighted ? 'text-white/60' : 'text-muted'}`}>/unit/mo</span>
                            </div>
                            {annual && (
                              <p className={`text-[10px] mt-1 font-semibold ${plan.highlighted ? 'text-[#E79868]' : 'text-[#1E9E6A]'}`}>
                                Save 20% vs monthly
                              </p>
                            )}
                          </motion.div>
                        </AnimatePresence>
                      ) : (
                        <div className="flex items-end gap-1">
                          <span className={`font-display font-black text-h2 leading-none ${plan.highlighted ? 'text-white' : 'text-charcoal'}`}>
                            Custom
                          </span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => navigate(plan.name === 'Enterprise' ? '/contact' : '/signup')}
                      className={`w-full py-3 rounded-xl font-bold text-sm cursor-pointer transition-all mb-6 ${plan.highlighted
                        ? 'bg-white text-[#0B4F45] hover:bg-white/90'
                        : 'bg-[#0B4F45] text-white hover:bg-[#073A33]'}`}
                    >
                      {plan.cta}
                    </button>

                    <ul className="space-y-3 flex-1">
                      {plan.features.map((f) => (
                        <li key={f.text} className={`flex items-start gap-2.5 text-small ${plan.highlighted ? 'text-white/85' : 'text-body'}`}>
                          {f.included
                            ? <Check size={15} className={plan.highlighted ? 'text-[#E79868]' : 'text-[#0B4F45]'} />
                            : <X    size={15} className={plan.highlighted ? 'text-white/25' : 'text-muted/40'} />}
                          <span className={!f.included ? 'opacity-50 line-through' : ''}>{f.text}</span>
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
            className="text-center text-small text-muted mt-8 max-w-lg mx-auto"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            <strong className="text-charcoal">Transparent transaction fee:</strong> 0.5% per rent collected, shown clearly on every receipt. No hidden charges, ever.
          </motion.p>
        </div>
      </section>

      {/* ══ 3. ROI TEASER ════════════════════════════════════════════════ */}
      <section className="py-16 bg-[#0B4F45]" aria-label="Return on investment">
        <div className="max-w-marketing mx-auto px-6 w-full">
          <div className="grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/15">
            {[
              { icon: Clock,      stat: '4 hrs/wk',  label: 'Average time saved on admin per landlord' },
              { icon: TrendingUp, stat: '₦2.4M',     label: 'Avg. additional revenue captured per year' },
              { icon: Shield,     stat: '0 disputes', label: 'Tenant payment disputes with RentFlow' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="py-5 md:py-0 flex flex-col items-center gap-2"
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-2">
                  <item.icon size={18} className="text-[#E79868]" />
                </div>
                <p className="font-display font-black text-3xl md:text-4xl text-white">{item.stat}</p>
                <p className="text-white/65 text-small max-w-[200px]">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. FEATURE COMPARISON TABLE ══════════════════════════════════ */}
      <section className="py-20 md:py-24 bg-white" aria-label="Feature comparison">
        <div className="max-w-marketing mx-auto px-6 w-full">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <span className="text-micro font-bold text-accent tracking-[0.12em] uppercase">Compare Plans</span>
            <h2 className="font-display text-h2-sm md:text-h2 text-charcoal mt-2 font-bold tracking-tight leading-tight">
              Full feature comparison
            </h2>
            <p className="text-body text-muted mt-3 max-w-xl mx-auto">
              A detailed side-by-side view of everything each plan includes.
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto rounded-2xl shadow-sm border border-border overflow-hidden"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            {/* Table header */}
            <div className="grid grid-cols-4 bg-warm border-b border-border">
              <div className="px-5 py-4 text-micro font-bold text-muted uppercase tracking-wider">Feature</div>
              {['Starter', 'Growth', 'Enterprise'].map((name, i) => (
                <div key={name} className={`px-5 py-4 text-center ${i === 1 ? 'bg-[#0B4F45]/5' : ''}`}>
                  <p className={`font-display font-bold text-small ${i === 1 ? 'text-[#0B4F45]' : 'text-charcoal'}`}>{name}</p>
                </div>
              ))}
            </div>

            {/* Table rows */}
            {comparisonFeatures.map((row, i) => (
              <div key={i} className={`grid grid-cols-4 border-b border-border last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-warm/40'}`}>
                <div className="px-5 py-4 text-small font-medium text-charcoal">{row.feature}</div>
                <div className="px-5 py-4 text-center"><CellVal val={row.starter} /></div>
                <div className="px-5 py-4 text-center bg-[#0B4F45]/4"><CellVal val={row.growth} /></div>
                <div className="px-5 py-4 text-center"><CellVal val={row.enterprise} /></div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ 5. TRUST LOGOS ═══════════════════════════════════════════════ */}
      <section className="py-10 bg-warm border-y border-border" aria-label="Trusted by">
        <div className="max-w-marketing mx-auto px-6 w-full">
          <p className="text-center text-micro font-bold text-muted tracking-[0.15em] uppercase mb-6">
            Trusted by leading property managers across Africa
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14">
            {trustLogos.map((logo) => (
              <span key={logo} className="font-display font-black text-charcoal/25 text-xl tracking-tight select-none">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6. ENTERPRISE CALLOUT ════════════════════════════════════════ */}
      <section className="py-20 md:py-24 bg-white" aria-label="Enterprise">
        <div className="max-w-marketing mx-auto px-6 w-full">
          <motion.div
            className="bg-charcoal rounded-3xl p-10 md:p-14 relative overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <div className="absolute top-[-15%] right-[-8%] w-[500px] h-[500px] bg-[#0B4F45]/25 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-15%] left-[-8%] w-[350px] h-[350px] bg-[#C75B30]/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="grid lg:grid-cols-2 gap-10 items-center relative z-10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
                  <Building2 className="w-4 h-4 text-[#E79868]" />
                  <span className="text-micro font-bold tracking-wider uppercase text-white/90">Enterprise Plan</span>
                </div>
                <h2 className="font-display font-bold text-h3 md:text-h2-sm text-white mb-4 tracking-tight leading-tight">
                  Managing 150+ units?<br />Let's build something custom.
                </h2>
                <p className="text-white/65 text-body leading-relaxed mb-8 max-w-md">
                  Our enterprise team will work with you to create a tailored plan that fits your portfolio
                  structure, accounting requirements, and team workflows.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => navigate('/contact')}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-charcoal font-bold text-sm cursor-pointer hover:bg-white/90 transition-all"
                  >
                    Talk to Sales <ArrowRight size={15} />
                  </button>
                  <button
                    onClick={() => navigate('/features')}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/25 text-white font-semibold text-sm cursor-pointer hover:bg-white/10 transition-all"
                  >
                    View All Features
                  </button>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Users,       label: 'Dedicated account manager' },
                  { icon: FileText,    label: 'Custom reporting & exports' },
                  { icon: Shield,      label: 'SLA with uptime guarantee' },
                  { icon: BarChart3,   label: 'Advanced analytics suite' },
                  { icon: MessageSquare, label: '24/7 priority support' },
                  { icon: Zap,         label: 'API & custom integrations' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/5 rounded-xl p-4 border border-white/10">
                    <item.icon size={16} className="text-[#E79868] shrink-0" />
                    <span className="text-white/80 text-small font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ 7. FAQ ═══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24 bg-warm" aria-label="Pricing FAQ">
        <div className="max-w-marketing mx-auto px-6 w-full">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <span className="text-micro font-bold text-accent tracking-[0.12em] uppercase">FAQ</span>
            <h2 className="font-display text-h2-sm md:text-h2 text-charcoal mt-2 font-bold tracking-tight">
              Pricing questions, answered.
            </h2>
          </motion.div>
          <div className="max-w-3xl mx-auto">
            <Accordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* ══ 8. FINAL CTA ═════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24 bg-white" aria-label="Get started CTA">
        <div className="max-w-marketing mx-auto px-6 w-full">
          <motion.div
            className="bg-[#0B4F45] rounded-3xl px-10 py-16 md:px-16 md:py-20 text-center text-white relative overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#073A33]/80 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-[-20%] right-[-10%] w-[350px] h-[350px] bg-[#C75B30]/15 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="text-[#E79868] text-micro font-bold tracking-[0.15em] uppercase mb-4 block">
                14 days free · No credit card needed
              </span>
              <h2 className="font-display font-bold text-h3 md:text-h2-sm text-white mb-5 leading-tight">
                Start your free trial today.
              </h2>
              <p className="text-white/70 text-body mb-8 leading-relaxed">
                Join thousands of modern landlords across Africa using RentFlow to save time, reduce stress, and get paid faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => navigate('/signup')}
                  className="px-8 py-3.5 rounded-xl bg-[#C75B30] hover:bg-[#A94A24] text-white font-bold text-sm cursor-pointer transition-all shadow-lg active:scale-[0.98]"
                >
                  Get started — no card required
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

export default Pricing;
