import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Search, ArrowRight, Download, ChevronRight, PlayCircle, 
  Calendar, Users, Briefcase, FileText, Wrench, BarChart2,
  BookOpen, ChevronDown, Clock
} from 'lucide-react';
import Button from '../../components/ui/Button';

// Animations
const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  })
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// Data
const filters = ['All Resources', 'Guides', 'Case Studies', 'Market Reports', 'Product Updates'];

const articles = [
  {
    type: 'GUIDE',
    title: 'Scaling Your Rental Portfolio: A 5-Step Strategic Plan',
    desc: 'Learn how to transition from local landlord to institutional-grade asset manager with our comprehensive scaling framework.',
    imgBg: 'bg-[#8CA2A6]', // Placeholder color mapping to image tone
    tagBg: 'bg-[#FDF0E9]',
    color: 'text-[#D35400]'
  },
  {
    type: 'CASE STUDY',
    title: 'UrbanLiving Group: 40% Growth in Efficiency',
    desc: 'How one of Kenya\'s fastest-growing residential firms automated their entire billing cycle using RentFlow.',
    imgBg: 'bg-[#A3B8B8]',
    tagBg: 'bg-[#E6F4EA]',
    color: 'text-[#0B4F45]'
  },
  {
    type: 'MARKET REPORT',
    title: 'Q3 2024: Rental Market Performance Index',
    desc: 'A comprehensive look at occupancy rates, yield trends, and tenant sentiment across major regional nodes.',
    imgBg: 'bg-[#D28D68]',
    tagBg: 'bg-[#FDF0E9]',
    color: 'text-[#D35400]'
  }
];

const featuredGuides = [
  { 
    title: 'The 2024 Property Management Guide', 
    desc: 'Everything you need to know to scale operations efficiently this year.',
    coverBg: 'bg-gradient-to-br from-[#0B4F45] to-[#0A3D36]',
    label: 'E-BOOK'
  },
  { 
    title: 'Maximizing Yields on Small Portfolios', 
    desc: 'Actionable strategies for landlords managing 1-10 units.',
    coverBg: 'bg-gradient-to-br from-[#D35400] to-[#b04500]',
    label: 'PLAYBOOK'
  },
  { 
    title: 'Tenant Screening Masterclass', 
    desc: 'How to reliably find and retain high-quality residents.',
    coverBg: 'bg-gradient-to-br from-blue-900 to-blue-950',
    label: 'CHEAT SHEET'
  }
];

const videos = [
  { title: 'Advanced Portfolio Diversification Strategies', tag: 'MASTERCLASS', duration: '18:24' },
  { title: 'Automating Monthly Rent Collection', tag: 'HOW-TO', duration: '08:45' },
  { title: 'Navigating New Property Tax Regulations', tag: 'WEBINAR', duration: '45:12' }
];

const sessions = [
  { date: '24 SEP', title: 'Mastering Tenant Retention in a Competitive Market', time: '14:00 PM GMT', speaker: 'Sarah Omondi, Head of Ops' },
  { date: '08 OCT', title: 'Tax Optimization for Multi-Property Owners', time: '10:00 AM EAT', speaker: 'David Chen, Financial Strategist' }
];

const forumThreads = [
  { title: 'Managing multi-generational tenants', details: '24 active participants • 12 new replies' },
  { title: 'e-Signatures for commercial units', details: '18 active participants • 5 new replies' },
  { title: 'Best practices for remote property inspections', details: '41 active participants • 8 new replies' }
];

const tools = [
  { icon: BarChart2, title: 'ROI Calculator', desc: 'Evaluate rental returns' },
  { icon: Briefcase, title: 'Cap Rate Estimator', desc: 'Assess property value' },
  { icon: Wrench, title: 'Maintenance Budgeter', desc: 'Plan for repairs' }
];

const assets = [
  { icon: FileText, title: 'Standard Residential Lease Agreement', desc: 'Comprehensive legal-vetted template for multiple regions.', price: 'Download PDF' },
  { icon: BookOpen, title: 'Move-In/Move-Out Checklist', desc: 'Ensure thorough inspections and security deposit clarity.', price: 'Download XLSX' },
  { icon: FileText, title: 'Notice to Quit / Late Payment form', desc: 'Professional communication for rent arrears.', price: 'Download PDF' },
  { icon: Wrench, title: 'Maintenance Request Log', desc: 'Track issues, costs, and resolution times.', price: 'Download PDF' }
];

