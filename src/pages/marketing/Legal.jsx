import { motion } from 'framer-motion';

const Section = ({ title, children }) => (
  <section className="mb-8">
    <h2 className="font-display text-charcoal text-xl mb-4">{title}</h2>
    <div className="text-body text-sm leading-relaxed space-y-3">{children}</div>
  </section>
);

const PrivacyPolicy = () => (
  <>
    <section className="bg-charcoal py-16" aria-label="Privacy policy header">
      <div className="max-w-marketing mx-auto px-6">
        <motion.h1 className="font-display text-white text-4xl" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>Privacy Policy</motion.h1>
        <p className="text-white/60 mt-2 text-sm">Last updated: 1 January 2026</p>
      </div>
    </section>

    <main className="max-w-marketing mx-auto px-6 py-16 max-w-3xl mx-auto">
      <Section title="1. Introduction">
        <p>RentFlow ("we", "us", "our") is committed to protecting your personal data and respecting your privacy. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use our platform.</p>
        <p>This policy is compliant with the Nigerian Data Protection Regulation (NDPR) 2019.</p>
      </Section>

      <Section title="2. Data We Collect">
        <p><strong>Account data:</strong> Name, email address, phone number, business name (landlords).</p>
        <p><strong>Property data:</strong> Property addresses, unit details, rental amounts and lease dates.</p>
        <p><strong>Payment data:</strong> Transaction amounts, dates, and reference numbers. We do not store card details — these are handled by Paystack.</p>
        <p><strong>Usage data:</strong> Log data, browser type, IP address, pages visited and time spent.</p>
      </Section>

      <Section title="3. How We Use Your Data">
        <p>We use your data to: operate and improve the platform, process rent payments, generate receipts, send payment reminders, and provide customer support.</p>
        <p>We do not sell your data to third parties. Ever.</p>
      </Section>

      <Section title="4. Data Sharing">
        <p>We share your data only with: Paystack (payment processing), our hosting provider (infrastructure), and government authorities if legally required.</p>
      </Section>

      <Section title="5. Data Retention">
        <p>We retain payment records for 7 years as required by Nigerian financial regulation. Account data is retained for 2 years after account closure.</p>
      </Section>

      <Section title="6. Your Rights">
        <p>Under the NDPR, you have the right to access your data, correct inaccuracies, request deletion, and withdraw consent. Contact us at <a href="mailto:privacy@rentflow.ng" className="text-primary hover:underline">privacy@rentflow.ng</a> to exercise these rights.</p>
      </Section>

      <Section title="7. Contact">
        <p>Data Controller: RentFlow, Lagos, Nigeria. Email: <a href="mailto:privacy@rentflow.ng" className="text-primary hover:underline">privacy@rentflow.ng</a></p>
      </Section>
    </main>
  </>
);

const TermsOfService = () => (
  <>
    <section className="bg-charcoal py-16" aria-label="Terms header">
      <div className="max-w-marketing mx-auto px-6">
        <motion.h1 className="font-display text-white text-4xl" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>Terms of Service</motion.h1>
        <p className="text-white/60 mt-2 text-sm">Last updated: 1 January 2026</p>
      </div>
    </section>

    <main className="max-w-marketing mx-auto px-6 py-16 max-w-3xl mx-auto">
      <Section title="1. Acceptance">
        <p>By using RentFlow, you agree to these Terms of Service. If you do not agree, please do not use the platform.</p>
      </Section>

      <Section title="2. Service Description">
        <p>RentFlow provides a software platform for rental property management, including rent collection, receipt generation, maintenance tracking and financial reporting.</p>
      </Section>

      <Section title="3. User Responsibilities">
        <p><strong>Landlords:</strong> You are responsible for ensuring that all property information and tenant details you enter are accurate and lawful.</p>
        <p><strong>Tenants:</strong> You are responsible for ensuring payments are made on time and that your contact information is accurate.</p>
      </Section>

      <Section title="4. Fees and Payment">
        <p>Subscription fees are billed monthly or annually as selected. A 0.5% transaction fee applies to each rent payment collected. Fees are non-refundable unless required by applicable law.</p>
      </Section>

      <Section title="5. Limitation of Liability">
        <p>RentFlow is not liable for: late or failed payments due to tenant or bank errors, losses resulting from incorrect data entered by users, or service interruptions beyond our reasonable control.</p>
      </Section>

      <Section title="6. Termination">
        <p>We may terminate or suspend your account if you violate these terms. You may close your account at any time from settings.</p>
      </Section>

      <Section title="7. Governing Law">
        <p>These terms are governed by the laws of the Federal Republic of Nigeria. Disputes shall be resolved in the courts of Lagos State.</p>
      </Section>

      <Section title="8. Contact">
        <p>For legal enquiries: <a href="mailto:legal@rentflow.ng" className="text-primary hover:underline">legal@rentflow.ng</a></p>
      </Section>
    </main>
  </>
);

export { TermsOfService };
export default PrivacyPolicy;
