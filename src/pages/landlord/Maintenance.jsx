import { useState } from 'react';
import {
  ClipboardList, Clock, Banknote, AlertTriangle, ArrowRight, MoreHorizontal,
  CheckCircle2, Star, Filter, Plus, Eye, UserPlus, Calendar, History,
  Wrench, Zap, Snowflake
} from 'lucide-react';

const kanbanColumns = [
  {
    id: 'received',
    title: 'Received',
    count: 24,
    dotColor: 'bg-gray-400',
    card: {
      urgent: true,
      tag: 'URGENT',
      tagBg: 'bg-rose-50 text-rose-600',
      code: '#M-2041',
      title: 'Broken Main Pipe',
      location: 'Victoria Island Towers • Unit 4B',
      avatarText: 'UN',
      avatarBg: 'bg-slate-800 text-white',
      footerRight: 'Added 2h ago',
    }
  },
  {
    id: 'in_progress',
    title: 'In-Progress',
    count: 18,
    dotColor: 'bg-[#0B4F45]',
    card: {
      urgent: false,
      tag: 'NORMAL',
      tagBg: 'bg-emerald-50 text-emerald-700',
      code: '#M-1995',
      title: 'HVAC Seasonal Cleaning',
      location: 'Lekki Palms Villas • Amenity Center',
      contractorImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
      contractorName: 'Segun Adebayo',
      footerRight: 'Working',
      footerRightStyle: 'text-teal-700 italic font-bold',
      borderLeft: 'border-l-4 border-emerald-500',
    }
  },
  {
    id: 'completed',
    title: 'Completed',
    count: 106,
    dotColor: 'bg-emerald-500',
    card: {
      urgent: false,
      tag: 'COMPLETED',
      tagBg: 'bg-gray-100 text-gray-600',
      code: '#M-1990',
      title: 'Smart Lock Installation',
      location: 'Banana Island Lofts • Unit 302',
      doneIcon: true,
      doneText: 'Done by Tunde B.',
      footerRight: 'Oct 12',
    }
  }
];

const topProviders = [
  {
    name: 'Precision Plumbing Lagos',
    jobs: 'Completed: 142 Jobs',
    rating: '4.9',
    response: '1.8h response',
    iconBg: 'bg-blue-900 text-white',
    icon: Wrench,
  },
  {
    name: 'VoltMaster Electrical Lagos',
    jobs: 'Completed: 88 Jobs',
    rating: '4.7',
    response: '2.4h response',
    iconBg: 'bg-slate-900 text-white',
    icon: Zap,
  },
  {
    name: 'EcoChill HVAC Abuja',
    jobs: 'Completed: 56 Jobs',
    rating: '4.5',
    response: '3.1h response',
    iconBg: 'bg-teal-50 text-teal-800',
    icon: Snowflake,
  },
];

const recentActivity = [
  {
    id: 'act1',
    date: 'Oct 24, 09:12 AM',
    property: 'Victoria Island Towers',
    unit: 'Unit 4B',
    category: 'Plumbing',
    catIcon: '💧',
    status: 'In-Progress',
    statusBg: 'bg-emerald-100 text-emerald-800',
    actionIcon: Eye,
  },
  {
    id: 'act2',
    date: 'Oct 23, 04:30 PM',
    property: 'Lekki Palms Villas',
    unit: 'Lobby',
    category: 'Electrical',
    catIcon: '⚡',
    status: 'Unassigned',
    statusBg: 'bg-rose-100 text-rose-800',
    actionIcon: UserPlus,
  },
  {
    id: 'act3',
    date: 'Oct 23, 11:15 AM',
    property: 'Maitama Heights',
    unit: 'Unit 12',
    category: 'General',
    catIcon: '🔧',
    status: 'Scheduled',
    statusBg: 'bg-gray-200 text-gray-700',
    actionIcon: Calendar,
  },
  {
    id: 'act4',
    date: 'Oct 22, 02:45 PM',
    property: 'Banana Island Lofts',
    unit: 'Unit 302',
    category: 'Security',
    catIcon: '🛡️',
    status: 'Completed',
    statusBg: 'bg-emerald-100 text-emerald-800',
    actionIcon: History,
  },
];

