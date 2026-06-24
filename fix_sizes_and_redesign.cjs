const fs = require('fs');

let code = fs.readFileSync('src/pages/marketing/Home.jsx', 'utf8');

function replaceSectionByAria(code, ariaLabel, replacement) {
  const searchStr = `aria-label="${ariaLabel}"`;
  
  // Find aria-label
  let ariaIdx = code.indexOf(searchStr);
  if (ariaIdx === -1) {
      console.log(`Could not find aria-label="${ariaLabel}", trying fallback...`);
      return code;
  }
  
  // Find start of this section
  let startIdx = code.lastIndexOf('<section', ariaIdx);
  if (startIdx === -1) throw new Error(`Could not find <section before ${ariaLabel}`);
  
  // Find end of this section
  let endIdx = code.indexOf('</section>', startIdx);
  if (endIdx === -1) throw new Error(`Could not find </section> after ${ariaLabel}`);
  
  // Include </section> length
  endIdx += '</section>'.length;
  
  return code.substring(0, startIdx) + replacement.trim() + '\n\n' + code.substring(endIdx);
}

const manageAllReplacement = `
<section className="py-8 md:py-12 lg:py-12 bg-white" aria-label="Landlord Features">
        <div className="max-w-marketing mx-auto px-4 w-full">
          <div className="grid lg:grid-cols-2 gap-4 lg:gap-6 items-center">
            {/* Text Box */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <h2 className="font-display text-h2-sm md:text-h2 text-charcoal mb-2 md:mb-3 font-bold tracking-tight leading-tight">
                Manage all your properties in one place
              </h2>
              <p className="text-body text-body mb-4 md:mb-6 leading-relaxed max-w-lg">
                Centralize your operations. From tenant communication to tracking utility bills, RentFlow provides a single unified dashboard to monitor your real estate portfolio, minimizing manual data entry and human error.
              </p>
              <ul className="space-y-3">
                {['No hidden setup fees.', '100% data security. Guaranteed.', 'No training or maintenance needed.'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-body text-charcoal font-medium">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-warm text-primary">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            
            {/* Image Box */}
            <motion.div 
              className="relative order-1 lg:order-2 w-full aspect-[4/3] bg-warm rounded-2xl overflow-hidden shadow-md border border-border"
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800" 
                alt="Modern property" 
                className="absolute inset-0 object-cover w-full h-full opacity-90 transition-transform hover:scale-105 duration-[2s] ease-out"
              />
            </motion.div>
          </div>
        </div>
      </section>
`;

const bentoReplacement = `
<section className="py-8 md:py-12 lg:py-16 bg-white" aria-label="Features Bento">
        <div className="max-w-marketing mx-auto px-4 w-full">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            
            {/* Hero Bento Box (Dark) */}
            <motion.div 
              className="lg:col-span-2 bg-charcoal rounded-2xl p-6 md:p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-sm min-h-[260px]"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            >
              <div className="relative z-10 max-w-lg">
                <h2 className="font-display font-bold text-h3 md:text-h2-sm mb-4 leading-tight text-white">
                  Property software that handles it all.
                </h2>
                <Button variant="primary" className="bg-primary hover:bg-primary-dark text-white rounded-full px-6 py-3 text-body h-auto shadow-xl" rightIcon={<ArrowRight size={18} />}>
                  SEE ALL FEATURES
                </Button>
              </div>
              <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-tl from-primary/50 to-transparent rounded-tl-full blur-3xl" />
            </motion.div>

            {/* Top Right Box */}
            <motion.div 
              className="bg-white rounded-2xl p-6 md:p-8 text-charcoal border border-border flex flex-col justify-center shadow-sm hover:shadow-md transition-shadow min-h-[260px]"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            >
              <div className="w-12 h-12 bg-warm rounded-full flex items-center justify-center mb-4 shrink-0">
                <FileText className="text-primary w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-h4 mb-2">Easy Invoicing & Receipts</h3>
                <p className="text-body text-body leading-relaxed text-muted">Automate recurring invoices and save time. Get paid on time with instant PDF generation.</p>
              </div>
            </motion.div>

            {/* Bottom 3 Boxes */}
            {bentoFeatures.slice(1).map((feature, idx) => (
              <motion.div 
                key={idx}
                className="bg-white rounded-2xl p-6 md:p-8 border border-border flex flex-col justify-center shadow-sm hover:shadow-md transition-all group min-h-[260px]"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + (idx * 0.1) }}
              >
                <div className="w-12 h-12 bg-warm rounded-full flex items-center justify-center mb-4 shrink-0 group-hover:scale-110 group-hover:bg-primary/10 transition-all">
                  <feature.icon className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-h4 mb-2">{feature.title}</h3>
                  <p className="text-body text-body leading-relaxed text-muted">{feature.desc}</p>
                </div>
              </motion.div>
            ))}

          </div>
        </div>
      </section>
`;

