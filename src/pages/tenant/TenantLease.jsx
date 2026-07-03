import { useState } from 'react';
import {
  MapPin, Wallet, FileText, CheckCircle2, Lock, Eye, Download,
  Car, Building2, Phone, Mail, MessageSquare, Calendar, Bell, Info, Send, Printer
} from 'lucide-react';
import Modal from '../../components/ui/Modal';
import { downloadLeaseDoc } from '../../utils/documentGenerator';
import PageHero from '../../components/ui/PageHero';

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
  const [showOnlineViewer, setShowOnlineViewer] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageTopic, setMessageTopic] = useState('Lease Terms Inquiry');
  const [messageText, setMessageText] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'Adeleke & Co.', text: 'Welcome to Victoria Island Towers! Your lease document is active and verified.', date: 'Dec 15, 2025' }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    setChatHistory([...chatHistory, { sender: 'You', text: `[${messageTopic}] ${messageText}`, date: 'Just now' }]);
    setMessageText('');
  };

  return (
    <div className="space-y-6 w-full text-[#1E293B]">
      <PageHero
        icon={FileText}
        iconBg="bg-amber-700"
        tag="Active Tenancy"
        title="Lease Agreement"
        subtitle="Victoria Island Towers, Suite #402-B • Lease ID: RF-8921-LG • Signed Dec 15, 2025"
        gradient="from-[#1A0800] via-[#2D1400] to-[#4D2800]"
        stats={[
          { value: '₦2.85M', label: 'Monthly Rent' },
          { value: 'Dec 31', label: 'Lease Ends', sub: '2026' },
          { value: '₦3.2M', label: 'Security Deposit' },
        ]}
        actions={[
          { label: 'Download Lease', icon: Download, onClick: () => downloadLeaseDoc() },
          { label: 'View Online', icon: Eye, onClick: () => setShowOnlineViewer(true), variant: 'ghost' },
          { label: 'Message Manager', icon: MessageSquare, onClick: () => setShowMessageModal(true), variant: 'ghost' },
        ]}
      />

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
                Victoria Island Towers
              </h2>

              <div className="text-xs text-gray-500 font-medium mt-1.5 flex items-center gap-1.5">
                <MapPin size={15} className="text-gray-400 shrink-0" />
                <span className="truncate">Victoria Island Towers, Suite 402, Lagos, Nigeria</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-4">
                <div className="bg-[#F3EFEA] rounded-xl px-3.5 py-2">
                  <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider block">UNIT NUMBER</span>
                  <span className="text-xs font-black text-[#1E293B] mt-0.5 block font-mono">#402-B</span>
                </div>
                <div className="bg-[#F3EFEA] rounded-xl px-3.5 py-2">
                  <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider block">LEASE ID</span>
                  <span className="text-xs font-black text-[#1E293B] mt-0.5 block font-mono">RF-8921-LG</span>
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
                      <p className="text-base font-black text-[#1E293B] font-mono tracking-tight">₦2,850,000</p>
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
                      <p className="text-base font-black text-[#1E293B] font-mono tracking-tight">₦3,200,000</p>
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
                      <p className="text-base font-black text-[#1E293B] font-mono tracking-tight">₦50,000</p>
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
                <h4 className="font-black text-base text-[#1E293B] leading-tight truncate">Adeleke &amp; Co. Properties</h4>
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
                  <span className="text-sm font-bold text-[#1E293B] font-mono block mt-0.5">+234 803 000 0198</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-9 h-9 rounded-full bg-[#F3EFEA] flex items-center justify-center text-gray-600 shrink-0">
                  <Mail size={16} strokeWidth={2.2} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[9px] font-extrabold text-gray-400 tracking-wider uppercase block">EMAIL ADDRESS</span>
                  <span className="text-sm font-bold text-[#1E293B] block mt-0.5 truncate">service@adelekeproperties.ng</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowMessageModal(true)}
              className="w-full py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-800 font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs bg-white"
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
                  <span className="text-sm font-black text-[#1E293B] mt-0.5 block font-display">January 01, 2026</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 relative pb-6">
                <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center ring-4 ring-white shadow-2xs shrink-0 z-10">
                  <Bell size={15} strokeWidth={2.5} />
                </div>
                <div className="pt-0.5 min-w-0 flex-1">
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">RENEWAL DEADLINE</span>
                  <span className="text-sm font-black text-[#1E293B] mt-0.5 block font-display">November 30, 2026</span>
                  <span className="text-xs font-bold text-[#DC2626] mt-1 block leading-snug">60-day notice period required</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 relative">
                <div className="w-8 h-8 rounded-full bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center ring-4 ring-white shadow-2xs shrink-0 z-10">
                  <Calendar size={15} strokeWidth={2.5} />
                </div>
                <div className="pt-0.5 min-w-0 flex-1">
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">LEASE END DATE</span>
                  <span className="text-sm font-black text-[#1E293B] mt-0.5 block font-display">December 31, 2026</span>
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
                You'll receive an automated renewal offer on October 15th.
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
              <p className="text-xs font-semibold text-gray-500 mt-0.5 truncate">Electronically signed on Dec 15, 2025 • 4.2 MB • 24 Pages</p>
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
              onClick={() => setShowOnlineViewer(true)}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg bg-[#E6F2EF] hover:bg-[#d5ebe5] text-[#04332C] font-extrabold text-xs tracking-wider inline-flex items-center justify-center gap-2 transition-all cursor-pointer uppercase whitespace-nowrap border-none"
            >
              <Eye size={16} strokeWidth={2.2} />
              <span>View Online</span>
            </button>
            <button 
              onClick={() => {
                downloadLeaseDoc();
              }}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg bg-[#9B3A0E] hover:bg-[#86310b] text-white font-extrabold text-xs tracking-wider inline-flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] cursor-pointer uppercase whitespace-nowrap border-none"
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

      {/* Online Lease Viewer Modal */}
      <Modal
        isOpen={showOnlineViewer}
        onClose={() => setShowOnlineViewer(false)}
        title="Full Residential Lease Agreement (Online Viewer)"
        maxWidth="max-w-4xl"
      >
        <div className="space-y-6 text-[#1E293B] max-h-[70vh] overflow-y-auto pr-2">
          <div className="bg-[#E6F2EF] p-4 rounded-xl flex items-center justify-between border border-[#04332C]/20 sticky top-0 bg-[#E6F2EF]/95 backdrop-blur-sm z-10">
            <div className="flex items-center gap-3">
              <FileText size={24} className="text-[#04332C]" />
              <div>
                <h4 className="font-bold text-sm text-[#04332C] m-0">Victoria Island Towers • Unit #402-B</h4>
                <p className="text-xs text-[#04332C]/80 m-0">Lease ID: RF-8921-LG • Signed Dec 15, 2025</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => downloadLeaseDoc()}
                className="px-3 py-1.5 bg-white text-[#04332C] rounded-lg text-xs font-bold border border-[#04332C]/20 hover:bg-gray-50 cursor-pointer inline-flex items-center gap-1"
              >
                <Printer size={13} />
                Print / Save Document
              </button>
              <button
                onClick={() => downloadLeaseDoc()}
                className="px-3 py-1.5 bg-[#04332C] text-white rounded-lg text-xs font-bold border-none hover:bg-[#064e43] cursor-pointer inline-flex items-center gap-1"
              >
                <Download size={13} />
                Download PDF
              </button>
            </div>
          </div>

          <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl space-y-6 text-sm leading-relaxed font-serif">
            <div className="text-center pb-4 border-b border-gray-300">
              <h2 className="text-xl font-bold font-sans text-[#04332C] uppercase tracking-wider m-0">Residential Lease Contract</h2>
              <p className="text-xs text-gray-500 font-sans mt-1">Legally Binding Agreement under Lagos Tenancy Law</p>
            </div>

            <div className="space-y-4 font-sans text-sm">
              <div>
                <h4 className="font-bold text-gray-900 uppercase text-xs tracking-wider mb-1">1. PARTIES & PREMISES</h4>
                <p className="text-gray-700 m-0">This Agreement is made by and between <strong>Adeleke & Co. Properties</strong> ("Landlord/Manager") and <strong>Ayomikun Adeleke</strong> ("Resident") for the real property located at Victoria Island Towers, Suite #402-B, Lagos, Nigeria.</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 uppercase text-xs tracking-wider mb-1">2. LEASE TERM & FINANCIAL TERMS</h4>
                <p className="text-gray-700 m-0">The lease term begins on <strong>January 01, 2026</strong> and ends on <strong>December 31, 2026</strong>. Resident agrees to pay base rent of <strong>₦2,850,000</strong> per month via Automated Direct Debit (ACH). A security deposit of <strong>₦3,200,000</strong> is held in an escrow account.</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 uppercase text-xs tracking-wider mb-1">3. PETS & PARKING RULES</h4>
                <p className="text-gray-700 m-0">Domestic cats and dogs under 40lbs permitted (maximum 2 pets) subject to monthly pet premium of ₦50,000. Resident is assigned Parking Stall #42 in Basement Level 1.</p>
              </div>

              <div className="pt-4 border-t border-gray-300 grid grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded border border-gray-200">
                  <span className="text-[10px] font-bold text-gray-400 block uppercase">Resident Digital Signature</span>
                  <span className="font-mono text-xs font-bold text-green-700 block mt-1">Ayomikun Adeleke (SHA: 8f9a...3b21)</span>
                  <span className="text-[10px] text-gray-500 block">Signed: Dec 15, 2025</span>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200">
                  <span className="text-[10px] font-bold text-gray-400 block uppercase">Management Countersignature</span>
                  <span className="font-mono text-xs font-bold text-green-700 block mt-1">Adeleke & Co. Authorized Signatory</span>
                  <span className="text-[10px] text-gray-500 block">Signed: Dec 15, 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Secure Message Manager Modal */}
      <Modal
        isOpen={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        title="Secure Property Management Center"
        maxWidth="max-w-xl"
      >
        <div className="space-y-4 text-[#1E293B]">
          <div className="bg-[#F8FAFC] p-3 rounded-xl border border-gray-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Building2 size={16} className="text-[#04332C]" />
              <span className="font-bold text-gray-800">Adeleke & Co. Properties Support</span>
            </div>
            <span className="text-green-600 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 block" /> Online
            </span>
          </div>

          <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/50 max-h-56 overflow-y-auto space-y-3">
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.sender === 'You' ? 'items-end' : 'items-start'}`}>
                <div className={`px-3.5 py-2.5 rounded-xl max-w-[85%] text-xs ${msg.sender === 'You' ? 'bg-[#04332C] text-white' : 'bg-white border border-gray-200 text-gray-800 shadow-2xs'}`}>
                  <div className={`font-bold text-[10px] mb-0.5 ${msg.sender === 'You' ? 'text-white/70' : 'text-gray-400'}`}>{msg.sender}</div>
                  <div>{msg.text}</div>
                </div>
                <span className="text-[9px] text-gray-400 mt-1 px-1">{msg.date}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="space-y-3 pt-2">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Topic / Reference</label>
              <select
                value={messageTopic}
                onChange={(e) => setMessageTopic(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs font-semibold bg-white cursor-pointer"
              >
                <option value="Lease Terms Inquiry">Lease Terms Inquiry</option>
                <option value="Renewal Question">Renewal Offer Question</option>
                <option value="Billing & Ledger">Billing & Ledger Clarification</option>
                <option value="General Support">General Support</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Your Message</label>
              <textarea
                rows={3}
                required
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Write your message to Adeleke & Co. management team..."
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-[#04332C]/20 focus:outline-none"
              />
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowMessageModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50 cursor-pointer bg-white"
              >
                Close
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#04332C] hover:bg-[#064e43] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer border-none"
              >
                <Send size={13} />
                Send Secure Message
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default TenantLease;
