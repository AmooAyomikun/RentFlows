import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { User, ShieldCheck, Phone, Mail, MapPin, Calendar, FileText, CheckCircle2, Edit3, ArrowRight, Award, TrendingUp, Download, Star, CheckCircle, AlertCircle, Camera, Image as ImageIcon } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import useAuthStore from '../../store/authStore';
import Modal from '../../components/ui/Modal';

const presetAvatars = [
  { id: 'av-1', label: 'Executive Male (Default)', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80' },
  { id: 'av-2', label: 'Professional Female', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80' },
  { id: 'av-3', label: 'Modern Portrait', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80' },
  { id: 'av-4', label: 'Corporate Tech', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80' },
  { id: 'av-5', label: 'Business Casual', url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80' },
  { id: 'av-6', label: 'Minimalist Portrait', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80' },
];

const reputationHistory = [
  { id: 'rep-1', date: 'Jun 30, 2026', action: 'Settled Annual Rent via NIBSS 2 days early', change: '+25 pts', type: 'positive' },
  { id: 'rep-2', date: 'May 15, 2026', action: 'Passed Bi-Annual Facility Inspection with 5-Star rating', change: '+15 pts', type: 'positive' },
  { id: 'rep-3', date: 'Mar 10, 2026', action: 'Prompt settlement of Estate Utility adjustment', change: '+10 pts', type: 'positive' },
  { id: 'rep-4', date: 'Jan 05, 2026', action: 'NIN & BVN Identity Re-verification completed', change: '+20 pts', type: 'positive' },
];

const TenantProfile = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'reputation'
  const [profileImg, setProfileImg] = useState(user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80');
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileImg(url);
      updateUser({ avatar: url });
      toast.success('Profile photo uploaded and synced across portal!');
    }
  };

  const handleSelectPresetAvatar = (url) => {
    setProfileImg(url);
    updateUser({ avatar: url });
    setShowAvatarModal(false);
    toast.success('Profile photo updated from gallery!');
  };

  const emergencyContacts = [
    { name: 'Chidinma Adeleke', relation: 'Spouse', phone: '+234 802 987 6543' },
    { name: 'Babatunde Adeleke', relation: 'Brother', phone: '+234 803 234 5678' }
  ];

  const handleDownloadPassport = () => {
    toast.success('RentFlow Trust Passport PDF generated! Dispatching encrypted copy to ayomikun.adeleke@rentflows.ng.');
  };

  return (
    <div className="space-y-6 w-full font-sans text-[#4A4F4C] pb-16">
      
      {/* Title Section & Navigation Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-display font-extrabold text-[#0B4F45] m-0 tracking-tight">
            Resident Profile & Trust Passport
          </h1>
          <p className="text-xs sm:text-sm text-[#4A4F4C] font-medium mt-1 m-0">
            Personal identity verification, active tenancy records, and verified rental reputation credentials.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-2xl shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border-none flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'bg-[#0B4F45] text-white shadow-xs'
                : 'bg-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <User size={15} />
            <span>Identity & Lease</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('reputation')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border-none flex items-center gap-2 ${
              activeTab === 'reputation'
                ? 'bg-[#0B4F45] text-white shadow-xs'
                : 'bg-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Award size={15} className="text-[#C75B30]" />
            <span>🏆 Trust Score (845)</span>
          </button>
        </div>
      </div>

      {activeTab === 'reputation' ? (
        /* ── REPUTATION SCORE & TRUST PASSPORT VIEW ── */
        <div className="space-y-6 animate-fade-in">
          
          {/* Hero Trust Meter Card */}
          <div className="dashboard-card bg-[#0B4F45] text-white p-6 sm:p-8 rounded-2xl shadow-md relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div className="space-y-3 max-w-xl">
                <div className="flex items-center gap-2.5">
                  <span className="bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck size={14} /> Tier 1 • Prime Resident
                  </span>
                  <span className="bg-[#C75B30] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Top 5% in Lagos
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white m-0">
                  RentFlow Reputation Score
                </h2>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed m-0">
                  Your reputation score is algorithmically calculated from NIBSS payment timestamps, facility inspection reports, and landlord recommendations. Share your digital badge with future landlords.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleDownloadPassport}
                    className="px-5 py-3 rounded-xl bg-[#C75B30] hover:bg-[#b04a25] text-white font-bold text-xs sm:text-sm border-none cursor-pointer shadow-md transition-all flex items-center gap-2"
                  >
                    <Download size={16} />
                    <span>Download Official Trust Passport (Encrypted PDF)</span>
                  </button>
                </div>
              </div>

              {/* Big Gauge Display */}
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 text-center min-w-[260px] flex flex-col items-center">
                <span className="text-xs text-white/70 font-bold uppercase tracking-wider mb-2">Overall Score</span>
                <div className="text-5xl sm:text-6xl font-mono font-black text-[#F4C395] tracking-tight">
                  845
                </div>
                <span className="text-xs font-bold text-white/90 mt-1">out of 1000 max points</span>
                
                {/* Visual Bar */}
                <div className="w-full bg-black/30 h-3 rounded-full mt-4 overflow-hidden p-0.5 border border-white/10">
                  <div className="bg-gradient-to-r from-[#C75B30] via-[#F4C395] to-emerald-400 h-full rounded-full transition-all duration-700 w-[84.5%]"></div>
                </div>
                <span className="text-[11px] text-emerald-300 font-extrabold mt-2 block">
                  ↗ +45 points earned over past 12 months
                </span>
              </div>
            </div>
          </div>

          {/* 4 Pillars Grid */}
          <div>
            <h3 className="dashboard-title text-lg font-bold text-[#0B4F45] m-0 mb-4">
              Core Reputation Pillars
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="dashboard-card bg-white p-5 rounded-2xl border border-gray-200 card-shadow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[11px] font-bold text-gray-500 uppercase font-mono">Weight: 45%</span>
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-2.5 py-0.5 rounded-full">100/100</span>
                  </div>
                  <h4 className="dashboard-card-title text-base font-bold text-[#0B4F45] m-0 mb-1">
                    Payment Punctuality
                  </h4>
                  <p className="dashboard-body-text text-xs text-[#4A4F4C] m-0 leading-relaxed">
                    12 of 12 consecutive rent and utility charges settled on or before the due date via direct NIBSS transfer.
                  </p>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full mt-4 overflow-hidden">
                  <div className="bg-[#0B4F45] h-full w-full"></div>
                </div>
              </div>

              <div className="dashboard-card bg-white p-5 rounded-2xl border border-gray-200 card-shadow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[11px] font-bold text-gray-500 uppercase font-mono">Weight: 25%</span>
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-2.5 py-0.5 rounded-full">92/100</span>
                  </div>
                  <h4 className="dashboard-card-title text-base font-bold text-[#0B4F45] m-0 mb-1">
                    Property Upkeep
                  </h4>
                  <p className="dashboard-body-text text-xs text-[#4A4F4C] m-0 leading-relaxed">
                    Passed bi-annual facility checks with excellent marks. Zero structural damage claims or security deposit deductions.
                  </p>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full mt-4 overflow-hidden">
                  <div className="bg-[#0B4F45] h-full w-[92%]"></div>
                </div>
              </div>

              <div className="dashboard-card bg-white p-5 rounded-2xl border border-gray-200 card-shadow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[11px] font-bold text-gray-500 uppercase font-mono">Weight: 15%</span>
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-2.5 py-0.5 rounded-full">88/100</span>
                  </div>
                  <h4 className="dashboard-card-title text-base font-bold text-[#0B4F45] m-0 mb-1">
                    Community Harmony
                  </h4>
                  <p className="dashboard-body-text text-xs text-[#4A4F4C] m-0 leading-relaxed">
                    Full compliance with Victoria Island Towers HOA bylaws. Zero noise infractions or neighbor disputes.
                  </p>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full mt-4 overflow-hidden">
                  <div className="bg-[#0B4F45] h-full w-[88%]"></div>
                </div>
              </div>

              <div className="dashboard-card bg-white p-5 rounded-2xl border border-gray-200 card-shadow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[11px] font-bold text-gray-500 uppercase font-mono">Weight: 15%</span>
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-2.5 py-0.5 rounded-full">95/100</span>
                  </div>
                  <h4 className="dashboard-card-title text-base font-bold text-[#0B4F45] m-0 mb-1">
                    KYC & Identity
                  </h4>
                  <p className="dashboard-body-text text-xs text-[#4A4F4C] m-0 leading-relaxed">
                    National Identity Number (NIN), BVN biometric match, and corporate employment stability verified.
                  </p>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full mt-4 overflow-hidden">
                  <div className="bg-[#0B4F45] h-full w-[95%]"></div>
                </div>
              </div>

            </div>
          </div>

          {/* Unlocked Privileges & Timeline Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Unlocked Benefits */}
            <div className="lg:col-span-7 dashboard-card bg-white rounded-2xl p-6 border border-gray-200 card-shadow space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="dashboard-title text-base font-bold text-[#0B4F45] m-0 flex items-center gap-2">
                  <Star size={18} className="text-[#C75B30] fill-[#C75B30]" />
                  Unlocked Resident Privileges (Tier 1)
                </h3>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">Active</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-teal-50/50 border border-teal-100">
                  <CheckCircle size={20} className="text-[#0B4F45] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#0B4F45] m-0">Zero Security Deposit Eligibility</h4>
                    <p className="text-xs text-[#4A4F4C] m-0 mt-0.5">
                      Your 845 score qualifies you for 100% deposit waivers at any participating RentFlow property nationwide.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-teal-50/50 border border-teal-100">
                  <CheckCircle size={20} className="text-[#0B4F45] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#0B4F45] m-0">Preferential Split Financing Rates</h4>
                    <p className="text-xs text-[#4A4F4C] m-0 mt-0.5">
                      Access instant Kwara Cooperative credit split plans at discounted 1.5% interest rates without guarantor hassle.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-teal-50/50 border border-teal-100">
                  <CheckCircle size={20} className="text-[#0B4F45] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#0B4F45] m-0">VIP Priority Maintenance Dispatch</h4>
                    <p className="text-xs text-[#4A4F4C] m-0 mt-0.5">
                      Tickets reported from your unit receive top priority queue status with guaranteed 2-hour technician SLA.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Score Activity Ledger */}
            <div className="lg:col-span-5 dashboard-card bg-white rounded-2xl p-6 border border-gray-200 card-shadow space-y-4">
              <h3 className="dashboard-title text-base font-bold text-[#0B4F45] m-0 pb-3 border-b border-gray-100 flex items-center gap-2">
                <TrendingUp size={18} className="text-emerald-600" />
                Score Activity & Growth Log
              </h3>

              <div className="space-y-3">
                {reputationHistory.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100 text-xs">
                    <div>
                      <p className="font-bold text-gray-900 m-0">{item.action}</p>
                      <span className="text-[10px] text-gray-500 block mt-0.5">{item.date}</span>
                    </div>
                    <span className="font-mono font-black text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg shrink-0">
                      {item.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      ) : (
        /* ── IDENTITY & LEASE VIEW (Original Profile Layout Enhanced) ── */
        <div className="space-y-6 animate-fade-in">
          {/* Hero Profile Banner */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
            <div className="h-28 bg-gradient-to-r from-[#0B4F45] via-[#0b5c51] to-[#168070] relative"></div>
            <div className="px-6 pb-6 pt-0 relative flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-12">
              <div className="flex items-end gap-4">
                <div className="relative group shrink-0">
                  <div className="w-24 h-24 rounded-2xl border-4 border-white overflow-hidden shadow-md bg-white">
                    <img src={profileImg} alt="Tenant" className="w-full h-full object-cover" />
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImageUpload} 
                    accept="image/*" 
                    className="hidden" 
                  />
                  <button 
                    onClick={() => setShowAvatarModal(true)}
                    className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#0B4F45] hover:bg-[#063831] text-white rounded-xl flex items-center justify-center shadow-md transition-all cursor-pointer ring-2 ring-white border-none group-hover:scale-110"
                    title="Change Profile Picture"
                  >
                    <Camera size={14} />
                  </button>
                </div>
                <div className="mb-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-black text-gray-900 m-0">{user?.name || "Ayomikun Adeleke"}</h2>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                      <ShieldCheck size={12} /> Verified Resident
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium m-0 mt-0.5">Primary Occupant • Suite #402-B</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('/tenant/settings')}
                  className="px-4 py-2 bg-[#0B4F45] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs hover:opacity-90 transition-all cursor-pointer border-none"
                >
                  <Edit3 size={14} /> Edit Settings
                </button>
              </div>
            </div>
          </div>

          {/* Grid Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column: Personal Information */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-xs space-y-4">
                <h3 className="text-sm font-bold uppercase text-gray-800 tracking-wider m-0 pb-3 border-b border-gray-100">Personal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Full Legal Name</label>
                    <p className="text-sm font-bold text-gray-900 mt-0.5 m-0">Ayomikun Adeleke</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Preferred Display Name</label>
                    <p className="text-sm font-bold text-gray-900 mt-0.5 m-0">Ayo</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Verified Email Address</label>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Mail size={14} className="text-gray-400" />
                      <span className="text-sm font-semibold text-gray-800">ayomikun.adeleke@rentflows.ng</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Primary Mobile Phone</label>
                    <div className="flex items-center gap-1.5 mt-0.5 font-mono">
                      <Phone size={14} className="text-gray-400" />
                      <span className="text-sm font-semibold text-gray-800">+234 803 123 4567</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tenancy & Unit Summary */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-xs space-y-4">
                <h3 className="text-sm font-bold uppercase text-gray-800 tracking-wider m-0 pb-3 border-b border-gray-100">Active Lease & Property Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Property Complex</label>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <MapPin size={14} className="text-[#C75B30]" />
                      <span className="text-sm font-bold text-gray-900">Victoria Island Towers</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Apartment Unit</label>
                    <p className="text-sm font-bold text-gray-900 mt-0.5 m-0">Suite #402-B (2 Bed, 2 Bath)</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Lease Duration</label>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Calendar size={14} className="text-gray-400" />
                      <span className="text-sm font-semibold text-gray-800">Jan 01, 2026 – Dec 31, 2026</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Security Deposit Status</label>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <CheckCircle2 size={14} className="text-emerald-600" />
                      <span className="text-sm font-bold text-emerald-700">₦3,200,000 (Escrow Protected)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Emergency & Verification */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-xs space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <h3 className="text-sm font-bold uppercase text-gray-800 tracking-wider m-0">Emergency Contacts</h3>
                  <button 
                    onClick={() => navigate('/tenant/settings')}
                    className="text-[11px] font-bold text-[#0B4F45] hover:underline cursor-pointer bg-transparent border-none"
                  >
                    + Manage
                  </button>
                </div>
                <div className="space-y-3">
                  {emergencyContacts.map((c, i) => (
                    <div key={i} className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-900">{c.name}</span>
                        <span className="text-[10px] px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full font-bold">{c.relation}</span>
                      </div>
                      <a href={`tel:${c.phone}`} className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#0B4F45] hover:underline mt-1">
                        <Phone size={12} /> {c.phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#0B4F45] text-white rounded-xl p-6 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-[#84bfb2]">
                  <FileText size={18} />
                  <span className="text-xs font-bold uppercase tracking-wider">Verification Status</span>
                </div>
                <h4 className="text-base font-bold text-white m-0">KYC & Digital Signatures</h4>
                <p className="text-xs text-white/80 leading-relaxed m-0">
                  Your identity has been verified via National Identity Number (NIN) check. All active leases are digitally signed under Nigerian Tenancy Laws.
                </p>
                <button
                  onClick={() => navigate('/tenant/lease')}
                  className="w-full mt-2 py-2.5 px-4 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-between transition-all cursor-pointer border border-white/20"
                >
                  <span>View Signed Agreement</span>
                  <ArrowRight size={14} />
                </button>
            </div>
          </div>
        </div>
        </div>
      )}

      {/* Avatar Gallery Modal */}
      <Modal isOpen={showAvatarModal} onClose={() => setShowAvatarModal(false)} title="Update Profile Avatar">
        <div className="space-y-4 text-[#1E293B]">
          <p className="text-xs text-gray-600 leading-relaxed m-0">
            Choose from verified prime resident portraits or upload directly from your device.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-80 overflow-y-auto p-1">
            {presetAvatars.map((av) => (
              <div 
                key={av.id}
                onClick={() => handleSelectPresetAvatar(av.url)}
                className={`group relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all hover:scale-[1.02] ${profileImg === av.url ? 'border-[#0B4F45] ring-2 ring-[#0B4F45]/30 shadow-md' : 'border-gray-200 hover:border-[#0B4F45]/60'}`}
              >
                <img src={av.url} alt={av.label} className="w-full h-28 object-cover" />
                <div className="p-2 bg-white text-center">
                  <p className="text-[11px] font-bold text-gray-800 truncate m-0">{av.label}</p>
                </div>
                {profileImg === av.url && (
                  <div className="absolute top-2 right-2 bg-[#0B4F45] text-white p-1 rounded-full shadow-sm">
                    <CheckCircle2 size={14} />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={() => {
                setShowAvatarModal(false);
                fileInputRef.current?.click();
              }}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold transition-colors border-none cursor-pointer flex items-center gap-2"
            >
              <Camera size={14} />
              <span>Upload Custom Photo...</span>
            </button>
            <button
              type="button"
              onClick={() => setShowAvatarModal(false)}
              className="px-5 py-2 bg-[#0B4F45] text-white rounded-xl text-xs font-bold border-none cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TenantProfile;
