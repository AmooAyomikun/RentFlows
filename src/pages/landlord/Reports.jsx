import { useState } from 'react';
import {
  Calendar, TrendingUp, Wallet, FileText, ArrowRight,
  ChevronDown, FileSpreadsheet, CheckCircle2, Download
} from 'lucide-react';

const leaderboardProperties = [
  {
    name: 'The Obsidian Suites',
    location: 'Downtown Financial Dist.',
    occupancy: 98,
    revenue: '$842,000',
    noiMargin: '72.4%',
    roi: '12.2%',
  },
  {
    name: 'Riverfront Heights',
    location: 'North Waterfront',
    occupancy: 92,
    revenue: '$615,000',
    noiMargin: '68.1%',
    roi: '9.8%',
  },
  {
    name: 'Azure Terrace Villas',
    location: 'West Hills Estate',
    occupancy: 100,
    revenue: '$528,000',
    noiMargin: '75.2%',
    roi: '11.4%',
  },
  {
    name: 'Metropolitan Lofts',
    location: 'Arts District',
    occupancy: 85,
    revenue: '$492,000',
    noiMargin: '62.8%',
    roi: '8.1%',
  },
];

const monthlyTrend = [
  { month: 'Jan', rev: 90, exp: 35 },
  { month: 'Feb', rev: 105, exp: 30 },
  { month: 'Mar', rev: 80, exp: 30 },
  { month: 'Apr', rev: 120, exp: 35 },
  { month: 'May', rev: 155, exp: 38 },
  { month: 'Jun', rev: 140, exp: 45 },
  { month: 'Jul', rev: 170, exp: 30 },
  { month: 'Aug', rev: 155, exp: 35 },
  { month: 'Sep', rev: 145, exp: 28 },
  { month: 'Oct', rev: 130, exp: 32 },
  { month: 'Nov', rev: 140, exp: 35 },
  { month: 'Dec', rev: 155, exp: 35 },
];

const portfolioOccupancy = [
  { label: 'Residential Luxury', rate: 96.4, color: 'bg-[#072F29]' },
  { label: 'Commercial Retail', rate: 88.2, color: 'bg-[#072F29]' },
  { label: 'Industrial/Flex Space', rate: 100, color: 'bg-[#072F29]' },
  { label: 'Short-term Rentals', rate: 74.5, color: 'bg-[#99f6e4]' },
];

