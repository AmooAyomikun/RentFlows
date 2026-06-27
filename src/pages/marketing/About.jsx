import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  EyeOff, Zap, Search, ShieldCheck, ArrowRight,
  TrendingUp, Users, Globe, CheckCircle, Star,
  MapPin, Calendar, Lightbulb, Heart
} from 'lucide-react';
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
  { icon: Search,     title: 'Transparency',  desc: 'Every transaction, receipt, and communication in one clear view. No hidden data silos.', color: '#0B4F45' },
  { icon: Zap,        title: 'Efficiency',    desc: 'Automating the mundane tasks so you can focus on the meaningful work of portfolio growth.', color: '#C75B30' },
  { icon: Lightbulb,  title: 'Innovation',    desc: 'Pushing the boundaries of what property tech can achieve with AI and smart workflows.', color: '#0B4F45' },
  { icon: ShieldCheck,title: 'Reliability',   desc: 'Secure, uptime-guaranteed infrastructure providing total peace of mind for your assets.', color: '#C75B30' },
];

const team = [
  { name: 'Aisha Balogun',    role: 'CEO & Co-Founder',           image: teamCeo, location: 'Lagos, Nigeria' },
  { name: 'Chinedu Okafor',   role: 'CTO & Head of Engineering',  image: teamCto, location: 'Abuja, Nigeria' },
  { name: 'Ngozi Adebayo',    role: 'Chief Customer Officer',      image: teamCco, location: 'Port Harcourt' },
  { name: 'Oluwaseun Bakare', role: 'Chief Operating Officer',     image: teamCoo, location: 'Lagos, Nigeria' },
];

const milestones = [
  { year: '2019', label: 'Founded', desc: 'RentFlow is founded in Lagos with a mission to digitize rent in Africa.' },
  { year: '2021', label: 'First 500', desc: 'Reached 500 active landlords and processed ₦10M in rent.' },
  { year: '2023', label: 'Series A', desc: 'Raised Series A funding, expanded to Abuja and Port Harcourt.' },
  { year: '2024', label: '₦180M+', desc: 'Over ₦180M in rent processed with 2,400+ active landlords across Africa.' },
];

