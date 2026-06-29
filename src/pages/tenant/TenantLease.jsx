import { toast } from 'sonner';
import {
  MapPin, Wallet, FileText, CheckCircle2, Lock, Eye, Download,
  Car, Building2, Phone, Mail, MessageSquare, Calendar, Bell, Info
} from 'lucide-react';

// Custom PawPrint / Dog SVG Icon
const PawIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="4" r="2"/>
    <circle cx="18" cy="8" r="2"/>
    <circle cx="20" cy="16" r="2"/>
    <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/>
  </svg>
);

const PaintRollerIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="3" width="16" height="6" rx="2"/>
    <path d="M10 16v5"/>
    <path d="M8 21h4"/>
    <path d="M18 6h2a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-10"/>
  </svg>
);

const TenantLease = () => {
  return (
    <div className="space-y-6 w-full text-[#1E293B]">
      {/* Page Title & Subtitle matching design mockup exactly */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 m-0">
          Lease Agreement
        </h1>
        <p className="text-base text-[#4A4F4C] m-0 mt-1 font-medium">
          Review your current tenancy terms and legal obligations.
        </p>
      </div>

      {/* Main 2-Column vs 1-Column Grid Layout matching mockup aspect ratios exactly */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column (Takes up 2 spans on desktop) */}
        <div className="lg:col-span-2 space-y-6 min-w-0">
          
          {/* Main Property/Lease Card */}
          <div className="bg-white rounded-xl p-6 card-shadow border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center gap-6 relative overflow-hidden">
            {/* Left accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-[#FF8C5A]" />
            
            {/* Property Image */}
            <img 
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop&q=80" 
              alt="The Residences at Emerald Creek" 
              className="w-full sm:w-48 h-36 rounded-xl object-cover shrink-0 shadow-2xs ml-1" 
            />

            {/* Property Info */}
            <div className="flex-1 min-w-0">
              <div className="bg-[#E6F2EF] text-[#04332C] text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#04332C]" />
                ACTIVE TENANCY
              </div>

              <h2 className="text-xl font-bold text-gray-900 tracking-tight mt-2 leading-snug m-0">
                The Residences at Emerald Creek
              </h2>

              <div className="text-xs text-gray-500 font-medium mt-1.5 flex items-center gap-1.5">
                <MapPin size={15} className="text-gray-400 shrink-0" />
                <span className="truncate">8822 Skyview Drive, Suite 402, Austin, TX 78701</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-4">
                <div className="bg-[#F3EFEA] rounded-xl px-3.5 py-2">
                  <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider block">UNIT NUMBER</span>
                  <span className="text-xs font-black text-[#1E293B] mt-0.5 block font-mono">#402-B</span>
                </div>
                <div className="bg-[#F3EFEA] rounded-xl px-3.5 py-2">
                  <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider block">LEASE ID</span>
                  <span className="text-xs font-black text-[#1E293B] mt-0.5 block font-mono">RF-8921-TX</span>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Summary Card */}
          <div className="bg-white rounded-xl card-shadow border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase text-gray-800 m-0">Financial Summary</h2>
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                <Wallet size={16} />
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[480px]">
                <div className="bg-[#F8F6F0] px-6 py-2.5 grid grid-cols-12 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <div className="col-span-4">TERM TYPE</div>
                  <div className="col-span-5">DETAILS</div>
                  <div className="col-span-3 text-right">VALUE</div>
                </div>

                <div className="divide-y divide-gray-100">
                  <div className="px-6 py-4 grid grid-cols-12 items-center">
                    <div className="col-span-4 pr-2">
                      <p className="font-extrabold text-sm text-[#1E293B]">Monthly Rent</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">Due on the 1st of each month</p>
                    </div>
                    <div className="col-span-5 pr-2">
                      <p className="text-xs font-semibold text-gray-600">Automated ACH enabled</p>
                    </div>
                    <div className="col-span-3 text-right">
                      <p className="text-base font-black text-[#1E293B] font-mono tracking-tight">$2,850.00</p>
                    </div>
                  </div>

                  <div className="px-6 py-4 grid grid-cols-12 items-center">
                    <div className="col-span-4 pr-2">
                      <p className="font-extrabold text-sm text-[#1E293B]">Security Deposit</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">Held in Escrow Account</p>
                    </div>
                    <div className="col-span-5 pr-2">
                      <p className="text-xs font-semibold text-gray-600">Fully refundable at exit</p>
                    </div>
                    <div className="col-span-3 text-right">
                      <p className="text-base font-black text-[#1E293B] font-mono tracking-tight">$3,200.00</p>
                    </div>
                  </div>

                  <div className="px-6 py-4 grid grid-cols-12 items-center">
                    <div className="col-span-4 pr-2">
                      <p className="font-extrabold text-sm text-[#1E293B]">Pet Premium</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">Monthly surcharge</p>
                    </div>
                    <div className="col-span-5 pr-2">
                      <p className="text-xs font-semibold text-gray-600">Includes 1 Domestic Feline</p>
                    </div>
                    <div className="col-span-3 text-right">
                      <p className="text-base font-black text-[#1E293B] font-mono tracking-tight">$50.00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (Takes up 1 span on desktop) */}
        <div className="space-y-6 min-w-0">
          
          {/* Property Manager Card */}
          <div className="bg-white rounded-xl p-6 card-shadow border border-gray-200 space-y-5">
            <h2 className="text-sm font-semibold uppercase text-gray-800 m-0">Property Manager</h2>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#04332C] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Building2 size={22} strokeWidth={2.2} />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-black text-base text-[#1E293B] leading-tight truncate">Vanguard Assets Ltd.</h4>
                <p className="text-xs font-semibold text-gray-500 mt-0.5">Primary Management Group</p>
              </div>
            </div>

            <div className="space-y-3.5 pt-1">
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-full bg-[#F3EFEA] flex items-center justify-center text-gray-600 shrink-0">
                  <Phone size={16} strokeWidth={2.2} />
                </div>
                <div>
                  <span className="text-[9px] font-extrabold text-gray-400 tracking-wider uppercase block">SUPPORT LINE</span>
                  <span className="text-sm font-bold text-[#1E293B] font-mono block mt-0.5">+1 (512) 555-0198</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-9 h-9 rounded-full bg-[#F3EFEA] flex items-center justify-center text-gray-600 shrink-0">
                  <Mail size={16} strokeWidth={2.2} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[9px] font-extrabold text-gray-400 tracking-wider uppercase block">EMAIL ADDRESS</span>
                  <span className="text-sm font-bold text-[#1E293B] block mt-0.5 truncate">service@vanguard.com</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => toast.info('Opening secure message thread with Vanguard Assets Ltd...')}
              className="w-full py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-800 font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
            >
              <MessageSquare size={16} strokeWidth={2.2} />
              <span>Message Manager</span>
            </button>
          </div>

          {/* Lease Timeline Card */}
          <div className="bg-white rounded-xl p-6 card-shadow border border-gray-200 space-y-6">
            <h2 className="text-sm font-semibold uppercase text-gray-800 m-0">Lease Timeline</h2>

            <div className="relative pl-3">
              <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-gray-200" />

              <div className="flex items-start gap-3.5 relative pb-6">
                <div className="w-8 h-8 rounded-full bg-[#E6F2EF] text-[#04332C] flex items-center justify-center ring-4 ring-white shadow-2xs shrink-0 z-10">
                  <Calendar size={15} strokeWidth={2.5} />
                </div>
                <div className="pt-0.5 min-w-0 flex-1">
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">LEASE START DATE</span>
                  <span className="text-sm font-black text-[#1E293B] mt-0.5 block font-display">September 01, 2023</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 relative pb-6">
                <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center ring-4 ring-white shadow-2xs shrink-0 z-10">
                  <Bell size={15} strokeWidth={2.5} />
                </div>
                <div className="pt-0.5 min-w-0 flex-1">
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">RENEWAL DEADLINE</span>
                  <span className="text-sm font-black text-[#1E293B] mt-0.5 block font-display">June 30, 2024</span>
                  <span className="text-xs font-bold text-[#DC2626] mt-1 block leading-snug">60-day notice period required</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 relative">
                <div className="w-8 h-8 rounded-full bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center ring-4 ring-white shadow-2xs shrink-0 z-10">
                  <Calendar size={15} strokeWidth={2.5} />
                </div>
                <div className="pt-0.5 min-w-0 flex-1">
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">LEASE END DATE</span>
                  <span className="text-sm font-black text-[#1E293B] mt-0.5 block font-display">August 31, 2024</span>
                </div>
              </div>
            </div>
          </div>

          {/* Renewing soon? Promo Card */}
          <div className="bg-[#04332C] text-white rounded-xl p-6 shadow-md flex items-start gap-4 relative overflow-hidden">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0 mt-0.5">
              <Info size={20} strokeWidth={2.5} />
            </div>
            <div>
              <h4 className="font-black text-base tracking-tight font-display text-white">Renewing soon?</h4>
              <p className="text-xs text-[#FAF7F2]/80 font-medium leading-relaxed mt-1">
                You'll receive an automated renewal offer on May 15th.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Full-Width Section below 2-column grid matching exact mockup hierarchy */}
      <div className="space-y-6 pt-2">
        {/* Full Lease Agreement PDF Card - Full Width Flex Row with clustered elements on left and split edge action buttons on right */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-white rounded-xl border border-gray-200 card-shadow gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="w-14 h-14 rounded-xl bg-[#F3EFEA] flex items-center justify-center text-gray-700 shrink-0 relative shadow-2xs">
              <FileText size={26} strokeWidth={2} />
              <span className="absolute bottom-1 font-black text-[7px] bg-gray-800 text-white px-1.5 py-0.5 rounded leading-none">PDF</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-black text-sm sm:text-base text-[#1E293B] leading-tight truncate">Full Lease Agreement.pdf</h3>
              <p className="text-xs font-semibold text-gray-500 mt-0.5 truncate">Electronically signed on Aug 15, 2023 • 4.2 MB • 24 Pages</p>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
                <span className="inline-flex items-center gap-1.5 shrink-0">
                  <CheckCircle2 size={13} className="text-green-600" />
                  VERIFIED SIGNATURE
                </span>
                <span className="inline-flex items-center gap-1.5 shrink-0">
                  <Lock size={13} className="text-gray-400" />
                  ENCRYPTED STORAGE
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-end">
            <button 
              onClick={() => toast.info('Opening lease document inline...')}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg bg-[#E6F2EF] hover:bg-[#d5ebe5] text-[#04332C] font-extrabold text-xs tracking-wider inline-flex items-center justify-center gap-2 transition-all cursor-pointer uppercase whitespace-nowrap"
            >
              <Eye size={16} strokeWidth={2.2} />
              <span>View Online</span>
            </button>
            <button 
              onClick={() => toast.success('Downloading Full Lease Agreement.pdf...')}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg bg-[#9B3A0E] hover:bg-[#86310b] text-white font-extrabold text-xs tracking-wider inline-flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] cursor-pointer uppercase whitespace-nowrap"
            >
              <Download size={16} strokeWidth={2.2} />
              <span>Download Full Lease</span>
            </button>
          </div>
        </div>

        {/* Bottom Policies Grid - 3 equal columns spanning full width */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 card-shadow border border-gray-200 space-y-2.5">
            <PawIcon size={22} className="text-[#04332C]" />
            <h3 className="text-sm font-semibold uppercase text-gray-800 m-0">Pet Policy</h3>
            <p className="text-base text-[#4A4F4C] leading-relaxed m-0">
              Domestic cats and dogs under 40lbs permitted. Max 2 pets.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 card-shadow border border-gray-200 space-y-2.5">
            <Car size={22} className="text-[#04332C]" strokeWidth={2.2} />
            <h3 className="text-sm font-semibold uppercase text-gray-800 m-0">Parking Terms</h3>
            <p className="text-base text-[#4A4F4C] leading-relaxed m-0">
              Allocated Stall #42 in Basement Level 1. Guest parking for 24h.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 card-shadow border border-gray-200 space-y-2.5">
            <PaintRollerIcon size={22} className="text-[#04332C]" />
            <h3 className="text-sm font-semibold uppercase text-gray-800 m-0">Alterations</h3>
            <p className="text-base text-[#4A4F4C] leading-relaxed m-0">
              Painting or permanent changes require written manager consent.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="flex flex-col sm:flex-row items-center justify-between pt-8 mt-12 border-t border-gray-200/60 text-[11px] font-bold text-gray-400 gap-4 uppercase tracking-wider">
        <div>© 2024 RentFlow Property Group. All rights reserved.</div>
        <div className="flex items-center gap-6">
          <span className="hover:text-gray-600 cursor-pointer transition-colors">PRIVACY POLICY</span>
          <span className="hover:text-gray-600 cursor-pointer transition-colors">FAIR HOUSING</span>
          <span className="hover:text-gray-600 cursor-pointer transition-colors">ADA COMPLIANCE</span>
        </div>
      </footer>
    </div>
  );
};

export default TenantLease;
