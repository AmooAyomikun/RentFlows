import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, CheckCircle2, Search, SlidersHorizontal,
  Download, HelpCircle, ChevronLeft, ChevronRight
} from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';

const mockTransactions = [
  {
    id: 'tx-1',
    date: 'Oct 01, 2026',
    description: 'Monthly Rent - Oct 2026',
    amount: 3250000,
    method: 'Bank Account (**** 4928)',
    status: 'Success',
  },
  {
    id: 'tx-2',
    date: 'Sep 05, 2026',
    description: 'Maintenance Fee - Plumbing Repair',
    amount: 120000,
    method: 'Credit Card (**** 1022)',
    status: 'Success',
  },
  {
    id: 'tx-3',
    date: 'Sep 01, 2026',
    description: 'Monthly Rent - Sep 2026',
    amount: 3250000,
    method: 'Bank Account (**** 4928)',
    status: 'Success',
  },
  {
    id: 'tx-4',
    date: 'Aug 15, 2026',
    description: 'Amenity Booking - Club House',
    amount: 75000,
    method: 'Credit Card (**** 1022)',
    status: 'Pending',
  },
  {
    id: 'tx-5',
    date: 'Aug 01, 2026',
    description: 'Monthly Rent - Aug 2026',
    amount: 3250000,
    method: 'Bank Account (**** 4928)',
    status: 'Success',
  },
  {
    id: 'tx-6',
    date: 'Jul 12, 2026',
    description: 'Parking Fee - Monthly',
    amount: 50000,
    method: 'Credit Card (**** 1022)',
    status: 'Failed',
  },
];

/**
 * TenantPayments — Redesigned pixel-perfect to match Screenshot 2 (Payment History)
 */