const Resources = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Resources');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/blog?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="w-full bg-[#FDFBF7] font-body">
      {/* 1. Hero Section */}
      <section className="pt-16 pb-12 md:pt-20 md:pb-16" aria-label="Resources Hero">
        <div className="max-w-[1000px] mx-auto px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="font-display font-bold text-charcoal text-[36px] md:text-[44px] leading-tight mb-8">
              Insights to Power Your<br/>Property Portfolio
            </h1>
            
            <form onSubmit={handleSearch} className="max-w-[500px] mx-auto relative flex items-center mb-6">
              <div className="absolute left-4 text-muted">
                <Search size={18} />
              </div>
              <input 
                type="text" 
                placeholder="Search for guides, market reports, or templates..." 
                className="w-full h-[48px] pl-11 pr-4 rounded-lg border border-border/40 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 text-charcoal text-[14px] bg-white transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </motion.div>
        </div>
      </section>

      {/* 2. Featured Report */}
      <section className="pb-12">
        <div className="max-w-[1000px] mx-auto px-6">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }} 
            variants={fadeUp}
            className="w-full rounded-[24px] bg-[#0B4F45] overflow-hidden relative flex flex-col md:flex-row items-center p-8 md:p-12 shadow-lg"
          >
            <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 pointer-events-none mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B4F45] via-[#0B4F45]/90 to-transparent pointer-events-none z-10"></div>
            
            <div className="relative z-20 w-full md:w-[60%] lg:w-[50%]">
              <span className="inline-block bg-[#D35400] text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded mb-4">
                FEATURED REPORT
              </span>
              <h2 className="font-display font-bold text-white text-[28px] md:text-[36px] leading-[1.15] mb-4">
                The 2024 State of African Property Management
              </h2>
              <p className="text-white/80 text-[14px] mb-8 leading-relaxed max-w-sm">
                An in-depth analysis of emerging trends, regulatory shifts, and technological adoption across high-growth African real estate markets.
              </p>
              <button className="bg-white text-charcoal hover:bg-gray-50 border border-transparent rounded-[8px] px-5 py-2.5 text-[14px] font-semibold flex items-center gap-2 transition-colors">
                Download Report <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Filters Bar */}
      <section className="pb-8">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-border/40 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all ${
                    activeFilter === filter 
                      ? 'bg-[#0B4F45] text-white' 
                      : 'bg-transparent text-muted hover:bg-border/20'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1.5 text-[13px] text-muted font-medium cursor-pointer hover:text-charcoal transition-colors">
              Sort by: <span className="text-charcoal font-semibold flex items-center gap-1">Newest First <ChevronDown size={14} /></span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Success Stories */}
      <section className="pb-12">
        <div className="max-w-[1000px] mx-auto px-6">
          <h3 className="font-display font-medium text-[#4A5568] text-[20px] mb-6">Success Stories</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-border/40 rounded-[20px] p-6 shadow-sm flex flex-col h-full">
              <div className="flex justify-between items-start gap-4 mb-8">
                <p className="text-charcoal italic text-[14px] leading-relaxed flex-1">
                  "RentFlow transformed how we handle our 400+ unit portfolio. The automation features alone saved us 20 hours of manual work per week."
                </p>
                <div className="bg-[#E6F4EA] text-[#0B4F45] rounded-xl p-3 flex flex-col items-center justify-center shrink-0 w-[110px]">
                  <span className="font-display font-bold text-[28px] leading-none mb-1">40%</span>
                  <span className="text-[8px] uppercase tracking-wider font-bold text-center">EFFICIENCY GAIN</span>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full bg-charcoal/10 overflow-hidden"></div>
                <div>
                  <p className="font-bold text-charcoal text-[13px]">James Mwangi</p>
                  <p className="text-muted text-[11px]">CEO, UrbanLiving Group</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-border/40 rounded-[20px] p-6 shadow-sm flex flex-col h-full">
              <div className="flex justify-between items-start gap-4 mb-8">
                <p className="text-charcoal italic text-[14px] leading-relaxed flex-1">
                  "The delinquency tracking and automated reminders reduced our late payments significantly within the first quarter of implementation."
                </p>
                <div className="bg-[#E6F4EA] text-[#0B4F45] rounded-xl p-3 flex flex-col items-center justify-center shrink-0 w-[110px]">
                  <span className="font-display font-bold text-[28px] leading-none mb-1">25%</span>
                  <span className="text-[8px] uppercase tracking-wider font-bold text-center">LOWER DELINQUENCY</span>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full bg-charcoal/10 overflow-hidden"></div>
                <div>
                  <p className="font-bold text-charcoal text-[13px]">Sarah Omondi</p>
                  <p className="text-muted text-[11px]">Operations Director, Prime Assets</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Articles Grid */}
      <section className="pb-16">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {articles.map((article, idx) => (
              <div key={idx} className="bg-white border border-border/40 rounded-[20px] shadow-sm group cursor-pointer hover:shadow-md transition-all flex flex-col overflow-hidden">
                <div className={`w-full h-[180px] ${article.imgBg} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300"></div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className={`inline-block w-fit text-[9px] font-bold uppercase tracking-wider mb-3 px-2.5 py-1 rounded ${article.tagBg} ${article.color}`}>
                    {article.type}
                  </span>
                  <h3 className="font-display font-semibold text-charcoal text-[18px] mb-3 leading-snug group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-[13px] text-muted mb-6 flex-1 line-clamp-3">
                    {article.desc}
                  </p>
                  <span className="text-[12px] font-bold text-charcoal flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read More <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PRESERVED Guides & Playbooks */}
      <section id="guides" className="py-16 bg-[#EBE9E4] my-8 rounded-[40px] mx-4 md:mx-auto max-w-[1000px]" aria-label="Featured Guides">
        <div className="px-8 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-[10px] font-bold text-[#D35400] uppercase tracking-widest mb-2">DOWNLOADS</p>
              <h2 className="font-display font-bold text-charcoal text-[32px]">Guides & Playbooks.</h2>
            </div>
            <button className="bg-white border border-border/60 hover:bg-gray-50 text-[13px] font-semibold px-4 py-2 rounded-lg transition-colors">
              View all downloads
            </button>
          </div>

          <motion.div className="grid md:grid-cols-3 gap-6" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
            {featuredGuides.map((guide, idx) => (
              <motion.div key={idx} variants={fadeUp} className="flex flex-col group">
                <div className={`w-full aspect-[4/3] rounded-[20px] ${guide.coverBg} p-6 flex flex-col justify-between mb-4 shadow-sm relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                  <span className="inline-block bg-white/20 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded w-fit">
                    {guide.label}
                  </span>
                  <div>
                    <div className="w-8 h-1 bg-white/30 mb-3 rounded-full"></div>
                    <h3 className="font-display font-semibold text-white text-[20px] leading-tight pr-2">{guide.title}</h3>
                  </div>
                </div>
                <h4 className="font-semibold text-charcoal text-[15px] mb-1.5 px-1">{guide.title}</h4>
                <p className="text-[13px] text-muted mb-4 px-1 line-clamp-2 flex-1">{guide.desc}</p>
                <div className="px-1">
                  <button className="text-[#D35400] hover:text-[#b04500] p-0 h-auto font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5 transition-colors">
                    <Download size={14} /> Download PDF
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. Newsletter Signup */}
      <section className="py-12">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="bg-[#F3F2EE] rounded-[24px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-[55%]">
              <h2 className="font-display font-semibold text-charcoal text-[28px] mb-3">
                Join 2,000+ Property Professionals
              </h2>
              <p className="text-charcoal/70 text-[14px]">
                Get exclusive market data, regulatory updates, and management tips delivered straight to your inbox once a week.
              </p>
            </div>
            <div className="md:w-[45%] w-full">
              <div className="flex bg-white rounded-lg p-1.5 border border-border/60 shadow-sm focus-within:border-primary/40 transition-colors">
                <input 
                  type="email" 
                  placeholder="work@company.com" 
                  className="flex-1 bg-transparent border-none focus:ring-0 focus:outline-none px-4 text-charcoal text-[14px]"
                />
                <button className="bg-[#0B4F45] hover:bg-[#083b33] text-white rounded-[6px] px-6 py-2.5 text-[13px] font-semibold transition-colors">
                  Join Now
                </button>
              </div>
              <p className="text-[10px] text-muted mt-2 text-center md:text-left px-2">
                We respect your inbox. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Video Learning Center */}
      <section className="py-12">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display font-medium text-[#4A5568] text-[20px]">Video Learning Center</h2>
            <button className="text-[13px] font-semibold text-charcoal flex items-center gap-1 hover:text-primary transition-colors">
              Browse All Videos <ChevronRight size={14} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {videos.map((video, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="w-full aspect-video rounded-[16px] bg-[#3B4D4B] relative overflow-hidden mb-4 flex items-center justify-center">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  <PlayCircle size={48} className="text-white/90 group-hover:text-white group-hover:scale-110 transition-all z-10" strokeWidth={1.5} />
                  <span className="absolute bottom-3 right-3 bg-black/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded z-20">
                    {video.duration}
                  </span>
                </div>
                <span className="inline-block bg-[#E6F4EA] text-[#0B4F45] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded mb-2">
                  {video.tag}
                </span>
                <h3 className="font-semibold text-charcoal text-[16px] leading-tight group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Upcoming Expert Sessions */}
      <section className="py-12">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display font-medium text-[#4A5568] text-[20px]">Upcoming Expert Sessions</h2>
            <button className="text-[13px] font-semibold text-charcoal flex items-center gap-1 hover:text-primary transition-colors">
              View All Events <ChevronRight size={14} />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {sessions.map((session, idx) => (
              <div key={idx} className="bg-white border border-border/40 rounded-[16px] p-5 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm hover:border-charcoal/20 transition-colors">
                <div className="flex items-center gap-5 w-full">
                  <div className="w-[60px] h-[60px] rounded-[12px] bg-[#F3F2EE] flex flex-col items-center justify-center shrink-0 border border-border/40">
                    <span className="font-display font-bold text-[18px] text-charcoal leading-none mb-0.5">{session.date.split(' ')[0]}</span>
                    <span className="text-[9px] font-bold text-[#D35400] uppercase tracking-wider">{session.date.split(' ')[1]}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal text-[16px] mb-1">{session.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-[12px] text-muted">
                      <span className="flex items-center gap-1.5"><Clock size={12} /> {session.time}</span>
                      <span className="flex items-center gap-1.5"><Users size={12} /> {session.speaker}</span>
                    </div>
                  </div>
                </div>
                <button className="bg-[#0B4F45] hover:bg-[#083b33] text-white px-6 py-2 rounded-lg text-[13px] font-semibold shrink-0 transition-colors">
                  Register
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Community Forum Banner */}
      <section className="py-8">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="bg-[#0B4F45] rounded-[24px] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="md:w-1/2">
              <span className="inline-block bg-[#D35400] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded mb-4">
                COMMUNITY HUB
              </span>
              <h2 className="font-display font-bold text-white text-[32px] leading-tight mb-3">
                Connect with 5,000+ Landlords
              </h2>
              <p className="text-white/80 text-[14px] mb-6">
                Share advice, solve problems, and grow together in our exclusive member forum.
              </p>
              <button className="bg-white text-charcoal font-semibold px-5 py-2.5 rounded-lg text-[13px] hover:bg-gray-50 transition-colors">
                Join Discussion
              </button>
            </div>
            
            <div className="md:w-1/2 w-full flex flex-col gap-3">
              {forumThreads.map((thread, idx) => (
                <div key={idx} className="bg-white/10 hover:bg-white/15 border border-white/10 rounded-lg p-4 cursor-pointer transition-colors">
                  <h4 className="font-semibold text-white text-[14px] mb-1">{thread.title}</h4>
                  <p className="text-white/60 text-[11px]">{thread.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 11. Tools & Calculators */}
      <section className="py-12 bg-[#F9F9F6]">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <h3 className="font-display font-medium text-[#4A5568] text-[18px] mb-6">Term of the Day</h3>
              <h4 className="font-bold text-[#D35400] text-[20px] mb-2">Cap Rate</h4>
              <p className="text-[13px] text-charcoal/80 mb-4 leading-relaxed">
                Capitalization Rate is the ratio of Net Operating Income (NOI) to property asset value. It is used to estimate the investor's potential return on their investment.
              </p>
              <button className="text-[12px] font-bold text-charcoal flex items-center gap-1 hover:text-primary transition-colors">
                View full Glossary <ArrowRight size={14} />
              </button>
            </div>
            
            <div className="md:col-span-3">
              <h3 className="font-display font-medium text-[#4A5568] text-[18px] mb-6">Tools & Calculators</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {tools.map((tool, idx) => (
                  <div key={idx} className="bg-white border border-border/40 rounded-[16px] p-5 shadow-sm hover:shadow-md cursor-pointer transition-all">
                    <tool.icon size={20} className="text-[#D35400] mb-4" />
                    <h4 className="font-semibold text-charcoal text-[15px] mb-1">{tool.title}</h4>
                    <p className="text-[12px] text-muted">{tool.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Asset Library */}
      <section className="py-12 bg-[#F9F9F6]">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <h3 className="font-display font-medium text-[#4A5568] text-[20px]">Asset Library</h3>
            <span className="bg-[#E6F4EA] text-[#0B4F45] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">TEMPLATES</span>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {assets.map((asset, idx) => (
              <div key={idx} className="bg-white border border-border/40 rounded-[16px] p-5 shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col">
                <asset.icon size={18} className="text-[#D35400] mb-4" />
                <h4 className="font-semibold text-charcoal text-[14px] leading-snug mb-2">{asset.title}</h4>
                <p className="text-[12px] text-muted mb-4 flex-1">{asset.desc}</p>
                <span className="text-[11px] font-bold text-charcoal flex items-center gap-1">
                  <Download size={12} /> {asset.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. As Seen In */}
      <section className="py-12 border-t border-border/40 bg-white">
        <div className="max-w-[1000px] mx-auto px-6 text-center">
          <p className="text-[10px] uppercase tracking-widest text-muted font-bold mb-8">
            As Seen In Leading Industry Publications
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60 grayscale">
            <span className="font-display font-bold text-[20px]">Property Week</span>
            <span className="font-display font-bold text-[20px]">EstatesGazette</span>
            <span className="font-display font-bold text-[20px]">TechCrunch</span>
            <span className="font-display font-bold text-[20px]">Forbes Real Estate</span>
            <span className="font-display font-bold text-[20px]">BusinessDaily</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
