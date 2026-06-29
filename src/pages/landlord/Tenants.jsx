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
    statusBg: 'bg-emerald-50',
    statusText: 'text-emerald-700',
    dotBg: 'bg-emerald-500',
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
    statusBg: 'bg-red-50',
    statusText: 'text-red-600',
    dotBg: 'bg-red-500',
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
    statusBg: 'bg-amber-50',
    statusText: 'text-amber-700',
    dotBg: 'bg-amber-500',
  },
];

const MetricCard = ({ label, icon: Icon, iconBg, iconColor, value, sub, subIcon: SubIcon, subColor }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-6 card-shadow flex flex-col justify-between gap-3 min-h-[130px]">
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
      <span className="text-sm font-semibold uppercase text-gray-800 leading-tight">{label}</span>
      <div style={{ width: 32, height: 32, minWidth: 32, minHeight: 32, borderRadius: '50%', backgroundColor: iconBg, color: iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon size={16} />
      </div>
    </div>
    <div>
      <div style={{ fontSize: 28, fontWeight: 900, color: '#111827', lineHeight: 1, letterSpacing: '-0.02em' }}>{value}</div>
      <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, color: subColor }}>
        {SubIcon && <SubIcon size={12} />}
        {sub}
      </div>
    </div>
  </div>
);

