import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, FileText, Wrench, CheckCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Accordion from '../../components/ui/Accordion';

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
    <>
      {/* Hero */}
      <section className="bg-charcoal py-24" aria-label="Tenant hero">
        <div className="max-w-marketing mx-auto px-6">
          <div className="max-w-2xl">
            <motion.p className="text-accent text-sm font-semibold uppercase tracking-widest mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              For Tenants
            </motion.p>
            <motion.h1 className="font-display text-white mb-6" style={{ fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.02em' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              Pay rent. Get proof. Done.
            </motion.h1>
            <motion.p className="text-white/70 text-lg mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.15 } }}>
              No more bank alerts. No more "I'll send the screenshot later." Pay rent in three taps and download your official receipt immediately.
            </motion.p>
            <motion.p className="text-white/50 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }}>
              Already have an invite? <button onClick={() => navigate('/login')} className="text-accent hover:underline">Log in here</button>
            </motion.p>
          </div>
        </div>
      </section>

      {/* 3-step payment visual */}
      <section className="section-py bg-warm" aria-label="How paying rent works">
        <div className="max-w-marketing mx-auto px-6">
          <h2 className="font-display text-charcoal text-center mb-12">How paying rent works.</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {steps.map((step, i) => (
              <motion.div key={step.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-white font-mono font-bold text-sm flex items-center justify-center mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="font-display font-semibold text-charcoal text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="section-py bg-white" aria-label="Security and trust">
        <div className="max-w-marketing mx-auto px-6">
          <h2 className="font-display text-charcoal text-center mb-4">Your money and data are safe with us.</h2>
          <p className="text-body text-body text-center max-w-xl mx-auto mb-12">
            We know that trusting a new platform with your rent payment is a big deal. Here's how we protect you.
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {trustPoints.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card>
                  <div className="w-11 h-11 bg-success/10 rounded flex items-center justify-center mb-4">
                    <p.icon size={22} className="text-success" aria-hidden="true" />
                  </div>
                  <h3 className="font-display font-semibold text-charcoal text-lg mb-2">{p.title}</h3>
                  <p className="text-sm text-muted">{p.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance highlight */}
      <section className="section-py bg-warm" aria-label="Maintenance requests">
        <div className="max-w-marketing mx-auto px-6 text-center max-w-xl mx-auto">
          <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-5">
            <Wrench size={26} className="text-accent" aria-hidden="true" />
          </div>
          <h2 className="font-display text-charcoal mb-4">Report issues without the phone call.</h2>
          <p className="text-body text-body mb-6">
            Something broken in your unit? Log a maintenance request with a photo and description. Track its status from received to resolved — no WhatsApp, no chasing.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-py bg-white" aria-label="Tenant FAQ">
        <div className="max-w-marketing mx-auto px-6 max-w-2xl mx-auto">
          <h2 className="font-display text-charcoal text-center mb-8">Tenant questions, answered.</h2>
          <Accordion items={faqItems} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-warm py-20" aria-label="CTA">
        <div className="max-w-marketing mx-auto px-6 text-center">
          <h2 className="font-display text-white mb-4" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>Ask your landlord about RentFlow.</h2>
          <p className="text-white/60 mb-8">Already have an account? Log in below.</p>
          <Button size="lg" variant="accent" onClick={() => navigate('/login')}>Log in to your account</Button>
        </div>
      </section>
    </>
  );
};

export default ForTenants;