const TenantPayments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [timeFilter, setTimeFilter] = useState('Last 6 Months');

  const filteredTransactions = mockTransactions.filter(tx => {
    const matchesSearch = tx.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All Statuses' || tx.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-16">
      
      {/* Title Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 m-0 mb-1">
          Payment History
        </h1>
        <p className="text-base text-[#4A4F4C] m-0">
          Review and manage your financial transactions for Unit 402.
        </p>
      </div>

      {/* Top Summary Cards Grid (3 Cards matching Screenshot 2 exactly) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: TOTAL PAID (YTD) */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-gray-200 p-6 card-shadow relative overflow-hidden flex flex-col justify-between h-40"
        >
          <div className="flex justify-between items-start">
            <h2 className="text-sm font-semibold uppercase text-gray-800 m-0">
              TOTAL PAID (YTD)
            </h2>
            <BarChart3 size={38} className="text-gray-100 absolute top-5 right-5 pointer-events-none stroke-[1.5]" />
          </div>
          
          <div className="my-2 relative z-10">
            <p className="text-3xl sm:text-4xl font-black text-[#072F29] font-mono tracking-tight m-0">
              {formatCurrency(32500000)}
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-600 relative z-10">
            <span>↗</span>
            <span>10 payments made</span>
          </div>
        </motion.div>

        {/* Card 2: LAST PAYMENT */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-gray-200 p-6 card-shadow relative overflow-hidden flex flex-col justify-between h-40"
        >
          <h2 className="text-sm font-semibold uppercase text-gray-800 m-0">
            LAST PAYMENT
          </h2>
          
          <div className="my-2">
            <p className="text-3xl sm:text-4xl font-black text-[#072F29] font-mono tracking-tight m-0">
              {formatCurrency(3250000)}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500">Oct 01, 2026</span>
            <span className="bg-emerald-100 text-emerald-800 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-2xs">
              SUCCESS
            </span>
          </div>
        </motion.div>

        {/* Card 3: OUTSTANDING BALANCE */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border border-gray-200 p-6 card-shadow relative overflow-hidden flex flex-col justify-between h-40"
        >
          <h2 className="text-sm font-semibold uppercase text-gray-800 m-0">
            OUTSTANDING BALANCE
          </h2>
          
          <div className="my-2 flex items-center gap-2.5">
            <p className="text-3xl sm:text-4xl font-black text-[#9A3412] font-mono tracking-tight">
              {formatCurrency(0)}
            </p>
            <CheckCircle2 size={26} className="text-emerald-500 fill-emerald-50 shrink-0" />
          </div>

          <div>
            <span className="text-xs font-bold text-gray-600">Next payment due Nov 01</span>
          </div>
        </motion.div>

      </div>

      {/* Filters Bar & Search Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2">
        
        {/* Left Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Search */}
          <div className="relative flex items-center bg-white border border-gray-200/90 rounded-2xl h-11 px-4 shadow-2xs w-full sm:w-72 focus-within:border-[#072F29] focus-within:ring-2 focus-within:ring-[#072F29]/10 transition-all">
            <Search size={16} className="text-gray-400 mr-2.5 shrink-0" />
            <input
              type="text"
              placeholder="Search by description..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
            />
          </div>

          {/* Status Dropdown */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="bg-white border border-gray-200/90 rounded-2xl h-11 px-4 text-xs sm:text-sm font-bold text-gray-700 shadow-2xs focus:outline-none focus:border-[#072F29] cursor-pointer shrink-0"
          >
            <option>All Statuses</option>
            <option>Success</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>

          {/* Timeframe Dropdown */}
          <select
            value={timeFilter}
            onChange={e => setTimeFilter(e.target.value)}
            className="bg-white border border-gray-200/90 rounded-2xl h-11 px-4 text-xs sm:text-sm font-bold text-gray-700 shadow-2xs focus:outline-none focus:border-[#072F29] cursor-pointer shrink-0"
          >
            <option>Last 6 Months</option>
            <option>Last 12 Months</option>
            <option>All Time</option>
          </select>
        </div>

        {/* Right Advanced Filters Button */}
        <button className="inline-flex items-center justify-center gap-2 px-5 h-11 rounded-2xl bg-white border border-gray-200/90 hover:bg-gray-50 text-gray-700 font-bold text-xs sm:text-sm shadow-2xs transition-colors cursor-pointer shrink-0">
          <SlidersHorizontal size={16} />
          <span>Advanced Filters</span>
        </button>

      </div>

      {/* Transactions Table Container */}
      <div className="bg-white rounded-xl border border-gray-200 card-shadow overflow-hidden">
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[#FAF7F2] border-b border-gray-200 text-[11px] font-black text-gray-400 uppercase tracking-wider h-12">
                <th className="pl-6 pr-4">DATE</th>
                <th className="px-4">DESCRIPTION</th>
                <th className="px-4">AMOUNT</th>
                <th className="px-4">METHOD</th>
                <th className="px-4">STATUS</th>
                <th className="pr-6 pl-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm font-medium text-gray-800">
              {filteredTransactions.map(tx => (
                <tr key={tx.id} className="hover:bg-[#FAF7F2]/30 transition-colors h-16">
                  <td className="pl-6 pr-4 font-bold text-gray-900 whitespace-nowrap">
                    {tx.date}
                  </td>
                  <td className="px-4 font-semibold text-gray-800">
                    {tx.description}
                  </td>
                  <td className="px-4 font-mono font-bold text-gray-900 text-base whitespace-nowrap">
                    {formatCurrency(tx.amount)}
                  </td>
                  <td className="px-4 text-gray-600 font-medium whitespace-nowrap">
                    {tx.method}
                  </td>
                  <td className="px-4 whitespace-nowrap">
                    {tx.status === 'Success' ? (
                      <span className="bg-emerald-100 text-emerald-800 font-black text-xs px-3 py-1 rounded-full inline-flex items-center shadow-2xs">
                        Success
                      </span>
                    ) : tx.status === 'Pending' ? (
                      <span className="bg-amber-100 text-amber-800 font-black text-xs px-3 py-1 rounded-full inline-flex items-center shadow-2xs">
                        Pending
                      </span>
                    ) : (
                      <span className="bg-rose-100 text-rose-800 font-black text-xs px-3 py-1 rounded-full inline-flex items-center shadow-2xs">
                        Failed
                      </span>
                    )}
                  </td>
                  <td className="pr-6 pl-4 text-right whitespace-nowrap">
                    {tx.status === 'Failed' ? (
                      <button className="p-2 text-gray-400 hover:text-gray-700 rounded-lg transition-colors inline-flex items-center justify-center cursor-pointer" title="Transaction Information">
                        <HelpCircle size={18} />
                      </button>
                    ) : (
                      <button className="p-2 text-gray-600 hover:text-black rounded-lg transition-colors inline-flex items-center justify-center cursor-pointer hover:bg-gray-100" title="Download Receipt">
                        <Download size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer Pagination matching Screenshot 2 */}
        <div className="bg-[#FAF7F2]/60 px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-medium">
          <span>Showing 1 to {filteredTransactions.length} of 32 transactions</span>
          
          <div className="flex items-center gap-1.5">
            <button className="w-9 h-9 rounded-xl border border-gray-200/90 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-500 cursor-pointer transition-colors shadow-2xs disabled:opacity-50">
              <ChevronLeft size={16} />
            </button>
            <button className="w-9 h-9 rounded-xl bg-[#072F29] text-white font-black flex items-center justify-center shadow-xs cursor-pointer">
              1
            </button>
            <button className="w-9 h-9 rounded-xl border border-gray-200/90 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-700 font-bold cursor-pointer transition-colors shadow-2xs">
              2
            </button>
            <button className="w-9 h-9 rounded-xl border border-gray-200/90 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-700 font-bold cursor-pointer transition-colors shadow-2xs">
              3
            </button>
            <button className="w-9 h-9 rounded-xl border border-gray-200/90 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-500 cursor-pointer transition-colors shadow-2xs">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default TenantPayments;