const pressItems = [
  'TechCabal', 'Techpoint Africa', 'Disrupt Africa', 'Business Day NG', 'The Guardian',
];

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white overflow-x-hidden">

      {/* ══ 1. HERO: Cinematic Vision Manifesto ════════════════════════════════ */}
      <section className="relative py-24 md:py-36 bg-[#04120F] flex items-center min-h-[70vh] overflow-hidden text-center" aria-label="Hero">
        {/* Background Image & Dynamic Overlay */}
        <div className="absolute inset-0 z-0">
          <img src={aboutHeroBg} alt="Hero Background" className="w-full h-full object-cover object-center opacity-20 filter saturate-150 scale-105 animate-[pulse_10s_ease-in-out_infinite]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04120F] via-[#04120F]/80 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0B4F45_0%,transparent_65%)] opacity-30 mix-blend-screen" />
        </div>

        <div className="relative z-10 max-w-marketing mx-auto px-6 w-full">
          <motion.div className="max-w-4xl mx-auto" initial="hidden" animate="visible" variants={fadeUp}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-[#E79868] text-xs font-bold tracking-widest uppercase mb-6 shadow-2xl backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#D35400] animate-ping" />
              The RentFlow Manifesto
            </div>
            <h1 className="font-display text-white font-black leading-[1.05] tracking-tight mb-8"
              style={{ fontSize: 'clamp(40px, 6vw, 68px)' }}>
              Re-Engineering Real Estate Infrastructure for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E79868] via-white to-[#C75B30]">Africa.</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
              We started RentFlow because property management in major cities was broken—relying on paper receipts, WhatsApp disputes, and stressful manual follow-ups. We built the digital engine to fix it.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-14">
              <button
                onClick={() => navigate('/features')}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[#D35400] hover:bg-[#b04500] text-white font-bold text-base tracking-wide transition-all duration-200 shadow-[0_10px_35px_rgba(211,84,0,0.4)] cursor-pointer border border-white/10 transform hover:-translate-y-0.5"
              >
                Discover Our Architecture <ArrowRight size={18} />
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-semibold text-base transition-all cursor-pointer border border-white/20 backdrop-blur-md"
              >
                Contact Our Team
              </button>
            </div>

            {/* Floating Trust Pills Strip */}
            <div className="flex flex-wrap justify-center gap-3 pt-6 border-t border-white/10 max-w-2xl mx-auto text-xs text-white/60 font-medium">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/5 flex items-center gap-1.5">🌍 Active across Lagos, Abuja & PH</span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/5 flex items-center gap-1.5">🏢 2,400+ Portfolios Powered</span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/5 flex items-center gap-1.5">🔒 NDPR & CBN Tier-1 Compliant</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ 2. STATS STRIP ═══════════════════════════════════════════════ */}
      <section className="py-12 bg-[#0B4F45]" aria-label="Key statistics">
        <div className="max-w-marketing mx-auto px-6 w-full">
          <div className="grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
            {[
              { value: '₦180M+', label: 'Rent processed through RentFlow', icon: TrendingUp },
              { value: '2,400+', label: 'Active landlords managing units', icon: Users },
              { value: '98%',    label: 'Receipts issued on time', icon: CheckCircle },
            ].map((s, i) => (
              <motion.div
                key={i}
                className="py-4 md:py-0 flex flex-col items-center gap-2"
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-2">
                  <s.icon size={18} className="text-[#E79868]" />
                </div>
                <p className="font-display font-black text-4xl md:text-5xl text-white mb-1">{s.value}</p>
                <p className="text-white/70 text-small">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. OUR MISSION ═══════════════════════════════════════════════ */}
      <section className="py-20 md:py-24 bg-warm" aria-label="Our Mission">
        <div className="max-w-marketing mx-auto px-6 w-full text-center">
          <motion.span
            className="text-micro font-bold text-accent tracking-[0.12em] uppercase"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >Our Mission</motion.span>
          <motion.h2
            className="font-display text-charcoal mt-2 mb-6 font-bold tracking-tight leading-tight"
            style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
          >
            Give every African landlord a professional<br className="hidden md:block" /> home for their rental business.
          </motion.h2>
          <motion.p
            className="text-body text-muted max-w-3xl mx-auto leading-relaxed"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}
          >
            We started RentFlow because we lived the problem — rent paid into a personal account with no receipt,
            disputes with no paper trail, and landlords who had no idea what their portfolio was actually earning.
            RentFlow fixes this with a product as easy as WhatsApp and as trustworthy as a bank receipt.
          </motion.p>
        </div>
      </section>

      {/* ══ 4. THE PROBLEM → SOLUTION SPLIT ═════════════════════════════ */}
      <section className="py-20 md:py-24 bg-white" aria-label="The problem and solution">
        <div className="max-w-marketing mx-auto px-6 w-full">
          <motion.div
            className="text-center mb-12"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <span className="text-micro font-bold text-accent tracking-[0.12em] uppercase">The Context</span>
            <h2 className="font-display text-h2-sm md:text-h2 text-charcoal mt-2 font-bold tracking-tight leading-tight">
              Born from the WhatsApp group problem
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: EyeOff,
                title: "The Landlord's Pain",
                body: "The average Nigerian landlord manages rent through a combination of bank alerts, WhatsApp messages, voice calls and handwritten notebooks. When disputes happen — and they always happen — there's no trail.",
                bg: 'bg-red-50',
                iconColor: 'text-red-500',
                borderColor: 'border-red-100',
              },
              {
                icon: EyeOff,
                title: "The Tenant's Pain",
                body: "The average Nigerian tenant pays rent into a personal bank account, gets no receipt, and has no way to prove payment if the landlord claims otherwise. This creates stress and erodes trust.",
                bg: 'bg-red-50',
                iconColor: 'text-red-500',
                borderColor: 'border-red-100',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className={`bg-warm rounded-2xl p-8 border ${item.borderColor}`}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
              >
                <div className={`w-10 h-10 rounded-full ${item.bg} flex items-center justify-center mb-5`}>
                  <item.icon size={18} className={item.iconColor} />
                </div>
                <h3 className="font-display font-bold text-charcoal text-h4 mb-3">{item.title}</h3>
                <p className="text-small text-body leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>

          {/* Solution callout */}
          <motion.div
            className="mt-10 max-w-4xl mx-auto bg-[#0B4F45] rounded-2xl p-8 md:p-10 text-center text-white relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#C75B30]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <span className="text-micro font-bold text-[#E79868] tracking-[0.12em] uppercase block mb-3">The Solution</span>
              <p className="font-display font-bold text-h3 md:text-h2-sm leading-tight max-w-2xl mx-auto">
                RentFlow exists to fix this. Not with a complicated enterprise system, but with a product
                that's as easy to use as WhatsApp and as trustworthy as a bank receipt.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ 5. MILESTONE TIMELINE ════════════════════════════════════════ */}
      <section className="py-20 md:py-24 bg-warm" aria-label="Company milestones">
        <div className="max-w-marketing mx-auto px-6 w-full">
          <motion.div
            className="text-center mb-14"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <span className="text-micro font-bold text-accent tracking-[0.12em] uppercase">Our Journey</span>
            <h2 className="font-display text-h2-sm md:text-h2 text-charcoal mt-2 font-bold tracking-tight leading-tight">
              From Spreadsheets to Seamless Systems
            </h2>
          </motion.div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-border z-0" />

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                >
                  {/* Year bubble */}
                  <div className="relative z-10 w-16 h-16 rounded-full bg-[#0B4F45] flex flex-col items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-[10px] text-white/70 font-bold uppercase tracking-wider">Yr</span>
                    <span className="font-display font-black text-white text-sm leading-none">{m.year}</span>
                  </div>
                  <div className="text-center">
                    <p className="font-display font-bold text-charcoal text-h4 mb-2">{m.label}</p>
                    <p className="text-small text-muted leading-relaxed">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Journey image */}
          <motion.div
            className="mt-14 rounded-2xl overflow-hidden shadow-xl border border-border h-[280px] md:h-[380px]"
            initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          >
            <img src={journeySplit} alt="RentFlow journey from paper to digital" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* ══ 6. VALUES ════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24 bg-white" aria-label="Company values">
        <div className="max-w-marketing mx-auto px-6 w-full">
          <motion.div
            className="text-center mb-12"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <span className="text-micro font-bold text-accent tracking-[0.12em] uppercase">Our Values</span>
            <h2 className="font-display text-h2-sm md:text-h2 text-charcoal mt-2 font-bold tracking-tight leading-tight">
              Values That Drive Us
            </h2>
            <p className="text-body text-muted mt-3 max-w-xl mx-auto">
              Our culture is built on a foundation of operational excellence and relentless innovation.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                className="bg-warm rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-all group"
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"
                  style={{ background: `${v.color}15` }}
                >
                  <v.icon size={20} style={{ color: v.color }} aria-hidden="true" />
                </div>
                <h3 className="font-display font-bold text-charcoal text-h4 mb-2">{v.title}</h3>
                <p className="text-small text-muted leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 7. PRESS ═════════════════════════════════════════════════════ */}
      <section className="py-10 bg-warm border-y border-border" aria-label="Press mentions">
        <div className="max-w-marketing mx-auto px-6 w-full">
          <p className="text-center text-micro font-bold text-muted tracking-[0.15em] uppercase mb-6">
            As featured in
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14">
            {pressItems.map((item) => (
              <span key={item} className="font-display font-black text-charcoal/25 text-xl tracking-tight select-none">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 8. TEAM ══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24 bg-white" aria-label="The team">
        <div className="max-w-marketing mx-auto px-6 w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <span className="text-micro font-bold text-accent tracking-[0.12em] uppercase">The Team</span>
              <h2 className="font-display text-h2-sm md:text-h2 text-charcoal mt-2 font-bold tracking-tight leading-tight">
                The Minds Behind RentFlow
              </h2>
              <p className="text-body text-muted mt-2">
                A multi-disciplinary team committed to the future of real estate technology.
              </p>
            </motion.div>
            <motion.a
              href="#team"
              className="text-small font-bold text-[#0B4F45] hover:underline flex items-center gap-1 shrink-0"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            >
              Meet the full team <ArrowRight size={14} />
            </motion.a>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="group"
              >
                <div className="aspect-square bg-warm rounded-2xl overflow-hidden mb-3 border border-border shadow-sm group-hover:shadow-md transition-all">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
                  />
                </div>
                <h3 className="font-display font-bold text-charcoal text-body">{member.name}</h3>
                <p className="text-small text-muted">{member.role}</p>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin size={10} className="text-muted" />
                  <p className="text-[10px] text-muted">{member.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 9. CULTURE STRIP ═════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-warm border-t border-border" aria-label="Culture">
        <div className="max-w-marketing mx-auto px-6 w-full">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Globe,    title: 'Pan-African Focus',  desc: 'Built for the unique realities of Nigerian and broader African property markets.' },
              { icon: Heart,    title: 'Human-Centric',      desc: 'Design decisions are always made with landlords and tenants in mind, not just technology.' },
              { icon: Star,     title: 'Impact-Driven',       desc: 'Our success is measured by the time we save our users and the trust we build in the market.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-4"
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              >
                <div className="w-10 h-10 rounded-xl bg-[#0B4F45]/10 flex items-center justify-center shrink-0">
                  <item.icon size={18} className="text-[#0B4F45]" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-charcoal text-h4 mb-1">{item.title}</h3>
                  <p className="text-small text-muted leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 10. CTA ══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24 bg-white" aria-label="Call to action">
        <div className="max-w-marketing mx-auto px-6 w-full">
          <motion.div
            className="bg-[#0B4F45] rounded-3xl px-10 py-16 md:px-16 md:py-20 text-center text-white relative overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#073A33]/80 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-[-20%] right-[-10%] w-[350px] h-[350px] bg-[#C75B30]/15 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="text-[#E79868] text-micro font-bold tracking-[0.15em] uppercase mb-4 block">
                Join Our Growing Team
              </span>
              <h2 className="font-display font-bold text-h3 md:text-h2-sm text-white mb-5 leading-tight">
                Be Part of the Future of Property Management
              </h2>
              <p className="text-white/70 text-body mb-8 leading-relaxed">
                Join our growing team of visionaries, engineers, and real estate experts as we redefine the
                boundaries of property management technology across Africa.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => navigate('/signup')}
                  className="px-8 py-3.5 rounded-xl bg-[#C75B30] hover:bg-[#A94A24] text-white font-bold text-sm cursor-pointer transition-all shadow-lg"
                >
                  Join Our Team
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="px-8 py-3.5 rounded-xl border-2 border-white/25 text-white hover:bg-white/10 font-semibold text-sm cursor-pointer transition-all backdrop-blur-md"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default About;
