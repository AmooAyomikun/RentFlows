const fs = require('fs');

let code = fs.readFileSync('src/pages/marketing/Home.jsx', 'utf8');

function replaceSectionByAria(code, ariaLabel, replacement) {
  const sectionStart = `<section className="py-8 md:py-12 lg:py-12`;
  const searchStr = `aria-label="${ariaLabel}"`;
  
  // Find aria-label
  let ariaIdx = code.indexOf(searchStr);
  if (ariaIdx === -1) {
      console.log(`Could not find aria-label="${ariaLabel}", trying fallback...`);
      // Fallback: Just let it be, or try to find by text.
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
  
  return code.substring(0, startIdx) + replacement + code.substring(endIdx);
}

// 1. Manage all your properties (Image fix)
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
              <p className="text-body text-body mb-3 md:mb-4 leading-relaxed max-w-lg">
                Centralize your operations. From tenant communication to tracking utility bills, RentFlow provides a single unified dashboard to monitor your real estate portfolio, minimizing manual data entry and human error.
              </p>
              <ul className="space-y-4 lg:space-y-6">
                {['No hidden setup fees.', '100% data security. Guaranteed.', 'No training or maintenance needed.'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 lg:p-3 text-body text-charcoal font-medium">
                    <div className="w-6 h-6 rounded-xl flex items-center justify-center shrink-0 bg-warm">
                      <CheckCircle className="text-primary w-3 h-3" />
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

// 2. Your data, fortified
const fortifiedReplacement = `
<section className="py-8 md:py-12 lg:py-12 bg-warm border-t border-border" aria-label="Security">
        <div className="max-w-marketing mx-auto px-4 w-full">
          <div className="grid lg:grid-cols-2 gap-4 lg:gap-8 items-center">
            {/* Left Col */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-display text-h2-sm md:text-h2 text-charcoal mb-2 md:mb-3 font-bold tracking-tight leading-tight">
                Your data, fortified
              </h2>
              <p className="text-body text-body leading-relaxed mb-4 md:mb-6 max-w-lg">
                Security isn't a feature; it's our foundation. We employ the same protocols as major financial institutions to ensure your assets and data remain strictly confidential and protected.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <Shield className="text-primary w-4 h-4 mb-2" />
                  <h3 className="font-bold text-charcoal text-h4-sm md:text-h4 mb-1">Bank-Grade Encryption</h3>
                  <p className="text-body text-small text-muted leading-relaxed">256-bit AES protection for all data in transit and at rest.</p>
                </div>
                <div>
                  <CheckCircle2 className="text-primary w-4 h-4 mb-2" />
                  <h3 className="font-bold text-charcoal text-h4-sm md:text-h4 mb-1">SOC2 Compliance</h3>
                  <p className="text-body text-small text-muted leading-relaxed">Independently audited security controls and processes.</p>
                </div>
              </div>
            </motion.div>

            {/* Right Col */}
            <motion.div 
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <div className="bg-[#EAE8E3] rounded-[24px] p-6 w-full max-w-md flex items-center justify-center">
                <div className="bg-white rounded-xl p-8 border border-border shadow-sm w-full max-w-[280px] text-center flex flex-col items-center">
                  <div className="w-12 h-12 bg-primary-dark rounded-full flex items-center justify-center mb-4 shadow-md">
                    <Shield className="text-white w-4 h-4" />
                  </div>
                  <h3 className="font-display font-bold text-h3-sm md:text-h3 text-charcoal mb-1">99.9% Uptime</h3>
                  <p className="text-body text-small text-muted">Global redundant infrastructure</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
`;

// 3. 4 Steps to Effortless Management
const stepsReplacement = `
<section className="py-8 md:py-12 lg:py-12 bg-warm border-t border-border" aria-label="4 Steps">
        <div className="max-w-marketing mx-auto px-4 w-full">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-4 md:mb-6"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <h2 className="font-display text-h2-sm md:text-h2 text-charcoal mb-2 font-bold leading-tight">
              4 Steps to Effortless Management
            </h2>
            <p className="text-body text-body">
              Get up and running in minutes, not months. Our streamlined onboarding ensures a smooth transition.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {[
              { icon: UserPlus, num: '01', title: 'Connect', desc: 'Sync your bank and import portfolios.', active: false },
              { icon: Building2, num: '02', title: 'Automate', desc: 'Set up billing cycles and rent rules.', active: true },
              { icon: BarChart3, num: '03', title: 'Monitor', desc: 'Track payments and maintenance in real-time.', active: false },
              { icon: Send, num: '04', title: 'Scale', desc: 'Use deep analytics to grow your portfolio.', active: false }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                className={\`rounded-xl p-4 lg:p-6 flex flex-col justify-between min-h-[220px] transition-all duration-300 relative overflow-hidden shadow-sm border \${step.active ? 'bg-primary-dark text-white border-primary-dark shadow-md' : 'bg-white text-charcoal border-border'}\`}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * idx }}
              >
                {/* Big Number */}
                <div className={\`absolute top-3 right-4 font-display font-bold text-display-sm leading-none \${step.active ? 'text-white/10' : 'text-muted/15'}\`}>
                  {step.num}
                </div>
                
                <div className="relative z-10">
                  <div className={\`w-6 h-6 rounded-xl flex items-center justify-center shrink-0 mb-4 \${step.active ? 'bg-white/10' : 'bg-warm'}\`}>
                    <step.icon className={\`w-3 h-3 \${step.active ? 'text-white' : 'text-primary'}\`} />
                  </div>
                  <h4 className="font-display font-bold text-h4 mb-1.5">{step.title}</h4>
                  <p className={\`text-small leading-relaxed \${step.active ? 'text-white/80' : 'text-body'}\`}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
`;

// 4. Latest Insights
const insightsReplacement = `
<section className="py-8 md:py-12 lg:py-12 bg-white" aria-label="Insights">
        <div className="max-w-marketing mx-auto px-4 w-full">
          <div className="flex flex-col md:flex-row justify-between items-end mb-4 md:mb-6">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-display text-h2-sm md:text-h2 text-charcoal mb-1 font-bold tracking-tight leading-tight">
                Latest Insights
              </h2>
              <p className="text-body text-body max-w-lg">
                Stay ahead of the market with our latest property management guides and industry trends.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="mt-2 md:mt-0">
              <Link to="/blog" className="text-primary font-bold text-small hover:underline flex items-center gap-1.5">
                View all resources <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
            {[
              { category: 'STRATEGY', title: 'Maximizing NOI in a High-Interest Environment', desc: '5 tactical shifts asset managers are making to protect yields this year.', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600' },
              { category: 'AUTOMATION', title: 'The Future of Zero-Touch Rent Collection', desc: 'How AI and real-time bank feeds are eliminating manual reconciliation.', img: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&q=80&w=600' },
              { category: 'GUIDE', title: 'Tenant Onboarding Checklist for 2024', desc: 'A comprehensive guide to digital screening and lease execution.', img: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=600' }
            ].map((post, idx) => (
              <motion.div 
                key={idx}
                className="group cursor-pointer flex flex-col"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              >
                <div className="w-full aspect-[16/9] rounded-xl mb-3 overflow-hidden bg-warm shadow-sm border border-border group-hover:shadow-md transition-all duration-300">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="mb-1">
                  <span className="text-micro font-bold text-primary tracking-wider uppercase px-1 py-0.5 bg-primary/5 rounded">{post.category}</span>
                </div>
                <h3 className="font-display font-bold text-charcoal text-h4-sm mb-1 leading-tight group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-small text-muted line-clamp-2">
                  {post.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
`;

// 5. RentFlow vs The Old Way
const comparisonReplacement = `
<section className="py-8 md:py-12 lg:py-12 bg-white" aria-label="Comparison">
        <div className="max-w-marketing mx-auto px-4 w-full">
          <motion.div 
            className="text-center mb-4 md:mb-6"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <h2 className="font-display text-h2-sm md:text-h2 text-charcoal mb-1 font-bold">
              RentFlow vs. The Old Way
            </h2>
            <p className="text-body text-body text-muted">
              The difference is in the speed and reliability of your operations.
            </p>
          </motion.div>

          <motion.div 
            className="max-w-4xl mx-auto bg-warm rounded-2xl p-4 md:p-6 lg:p-8"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden text-left">
              {/* Header Row */}
              <div className="grid grid-cols-3 bg-warm/50 border-b border-border p-3 lg:p-4 text-micro font-bold text-charcoal uppercase tracking-wider">
                <div>FEATURE</div>
                <div className="text-muted">OLD SCHOOL (SPREADSHEETS)</div>
                <div className="text-primary">RENTFLOW MODERN STACK</div>
              </div>
              
              {/* Rows */}
              {[
                { feature: 'Rent Collection', old: 'Manual checks, bank logs', new: 'Automated Instant Payments' },
                { feature: 'Maintenance', old: 'Sticky notes & WhatsApp', new: 'Real-time Kanban Tracking' },
                { feature: 'Reporting', old: '3 days to export & pivot', new: '1-Click Investor Ready' },
                { feature: 'Total Efficiency', old: 'Slow & error-prone', new: '10x Faster Automation' }
              ].map((row, idx) => (
                <div key={idx} className="grid grid-cols-3 p-3 lg:p-4 border-b border-border last:border-0 text-small">
                  <div className="font-bold text-charcoal flex items-center">{row.feature}</div>
                  <div className="text-body flex items-center text-muted">{row.old}</div>
                  <div className="text-success font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3" /> {row.new}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
`;

try {
  code = replaceSectionByAria(code, 'Landlord Features', manageAllReplacement);
  code = replaceSectionByAria(code, 'Comparison', comparisonReplacement);
  code = replaceSectionByAria(code, 'Security', fortifiedReplacement);
  code = replaceSectionByAria(code, '4 Steps', stepsReplacement);
  code = replaceSectionByAria(code, 'Insights', insightsReplacement);

  fs.writeFileSync('src/pages/marketing/Home.jsx', code, 'utf8');
  console.log("Successfully replaced sections by aria-label!");
} catch (e) {
  console.error("Error:", e.message);
}
