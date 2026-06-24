import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { EyeOff, Zap, Search, ShieldCheck } from 'lucide-react';
import Button from '../../components/ui/Button';

// Images
import aboutHeroBg from '../../assets/about_hero_bg.png';
import journeySplit from '../../assets/journey_split.png';
import teamCeo from '../../assets/team_ceo.png';
import teamCto from '../../assets/team_cto.png';
import teamCco from '../../assets/team_cco.png';
import teamCoo from '../../assets/team_coo.png';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

const values = [
  { icon: Search, title: 'Transparency', desc: 'Every transaction, receipt, and communication in one clear view. No hidden data silos.' },
  { icon: Zap, title: 'Efficiency', desc: 'Automating the mundane tasks so you can focus on the meaningful work of portfolio growth.' },
  { icon: ShieldCheck, title: 'Innovation', desc: 'Pushing the boundaries of what property tech can achieve with AI and smart workflows.' },
  { icon: ShieldCheck, title: 'Reliability', desc: 'Secure, uptime-guaranteed infrastructure providing total peace of mind for your assets.' },
];

const team = [
  { name: 'Aisha Balogun', role: 'CEO & Co-Founder', image: teamCeo },
  { name: 'Chinedu Okafor', role: 'CTO & Head of Engineering', image: teamCto },
  { name: 'Ngozi Adebayo', role: 'Chief Customer Officer', image: teamCco },
  { name: 'Oluwaseun Bakare', role: 'Chief Operating Officer', image: teamCoo },
];

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FDFBF7]">
      {/* 1. Hero Section */}
      <section className="relative py-24 md:py-32 bg-charcoal flex items-center min-h-[60vh] overflow-hidden" aria-label="Hero">
        <div className="absolute inset-0 z-0">
          <img src={aboutHeroBg} alt="Hero Background" className="w-full h-full object-cover object-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 to-charcoal/40" />
        </div>
        <div className="relative z-10 max-w-marketing mx-auto px-6 w-full">
          <motion.div className="max-w-3xl" initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="font-display text-white text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
              Modernizing the Way the World Manages Property
            </h1>
            <p className="text-white/80 text-base md:text-lg max-w-2xl mb-8 leading-relaxed">
              We're on a mission to bring transparency, efficiency, and intelligence to the property management industry through cutting-edge technology and human-centric design.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" variant="accent" className="bg-[#D35400] text-white hover:bg-[#D35400]/90 border-none">Learn Our Methods</Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">View Impact Reports</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Our Mission */}
      <section className="py-16 md:py-20" aria-label="Our Mission">
        <div className="max-w-marketing mx-auto px-6 text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#D35400] mb-4">Our Mission</p>
          <motion.h2 className="font-display text-charcoal text-3xl md:text-4xl lg:text-5xl max-w-4xl mx-auto mb-6 leading-tight" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            Give every African landlord a professional home for their rental business.
          </motion.h2>
          <motion.p className="text-body text-sm md:text-base max-w-3xl mx-auto leading-relaxed" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
            We started RentFlow because we lived the problem — rent paid into a personal account with no receipt, disputes with no paper trail, and landlords who had no idea what their portfolio was actually earning.
          </motion.p>
        </div>
      </section>

      {/* 3. The Context */}
      <section className="py-16 md:py-20" aria-label="The Context">
        <div className="max-w-marketing mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#D35400] mb-4">The Context</p>
            <h2 className="font-display text-charcoal text-2xl md:text-3xl">Born from the WhatsApp group problem</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <motion.div className="bg-[#EBE9E4] rounded-2xl p-6 md:p-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center mb-5">
                <EyeOff size={18} className="text-error" />
              </div>
              <h3 className="font-display font-semibold text-charcoal text-lg md:text-xl mb-3">The Landlord's Pain</h3>
              <p className="text-body text-xs md:text-sm leading-relaxed">
                The average Nigerian landlord manages rent through a combination of bank alerts, WhatsApp messages, voice calls and handwritten notebooks. When disputes happen — and they always happen — there's no trail.
              </p>
            </motion.div>
            
            <motion.div className="bg-[#EBE9E4] rounded-2xl p-6 md:p-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
              <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center mb-5">
                <EyeOff size={18} className="text-error" />
              </div>
              <h3 className="font-display font-semibold text-charcoal text-lg md:text-xl mb-3">The Tenant's Pain</h3>
              <p className="text-body text-xs md:text-sm leading-relaxed">
                The average Nigerian tenant pays rent into a personal bank account, gets no receipt, and has no way to prove payment if the landlord claims otherwise.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. The Solution */}
      <section className="py-16 md:py-20" aria-label="The Solution">
        <div className="max-w-marketing mx-auto px-6 text-center">
          <div className="inline-block bg-[#D35400]/10 rounded-full px-4 py-1.5 mb-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#D35400]">The Solution</p>
          </div>
          <motion.h2 className="font-display text-charcoal text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto leading-relaxed" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            RentFlow exists to fix this. Not with a complicated enterprise system that requires a training course, but with a product that's as easy to use as WhatsApp and as trustworthy as a bank receipt.
          </motion.h2>
        </div>
      </section>

      {/* 5. Our Journey */}
      <section className="py-16 md:py-20 bg-white border-y border-border" aria-label="Our Journey">
        <div className="max-w-marketing mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#D35400] mb-4">Our Journey</p>
              <h2 className="font-display text-charcoal text-2xl md:text-3xl mb-5">From Spreadsheets to Seamless Systems</h2>
              <div className="space-y-4 text-body text-xs md:text-sm leading-relaxed">
                <p>
                  RentFlow began in 2019 with a simple observation: property management was stuck in the past. We saw portfolios managed with fragmented manual spreadsheets, physical keys, and endless chains of unorganized emails.
                </p>
                <p>
                  Our founders, a mix of real estate veterans and software engineers, set out to build a central nervous system for properties. A platform where every lease, every maintenance request, and every dollar is tracked with absolute precision.
                </p>
                <p>
                  Today, RentFlow powers thousands of units globally, transforming property management from a reactive chore into a proactive, data-driven strategy for asset managers and operations directors.
                </p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="rounded-2xl overflow-hidden shadow-xl border border-border h-[300px] md:h-[400px]">
              <img src={journeySplit} alt="Journey from paper to digital" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5.5. Stats Section (Restored) */}
      <section className="py-12 bg-[#0B4F45]" aria-label="RentFlow Statistics">
        <div className="max-w-marketing mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
            <motion.div className="py-4 md:py-0" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <p className="font-mono text-4xl md:text-5xl font-bold text-[#D35400] mb-2">₦180M+</p>
              <p className="text-white/80 text-xs md:text-sm">processed through RentFlow</p>
            </motion.div>
            <motion.div className="py-4 md:py-0" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
              <p className="font-mono text-4xl md:text-5xl font-bold text-white mb-2">2,400+</p>
              <p className="text-white/80 text-xs md:text-sm">units managed</p>
            </motion.div>
            <motion.div className="py-4 md:py-0" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}>
              <p className="font-mono text-4xl md:text-5xl font-bold text-white mb-2">98%</p>
              <p className="text-white/80 text-xs md:text-sm">receipts issued on time</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Values */}
      <section className="py-16 md:py-20" aria-label="Values That Drive Us">
        <div className="max-w-marketing mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="font-display text-charcoal text-2xl md:text-3xl mb-3">Values That Drive Us</h2>
            <p className="text-body text-xs md:text-sm">Our culture is built on a foundation of operational excellence and relentless innovation.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div key={v.title} className="bg-white rounded-xl p-5 md:p-6 border border-border shadow-sm" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <div className="w-10 h-10 bg-[#D35400]/10 rounded-full flex items-center justify-center mb-5">
                  <v.icon size={18} className="text-[#D35400]" aria-hidden="true" />
                </div>
                <h3 className="font-display font-semibold text-charcoal text-base md:text-lg mb-2">{v.title}</h3>
                <p className="text-[11px] md:text-xs text-body leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. The Team */}
      <section className="py-16 md:py-20" aria-label="The Minds Behind RentFlow">
        <div className="max-w-marketing mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="font-display text-charcoal text-2xl md:text-3xl mb-2">The Minds Behind RentFlow</h2>
              <p className="text-body text-xs md:text-sm">A multi-disciplinary team committed to the future of real estate technology.</p>
            </div>
            <a href="#team" className="text-xs font-semibold text-[#D35400] hover:underline flex items-center gap-1">Meet the entire team &rarr;</a>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {team.map((member, i) => (
              <motion.div key={member.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <div className="aspect-square bg-warm rounded-xl overflow-hidden mb-3 md:mb-4 border border-border">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                </div>
                <h3 className="font-display font-semibold text-charcoal text-sm md:text-base">{member.name}</h3>
                <p className="text-[10px] md:text-xs text-body">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA */}
      <section className="py-16 md:py-24" aria-label="CTA">
        <div className="max-w-marketing mx-auto px-6">
          <div className="bg-[#0B4F45] rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <h2 className="font-display text-white text-3xl md:text-4xl mb-4">Be Part of the Future</h2>
              <p className="text-white/80 text-xs md:text-sm max-w-2xl mx-auto mb-8">
                Join our growing team of visionaries, engineers, and real estate experts as we redefine the boundaries of property management technology.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" variant="accent" className="bg-[#D35400] text-white hover:bg-[#D35400]/90 border-none" onClick={() => navigate('/careers')}>Join Our Team</Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" onClick={() => navigate('/contact')}>Contact Support</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
