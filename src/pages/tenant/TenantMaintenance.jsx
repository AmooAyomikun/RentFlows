import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';

const ticketsData = [
  {
    id: 'RF-29402',
    title: 'Kitchen Faucet Leaking',
    category: 'PLUMBING',
    categoryBadge: 'bg-tertiary-container/10 text-on-tertiary-fixed-variant',
    status: 'Pending Review',
    statusBadge: 'bg-error-container/20 text-error',
    statusIcon: 'pulse',
    date: 'SUBMITTED OCT 24, 2023',
    description: 'The main kitchen faucet has started dripping constantly since this morning. It seems to be coming from the handle base.',
    iconName: 'water_drop',
    assigneeType: 'avatars',
  },
  {
    id: 'RF-29388',
    title: 'Flickering Lights in Hallway',
    category: 'ELECTRICAL',
    categoryBadge: 'bg-secondary-container/30 text-on-secondary-container',
    status: 'Scheduled: Oct 26',
    statusBadge: 'bg-primary-container/10 text-primary',
    statusIconName: 'event',
    date: 'SUBMITTED OCT 22, 2023',
    description: 'The LED track lighting in the main hallway flickers intermittently. Changed the bulbs but the issue persists, possibly a driver issue.',
    iconName: 'bolt',
    assigneeType: 'technician',
    technicianName: 'Mark Stevenson',
    technicianAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBN1msHt_j05bGeRDT0AgZsR76m06KNJIbpioT8ouM_w-0hFOuEcTnxsUxXjUF_13xxZs4mJXhX3Ukc95VIH2o1k7YTNshxna-ZQD2-Uzax56cGjPsm4U577BMQaz7HzwzyuDig0bsZsDW9_Ster5hdEQL0EFKRDoLfFWlZkZzk8oWZaqgXi1MinleAuPzd3M-r7wYmFRUnKyjnAAa0XErd8-t1eWMO-da9tKyKLqyVdYNnJckj7AOpaxxQmqIQPBJvWFRzCsGlBUqi',
  },
  {
    id: 'RF-29105',
    title: 'HVAC Filter Replacement',
    category: 'HVAC',
    categoryBadge: 'bg-outline-variant/20 text-on-surface-variant',
    status: 'Resolved',
    statusBadge: 'bg-surface-container-high text-on-surface-variant',
    statusIconName: 'check_circle',
    date: 'COMPLETED OCT 15, 2023',
    description: 'Standard quarterly filter replacement for the main unit in closet B.',
    iconName: 'ac_unit',
    assigneeType: 'rating',
    resolved: true,
  },
];

