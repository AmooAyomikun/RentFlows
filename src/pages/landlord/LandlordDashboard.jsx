import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {
  Building2, Users, CreditCard, AlertTriangle,
  Wrench, TrendingUp, ArrowRight, Bell, Calendar,
  Wallet, DollarSign, CheckCircle2, ArrowDownLeft,
  ArrowUpRight, FileText, Search, Filter, MoreVertical,
  Plus, Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getProperties } from '../../services/propertyService';
import { getPropertyPhoto } from '../../utils/propertyPhotos';

const revenueChartData = [
  { month: 'Jan', Residential: 30000, Commercial: 20000 },
  { month: 'Feb', Residential: 36000, Commercial: 21000 },
  { month: 'Mar', Residential: 38000, Commercial: 36000 },
  { month: 'Apr', Residential: 48000, Commercial: 20000 },
  { month: 'May', Residential: 75000, Commercial: 26000 },
  { month: 'Jun', Residential: 75000, Commercial: 19000 },
  { month: 'Jul', Residential: 96000, Commercial: 18000 },
];

const quarterlyRevenueData = [
  { month: 'Q1', Residential: 104000, Commercial: 77000 },
  { month: 'Q2', Residential: 198000, Commercial: 65000 },
  { month: 'Q3', Residential: 246000, Commercial: 63000 },
  { month: 'Q4', Residential: 285000, Commercial: 84000 },
];

const recentActivities = [
  {
    id: 1,
    title: 'Rent Received: Unit 4B',
    desc: 'Simisola Alabi paid ₦2,450,000 via Bank Transfer.',
    time: '10 mins ago',
    icon: DollarSign,
    iconBg: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 2,
    title: 'New Maintenance Request',
    desc: 'Leaking faucet reported in 12A Lekki Palms.',
    time: '2 hours ago',
    icon: Wrench,
    iconBg: 'bg-orange-100 text-orange-600',
  },
  {
    id: 3,
    title: 'Lease Ending Soon',
    desc: 'Unit 7C lease expires in 45 days.',
    time: 'Yesterday',
    icon: FileText,
    iconBg: 'bg-purple-100 text-purple-600',
  },
  {
    id: 4,
    title: 'Work Order Completed',
    desc: 'HVAC repair finished at Banana Island Lofts.',
    time: 'Yesterday',
    icon: CheckCircle2,
    iconBg: 'bg-gray-100 text-gray-600',
  },
];

const fallbackPropertiesData = [
  {
    id: 'prop-1',
    name: 'Victoria Island Towers',
    address: 'Adeola Odeku St, Victoria Island, Lagos',
    type: 'Multi-family',
    units: 48,
    occupancy: 96,
    revenue: '₦115,200,000',
    status: '+ Excellent',
    statusBg: 'bg-emerald-100 text-emerald-800',
    barBg: 'bg-[#0B4F45]',
    coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
  },
  {
    id: 'prop-2',
    name: 'Lekki Palms Mall',
    address: 'Admiralty Way, Lekki Phase 1, Lagos',
    type: 'Commercial',
    units: 12,
    occupancy: 100,
    revenue: '₦48,500,000',
    status: '+ Excellent',
    statusBg: 'bg-emerald-100 text-emerald-800',
    barBg: 'bg-[#0B4F45]',
    coverImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80',
  },
  {
    id: 'prop-3',
    name: 'Banana Island Lofts',
    address: 'Banana Island, Ikoyi, Lagos',
    type: 'Multi-family',
    units: 24,
    occupancy: 82,
    revenue: '₦34,200,000',
    status: '! Attention',
    statusBg: 'bg-amber-100 text-amber-800',
    barBg: 'bg-amber-500',
    coverImage: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=600&q=80',
  },
];

