import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { toast } from 'sonner';
import { getPropertyById } from '../../services/propertyService';

const AddUnit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [unitLabel, setUnitLabel] = useState('');
  const [bedrooms, setBedrooms] = useState('1');
  const [rentAmount, setRentAmount] = useState('');
  const [dueDay, setDueDay] = useState('1');

  const { data: property, isLoading } = useQuery({
    queryKey: ['property', id],
    queryFn: () => getPropertyById(id),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!unitLabel || !rentAmount) {
      toast.error('Please fill in the unit label and rent amount');
      return;
    }
    
    // Simulate creating unit
    toast.success('Unit added successfully');
    navigate(`/landlord/properties/${id}`);
  };

  if (isLoading) return null;

  return (
    <div className="font-sans text-gray-900 pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors border-none bg-transparent cursor-pointer flex items-center justify-center"
        >
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 m-0">Add Unit to {property?.name}</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden max-w-4xl mx-auto mb-8">
        <div className="p-6 border-b border-gray-100 flex items-center gap-2">
          <Home size={18} className="text-[#072F29]" />
          <h2 className="text-sm font-semibold uppercase text-gray-800 m-0">Unit Configuration</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold text-gray-800 mb-2 block">Unit Label / Number</label>
                <input
                  type="text"
                  placeholder="e.g. Apt 4B"
                  value={unitLabel}
                  onChange={(e) => setUnitLabel(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 p-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#072F29]/20 focus:outline-none font-medium box-border"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-800 mb-2 block">Bedrooms</label>
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 p-3.5 text-sm text-gray-900 focus:ring-2 focus:ring-[#072F29]/20 focus:outline-none font-medium box-border"
                >
                  <option value="0">Studio</option>
                  <option value="1">1 Bedroom</option>
                  <option value="2">2 Bedrooms</option>
                  <option value="3">3 Bedrooms</option>
                  <option value="4+">4+ Bedrooms</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold text-gray-800 mb-2 block">Monthly Rent (₦)</label>
                <input
                  type="number"
                  placeholder="e.g. 500000"
                  value={rentAmount}
                  onChange={(e) => setRentAmount(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 p-3.5 text-sm text-gray-900 font-mono focus:ring-2 focus:ring-[#072F29]/20 focus:outline-none box-border"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-800 mb-2 block">Due Day of Month</label>
                <select
                  value={dueDay}
                  onChange={(e) => setDueDay(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 p-3.5 text-sm text-gray-900 focus:ring-2 focus:ring-[#072F29]/20 focus:outline-none font-medium box-border"
                >
                  {[...Array(28)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-gray-50/80 p-6 border-t border-gray-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3.5 text-sm font-bold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#072F29] hover:bg-[#05221e] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-xs inline-flex items-center gap-2 transition-all active:scale-[0.98] cursor-pointer border-none"
            >
              Save Unit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUnit;
