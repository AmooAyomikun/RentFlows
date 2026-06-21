import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Building2, CreditCard, FileText, Clock, Wrench, BarChart3,
  CheckCircle, ArrowRight, TrendingUp, AlertCircle, Wifi
} from 'lucide-react';
import Button from '../../components/ui/Button';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

/** Stats shown in the header */
const headerStats = [
  { value: '2,400+', label: 'Units managed' },
  { value: '₦180M+', label: 'Rent collected' },
  { value: '98%', label: 'On-time receipts' },
];

const features = [
  {
    icon: Building2,
    title: 'Property & Tenant Management',
    description: 'Manage your entire portfolio from one screen. Add properties, create units, and invite tenants with a personalised email link.',
    bullets: ['Multi-property dashboard', 'Unit-level occupancy tracking', 'Tenant invite system', 'Lease storage & access'],
    image: 'right',
    iconColor: 'text-primary',
    accentColor: 'bg-primary/10',
    heroFeature: true,
  },
  {
    icon: CreditCard,
    title: 'Online Rent Payment',
    description: 'Tenants pay rent in three taps using card, bank transfer or Paystack. No more bank-transfer screenshots on WhatsApp.',
    bullets: ['Multiple payment methods', 'Real-time payment confirmation', 'Automated due-date reminders', 'Late fee calculation'],
    image: 'left',
    iconColor: 'text-accent',
    accentColor: 'bg-accent/10',
    heroFeature: false,
  },
  {
    icon: FileText,
    title: 'Auto-Generated Receipts',
    description: 'Every payment triggers an official, branded PDF receipt before the tenant has put their phone away.',
    bullets: ['Instant receipt delivery', 'Downloadable PDF format', 'Transaction reference numbers', 'Landlord branding on receipts'],
    image: 'right',
    iconColor: 'text-success',
    accentColor: 'bg-success/10',
    heroFeature: false,
  },
  {
    icon: Clock,
    title: 'Late Payment Tracking',
    description: "Know who's overdue before it becomes a problem. Automated reminders go out 7, 3 and 1 day before rent is due.",
    bullets: ['7/3/1 day automated reminders', 'Overdue dashboard alerts', 'Late fee automation', 'Payment history per tenant'],
    image: 'left',
    iconColor: 'text-warning',
    accentColor: 'bg-warning/10',
    heroFeature: true,
  },
  {
    icon: Wrench,
    title: 'Maintenance Requests',
    description: 'Tenants log issues with photos directly in the app. Landlords track progress from received to resolved on a visual board.',
    bullets: ['Photo upload support', 'Priority categorisation', 'Status timeline for tenants', 'Kanban board for landlords'],
    image: 'right',
    iconColor: 'text-info',
    accentColor: 'bg-info/10',
    heroFeature: false,
  },
  {
    icon: BarChart3,
    title: 'Financial Dashboard',
    description: 'Revenue trends, occupancy rates and outstanding balances — all in one place, ready to export for tax season.',
    bullets: ['Monthly revenue chart', 'Property-by-property breakdown', 'CSV export for accountants', 'Outstanding balance summary'],
    image: 'left',
    iconColor: 'text-primary',
    accentColor: 'bg-primary/10',
    heroFeature: false,
  },
];

/** Background alternation: 3 tones */
const sectionBgs = ['bg-white', 'bg-warm', 'bg-[#F0EDE7]'];

