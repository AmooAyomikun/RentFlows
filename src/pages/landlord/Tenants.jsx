import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Filter, ArrowUpDown, Users, FileText, ShieldCheck, LogOut,
  Search, MoreVertical, ChevronLeft, ChevronRight, MessageSquare, TrendingUp, CheckCircle2
} from 'lucide-react';

const directoryRows = [
  {
    id: 't1',
    name: 'Simisola Alabi',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
    isInitials: false,
    propertyUnit: 'Victoria Island Towers, #4B',
    leaseTerm: 'Oct 2023 – Sep 2024',
    rent: '₦2,450,000',
    status: 'On Time',
    statusBg: 'bg-[#bae9df]/30',
    statusText: 'text-[#0b4f45]',
    dotBg: 'bg-[#0b4f45]',
  },
  {
    id: 't2',
    name: 'Musa Rano',
    avatar: 'MR',
    isInitials: true,
    propertyUnit: 'Lekki Palms Villas, #12A',
    leaseTerm: 'Jan 2024 – Dec 2024',
    rent: '₦3,100,000',
    status: 'Late',
    statusBg: 'bg-[#ffdad6]/40',
    statusText: 'text-[#ba1a1a]',
    dotBg: 'bg-[#ba1a1a]',
  },
  {
    id: 't3',
    name: 'Dapo Solarin',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80',
    isInitials: false,
    propertyUnit: 'Maitama Heights, #3',
    leaseTerm: 'Mar 2023 – Feb 2024',
    rent: '₦1,850,000',
    status: 'Grace Period',
    statusBg: 'bg-[#ffdbcf]/40',
    statusText: 'text-[#7f2800]',
    dotBg: 'bg-[#7f2800]',
  },
];

