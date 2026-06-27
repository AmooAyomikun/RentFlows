import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  PlusCircle, AlertTriangle, Phone, MessageSquare, Info, 
  CheckCircle2, ChevronRight, Droplets, Zap, Snowflake, 
  Hourglass, Calendar, Star, Upload, X 
} from 'lucide-react';
import { toast } from 'sonner';

const recentTickets = [
  {
    id: 'RF-29402',
    title: 'Kitchen Faucet Leaking',
    category: 'PLUMBING',
    categoryBadge: 'bg-[#FFEDD5] text-[#9A3412]',
    status: '• PENDING REVIEW',
    statusBadge: 'bg-[#FEE2E2] text-[#DC2626]',
    date: 'SUBMITTED OCT 24, 2023',
    description: 'The main kitchen faucet has started dripping constantly since this morning. It seems to be coming from the handle base.',
    icon: Droplets,
    iconBg: 'bg-[#E6F2EF] text-[#04332C]',
    assigneeType: 'avatars',
  },
  {
    id: 'RF-29388',
    title: 'Flickering Lights in Hallway',
    category: 'ELECTRICAL',
    categoryBadge: 'bg-[#E0F2FE] text-[#0369A1]',
    status: 'SCHEDULED: OCT 26',
    statusBadge: 'bg-gray-100 text-gray-700',
    date: 'SUBMITTED OCT 22, 2023',
    description: 'The LED track lighting in the main hallway flickers intermittently. Changed the bulbs but the issue persists, possibly a driver issue.',
    icon: Zap,
    iconBg: 'bg-[#E0F2FE] text-[#0369A1]',
    assigneeType: 'technician',
    technicianName: 'Mark Stevenson',
  },
  {
    id: 'RF-29105',
    title: 'HVAC Filter Replacement',
    category: 'HVAC',
    categoryBadge: 'bg-gray-100 text-gray-600',
    status: 'RESOLVED',
    statusBadge: 'bg-gray-100 text-gray-600',
    date: 'COMPLETED OCT 15, 2023',
    description: 'Standard quarterly filter replacement for the main unit in closet B.',
    icon: Snowflake,
    iconBg: 'bg-gray-100 text-gray-600',
    assigneeType: 'rating',
  },
];

// Stylized SVG Toolbox Graphic for resources box
const ToolboxGraphic = () => (
  <svg width="80" height="60" viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
    <rect x="15" y="25" width="70" height="40" rx="6" fill="#38A169" />
    <path d="M15 35H85V60C85 63.3137 82.3137 66 79 66H21C17.6863 66 15 63.3137 15 60V35Z" fill="#2F855A" />
    <path d="M40 15H60V25H40V15Z" fill="#A0AEC0" />
    <path d="M44 15H56V21H44V15Z" fill="#CBD5E1" />
    <rect x="45" y="32" width="10" height="8" rx="2" fill="#F6AD55" />
    <rect x="25" y="45" width="20" height="12" rx="2" fill="#68D391" opacity="0.8" transform="rotate(-10 25 45)" />
    <rect x="55" y="48" width="22" height="10" rx="2" fill="#E2E8F0" opacity="0.9" transform="rotate(8 55 48)" />
  </svg>
);