const operationsReplacement = `
<section className="py-8 md:py-12 lg:py-16 bg-warm" aria-label="Engineered for Operations">
        <div className="max-w-marketing mx-auto px-4 w-full">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-8 md:mb-12"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <h2 className="font-display text-h2-sm md:text-h2 text-charcoal mb-3 font-bold">
              Engineered for Operations
            </h2>
            <p className="text-body text-body text-muted">
              A comprehensive suite to power your property operations and simplify management at scale.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
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
                className="bg-white rounded-2xl p-6 md:p-8 border border-border shadow-sm hover:shadow-md transition-all group cursor-default"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              >
                <div className="w-12 h-12 rounded-full bg-warm flex items-center justify-center mb-4 shrink-0 group-hover:bg-primary transition-colors">
                  <feature.icon className="text-primary group-hover:text-white transition-colors w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-h4 mb-2 text-charcoal">{feature.title}</h3>
                <p className="text-body text-small leading-relaxed text-muted">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
`;

const visualMaintenanceReplacement = `
<section className="py-8 md:py-12 lg:py-16 bg-white" aria-label="Maintenance">
        <div className="max-w-marketing mx-auto px-4 w-full">
          <div className="grid lg:grid-cols-2 gap-4 md:gap-6 items-stretch">
            {/* Left Box */}
            <motion.div 
              className="bg-warm rounded-2xl p-6 md:p-10 relative border border-border flex flex-col justify-center"
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <h2 className="font-display text-h2-sm md:text-h2 text-charcoal mb-3 font-bold tracking-tight leading-tight">
                Visual Maintenance Routing
              </h2>
              <p className="text-body text-body text-muted leading-relaxed mb-6 md:mb-10 max-w-sm">
                Drag-and-drop workflow builder. Set up rules and triggers to auto-assign maintenance issues.
              </p>

              {/* UI Mockup boxes */}
              <div className="flex flex-col gap-3 relative z-10 w-full lg:w-4/5 mx-auto lg:mx-0">
                <div className="bg-white rounded-xl p-4 md:p-5 shadow-sm border border-border w-full flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-accent shrink-0"></div>
                  <div>
                    <p className="font-bold text-body text-charcoal">Leaking pipe in Kitchen</p>
                    <p className="text-small text-muted">Unit 4B - Urgent priority</p>
                  </div>
                </div>
                <div className="w-[2px] h-6 bg-border ml-7"></div>
                <div className="bg-white rounded-xl p-4 md:p-5 shadow-sm border border-border w-full flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-primary-dark shrink-0"></div>
                  <div>
                    <p className="font-bold text-body text-charcoal">Assign to Plumber (Ade)</p>
                    <p className="text-small text-muted">Auto-routed rule #3</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Cards */}
            <div className="flex flex-col gap-4 md:gap-6">
              <motion.div 
                className="bg-primary-dark rounded-2xl p-6 md:p-8 text-white shadow-md relative overflow-hidden flex flex-col justify-center flex-1"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
                <h3 className="font-display font-bold text-h3 text-white mb-2 relative z-10">Auto-routing</h3>
                <p className="text-white/80 text-body leading-relaxed mb-4 md:mb-6 relative z-10 max-w-sm">
                  Set logic to assign vendors automatically based on issue category or unit.
                </p>
                <div className="flex items-center gap-2 text-primary-dark font-bold text-body bg-white w-max px-5 py-2.5 rounded-full shadow-sm cursor-pointer hover:scale-105 transition-transform relative z-10">
                  <Wrench size={18} /> Assign vendor
                </div>
              </motion.div>

              <motion.div 
                className="bg-accent rounded-2xl p-6 md:p-8 text-white shadow-md flex flex-col justify-center flex-1"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              >
                <h3 className="font-display font-bold text-h3 text-white mb-2">Zero Service Motion</h3>
                <p className="text-white/90 text-body leading-relaxed mb-4 md:mb-6 max-w-sm">
                  Tenants and vendors handle the workflow independently. You just review and approve.
                </p>
                <div className="flex items-center text-white text-body font-bold gap-2 cursor-pointer hover:opacity-80 group w-max">
                  Read API <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
`;

