import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, Shield, Clock, TrendingUp, Building2 } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Accordion from '../../components/ui/Accordion';

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

const ForLandlords = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal py-24" aria-label="Landlord hero">
        <div className="max-w-marketing mx-auto px-6">
          <div className="max-w-2xl">
            <motion.p
              className="text-accent text-sm font-semibold uppercase tracking-widest mb-4"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            >
              For Landlords
            </motion.p>
            <motion.h1
              className="font-display text-white mb-6"
              style={{ fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.02em' }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            >
              Run your rental business like a pro.
            </motion.h1>
            <motion.p className="text-white/70 text-lg mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.15 } }}>
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

      {/* What you get */}
      <section className="section-py bg-warm" aria-label="Landlord features">
        <div className="max-w-marketing mx-auto px-6">
          <h2 className="font-display text-charcoal text-center mb-12">What you get with RentFlow.</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {perks.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="h-full group">
                  {/* Upgraded icon: gradient halo + larger icon */}
                  <div className="relative mb-5 w-fit">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 blur-xl scale-150 opacity-60 group-hover:opacity-90 transition-opacity duration-300" aria-hidden="true" />
                    <div className="relative bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center">
                      <p.icon size={26} className="text-primary" aria-hidden="true" />
                    </div>
                  </div>
                  <h3 className="font-display font-semibold text-charcoal text-lg mb-2">{p.title}</h3>
                  <p className="text-sm text-muted">{p.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Multi-property visual — with real photo background */}
      <section className="relative section-py overflow-hidden" aria-label="Multi-property management">
        {/* Photo background with teal overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/trust-bg.png)' }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-[#073A33]/85" aria-hidden="true" />

        <div className="max-w-marketing mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-accent/90 mb-3">Scale freely</p>
            <h2 className="font-display text-white mb-4">One dashboard. Any number of properties.</h2>
            <p className="text-white/70 max-w-xl mx-auto mb-10">Whether you manage 1 duplex or a 50-unit portfolio across multiple cities, RentFlow shows you everything in one place.</p>
          </motion.div>
          <motion.div
            className="grid grid-cols-3 md:grid-cols-5 gap-3 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            {['Lekki', 'GRA', 'Wuse', 'Enugu', '+More'].map((loc) => (
              <div key={loc} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 text-center hover:bg-white/15 transition-colors">
                <Building2 size={18} className="text-white/80 mx-auto mb-1" aria-hidden="true" />
                <p className="text-xs font-medium text-white/90">{loc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="section-py bg-warm" aria-label="Pricing">
        <div className="max-w-marketing mx-auto px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Simple pricing</p>
          <h2 className="font-display text-charcoal mb-4">From ₦3,000 per property/month.</h2>
          <p className="text-muted text-sm mb-6">14-day free trial included. No credit card required.</p>
          <Button variant="secondary" onClick={() => navigate('/pricing')}>See full pricing →</Button>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-py bg-white" aria-label="Landlord FAQ">
        <div className="max-w-marketing mx-auto px-6 max-w-2xl mx-auto">
          <h2 className="font-display text-charcoal text-center mb-8">Common landlord questions.</h2>
          <Accordion items={faqItems} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-warm py-20" aria-label="CTA">
        <div className="max-w-marketing mx-auto px-6 text-center">
          <h2 className="font-display text-white mb-5" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>List your first property — free.</h2>
          <Button size="lg" variant="accent" rightIcon={<ArrowRight size={18} />} onClick={() => navigate('/signup?role=landlord')}>
            Get started
          </Button>
        </div>
      </section>
    </>
  );
};

export default ForLandlords;