const Maintenance = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const filteredActivity = selectedCategory === 'All Categories'
    ? recentActivity
    : recentActivity.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="font-sans text-gray-900 pb-12">
      {/* ── PAGE TITLE & SUBTITLE ── */}
      <div className="mb-8">
        <h1 className="text-[28px] font-display font-extrabold text-[#072F29] tracking-tight m-0">Maintenance Management</h1>
        <p className="text-[13px] text-gray-500 font-medium mt-1 m-0">Oversee property health, manage contractor workflows, and optimize operational costs.</p>
      </div>

      {/* ── 4 TOP STAT CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total Active Requests */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs flex flex-col justify-between min-h-[140px]">
          <div className="flex items-center justify-between gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <ClipboardList size={18} />
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">+12%</span>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-800 m-0 mb-1">Total Active Requests</p>
            <p className="text-3xl font-display font-black text-gray-900 m-0 tracking-tight">148</p>
          </div>
        </div>

        {/* Avg. Resolution Time */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs flex flex-col justify-between min-h-[140px]">
          <div className="flex items-center justify-between gap-2">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
              <Clock size={18} />
            </div>
            <span className="text-xs font-bold text-gray-600">-0.5d</span>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-800 m-0 mb-1">Avg. Resolution Time</p>
            <div className="flex items-baseline">
              <span className="text-3xl font-display font-black text-gray-900 m-0 tracking-tight">3.2</span>
              <span className="text-sm font-bold text-gray-500 ml-1">Days</span>
            </div>
          </div>
        </div>

        {/* Maintenance Costs */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs flex flex-col justify-between min-h-[140px]">
          <div className="flex items-center justify-between gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <Banknote size={18} />
            </div>
            <span className="text-xs font-black text-gray-700 tracking-wider">MTD</span>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-800 m-0 mb-1">Maintenance Costs</p>
            <p className="text-3xl font-display font-black text-gray-900 m-0 tracking-tight">₦12,450,000</p>
          </div>
        </div>

        {/* Urgent Repairs */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs flex flex-col justify-between min-h-[140px]">
          <div className="flex items-center justify-between gap-2">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <AlertTriangle size={18} />
            </div>
            <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full">Action Needed</span>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-800 m-0 mb-1">Urgent Repairs</p>
            <p className="text-3xl font-display font-black text-rose-600 m-0 tracking-tight">09</p>
          </div>
        </div>
      </div>

      {/* ── WORKFLOW OVERVIEW (KANBAN BOARD) ── */}
      <div className="mb-8">
        <div className="flex items-center justify-between gap-4 mb-5">
          <h2 className="text-xl font-display font-extrabold text-[#072F29] tracking-tight m-0">Workflow Overview</h2>
          <button className="text-xs font-bold text-gray-800 hover:underline inline-flex items-center gap-1 bg-transparent border-none p-0 cursor-pointer">
            <span>View Full Board</span>
            <ArrowRight size={15} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {kanbanColumns.map(col => (
            <div key={col.id} className="bg-gray-50/80 rounded-2xl p-4 border border-gray-200/60 min-h-[220px]">
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${col.dotColor}`} />
                  <span className="text-xs font-black text-gray-800">{col.title} ({col.count})</span>
                </div>
                <MoreHorizontal size={16} className="text-gray-400 cursor-pointer" />
              </div>

              {/* Kanban Card */}
              <div className={`bg-white rounded-xl border border-gray-200/80 p-4 shadow-2xs relative overflow-hidden transition-all hover:shadow-sm cursor-pointer ${col.card.borderLeft || ''}`}>
                {/* Card Top Pill & ID */}
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded ${col.card.tagBg}`}>
                    {col.card.tag}
                  </span>
                  <span className="text-[11px] font-mono font-semibold text-gray-400">{col.card.code}</span>
                </div>

                {/* Title & Location */}
                <h3 className="text-sm font-bold text-gray-900 m-0 mt-2 mb-1">{col.card.title}</h3>
                <p className="text-xs text-gray-500 m-0 mb-3">{col.card.location}</p>

                {/* Card Footer */}
                <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                  {col.card.avatarText && (
                    <div className={`w-6 h-6 rounded-full ${col.card.avatarBg} flex items-center justify-center text-[10px] font-bold shrink-0`}>
                      {col.card.avatarText}
                    </div>
                  )}

                  {col.card.contractorName && (
                    <div className="flex items-center gap-2 min-w-0">
                      <img src={col.card.contractorImg} alt={col.card.contractorName} className="w-5 h-5 rounded-full object-cover shrink-0" />
                      <span className="text-xs font-bold text-gray-700 truncate">{col.card.contractorName}</span>
                    </div>
                  )}

                  {col.card.doneIcon && (
                    <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                      <CheckCircle2 size={14} className="text-gray-400" />
                      <span>{col.card.doneText}</span>
                    </div>
                  )}

                  <span className={col.card.footerRightStyle || 'text-[11px] font-bold text-gray-800'}>
                    {col.card.footerRight}
                  </span>
                </div>
              </div>

              {/* Extra placeholder card for Kitchen Drawer Alignment under Received */}
              {col.id === 'received' && (
                <div className="bg-white rounded-xl border border-gray-200/80 p-4 shadow-2xs mt-3 relative overflow-hidden transition-all hover:shadow-sm cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-600">
                      MEDIUM
                    </span>
                    <span className="text-[11px] font-mono font-semibold text-gray-400">#M-2038</span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 m-0 mt-2 mb-1">Kitchen Drawer Alignment</h3>
                  <p className="text-xs text-gray-500 m-0 mb-3">Rosewood Estate • Unit 12</p>
                  <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                    <div className="w-6 h-6 rounded-full bg-emerald-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                      JD
                    </div>
                    <span className="text-[11px] font-bold text-gray-800">Added 5h ago</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM SECTION: CONTRACTORS & RECENT ACTIVITY ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Top Providers */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-gray-900 m-0">Top Providers</h2>
              <Filter size={16} className="text-gray-500 cursor-pointer" />
            </div>

            <div className="divide-y divide-gray-100">
              {topProviders.map((provider) => (
                <div key={provider.name} className="py-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-10 h-10 rounded-xl ${provider.iconBg} flex items-center justify-center shrink-0`}>
                      <provider.icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-black text-gray-900 m-0 truncate">{provider.name}</p>
                      <p className="text-[10px] text-gray-400 m-0 mt-0.5">{provider.jobs}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="inline-flex items-center gap-1 text-xs font-black text-amber-600">
                      <Star size={12} className="fill-amber-500 text-amber-500" />
                      <span>{provider.rating}</span>
                    </div>
                    <p className="text-[10px] text-gray-500 font-medium m-0 mt-0.5">{provider.response}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-2 border-t border-gray-100 text-center">
            <button className="text-xs font-black text-[#0B4F45] hover:underline bg-transparent border-none p-0 cursor-pointer">
              View All Contractors
            </button>
          </div>
        </div>

        {/* Right Column: Recent Activity Table */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs overflow-hidden lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="p-5 border-b border-gray-100 flex items-center justify-between gap-4 flex-wrap">
              <h2 className="text-base font-bold text-gray-900 m-0">Recent Activity</h2>
              
              <div className="flex items-center gap-3 ml-auto">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                  <span>Filter by:</span>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-transparent font-bold text-gray-800 border-none pr-6 py-1 focus:ring-0 cursor-pointer text-xs"
                  >
                    <option>All Categories</option>
                    <option>Plumbing</option>
                    <option>Electrical</option>
                    <option>General</option>
                    <option>Security</option>
                  </select>
                </div>

                <button className="bg-[#C75B30] hover:bg-[#b5522b] text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs inline-flex items-center gap-2 transition-all active:scale-[0.98] cursor-pointer">
                  <Plus size={15} strokeWidth={3} />
                  <span>New Work Order</span>
                </button>
              </div>
            </div>

            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[550px]">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="py-3.5 px-5 text-[10px] font-bold text-gray-400 tracking-wider uppercase">Date</th>
                    <th className="py-3.5 px-5 text-[10px] font-bold text-gray-400 tracking-wider uppercase">Property / Unit</th>
                    <th className="py-3.5 px-5 text-[10px] font-bold text-gray-400 tracking-wider uppercase">Category</th>
                    <th className="py-3.5 px-5 text-[10px] font-bold text-gray-400 tracking-wider uppercase">Status</th>
                    <th className="py-3.5 px-5 text-[10px] font-bold text-gray-400 tracking-wider uppercase text-right"> </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredActivity.map((act) => (
                    <tr key={act.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="py-4 px-5 text-xs font-mono text-gray-800">{act.date}</td>
                      <td className="py-4 px-5">
                        <span className="text-xs sm:text-sm font-bold text-gray-900 block">{act.property}</span>
                        <span className="text-[10px] text-gray-400 block mt-0.5">{act.unit}</span>
                      </td>
                      <td className="py-4 px-5 text-xs sm:text-sm font-medium text-gray-700">
                        <span className="mr-1.5">{act.catIcon}</span>{act.category}
                      </td>
                      <td className="py-4 px-5">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${act.statusBg}`}>
                          {act.status}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-right">
                        <button className="p-1 text-gray-500 hover:text-black transition-colors cursor-pointer" aria-label="Action">
                          <act.actionIcon size={17} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
