import { useState } from 'react';
import {
  Banknote, Send, Download, ChevronDown, Filter, MoreVertical,
  CreditCard, Landmark, Wallet
} from 'lucide-react';

const initialTransactions = [
  {
    id: 'tx1',
    date: 'Oct 12, 2023',
    tenantInitials: 'JH',
    tenantBg: 'bg-teal-100 text-teal-800',
    tenantName: 'Julianne H.',
    propertyUnit: 'Harbor View Oaks / 402B',
    method: 'ACH Transfer',
    methodIcon: Landmark,
    amount: '$2,850.00',
    status: 'SUCCESS',
    statusBg: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 'tx2',
    date: 'Oct 11, 2023',
    tenantInitials: 'RM',
    tenantBg: 'bg-orange-100 text-orange-800',
    tenantName: 'Robert Miller',
    propertyUnit: 'Skyline Heights / 12A',
    method: 'Credit Card',
    methodIcon: CreditCard,
    amount: '$3,420.00',
    status: 'PROCESSING',
    statusBg: 'bg-amber-100 text-amber-700',
  },
  {
    id: 'tx3',
    date: 'Oct 10, 2023',
    tenantInitials: 'SC',
    tenantBg: 'bg-teal-100 text-teal-800',
    tenantName: 'Sarah Chen',
    propertyUnit: 'Pine Crest Apt / G2',
    method: 'ACH Transfer',
    methodIcon: Landmark,
    amount: '$1,950.00',
    status: 'SUCCESS',
    statusBg: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 'tx4',
    date: 'Oct 09, 2023',
    tenantInitials: 'TW',
    tenantBg: 'bg-rose-100 text-rose-800',
    tenantName: 'Thomas Wright',
    propertyUnit: 'Harbor View Oaks / 204C',
    method: 'Credit Card',
    methodIcon: CreditCard,
    amount: '$2,100.00',
    status: 'FAILED',
    statusBg: 'bg-rose-100 text-rose-700',
  },
  {
    id: 'tx5',
    date: 'Oct 08, 2023',
    tenantInitials: 'LD',
    tenantBg: 'bg-gray-100 text-gray-800',
    tenantName: 'Lukas Dorn',
    propertyUnit: 'Emerald Lake / 501',
    method: 'Cash Deposit',
    methodIcon: Banknote,
    amount: '$1,750.00',
    status: 'SUCCESS',
    statusBg: 'bg-emerald-100 text-emerald-700',
  },
];

