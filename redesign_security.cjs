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

const securityReplacement = `
<section className="py-8 md:py-16 bg-white" aria-label="Security">
        <div className="max-w-marketing mx-auto px-4 w-full">
          <motion.div 
            className="bg-charcoal rounded-3xl p-8 md:p-12 relative overflow-hidden text-white shadow-2xl"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            {/* Glow effects */}
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-accent/20 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 relative z-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-micro font-bold tracking-wider uppercase text-white/90">Enterprise Security</span>
                </div>
                <h2 className="font-display text-h3 md:text-h2-sm text-white mb-4 font-bold tracking-tight leading-tight">
                  Your data is fortified.
                </h2>
                <p className="text-white/70 text-body leading-relaxed mb-8 max-w-lg">
                  Security isn't just a feature—it's our foundation. We employ the same protocols as major financial institutions to ensure your assets and data remain strictly protected and confidential.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                  <div className="bg-white/5 rounded-xl p-5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                    <Shield className="text-primary w-6 h-6 mb-3" />
                    <h3 className="font-bold text-white text-h4-sm mb-2">Bank-Grade Encryption</h3>
                    <p className="text-white/60 text-small leading-relaxed">256-bit AES protection for all data in transit and at rest.</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                    <CheckCircle2 className="text-accent w-6 h-6 mb-3" />
                    <h3 className="font-bold text-white text-h4-sm mb-2">SOC2 Compliance</h3>
                    <p className="text-white/60 text-small leading-relaxed">Independently audited security controls and processes.</p>
                  </div>
                </div>
              </div>

              {/* Right side graphic */}
              <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
                <div className="relative w-full max-w-sm">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-accent/40 rounded-full blur-3xl opacity-50"></div>
                  <div className="bg-charcoal/80 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl relative z-10 text-center flex flex-col items-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                      <CheckCircle2 className="text-white w-8 h-8" />
                    </div>
                    <h3 className="font-display font-bold text-h2 text-white mb-1">99.99%</h3>
                    <p className="text-white/90 font-bold text-body mb-3 uppercase tracking-wide">Uptime SLA</p>
                    <p className="text-white/60 text-small leading-relaxed">Global redundant infrastructure with automated failover capabilities.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
`;

try {
  code = replaceSectionByAria(code, 'Security', securityReplacement);
  fs.writeFileSync('src/pages/marketing/Home.jsx', code, 'utf8');
  console.log("Successfully redesigned Security section!");
} catch (e) {
  console.error("Error:", e.message);
}
