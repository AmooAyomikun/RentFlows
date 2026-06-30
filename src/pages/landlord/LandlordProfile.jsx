import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2, Mail, Star, ChevronRight, Trophy, MapPin, Camera
} from 'lucide-react';
import { toast } from 'sonner';

const managedProperties = [
  {
    id: 'mp1',
    name: 'Victoria Island Towers',
    location: 'Victoria Island, Lagos',
    tag: 'LUXURY RESIDENTIAL',
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
    stat1Label: 'UNITS', stat1Val: '42',
    stat2Label: 'YIELD', stat2Val: '14.2%',
  },
  {
    id: 'mp2',
    name: 'Lekki Tech Plaza',
    location: 'Lekki Phase 1, Lagos',
    tag: 'COMMERCIAL',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
    stat1Label: 'SQFT', stat1Val: '120K',
    stat2Label: 'OCCUPANCY', stat2Val: '100%', stat2Color: 'text-emerald-600 font-extrabold',
  },
  {
    id: 'mp3',
    name: 'Maitama Lofts',
    location: 'Maitama, Abuja',
    tag: 'MIXED-USE',
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
    stat1Label: 'UNITS', stat1Val: '18',
    stat2Label: 'LTV', stat2Val: '45%',
  },
  {
    id: 'mp4',
    name: 'Banana Island Estates',
    location: 'Ikoyi, Lagos',
    tag: 'LUXURY RESIDENTIAL',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
    stat1Label: 'UNITS', stat1Val: '12',
    stat2Label: 'YIELD', stat2Val: '16.1%',
  },
];

const specialties = [
  'Luxury Residential',
  'Commercial Leasing',
  'Asset Optimization',
  'Risk Management',
  'PropTech Strategy',
];