const Payments = () => {
  const [transactions] = useState(initialTransactions);

  return (
    <div className="font-sans text-gray-900 pb-12">
      {/* ── PAGE HEADER & TOP ACTIONS ── */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[28px] font-display font-extrabold text-[#072F29] tracking-tight m-0">Financial Dashboard</h1>
          <p className="text-[13px] text-gray-500 font-medium mt-1 mb-0">Overview of your real estate portfolio performance for Oct 2023.</p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-2.5 shrink-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <button className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 font-bold text-xs shadow-2xs transition-all cursor-pointer">
              <Banknote size={15} className="text-gray-600" />
              Record Manual Payment
            </button>
            <button className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 font-bold text-xs shadow-2xs transition-all cursor-pointer">
              <Send size={14} className="text-gray-600" />
              Send Reminders
            </button>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#072F29] hover:bg-[#0b4f45] text-white font-bold text-xs shadow-sm transition-all cursor-pointer">
            <Download size={14} />
            Export Financials
          </button>
        </div>
      </div>

      {/* ── 4 TOP METRIC CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Revenue */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs flex flex-col justify-between min-h-[145px]">
          <div>
            <div className="flex items-center justify-between gap-2">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center shrink-0">
                <Banknote size={18} />
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">+12.5%</span>
            </div>
            <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mt-4 mb-1">Total Revenue (MTD)</p>
            <p className="text-2xl font-display font-black text-gray-900 m-0 tracking-tight">$142,400</p>
          </div>
          <div className="mt-3 pt-1">
            <svg className="w-full h-8 overflow-visible" viewBox="0 0 140 30">
              <path d="M 0 22 C 20 22, 30 28, 45 28 C 60 28, 70 12, 85 24 C 100 32, 115 10, 130 2" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Outstanding Rent */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs flex flex-col justify-between min-h-[145px]">
          <div>
            <div className="flex items-center justify-between gap-2">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <Calendar size={18} />
              </div>
              <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full">-3.2%</span>
            </div>
            <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mt-4 mb-1">Outstanding Rent</p>
            <p className="text-2xl font-display font-black text-gray-900 m-0 tracking-tight">$8,250</p>
          </div>
          <div className="mt-3 pt-1">
            <svg className="w-full h-8 overflow-visible" viewBox="0 0 140 30">
              <path d="M 0 12 C 25 12, 40 18, 65 18 C 85 18, 95 28, 115 10 C 125 4, 130 6, 135 6" fill="none" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Collection Rate */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs flex flex-col justify-between min-h-[145px]">
          <div>
            <div className="flex items-center justify-between gap-2">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center shrink-0">
                <Sliders size={18} />
              </div>
              <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Stable</span>
            </div>
            <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mt-4 mb-1">Collection Rate</p>
            <p className="text-2xl font-display font-black text-gray-900 m-0 tracking-tight">94.8%</p>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-100 h-3.5 rounded-full overflow-hidden">
              <div className="bg-[#072F29] h-full rounded-full w-[94.8%]" />
            </div>
          </div>
        </div>

        {/* Net Cash Flow */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs flex flex-col justify-between min-h-[145px]">
          <div>
            <div className="flex items-center justify-between gap-2">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                <Wallet size={18} />
              </div>
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">+8.1%</span>
            </div>
            <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mt-4 mb-1">Net Cash Flow</p>
            <p className="text-2xl font-display font-black text-gray-900 m-0 tracking-tight">$92,100</p>
          </div>
          <div className="mt-3 pt-1">
            <svg className="w-full h-8 overflow-visible" viewBox="0 0 140 30">
              <path d="M 0 24 C 20 22, 35 18, 55 18 C 75 18, 85 28, 105 8 C 115 -2, 125 8, 135 8" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── MIDDLE ANALYTICS GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        {/* Left: Revenue vs Expenses Analytics */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200/80 p-6 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h2 className="text-base font-bold text-gray-900 m-0">Revenue vs Expenses Analytics</h2>
            <div className="relative">
              <select className="bg-gray-100 hover:bg-gray-200/80 text-gray-700 font-bold text-xs py-1.5 pl-3 pr-8 rounded-lg appearance-none border-none cursor-pointer focus:outline-none">
                <option>Last 6 Months</option>
                <option>This Year</option>
                <option>All Time</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Line Chart Area */}
          <div className="w-full overflow-x-auto pb-2">
            <div className="min-w-[480px]">
              <svg className="w-full h-[220px] overflow-visible" viewBox="0 0 560 200">
                {/* Y-axis labels & Horizontal Grid lines */}
                <text x="0" y="34" className="text-[10px] font-semibold fill-gray-400">150k</text>
                <line x1="32" y1="30" x2="550" y2="30" stroke="#f3f4f6" strokeWidth="1" />

                <text x="0" y="84" className="text-[10px] font-semibold fill-gray-400">100k</text>
                <line x1="32" y1="80" x2="550" y2="80" stroke="#f3f4f6" strokeWidth="1" />

                <text x="0" y="134" className="text-[10px] font-semibold fill-gray-400">50k</text>
                <line x1="32" y1="130" x2="550" y2="130" stroke="#f3f4f6" strokeWidth="1" />

                <text x="0" y="184" className="text-[10px] font-semibold fill-gray-400">0</text>
                <line x1="32" y1="180" x2="550" y2="180" stroke="#e5e7eb" strokeWidth="1" />

                {/* Operating Expenses Shading */}
                <path d="M 60 172 L 155 168 L 250 170 L 345 160 L 440 156 L 535 158 L 535 180 L 60 180 Z" fill="#F4A261" opacity="0.18" />

                {/* Operating Expenses Dashed Line */}
                <path d="M 60 172 L 155 168 L 250 170 L 345 160 L 440 156 L 535 158" fill="none" stroke="#F4A261" strokeWidth="2.5" strokeDasharray="5 5" />
                <circle cx="60" cy="172" r="3.5" fill="#F4A261" />
                <circle cx="155" cy="168" r="3.5" fill="#F4A261" />

                {/* Gross Revenue Shading */}
                <path d="M 60 155 L 155 125 L 250 95 L 345 102 L 440 60 L 535 45 L 535 180 L 60 180 Z" fill="#072F29" opacity="0.06" />

                {/* Gross Revenue Thick Line */}
                <path d="M 60 155 L 155 125 L 250 95 L 345 102 L 440 60 L 535 45" fill="none" stroke="#072F29" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="60" cy="155" r="4" fill="#072F29" />
                <circle cx="535" cy="45" r="4" fill="#072F29" />

                {/* X-axis Month Labels */}
                {['MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT'].map((m, i) => (
                  <text key={m} x={60 + i * 95} y="196" textAnchor="middle" className="text-[10px] font-bold fill-gray-400 tracking-wider">{m}</text>
                ))}
              </svg>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#072F29]" />
              <span className="text-xs font-bold text-gray-700">Gross Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#F4A261]" />
              <span className="text-xs font-bold text-gray-700">Operating Expenses</span>
            </div>
          </div>
        </div>

        {/* Right: Payment Status */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900 m-0">Payment Status</h2>
            <p className="text-xs text-gray-500 m-0 mt-0.5">Current month distribution</p>
          </div>

          {/* Donut Chart */}
          <div className="my-6 flex items-center justify-center relative">
            <svg className="w-44 h-44 transform -rotate-90" viewBox="0 0 160 160">
              {/* Background Track */}
              <circle cx="80" cy="80" r="56" fill="none" stroke="#f3f4f6" strokeWidth="18" />

              {/* Paid Full: 186/248 = 75% -> 263.89 */}
              <circle cx="80" cy="80" r="56" fill="none" stroke="#072F29" strokeWidth="18" strokeDasharray="263.89 351.86" strokeDashoffset="0" strokeLinecap="round" />

              {/* Pending: 37/248 = 15% -> 52.78 */}
              <circle cx="80" cy="80" r="56" fill="none" stroke="#F87171" strokeWidth="18" strokeDasharray="52.78 351.86" strokeDashoffset="-268" strokeLinecap="round" />

              {/* Overdue: 25/248 = 10% -> 35.18 */}
              <circle cx="80" cy="80" r="56" fill="none" stroke="#DC2626" strokeWidth="18" strokeDasharray="35.18 351.86" strokeDashoffset="-325" strokeLinecap="round" />
            </svg>

            {/* Center Donut Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-display font-black text-gray-900 leading-none">248</span>
              <span className="text-[9px] font-bold text-gray-400 tracking-wider mt-1">TOTAL UNITS</span>
            </div>
          </div>

          {/* Status Distribution List */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-medium text-gray-700">
                <span className="w-2.5 h-2.5 rounded-full bg-[#072F29]" /> Paid Full
              </div>
              <span className="font-bold text-sm text-gray-900">186</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-medium text-gray-700">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F87171]" /> Pending
              </div>
              <span className="font-bold text-sm text-gray-900">37</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-medium text-gray-700">
                <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]" /> Overdue
              </div>
              <span className="font-bold text-sm text-gray-900">25</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── RECENT TRANSACTIONS TABLE ── */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between gap-4">
          <h2 className="text-base font-bold text-gray-900 m-0">Recent Transactions</h2>
          <div className="flex items-center gap-2">
            <button className="p-1.5 text-gray-500 hover:text-black rounded-lg hover:bg-gray-100 transition-colors cursor-pointer" aria-label="Filter">
              <Filter size={16} />
            </button>
            <button className="p-1.5 text-gray-500 hover:text-black rounded-lg hover:bg-gray-100 transition-colors cursor-pointer" aria-label="More options">
              <MoreVertical size={16} />
            </button>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                {['Transaction Date', 'Tenant', 'Property / Unit', 'Method', 'Amount', 'Status'].map((h) => (
                  <th key={h} className="py-3.5 px-5 text-[10px] font-bold text-gray-400 tracking-wider uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-4 px-5 text-xs sm:text-sm font-mono text-gray-800">{tx.date}</td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${tx.tenantBg} flex items-center justify-center text-xs font-bold shrink-0`}>
                        {tx.tenantInitials}
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-gray-900">{tx.tenantName}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-xs sm:text-sm text-gray-700 font-medium">{tx.propertyUnit}</td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-700 font-medium">
                      <tx.methodIcon size={16} className="text-gray-500 shrink-0" />
                      <span>{tx.method}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-xs sm:text-sm font-mono font-bold text-gray-900">{tx.amount}</td>
                  <td className="py-4 px-5">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${tx.statusBg}`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Pagination Footer */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-white text-xs text-gray-500 font-medium">
          <span>Showing 1-5 of 1,248 transactions</span>
          <div className="flex items-center gap-2">
            <button className="px-3.5 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-bold shadow-2xs transition-all cursor-pointer">Previous</button>
            <button className="px-3.5 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-bold shadow-2xs transition-all cursor-pointer">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
