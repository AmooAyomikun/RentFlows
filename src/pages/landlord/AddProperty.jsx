import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, MapPin, ChevronDown, ArrowRight, Lightbulb, Shield, Headphones
} from 'lucide-react';
import { toast } from 'sonner';

const steps = [
  { num: 1, label: 'Basic Info', active: true },
  { num: 2, label: 'Units', active: false },
  { num: 3, label: 'Financials', active: false },
  { num: 4, label: 'Media', active: false },
];

const AddProperty = () => {
  const navigate = useNavigate();
  const [propName, setPropName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [propType, setPropType] = useState('Multi-Family');

  const handleNext = (e) => {
    e.preventDefault();
    if (!propName || !address || !city) {
      toast.error('Please complete all basic property details');
      return;
    }
    toast.success('Basic details saved. Proceeding to Unit Configuration.');
    navigate('/landlord/properties');
  };

  return (
    <div className="font-sans text-gray-900 pb-12 max-w-5xl mx-auto">
      {/* ── TOP NAV HEADER ── */}
      <div className="flex items-center gap-4 mb-10">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 rounded-xl text-gray-700 hover:bg-gray-100 hover:text-black transition-colors border-none bg-transparent cursor-pointer flex items-center justify-center"
          aria-label="Back"
        >
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-2xl sm:text-[28px] font-display font-extrabold text-[#072F29] tracking-tight m-0">Add New Property</h1>
      </div>

      {/* ── STEPPER HEADER REPLICATING EXACT SCREENSHOT ── */}
      <div className="max-w-3xl mx-auto mb-10 px-4">
        <div className="relative flex items-center justify-between">
          {/* Connecting Line */}
          <div className="absolute top-4 left-6 right-6 h-0.5 bg-gray-200 -z-0" />

          {steps.map((step) => (
            <div key={step.num} className="flex flex-col items-center relative z-10 bg-transparent">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                  step.active
                    ? 'bg-[#072F29] text-white shadow-md shadow-[#072F29]/20 scale-105'
                    : 'bg-white border-2 border-gray-300 text-gray-500'
                }`}
              >
                {step.num}
              </div>
              <span
                className={`text-xs mt-2.5 transition-colors ${
                  step.active ? 'font-black text-gray-900' : 'font-medium text-gray-500'
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── CENTER FORM CARD ── */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs overflow-hidden max-w-4xl mx-auto mb-8">
        <div className="p-6 sm:p-8 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900 m-0">Property Basics</h2>
          <p className="text-xs sm:text-sm text-gray-500 m-0 mt-1 font-medium">Start by defining the core identity of your new asset.</p>
        </div>

        <form onSubmit={handleNext}>
          <div className="p-6 sm:p-8 space-y-6">
            {/* Property Name */}
            <div>
              <label className="text-xs font-bold text-gray-800 mb-2 block">Property Name</label>
              <input
                type="text"
                placeholder="e.g. Sunset Heights Apartment Complex"
                value={propName}
                onChange={(e) => setPropName(e.target.value)}
                className="w-full rounded-xl border border-gray-300 p-3.5 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#072F29]/20 focus:outline-none font-medium box-border"
              />
            </div>

            {/* Street Address */}
            <div>
              <label className="text-xs font-bold text-gray-800 mb-2 block">Street Address</label>
              <div className="relative">
                <MapPin size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="123 Real Estate Way"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 p-3.5 pl-10 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#072F29]/20 focus:outline-none font-medium box-border"
                />
              </div>
            </div>

            {/* City & Property Type Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold text-gray-800 mb-2 block">City</label>
                <input
                  type="text"
                  placeholder="Austin"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 p-3.5 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#072F29]/20 focus:outline-none font-medium box-border"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-800 mb-2 block">Property Type</label>
                <div className="relative">
                  <select
                    value={propType}
                    onChange={(e) => setPropType(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 p-3.5 text-xs sm:text-sm text-gray-900 appearance-none focus:ring-2 focus:ring-[#072F29]/20 focus:outline-none font-medium bg-white cursor-pointer box-border pr-10"
                  >
                    <option>Multi-Family</option>
                    <option>Single Family Residential</option>
                    <option>Commercial Retail</option>
                    <option>Mixed-Use Complex</option>
                  </select>
                  <ChevronDown size={17} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Form Footer Replicating Screenshot Copy */}
          <div className="bg-gray-50/80 p-6 sm:p-8 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              className="bg-[#C75B30] hover:bg-[#b5522b] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-xs inline-flex items-center gap-2.5 transition-all active:scale-[0.98] cursor-pointer border-none"
            >
              <span>Next: Unit Details</span>
              <ArrowRight size={17} strokeWidth={2.5} />
            </button>
          </div>
        </form>
      </div>

      {/* ── BOTTOM HELP GUIDANCE CARDS ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {/* Card 1 */}
        <div className="bg-[#072F29] text-white rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
          <Lightbulb size={20} className="text-teal-300 mb-4" />
          <p className="text-xs text-white/80 leading-relaxed m-0 font-medium">
            Filling out unit details accurately helps our automated occupancy forecasting engine.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-2xs flex flex-col justify-between">
          <Shield size={20} className="text-[#C75B30] mb-4" />
          <p className="text-xs text-gray-600 leading-relaxed m-0 font-medium">
            Your documents are encrypted and stored in SOC2 compliant cloud infrastructure.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-2xs flex flex-col justify-between">
          <Headphones size={20} className="text-[#072F29] mb-4" />
          <p className="text-xs text-gray-600 leading-relaxed m-0 font-medium">
            Need help with financial entries? Our support team is available 24/7.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
