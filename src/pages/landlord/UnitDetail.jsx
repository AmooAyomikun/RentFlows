import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Home, Edit2, UserPlus, CreditCard, Wrench } from 'lucide-react';
import { getPropertyById } from '../../services/propertyService';
import { getUnits } from '../../services/unitService';
import { formatCurrency } from '../../utils/formatCurrency';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const UnitDetail = () => {
  const { id, unitId } = useParams();
  const navigate = useNavigate();

  const { data: property, isLoading: loadingProp } = useQuery({
    queryKey: ['property', id],
    queryFn: () => getPropertyById(id),
  });

  const { data: units = [], isLoading: loadingUnits } = useQuery({
    queryKey: ['property-units', id],
    queryFn: () => getUnits({ propertyId: id }),
  });

  const unit = units.find(u => u.id === unitId) || {
    id: unitId,
    label: 'Unit Name',
    bedrooms: 2,
    rentAmount: 500000,
    dueDay: 1,
    status: 'vacant'
  };

  if (loadingProp || loadingUnits) return null;

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans pb-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(`/landlord/properties/${id}`)}
            className="p-2 -ml-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors border-none bg-transparent cursor-pointer flex items-center justify-center"
          >
            <ArrowLeft size={22} />
          </button>
          <div>
            <div className="text-xs text-[#8A8F8B] font-bold uppercase tracking-wider mb-1">
              {property?.name}
            </div>
            <h1 className="text-2xl font-bold text-gray-900 m-0 flex items-center gap-3">
              {unit.label || unit.name || 'Unit Details'}
              <Badge status={unit.status} label={unit.status === 'occupied' ? 'Occupied' : 'Vacant'} />
            </h1>
          </div>
        </div>
        <Button variant="outline" size="sm" leftIcon={<Edit2 size={14} />}>Edit Unit</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Financials & Details */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <h2 className="text-sm font-semibold uppercase text-gray-800 flex items-center gap-2 mb-6">
              <Home size={18} className="text-[#072F29]" />
              Unit Profile
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div>
                <p className="text-xs font-bold text-[#8A8F8B] uppercase tracking-wider mb-1">Rent</p>
                <p className="text-lg font-mono font-bold text-gray-900">{formatCurrency(unit.rentAmount)}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-[#8A8F8B] uppercase tracking-wider mb-1">Due Date</p>
                <p className="text-base font-semibold text-gray-900">{unit.dueDay}{['1','21','31'].includes(String(unit.dueDay))?'st':['2','22'].includes(String(unit.dueDay))?'nd':['3','23'].includes(String(unit.dueDay))?'rd':'th'} of month</p>
              </div>
              <div>
                <p className="text-xs font-bold text-[#8A8F8B] uppercase tracking-wider mb-1">Bedrooms</p>
                <p className="text-base font-semibold text-gray-900">{unit.bedrooms || 1}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-[#8A8F8B] uppercase tracking-wider mb-1">Status</p>
                <p className="text-base font-semibold text-gray-900 capitalize">{unit.status}</p>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-sm font-semibold uppercase text-gray-800 flex items-center gap-2 mb-6">
              <CreditCard size={18} className="text-[#072F29]" />
              Recent Payments
            </h2>
            <div className="text-sm text-gray-500 text-center py-6">
              No recent payments found for this unit.
            </div>
          </Card>
          
          <Card>
            <h2 className="text-sm font-semibold uppercase text-gray-800 flex items-center gap-2 mb-6">
              <Wrench size={18} className="text-[#072F29]" />
              Maintenance History
            </h2>
            <div className="text-sm text-gray-500 text-center py-6">
              No maintenance requests reported.
            </div>
          </Card>
        </div>

        {/* Right Column - Tenant */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-sm font-semibold uppercase text-gray-800 mb-6">Current Tenant</h2>
            
            {unit.status === 'occupied' ? (
              <div className="text-center pb-4">
                <div className="w-20 h-20 rounded-full bg-[#072F29]/10 text-[#072F29] flex items-center justify-center text-2xl font-bold mx-auto mb-3">
                  S
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Simisola Alabi</h3>
                <p className="text-sm text-gray-500 mb-4">Joined Jul 2026</p>
                <Button className="w-full" variant="outline">View Tenant Profile</Button>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-4">
                  <UserPlus size={24} />
                </div>
                <p className="text-sm text-gray-500 mb-6">This unit is currently vacant.</p>
                <Button className="w-full">Invite Tenant</Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UnitDetail;
