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

const maintenanceReplacement = `
<section className="py-8 md:py-12 bg-white" aria-label="Maintenance">
        <div className="max-w-marketing mx-auto px-4 w-full">
          <div className="grid lg:grid-cols-2 gap-4 md:gap-5 items-stretch">
            {/* Left Box */}
            <motion.div 
              className="bg-warm rounded-2xl p-6 md:p-8 relative border border-border flex flex-col justify-center"
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <h2 className="font-display text-h3 md:text-h2-sm text-charcoal mb-2 font-bold tracking-tight leading-tight">
                Visual Maintenance Routing
              </h2>
              <p className="text-body text-body text-muted leading-relaxed mb-6 max-w-sm">
                Drag-and-drop workflow builder. Set up rules and triggers to auto-assign maintenance issues.
              </p>

              {/* UI Mockup boxes */}
              <div className="flex flex-col gap-2 relative z-10 w-full lg:w-4/5 mx-auto lg:mx-0">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-border w-full flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-accent shrink-0"></div>
                  <div>
                    <p className="font-bold text-body text-charcoal">Leaking pipe in Kitchen</p>
                    <p className="text-small text-muted">Unit 4B - Urgent priority</p>
                  </div>
                </div>
                <div className="w-[2px] h-4 bg-border ml-7"></div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-border w-full flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-primary-dark shrink-0"></div>
                  <div>
                    <p className="font-bold text-body text-charcoal">Assign to Plumber (Ade)</p>
                    <p className="text-small text-muted">Auto-routed rule #3</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Cards */}
            <div className="flex flex-col gap-4 md:gap-5">
              <motion.div 
                className="bg-primary-dark rounded-2xl p-6 text-white shadow-md relative overflow-hidden flex flex-col justify-center flex-1"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
                <h3 className="font-display font-bold text-h3-sm text-white mb-2 relative z-10">Auto-routing</h3>
                <p className="text-white/80 text-small leading-relaxed mb-4 relative z-10 max-w-sm">
                  Set logic to assign vendors automatically based on issue category or unit.
                </p>
                <div className="flex items-center gap-2 text-primary-dark font-bold text-small bg-white w-max px-4 py-2 rounded-full shadow-sm cursor-pointer hover:scale-105 transition-transform relative z-10">
                  <Wrench size={16} /> Assign vendor
                </div>
              </motion.div>

              <motion.div 
                className="bg-accent rounded-2xl p-6 text-white shadow-md flex flex-col justify-center flex-1"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              >
                <h3 className="font-display font-bold text-h3-sm text-white mb-2">Zero Service Motion</h3>
                <p className="text-white/90 text-small leading-relaxed mb-4 max-w-sm">
                  Tenants and vendors handle the workflow independently. You just review and approve.
                </p>
                <div className="flex items-center text-white text-small font-bold gap-2 cursor-pointer hover:opacity-80 group w-max">
                  Read API <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
`;

const securityReplacement = `
<section className="py-8 md:py-12 bg-warm border-t border-border" aria-label="Security">
        <div className="max-w-marketing mx-auto px-4 w-full">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            {/* Left Col */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-display text-h3 md:text-h2-sm text-charcoal mb-2 font-bold tracking-tight leading-tight">
                Your data, fortified
              </h2>
              <p className="text-body text-body text-muted leading-relaxed mb-6 max-w-lg">
                Security isn't a feature; it's our foundation. We employ the same protocols as major financial institutions to ensure your assets and data remain strictly protected.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <Shield className="text-primary w-5 h-5 mb-2" />
                  <h3 className="font-bold text-charcoal text-h4-sm mb-1">Bank-Grade Encryption</h3>
                  <p className="text-body text-small text-muted leading-relaxed">256-bit AES protection for all data.</p>
                </div>
                <div>
                  <CheckCircle2 className="text-primary w-5 h-5 mb-2" />
                  <h3 className="font-bold text-charcoal text-h4-sm mb-1">SOC2 Compliance</h3>
                  <p className="text-body text-small text-muted leading-relaxed">Independently audited security controls.</p>
                </div>
              </div>
            </motion.div>

            {/* Right Col */}
            <motion.div 
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <div className="bg-[#EAE8E3] rounded-2xl p-4 md:p-6 w-full max-w-[320px] flex items-center justify-center border border-border/50 shadow-inner">
                <div className="bg-white rounded-xl p-6 shadow-sm w-full text-center flex flex-col items-center">
                  <div className="w-12 h-12 bg-primary-dark rounded-full flex items-center justify-center mb-3 shadow-md">
                    <Shield className="text-white w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-h3-sm text-charcoal mb-1">99.9% Uptime</h3>
                  <p className="text-small text-muted">Global redundant infrastructure</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
`;

try {
  code = replaceSectionByAria(code, 'Maintenance', maintenanceReplacement);
  code = replaceSectionByAria(code, 'Security', securityReplacement);
  fs.writeFileSync('src/pages/marketing/Home.jsx', code, 'utf8');
  console.log("Successfully refined Visual Maintenance and Security sections!");
} catch (e) {
  console.error("Error:", e.message);
}