const TenantMaintenance = () => {
  const [filter, setFilter] = useState('ALL');
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  // If query parameter ?new=true is passed (e.g. from Report Issue button), open modal automatically
  useEffect(() => {
    if (location.search.includes('new=true')) {
      setShowModal(true);
    }
  }, [location.search]);

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    toast.success('Maintenance request submitted successfully! Our team will review within 24 hours.');
    setShowModal(false);
  };

  const filteredTickets = filter === 'OPEN' 
    ? recentTickets.filter(t => !t.status.includes('RESOLVED')) 
    : recentTickets;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-8 relative">
      {/* Title Section */}
      <div>
        <h1 className="font-display font-black text-2xl sm:text-3xl text-gray-900 tracking-tight">
          Maintenance
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed font-medium">
          Manage your service requests and keep track of property updates. Our team aims to respond within 24 hours.
        </p>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 spans) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Top Status Cards */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6">
            {/* Pending */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-semibold text-gray-700">Pending</span>
                <Hourglass size={18} className="text-gray-400 shrink-0" />
              </div>
              <div className="flex items-baseline mt-4">
                <span className="text-3xl sm:text-4xl font-black text-gray-900 font-display tracking-tight">02</span>
                <span className="text-[11px] font-black text-red-600 ml-2">+1 new</span>
              </div>
            </div>

            {/* In Progress */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-semibold text-gray-700">In Progress</span>
                <Calendar size={18} className="text-[#04332C] shrink-0" />
              </div>
              <div className="flex items-baseline mt-4">
                <span className="text-3xl sm:text-4xl font-black text-gray-900 font-display tracking-tight">01</span>
                <span className="text-xs font-semibold text-gray-400 ml-2">Active</span>
              </div>
            </div>

            {/* Resolved */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-semibold text-gray-700">Resolved</span>
                <CheckCircle2 size={18} className="text-[#04332C] shrink-0" />
              </div>
              <div className="flex items-baseline mt-4">
                <span className="text-3xl sm:text-4xl font-black text-gray-900 font-display tracking-tight">14</span>
                <span className="text-xs font-semibold text-gray-400 ml-2">This Year</span>
              </div>
            </div>
          </div>

          {/* Recent Tickets Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 tracking-tight">Recent Tickets</h2>
              <div className="flex items-center gap-1.5 bg-gray-100/80 p-1 rounded-xl border border-gray-200/60">
                <button
                  onClick={() => setFilter('ALL')}
                  className={`px-3.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    filter === 'ALL' ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  ALL
                </button>
                <button
                  onClick={() => setFilter('OPEN')}
                  className={`px-3.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    filter === 'OPEN' ? 'bg-[#04332C] text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  OPEN
                </button>
              </div>
            </div>

            {/* Tickets List Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-100">
              {filteredTickets.map((ticket) => {
                const IconComponent = ticket.icon;
                return (
                  <div key={ticket.id} className="p-6 hover:bg-gray-50/50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3.5 min-w-0">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${ticket.iconBg}`}>
                          <IconComponent size={20} strokeWidth={2.2} />
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-extrabold text-sm sm:text-base text-gray-900">{ticket.title}</h3>
                            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider ${ticket.categoryBadge}`}>
                              {ticket.category}
                            </span>
                          </div>
                          <p className="text-[11px] font-mono font-semibold text-gray-400 mt-1">
                            ID: {ticket.id} • {ticket.date}
                          </p>
                        </div>
                      </div>

                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 ${ticket.statusBadge}`}>
                        {ticket.status}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed pl-13.5">
                      {ticket.description}
                    </p>

                    <div className="flex items-center justify-between mt-4 pl-13.5">
                      {ticket.assigneeType === 'avatars' && (
                        <div className="flex items-center -space-x-2">
                          <div className="w-6 h-6 rounded-full bg-[#04332C] text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">JD</div>
                          <div className="w-6 h-6 rounded-full bg-[#FF8C5A] text-[#2D1404] text-[10px] font-bold flex items-center justify-center ring-2 ring-white">RF</div>
                        </div>
                      )}

                      {ticket.assigneeType === 'technician' && (
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">MS</div>
                          <span className="text-xs font-bold text-gray-800">Assigned: <span className="text-gray-900 font-extrabold">{ticket.technicianName}</span></span>
                        </div>
                      )}

                      {ticket.assigneeType === 'rating' && (
                        <div className="flex items-center gap-1.5">
                          <div className="flex text-orange-400">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="fill-transparent stroke-current" />)}
                          </div>
                          <span className="text-[10px] font-extrabold text-gray-400 tracking-wider ml-1 uppercase">RATING SUBMITTED</span>
                        </div>
                      )}

                      <button 
                        onClick={() => toast.info(`Viewing details for ticket ${ticket.id}`)}
                        className="text-gray-400 hover:text-gray-900 transition-colors ml-auto cursor-pointer p-1"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                );
              })}

              <button
                onClick={() => toast.info('Loading historical tickets archive...')}
                className="w-full py-4 bg-white hover:bg-gray-50 text-center font-black text-xs tracking-widest text-gray-800 uppercase transition-colors cursor-pointer block"
              >
                VIEW ALL HISTORICAL TICKETS
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (1 span) */}
        <div className="space-y-6">
          {/* Request New Maintenance Button */}
          <button
            onClick={() => setShowModal(true)}
            className="w-full py-3.5 px-4 rounded-xl bg-[#FF8C5A] hover:bg-[#ff7a40] text-white font-black text-xs tracking-wider uppercase shadow-md flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] cursor-pointer"
          >
            <PlusCircle size={18} strokeWidth={2.5} />
            <span>REQUEST NEW MAINTENANCE</span>
          </button>

          {/* Emergency Contact Card */}
          <div className="bg-[#04332C] text-white rounded-2xl p-6 shadow-xl relative overflow-hidden space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#B84B14] flex items-center justify-center text-white shadow-sm">
              <AlertTriangle size={20} strokeWidth={2.5} />
            </div>

            <h3 className="text-lg font-black tracking-tight font-display">Emergency Contact</h3>
            <p className="text-xs text-[#FAF7F2]/80 leading-relaxed font-medium">
              For immediate life-safety issues, fires, or catastrophic flooding, please contact our 24/7 hotline directly.
            </p>

            <div className="space-y-3 pt-1 relative z-10">
              {/* Hotline Box */}
              <div className="bg-[#064E43]/60 border border-white/10 rounded-xl p-3.5 flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-full bg-[#FF8C5A] flex items-center justify-center text-[#2D1404] shrink-0">
                  <Phone size={16} strokeWidth={2.5} />
                </div>
                <div>
                  <span className="text-[9px] font-black tracking-widest text-[#FAF7F2]/60 uppercase block">MAINTENANCE HOTLINE</span>
                  <span className="text-sm font-mono font-bold text-white mt-0.5 block">+1 (800) 555-0199</span>
                </div>
              </div>

              {/* SMS Box */}
              <div className="bg-[#064E43]/60 border border-white/10 rounded-xl p-3.5 flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0">
                  <MessageSquare size={16} strokeWidth={2.2} />
                </div>
                <div>
                  <span className="text-[9px] font-black tracking-widest text-[#FAF7F2]/60 uppercase block">EMERGENCY SMS</span>
                  <span className="text-sm font-mono font-bold text-white mt-0.5 block">Text "HELP" to 55022</span>
                </div>
              </div>
            </div>

            {/* Background watermark */}
            <AlertTriangle className="absolute -right-6 -bottom-6 text-white/5 w-44 h-44 rotate-12 pointer-events-none" />
          </div>

          {/* Before you submit... Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
              <Info size={18} className="text-[#04332C]" />
              <span>Before you submit...</span>
            </div>

            <ul className="space-y-3 text-xs text-gray-600 font-medium">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-[#04332C] shrink-0 mt-0.5" />
                <span>Check the <strong className="text-gray-900 font-bold">Resident Handbook</strong> for common troubleshooting steps (e.g., GFCI reset).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-[#04332C] shrink-0 mt-0.5" />
                <span>Attach at least <strong className="text-gray-900 font-bold">two clear photos</strong> of the issue to speed up diagnostic time.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-[#04332C] shrink-0 mt-0.5" />
                <span>Specify if you provide <strong className="text-gray-900 font-bold">Permission to Enter</strong> if you are not present during service.</span>
              </li>
            </ul>

            {/* Resources Banner */}
            <div 
              onClick={() => toast.info('Opening Resident Handbook and Guides...')}
              className="bg-[#04332C] rounded-xl p-5 text-center text-white mt-4 flex flex-col items-center justify-center relative overflow-hidden shadow-sm hover:bg-[#064e43] transition-colors cursor-pointer group"
            >
              <ToolboxGraphic />
              <span className="text-[10px] font-black tracking-widest uppercase text-white mt-3 group-hover:underline">
                HELPFUL RESOURCES & GUIDES
              </span>
            </div>
          </div>

          {/* Activity Feed Section */}
          <div className="pt-2 space-y-4 px-1">
            <h3 className="text-[11px] font-extrabold tracking-widest text-gray-400 uppercase">ACTIVITY FEED</h3>

            <div className="space-y-4 border-l-2 border-gray-200 ml-1.5 pl-4 relative">
              {/* Feed Item 1 */}
              <div className="relative">
                <span className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#04332C] ring-4 ring-[#FAF7F2]" />
                <h4 className="text-xs font-bold text-gray-900">Technician Assigned</h4>
                <p className="text-xs text-gray-600 mt-0.5 font-medium">Mark Stevenson assigned to ticket RF-29388</p>
                <span className="text-[10px] italic text-gray-400 mt-1 block">2 hours ago</span>
              </div>

              {/* Feed Item 2 */}
              <div className="relative pt-2">
                <span className="absolute -left-[21px] top-3.5 w-2.5 h-2.5 rounded-full bg-[#FF8C5A] ring-4 ring-[#FAF7F2]" />
                <h4 className="text-xs font-bold text-gray-900">Ticket Created</h4>
                <p className="text-xs text-gray-600 mt-0.5 font-medium">Kitchen Faucet Leaking (RF-29402)</p>
                <span className="text-[10px] italic text-gray-400 mt-1 block">Oct 24, 10:14 AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Maintenance Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-1"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-black text-gray-900 font-display">Request New Maintenance</h3>
            <p className="text-xs text-gray-500 mt-1">Describe your issue below and our team will dispatch a technician.</p>

            <form onSubmit={handleSubmitRequest} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Issue Category</label>
                <select required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#04332C]/20">
                  <option value="plumbing">Plumbing</option>
                  <option value="electrical">Electrical</option>
                  <option value="hvac">HVAC / Heating & Cooling</option>
                  <option value="appliance">Appliance Repair</option>
                  <option value="general">General / Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Short Title</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Broken garbage disposal"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#04332C]/20 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Description</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Please describe the issue in detail, when it started, and any troubleshooting done..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#04332C]/20 placeholder-gray-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Photos (Optional)</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                  <Upload size={22} className="text-gray-400 mx-auto mb-1.5" />
                  <p className="text-xs font-bold text-gray-700">Click to upload or drag and drop</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">PNG, JPG up to 10MB</p>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 font-bold text-xs uppercase tracking-wider text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#04332C] hover:bg-[#064e43] font-bold text-xs uppercase tracking-wider text-white shadow-sm transition-all active:scale-[0.98] cursor-pointer"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantMaintenance;