const Reports = () => {
  const [reportType, setReportType] = useState('Profit & Loss Statement');
  const [exportFormat, setExportFormat] = useState('pdf');

  return (
    <div className="font-sans text-gray-900 pb-12">
      {/* ── PAGE HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-[10px] font-black tracking-wider text-gray-400 uppercase block">Fiscal Year 2024</span>
          <h1 className="text-[26px] font-display font-extrabold text-[#072F29] tracking-tight m-0 mt-1">Financial Performance Overview</h1>
        </div>

        <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 font-bold text-xs px-4 py-2 rounded-xl shadow-2xs inline-flex items-center gap-2 cursor-pointer shrink-0">
          <Calendar size={15} className="text-gray-600" />
          <span>This Year</span>
        </button>
      </div>

      {/* ── 3 TOP STAT CARDS ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {/* Gross Revenue */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs flex flex-col justify-between min-h-[145px]">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-gray-800">Gross Revenue</span>
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center shrink-0">
              <TrendingUp size={18} />
            </div>
          </div>
          <p className="text-3xl font-display font-black text-gray-900 tracking-tight my-3 m-0">$2.48M</p>
          <div className="flex items-baseline text-xs m-0">
            <span className="font-black text-emerald-600">+12.4%</span>
            <span className="text-gray-400 font-medium ml-1">vs last year</span>
          </div>
        </div>

        {/* Net Operating Income */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs flex flex-col justify-between min-h-[145px]">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-gray-800">Net Operating Income</span>
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <Wallet size={18} />
            </div>
          </div>
          <p className="text-3xl font-display font-black text-gray-900 tracking-tight my-3 m-0">$1.92M</p>
          <div className="flex items-baseline text-xs m-0">
            <span className="font-black text-emerald-600">+8.1%</span>
            <span className="text-gray-400 font-medium ml-1">vs last year</span>
          </div>
        </div>

        {/* Total Expenses */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs flex flex-col justify-between min-h-[145px]">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-gray-800">Total Expenses</span>
            <div className="w-9 h-9 rounded-xl bg-gray-100 text-gray-700 flex items-center justify-center shrink-0">
              <FileSpreadsheet size={18} />
            </div>
          </div>
          <p className="text-3xl font-display font-black text-gray-900 tracking-tight my-3 m-0">$560K</p>
          <div className="flex items-baseline text-xs m-0">
            <span className="font-black text-rose-600">-4.2%</span>
            <span className="text-gray-400 font-medium ml-1">optimization target met</span>
          </div>
        </div>
      </div>

      {/* ── MIDDLE CHARTS SECTION ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Left: Revenue vs. Expenses Trends */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200/80 p-6 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
            <h2 className="text-base font-bold text-gray-900 m-0">Revenue vs. Expenses Trends</h2>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#072F29]" />
                <span className="text-xs font-bold text-gray-700">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E79868]" />
                <span className="text-xs font-bold text-gray-700">Expenses</span>
              </div>
            </div>
          </div>

          {/* Stacked Bar SVG */}
          <div className="w-full overflow-x-auto pb-2">
            <div className="min-w-[500px]">
              <svg className="w-full h-[220px] overflow-visible" viewBox="0 0 580 210">
                {monthlyTrend.map((item, i) => {
                  const x = 30 + i * 45;
                  const barWidth = 24;
                  const expHeight = item.exp * 0.9;
                  const revHeight = item.rev * 0.9;
                  const expY = 180 - expHeight;
                  const revY = expY - revHeight;

                  return (
                    <g key={item.month}>
                      {/* Revenue Bar (Top) */}
                      <rect x={x} y={revY} width={barWidth} height={revHeight} fill="#072F29" rx="3" ry="3" />
                      {/* Expenses Bar (Bottom) */}
                      <rect x={x} y={expY} width={barWidth} height={expHeight} fill="#E79868" />
                      {/* Month Label */}
                      <text x={x + barWidth / 2} y="198" textAnchor="middle" className="text-[11px] font-bold fill-gray-400 tracking-wider">
                        {item.month}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>

        {/* Right: Expense Breakdown Preview */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-2xs flex flex-col justify-between">
          <h2 className="text-base font-bold text-gray-900 m-0 mb-4">Expense Breakdown</h2>

          {/* Nested Square Visual */}
          <div className="my-4 flex items-center justify-center">
            <div className="relative w-40 h-40 flex items-center justify-center p-3">
              {/* Colored Square Frame */}
              <div className="absolute inset-0 border-[16px] border-[#072F29] border-b-[#5eead4] border-l-[#F4A261] border-t-[#7c2d12]" />
              
              <div className="flex flex-col items-center justify-center z-10 bg-white w-24 h-24">
                <span className="text-xs text-gray-400 font-bold">Total</span>
                <span className="text-xl font-display font-black text-gray-900 tracking-tight mt-0.5">$560K</span>
              </div>
            </div>
          </div>

          {/* Breakdown Legend */}
          <div className="space-y-2.5 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-medium text-gray-700">
                <span className="w-2.5 h-2.5 bg-[#072F29] shrink-0" /> Maintenance
              </div>
              <span className="font-mono font-bold text-xs text-gray-900">40%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-medium text-gray-700">
                <span className="w-2.5 h-2.5 bg-[#5eead4] shrink-0" /> Utilities
              </div>
              <span className="font-mono font-bold text-xs text-gray-900">25%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-medium text-gray-700">
                <span className="w-2.5 h-2.5 bg-[#F4A261] shrink-0" /> Taxes
              </div>
              <span className="font-mono font-bold text-xs text-gray-900">20%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-medium text-gray-700">
                <span className="w-2.5 h-2.5 bg-[#7c2d12] shrink-0" /> Insurance
              </div>
              <span className="font-mono font-bold text-xs text-gray-900">15%</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── PROPERTY PERFORMANCE LEADERBOARD ── */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs overflow-hidden mb-8">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between gap-4">
          <h2 className="text-base font-bold text-gray-900 m-0">Property Performance Leaderboard</h2>
          <button className="text-xs font-bold text-gray-800 hover:underline inline-flex items-center gap-1 bg-transparent border-none p-0 cursor-pointer shrink-0">
            <span>View All Properties</span>
            <ArrowRight size={15} />
          </button>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                {['Property Name', 'Location', 'Occupancy', 'Annual Revenue', 'NOI Margin', 'ROI'].map((h) => (
                  <th key={h} className="py-3.5 px-5 text-[10px] font-bold text-gray-400 tracking-wider uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leaderboardProperties.map((prop) => (
                <tr key={prop.name} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-4 px-5 text-xs sm:text-sm font-bold text-gray-900">{prop.name}</td>
                  <td className="py-4 px-5 text-xs text-gray-500 font-medium">{prop.location}</td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2.5 max-w-[120px]">
                      <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#072F29] h-full rounded-full" style={{ width: `${prop.occupancy}%` }} />
                      </div>
                      <span className="text-xs font-mono font-bold text-gray-700">{prop.occupancy}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-xs sm:text-sm font-mono font-bold text-gray-900">{prop.revenue}</td>
                  <td className="py-4 px-5 text-xs sm:text-sm font-mono text-gray-700 font-medium">{prop.noiMargin}</td>
                  <td className="py-4 px-5 text-xs sm:text-sm font-mono font-black text-emerald-600">{prop.roi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── BOTTOM SECTION: OCCUPANCY & CONFIGURATOR ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Occupancy Rates by Portfolio */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900 m-0 mb-6">Occupancy Rates by Portfolio</h2>

            <div className="space-y-5">
              {portfolioOccupancy.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between text-xs font-bold text-gray-800 mb-1.5">
                    <span>{item.label}</span>
                    <span className="font-mono">{item.rate}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                    <div className={`${item.color} h-full rounded-full transition-all duration-500`} style={{ width: `${item.rate}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Report Configurator */}
        <div className="bg-[#072F29] text-white rounded-2xl p-6 shadow-md flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-display font-black text-white m-0">Report Configurator</h2>
            <p className="text-xs text-white/70 m-0 mt-1 mb-6">Configure and export audit-ready financial statements.</p>

            <div className="space-y-4">
              {/* Report Type */}
              <div>
                <label className="text-[10px] font-bold text-white/70 uppercase tracking-wider block mb-1.5">Report Type</label>
                <div className="relative">
                  <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    className="w-full bg-white/10 border border-white/15 text-white font-bold text-xs rounded-xl p-3 appearance-none focus:outline-none focus:ring-1 focus:ring-white/30 cursor-pointer"
                  >
                    <option className="text-gray-900">Profit & Loss Statement</option>
                    <option className="text-gray-900">Balance Sheet</option>
                    <option className="text-gray-900">Cash Flow Statement</option>
                    <option className="text-gray-900">Rent Roll Audit</option>
                  </select>
                  <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 pointer-events-none" />
                </div>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-white/70 uppercase tracking-wider block mb-1.5">Start Date</label>
                  <div className="bg-white/10 border border-white/15 text-white/80 text-xs rounded-xl p-3 flex items-center justify-between">
                    <span>01/01/2024</span>
                    <Calendar size={14} className="text-white/60" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-white/70 uppercase tracking-wider block mb-1.5">End Date</label>
                  <div className="bg-white/10 border border-white/15 text-white/80 text-xs rounded-xl p-3 flex items-center justify-between">
                    <span>12/31/2024</span>
                    <Calendar size={14} className="text-white/60" />
                  </div>
                </div>
              </div>

              {/* Format */}
              <div className="pt-2">
                <label className="text-[10px] font-bold text-white/70 uppercase tracking-wider block mb-2.5">Format</label>
                <div className="flex items-center gap-6 text-xs font-bold">
                  <label className="flex items-center gap-2.5 cursor-pointer" onClick={() => setExportFormat('pdf')}>
                    <span className={`w-4 h-4 rounded-full border border-white/40 flex items-center justify-center ${exportFormat === 'pdf' ? 'border-white' : ''}`}>
                      {exportFormat === 'pdf' && <span className="w-2 h-2 rounded-full bg-[#C75B30]" />}
                    </span>
                    <span>PDF (Professional)</span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer text-white/80 hover:text-white" onClick={() => setExportFormat('excel')}>
                    <span className={`w-4 h-4 rounded-full border border-white/40 flex items-center justify-center ${exportFormat === 'excel' ? 'border-white' : ''}`}>
                      {exportFormat === 'excel' && <span className="w-2 h-2 rounded-full bg-[#C75B30]" />}
                    </span>
                    <span>Excel (CSV)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-4">
            <button className="w-full py-3 px-4 rounded-xl bg-[#F4C395] hover:bg-[#e3b284] text-[#072F29] font-black text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer border-none">
              <FileSpreadsheet size={16} />
              <span>Export Custom Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
