import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShieldCheck, Phone, Mail, MapPin, Calendar, FileText, CheckCircle2, Edit3, ArrowRight } from 'lucide-react';

const TenantProfile = () => {
  const navigate = useNavigate();
  const [profileImg] = useState('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80');

  const emergencyContacts = [
    { name: 'Chidinma Adeleke', relation: 'Spouse', phone: '+234 802 987 6543' },
    { name: 'Babatunde Adeleke', relation: 'Brother', phone: '+234 803 234 5678' }
  ];

  return (
    <div className="space-y-6 w-full text-[#1E293B] pb-8">
      {/* Title Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 m-0">Resident Profile</h1>
          <p className="text-xs text-gray-500 mt-1 m-0">Personal identity verification, active tenancy details, and registered emergency contacts.</p>
        </div>
        <button
          onClick={() => navigate('/tenant/settings')}
          className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs hover:bg-primary-container transition-all cursor-pointer border-none"
        >
          <Edit3 size={14} /> Edit Profile & Settings
        </button>
      </div>

      {/* Hero Profile Banner */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
        <div className="h-28 bg-gradient-to-r from-[#04332C] via-[#0b5c51] to-[#168070] relative"></div>
        <div className="px-6 pb-6 pt-0 relative flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-12">
          <div className="flex items-end gap-4">
            <div className="w-24 h-24 rounded-2xl border-4 border-white overflow-hidden shadow-md bg-white shrink-0">
              <img src={profileImg} alt="Tenant" className="w-full h-full object-cover" />
            </div>
            <div className="mb-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-gray-900 m-0">Ayomikun Adeleke</h2>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck size={12} /> Verified Resident
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium m-0 mt-0.5">Primary Occupant • Suite #402-B</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-bold font-mono">ID: RF-TEN-8921</span>
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
                className="text-[11px] font-bold text-primary hover:underline cursor-pointer bg-transparent border-none"
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
                  <a href={`tel:${c.phone}`} className="flex items-center gap-1.5 text-xs font-mono font-bold text-primary hover:underline mt-1">
                    <Phone size={12} /> {c.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#04332C] text-white rounded-xl p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-[#84bfb2]">
              <FileText size={18} />
              <span className="text-xs font-bold uppercase tracking-wider">Verification Status</span>
            </div>
            <h4 className="text-base font-bold text-white m-0">KYC & Digital Signatures</h4>
            <p className="text-xs text-white/80 leading-relaxed m-0">
              Your identity has been verified via National Identity Number (NIN) check. All active leases are digitally signed and timestamped under Nigerian Tenancy Laws.
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
  );
};

export default TenantProfile;