const Features = () => (
  <>
    {/* ─── Header ─── */}
    <section className="bg-charcoal py-20 pb-16" aria-label="Features header">
      <div className="max-w-marketing mx-auto px-6">
        <div className="text-center mb-12">
          <motion.p
            className="text-xs font-semibold uppercase tracking-widest text-accent/90 mb-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Platform features
          </motion.p>
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

        {/* Stat row inside header */}
        <motion.div
          className="grid grid-cols-3 gap-6 max-w-lg mx-auto pt-8 border-t border-white/10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {headerStats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-mono font-bold text-white text-xl lg:text-2xl">{s.value}</p>
              <p className="text-white/50 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* ─── Feature sections ─── */}
    {features.map((feature, i) => {
      const isLeft = feature.image === 'left';
      const bg = sectionBgs[i % sectionBgs.length];
      const isHero = feature.heroFeature;

      return (
        <section
          key={feature.title}
          className={`${bg} ${isHero ? 'py-24 lg:py-32' : 'section-py'}`}
          aria-label={feature.title}
        >
          <div className="max-w-marketing mx-auto px-6">
            <motion.div
              className={`grid items-center gap-12 lg:gap-16 ${
                isHero
                  ? isLeft
                    ? 'lg:grid-cols-[5fr_7fr]'
                    : 'lg:grid-cols-[7fr_5fr]'
                  : 'lg:grid-cols-2'
              }`}
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
                <div className={`${feature.accentColor} w-12 h-12 rounded-xl flex items-center justify-center mb-5`}>
                  <feature.icon size={24} className={feature.iconColor} aria-hidden="true" />
                </div>
                <h2 className={`font-display text-charcoal mb-4 ${isHero ? 'text-[clamp(28px,3.5vw,44px)]' : ''}`}>
                  {feature.title}
                </h2>
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

              {/* Visual/mockup side */}
              <motion.div
                className={isLeft ? 'lg:order-1' : ''}
                variants={{ hidden: { opacity: 0, x: isLeft ? -24 : 24 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } }}
              >
                <FeatureMockup index={i} feature={feature} />
              </motion.div>
            </motion.div>
          </div>
        </section>
      );
    })}

    {/* ─── Comparison: RentFlow vs WhatsApp/Spreadsheets ─── */}
    <section className="section-py bg-charcoal" aria-label="Comparison">
      <div className="max-w-marketing mx-auto px-6">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-accent/80 mb-3">Why switch</p>
          <h2 className="font-display text-white">RentFlow vs the old way.</h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Old way */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-7 h-7 rounded-full bg-error/20 flex items-center justify-center">
                <AlertCircle size={14} className="text-error" aria-hidden="true" />
              </span>
              <p className="font-semibold text-white/70">WhatsApp + Spreadsheets</p>
            </div>
            <ul className="space-y-3">
              {[
                'Chase tenants one by one every month',
                'No receipts — disputes happen constantly',
                'Zero visibility across properties',
                'Manual calculations, errors everywhere',
                'No paper trail for tax or legal matters',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-white/50">
                  <span className="w-4 h-4 rounded-full bg-error/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-error text-[10px] font-bold">✕</span>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* RentFlow */}
          <div className="bg-primary/20 border border-primary/30 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-7 h-7 rounded-full bg-success/20 flex items-center justify-center">
                <Wifi size={14} className="text-success" aria-hidden="true" />
              </span>
              <p className="font-semibold text-white">RentFlow</p>
            </div>
            <ul className="space-y-3">
              {[
                'Automated reminders — no chasing needed',
                'Instant PDF receipts on every payment',
                'All properties visible in one dashboard',
                'Automated calculations, zero errors',
                'Complete audit trail, export-ready',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-white/90">
                  <CheckCircle size={16} className="text-success flex-shrink-0 mt-0.5" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>

    {/* ─── CTA ─── */}
    <section className="bg-gradient-warm py-24" aria-label="Call to action">
      <div className="max-w-marketing mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-white mb-6" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            Ready to try it for yourself?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
            14 days free. No credit card. Cancel anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" variant="accent" rightIcon={<ArrowRight size={18} />} onClick={() => window.location.href = '/signup'}>
              Start your free trial
            </Button>
            <Button size="lg" className="border-white/30 text-white bg-white/10 hover:bg-white/20">
              <Link to="/pricing">See pricing</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  </>
);

// ─── Specific Mockup Components ────────────────────────────────────────────────

/** Shell wrapper for all mockups */
const MockupShell = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl border border-border shadow-lg overflow-hidden ${className}`}>
    {/* Browser chrome */}
    <div className="bg-warm/80 px-4 py-2.5 border-b border-border flex items-center gap-1.5">
      <div className="w-2 h-2 rounded-full bg-error/50" />
      <div className="w-2 h-2 rounded-full bg-warning/50" />
      <div className="w-2 h-2 rounded-full bg-success/50" />
      <div className="flex-1 bg-border/70 h-4 rounded-sm mx-2 max-w-[160px]" />
    </div>
    <div className="p-5 bg-[#FAF7F2]">
      {children}
    </div>
  </div>
);

/** 1. Property & Tenant Management mockup */
const PropertyMockup = () => (
  <MockupShell>
    <p className="text-[10px] text-muted font-semibold uppercase tracking-widest mb-3">My Properties</p>
    <div className="space-y-2">
      {[
        { name: 'Lekki Gardens Estate', units: '12 units', occupied: 11, total: 12, status: 'bg-success/10 text-success', label: 'High occupancy' },
        { name: 'Ikeja Court Block A', units: '8 units', occupied: 6, total: 8, status: 'bg-warning/10 text-warning', label: 'Partial' },
        { name: 'Ajah Terrace', units: '6 units', occupied: 6, total: 6, status: 'bg-success/10 text-success', label: 'Full' },
      ].map((p) => (
        <div key={p.name} className="bg-white rounded-lg border border-border p-3 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-charcoal">{p.name}</p>
            <p className="text-[10px] text-muted mt-0.5">{p.occupied}/{p.total} occupied · {p.units}</p>
          </div>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${p.status}`}>{p.label}</span>
        </div>
      ))}
    </div>
    {/* Occupancy bar */}
    <div className="mt-4 bg-white rounded-lg border border-border p-3">
      <div className="flex justify-between text-[10px] text-muted mb-1.5">
        <span>Total occupancy</span>
        <span className="font-semibold text-charcoal">23/26 units</span>
      </div>
      <div className="h-2 bg-border rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full" style={{ width: '88%' }} />
      </div>
    </div>
  </MockupShell>
);

