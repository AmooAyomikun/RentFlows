import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const allTestimonials = [
  { id: 1, name: 'Chukwuma Obi', role: 'landlord', location: 'Lagos', count: 12, quote: 'Before RentFlow, I was chasing 12 tenants on WhatsApp every month. Now I check one dashboard, and the money comes in.', result: '40% reduction in late payments' },
  { id: 2, name: 'Adaeze Nwofor', role: 'tenant', location: 'Abuja', count: null, quote: 'My landlord doesn\'t even know I exist unless there\'s an issue. I pay rent, download my receipt, and I have proof whenever I need it.', result: null },
  { id: 3, name: 'Ibrahim Suleiman', role: 'landlord', location: 'Kano', count: 6, quote: 'I manage properties from three cities. RentFlow gives me visibility I never had before. If a tenant is overdue, I know immediately.', result: 'Manages 3 cities from one screen' },
  { id: 4, name: 'Chiamaka Eze', role: 'tenant', location: 'Port Harcourt', count: null, quote: 'I reported a plumbing issue at 9pm and it was acknowledged by 10am. My previous landlord would take three weeks.', result: null },
  { id: 5, name: 'Yemi Adesanya', role: 'landlord', location: 'Ibadan', count: 3, quote: 'Tax season used to be a nightmare — digging through bank statements. Now I just export the report from RentFlow. Done in five minutes.', result: 'Saves 4 hours every tax season' },
  { id: 6, name: 'Nkechi Obiora', role: 'tenant', location: 'Enugu', count: null, quote: 'For the first time, I actually have a written record of every rent I\'ve paid. That\'s huge for me as a tenant.', result: null },
];

const casestudies = [
  {
    name: 'Okafor Properties, Lagos',
    description: 'A 22-unit portfolio across Lekki and Victoria Island, previously managed through Excel and bank alerts.',
    result: 'Reduced late payments by 40% in the first 3 months',
    metrics: [{ label: 'Units', value: '22' }, { label: 'Late payments', value: '−40%' }, { label: 'Time saved/month', value: '8 hrs' }],
  },
];

const Testimonials = () => {
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  const filtered = allTestimonials.filter(t => filter === 'all' || t.role === filter);

  return (
    <>
      <section className="bg-charcoal py-20" aria-label="Testimonials header">
        <div className="max-w-marketing mx-auto px-6 text-center">
          <motion.h1 className="font-display text-white mb-4" style={{ fontSize: 'clamp(36px, 5vw, 60px)' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Real stories. Real results.
          </motion.h1>
          <motion.p className="text-white/60 text-lg" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.1 } }}>
            From landlords managing portfolios to tenants finally getting receipts.
          </motion.p>
        </div>
      </section>

      <section className="section-py bg-warm" aria-label="Testimonial grid">
        <div className="max-w-marketing mx-auto px-6">
          {/* Filter chips */}
          <div className="flex gap-2 justify-center mb-10" role="group" aria-label="Filter testimonials">
            {['all', 'landlord', 'tenant'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={[
                  'px-4 py-2 text-sm font-medium rounded-full border transition-all',
                  filter === f ? 'bg-primary border-primary text-white' : 'border-border text-muted hover:border-primary/40 hover:text-charcoal bg-white',
                ].join(' ')}
              >
                {f === 'all' ? 'All' : f === 'landlord' ? 'Landlords' : 'Tenants'}
              </button>
            ))}
          </div>

          {/* Grid */}
          <AnimatePresence>
            <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((t, i) => (
                <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card className="h-full flex flex-col">
                    <div className="flex gap-0.5 mb-3" aria-label="5 stars">
                      {[...Array(5)].map((_, j) => <Star key={j} size={13} className="text-warning fill-warning" aria-hidden="true" />)}
                    </div>
                    <p className="text-sm text-body leading-relaxed flex-1 mb-4">"{t.quote}"</p>
                    <div className="border-t border-border pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-charcoal text-sm">{t.name}</p>
                          <p className="text-xs text-muted capitalize">{t.role} · {t.location}</p>
                        </div>
                        {t.result && <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-full font-medium text-right max-w-[110px]">{t.result}</span>}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Case study */}
          <div className="mt-12">
            <h2 className="font-display text-charcoal text-center mb-8">Case study.</h2>
            {casestudies.map((cs) => (
              <Card key={cs.name} className="max-w-2xl mx-auto">
                <h3 className="font-display font-semibold text-charcoal text-xl mb-2">{cs.name}</h3>
                <p className="text-sm text-muted mb-6">{cs.description}</p>
                <p className="font-semibold text-primary mb-6">"{cs.result}"</p>
                <div className="grid grid-cols-3 gap-4 border-t border-border pt-5">
                  {cs.metrics.map((m) => (
                    <div key={m.label} className="text-center">
                      <p className="font-mono font-bold text-2xl text-charcoal">{m.value}</p>
                      <p className="text-xs text-muted mt-0.5">{m.label}</p>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-warm py-20" aria-label="CTA">
        <div className="max-w-marketing mx-auto px-6 text-center">
          <h2 className="font-display text-white mb-5" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>Join them.</h2>
          <Button size="lg" variant="accent" rightIcon={<ArrowRight size={18} />} onClick={() => navigate('/signup')}>Get started free</Button>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
