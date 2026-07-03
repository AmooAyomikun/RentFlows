import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Modal from '../../components/ui/Modal';
import { downloadHandbookGuideDoc } from '../../utils/documentGenerator';
import { Wrench, Plus } from 'lucide-react';
const ticketsData = [
  {
    id: 'RF-29402',
    title: 'Kitchen Faucet Leaking',
    category: 'PLUMBING',
    categoryBadge: 'bg-tertiary-container/10 text-on-tertiary-fixed-variant',
    status: 'Pending Review',
    statusBadge: 'bg-error-container/20 text-error',
    statusIcon: 'pulse',
    date: 'SUBMITTED JUN 24, 2026',
    description: 'The main kitchen faucet has started dripping constantly since this morning. It seems to be coming from the handle base.',
    iconName: 'water_drop',
    assigneeType: 'avatars',
  },
  {
    id: 'RF-29388',
    title: 'Flickering Lights in Hallway',
    category: 'ELECTRICAL',
    categoryBadge: 'bg-secondary-container/30 text-on-secondary-container',
    status: 'Scheduled: Jun 26',
    statusBadge: 'bg-primary-container/10 text-primary',
    statusIconName: 'event',
    date: 'SUBMITTED JUN 22, 2026',
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
    date: 'COMPLETED JUN 15, 2026',
    description: 'Standard quarterly filter replacement for the main unit in closet B.',
    iconName: 'ac_unit',
    assigneeType: 'rating',
    resolved: true,
  },
];