/** 2. Online Rent Payment mockup */
const PaymentMockup = () => (
  <MockupShell>
    <div className="text-center pb-1">
      <div className="w-12 h-12 rounded-full bg-success/15 flex items-center justify-center mx-auto mb-3">
        <CheckCircle size={24} className="text-success" aria-hidden="true" />
      </div>
      <p className="text-xs text-muted mb-1">Payment confirmed</p>
      <p className="font-mono font-bold text-charcoal text-2xl mb-4">₦85,000</p>
      <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold bg-success/10 text-success px-2.5 py-1 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-success" aria-hidden="true" />
        Paid via Paystack
      </span>
    </div>
    <div className="mt-5 space-y-2">
      {[
        { label: 'Tenant', value: 'Ngozi Eze' },
        { label: 'Property', value: 'Ikeja Court — Unit 4B' },
        { label: 'Period', value: 'July 2025' },
        { label: 'Ref', value: 'RF-TXN-29847' },
      ].map((row) => (
        <div key={row.label} className="flex justify-between text-xs border-b border-border pb-2">
          <span className="text-muted">{row.label}</span>
          <span className="font-medium text-charcoal">{row.value}</span>
        </div>
      ))}
    </div>
  </MockupShell>
);

/** 3. Auto-Generated Receipts mockup */
const ReceiptMockup = () => (
  <MockupShell>
    {/* Receipt header */}
    <div className="bg-primary rounded-lg px-4 py-3 flex items-center justify-between mb-4">
      <div>
        <p className="text-white font-semibold text-sm">RentFlow Receipt</p>
        <p className="text-white/60 text-[10px]">Invoice #RF-2847</p>
      </div>
      <span className="text-[10px] bg-success/20 text-green-200 border border-success/30 px-2 py-0.5 rounded font-bold tracking-widest">
        PAID
      </span>
    </div>
    {/* Receipt body */}
    <div className="space-y-2 text-xs">
      {[
        { label: 'Tenant', value: 'Emeka Nwosu' },
        { label: 'Property', value: 'Lekki Gardens — Unit 7' },
        { label: 'Rent period', value: 'June 2025' },
        { label: 'Amount', value: '₦120,000' },
        { label: 'Date paid', value: '01 Jun 2025, 09:42 AM' },
        { label: 'Method', value: 'Bank Transfer' },
      ].map((row) => (
        <div key={row.label} className="flex justify-between border-b border-border pb-2">
          <span className="text-muted">{row.label}</span>
          <span className="font-medium text-charcoal">{row.value}</span>
        </div>
      ))}
    </div>
    <button className="mt-4 w-full text-[11px] font-semibold text-primary bg-primary/8 border border-primary/20 rounded py-1.5 hover:bg-primary/15 transition-colors">
      Download PDF receipt
    </button>
  </MockupShell>
);