const Tenants = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = directoryRows.filter(r =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.propertyUnit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    /* Outer wrapper — no max-width constraint here; let LandlordLayout handle the margin */
    <div style={{ fontFamily: 'inherit' }}>

      {/* ── PAGE HEADER ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight m-0">Tenant Management</h1>
          <p className="text-base text-[#4A4F4C] m-0 mt-1 font-medium">Overview of your active portfolio and resident health.</p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 10, border: '1px solid #e5e7eb', background: '#fff', fontSize: 12, fontWeight: 600, color: '#374151', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,.05)' }}>
            <Filter size={13} color="#6b7280" /> Filter
          </button>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 10, border: '1px solid #e5e7eb', background: '#fff', fontSize: 12, fontWeight: 600, color: '#374151', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,.05)' }}>
            <ArrowUpDown size={13} color="#6b7280" /> Sort
          </button>
        </div>
      </div>

      {/* ── TWO-COLUMN GRID ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24, alignItems: 'start' }}>

        {/* ── LEFT COLUMN ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, minWidth: 0 }}>

          {/* Metric Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            <MetricCard
              label="Total Tenants"
              icon={Users} iconBg="#d1fae5" iconColor="#065f46"
              value="1,248"
              sub="+12 this month" subIcon={TrendingUp} subColor="#059669"
            />
            <MetricCard
              label="New Leases"
              icon={FileText} iconBg="#fee2e2" iconColor="#b91c1c"
              value="34"
              sub="MTD" subColor="#9ca3af"
            />
            <MetricCard
              label="Payment Health"
              icon={ShieldCheck} iconBg="#d1fae5" iconColor="#065f46"
              value="94%"
              sub="On-time rate" subIcon={CheckCircle2} subColor="#059669"
            />
            <MetricCard
              label="Upcoming Move-Outs"
              icon={LogOut} iconBg="#fee2e2" iconColor="#b91c1c"
              value="18"
              sub="Next 60 days" subColor="#9ca3af"
            />
          </div>

          {/* Tenant Directory */}
          <div className="bg-white rounded-xl border border-gray-200 card-shadow overflow-hidden">
            {/* Card header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold uppercase text-gray-800 m-0">Tenant Directory</h2>
              <div style={{ position: 'relative' }}>
                <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                <input
                  type="text"
                  placeholder="Search tenants..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  style={{ paddingLeft: 30, paddingRight: 12, paddingTop: 6, paddingBottom: 6, fontSize: 12, border: '1px solid #e5e7eb', borderRadius: 8, outline: 'none', width: 200, color: '#374151', background: '#fff' }}
                />
              </div>
            </div>

            {/* Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              <colgroup>
                <col style={{ width: '22%' }} />
                <col style={{ width: '18%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '16%' }} />
                <col style={{ width: '14%' }} />
                <col style={{ width: '10%' }} />
              </colgroup>
              <thead>
                <tr style={{ background: '#fafaf9', borderBottom: '1px solid #f3f4f6' }}>
                  {['Tenant', 'Property / Unit', 'Lease Term', 'Monthly Rent', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', color: '#9ca3af', textTransform: 'uppercase', textAlign: 'left' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, i) => (
                  <tr
                    key={row.id}
                    onClick={() => navigate(`/landlord/tenants/${row.id}`)}
                    style={{ borderBottom: i < filtered.length - 1 ? '1px solid #f3f4f6' : 'none', cursor: 'pointer', transition: 'background 0.12s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    {/* Tenant */}
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        {row.isInitials ? (
                          <div style={{ width: 32, height: 32, minWidth: 32, minHeight: 32, borderRadius: '50%', background: '#9A3B1B', color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            {row.avatar}
                          </div>
                        ) : (
                          <img src={row.avatar} alt={row.name} style={{ width: 32, height: 32, minWidth: 32, minHeight: 32, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '1px solid #e5e7eb' }} />
                        )}
                        <span style={{ fontSize: 13, fontWeight: 600, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.name}</span>
                      </div>
                    </td>
                    {/* Property */}
                    <td style={{ padding: '14px 16px', fontSize: 13, color: '#374151', fontWeight: 500 }}>{row.propertyUnit}</td>
                    {/* Lease */}
                    <td style={{ padding: '14px 16px', fontSize: 12, color: '#6b7280', fontFamily: 'monospace' }}>{row.leaseTerm}</td>
                    {/* Rent */}
                    <td style={{ padding: '14px 16px', fontSize: 13, fontWeight: 700, color: '#111827', fontFamily: 'monospace' }}>{row.rent}</td>
                    {/* Status */}
                    <td style={{ padding: '14px 16px' }} onClick={e => e.stopPropagation()}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700 }} className={`${row.statusBg} ${row.statusText}`}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', flexShrink: 0 }} className={row.dotBg} />
                        {row.status}
                      </span>
                    </td>
                    {/* Actions */}
                    <td style={{ padding: '14px 16px', textAlign: 'right' }} onClick={e => e.stopPropagation()}>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 4, borderRadius: 6 }}>
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination footer */}
            <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">Showing 1–3 of 1,248</span>
              <div className="flex gap-2">
                <button disabled className="p-1.5 border border-gray-200 rounded-lg text-gray-300"><ChevronLeft size={14} /></button>
                <button className="p-1.5 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"><ChevronRight size={14} /></button>
              </div>
            </div>
          </div>

          {/* Recent Communications */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 card-shadow">
            <h2 className="text-xs font-bold uppercase text-gray-800 tracking-wider m-0 mb-4">Recent Communications</h2>
            <div className="border border-gray-100 rounded-xl p-4 flex items-start gap-3">
              <div style={{ width: 36, height: 36, borderRadius: 10, background: '#ecfdf5', color: '#065f46', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MessageSquare size={17} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-bold text-gray-950">Emily Chen (The Vista, #4B)</span>
                  <span className="text-[10px] text-gray-400 shrink-0">2 hours ago</span>
                </div>
                <p className="m-0 my-1 text-sm text-gray-600 truncate">
                  Question regarding the upcoming maintenance schedule for the HVAC system...
                </p>
                <button className="text-xs font-bold text-gray-950 hover:underline">Reply</button>
              </div>
            </div>
          </div>

        </div>
        {/* END LEFT COLUMN */}

        {/* ── RIGHT COLUMN — Active Applications ── */}
        <div style={{ position: 'sticky', top: 24 }}>
          <div className="bg-white rounded-xl border border-gray-200 p-6 card-shadow">
            <div className="flex items-start justify-between mb-5">
              <h2 className="text-xs font-bold uppercase text-gray-800 tracking-wider m-0 leading-tight">Active<br />Applications</h2>
              <button className="text-[10px] font-bold text-gray-600 text-right leading-tight hover:text-gray-950">View<br />All</button>
            </div>

            {/* Applicant 1 */}
            <div className="flex items-start gap-3 pb-4 border-b border-gray-100 mb-4">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80"
                alt="Sarah Jenkins"
                style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-gray-950 truncate">Sarah Jenkins</div>
                <div className="text-xs text-gray-500 mb-2 truncate">Unit 4B, The Vista</div>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1 px-2 py-1 rounded bg-gray-50 text-[10px] font-bold text-gray-700">
                    <span className="text-gray-400 font-medium">Score:</span> 740
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded bg-gray-50 text-[10px] font-bold text-gray-700">
                    <span className="text-gray-400 font-medium">BG:</span> Pending
                  </div>
                </div>
              </div>
            </div>

            {/* Applicant 2 */}
            <div className="flex items-start gap-3">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80"
                alt="Michael Chang"
                style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-gray-950 truncate">Michael Chang</div>
                <div className="text-xs text-gray-500 mb-2 truncate">Unit 12A, Metro Lofts</div>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1 px-2 py-1 rounded bg-gray-50 text-[10px] font-bold text-gray-700">
                    <span className="text-gray-400 font-medium">Score:</span> 810
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded bg-gray-50 text-[10px] font-bold text-gray-700">
                    <span className="text-gray-400 font-medium">BG:</span> Clear
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        {/* END RIGHT COLUMN */}

      </div>
    </div>
  );
};

export default Tenants;
