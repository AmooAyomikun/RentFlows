const fs = require('fs');

let code = fs.readFileSync('src/pages/marketing/Home.jsx', 'utf8');

function replaceSectionByAria(code, ariaLabel, replacement) {
  const searchStr = `aria-label="${ariaLabel}"`;
  
  let ariaIdx = code.indexOf(searchStr);
  if (ariaIdx === -1) {
      console.log(`Could not find aria-label="${ariaLabel}"`);
      return code;
  }
  
  let startIdx = code.lastIndexOf('<section', ariaIdx);
  if (startIdx === -1) throw new Error(`Could not find <section before ${ariaLabel}`);
  
  let endIdx = code.indexOf('</section>', startIdx);
  if (endIdx === -1) throw new Error(`Could not find </section> after ${ariaLabel}`);
  
  endIdx += '</section>'.length;
  
  return code.substring(0, startIdx) + replacement.trim() + '\n\n' + code.substring(endIdx);
}

const bentoReplacement = `
<section className="py-8 md:py-12 bg-white" aria-label="Features Bento">
        <div className="max-w-marketing mx-auto px-4 w-full">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            
            {/* Hero Bento Box (Dark) */}
            <motion.div 
              className="lg:col-span-2 bg-charcoal rounded-xl p-6 md:p-8 text-white relative overflow-hidden flex flex-col justify-center shadow-sm"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            >
              <div className="relative z-10 max-w-lg">
                <h2 className="font-display font-bold text-h3 md:text-h2-sm mb-4 leading-tight text-white">
                  Property software that handles it all.
                </h2>
                <Button variant="primary" className="bg-primary hover:bg-primary-dark text-white rounded-full px-6 py-2 text-body h-auto shadow-xl" rightIcon={<ArrowRight size={18} />}>
                  SEE ALL FEATURES
                </Button>
              </div>
              <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-tl from-primary/50 to-transparent rounded-tl-full blur-3xl pointer-events-none" />
            </motion.div>

            {/* Top Right Box */}
            <motion.div 
              className="bg-white rounded-xl p-5 border border-border flex flex-col justify-center shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-warm rounded-full flex items-center justify-center shrink-0">
                  <FileText className="text-primary w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-h4">Easy Invoicing</h3>
              </div>
              <p className="text-body text-small leading-relaxed text-muted">Automate recurring invoices and save time. Get paid on time with instant PDF generation.</p>
            </motion.div>

            {/* Bottom 3 Boxes */}
            {bentoFeatures.slice(1).map((feature, idx) => (
              <motion.div 
                key={idx}
                className="bg-white rounded-xl p-5 border border-border flex flex-col justify-center shadow-sm hover:shadow-md transition-all group"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + (idx * 0.1) }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-warm rounded-full flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-all">
                    <feature.icon className="text-primary w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-h4">{feature.title}</h3>
                </div>
                <p className="text-body text-small leading-relaxed text-muted">{feature.desc}</p>
              </motion.div>
            ))}

          </div>
        </div>
      </section>
`;

const operationsReplacement = `
<section className="py-8 md:py-12 bg-warm" aria-label="Engineered for Operations">
        <div className="max-w-marketing mx-auto px-4 w-full">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <h2 className="font-display text-h2-sm md:text-h2 text-charcoal mb-2 font-bold">
              Engineered for Operations
            </h2>
            <p className="text-body text-body text-muted">
              A comprehensive suite to power your property operations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {[
              { icon: Building2, title: 'Property Management', desc: 'Centralize your entire portfolio. Track units, leases, tenant information, and documents securely in one unified, cloud-based database.' },
              { icon: UserPlus, title: 'Tenant Management', desc: 'Automate onboarding, digital lease signing, and communication. Keep all messages, issues, and tenant histories in one location.' },
              { icon: CreditCard, title: 'Online Rent Payments', desc: 'Empower tenants to pay via bank transfer or integrated gateways. Automatically reconcile payments to units in real-time.' },
              { icon: FileText, title: 'Automated Receipts', desc: 'Instantly generate and email professional receipts upon payment confirmation. Eliminate manual data entry and save hours.' },
              { icon: Wrench, title: 'Maintenance Requests', desc: 'A dedicated portal for tenants to submit issues with photos. Assign vendors, track progress, and approve invoices seamlessly.' },
              { icon: BarChart3, title: 'Financial Reporting', desc: 'Get real-time insights into cash flow, rent rolls, P&L, and more with our automated accounting explicitly built for real estate.' }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                className="bg-white rounded-xl p-5 border border-border shadow-sm hover:shadow-md transition-all group cursor-default"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-warm flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                    <feature.icon className="text-primary group-hover:text-white transition-colors w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-h4 text-charcoal leading-tight">{feature.title}</h3>
                </div>
                <p className="text-body text-small leading-relaxed text-muted">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
`;