const Tenants = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = directoryRows.filter(r =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.propertyUnit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header section matching Stitch export exactly */}
      <div className="mb-8 flex flex-wrap justify-between items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#00372f] mb-2 leading-tight">Tenant Management</h1>
          <p className="text-base text-[#404946]">Overview of your active portfolio and resident health.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 border border-[#bfc9c5] rounded-lg text-sm font-medium bg-[#f7faf6] hover:bg-[#f1f4f1] flex items-center gap-2 text-[#181c1a] shadow-sm transition-all cursor-pointer">
            <Filter size={18} className="text-[#404946]" /> Filter
          </button>
          <button className="px-4 py-2 border border-[#bfc9c5] rounded-lg text-sm font-medium bg-[#f7faf6] hover:bg-[#f1f4f1] flex items-center gap-2 text-[#181c1a] shadow-sm transition-all cursor-pointer">
            <ArrowUpDown size={18} className="text-[#404946]" /> Sort
          </button>
        </div>
      </div>

      {/* 4 KPIs row spanning full width */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* KPI 1 */}
        <div className="glass-card rounded-xl p-6 flex flex-col justify-between min-h-[130px]">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-semibold text-[#404946] uppercase tracking-wider">Total Tenants</h3>
            <span className="p-2 rounded-full bg-[#b1efe1]/20 text-[#0b4f45] flex items-center justify-center shrink-0">
              <Users size={20} />
            </span>
          </div>
          <div>
            <span className="text-2xl font-bold text-[#181c1a] leading-none">1,248</span>
            <p className="text-sm text-[#3a665e] mt-2 flex items-center gap-1 font-medium">
              <TrendingUp size={16} /> +12 this month
            </p>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="glass-card rounded-xl p-6 flex flex-col justify-between min-h-[130px]">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-semibold text-[#404946] uppercase tracking-wider">New Leases</h3>
            <span className="p-2 rounded-full bg-[#ffdbcf]/20 text-[#7f2800] flex items-center justify-center shrink-0">
              <FileText size={20} />
            </span>
          </div>
          <div>
            <span className="text-2xl font-bold text-[#181c1a] leading-none">34</span>
            <p className="text-sm text-[#404946] mt-2 font-medium">MTD</p>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="glass-card rounded-xl p-6 flex flex-col justify-between min-h-[130px]">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-semibold text-[#404946] uppercase tracking-wider">Payment Health</h3>
            <span className="p-2 rounded-full bg-[#bae9df]/30 text-[#0b4f45] flex items-center justify-center shrink-0">
              <ShieldCheck size={20} />
            </span>
          </div>
          <div>
            <span className="text-2xl font-bold text-[#181c1a] leading-none">94%</span>
            <p className="text-sm text-[#3a665e] mt-2 flex items-center gap-1 font-medium">
              <CheckCircle2 size={16} /> On-time rate
            </p>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="glass-card rounded-xl p-6 flex flex-col justify-between min-h-[130px]">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-semibold text-[#404946] uppercase tracking-wider">Upcoming Move-outs</h3>
            <span className="p-2 rounded-full bg-[#ffdad6]/30 text-[#ba1a1a] flex items-center justify-center shrink-0">
              <LogOut size={20} />
            </span>
          </div>
          <div>
            <span className="text-2xl font-bold text-[#181c1a] leading-none">18</span>
            <p className="text-sm text-[#404946] mt-2 font-medium">Next 60 days</p>
          </div>
        </div>
      </div>

      {/* Comprehensive Tenant Table (Full Width) */}
      <div className="glass-card rounded-xl overflow-hidden flex flex-col mb-6">
        <div className="p-6 border-b border-[#e0e3e0] flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-sm font-semibold uppercase text-[#181c1a] tracking-wider">Tenant Directory</h3>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#404946]" />
            <input
              type="text"
              placeholder="Search tenants..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm bg-[#f7faf6] border border-[#bfc9c5] rounded-lg focus:outline-none focus:border-[#00372f] text-[#181c1a] placeholder:text-[#404946] w-64"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-[#f1f4f1] border-b border-[#e0e3e0]">
                {['Tenant', 'Property / Unit', 'Lease Term', 'Monthly Rent', 'Status', 'Actions'].map(h => (
                  <th key={h} className="p-4 text-xs font-semibold uppercase tracking-wider text-[#404946]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e0e3e0]">
              {filtered.map(row => (
                <tr
                  key={row.id}
                  onClick={() => navigate(`/landlord/tenants/${row.id}`)}
                  className="hover:bg-[#f1f4f1]/50 cursor-pointer transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {row.isInitials ? (
                        <div className="w-8 h-8 rounded-full bg-[#7f2800] text-white text-xs font-bold flex items-center justify-center shrink-0">
                          {row.avatar}
                        </div>
                      ) : (
                        <img src={row.avatar} alt={row.name} className="w-8 h-8 rounded-full object-cover shrink-0 border border-[#e0e3e0]" />
                      )}
                      <span className="text-sm font-semibold text-[#181c1a]">{row.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-[#181c1a] font-medium">{row.propertyUnit}</td>
                  <td className="p-4 text-xs text-[#404946] font-mono">{row.leaseTerm}</td>
                  <td className="p-4 text-sm font-bold text-[#181c1a] font-mono">{row.rent}</td>
                  <td className="p-4" onClick={e => e.stopPropagation()}>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${row.statusBg} ${row.statusText}`}>
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${row.dotBg}`} />
                      {row.status}
                    </span>
                  </td>
                  <td className="p-4 text-right" onClick={e => e.stopPropagation()}>
                    <button className="text-[#404946] hover:text-[#181c1a] p-1 rounded-lg hover:bg-[#e0e3e0]/50 transition-colors bg-transparent border-none cursor-pointer">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-[#e0e3e0] flex items-center justify-between bg-[#f7faf6]/50">
          <span className="text-xs font-medium text-[#404946]">Showing 1–{filtered.length} of 1,248</span>
          <div className="flex gap-2">
            <button disabled className="p-1.5 border border-[#bfc9c5] rounded-lg text-[#707976] disabled:opacity-50 bg-transparent cursor-pointer"><ChevronLeft size={16} /></button>
            <button className="p-1.5 border border-[#bfc9c5] rounded-lg text-[#181c1a] hover:bg-[#e0e3e0]/50 bg-transparent cursor-pointer"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>

      {/* Bottom Row: Active Applications & Recent Communications side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
        {/* Active Applications */}
        <div className="glass-card rounded-xl p-6 flex flex-col">
          <div className="flex items-center justify-between gap-3 mb-5 pb-4 border-b border-[#e0e3e0]">
            <h3 className="text-sm font-bold uppercase text-[#181c1a] tracking-wider leading-tight">Active Applications</h3>
            <button className="text-xs font-bold text-[#00372f] hover:underline bg-[#b1efe1]/20 hover:bg-[#b1efe1]/40 px-3 py-1.5 rounded-lg border-none cursor-pointer whitespace-nowrap shrink-0 transition-colors">View All</button>
          </div>
          <div className="flex flex-col gap-3.5">
            {/* App Item 1 */}
            <div className="flex items-center justify-between gap-4 p-3.5 hover:bg-[#f1f4f1]/80 rounded-xl transition-all border border-[#e0e3e0]/50 hover:border-[#bfc9c5] shadow-sm bg-white/60">
              <div className="flex items-center gap-3.5 min-w-0">
                <img className="w-10 h-10 rounded-full object-cover shrink-0 border border-[#e0e3e0] shadow-sm" alt="Sarah Jenkins" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80" />
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-[#181c1a] truncate leading-tight">Sarah Jenkins</h4>
                  <p className="text-xs font-medium text-[#404946] truncate mt-0.5">Unit 4B, The Vista</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="inline-flex items-center px-2.5 py-1 bg-[#bae9df]/30 text-[#0b4f45] rounded-md text-[11px] font-bold whitespace-nowrap">Score: 740</span>
                <span className="inline-flex items-center px-2.5 py-1 bg-[#e6e9e5] text-[#404946] rounded-md text-[11px] font-bold whitespace-nowrap">BG: Pending</span>
              </div>
            </div>
            {/* App Item 2 */}
            <div className="flex items-center justify-between gap-4 p-3.5 hover:bg-[#f1f4f1]/80 rounded-xl transition-all border border-[#e0e3e0]/50 hover:border-[#bfc9c5] shadow-sm bg-white/60">
              <div className="flex items-center gap-3.5 min-w-0">
                <img className="w-10 h-10 rounded-full object-cover shrink-0 border border-[#e0e3e0] shadow-sm" alt="Michael Chang" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80" />
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-[#181c1a] truncate leading-tight">Michael Chang</h4>
                  <p className="text-xs font-medium text-[#404946] truncate mt-0.5">Unit 12A, Metro Lofts</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="inline-flex items-center px-2.5 py-1 bg-[#bae9df]/30 text-[#0b4f45] rounded-md text-[11px] font-bold whitespace-nowrap">Score: 810</span>
                <span className="inline-flex items-center px-2.5 py-1 bg-[#bae9df]/30 text-[#0b4f45] rounded-md text-[11px] font-bold whitespace-nowrap">BG: Clear</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Communications */}
        <div className="glass-card rounded-xl p-6 flex flex-col">
          <div className="flex items-center justify-between gap-3 mb-5 pb-4 border-b border-[#e0e3e0]">
            <h3 className="text-sm font-bold uppercase text-[#181c1a] tracking-wider leading-tight">Recent Communications</h3>
          </div>
          <div className="border border-[#e0e3e0]/60 rounded-xl p-4 flex items-start gap-3.5 bg-white/60 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#b1efe1]/20 text-[#0b4f45] flex items-center justify-center shrink-0">
              <MessageSquare size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-bold text-[#181c1a] truncate">Emily Chen (The Vista, #4B)</span>
                <span className="text-xs font-medium text-[#404946] shrink-0">2 hours ago</span>
              </div>
              <p className="text-sm text-[#404946] my-1.5 truncate">
                Question regarding the upcoming maintenance schedule for the HVAC system...
              </p>
              <button className="text-xs font-bold text-[#00372f] hover:underline bg-transparent border-none cursor-pointer p-0">Reply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tenants;
