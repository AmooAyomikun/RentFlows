import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Accordion from '../../components/ui/Accordion';

const categories = ['General', 'Payments', 'Security', 'Landlords', 'Tenants'];

const allFAQs = {
  General: [
    { id: 'g1', question: 'What is RentFlow?', answer: 'RentFlow is a rental management platform that helps landlords collect rent online, manage properties and tenants, and gives tenants official receipts and a way to log maintenance requests.' },
    { id: 'g2', question: 'Is RentFlow available outside Nigeria?', answer: 'Currently we focus on Nigeria, but we have plans to expand to Ghana, Kenya and other African markets in 2026.' },
    { id: 'g3', question: 'Is there a mobile app?', answer: 'RentFlow is a fully responsive web app that works excellently on mobile browsers. Dedicated iOS and Android apps are on the roadmap.' },
  ],
  Payments: [
    { id: 'p1', question: 'What payment methods are supported?', answer: 'Card (Visa/Mastercard), bank transfer and Paystack. More methods will be added based on user demand.' },
    { id: 'p2', question: 'How quickly does rent reach the landlord?', answer: 'Funds are typically settled within 1–2 business days after the tenant completes payment. Settlement times depend on your bank.' },
    { id: 'p3', question: 'Can I collect multiple months of rent at once?', answer: 'Yes — tenants can pay any amount through the platform. Multi-month payments are supported.' },
    { id: 'p4', question: 'What happens if a payment fails?', answer: 'The tenant is notified immediately and prompted to try again. Failed payments are never counted as received.' },
  ],
  Security: [
    { id: 's1', question: 'Is my data safe?', answer: 'Yes. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We follow Nigerian Data Protection Regulation (NDPR) requirements.' },
    { id: 's2', question: 'Can RentFlow staff see my payment details?', answer: 'No. Payment card details are handled exclusively by Paystack and are never stored on our servers.' },
    { id: 's3', question: 'Is two-factor authentication available?', answer: '2FA is available in account settings for landlords. We recommend enabling it for all accounts managing large portfolios.' },
  ],
  Landlords: [
    { id: 'l1', question: 'How much does RentFlow cost?', answer: 'From ₦3,000 per property per month. See our Pricing page for full details. A 14-day free trial is included.' },
    { id: 'l2', question: 'Can I manage properties in different cities?', answer: 'Yes — there\'s no geographic restriction. You can manage properties anywhere in Nigeria from a single account.' },
    { id: 'l3', question: 'How do I invite a tenant?', answer: 'From the unit detail page, click "Invite Tenant" and enter the tenant\'s email. They receive a personalized invitation link.' },
    { id: 'l4', question: 'Can I export payment records?', answer: 'Yes — CSV export is available on the Growth plan and above. Useful for tax filing and accountants.' },
  ],
  Tenants: [
    { id: 't1', question: 'Do I pay any fees as a tenant?', answer: 'No. RentFlow is completely free for tenants. You pay your rent amount and nothing more.' },
    { id: 't2', question: 'How do I get a receipt?', answer: 'Every payment automatically generates a PDF receipt. You can download it from your payment history at any time.' },
    { id: 't3', question: 'What if my landlord isn\'t on RentFlow yet?', answer: 'Ask them to sign up — it takes under 5 minutes and they get a 14-day free trial. Once they list your unit, they\'ll send your invite.' },
    { id: 't4', question: 'Can I track my maintenance requests?', answer: 'Yes — every request shows its current status (Received / In Progress / Resolved) and a timeline of updates.' },
  ],
};

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('General');
  const [searchQuery, setSearchQuery] = useState('');

  const items = allFAQs[activeCategory] || [];
  const filtered = searchQuery
    ? Object.values(allFAQs).flat().filter(
        (f) =>
          f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : items;

  return (
    <>
      <section className="bg-charcoal py-20" aria-label="FAQ header">
        <div className="max-w-marketing mx-auto px-6 text-center">
          <motion.h1 className="font-display text-white mb-6" style={{ fontSize: 'clamp(36px, 5vw, 60px)' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Frequently asked questions.
          </motion.h1>
          <motion.div className="max-w-md mx-auto relative" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}>
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search questions…"
              aria-label="Search FAQ"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-9 pr-4 text-sm bg-white rounded border border-white/20 text-charcoal placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </motion.div>
        </div>
      </section>

      <section className="section-py bg-warm" aria-label="FAQ content">
        <div className="max-w-marketing mx-auto px-6 max-w-3xl mx-auto">
          {/* Category tabs */}
          {!searchQuery && (
            <div className="flex flex-wrap gap-2 mb-8 justify-center" role="tablist">
              {categories.map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                  className={[
                    'px-4 py-2 text-sm font-medium rounded-full border transition-all',
                    activeCategory === cat ? 'bg-primary border-primary text-white' : 'border-border text-muted bg-white hover:border-primary/40',
                  ].join(' ')}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div key={activeCategory + searchQuery} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              {filtered.length > 0 ? (
                <Accordion items={filtered} allowMultiple />
              ) : (
                <p className="text-center text-muted py-12">No questions matching "{searchQuery}". <Link to="/contact" className="text-primary hover:underline">Contact us instead.</Link></p>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 text-center border-t border-border pt-8">
            <p className="text-muted text-sm mb-3">Still have questions?</p>
            <Link to="/contact" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
              Contact our team <ChevronRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