const faqReplacement = `
<section className="py-8 md:py-12 bg-warm border-t border-border" aria-label="FAQ">
        <div className="max-w-marketing mx-auto px-4 w-full">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="font-display text-h3 md:text-h2-sm text-charcoal mb-2 font-bold tracking-tight">
              Common Questions
            </h2>
            <p className="text-body text-small md:text-body text-muted leading-relaxed">
              Everything you need to know about how RentFlow can streamline your workflow and secure your payments.
            </p>
          </div>

          <div className="max-w-3xl mx-auto flex flex-col gap-2">
            {faqs.map((faq, idx) => (
              <motion.div 
                key={idx}
                className="bg-white border border-border shadow-sm rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              >
                <div className="flex justify-between items-center p-3 md:p-4 cursor-pointer group hover:bg-warm/50 transition-colors">
                  <h3 className="font-display font-bold text-charcoal text-body group-hover:text-primary transition-colors pr-4">{faq.q}</h3>
                  <div className="w-6 h-6 rounded-full bg-warm flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                    <span className="text-primary font-bold text-lg leading-none mt-[-2px]">+</span>
                  </div>
                </div>
                {/* Simulate open state for the first item for demo purposes */}
                {idx === 0 && (
                  <div className="px-3 md:px-4 pb-3 md:pb-4 pt-0 text-body text-small text-muted leading-relaxed">
                    <p>{faq.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
`;

const ctaReplacement = `
<section className="py-8 md:py-12 bg-white" aria-label="Call to Action">
        <div className="max-w-4xl mx-auto px-4 w-full">
          <motion.div 
            className="bg-primary-dark rounded-2xl p-6 md:p-10 text-center text-white relative overflow-hidden shadow-xl"
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          >
            {/* Glow effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/30 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="relative z-10">
              <h3 className="font-bold text-micro text-accent mb-2 tracking-widest uppercase">
                Stop Tracking Rent in Notebooks
              </h3>
              <h2 className="font-display font-bold text-h3 md:text-h2-sm text-white mb-4 leading-tight tracking-tight">
                Ready to transform your property management?
              </h2>
              <p className="text-white/80 text-small md:text-body mb-6 leading-relaxed max-w-xl mx-auto">
                Join thousands of modern landlords across Africa using RentFlow to save time, reduce stress, and get paid faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  size="lg" 
                  className="rounded-full px-6 py-3 bg-accent hover:bg-[#A94A24] text-white text-body font-bold h-auto border-none shadow-md"
                >
                  Start for free
                </Button>
                <Button 
                  size="lg" 
                  variant="whiteOutline"
                  className="rounded-full px-6 py-3 border-white/20 text-white hover:bg-white/10 text-body font-bold h-auto bg-transparent border-2"
                >
                  Talk to Sales
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
`;

try {
  code = replaceSectionByAria(code, 'Features Bento', bentoReplacement);
  code = replaceSectionByAria(code, 'Engineered for Operations', operationsReplacement);
  code = replaceSectionByAria(code, 'FAQ', faqReplacement);
  code = replaceSectionByAria(code, 'Call to Action', ctaReplacement);

  fs.writeFileSync('src/pages/marketing/Home.jsx', code, 'utf8');
  console.log("Successfully refined component sizing and layout!");
} catch (e) {
  console.error("Error:", e.message);
}