const TenantMaintenance = () => {
  const [filter, setFilter] = useState('ALL');
  const [showModal, setShowModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [showHandbookModal, setShowHandbookModal] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [submittedSuccessModal, setSubmittedSuccessModal] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.search.includes('new=true')) {
      setShowModal(true);
    }
  }, [location.search]);

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    setShowModal(false);
    setSubmittedSuccessModal(true);
  };

  const filteredTickets = filter === 'OPEN' 
    ? ticketsData.filter(t => !t.resolved) 
    : ticketsData;

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 m-0">Maintenance Center</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your service requests and keep track of property updates. Our team aims to respond within 24 hours.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-[#04332C] text-white rounded-xl text-sm font-bold hover:bg-[#03221d] transition-colors shadow-sm inline-flex items-center gap-2 cursor-pointer border-none whitespace-nowrap">
            <Plus size={16} /> Request Maintenance
          </button>
        </div>
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
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer border-none ${
                  filter === 'ALL' ? 'bg-[#04332C] text-white' : 'border border-gray-200 hover:bg-gray-50 text-gray-600'
                }`}
              >
                ALL
              </button>
              <button 
                onClick={() => setFilter('OPEN')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer border-none ${
                  filter === 'OPEN' ? 'bg-[#04332C] text-white' : 'border border-gray-200 hover:bg-gray-50 text-gray-600'
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
                  onClick={() => setSelectedTicket(ticket)}
                  className={`p-6 hover:bg-surface-container-low transition-colors group cursor-pointer relative overflow-hidden ${ticket.resolved ? 'opacity-70' : ''}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${ticket.resolved ? 'bg-surface-container text-outline' : 'bg-secondary-container/30 text-secondary'}`}>
                        <span className="material-symbols-outlined" style={!ticket.resolved ? { fontVariationSettings: "'FILL' 1" } : {}}>{ticket.iconName}</span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                          <h4 className="font-semibold text-on-surface m-0">{ticket.title}</h4>
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
                        <div className="w-7 h-7 rounded-full border-2 border-white bg-outline-variant flex items-center justify-center text-[10px] text-white font-bold">JD</div>
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
                onClick={() => setShowArchiveModal(true)}
                className="text-primary text-xs font-bold hover:underline cursor-pointer uppercase tracking-widest border-none bg-transparent"
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
                <a href="tel:+2348005550199" className="flex items-center gap-4 bg-white/10 p-4 rounded-xl border border-white/10 no-underline text-white hover:bg-white/20 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-white text-[#04332C] flex items-center justify-center shrink-0 font-bold">
                    <span className="material-symbols-outlined">call</span>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/70 uppercase font-bold m-0">Maintenance Hotline</p>
                    <p className="font-mono text-lg text-white font-bold tracking-wider m-0">+234 800 555 0199</p>
                  </div>
                </a>
                <a href="sms:+2348030000199?body=HELP" className="flex items-center gap-4 bg-white/10 p-4 rounded-xl border border-white/10 cursor-pointer hover:bg-white/20 transition-colors no-underline text-white">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-white">chat_bubble</span>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/70 uppercase font-bold m-0">Emergency SMS</p>
                    <p className="font-mono text-white font-bold m-0">Text "HELP" to 08030000199</p>
                  </div>
                </a>
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
            onClick={() => setShowHandbookModal(true)}
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
                <p className="text-[10px] font-mono text-gray-400 mt-1 italic m-0">Jun 24, 10:14 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button (Mobile Context) */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setShowModal(true)}
          className="w-14 h-14 rounded-full bg-on-tertiary-container text-white shadow-2xl flex items-center justify-center active:scale-90 transition-transform cursor-pointer border-none"
          aria-label="Request New Maintenance"
        >
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
      </div>

      {/* Ticket Details Modal */}
      <Modal isOpen={!!selectedTicket} onClose={() => setSelectedTicket(null)} title={`Ticket Details: ${selectedTicket?.id}`}>
        {selectedTicket && (
          <div className="space-y-4 text-[#1E293B]">
            <div className="flex justify-between items-start border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-bold text-base text-gray-900 m-0">{selectedTicket.title}</h3>
                <p className="text-xs text-gray-500 m-0 mt-0.5">{selectedTicket.date} • {selectedTicket.category}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                selectedTicket.resolved ? 'bg-gray-100 text-gray-700' : 'bg-amber-100 text-amber-800'
              }`}>
                {selectedTicket.status}
              </span>
            </div>
            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 text-xs text-gray-700 leading-relaxed">
              <strong>Problem Description:</strong><br />
              {selectedTicket.description}
            </div>
            {selectedTicket.technicianName && (
              <div className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-100 flex items-center gap-3">
                <img src={selectedTicket.technicianAvatar} alt="Tech" className="w-8 h-8 rounded-full object-cover" />
                <div className="text-xs">
                  <p className="font-bold text-gray-900 m-0">Assigned Technician: {selectedTicket.technicianName}</p>
                  <p className="text-[11px] text-gray-500 m-0">Status: En route / Scheduled</p>
                </div>
              </div>
            )}
            <div className="flex justify-end pt-2">
              <button onClick={() => setSelectedTicket(null)} className="px-5 py-2 bg-[#04332C] text-white rounded-lg text-xs font-bold border-none cursor-pointer">Close</button>
            </div>
          </div>
        )}
      </Modal>

      {/* Historical Archive Modal */}
      <Modal isOpen={showArchiveModal} onClose={() => setShowArchiveModal(false)} title="Historical Tickets Archive">
        <div className="space-y-4 text-[#1E293B]">
          <p className="text-xs text-gray-600 m-0">
            Below is a summary of completed and archived maintenance records from previous lease periods.
          </p>
          <div className="divide-y divide-gray-100 border border-gray-200 rounded-xl overflow-hidden text-xs">
            <div className="p-3.5 bg-gray-50 flex justify-between items-center font-medium">
              <span>Bathroom Sink Unclogging (#RF-28011)</span>
              <span className="text-gray-500 font-bold">Mar 2026</span>
            </div>
            <div className="p-3.5 bg-white flex justify-between items-center font-medium">
              <span>Balcony Door Handle Replacement (#RF-27544)</span>
              <span className="text-gray-500 font-bold">Jan 2026</span>
            </div>
            <div className="p-3.5 bg-gray-50 flex justify-between items-center font-medium">
              <span>Annual Pest Inspection (#RF-26990)</span>
              <span className="text-gray-500 font-bold">Nov 2025</span>
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button onClick={() => setShowArchiveModal(false)} className="px-5 py-2 bg-[#04332C] text-white rounded-lg text-xs font-bold border-none cursor-pointer">Close Archive</button>
          </div>
        </div>
      </Modal>

      {/* Handbook Modal */}
      <Modal isOpen={showHandbookModal} onClose={() => { setShowHandbookModal(false); setSelectedGuide(null); }} title="Resident Handbook & Guides">
        <div className="space-y-4 text-[#1E293B]">
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between gap-3">
            <div>
              <h4 className="font-bold text-sm text-emerald-900 m-0">2026 Resident Maintenance Manual</h4>
              <p className="text-xs text-emerald-800 mt-1 m-0">Official guidelines on apartment care, appliance warranties, and emergency protocols.</p>
            </div>
            <button
              onClick={() => downloadHandbookGuideDoc('2026 Resident Maintenance Manual')}
              className="px-3.5 py-2 bg-[#04332C] text-white rounded-lg text-xs font-bold shrink-0 hover:bg-[#03241f] transition-all cursor-pointer border-none shadow-xs"
            >
              Download Full Manual PDF
            </button>
          </div>

          {selectedGuide ? (
            <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 space-y-4 max-h-[60vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b border-gray-200 pb-3 sticky top-0 bg-gray-50 pt-1">
                <h5 className="font-bold text-sm text-gray-900 m-0">{selectedGuide.title}</h5>
                <button onClick={() => setSelectedGuide(null)} className="text-xs text-primary font-bold hover:underline cursor-pointer bg-transparent border-none">← Back to Guides</button>
              </div>
              <div className="text-xs text-gray-700 leading-relaxed space-y-3 whitespace-pre-line m-0 font-medium">
                {selectedGuide.content}
              </div>
              <div className="pt-3 border-t border-gray-200 flex justify-end">
                <button
                  onClick={() => downloadHandbookGuideDoc(selectedGuide.title)}
                  className="px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold cursor-pointer border-none shadow-xs hover:bg-primary/90 transition-all"
                >
                  Download Guide PDF
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-xs font-medium text-gray-700">
              {[
                {
                  title: '1. Electrical Distribution & Circuit Breakers Guide',
                  content: `The main electrical distribution panel for your suite is located inside the hallway utility pantry. Every breaker switch is labeled for Lighting, HVAC, Kitchen Appliances, and Receptacles.

If an appliance trips a circuit breaker due to temporary overload:
1. Immediately unplug all high-wattage devices connected to that room's wall outlets.
2. Open the utility pantry door and inspect the breaker panel switches. A tripped switch sits halfway between ON and OFF.
3. Firmly push the tripped breaker switch completely to the OFF position, wait 10 seconds, and then firmly push it up to the ON position.
4. If a breaker trips twice consecutively, leave it in the OFF position and immediately log an urgent electrical ticket on the maintenance portal.`
                },
                {
                  title: '2. Air Conditioning Care & Hygiene Procedures',
                  content: `Your residence is equipped with high-efficiency inverter split cooling systems designed for tropical climate stability.

To ensure maximum cooling performance, maintain indoor air quality, and prevent condensation leaks:
• Monthly Filter Sanitation: Open the front access panel of each indoor unit once every 30 days. Gently slide out the mesh dust filters and rinse under lukewarm tap water. Shake off excess moisture and allow to air-dry completely before reinstalling.
• Energy Efficiency: Maintain room thermostats between 22°C and 24°C. Operating AC units while balcony doors or windows are open causes rapid coil freezing and excess condensation dripping.
• Professional Servicing: Quarterly deep chemical cleaning and refrigerant pressure checks are scheduled automatically by Adeleke & Co. Management.`
                },
                {
                  title: '3. Plumbing Isolation & Water Shut-off Valves',
                  content: `Knowing the locations of emergency water valves is essential to prevent flood damage during accidental pipe bursts or fixture leaks.

• Fixture Isolation Valves: Underneath every bathroom sink vanity, kitchen sink, and toilet cistern, you will find angled chrome stop valves. Turn clockwise until tight to isolate water flow to that specific fixture.
• Master Apartment Shut-off Valve: The main water isolation valve governing your entire apartment unit is located inside the laundry room closet behind metal hatch B. In case of a major burst or overflowing tub, immediately shut off this master valve and contact the 24/7 hotline.`
                },
                {
                  title: '4. Fire Safety & Emergency Evacuation Protocols',
                  content: `Victoria Island Towers is equipped with interconnected optical smoke detectors and sprinkler heads in every apartment suite.

• Alarm Activation: If your smoke alarm sounds due to cooking smoke, ventilate the kitchen immediately. Never tamper with or cover smoke detector sensors.
• Fire Emergencies: If an active fire occurs, alert household members immediately, leave all belongings behind, and exit via the illuminated fire escape stairwells. Never use elevators during a fire evacuation.
• Assembly Point: Proceed directly to the primary emergency muster point located at the South Courtyard fountain lawn.`
                },
                {
                  title: '5. Waste Management & Recycling Guidelines',
                  content: `To maintain hygiene and prevent pest ingress across residential corridors:

• Trash Chutes: Automated garbage chutes are located in the service corridor of each floor. All household refuse must be sealed inside durable garbage bags before insertion.
• Prohibited Items: Never drop glass, renovation debris, hot liquids, or oversized cardboard boxes down the disposal chute. Leave broken-down cardboard boxes neatly in the freight service lobby for daily janitorial collection.`
                }
              ].map((guide, idx) => (
                <div key={idx} className="p-3.5 bg-gray-50 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-gray-200/80 hover:border-gray-300 transition-all shadow-2xs">
                  <div>
                    <span className="font-bold text-gray-900 block text-xs">{guide.title}</span>
                    <span className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">{guide.content.split('\n')[0]}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setSelectedGuide(guide)}
                      className="px-3 py-1.5 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 text-[11px] font-bold cursor-pointer transition-all"
                    >
                      Read Online
                    </button>
                    <button
                      onClick={() => downloadHandbookGuideDoc(guide.title)}
                      className="px-3 py-1.5 rounded-lg bg-[#04332C] text-white text-[11px] font-bold cursor-pointer border-none shadow-2xs hover:bg-[#03241f] transition-all"
                    >
                      Download PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end pt-2 border-t border-gray-100">
            <button onClick={() => { setShowHandbookModal(false); setSelectedGuide(null); }} className="px-5 py-2 bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-lg text-xs font-bold border-none cursor-pointer">Close</button>
          </div>
        </div>
      </Modal>

      {/* Submission Success Modal */}
      <Modal isOpen={submittedSuccessModal} onClose={() => setSubmittedSuccessModal(false)} title="Maintenance Request Submitted">
        <div className="space-y-4 text-center text-[#1E293B] py-2">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-3xl">check_circle</span>
          </div>
          <div>
            <h3 className="font-bold text-base text-gray-900 m-0">Request Logged Successfully</h3>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              Your service request has been transmitted to our facility managers. You will receive an SMS confirmation once a technician is scheduled.
            </p>
          </div>
          <div className="pt-2">
            <button onClick={() => setSubmittedSuccessModal(false)} className="px-6 py-2.5 bg-[#04332C] text-white rounded-xl text-xs font-bold border-none cursor-pointer">View Tickets</button>
          </div>
        </div>
      </Modal>

      {/* New Maintenance Modal Dialog */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Request New Maintenance">
        <p className="text-xs text-gray-500 mt-0 mb-4">Describe your issue below and our team will dispatch a technician.</p>

        <form onSubmit={handleSubmitRequest} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Property & Unit</label>
            <input
              required
              list="tenant-properties-list"
              placeholder="Type or select unit (e.g. Victoria Island Towers - Unit 402-B)"
              defaultValue="Victoria Island Towers - Unit 402-B"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder-gray-400"
            />
            <datalist id="tenant-properties-list">
              <option value="Victoria Island Towers - Unit 402-B" />
              <option value="Lekki Phase 1 Apartments - Flat 3A" />
              <option value="Ikoyi Palms Residence - Suite 12" />
              <option value="Abuja Central Plaza - Penthouse 4" />
            </datalist>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Issue Category</label>
            <select required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option value="plumbing">Plumbing</option>
              <option value="electrical">Electrical</option>
              <option value="hvac">HVAC / Heating & Cooling</option>
              <option value="appliance">Appliance Repair</option>
              <option value="carpentry">Carpentry / Doors / Windows</option>
              <option value="painting">Painting / Walls</option>
              <option value="pest">Pest Control</option>
              <option value="security">Security / Locks</option>
              <option value="roofing">Roofing / Leaks</option>
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
              className="px-5 py-2.5 rounded-xl border border-gray-300 font-bold text-xs uppercase tracking-wider text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer bg-transparent"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container font-bold text-xs uppercase tracking-wider text-on-primary shadow-sm transition-all active:scale-[0.98] cursor-pointer border-none"
            >
              Submit Ticket
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TenantMaintenance;
