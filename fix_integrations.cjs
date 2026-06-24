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

const integrationsReplacement = `
<section className="py-8 md:py-12 bg-warm" aria-label="Integrations">
        <div className="max-w-marketing mx-auto px-4 w-full">
          <motion.div className="text-center mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-h3 md:text-h2-sm text-charcoal mb-2 font-bold tracking-tight">
              Works with your existing stack
            </h2>
            <p className="text-body text-body text-muted max-w-xl mx-auto">
              Connect RentFlow to your favorite accounting and payment gateways.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { icon: CreditCard, title: 'Paystack', desc: 'Secure payment processing and instant transfers.' },
              { icon: FileSpreadsheet, title: 'QuickBooks', desc: 'Sync transactions directly to accounting.' },
              { icon: Calculator, title: 'Xero', desc: 'Seamlessly reconcile bank statements.' },
              { icon: Wallet, title: 'Monnify', desc: 'Dedicated virtual accounts for tenants.' },
              { icon: DollarSign, title: 'Stripe', desc: 'Global card payments and subscriptions.' },
              { icon: MessageSquare, title: 'Slack', desc: 'Real-time notifications for your team.' }
            ].map((integration, idx) => (
              <motion.div 
                key={idx}
                className="bg-white rounded-xl p-4 md:p-5 border border-border shadow-sm flex flex-col justify-center hover:shadow-md transition-all group"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-warm rounded-full flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                    <integration.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-h4-sm md:text-h4 text-charcoal">{integration.title}</h3>
                </div>
                <p className="text-small leading-relaxed text-muted">{integration.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
`;

try {
  code = replaceSectionByAria(code, 'Integrations', integrationsReplacement);
  fs.writeFileSync('src/pages/marketing/Home.jsx', code, 'utf8');
  console.log("Successfully refined Integrations section!");
} catch (e) {
  console.error("Error:", e.message);
}