const TenantMaintenance = () => {
  const [filter, setFilter] = useState('ALL');
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

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
    ? ticketsData.filter(t => !t.resolved) 
    : ticketsData;

  return (
    <div className="space-y-6 relative">
      {/* Header & Action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
        <div className="max-w-2xl">
          <h1 className="text-2xl font-bold text-gray-900 m-0 mb-1">Maintenance</h1>
          <p className="text-base text-[#4A4F4C] m-0">Manage your service requests and keep track of property updates. Our team aims to respond within 24 hours.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-[#04332C] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm hover:bg-[#032621] transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add_circle</span>
          REQUEST NEW MAINTENANCE
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Column: Tickets & Analytics */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          {/* Ticket Stats (Bento Style) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 card-shadow flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold uppercase text-gray-800 m-0">Pending</h2>
                <span className="material-symbols-outlined text-outline">hourglass_empty</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display-lg text-4xl font-bold text-primary">02</span>
                <span className="text-error text-[10px] font-bold">+1 new</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 card-shadow flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold uppercase text-gray-800 m-0">In Progress</h2>
                <span className="material-symbols-outlined text-secondary">pending_actions</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display-lg text-4xl font-bold text-primary">01</span>
                <span className="text-on-surface-variant text-[10px] uppercase font-bold">Active</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 card-shadow flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold uppercase text-gray-800 m-0">Resolved</h2>
                <span className="material-symbols-outlined text-on-secondary-container">check_circle</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display-lg text-4xl font-bold text-primary">14</span>
                <span className="text-on-secondary-container text-[10px] font-bold uppercase">This Year</span>
              </div>
            </div>
          </div>

          {/* Recent Tickets Header & Controls */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-900 m-0">Recent Tickets</h2>
            <div className="flex gap-2">
              <button 
                onClick={() => setFilter('ALL')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  filter === 'ALL' ? 'bg-primary text-on-primary' : 'border border-outline-variant hover:bg-surface-container text-on-surface-variant'
                }`}
              >
                ALL
              </button>
              <button 
                onClick={() => setFilter('OPEN')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  filter === 'OPEN' ? 'bg-primary text-on-primary' : 'border border-outline-variant hover:bg-surface-container text-on-surface-variant'
                }`}
              >
                OPEN
              </button>
            </div>
          </div>

          {/* Ticket List */}
          <div className="bg-white rounded-xl card-shadow border border-gray-200 overflow-hidden">
            <div className="divide-y divide-outline-variant/20">
              {filteredTickets.map((ticket) => (
                <div 
                  key={ticket.id} 
                  onClick={() => toast.info(`Viewing details for ticket ${ticket.id}`)}
                  className={`p-6 hover:bg-surface-container-low transition-colors group cursor-pointer relative overflow-hidden ${ticket.resolved ? 'opacity-70' : ''}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${ticket.resolved ? 'bg-surface-container text-outline' : 'bg-secondary-container/30 text-secondary'}`}>
                        <span className="material-symbols-outlined" style={!ticket.resolved ? { fontVariationSettings: "'FILL' 1" } : {}}>{ticket.iconName}</span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                          <h4 className="font-semibold text-on-surface">{ticket.title}</h4>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${ticket.categoryBadge}`}>
                            {ticket.category}
                          </span>
                        </div>
                        <p className="text-xs font-mono text-outline mt-1 uppercase m-0">ID: {ticket.id} • {ticket.date}</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end gap-2 shrink-0">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase flex items-center gap-1.5 ${ticket.statusBadge}`}>
                        {ticket.statusIcon === 'pulse' && <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span>}
                        {ticket.statusIconName && <span className="material-symbols-outlined text-[14px]">{ticket.statusIconName}</span>}
                        {ticket.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mt-3 max-w-2xl m-0">{ticket.description}</p>

                  <div className="mt-4 flex items-center justify-between">
                    {ticket.assigneeType === 'avatars' && (
                      <div className="flex -space-x-2">
                        <div className="w-7 h-7 rounded-full border-2 border-white bg-outline-variant flex items-center justify-center text-[10px] text-white">JD</div>
                        <div className="w-7 h-7 rounded-full border-2 border-white bg-primary-container flex items-center justify-center text-[10px] text-white font-bold">RF</div>
                      </div>
                    )}

                    {ticket.assigneeType === 'technician' && (
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full border-2 border-white overflow-hidden">
                          <img className="w-full h-full object-cover" alt="Technician" src={ticket.technicianAvatar} />
                        </div>
                        <span className="text-xs text-on-surface-variant">Assigned: <span className="font-bold text-on-surface">{ticket.technicianName}</span></span>
                      </div>
                    )}

                    {ticket.assigneeType === 'rating' && (
                      <div className="flex items-center gap-2">
                        <div className="flex text-on-tertiary-container">
                          {[1, 2, 3, 4, 5].map(i => (
                            <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                          ))}
                        </div>
                        <span className="text-[10px] font-bold text-outline uppercase">Rating Submitted</span>
                      </div>
                    )}

                    <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors ml-auto">chevron_right</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-surface-container-lowest text-center border-t border-outline-variant/30">
              <button 
                onClick={() => toast.info('Loading historical tickets archive...')}
                className="text-primary text-xs font-bold hover:underline cursor-pointer uppercase tracking-widest"
              >
                VIEW ALL HISTORICAL TICKETS
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar Actions & Info */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Emergency Contact Card */}
          <div className="bg-[#04332C] text-white p-6 rounded-xl relative overflow-hidden card-shadow">
            <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
              <span className="material-symbols-outlined text-[180px]">warning</span>
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 border border-white/20">
                <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>emergency_home</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-2 m-0">Emergency Contact</h2>
              <p className="text-white/80 text-sm mb-6 leading-relaxed m-0">For immediate life-safety issues, fires, or catastrophic flooding, please contact our 24/7 hotline directly.</p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl border border-white/10">
                  <div className="w-10 h-10 rounded-full bg-white text-[#04332C] flex items-center justify-center shrink-0 font-bold">
                    <span className="material-symbols-outlined">call</span>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/70 uppercase font-bold m-0">Maintenance Hotline</p>
                    <p className="font-mono text-lg text-white font-bold tracking-wider m-0">+1 (800) 555-0199</p>
                  </div>
                </div>
                <div 
                  onClick={() => toast.info('Opening emergency SMS interface...')}
                  className="flex items-center gap-4 bg-white/10 p-4 rounded-xl border border-white/10 cursor-pointer hover:bg-white/20 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-white">chat_bubble</span>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/70 uppercase font-bold m-0">Emergency SMS</p>
                    <p className="font-mono text-white font-bold m-0">Text "HELP" to 55022</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Guidance/Tips Card */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 card-shadow">
            <h2 className="text-sm font-semibold uppercase text-gray-800 mb-4 flex items-center gap-2 m-0">
              <span className="material-symbols-outlined text-secondary">info</span>
              Before you submit...
            </h2>
            <ul className="space-y-4 m-0 pl-0 list-none">
              <li className="flex gap-3">
                <span className="material-symbols-outlined text-green-600 text-lg shrink-0">check_circle</span>
                <p className="text-xs text-gray-600 leading-normal m-0">Check the <span className="font-bold text-gray-900">Resident Handbook</span> for common troubleshooting steps (e.g., GFCI reset).</p>
              </li>
              <li className="flex gap-3">
                <span className="material-symbols-outlined text-green-600 text-lg shrink-0">check_circle</span>
                <p className="text-xs text-gray-600 leading-normal m-0">Attach at least <span className="font-bold text-gray-900">two clear photos</span> of the issue to speed up diagnostic time.</p>
              </li>
              <li className="flex gap-3">
                <span className="material-symbols-outlined text-green-600 text-lg shrink-0">check_circle</span>
                <p className="text-xs text-gray-600 leading-normal m-0">Specify if you provide <span className="font-bold text-gray-900">Permission to Enter</span> if you are not present during service.</p>
              </li>
            </ul>
          </div>

          {/* Helpful Resources & Guides Card */}
          <div 
            onClick={() => toast.info('Opening Resident Handbook and Guides...')}
            className="bg-white p-6 rounded-xl border border-gray-200 card-shadow flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-secondary-container/30 flex items-center justify-center text-secondary shrink-0 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-2xl">menu_book</span>
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-semibold text-gray-900 text-sm group-hover:underline leading-tight m-0">Helpful Resources & Guides</h2>
              <p className="text-xs text-gray-600 mt-1 m-0">Access resident handbooks, tutorials, and DIY troubleshooting guides.</p>
            </div>
            <span className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform">arrow_forward_ios</span>
          </div>

          {/* Recent Activity Feed */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 card-shadow">
            <h2 className="text-sm font-semibold uppercase text-gray-800 mb-6 flex items-center gap-2 m-0">
              <span className="material-symbols-outlined text-sm">history</span>
              Activity Feed
            </h2>
            <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-gray-200">
              <div className="relative pl-10">
                <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-secondary border-2 border-white shadow-sm z-10"></div>
                <p className="text-xs font-bold text-gray-900 mb-0.5 m-0">Technician Assigned</p>
                <p className="text-[11px] text-gray-600 m-0">Mark Stevenson assigned to ticket RF-29388</p>
                <p className="text-[10px] font-mono text-gray-400 mt-1 italic m-0">2 hours ago</p>
              </div>
              <div className="relative pl-10">
                <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-primary border-2 border-white shadow-sm z-10"></div>
                <p className="text-xs font-bold text-gray-900 mb-0.5 m-0">Ticket Created</p>
                <p className="text-[11px] text-gray-600 m-0">Kitchen Faucet Leaking (RF-29402)</p>
                <p className="text-[10px] font-mono text-gray-400 mt-1 italic m-0">Oct 24, 10:14 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button (Mobile Context) */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setShowModal(true)}
          className="w-14 h-14 rounded-full bg-on-tertiary-container text-white shadow-2xl flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
          aria-label="Request New Maintenance"
        >
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
      </div>

      {/* New Maintenance Modal Dialog */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-1"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <h2 className="text-xl font-bold text-gray-900 m-0">Request New Maintenance</h2>
            <p className="text-xs text-gray-500 mt-1 m-0">Describe your issue below and our team will dispatch a technician.</p>

            <form onSubmit={handleSubmitRequest} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Issue Category</label>
                <select required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20">
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
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Description</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Please describe the issue in detail, when it started, and any troubleshooting done..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder-gray-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Photos (Optional)</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-gray-400 text-3xl mb-1 block">upload</span>
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
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container font-bold text-xs uppercase tracking-wider text-on-primary shadow-sm transition-all active:scale-[0.98] cursor-pointer"
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