const LandlordProfile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [profileImg, setProfileImg] = useState(() => localStorage.getItem('rentflows_profile_image') || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80');

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setProfileImg(base64String);
        localStorage.setItem('rentflows_profile_image', base64String);
        toast.success('Profile image updated successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="font-sans text-gray-900 pb-12 max-w-6xl mx-auto">
      {/* ── TOP HERO BANNER & PHOTO AREA ── */}
      <div className="relative mb-8">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80"
          alt="Banner"
          className="h-48 sm:h-56 rounded-2xl object-cover w-full shadow-2xs brightness-90"
        />

        {/* Profile Details Overlay Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between px-6 sm:px-10 -mt-16 relative z-10 gap-4">
          <div className="flex flex-col sm:flex-row sm:items-end gap-6">
            <div className="relative shrink-0 cursor-pointer group" onClick={() => fileInputRef.current?.click()} title="Click to upload profile photo">
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
              <img
                src={profileImg}
                alt="Chief Oladapo Adewale"
                className="w-32 h-32 rounded-2xl border-4 border-white shadow-md object-cover bg-white group-hover:opacity-90 transition-opacity"
              />
              <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-[#072F29] text-white flex items-center justify-center shadow-md group-hover:bg-[#C75B30] transition-colors">
                <Camera size={14} />
              </div>
            </div>
            <div className="pb-2">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight m-0">Chief Oladapo Adewale</h1>
                <span className="bg-[#E77D53] text-white rounded-full px-3 py-1 text-xs font-bold inline-flex items-center gap-1 shadow-2xs">
                  <CheckCircle2 size={13} strokeWidth={3} />
                  <span>Verified</span>
                </span>
              </div>
            </div>
          </div>

          <div className="pb-2 shrink-0">
            <button
              onClick={() => toast.success('Message sent to Chief Oladapo Adewale')}
              className="bg-[#E77D53] hover:bg-[#d66d43] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-sm inline-flex items-center gap-2 transition-all active:scale-[0.98] cursor-pointer border-none"
            >
              <Mail size={16} />
              <span>Contact Manager</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── 4 KEY METRICS BANNER ROW ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-white rounded-xl border border-gray-200/80 p-6 my-8 card-shadow">
        {/* Metric 1 */}
        <div className="lg:border-r border-gray-100 pr-4">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Total Assets Managed</span>
          <p className="text-lg sm:text-xl font-display font-extrabold text-gray-900 m-0">142 Units</p>
        </div>

        {/* Metric 2 */}
        <div className="lg:border-r border-gray-100 pr-4">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Portfolio Value</span>
          <p className="text-lg sm:text-xl font-display font-extrabold text-gray-900 m-0">₦84.5B</p>
        </div>

        {/* Metric 3 */}
        <div className="lg:border-r border-gray-100 pr-4">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Experience</span>
          <p className="text-lg sm:text-xl font-display font-extrabold text-gray-900 m-0">15 Years</p>
        </div>

        {/* Metric 4 */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
            <Star size={20} className="fill-amber-500 text-amber-500" />
          </div>
          <div>
            <p className="text-lg sm:text-xl font-display font-extrabold text-gray-900 m-0 leading-tight">4.9</p>
            <span className="text-[11px] text-gray-400 font-medium block">Tenant Rating</span>
          </div>
        </div>
      </div>

      {/* ── TWO COLUMN MAIN CONTENT GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Sidebar Column (Bio & Specialties) */}
        <div className="lg:col-span-1 space-y-6">
          {/* Professional Bio */}
          <div className="bg-white rounded-xl border border-gray-200/80 p-6 card-shadow">
            <h2 className="text-sm font-semibold uppercase text-gray-800 m-0 mb-4">Professional Bio</h2>
            <div className="space-y-3.5">
              <p className="text-base text-[#4A4F4C] leading-relaxed font-medium m-0">
                Chief Oladapo Adewale is a distinguished asset manager specializing in high-yield luxury residential and commercial property portfolios across prime African commercial hubs. With over 15 years of industry expertise, he has pioneered a data-driven approach to tenant retention.
              </p>
              <p className="text-base text-[#4A4F4C] leading-relaxed font-medium m-0">
                Under his management, properties across Victoria Island, Ikoyi, and Maitama consistently outperform market occupancy benchmarks while maintaining a premium standard of maintenance and 24/7 power management.
              </p>
            </div>
          </div>

          {/* Specialties */}
          <div className="bg-white rounded-xl border border-gray-200/80 p-6 card-shadow">
            <h3 className="text-sm font-semibold uppercase text-gray-800 m-0 mb-4">Expertise & Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {specialties.map((s) => (
                <span key={s} className="bg-teal-100/70 text-[#072F29] rounded-full px-3.5 py-1.5 text-xs font-bold inline-block">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Promo Badge */}
          <div className="bg-[#072F29] text-white rounded-xl p-6 card-shadow relative overflow-hidden flex flex-col justify-between min-h-[160px]">
            <Trophy size={26} className="text-[#E77D53] mb-4" />
            <div>
              <h3 className="text-sm font-semibold uppercase text-white m-0 mb-1.5">2023 Top Performer</h3>
              <p className="text-base text-white/90 leading-relaxed m-0 font-medium">
                Awarded for achieving 99.2% occupancy across prime commercial real estate in Nigeria.
              </p>
            </div>
            {/* Background watermark */}
            <Trophy size={110} className="absolute -right-6 -bottom-6 text-white/5 pointer-events-none transform -rotate-12" />
          </div>
        </div>

        {/* Right Main Column (Managed Portfolio Grid) */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h2 className="text-sm font-semibold uppercase text-gray-800 m-0">Managed Portfolio</h2>
            <button onClick={() => navigate('/landlord/properties')} className="text-xs font-bold text-gray-800 hover:underline inline-flex items-center gap-1 bg-transparent border-none p-0 cursor-pointer">
              <span>View all properties</span>
              <ChevronRight size={15} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {managedProperties.map((prop) => (
              <div key={prop.id} className="bg-white rounded-xl border border-gray-200/80 card-shadow overflow-hidden flex flex-col justify-between transition-all hover:shadow-sm">
                <div>
                  <div className="relative h-44 overflow-hidden">
                    <img src={prop.img} alt={prop.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                    <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-gray-900 text-[9px] font-black tracking-wider uppercase px-2.5 py-1 rounded-md shadow-xs">
                      {prop.tag}
                    </span>
                  </div>

                  <div className="p-6 pb-3">
                    <h3 className="text-sm font-semibold uppercase text-gray-800 m-0 mb-1 truncate">{prop.name}</h3>
                    <p className="text-base text-[#4A4F4C] m-0 font-medium inline-flex items-center gap-1">
                      <MapPin size={13} className="text-gray-400 shrink-0" />
                      <span className="truncate">{prop.location}</span>
                    </p>
                  </div>
                </div>

                <div className="px-6 py-3.5 bg-gray-50/70 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div>
                      <span className="text-[9px] font-bold text-gray-400 block tracking-wider uppercase">{prop.stat1Label}</span>
                      <span className="text-xs font-extrabold text-gray-900 font-mono block mt-0.5">{prop.stat1Val}</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-gray-400 block tracking-wider uppercase">{prop.stat2Label}</span>
                      <span className={`text-xs font-extrabold font-mono block mt-0.5 ${prop.stat2Color || 'text-gray-900'}`}>{prop.stat2Val}</span>
                    </div>
                  </div>

                  <button onClick={() => navigate('/landlord/properties/1')} className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 hover:text-black flex items-center justify-center cursor-pointer transition-colors shrink-0">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandlordProfile;
