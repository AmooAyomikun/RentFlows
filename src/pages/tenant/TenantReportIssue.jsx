import { useState } from 'react';
import { 
  UploadCloud, ChevronDown, ChevronRight, Asterisk, CheckCircle2, AlertCircle
} from 'lucide-react';
import Modal from '../../components/ui/Modal';

const TenantReportIssue = () => {
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('Low');
  const [description, setDescription] = useState('');
  const [formError, setFormError] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [activeInstruction, setActiveInstruction] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    if (!category || category === 'Select a category') {
      setFormError('Please select an issue category.');
      return;
    }
    if (!description.trim()) {
      setFormError('Please describe the issue in detail.');
      return;
    }
    setSubmittedSuccess(true);
    setDescription('');
    setCategory('');
  };

  return (
    <div className="space-y-6 w-full text-[#1E293B] pb-8">
      {/* Title Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 m-0">
          Report Issue
        </h1>
      </div>

      {/* Main 2-Column vs 1-Column Grid Layout matching exact mockup aspect ratios */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column (Takes up 2 spans on desktop) */}
        <div className="lg:col-span-2 space-y-6 min-w-0">
          
          {/* New Maintenance Request Card */}
          <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 card-shadow border border-gray-200 space-y-6">
            <div>
              <h2 className="text-sm font-semibold uppercase text-gray-800 m-0">New Maintenance Request</h2>
              <p className="text-sm text-gray-600 mt-1 m-0">
                Please provide details about the issue. Our maintenance team typically responds within 24 hours.
              </p>
            </div>

            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-800 font-bold">
                <AlertCircle size={16} className="text-red-600 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* Row 0: Property & Unit */}
            <div>
              <label className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider block mb-2">PROPERTY &amp; UNIT</label>
              <input
                required
                list="report-properties-list"
                placeholder="Type or select unit (e.g. Victoria Island Towers - Unit 402-B)"
                defaultValue="Victoria Island Towers - Unit 402-B"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#04332C]/20 placeholder-gray-400"
              />
              <datalist id="report-properties-list">
                <option value="Victoria Island Towers - Unit 402-B" />
                <option value="Lekki Phase 1 Apartments - Flat 3A" />
                <option value="Ikoyi Palms Residence - Suite 12" />
                <option value="Abuja Central Plaza - Penthouse 4" />
              </datalist>
            </div>

            {/* Row 1: Category and Priority */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start pt-2">
              <div>
                <label className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider block mb-2">ISSUE CATEGORY</label>
                <div className="relative">
                  <select 
                    value={category}
                    onChange={(e) => { setCategory(e.target.value); setFormError(''); }}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-[#04332C]/20 cursor-pointer"
                  >
                    <option value="">Select a category</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Electrical">Electrical</option>
                    <option value="HVAC / Heating">HVAC / Heating & Cooling</option>
                    <option value="Appliance">Appliance Repair</option>
                    <option value="Carpentry">Carpentry / Doors / Windows</option>
                    <option value="Painting">Painting / Walls</option>
                    <option value="Pest">Pest Control</option>
                    <option value="Security">Security / Locks</option>
                    <option value="Roofing">Roofing / Leaks</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider block mb-2">PRIORITY LEVEL</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Low', 'Medium', 'High'].map((level) => (
                    <button
                      type="button"
                      key={level}
                      onClick={() => setPriority(level)}
                      className={`py-2 rounded-xl border font-bold text-xs text-center transition-all cursor-pointer ${
                        priority === level 
                          ? 'border-[#04332C] bg-[#04332C]/5 text-[#04332C] shadow-2xs' 
                          : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Row 2: Detailed Description */}
            <div>
              <label className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider block mb-2">DETAILED DESCRIPTION</label>
              <textarea 
                rows={5}
                value={description}
                onChange={(e) => { setDescription(e.target.value); setFormError(''); }}
                placeholder="Describe the problem, location, and when it started..."
                className="w-full p-4 rounded-xl border border-gray-200 bg-[#F8FAFC]/50 text-xs font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#04332C]/20 resize-none"
              />
            </div>

            {/* Row 3: Upload Media */}
            <div>
              <label className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider block mb-2">UPLOAD PHOTOS/VIDEOS</label>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-[#F8FAFC]/50 hover:bg-gray-50 transition-colors cursor-pointer group">
                <UploadCloud size={32} className="text-gray-400 group-hover:text-gray-600 transition-colors mb-2.5" strokeWidth={1.8} />
                <span className="font-bold text-xs text-gray-700">Drag and drop media here</span>
                <span className="text-[11px] text-gray-400 font-medium mt-1">Supported formats: JPG, PNG, MP4 (Max 20MB)</span>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => {
                  setDescription('');
                  setCategory('');
                  setFormError('');
                }}
                className="text-xs font-bold text-gray-800 hover:text-black cursor-pointer px-2 py-2 border-none bg-transparent"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#9B3A0E] hover:bg-[#86310b] text-white font-extrabold text-xs tracking-wider uppercase transition-all shadow-sm cursor-pointer border-none"
              >
                Submit Report
              </button>
            </div>
          </form>

        </div>

        {/* Right Column (Takes up 1 span on desktop) */}
        <div className="space-y-6 min-w-0">
          
          {/* Emergency Contacts Card */}
          <div className="bg-[#04332C] text-white rounded-xl p-6 card-shadow space-y-5 relative overflow-hidden">
            <div className="flex items-center gap-2.5">
              <Asterisk size={20} className="text-[#FF8C5A] shrink-0" strokeWidth={3} />
              <h2 className="text-sm font-semibold uppercase text-white m-0">Emergency Contacts</h2>
            </div>

            <p className="text-xs text-[#FAF7F2]/80 font-medium leading-relaxed m-0">
              If you are experiencing a life-threatening emergency, call 911 immediately. For urgent building issues, use the contacts below.
            </p>

            <div className="space-y-3 pt-1">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-1">
                <span className="text-[9px] font-extrabold text-gray-300 tracking-widest uppercase block">24/7 ON-CALL MAINTENANCE</span>
                <a href="tel:+2348030000199" className="font-mono font-bold text-base text-white tracking-wide block hover:underline">+234 803 000 0199</a>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-1">
                <span className="text-[9px] font-extrabold text-gray-300 tracking-widest uppercase block">BUILDING SECURITY</span>
                <a href="tel:+2348021119988" className="font-mono font-bold text-base text-white tracking-wide block hover:underline">+234 802 111 9988</a>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-1">
                <span className="text-[9px] font-extrabold text-gray-300 tracking-widest uppercase block">CONCIERGE DESK</span>
                <a href="tel:+2348012227722" className="font-mono font-bold text-base text-white tracking-wide block hover:underline">+234 801 222 7722</a>
              </div>
            </div>
          </div>

          {/* Common Issues Card */}
          <div className="bg-white rounded-xl p-6 card-shadow border border-gray-200 space-y-4">
            <h2 className="text-sm font-semibold uppercase text-gray-800 m-0">Common Issues</h2>

            <div className="divide-y divide-gray-100 -my-1">
              <div 
                onClick={() => setActiveInstruction({
                  title: 'How to reset a circuit breaker?',
                  steps: [
                    'Locate your unit electrical panel inside the kitchen pantry or utility hallway.',
                    'Look for a breaker switch flipped partially to the middle or marked OFF.',
                    'Push the switch firmly all the way to OFF until it clicks, then firmly back to ON.',
                    'If the breaker trips immediately again, unplug high-wattage appliances and report an Electrical issue.'
                  ]
                })}
                className="py-3.5 flex items-center justify-between text-xs font-bold text-gray-700 hover:text-black transition-colors cursor-pointer group"
              >
                <span>How to reset a circuit breaker?</span>
                <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </div>

              <div 
                onClick={() => setActiveInstruction({
                  title: 'Water heater troubleshooting',
                  steps: [
                    'Check the dedicated circuit breaker for the water heater inside your electrical panel.',
                    'Ensure the timer or control switch inside the utility cupboard is switched to ON.',
                    'Allow 30-45 minutes after switching on during peak periods for tank heating.',
                    'If water remains lukewarm or leaking is observed at the base, turn off water valve and log a Priority request.'
                  ]
                })}
                className="py-3.5 flex items-center justify-between text-xs font-bold text-gray-700 hover:text-black transition-colors cursor-pointer group"
              >
                <span>Water heater troubleshooting</span>
                <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </div>

              <div 
                onClick={() => setActiveInstruction({
                  title: 'Reporting unauthorized parking',
                  steps: [
                    'Take a clear photograph of the vehicle showing license plate and bay number.',
                    'Verify the bay belongs to your Unit 402 deeded allocation.',
                    'Call the Building Security desk (+234 802 111 9988) directly for immediate wheel clamping or towing.',
                    'Log an issue under Security category attaching the photo for estate management records.'
                  ]
                })}
                className="py-3.5 flex items-center justify-between text-xs font-bold text-gray-700 hover:text-black transition-colors cursor-pointer group"
              >
                <span>Reporting unauthorized parking</span>
                <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </div>
            </div>
          </div>

          {/* Recent Tickets Card */}
          <div className="bg-white border border-gray-200 p-6 rounded-xl card-shadow space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase text-gray-800 m-0">Recent Tickets</h2>
              <span className="bg-[#04332C] text-white font-black text-[9px] uppercase tracking-wider px-2 py-0.5 rounded shadow-2xs">
                2 Open
              </span>
            </div>

            <div className="space-y-3.5 pt-1">
              <div 
                onClick={() => setSelectedTicket({
                  id: '#REQ-4491',
                  title: 'Kitchen Sink Leaking',
                  status: 'In Progress',
                  category: 'Plumbing',
                  date: 'Submitted 2 days ago',
                  desc: 'Water is continuously dripping from the base of the kitchen faucet onto the countertop. Temporary towel placed around base.'
                })}
                className="space-y-1 cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#04332C] shrink-0" />
                  <p className="font-bold text-xs text-gray-900 group-hover:underline m-0">Kitchen Sink Leaking</p>
                </div>
                <p className="text-[11px] font-semibold text-gray-500 pl-4 m-0">#REQ-4491 • In Progress</p>
              </div>

              <div className="pt-3.5 border-t border-gray-200/50">
                <div 
                  onClick={() => setSelectedTicket({
                    id: '#REQ-4480',
                    title: 'AC Filter Replacement',
                    status: 'Resolved',
                    category: 'HVAC',
                    date: 'Completed Jun 15, 2026',
                    desc: 'Standard quarterly maintenance inspection and replacement of air filters in living area and primary bedroom.'
                  })}
                  className="space-y-1 cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-400 shrink-0" />
                    <p className="font-bold text-xs text-gray-900 group-hover:underline m-0">AC Filter Replacement</p>
                  </div>
                  <p className="text-[11px] font-semibold text-gray-500 pl-4 m-0">#REQ-4480 • Resolved</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Success Modal */}
      <Modal isOpen={submittedSuccess} onClose={() => setSubmittedSuccess(false)} title="Report Submitted Successfully">
        <div className="space-y-4 text-center text-[#1E293B] py-2">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle2 size={32} />
          </div>
          <div>
            <h3 className="font-bold text-base text-gray-900 m-0">Maintenance Request Logged</h3>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              Your issue report has been received by Adeleke & Co. property management. A technician will be assigned and contact you within 24 hours.
            </p>
          </div>
          <div className="pt-2">
            <button onClick={() => setSubmittedSuccess(false)} className="px-6 py-2.5 bg-[#04332C] text-white rounded-xl text-xs font-bold border-none cursor-pointer">Back to Reports</button>
          </div>
        </div>
      </Modal>

      {/* Instruction Guide Modal */}
      <Modal isOpen={!!activeInstruction} onClose={() => setActiveInstruction(null)} title="Resident Troubleshooting Guide">
        {activeInstruction && (
          <div className="space-y-4 text-[#1E293B]">
            <h3 className="font-bold text-sm text-[#04332C] m-0 border-b border-gray-100 pb-2">{activeInstruction.title}</h3>
            <ol className="list-decimal pl-5 space-y-2.5 text-xs text-gray-700 font-medium leading-relaxed">
              {activeInstruction.steps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 leading-normal">
              <strong>Note:</strong> If troubleshooting steps do not resolve the issue safely, do not force any equipment or wiring. Submit a formal maintenance request.
            </div>
            <div className="flex justify-end pt-2">
              <button onClick={() => setActiveInstruction(null)} className="px-5 py-2 bg-[#04332C] text-white rounded-lg text-xs font-bold border-none cursor-pointer">Got It</button>
            </div>
          </div>
        )}
      </Modal>

      {/* Ticket Details Modal */}
      <Modal isOpen={!!selectedTicket} onClose={() => setSelectedTicket(null)} title={`Ticket Details: ${selectedTicket?.id}`}>
        {selectedTicket && (
          <div className="space-y-4 text-[#1E293B]">
            <div className="flex justify-between items-start border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-bold text-base text-gray-900 m-0">{selectedTicket.title}</h3>
                <p className="text-xs text-gray-500 m-0 mt-0.5">{selectedTicket.date} • Category: {selectedTicket.category}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                selectedTicket.status === 'Resolved' ? 'bg-gray-100 text-gray-700' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {selectedTicket.status}
              </span>
            </div>
            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 text-xs text-gray-700 leading-relaxed">
              <strong>Description:</strong><br />
              {selectedTicket.desc}
            </div>
            <div className="flex justify-end pt-2">
              <button onClick={() => setSelectedTicket(null)} className="px-5 py-2 bg-[#04332C] text-white rounded-lg text-xs font-bold border-none cursor-pointer">Close</button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};

export default TenantReportIssue;