const faqReplacement = `
<section className="py-12 md:py-20 bg-warm border-t border-border" aria-label="FAQ">
        <div className="max-w-marketing mx-auto px-4 w-full">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            <motion.div className="lg:col-span-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-display text-h2-sm md:text-h2 text-charcoal mb-4 font-bold tracking-tight">
                Common Questions
              </h2>
              <p className="text-body text-body text-muted leading-relaxed">
                Everything you need to know about how RentFlow can streamline your workflow and secure your payments.
              </p>
            </motion.div>

            <div className="lg:col-span-8 flex flex-col">
              {faqs.map((faq, idx) => (
                <motion.div 
                  key={idx}
                  className="bg-white border border-border shadow-sm rounded-xl mb-3 overflow-hidden"
                  initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                >
                  <div className="flex justify-between items-center p-4 md:p-6 cursor-pointer group">
                    <h3 className="font-display font-bold text-charcoal text-body md:text-h4-sm group-hover:text-primary transition-colors">{faq.q}</h3>
                    <div className="w-8 h-8 rounded-full bg-warm flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                      <span className="text-primary font-bold text-xl leading-none">+</span>
                    </div>
                  </div>
                  {/* Simulate open state for the first item for demo purposes */}
                  {idx === 0 && (
                    <div className="px-4 md:px-6 pb-4 md:pb-6 pt-0 text-body text-muted leading-relaxed border-t border-border/50 mt-2">
                      <p className="pt-4">{faq.a}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
`;

const ctaReplacement = `
<section className="py-12 md:py-24 bg-white" aria-label="Call to Action">
        <div className="max-w-marketing mx-auto px-4 w-full">
          <motion.div 
            className="bg-primary-dark rounded-[32px] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          >
            {/* Glow effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/40 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#C75B30]/20 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="relative z-10">
              <h3 className="font-bold text-small text-accent mb-4 tracking-widest uppercase">
                Stop Tracking Rent in Notebooks
              </h3>
              <h2 className="font-display font-bold text-h2-sm md:text-display-sm text-white mb-6 leading-tight tracking-tight max-w-3xl mx-auto">
                Ready to transform your property management?
              </h2>
              <p className="text-white/80 text-body mb-8 leading-relaxed max-w-2xl mx-auto">
                Join thousands of modern landlords across Africa using RentFlow to save time, reduce stress, and get paid faster. Grow your portfolios with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="rounded-full px-8 py-4 bg-accent hover:bg-[#A94A24] text-white text-body font-bold h-auto border-none shadow-lg"
                >
                  Start for free
                </Button>
                <Button 
                  size="lg" 
                  variant="whiteOutline"
                  className="rounded-full px-8 py-4 border-white/20 text-white hover:bg-white/10 text-body font-bold h-auto bg-transparent border-2"
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
  code = replaceSectionByAria(code, 'Landlord Features', manageAllReplacement);
  code = replaceSectionByAria(code, 'Features Bento', bentoReplacement);
  code = replaceSectionByAria(code, 'Engineered for Operations', operationsReplacement);
  code = replaceSectionByAria(code, 'Maintenance', visualMaintenanceReplacement);
  code = replaceSectionByAria(code, 'FAQ', faqReplacement);
  code = replaceSectionByAria(code, 'Call to Action', ctaReplacement);

  fs.writeFileSync('src/pages/marketing/Home.jsx', code, 'utf8');
  console.log("Successfully fixed spacing, sizes, and redesigned sections!");
} catch (e) {
  console.error("Error:", e.message);
}
