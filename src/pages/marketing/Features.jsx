import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Building2, CreditCard, FileText, Clock, Wrench, BarChart3, CheckCircle, ArrowRight
} from 'lucide-react';
import Button from '../../components/ui/Button';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

const features = [
  {
    icon: Building2,
    title: 'Property & Tenant Management',
    description: 'Manage your entire portfolio from one screen. Add properties, create units, and invite tenants with a personalised email link.',
    bullets: ['Multi-property dashboard', 'Unit-level occupancy tracking', 'Tenant invite system', 'Lease storage & access'],
    image: 'right',
    color: 'bg-primary/8',
    iconColor: 'text-primary',
  },
  {
    icon: CreditCard,
    title: 'Online Rent Payment',
    description: 'Tenants pay rent in three taps using card, bank transfer or Paystack. No more bank-transfer screenshots on WhatsApp.',
    bullets: ['Multiple payment methods', 'Real-time payment confirmation', 'Automated due-date reminders', 'Late fee calculation'],
    image: 'left',
    color: 'bg-accent/8',
    iconColor: 'text-accent',
  },
  {
    icon: FileText,
    title: 'Auto-Generated Receipts',
    description: 'Every payment triggers an official, branded PDF receipt before the tenant has put their phone away.',
    bullets: ['Instant receipt delivery', 'Downloadable PDF format', 'Transaction reference numbers', 'Landlord branding on receipts'],
    image: 'right',
    color: 'bg-success/8',
    iconColor: 'text-success',
  },
  {
    icon: Clock,
    title: 'Late Payment Tracking',
    description: "Know who's overdue before it becomes a problem. Automated reminders go out 7, 3 and 1 day before rent is due.",
    bullets: ['7/3/1 day automated reminders', 'Overdue dashboard alerts', 'Late fee automation', 'Payment history per tenant'],
    image: 'left',
    color: 'bg-warning/8',
    iconColor: 'text-warning',
  },
  {
    icon: Wrench,
    title: 'Maintenance Requests',
    description: 'Tenants log issues with photos directly in the app. Landlords track progress from received to resolved on a visual board.',
    bullets: ['Photo upload support', 'Priority categorisation', 'Status timeline for tenants', 'Kanban board for landlords'],
    image: 'right',
    color: 'bg-info/8',
    iconColor: 'text-info',
  },
  {
    icon: BarChart3,
    title: 'Financial Dashboard',
    description: 'Revenue trends, occupancy rates and outstanding balances — all in one place, ready to export for tax season.',
    bullets: ['Monthly revenue chart', 'Property-by-property breakdown', 'CSV export for accountants', 'Outstanding balance summary'],
    image: 'left',
    color: 'bg-primary/8',
    iconColor: 'text-primary',
  },
];

const Features = () => (
  <>
    {/* Header */}
    <section className="bg-charcoal py-20" aria-label="Features header">
      <div className="max-w-marketing mx-auto px-6 text-center">
        <motion.h1
          className="font-display text-white mb-5"
          style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Everything you need to run a rental business.
        </motion.h1>
        <motion.p
          className="text-white/60 text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Six core capabilities designed around the real experience of Nigerian landlords and tenants.
        </motion.p>
      </div>
    </section>

    {/* Feature sections */}
    {features.map((feature, i) => {
      const isLeft = feature.image === 'left';
      return (
        <section
          key={feature.title}
          className={`section-py ${i % 2 === 0 ? 'bg-white' : 'bg-warm'}`}
          aria-label={feature.title}
        >
          <div className="max-w-marketing mx-auto px-6">
            <motion.div
              className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${isLeft ? 'lg:flex-row-reverse' : ''}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
            >
              {/* Text side */}
              <motion.div
                className={isLeft ? 'lg:order-2' : ''}
                variants={fadeUp}
              >
                <div className={`${feature.color} w-12 h-12 rounded flex items-center justify-center mb-5`}>
                  <feature.icon size={24} className={feature.iconColor} aria-hidden="true" />
                </div>
                <h2 className="font-display text-charcoal mb-4">{feature.title}</h2>
                <p className="text-body text-body mb-6 leading-relaxed">{feature.description}</p>
                <ul className="space-y-2.5">
                  {feature.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-body">
                      <CheckCircle size={16} className="text-success mt-0.5 flex-shrink-0" aria-hidden="true" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Visual side */}
              <motion.div
                className={`${isLeft ? 'lg:order-1' : ''}`}
                variants={{ hidden: { opacity: 0, x: isLeft ? -24 : 24 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5 } } }}
              >
                <FeatureMockup feature={feature} index={i} />
              </motion.div>
            </motion.div>
          </div>
        </section>
      );
    })}

    {/* CTA */}
    <section className="bg-gradient-warm py-20" aria-label="Call to action">
      <div className="max-w-marketing mx-auto px-6 text-center">
        <h2 className="font-display text-white mb-6" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
          Ready to try it for yourself?
        </h2>
        <Button size="lg" variant="accent" rightIcon={<ArrowRight size={18} />} onClick={() => window.location.href = '/signup'}>
          Start your free trial
        </Button>
      </div>
    </section>
  </>
);

/** Placeholder visual for each feature */
const FeatureMockup = ({ feature, index }) => (
  <div className="bg-white rounded-lg border border-border shadow-md overflow-hidden">
    <div className="bg-warm/60 px-4 py-3 border-b border-border">
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-error/50" />
        <div className="w-2 h-2 rounded-full bg-warning/50" />
        <div className="w-2 h-2 rounded-full bg-success/50" />
        <div className="flex-1 bg-border h-4 rounded mx-2" />
      </div>
    </div>
    <div className="p-6 min-h-[180px] flex items-center justify-center">
      <div className="text-center">
        <div className={`${feature.color} w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-3`}>
          <feature.icon size={28} className={feature.iconColor} aria-hidden="true" />
        </div>
        <p className="text-xs font-medium text-muted">{feature.title} interface</p>
      </div>
    </div>
  </div>
);

export default Features;
