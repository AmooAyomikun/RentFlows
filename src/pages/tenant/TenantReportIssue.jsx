import { useState } from 'react';
import { toast } from 'sonner';
import { 
  UploadCloud, ChevronDown, ChevronRight, Asterisk
} from 'lucide-react';

const TenantReportIssue = () => {
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('Low');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || category === 'Select a category') {
      toast.error('Please select an issue category');
      return;
    }
    if (!description.trim()) {
      toast.error('Please describe the issue');
      return;
    }
    toast.success('Maintenance report submitted successfully! Our team will review within 24 hours.');
    setDescription('');
    setCategory('');
  };

  return (
    <div className="space-y-6 w-full text-[#1E293B] pb-8">
      {/* Title Section */}
      <div>
        <h1 className="font-display font-black text-2xl sm:text-3xl text-[#1E293B] tracking-tight">
          Report Issue
        </h1>
      </div>

      {/* Main 2-Column vs 1-Column Grid Layout matching exact mockup aspect ratios */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column (Takes up 2 spans on desktop) */}
        <div className="lg:col-span-2 space-y-6 min-w-0">
          
          {/* New Maintenance Request Card */}
          <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-6">
            <div>
              <h2 className="font-black text-lg sm:text-xl text-[#1E293B] font-display">New Maintenance Request</h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">
                Please provide details about the issue. Our maintenance team typically responds within 24 hours.
              </p>
            </div>

            {/* Row 1: Category and Priority */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start pt-2">
              <div>
                <label className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider block mb-2">ISSUE CATEGORY</label>
                <div className="relative">
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-[#04332C]/20 cursor-pointer"
                  >
                    <option value="">Select a category</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Electrical">Electrical</option>
                    <option value="HVAC / Heating">HVAC / Heating</option>
                    <option value="Appliance">Appliance</option>
                    <option value="Structural / Pest">Structural / Pest</option>
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
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the problem, location, and when it started..."
                className="w-full p-4 rounded-xl border border-gray-200 bg-[#F8FAFC]/50 text-xs font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#04332C]/20 resize-none"
              />
            </div>

            {/* Row 3: Upload Media */}
            <div>
              <label className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider block mb-2">UPLOAD PHOTOS/VIDEOS</label>
              <div 
                onClick={() => toast.info('File upload dialog opening...')}
                className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-[#F8FAFC]/50 hover:bg-gray-50 transition-colors cursor-pointer group"
              >
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
                  toast.info('Form cancelled');
                }}
                className="text-xs font-bold text-gray-800 hover:text-black cursor-pointer px-2 py-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#9B3A0E] hover:bg-[#86310b] text-white font-extrabold text-xs tracking-wider uppercase transition-all shadow-sm cursor-pointer"
              >
                Submit Report
              </button>
            </div>
          </form>

        </div>

        {/* Right Column (Takes up 1 span on desktop) */}
        <div className="space-y-6 min-w-0">
          
          {/* Emergency Contacts Card */}
          <div className="bg-[#04332C] text-white rounded-xl p-6 shadow-md space-y-5 relative overflow-hidden">
            <div className="flex items-center gap-2.5">
              <Asterisk size={20} className="text-[#FF8C5A] shrink-0" strokeWidth={3} />
              <h3 className="font-black text-base text-white font-display">Emergency Contacts</h3>
            </div>

            <p className="text-xs text-[#FAF7F2]/80 font-medium leading-relaxed">
              If you are experiencing a life-threatening emergency, call 911 immediately. For urgent building issues, use the contacts below.
            </p>

            <div className="space-y-3 pt-1">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-1">
                <span className="text-[9px] font-extrabold text-gray-300 tracking-widest uppercase block">24/7 ON-CALL MAINTENANCE</span>
                <span className="font-mono font-bold text-base text-white tracking-wide block">(555) 012-3456</span>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-1">
                <span className="text-[9px] font-extrabold text-gray-300 tracking-widest uppercase block">BUILDING SECURITY</span>
                <span className="font-mono font-bold text-base text-white tracking-wide block">(555) 012-9988</span>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-1">
                <span className="text-[9px] font-extrabold text-gray-300 tracking-widest uppercase block">CONCIERGE DESK</span>
                <span className="font-mono font-bold text-base text-white tracking-wide block">(555) 012-7722</span>
              </div>
            </div>
          </div>

          {/* Common Issues Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
            <h3 className="font-black text-base text-[#1E293B] font-display">Common Issues</h3>

            <div className="divide-y divide-gray-100 -my-1">
              <div 
                onClick={() => toast.info('Viewing instructions: How to reset a circuit breaker')}
                className="py-3.5 flex items-center justify-between text-xs font-bold text-gray-700 hover:text-black transition-colors cursor-pointer group"
              >
                <span>How to reset a circuit breaker?</span>
                <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </div>

              <div 
                onClick={() => toast.info('Viewing instructions: Water heater troubleshooting')}
                className="py-3.5 flex items-center justify-between text-xs font-bold text-gray-700 hover:text-black transition-colors cursor-pointer group"
              >
                <span>Water heater troubleshooting</span>
                <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </div>

              <div 
                onClick={() => toast.info('Viewing instructions: Reporting unauthorized parking')}
                className="py-3.5 flex items-center justify-between text-xs font-bold text-gray-700 hover:text-black transition-colors cursor-pointer group"
              >
                <span>Reporting unauthorized parking</span>
                <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </div>
            </div>
          </div>

          {/* Recent Tickets Card */}
          <div className="bg-[#F8F6F0] border border-gray-200/60 p-6 rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-base text-[#1E293B] font-display">Recent Tickets</h3>
              <span className="bg-[#04332C] text-white font-black text-[9px] uppercase tracking-wider px-2 py-0.5 rounded shadow-2xs">
                2 Open
              </span>
            </div>

            <div className="space-y-3.5 pt-1">
              <div 
                onClick={() => toast.info('Opening ticket #REQ-4491 details...')}
                className="space-y-1 cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#04332C] shrink-0" />
                  <h4 className="font-black text-xs text-[#1E293B] group-hover:underline">Kitchen Sink Leaking</h4>
                </div>
                <p className="text-[11px] font-semibold text-gray-500 pl-4">#REQ-4491 • In Progress</p>
              </div>

              <div className="pt-3.5 border-t border-gray-200/50">
                <div 
                  onClick={() => toast.info('Opening ticket #REQ-4480 details...')}
                  className="space-y-1 cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-400 shrink-0" />
                    <h4 className="font-black text-xs text-[#1E293B] group-hover:underline">AC Filter Replacement</h4>
                  </div>
                  <p className="text-[11px] font-semibold text-gray-500 pl-4">#REQ-4480 • Resolved</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default TenantReportIssue;
