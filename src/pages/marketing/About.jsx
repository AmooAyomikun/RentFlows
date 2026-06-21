import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Target, Users, Globe } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const values = [
  { icon: Heart, title: 'Tenant dignity', desc: 'Every tenant deserves a receipt, a lease they can read, and a way to report problems without picking up the phone.' },
  { icon: Target, title: 'Landlord clarity', desc: 'Every landlord deserves to know exactly who has paid, who hasn\'t, and how their portfolio is performing — without a spreadsheet.' },
  { icon: Users, title: 'Mutual trust', desc: 'Healthy rentals are built on trust. RentFlow creates the paper trail that makes trust easier on both sides.' },
  { icon: Globe, title: 'African-first', desc: 'Built for the realities of Nigerian and African rental markets — not adapted from a Western product that doesn\'t fit.' },
];

const team = [
  { name: 'Amoo Quadri', role: 'Founder & CEO', initials: 'AQ' },
  { name: 'Placeholder', role: 'Head of Product', initials: 'PL' },
  { name: 'Placeholder', role: 'Lead Engineer', initials: 'PL' },
  { name: 'Placeholder', role: 'Head of Design', initials: 'PL' },
];

const About = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Mission hero */}
      <section className="bg-charcoal py-24" aria-label="Mission">
        <div className="max-w-marketing mx-auto px-6">
          <motion.div className="max-w-2xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-white mb-6" style={{ fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.02em' }}>
              Give every African landlord a professional home for their rental business.
            </h1>
            <p className="text-white/60 text-lg">We started RentFlow because we lived the problem — rent paid into a personal account with no receipt, disputes with no paper trail, and landlords who had no idea what their portfolio was actually earning.</p>
          </motion.div>
        </div>
      </section>

      {/* Origin story */}
      <section className="section-py bg-white" aria-label="Origin story">
        <div className="max-w-marketing mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Our story</p>
              <h2 className="font-display text-charcoal mb-5">Born from the WhatsApp group problem.</h2>
              <div className="space-y-4 text-body text-body leading-relaxed">
                <p>The average Nigerian landlord manages rent through a combination of bank alerts, WhatsApp messages, voice calls and handwritten notebooks. When disputes happen — and they always happen — there's no trail.</p>
                <p>The average Nigerian tenant pays rent into a personal bank account, gets no receipt, and has no way to prove payment if the landlord claims otherwise.</p>
                <p>RentFlow exists to fix this. Not with a complicated enterprise system that requires a training course, but with a product that's as easy to use as WhatsApp and as trustworthy as a bank receipt.</p>
              </div>
            </motion.div>
            <motion.div className="bg-warm rounded-lg p-8 border border-border" initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="text-center">
                <p className="font-mono text-5xl font-bold text-primary mb-2">₦180M+</p>
                <p className="text-muted text-sm mb-6">processed through RentFlow</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center"><p className="font-mono font-bold text-2xl text-charcoal">2,400+</p><p className="text-xs text-muted">units managed</p></div>
                  <div className="text-center"><p className="font-mono font-bold text-2xl text-charcoal">98%</p><p className="text-xs text-muted">receipts issued on time</p></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-py bg-warm" aria-label="Values">
        <div className="max-w-marketing mx-auto px-6">
          <h2 className="font-display text-charcoal text-center mb-12">What we stand for.</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card>
                  <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center mb-4">
                    <v.icon size={20} className="text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-display font-semibold text-charcoal text-lg mb-2">{v.title}</h3>
                  <p className="text-sm text-muted">{v.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-py bg-white" aria-label="Team">
        <div className="max-w-marketing mx-auto px-6">
          <h2 className="font-display text-charcoal text-center mb-12">The team.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name + i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-display font-bold text-lg text-primary">{member.initials}</span>
                </div>
                <p className="font-semibold text-charcoal">{member.name}</p>
                <p className="text-sm text-muted">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-warm py-20" aria-label="CTA">
        <div className="max-w-marketing mx-auto px-6 text-center">
          <h2 className="font-display text-white mb-5" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>Be part of the story.</h2>
          <Button size="lg" variant="accent" onClick={() => navigate('/signup')}>Get started free</Button>
        </div>
      </section>
    </>
  );
};

export default About;
