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
      <section className="bg-gradient-to-b from-[#051310] via-[#092B23] to-[#071E18] py-20 md:py-32 relative overflow-hidden text-center" aria-label="FAQ header">
        <div className="absolute top-[-20%] left-[20%] w-[450px] h-[450px] bg-[#0B4F45]/35 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[10%] w-[350px] h-[350px] bg-[#C75B30]/25 rounded-full blur-[110px] pointer-events-none" />

        <div className="max-w-marketing mx-auto px-6 relative z-10">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#E79868] text-xs font-bold tracking-widest uppercase mb-5 shadow-lg backdrop-blur-md"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          >
            Instant Answers · Knowledge Base
          </motion.div>
          <motion.h1
            className="font-display text-white font-black tracking-tight leading-[1.08] mb-4"
            style={{ fontSize: 'clamp(38px, 5.5vw, 62px)' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          >
            Everything You Need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E79868] via-white to-[#C75B30]">Know.</span>
          </motion.h1>
          <motion.p
            className="text-white/75 text-base md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.1 } }}
          >
            Clear, transparent details about our pricing, Nigerian banking settlements, security, and tenant receipts.
          </motion.p>

          <motion.div
            className="max-w-xl mx-auto relative shadow-2xl"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          >
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0B4F45]" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search questions (e.g. settlement, receipts, Paystack)..."
              aria-label="Search FAQ"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-12 pr-5 text-base bg-white rounded-2xl border-2 border-white/30 text-charcoal placeholder:text-muted focus:outline-none focus:ring-4 focus:ring-[#E79868]/40 shadow-xl transition-all"
            />
          </motion.div>

          {/* Popular search tags */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-2 mt-5 text-xs text-white/60"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
          >
            <span className="font-semibold text-white/80">Popular:</span>
            {['Settlement speed', 'Free trial', 'NDPR Security', 'WhatsApp notices'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag.split(' ')[0])}
                className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 transition-colors cursor-pointer text-white/80"
              >
                {tag}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-warm" aria-label="FAQ content">
        <div className="max-w-marketing mx-auto px-6 max-w-4xl">
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