/** 4. Late Payment Tracking mockup */
const LatePaymentMockup = () => (
  <MockupShell>
    <div className="flex items-center justify-between mb-3">
      <p className="text-[10px] text-muted font-semibold uppercase tracking-widest">Payment Status</p>
      <span className="text-[10px] bg-error/10 text-error font-semibold px-2 py-0.5 rounded-full">2 overdue</span>
    </div>
    <div className="space-y-2">
      {[
        { name: 'Emeka Nwosu', unit: 'Unit 7', status: 'Paid', daysLabel: 'Paid on time', statusClass: 'bg-success/10 text-success', chipClass: 'bg-success/10 text-success' },
        { name: 'Chinyere Obi', unit: 'Unit 3', status: 'Due', daysLabel: 'Due in 2 days', statusClass: 'bg-warning/10 text-warning', chipClass: 'bg-warning/10 text-warning' },
        { name: 'Tunde Bakare', unit: 'Unit 11', status: 'Overdue', daysLabel: '5 days overdue', statusClass: 'bg-error/10 text-error', chipClass: 'bg-error/10 text-error' },
        { name: 'Aisha Musa', unit: 'Unit 2', status: 'Overdue', daysLabel: '12 days overdue', statusClass: 'bg-error/10 text-error', chipClass: 'bg-error/10 text-error' },
      ].map((t) => (
        <div key={t.name} className="bg-white rounded-lg border border-border p-3 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-charcoal">{t.name}</p>
            <p className="text-[10px] text-muted mt-0.5">{t.unit}</p>
          </div>
          <div className="text-right">
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${t.statusClass}`}>{t.status}</span>
            <p className={`text-[10px] mt-1 ${t.status === 'Overdue' ? 'text-error font-medium' : 'text-muted'}`}>{t.daysLabel}</p>
          </div>
        </div>
      ))}
    </div>
  </MockupShell>
);

/** 5. Maintenance Requests kanban mockup */
const KanbanMockup = () => {
  const columns = [
    {
      label: 'Received',
      color: 'text-info',
      bg: 'bg-info/10',
      cards: [
        { title: 'Leaking pipe', unit: 'Unit 4B', priority: 'bg-error/10 text-error', pLabel: 'Urgent' },
      ],
    },
    {
      label: 'In Progress',
      color: 'text-warning',
      bg: 'bg-warning/10',
      cards: [
        { title: 'Broken door lock', unit: 'Unit 7', priority: 'bg-warning/10 text-warning', pLabel: 'Medium' },
        { title: 'AC not cooling', unit: 'Unit 2', priority: 'bg-warning/10 text-warning', pLabel: 'Medium' },
      ],
    },
    {
      label: 'Resolved',
      color: 'text-success',
      bg: 'bg-success/10',
      cards: [
        { title: 'Faulty light switch', unit: 'Unit 11', priority: 'bg-success/10 text-success', pLabel: 'Done' },
      ],
    },
  ];

  return (
    <MockupShell>
      <p className="text-[10px] text-muted font-semibold uppercase tracking-widest mb-3">Maintenance Board</p>
      <div className="grid grid-cols-3 gap-2">
        {columns.map((col) => (
          <div key={col.label}>
            <div className={`${col.bg} rounded-md px-2 py-1 mb-2 text-center`}>
              <p className={`text-[9px] font-bold uppercase tracking-wider ${col.color}`}>{col.label}</p>
            </div>
            <div className="space-y-1.5">
              {col.cards.map((card) => (
                <div key={card.title} className="bg-white rounded border border-border p-2">
                  <p className="text-[10px] font-semibold text-charcoal leading-snug">{card.title}</p>
                  <p className="text-[9px] text-muted mt-0.5">{card.unit}</p>
                  <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full mt-1 inline-block ${card.priority}`}>
                    {card.pLabel}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </MockupShell>
  );
};

/** 6. Financial Dashboard mockup with bar chart */
const ChartMockup = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const values = [62, 78, 55, 90, 84, 100];

  return (
    <MockupShell>
      {/* Top metrics */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: 'This month', value: '₦2.4M', color: 'text-primary', bg: 'bg-primary/8' },
          { label: 'Outstanding', value: '₦340K', color: 'text-error', bg: 'bg-error/8' },
          { label: 'Occupancy', value: '88%', color: 'text-success', bg: 'bg-success/8' },
        ].map((m) => (
          <div key={m.label} className={`${m.bg} rounded-lg p-2 text-center`}>
            <p className={`font-mono font-bold text-sm ${m.color}`}>{m.value}</p>
            <p className="text-[9px] text-muted mt-0.5">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="bg-white rounded-lg border border-border p-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] text-muted font-medium">Monthly Revenue</p>
          <div className="flex items-center gap-1 text-[10px] text-success font-semibold">
            <TrendingUp size={10} aria-hidden="true" />
            +19% MoM
          </div>
        </div>
        <div className="flex items-end gap-1.5 h-14">
          {values.map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-t transition-all duration-500"
                style={{
                  height: `${v}%`,
                  background: i === values.length - 1 ? '#0B4F45' : 'rgba(11,79,69,0.18)',
                }}
              />
              <span className="text-[8px] text-muted">{months[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </MockupShell>
  );
};

/** Route to correct mockup by index */
const FeatureMockup = ({ index }) => {
  const components = [PropertyMockup, PaymentMockup, ReceiptMockup, LatePaymentMockup, KanbanMockup, ChartMockup];
  const Component = components[index] || PropertyMockup;
  return <Component />;
};

export default Features;
