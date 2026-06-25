import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Search, ArrowRight, ArrowUpRight, Download, ChevronRight, PlayCircle, Play,
  Calendar, Users, Briefcase, FileText, Wrench, BarChart2,
  BookOpen, ChevronDown, Clock, Mail, CheckSquare, Building,
  Calculator, Video
} from 'lucide-react';

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  })
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// Filter Tabs
const filters = ['All Resources', 'Guides', 'Case Studies', 'Market Reports', 'Product Updates'];

// Articles Grid Data
const articles = [
  {
    type: 'GUIDE',
    title: 'Scaling Your Rental Portfolio: A 5-Step Strategic Plan',
    desc: 'Learn how to transition from local landlord to institutional-grade asset manager with our comprehensive scaling framework.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
  },
  {
    type: 'CASE STUDY',
    title: 'UrbanLiving Group: 40% Growth in Efficiency',
    desc: 'See how a fast-growing residential firm automated their entire billing cycle using RentFlow.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop',
  },
  {
    type: 'MARKET REPORT',
    title: 'Q3 2024 Rental Market Performance Index',
    desc: 'A comprehensive look at occupancy rates, yield trends, and tenant sentiment across major regional hubs.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop',
  }
];

// Video Learning Center Data
const videos = [
  { 
    title: 'Advanced Portfolio Diversification Strategies', 
    tag: 'MASTERCLASS', 
    duration: '12:15',
    thumb: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop'
  },
  { 
    title: 'Automating Monthly Rent Collection', 
    tag: 'HOW-TO', 
    duration: '05:30',
    thumb: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop'
  },
  { 
    title: 'Navigating New Property Tax Regulations', 
    tag: 'WEBINAR', 
    duration: '45:00',
    thumb: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=800&auto=format&fit=crop'
  }
];

// Expert Sessions Data
const sessions = [
  { 
    day: '24', 
    month: 'SEP', 
    title: 'Mastering Tenant Retention in a Competitive Market', 
    time: '14:00 PM GMT', 
    speaker: 'Sarah Imenni, Head of Ops' 
  },
  { 
    day: '08', 
    month: 'OCT', 
    title: 'Tax Optimization for Multi-Property Owners', 
    time: '16:00 PM GMT', 
    speaker: 'David Chen, Financial Strategist' 
  }
];

// Forum Threads Data
const forumThreads = [
  { title: 'Managing multi-generational tenants', details: '34 active participants • 12 new replies' },
  { title: 'EV charging stations upgrade for residential units', details: '18 active participants • 5 new replies' },
  { title: 'Best practices for remote property inspections', details: '41 active participants • 8 new replies' }
];

// Tools & Calculators Data
const tools = [
  { icon: Calculator, title: 'ROI Calculator', desc: 'Calculate expected return' },
  { icon: Building, title: 'Cap Rate Estimator', desc: 'Evaluate property value' },
  { icon: Wrench, title: 'Maintenance Budgeter', desc: 'Plan for repairs' }
];

// Asset Library Templates Data
const assets = [
  { 
    icon: FileText, 
    title: 'Standard Residential Lease Agreement', 
    desc: 'Comprehensive legal contract template for multiple regions.', 
    action: 'Download PDF' 
  },
  { 
    icon: CheckSquare, 
    title: 'Move-In/Move-Out Checklist', 
    desc: 'Ensure thorough inspections and security deposit clarity.', 
    action: 'Download DOCX' 
  },
  { 
    icon: Mail, 
    title: 'Notice to Quit / Late Payment Notice', 
    desc: 'Professional communication for rent arrears.', 
    action: 'Download PDF' 
  },
  { 
    icon: Wrench, 
    title: 'Maintenance Request Log', 
    desc: 'Track issues, costs, and resolution times.', 
    action: 'Download PDF' 
  }
];

