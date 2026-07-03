import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plus, MapPin, MoreVertical, Building2, LayoutGrid, List,
  Landmark, Users, TrendingUp, TrendingDown, CheckCircle2, AlertTriangle
} from 'lucide-react';
import { getProperties } from '../../services/propertyService';
import { ContentCardSkeleton } from '../../components/ui/SkeletonLoader';

const Properties = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [activeTab, setActiveTab] = useState('all');

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['properties'],
    queryFn: getProperties,
  });

  const totalUnitsComputed = properties.reduce((sum, p) => sum + (p.totalUnits || 0), 0) || 120;
  const occupiedUnitsComputed = properties.reduce((sum, p) => sum + (p.occupiedUnits || 0), 0) || 113;
  const avgOccupancyComputed = totalUnitsComputed > 0 ? ((occupiedUnitsComputed / totalUnitsComputed) * 100).toFixed(1) : '94.2';

  // Filter properties based on active tab
  const filteredProperties = properties.filter((p) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'residential') return p.propertyType === 'residential' || p.type?.toLowerCase() === 'residential';
    if (activeTab === 'commercial') return p.propertyType === 'commercial' || p.type?.toLowerCase() === 'commercial';
    if (activeTab === 'maintenance') return p.status === 'action_required' || p.maintenanceScore < 80;
    return true;
  });

  const filterTabs = [
    { id: 'all', label: 'All Properties' },
    { id: 'residential', label: 'Residential' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'maintenance', label: 'Under Maintenance', count: 2 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 m-0">Property Portfolio</h1>
          <p className="text-gray-500 text-sm mt-1">Managing {properties.length || 8} properties · {totalUnitsComputed} total units · {avgOccupancyComputed}% avg occupancy.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => window.location.href = '/landlord/properties/new'} className="px-4 py-2 bg-[#072F29] text-white rounded-xl text-sm font-bold hover:bg-[#05221e] transition-colors shadow-sm inline-flex items-center gap-2 cursor-pointer border-none">
            <Plus size={16} /> Add New Property
          </button>
          <button onClick={() => setViewMode(v => v === 'grid' ? 'list' : 'grid')} className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm inline-flex items-center gap-2 cursor-pointer">
            {viewMode === 'grid' ? <List size={16} /> : <LayoutGrid size={16} />}
            {viewMode === 'grid' ? 'List View' : 'Grid View'}
          </button>
        </div>
      </div>

      {/* Metrics Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-5">
        {/* Total Portfolio Value */}
        <div className="bg-white rounded-xl border border-gray-200/80 p-6 card-shadow flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-sm font-semibold uppercase text-gray-800">Total Portfolio Value</span>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#E8F4F1] text-[#0B4F45] flex items-center justify-center">
              <Landmark size={17} />
            </div>
          </div>
          <div>
            <div className="!text-2xl sm:!text-3xl !font-black !text-gray-900 !mt-3 !mb-0 !tracking-tight">₦14.2B</div>
            <div className="flex items-center gap-1 !text-xs !font-bold !text-emerald-600 !mt-2 !mb-0">
              <TrendingUp size={13} /> +2.4% from last quarter
            </div>
          </div>
        </div>

        {/* Total Units */}
        <div className="bg-white rounded-xl border border-gray-200/80 p-6 card-shadow flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-sm font-semibold uppercase text-gray-800">Total Units</span>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#E8F4F1] text-[#0B4F45] flex items-center justify-center">
              <Building2 size={17} />
            </div>
          </div>
          <div>
            <div className="!text-2xl sm:!text-3xl !font-black !text-gray-900 !mt-3 !mb-0 !tracking-tight">{totalUnitsComputed}</div>
            <div className="!text-xs !font-semibold !text-gray-500 !mt-2 !mb-0">
              Across {properties.length || 8} properties
            </div>
          </div>
        </div>

        {/* Avg. Occupancy */}
        <div className="bg-white rounded-xl border border-gray-200/80 p-6 card-shadow flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-sm font-semibold uppercase text-gray-800">Avg. Occupancy</span>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#FCECE7] text-[#9A3B1B] flex items-center justify-center">
              <Users size={17} />
            </div>
          </div>
          <div>
            <div className="!text-2xl sm:!text-3xl !font-black !text-gray-900 !mt-3 !mb-0 !tracking-tight">{avgOccupancyComputed}%</div>
            <div className="flex items-center gap-1 !text-xs !font-bold !text-rose-600 !mt-2 !mb-0">
              <TrendingDown size={13} /> -0.5% from last month
            </div>
          </div>
        </div>
      </div>

      {/* Filter Pills Row */}
      <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-gray-200/80 pb-5">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3.5 py-1.5 rounded-full !text-xs !font-bold shadow-sm transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#072F29] !text-white'
                : 'bg-white border border-gray-200/80 !text-gray-700 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                  activeTab === tab.id ? 'bg-[#9A3B1B] text-white' : 'bg-[#FCECE7] text-[#9A3B1B]'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Properties List / Grid Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <ContentCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredProperties.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200/80 p-12 text-center card-shadow">
          <Building2 size={40} className="mx-auto text-gray-300 mb-3" />
          <h3 className="!text-base !font-bold !text-gray-800">No properties found</h3>
          <p className="!text-xs sm:!text-sm !text-gray-500 !mt-1 max-w-sm mx-auto">
            There are no properties matching this filter criteria. Try choosing another category or add a new property.
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property, index) => {
            const isHealthy = property.status === 'healthy' || property.maintenanceScore >= 80;

            return (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.05 }}
              >
                <div className="bg-white rounded-xl border border-gray-200/80 card-shadow hover:shadow-md hover:border-[#0B4F45]/30 transition-all duration-200 overflow-hidden flex flex-col h-full group">
                  {/* Image Header */}
                  <div className="h-44 relative overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={property.coverImage}
                      alt={property.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Status Badge */}
                    <div className="absolute top-3 right-3 z-10">
                      {isHealthy ? (
                        <span className="bg-[#E8F4F1] text-[#0B4F45] font-extrabold text-[9px] tracking-wider uppercase px-2 py-0.5 rounded shadow-sm backdrop-blur-md">
                          HEALTHY
                        </span>
                      ) : (
                        <span className="bg-[#FCECE7] text-[#9A3B1B] font-extrabold text-[9px] tracking-wider uppercase px-2 py-0.5 rounded shadow-sm backdrop-blur-md">
                          ACTION REQUIRED
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col flex-1 bg-white">
                    {/* Title Row */}
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="!font-bold !text-gray-900 !text-sm sm:!text-base !m-0 !truncate flex-1 group-hover:text-[#0B4F45] transition-colors">
                        {property.name}
                      </h3>
                      <button
                        className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0 cursor-pointer"
                        aria-label="More options"
                      >
                        <MoreVertical size={16} />
                      </button>
                    </div>

                    {/* Location Row */}
                    <div className="flex items-center gap-1 !text-xs !font-medium !text-gray-500 !mt-1 !mb-0">
                      <MapPin size={12} className="text-gray-400 flex-shrink-0" />
                      <span className="truncate">{property.address || `${property.city}, ${property.state}`}</span>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-100 my-3.5" />

                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-1">
                      <div>
                        <div className="!text-[9px] !font-bold !tracking-wider !text-gray-400 !uppercase !mb-0">UNITS</div>
                        <div className="!text-xs sm:!text-sm !font-bold !text-gray-800 !mt-0.5 !mb-0 font-mono">
                          {property.occupiedUnits}/{property.totalUnits}
                        </div>
                      </div>

                      <div className="border-l border-gray-100 pl-2.5">
                        <div className="!text-[9px] !font-bold !tracking-wider !text-gray-400 !uppercase !mb-0">REVENUE/MO</div>
                        <div className="!text-xs sm:!text-sm !font-bold !text-gray-800 !mt-0.5 !mb-0 font-mono">
                          ₦{(property.monthlyRevenue / 1000000).toFixed(1)}M
                        </div>
                      </div>

                      <div className="border-l border-gray-100 pl-2.5">
                        <div className="!text-[9px] !font-bold !tracking-wider !text-gray-400 !uppercase !mb-0">MAINT. SCORE</div>
                        <div className="!mt-0.5 flex items-center gap-1">
                          {isHealthy ? (
                            <>
                              <span className="!text-xs sm:!text-sm !font-bold !text-emerald-600 font-mono">
                                {property.maintenanceScore}%
                              </span>
                              <CheckCircle2 size={12} className="text-emerald-500 flex-shrink-0 inline" />
                            </>
                          ) : (
                            <>
                              <span className="!text-xs sm:!text-sm !font-bold !text-rose-600 font-mono">
                                {property.maintenanceScore}%
                              </span>
                              <AlertTriangle size={12} className="text-rose-500 flex-shrink-0 inline" />
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <div className="mt-4 pt-1">
                      <Link
                        to={`/landlord/properties/${property.id}`}
                        className="block w-full py-2 px-3 rounded-xl border border-gray-200/90 hover:border-gray-300 bg-white hover:bg-gray-50 !text-gray-800 !font-bold !text-xs text-center transition-all shadow-sm active:scale-[0.99]"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="space-y-3">
          {filteredProperties.map((property, index) => {
            const isHealthy = property.status === 'healthy' || property.maintenanceScore >= 80;

            return (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: index * 0.03 }}
              >
                <div className="bg-white rounded-xl border border-gray-200/80 card-shadow hover:shadow-md hover:border-[#0B4F45]/30 p-6 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group">
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <img
                      src={property.coverImage}
                      alt={property.name}
                      className="w-16 h-16 rounded-xl object-cover bg-gray-100 flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="!font-bold !text-gray-900 !text-sm sm:!text-base !m-0 truncate group-hover:text-[#0B4F45] transition-colors">
                          {property.name}
                        </h3>
                        {isHealthy ? (
                          <span className="bg-[#E8F4F1] text-[#0B4F45] font-extrabold text-[9px] tracking-wider uppercase px-2 py-0.5 rounded">
                            HEALTHY
                          </span>
                        ) : (
                          <span className="bg-[#FCECE7] text-[#9A3B1B] font-extrabold text-[9px] tracking-wider uppercase px-2 py-0.5 rounded">
                            ACTION REQUIRED
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 !text-xs !font-medium !text-gray-500 !m-0">
                        <MapPin size={12} className="text-gray-400 flex-shrink-0" />
                        <span className="truncate">{property.address || `${property.city}, ${property.state}`}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                    <div className="text-left sm:text-right">
                      <div className="!text-[9px] !font-bold !tracking-wider !text-gray-400 !uppercase !mb-0">UNITS</div>
                      <div className="!text-xs sm:!text-sm !font-bold !text-gray-800 font-mono !m-0">{property.occupiedUnits}/{property.totalUnits}</div>
                    </div>

                    <div className="text-left sm:text-right">
                      <div className="!text-[9px] !font-bold !tracking-wider !text-gray-400 !uppercase !mb-0">REVENUE</div>
                      <div className="!text-xs sm:!text-sm !font-bold !text-gray-800 font-mono !m-0">₦{(property.monthlyRevenue / 1000000).toFixed(1)}M/mo</div>
                    </div>

                    <div className="text-left sm:text-right">
                      <div className="!text-[9px] !font-bold !tracking-wider !text-gray-400 !uppercase !mb-0">MAINT.</div>
                      <div className="!text-xs sm:!text-sm !font-bold font-mono flex items-center gap-1 !m-0">
                        <span className={isHealthy ? 'text-emerald-600' : 'text-rose-600'}>
                          {property.maintenanceScore}%
                        </span>
                        {isHealthy ? (
                          <CheckCircle2 size={12} className="text-emerald-500" />
                        ) : (
                          <AlertTriangle size={12} className="text-rose-500" />
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/landlord/properties/${property.id}`}
                        className="py-2 px-3.5 rounded-xl border border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 !text-gray-800 !font-bold !text-xs transition-all shadow-sm whitespace-nowrap"
                      >
                        View Details
                      </Link>
                      <button
                        className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors hidden md:block cursor-pointer"
                        aria-label="More options"
                      >
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Properties;