const outstandingRentData = [
  { id: 1, name: 'Chinedu Okafor', unit: 'Victoria Island 12B', amount: '₦1,200,000', overdue: '15 days', alert: 'text-rose-600' },
  { id: 2, name: 'Amina Yusuf', unit: 'Banana Island 4A', amount: '₦950,000', overdue: '8 days', alert: 'text-amber-600' },
  { id: 3, name: 'Babatunde Johnson', unit: 'Lekki Palms Suite 3', amount: '₦2,100,000', overdue: '32 days', alert: 'text-rose-600' },
];

const recentPaymentsData = [
  { id: 1, date: 'Oct 24', name: 'Simisola Alabi', unit: 'Victoria Island 4B', amount: '₦2,400,000', status: 'Completed', statusBg: 'bg-emerald-100 text-emerald-700' },
  { id: 2, date: 'Oct 23', name: 'Musa Rano', unit: 'Banana Island 12C', amount: '₦1,850,000', status: 'Pending', statusBg: 'bg-amber-100 text-amber-700' },
  { id: 3, date: 'Oct 23', name: 'Emeka Nnamdi', unit: 'Victoria Island 9A', amount: '₦2,100,000', status: 'Completed', statusBg: 'bg-emerald-100 text-emerald-700' },
];

const LandlordDashboard = () => {
  const [chartPeriod, setChartPeriod] = useState('Monthly');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: properties = [] } = useQuery({
    queryKey: ['properties'],
    queryFn: getProperties,
  });

  const displayProps = properties && properties.length > 0
    ? properties.slice(0, 3).map((p, idx) => ({
        id: p.id,
        name: p.name,
        address: p.address || 'Lekki Phase 1',
        type: p.type || 'Apartment',
        units: p.totalUnits || 8,
        occupancy: p.totalUnits ? Math.round((p.occupiedUnits / p.totalUnits) * 100) : 88,
        revenue: `₦${(p.monthlyRevenue || 2800000).toLocaleString()}`,
        status: idx === 2 ? '! Attention' : '+ Excellent',
        statusBg: idx === 2 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800',
        barBg: idx === 2 ? 'bg-amber-500' : 'bg-[#0B4F45]',
        coverImage: p.coverImage || getPropertyPhoto(idx),
      }))
    : fallbackPropertiesData;

  const filteredProps = displayProps.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans text-gray-900 pb-8">
      {/* Overview header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Overview</h1>
          <p className="text-base text-[#4A4F4C] font-medium mt-0.5">Welcome back, here's what's happening with your properties today.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-gray-200/80 text-xs font-bold text-gray-700 shadow-sm sm:self-start hover:bg-gray-50 transition-colors">
          <Calendar size={14} className="text-gray-400" />
          <span>Oct 24, 2023</span>
        </button>
      </div>

      {/* Top KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <div className="bg-white rounded-xl p-6 border border-gray-200/80 card-shadow flex flex-col justify-between min-h-[96px]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Total Revenue</span>
            <div className="w-6 h-6 rounded-lg bg-gray-50 flex items-center justify-center text-gray-600">
              <Wallet size={14} />
            </div>
          </div>
          <div className="my-1">
            <h2 className="text-xl font-black text-gray-900 tracking-tight">₦124.5M</h2>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold">
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-emerald-100/80 text-emerald-700 font-bold text-[10px]">
              <TrendingUp size={10} /> 12.5%
            </span>
            <span className="text-gray-400 font-medium text-[10px]">vs last month</span>
          </div>
        </div>

        {/* Occupancy Rate */}
        <div className="bg-white rounded-xl p-6 border border-gray-200/80 card-shadow flex flex-col justify-between min-h-[96px]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Occupancy Rate</span>
            <div className="w-6 h-6 rounded-lg bg-gray-50 flex items-center justify-center text-gray-600">
              <Building2 size={14} />
            </div>
          </div>
          <div className="my-1">
            <h2 className="text-xl font-black text-gray-900 tracking-tight">94%</h2>
          </div>
          <div className="flex items-center gap-2.5 text-[10px] text-gray-500 font-medium">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#072F29]" /> Occupied: 112
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-200" /> Vacant: 8
            </span>
          </div>
        </div>

        {/* Maintenance */}
        <div className="bg-white rounded-xl p-6 border border-gray-200/80 card-shadow flex flex-col justify-between min-h-[96px]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Maintenance</span>
            <div className="w-6 h-6 rounded-lg bg-amber-50 flex items-center justify-center text-[#C75B30]">
              <Wrench size={14} />
            </div>
          </div>
          <div className="my-1 flex items-baseline justify-between">
            <h2 className="text-xl font-black text-gray-900 tracking-tight">14</h2>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C75B30]" />
              <span className="text-[11px] font-bold text-[#C75B30]">High Priority</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] font-medium text-gray-400 pt-1 border-t border-gray-100">
            <span>Avg Resolution</span>
            <span className="text-gray-700 font-bold">1.2 Days</span>
          </div>
        </div>

        {/* Collection Rate */}
        <div className="bg-white rounded-xl p-6 border border-gray-200/80 card-shadow flex flex-col justify-between min-h-[96px]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Collection Rate</span>
            <div className="w-6 h-6 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <DollarSign size={14} />
            </div>
          </div>
          <div className="my-1 flex items-baseline justify-between">
            <h2 className="text-xl font-black text-gray-900 tracking-tight">98.2%</h2>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-rose-100/80 text-rose-700 font-bold text-[10px]">
              -0.5%
            </span>
          </div>
          <div className="text-[10px] text-gray-400 font-medium truncate">
            ₦2,450,000 outstanding. <Link to="/landlord/payments" className="text-[#072F29] hover:underline font-bold">Remind</Link>
          </div>
        </div>
      </div>

      {/* Upper Section: Portfolio Revenue Chart (8 cols) vs Cash Flow & Recent Activity (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Portfolio Revenue Bar Chart */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="bg-white rounded-xl p-6 border border-gray-200/80 card-shadow flex flex-col flex-1">
            <div className="flex items-center justify-between pb-3 flex-shrink-0">
              <div>
                <h3 className="text-sm font-semibold uppercase text-gray-800">Portfolio Revenue</h3>
                <p className="text-base text-[#4A4F4C] font-medium mt-0.5">{chartPeriod} trends across property types</p>
              </div>
              <div className="bg-gray-100/80 p-0.5 rounded-xl flex items-center text-[11px] font-bold">
                <button
                  onClick={() => setChartPeriod('Monthly')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${chartPeriod === 'Monthly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setChartPeriod('Quarterly')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${chartPeriod === 'Quarterly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  Quarterly
                </button>
              </div>
            </div>

            <div className="w-full flex-1 min-h-[220px] pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartPeriod === 'Monthly' ? revenueChartData : quarterlyRevenueData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }} barSize={30}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af', fontWeight: 500 }} dy={6} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af', fontWeight: 500 }} tickFormatter={(val) => `₦${val / 1000}M`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', fontSize: '11px' }}
                    formatter={(val) => [`₦${val.toLocaleString()}`, '']}
                  />
                  <Legend
                    verticalAlign="bottom"
                    align="center"
                    iconType="circle"
                    iconSize={7}
                    wrapperStyle={{ paddingTop: '10px', fontSize: '10px', fontWeight: 600, color: '#4b5563' }}
                  />
                  <Bar dataKey="Commercial" stackId="a" fill="#A7F3D0" radius={[0, 0, 3, 3]} />
                  <Bar dataKey="Residential" stackId="a" fill="#072F29" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right: Cash Flow Card + Recent Activity Card */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Cash Flow Card */}
          <div className="bg-white rounded-xl p-6 border border-gray-200/80 card-shadow flex-shrink-0">
            <h3 className="text-sm font-semibold uppercase text-gray-800 pb-2.5">Cash Flow</h3>

            <div className="flex items-center justify-between pb-2.5 border-b border-gray-100">
              <div>
                <span className="text-[11px] text-gray-400 font-medium">Net Income</span>
                <h4 className="text-xl font-black text-gray-900 mt-0.5">₦82.43M</h4>
              </div>
              <div className="relative w-9 h-9 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path className="text-gray-100" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-[#072F29]" strokeDasharray="75, 100" strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
              </div>
            </div>

            <div className="pt-2.5 space-y-2.5">
              <div>
                <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                  <span className="flex items-center gap-1 text-emerald-700">
                    <ArrowDownLeft size={13} /> Inflow
                  </span>
                  <span className="text-gray-900">₦124.5M</span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#072F29] h-full rounded-full w-[85%]" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                  <span className="flex items-center gap-1 text-rose-600">
                    <ArrowUpRight size={13} /> Outflow
                  </span>
                  <span className="text-gray-900">₦42.07M</span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#C75B30] h-full rounded-full w-[35%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Card */}
          <div className="bg-white rounded-xl p-6 border border-gray-200/80 card-shadow flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-2.5">
              <h3 className="text-sm font-semibold uppercase text-gray-800">Recent Activity</h3>
              <Link to="/landlord/notifications" className="text-xs font-bold text-[#072F29] hover:underline">View All</Link>
            </div>

            <div className="space-y-2.5 divide-y divide-gray-100 flex-1 flex flex-col justify-center">
              {recentActivities.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={item.id} className={`flex gap-3 ${index > 0 ? 'pt-2.5' : ''}`}>
                    <div className={`w-7 h-7 rounded-lg ${item.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <Icon size={13} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-gray-900 leading-snug truncate">{item.title}</h4>
                      <p className="text-[10px] text-gray-500 font-medium mt-0.5 leading-tight truncate">{item.desc}</p>
                      <span className="text-[9px] font-semibold text-gray-400 block mt-0.5">{item.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Full Width Section: Top Performing Properties Table (NO scrolling!) */}
      <div className="w-full">
        <div className="bg-white rounded-xl border border-gray-200/80 card-shadow overflow-hidden">
          <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-gray-100">
            <h3 className="text-sm font-semibold uppercase text-gray-800">Top Performing Properties</h3>

            <div className="flex items-center gap-2">
              <div className="relative flex items-center bg-gray-50 border border-gray-200/80 rounded-xl h-8 px-2.5 w-48 focus-within:bg-white focus-within:border-gray-300 transition-all">
                <Search size={13} className="text-gray-400 mr-1.5 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Filter..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent text-xs text-gray-800 placeholder-gray-400 focus:outline-none"
                />
              </div>

              <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-gray-200/80 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold transition-colors shadow-sm">
                <Filter size={12} className="text-gray-500" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          <div className="w-full overflow-hidden">
            <table className="w-full text-left border-collapse table-fixed">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50 text-[10px] font-bold text-gray-400 tracking-wider uppercase">
                  <th className="py-2.5 px-5 w-[32%]">Property Name</th>
                  <th className="py-2.5 px-4 w-[14%]">Type</th>
                  <th className="py-2.5 px-4 w-[12%]">Units</th>
                  <th className="py-2.5 px-4 w-[18%]">Occupancy</th>
                  <th className="py-2.5 px-4 w-[14%]">Monthly Revenue</th>
                  <th className="py-2.5 px-4 w-[10%]">Status</th>
                  <th className="py-2.5 pr-4 w-[6%]" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-700">
                {filteredProps.map((prop) => (
                  <tr key={prop.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-5 overflow-hidden">
                      <Link to={`/landlord/properties/${prop.id}`} className="flex items-center gap-3 group">
                        <img src={prop.coverImage} alt={prop.name} className="w-8 h-8 rounded-lg object-cover flex-shrink-0 bg-gray-100" />
                        <div className="min-w-0 flex-1">
                          <span className="font-bold text-gray-900 group-hover:text-[#072F29] transition-colors block text-xs truncate">{prop.name}</span>
                          <span className="text-[10px] text-gray-400 block truncate mt-0.5">{prop.address}</span>
                        </div>
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-gray-500 font-medium truncate text-xs">{prop.type}</td>
                    <td className="py-3 px-4 font-bold text-gray-900 text-xs">{prop.units}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-between mb-1 text-[10px] font-bold text-gray-900">
                        <span>{prop.occupancy}%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${prop.barBg}`} style={{ width: `${prop.occupancy}%` }} />
                      </div>
                    </td>
                    <td className="py-3 px-4 font-black text-gray-900 text-xs">{prop.revenue}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold truncate ${prop.statusBg}`}>
                        {prop.status}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-right">
                      <button className="p-1 text-gray-400 hover:text-gray-700 rounded transition-colors">
                        <MoreVertical size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 border-t border-gray-100 text-center bg-gray-50/30">
            <Link to="/landlord/properties" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#072F29] hover:underline">
              <span>View Full Property List</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* NEW SECTION FROM DESIGN: Outstanding Rent & Recent Payments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        {/* Outstanding Rent Table Card */}
        <div className="bg-white rounded-xl border border-gray-200/80 card-shadow overflow-hidden flex flex-col">
          <div className="p-6 flex items-center justify-between border-b border-gray-100">
            <h3 className="text-sm font-semibold uppercase text-gray-800">Outstanding Rent</h3>
            <Link to="/landlord/payments" className="text-xs font-bold text-[#072F29] hover:underline">View All</Link>
          </div>

          <div className="w-full overflow-hidden flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50 text-[10px] font-bold text-gray-400 tracking-wider uppercase">
                  <th className="py-2.5 px-4">Tenant / Unit</th>
                  <th className="py-2.5 px-4">Amount</th>
                  <th className="py-2.5 px-4">Days Overdue</th>
                  <th className="py-2.5 pr-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {outstandingRentData.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-bold text-gray-900 block truncate">{row.name}</span>
                      <span className="text-[10px] text-gray-400 block truncate mt-0.5">{row.unit}</span>
                    </td>
                    <td className={`py-3 px-4 font-black ${row.alert}`}>{row.amount}</td>
                    <td className={`py-3 px-4 font-bold text-[11px] ${row.alert}`}>{row.overdue}</td>
                    <td className="py-3 pr-4 text-right">
                      <button
                        onClick={() => toast.success(`Payment reminder sent to ${row.name}!`)}
                        className="px-2.5 py-1 rounded-lg bg-white border border-gray-200/80 text-[10px] font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer active:scale-95"
                      >
                        Remind
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Payments Table Card */}
        <div className="bg-white rounded-xl border border-gray-200/80 card-shadow overflow-hidden flex flex-col">
          <div className="p-6 flex items-center justify-between border-b border-gray-100">
            <h3 className="text-sm font-semibold uppercase text-gray-800">Recent Payments</h3>
            <Link to="/landlord/payments" className="text-xs font-bold text-[#072F29] hover:underline">View All</Link>
          </div>

          <div className="w-full overflow-hidden flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50 text-[10px] font-bold text-gray-400 tracking-wider uppercase">
                  <th className="py-2.5 px-4">Date</th>
                  <th className="py-2.5 px-4">Tenant / Unit</th>
                  <th className="py-2.5 px-4">Amount</th>
                  <th className="py-2.5 pr-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {recentPaymentsData.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3 px-4 text-gray-500 font-semibold text-[11px]">{row.date}</td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-gray-900 block truncate">{row.name}</span>
                      <span className="text-[10px] text-gray-400 block truncate mt-0.5">{row.unit}</span>
                    </td>
                    <td className="py-3 px-4 font-black text-gray-900">{row.amount}</td>
                    <td className="py-3 pr-4 text-right">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold ${row.statusBg}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* NEW SECTION FROM DESIGN: Maintenance Board Kanban Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-200/80 card-shadow mt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
          <div>
            <h3 className="text-sm font-semibold uppercase text-gray-800">Maintenance Board</h3>
            <p className="text-base text-[#4A4F4C] font-medium mt-0.5">Track ongoing service requests across all properties</p>
          </div>
          <Link
            to="/landlord/maintenance"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#072F29] hover:bg-[#0a3f37] text-white text-xs font-bold transition-all shadow-sm self-start"
          >
            <Plus size={14} />
            <span>New Request</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          {/* Column 1: Received */}
          <div className="bg-gray-50/80 rounded-xl p-3 border border-gray-100/80 flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <span className="font-bold text-xs text-gray-700">Received</span>
              <span className="w-5 h-5 rounded-full bg-gray-200/80 text-gray-700 font-bold text-[10px] flex items-center justify-center">2</span>
            </div>

            <div className="space-y-2.5 flex-1">
              {/* Card 1 */}
              <div className="bg-white p-3 rounded-xl border border-gray-200/70 shadow-sm space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-md">High Priority</span>
                  <span className="text-[10px] text-gray-400 font-medium">2h ago</span>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-gray-900 leading-snug">Leaking faucet in kitchen</h4>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Victoria Island 12A</span>
                </div>
                <div className="flex items-center gap-2 pt-1 border-t border-gray-50">
                  <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-[8px] font-bold text-gray-600">CO</div>
                  <span className="text-[10px] text-gray-600 font-medium">Chinedu Okafor</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-3 rounded-xl border border-gray-200/70 shadow-sm space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-md">Medium</span>
                  <span className="text-[10px] text-gray-400 font-medium">1d ago</span>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-gray-900 leading-snug">Broken window blind</h4>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Banana Island 4A</span>
                </div>
                <div className="flex items-center gap-2 pt-1 border-t border-gray-50">
                  <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-[8px] font-bold text-gray-600">AY</div>
                  <span className="text-[10px] text-gray-600 font-medium">Amina Yusuf</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: In Progress */}
          <div className="bg-gray-50/80 rounded-xl p-3 border border-gray-100/80 flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <span className="font-bold text-xs text-gray-700">In Progress</span>
              <span className="w-5 h-5 rounded-full bg-gray-200/80 text-gray-700 font-bold text-[10px] flex items-center justify-center">1</span>
            </div>

            <div className="space-y-2.5 flex-1">
              <div className="bg-white p-3 rounded-xl border border-gray-200/70 shadow-sm space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-md">High Priority</span>
                  <span className="text-[10px] text-gray-400 font-medium">4h ago</span>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-gray-900 leading-snug">HVAC not cooling</h4>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Lekki Palms Suite 2</span>
                </div>
                <div className="flex items-center gap-2 pt-1 border-t border-gray-50">
                  <div className="w-4 h-4 rounded-full bg-[#072F29]/10 flex items-center justify-center text-[8px] font-bold text-[#072F29]">SA</div>
                  <span className="text-[10px] text-[#072F29] font-bold">Segun Adebayo (Assigned)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Resolved */}
          <div className="bg-gray-50/80 rounded-xl p-3 border border-gray-100/80 flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <span className="font-bold text-xs text-gray-700">Resolved (Last 7d)</span>
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center justify-center">3</span>
            </div>

            <div className="space-y-2.5 flex-1">
              <div className="bg-white p-3 rounded-xl border border-gray-200/70 shadow-sm space-y-2.5 opacity-80">
                <div className="flex items-center justify-between">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md">Resolved</span>
                  <span className="text-[10px] text-gray-400 font-medium">Yesterday</span>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-gray-900 leading-snug line-through text-gray-500">Fix loose railing</h4>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Victoria Island 2C</span>
                </div>
                <div className="flex items-center gap-1.5 pt-1 border-t border-gray-50 text-[10px] text-gray-400 font-medium">
                  <CheckCircle2 size={13} className="text-emerald-600 flex-shrink-0" />
                  <span>Closed Yesterday</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandlordDashboard;