const Resources = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Resources');
  const [emailQuery, setEmailQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/blog?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (emailQuery) {
      setEmailQuery('');
      alert('Thank you for joining 2,000+ property professionals!');
    }
  };

  return (
    <div className="w-full bg-[#FAF7F2] font-body text-body selection:bg-primary/10 selection:text-primary">
      {/* 1. Hero Section */}
      <section className="pt-12 pb-10 md:pt-16 md:pb-14" aria-label="Resources Hero">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="font-display font-bold text-charcoal text-4xl md:text-5xl lg:text-[54px] leading-[1.12] tracking-tight mb-8">
              Insights to Power Your<br />Property Portfolio
            </h1>
            
            <form onSubmit={handleSearch} className="max-w-[620px] mx-auto relative flex items-center mb-6">
              <Search size={20} className="absolute left-4 text-muted/80 pointer-events-none" />
              <input 
                type="text" 
                placeholder="Search for guides, market reports, or templates..." 
                className="w-full h-[52px] pl-12 pr-4 rounded-xl border border-border/80 bg-white text-charcoal text-sm placeholder:text-muted/70 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-[0_2px_8px_rgba(27,31,29,0.04)]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </motion.div>
        </div>
      </section>

      {/* 2. Featured Report Banner */}
      <section className="pb-10">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-80px" }} 
            variants={fadeUp}
            className="w-full rounded-[24px] md:rounded-[32px] bg-[#0B4F45] overflow-hidden relative shadow-lg grid md:grid-cols-12 items-center min-h-[380px]"
          >
            {/* Right Background Image with Overlay */}
            <div className="absolute right-0 top-0 bottom-0 w-full md:w-[60%] overflow-hidden pointer-events-none">
              <div 
                className="w-full h-full bg-cover bg-center mix-blend-luminosity opacity-40 scale-105"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B4F45] via-[#0B4F45]/85 md:via-[#0B4F45]/95 to-transparent" />
            </div>

            {/* Left Content */}
            <div className="relative z-10 p-8 md:p-12 lg:p-14 md:col-span-8 lg:col-span-7 flex flex-col items-start">
              <span className="inline-block bg-[#D35400] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-md mb-5 shadow-xs">
                FEATURED REPORT
              </span>
              <h2 className="font-display font-bold text-white text-3xl md:text-4xl lg:text-[40px] leading-[1.14] mb-4 tracking-tight max-w-xl">
                The 2024 State of African Property Management
              </h2>
              <p className="text-white/80 text-sm md:text-base leading-relaxed mb-8 max-w-lg">
                An in-depth analysis of emerging trends, regulatory shifts, and technological adoption across high-growth African real estate markets.
              </p>
              <button 
                onClick={() => alert('Downloading The 2024 State of African Property Management Report...')}
                className="bg-white text-[#0B4F45] hover:bg-white/95 font-body font-bold text-sm px-6 py-3.5 rounded-xl transition-all shadow-sm flex items-center gap-2 group active:scale-[0.98]"
              >
                Download Report <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Filter & Sort Bar */}
      <section className="pb-8">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-border/70 pb-6">
            <div className="flex flex-wrap items-center gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all select-none ${
                    activeFilter === filter 
                      ? 'bg-[#0E2522] text-white shadow-xs' 
                      : 'bg-white border border-border/80 text-body hover:text-charcoal hover:border-charcoal/30 shadow-[0_1px_2px_rgba(0,0,0,0.02)]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-2 text-xs md:text-sm text-muted font-medium ml-auto md:ml-0">
              <span>Sort by:</span>
              <button className="text-charcoal font-semibold inline-flex items-center gap-1 hover:text-primary transition-colors focus:outline-none">
                Newest First <ChevronDown size={14} className="mt-0.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Success Stories */}
      <section className="pb-14">
        <div className="max-w-[1200px] mx-auto px-6">
          <h3 className="font-display font-semibold text-xl md:text-2xl text-charcoal mb-6">Success Stories</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="bg-white border border-border/80 rounded-[20px] p-6 md:p-8 shadow-[0_1px_3px_rgba(27,31,29,0.04)] flex flex-col justify-between h-full hover:border-primary/20 transition-colors"
            >
              <div className="flex justify-between items-start gap-6 mb-8">
                <p className="text-body italic text-sm md:text-base leading-relaxed flex-1">
                  "RentFlow's tenant portal lets us handle our 500+ unit portfolio. The automation features alone save us 20 hours of manual work per week."
                </p>
                <div className="bg-[#E6F4EA] text-[#0B4F45] rounded-xl p-4 flex flex-col items-center justify-center shrink-0 min-w-[105px] border border-[#1E9E6A]/10">
                  <span className="font-display font-bold text-2xl md:text-3xl leading-none mb-1">40%</span>
                  <span className="text-[9px] font-bold tracking-wider uppercase text-center">TIME REDUCTION</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#EBE9E4] overflow-hidden shrink-0 border border-border/50">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" alt="James Mwangi" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-bold text-charcoal text-sm leading-tight mb-0.5">James Mwangi</p>
                  <p className="text-muted text-xs leading-tight">CEO, UrbanLiving Group</p>
                </div>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="bg-white border border-border/80 rounded-[20px] p-6 md:p-8 shadow-[0_1px_3px_rgba(27,31,29,0.04)] flex flex-col justify-between h-full hover:border-primary/20 transition-colors"
            >
              <div className="flex justify-between items-start gap-6 mb-8">
                <p className="text-body italic text-sm md:text-base leading-relaxed flex-1">
                  "The delinquency tracking and automated reminders reduced our late payments significantly within the first quarter of implementation."
                </p>
                <div className="bg-[#E6F4EA] text-[#0B4F45] rounded-xl p-4 flex flex-col items-center justify-center shrink-0 min-w-[105px] border border-[#1E9E6A]/10">
                  <span className="font-display font-bold text-2xl md:text-3xl leading-none mb-1">25%</span>
                  <span className="text-[9px] font-bold tracking-wider uppercase text-center">LOWER DELINQUENCY</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#EBE9E4] overflow-hidden shrink-0 border border-border/50">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" alt="Sarah Imenni" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-bold text-charcoal text-sm leading-tight mb-0.5">Sarah Imenni</p>
                  <p className="text-muted text-xs leading-tight">Operations Director, Prime Assets</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Resource Grid */}
      <section className="pb-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div 
            className="grid md:grid-cols-3 gap-6"
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          >
            {articles.map((article, idx) => (
              <motion.div 
                key={idx} variants={fadeUp}
                onClick={() => navigate(`/blog/scaling-portfolio-${idx}`)}
                className="bg-white border border-border/80 rounded-[20px] shadow-[0_1px_3px_rgba(27,31,29,0.04)] hover:shadow-md hover:border-primary/30 transition-all duration-300 flex flex-col overflow-hidden group cursor-pointer"
              >
                <div className="w-full h-48 relative overflow-hidden bg-gray-100 shrink-0">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[#D35400] text-[11px] font-bold tracking-wider uppercase mb-2.5">
                    {article.type}
                  </span>
                  <h3 className="font-display font-bold text-lg text-charcoal mb-2.5 leading-snug group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted mb-6 flex-1 leading-relaxed line-clamp-3">
                    {article.desc}
                  </p>
                  <div className="text-xs font-bold text-charcoal inline-flex items-center gap-1.5 group-hover:text-primary group-hover:gap-2.5 transition-all mt-auto">
                    <span>Read More</span> <ArrowRight size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. Newsletter Subscription Box */}
      <section className="pb-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="bg-[#F2F2EE] rounded-[24px] md:rounded-[28px] p-8 md:p-12 border border-border/70 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-xs"
          >
            <div className="lg:max-w-lg">
              <h2 className="font-display font-bold text-2xl md:text-3xl text-charcoal mb-2.5 tracking-tight">
                Join 2,000+ Property Professionals
              </h2>
              <p className="text-body text-sm md:text-base leading-relaxed text-charcoal/80">
                Get exclusive market data, regulatory updates, and management tips delivered straight to your inbox once a week.
              </p>
            </div>
            
            <div className="w-full lg:w-auto lg:min-w-[420px]">
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row bg-white p-1.5 rounded-xl border border-border/80 shadow-[0_1px_2px_rgba(0,0,0,0.03)] focus-within:border-primary transition-colors gap-2">
                <input 
                  type="email" 
                  placeholder="work@company.com" 
                  className="flex-1 h-11 px-4 bg-transparent border-none text-sm text-charcoal placeholder:text-muted/70 focus:outline-none focus:ring-0"
                  value={emailQuery}
                  onChange={(e) => setEmailQuery(e.target.value)}
                  required
                />
                <button type="submit" className="bg-[#0E2522] hover:bg-[#0B4F45] text-white font-semibold text-xs md:text-sm px-6 py-3 rounded-lg transition-colors shrink-0 active:scale-[0.98]">
                  Join Now
                </button>
              </form>
              <p className="text-[11px] text-muted mt-2.5 pl-1.5 font-medium">
                No spam. Ever. Unsubscribe anytime.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. Video Learning Center */}
      <section className="pb-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-semibold text-xl md:text-2xl text-charcoal">Video Learning Center</h2>
            <button 
              onClick={() => navigate('/blog')}
              className="text-xs md:text-sm font-semibold text-charcoal hover:text-primary transition-colors inline-flex items-center gap-1.5 focus:outline-none group"
            >
              <Video size={15} className="text-muted group-hover:text-primary transition-colors" />
              <span>Browse All Videos</span>
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {videos.map((video, idx) => (
              <motion.div 
                key={idx} 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                onClick={() => alert(`Playing video: ${video.title}`)}
                className="group cursor-pointer flex flex-col"
              >
                <div className="w-full aspect-video rounded-[16px] overflow-hidden relative mb-3.5 bg-gray-900 shadow-2xs border border-border/40">
                  <img src={video.thumb} alt={video.title} className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500 ease-out" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-white/95 group-hover:bg-white flex items-center justify-center text-charcoal shadow-md group-hover:scale-110 transition-all">
                      <Play size={20} className="fill-charcoal text-charcoal ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-xs text-white font-mono text-[11px] font-bold px-2 py-0.5 rounded">
                    {video.duration}
                  </span>
                </div>
                
                <span className="inline-block bg-[#E6F4EA] text-[#0B4F45] text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded w-fit mb-2">
                  {video.tag}
                </span>
                <h3 className="font-semibold text-charcoal text-base leading-snug group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Upcoming Expert Sessions */}
      <section className="pb-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-semibold text-xl md:text-2xl text-charcoal">Upcoming Expert Sessions</h2>
            <button 
              onClick={() => navigate('/blog')}
              className="text-xs md:text-sm font-semibold text-charcoal hover:text-primary transition-colors focus:outline-none"
            >
              View All Events
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {sessions.map((session, idx) => (
              <motion.div 
                key={idx}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="bg-white border border-border/80 rounded-[16px] p-5 md:p-6 shadow-[0_1px_3px_rgba(27,31,29,0.03)] hover:shadow-md hover:border-primary/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6"
              >
                <div className="flex items-start sm:items-center gap-5">
                  <div className="w-16 h-16 rounded-xl bg-[#F4F2ED] border border-border/60 flex flex-col items-center justify-center shrink-0">
                    <span className="font-display font-bold text-2xl text-charcoal leading-none mb-0.5">{session.day}</span>
                    <span className="text-[10px] font-bold text-[#D35400] uppercase tracking-wider">{session.month}</span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base md:text-lg text-charcoal mb-1.5">{session.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted font-medium">
                      <span className="inline-flex items-center gap-1.5"><Clock size={14} className="text-muted/80" /> {session.time}</span>
                      <span className="inline-flex items-center gap-1.5"><Users size={14} className="text-muted/80" /> {session.speaker}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => alert(`Registered for session: ${session.title}`)}
                  className="bg-[#0E2522] hover:bg-[#0B4F45] text-white font-semibold text-xs md:text-sm px-6 py-3 rounded-lg transition-colors shrink-0 active:scale-[0.98]"
                >
                  Register
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Community Forum Hub Banner */}
      <section className="pb-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="rounded-[24px] md:rounded-[32px] bg-[#0B4F45] p-8 md:p-12 lg:p-14 text-white shadow-lg overflow-hidden relative grid lg:grid-cols-12 gap-10 items-center"
          >
            {/* Subtle background texture blur */}
            <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 lg:col-span-5 flex flex-col items-start">
              <span className="inline-block bg-[#D35400] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-md mb-5 shadow-xs">
                COMMUNITY HUB
              </span>
              <h2 className="font-display font-bold text-white text-3xl md:text-4xl leading-tight mb-4 tracking-tight">
                Connect with 5,000+ Landlords
              </h2>
              <p className="text-white/80 text-sm md:text-base leading-relaxed mb-8">
                Share advice, solve problems, and grow together in our exclusive member forum.
              </p>
              <button 
                onClick={() => navigate('/signup')}
                className="bg-white text-[#0B4F45] hover:bg-white/95 font-body font-bold text-sm px-6 py-3.5 rounded-xl transition-all shadow-sm active:scale-[0.98]"
              >
                Join Discussion
              </button>
            </div>
            
            <div className="relative z-10 lg:col-span-7 flex flex-col gap-3.5 w-full">
              {forumThreads.map((thread, idx) => (
                <div 
                  key={idx} 
                  onClick={() => alert(`Opening discussion: ${thread.title}`)}
                  className="bg-[#073A33]/70 hover:bg-[#073A33] border border-white/10 rounded-xl p-4 md:p-5 transition-all cursor-pointer shadow-2xs group"
                >
                  <h4 className="font-semibold text-white text-sm md:text-base mb-1 group-hover:text-primary-100 transition-colors">{thread.title}</h4>
                  <p className="text-xs text-white/60 font-medium">{thread.details}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 10. Bottom Split (Term of the Day & Tools Calculators) */}
      <section className="pb-16 border-t border-border/60 pt-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            {/* Term of the Day */}
            <div className="lg:col-span-4">
              <h3 className="font-display font-semibold text-lg md:text-xl text-charcoal mb-4">Term of the Day</h3>
              <div className="bg-white border border-border/80 rounded-[16px] p-6 shadow-2xs">
                <h4 className="font-display font-bold text-2xl text-[#D35400] mb-2.5">Cap Rate</h4>
                <p className="text-xs md:text-sm text-body leading-relaxed mb-6">
                  Capitalization Rate is the ratio of Net Operating Income (NOI) to property asset value. It is used to estimate the investor's potential return on their investment.
                </p>
                <button 
                  onClick={() => navigate('/blog')}
                  className="text-xs font-bold text-charcoal inline-flex items-center gap-1.5 hover:text-primary transition-colors group focus:outline-none"
                >
                  <span>View Full Glossary</span> <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            
            {/* Tools & Calculators */}
            <div className="lg:col-span-8">
              <h3 className="font-display font-semibold text-lg md:text-xl text-charcoal mb-4">Tools & Calculators</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {tools.map((tool, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => alert(`Opening ${tool.title}...`)}
                    className="bg-white border border-border/80 rounded-[16px] p-5 shadow-2xs hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group flex flex-col"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#FDF0E9] flex items-center justify-center text-[#D35400] mb-4 group-hover:scale-110 transition-transform">
                      <tool.icon size={20} />
                    </div>
                    <h4 className="font-semibold text-charcoal text-sm mb-1 group-hover:text-primary transition-colors">{tool.title}</h4>
                    <p className="text-xs text-muted leading-relaxed">{tool.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Asset Library */}
      <section className="pb-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <h3 className="font-display font-semibold text-xl md:text-2xl text-charcoal">Asset Library</h3>
            <span className="bg-[#E6F4EA] text-[#0B4F45] text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border border-[#1E9E6A]/10">
              TEMPLATES
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {assets.map((asset, idx) => (
              <motion.div 
                key={idx} variants={fadeUp}
                onClick={() => alert(`Downloading ${asset.title}...`)}
                className="bg-white border border-border/80 rounded-[16px] p-6 shadow-2xs hover:shadow-md hover:border-primary/30 transition-all cursor-pointer flex flex-col group h-full"
              >
                <div className="w-10 h-10 rounded-lg bg-[#FDF0E9] flex items-center justify-center text-[#D35400] mb-4 group-hover:scale-110 transition-transform shrink-0">
                  <asset.icon size={20} />
                </div>
                <h4 className="font-display font-bold text-charcoal text-sm md:text-base leading-snug mb-2 group-hover:text-primary transition-colors">
                  {asset.title}
                </h4>
                <p className="text-xs text-muted leading-relaxed mb-8 flex-1">
                  {asset.desc}
                </p>
                <div className="pt-4 border-t border-border/40 flex items-center justify-between text-xs font-bold text-charcoal group-hover:text-primary transition-colors mt-auto">
                  <span>{asset.action}</span>
                  <Download size={15} className="text-muted group-hover:text-primary transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. As Seen In Leading Industry Publications */}
      <section className="py-14 border-t border-border/60 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p className="text-[11px] font-bold uppercase tracking-widest text-muted mb-8 select-none">
            As Seen In Leading Industry Publications
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14 opacity-50 grayscale hover:grayscale-0 hover:opacity-80 transition-all duration-300 select-none">
            <span className="font-display font-bold text-lg md:text-xl tracking-tight text-charcoal">PropertyWeek</span>
            <span className="font-display font-bold text-lg md:text-xl tracking-tight text-charcoal">EstateGazette</span>
            <span className="font-display font-bold text-lg md:text-xl tracking-tight text-charcoal">TechCrunch</span>
            <span className="font-display font-bold text-lg md:text-xl tracking-tight text-charcoal">Forbes Real Estate</span>
            <span className="font-display font-bold text-lg md:text-xl tracking-tight text-charcoal">BusinessDaily</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
