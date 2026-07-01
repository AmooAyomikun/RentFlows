import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {
  BarChart3, CheckCircle2, Search, SlidersHorizontal,
  Download, HelpCircle, ChevronLeft, ChevronRight, Users, PiggyBank, Sparkles, Plus, CheckCircle, ShieldCheck, Lock, FileText
} from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import { downloadReceiptDoc } from '../../utils/documentGenerator';
import Modal from '../../components/ui/Modal';

const mockTransactions = [
  { id: 'tx-1', date: 'Jun 30, 2026', description: 'Monthly Rent - Jun 2026', amount: 3250000, method: 'Bank Account (**** 4928)', status: 'Success' },
  { id: 'tx-2', date: 'Jun 15, 2026', description: 'Maintenance Fee - Plumbing Repair', amount: 120000, method: 'Credit Card (**** 1022)', status: 'Success' },
  { id: 'tx-3', date: 'May 31, 2026', description: 'Monthly Rent - May 2026', amount: 3250000, method: 'Bank Account (**** 4928)', status: 'Success' },
  { id: 'tx-4', date: 'May 15, 2026', description: 'Amenity Booking - Club House', amount: 75000, method: 'Credit Card (**** 1022)', status: 'Pending' },
  { id: 'tx-5', date: 'Apr 30, 2026', description: 'Monthly Rent - Apr 2026', amount: 3250000, method: 'Bank Account (**** 4928)', status: 'Success' },
  { id: 'tx-6', date: 'Apr 12, 2026', description: 'Parking Fee - Monthly', amount: 50000, method: 'Credit Card (**** 1022)', status: 'Failed' },
  { id: 'tx-7', date: 'Mar 31, 2026', description: 'Monthly Rent - Mar 2026', amount: 3250000, method: 'Bank Account (**** 4928)', status: 'Success' },
  { id: 'tx-8', date: 'Mar 10, 2026', description: 'Utility Deposit Adjustment', amount: 150000, method: 'Bank Transfer', status: 'Success' },
  { id: 'tx-9', date: 'Feb 28, 2026', description: 'Monthly Rent - Feb 2026', amount: 3250000, method: 'Bank Account (**** 4928)', status: 'Success' },
  { id: 'tx-10', date: 'Jan 31, 2026', description: 'Monthly Rent - Jan 2026', amount: 3250000, method: 'Bank Account (**** 4928)', status: 'Success' },
  { id: 'tx-11', date: 'Jan 05, 2026', description: 'Security Deposit Payment', amount: 6500000, method: 'Bank Transfer', status: 'Success' },
  { id: 'tx-12', date: 'Dec 31, 2025', description: 'Legal & Agreement Stamping Fee', amount: 250000, method: 'Credit Card (**** 1022)', status: 'Success' },
];

const mockAjoMembers = [
  { rank: 1, name: 'Chief Tunde Bakare', month: 'Month 1 (Jan)', status: 'Paid Out', amount: '₦2,500,000' },
  { rank: 2, name: 'Simisola Alabi', month: 'Month 2 (Feb)', status: 'Paid Out', amount: '₦2,500,000' },
  { rank: 3, name: 'Dr. Folake Adeleke', month: 'Month 3 (Mar)', status: 'Paid Out', amount: '₦2,500,000' },
  { rank: 4, name: 'Musa Rano', month: 'Month 4 (Apr)', status: 'Paid Out', amount: '₦2,500,000' },
  { rank: 5, name: 'Zainab Balogun', month: 'Month 5 (May)', status: 'Paid Out', amount: '₦2,500,000' },
  { rank: 6, name: 'Ayomikun Adeleke (YOU)', month: 'Month 6 (Jun)', status: 'Current Recipient 🌟', amount: '₦2,500,000' },
  { rank: 7, name: 'Chinedu Eze', month: 'Month 7 (Jul)', status: 'Upcoming', amount: '₦2,500,000' },
  { rank: 8, name: 'Bisi Silva', month: 'Month 8 (Aug)', status: 'Upcoming', amount: '₦2,500,000' },
  { rank: 9, name: 'Dapo Solarin', month: 'Month 9 (Sep)', status: 'Upcoming', amount: '₦2,500,000' },
  { rank: 10, name: 'Oluwaseun Olabode', month: 'Month 10 (Oct)', status: 'Upcoming', amount: '₦2,500,000' },
];

/**
 * TenantPayments — Includes History & Receipts and Ajo Savings Cooperatives
 */
const TenantPayments = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('history'); // 'history' | 'ajo'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [timeFilter, setTimeFilter] = useState('Last 6 Months');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [methodFilter, setMethodFilter] = useState('All Methods');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [selectedFailureTx, setSelectedFailureTx] = useState(null);
  const itemsPerPage = 5;

  // Ajo State
  const [ajoContributed, setAjoContributed] = useState(false);
  const [autoEscrow, setAutoEscrow] = useState(true);
  const [showCreateAjoModal, setShowCreateAjoModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupContribution, setNewGroupContribution] = useState('250000');

  const filteredTransactions = mockTransactions.filter(tx => {
    const matchesSearch = tx.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All Statuses' || tx.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesMethod = methodFilter === 'All Methods' || tx.method.toLowerCase().includes(methodFilter.toLowerCase());
    const matchesMin = !minAmount || tx.amount >= Number(minAmount);
    const matchesMax = !maxAmount || tx.amount <= Number(maxAmount);
    return matchesSearch && matchesStatus && matchesMethod && matchesMin && matchesMax;
  });

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage) || 1;
  const paginatedTransactions = filteredTransactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleContributeAjo = () => {
    setAjoContributed(true);
    toast.success('₦250,000 Ajo contribution successful via NIBSS Direct Debit! Trust Score +10 pts.');
  };

  const handleCreateGroup = (e) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;
    toast.success(`Cooperative Group "${newGroupName}" created! Invitation link sent to verified Victoria Island Towers residents.`);
    setShowCreateAjoModal(false);
    setNewGroupName('');
  };

  return (
    <div className="space-y-6 pb-16 font-sans text-[#4A4F4C]">
      
      {/* Title Section & Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-display font-extrabold text-[#0B4F45] m-0 tracking-tight">
            {activeTab === 'history' ? 'Payment History & Receipts' : 'Ajo & Thrift Savings Cooperatives'}
          </h1>
          <p className="text-xs sm:text-sm text-[#4A4F4C] font-medium mt-1 m-0">
            {activeTab === 'history' 
              ? 'Review and manage your financial transactions and receipts for Unit 402.' 
              : 'Pool contributions with verified neighbors to fund rent renewals and unlock 5% landlord discounts.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 bg-gray-100 p-1.5 rounded-2xl shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border-none flex items-center gap-1.5 ${
              activeTab === 'history' ? 'bg-[#0B4F45] text-white shadow-xs' : 'bg-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <FileText size={15} />
            <span>History & Receipts</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ajo')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border-none flex items-center gap-1.5 ${
              activeTab === 'ajo' ? 'bg-[#0B4F45] text-white shadow-xs' : 'bg-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <PiggyBank size={15} className="text-[#C75B30]" />
            <span>Ajo Cooperatives</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/tenant/pay-rent')}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-transparent text-gray-600 hover:text-gray-900 border-none cursor-pointer flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-[#C75B30] inline-block animate-pulse"></span>
            <span>Instalment Hub</span>
          </button>
        </div>
      </div>

      {activeTab === 'history' ? (
        <div className="space-y-6 animate-fade-in">

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
            <span className="text-xs font-bold text-gray-500">Jun 30, 2026</span>
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
            <span className="text-xs font-bold text-gray-600">Next payment due Jul 01</span>
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
              onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full bg-transparent text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
            />
          </div>

          {/* Status Dropdown */}
          <select
            value={statusFilter}
            onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }}
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
        <button onClick={() => setShowAdvancedFilters(true)} className="inline-flex items-center justify-center gap-2 px-5 h-11 rounded-2xl bg-white border border-gray-200/90 hover:bg-gray-50 text-gray-700 font-bold text-xs sm:text-sm shadow-2xs transition-colors cursor-pointer shrink-0">
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
              {paginatedTransactions.map(tx => (
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
                      <button onClick={() => setSelectedFailureTx(tx)} className="p-2 text-gray-400 hover:text-gray-700 rounded-lg transition-colors inline-flex items-center justify-center cursor-pointer border-none bg-transparent" title="Transaction Information">
                        <HelpCircle size={18} />
                      </button>
                    ) : (
                      <button 
                        onClick={() => {
                          downloadReceiptDoc(tx);
                        }} 
                        className="p-2 text-gray-600 hover:text-black rounded-lg transition-colors inline-flex items-center justify-center cursor-pointer hover:bg-gray-100 border-none bg-transparent" 
                        title="Download Receipt"
                      >
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
          <span>Showing {filteredTransactions.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} transactions</span>
          
          <div className="flex items-center gap-1.5">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
              disabled={currentPage === 1}
              className="w-9 h-9 rounded-xl border border-gray-200/90 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-500 cursor-pointer transition-colors shadow-2xs disabled:opacity-50"
            >
              <ChevronLeft size={16} />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button 
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-xl font-black flex items-center justify-center shadow-xs cursor-pointer transition-colors ${currentPage === page ? 'bg-[#072F29] text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
              >
                {page}
              </button>
            ))}

            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
              disabled={currentPage === totalPages}
              className="w-9 h-9 rounded-xl border border-gray-200/90 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-500 cursor-pointer transition-colors shadow-2xs disabled:opacity-50"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
    ) : (
        /* ── AJO & THRIFT COOPERATIVE HUB VIEW ── */
        <div className="space-y-6 animate-fade-in">
          
          {/* Hero Cooperative Banner */}
          <div className="dashboard-card bg-[#0B4F45] text-white p-6 sm:p-8 rounded-2xl shadow-md relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div className="space-y-3 max-w-xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck size={14} /> Verified RentFlow Cooperative
                  </span>
                  <span className="bg-[#C75B30] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Group #104 • Victoria Island Towers
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white m-0">
                  Resident Rent Ajo & Savings Pool
                </h2>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed m-0">
                  Pool contributions with verified neighbors to pre-fund upcoming annual rent renewals. Earn a guaranteed 5% landlord discount and boost your Trust Score by +25 points upon completion.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {ajoContributed ? (
                    <div className="px-5 py-3 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-bold text-xs sm:text-sm flex items-center gap-2">
                      <CheckCircle size={18} />
                      <span>Month 6 Tranche (₦250,000) Settled via NIBSS</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleContributeAjo}
                      className="px-5 py-3 rounded-xl bg-[#C75B30] hover:bg-[#b04a25] text-white font-bold text-xs sm:text-sm border-none cursor-pointer shadow-md transition-all flex items-center gap-2"
                    >
                      <PiggyBank size={18} />
                      <span>Contribute Month 6 Tranche (₦250,000)</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowCreateAjoModal(true)}
                    className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 cursor-pointer flex items-center gap-2"
                  >
                    <Plus size={16} />
                    <span>Start New Cooperative Group</span>
                  </button>
                </div>
              </div>

              {/* Payout Summary Box */}
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 text-center min-w-[260px] flex flex-col items-center">
                <span className="text-xs text-white/70 font-bold uppercase tracking-wider mb-1">Current Pool (Month 6/10)</span>
                <div className="text-3xl sm:text-4xl font-mono font-black text-[#F4C395] tracking-tight">
                  ₦2,500,000
                </div>
                <span className="text-xs font-bold text-emerald-300 mt-1">
                  Recipient This Month: YOU 🌟
                </span>

                <div className="w-full bg-black/30 p-3 rounded-xl border border-white/10 mt-4 text-left space-y-1">
                  <div className="flex justify-between items-center text-[11px] font-bold text-white/80">
                    <span>Landlord Escrow Lock</span>
                    <Lock size={12} className="text-emerald-400" />
                  </div>
                  <p className="text-[10px] text-white/60 m-0 leading-tight">
                    Funds auto-locked to 2027 Rent Renewal Account. 5% Early Renewal Discount Applied.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Members Rotation Ring Table */}
          <div className="dashboard-card bg-white rounded-2xl border border-gray-200 card-shadow overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="dashboard-title text-base font-bold text-[#0B4F45] m-0 flex items-center gap-2">
                  <Users size={18} className="text-[#C75B30]" />
                  Cooperative Rotation Schedule & Payout Roster
                </h3>
                <p className="dashboard-body-text text-xs text-[#4A4F4C] m-0 mt-0.5">
                  Every 30 days, pooled contributions disburse directly to the scheduled verified resident.
                </p>
              </div>
              <span className="text-xs font-bold text-[#0B4F45] bg-teal-50 px-3 py-1.5 rounded-full border border-teal-200 font-mono">
                10 Verified Members • ₦250k/mo
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left min-w-[600px]">
                <thead>
                  <tr className="bg-[#FAF7F2] border-b border-gray-200">
                    <th className="p-4 text-xs font-bold uppercase text-[#4A4F4C]">Turn</th>
                    <th className="p-4 text-xs font-bold uppercase text-[#4A4F4C]">Resident Member</th>
                    <th className="p-4 text-xs font-bold uppercase text-[#4A4F4C]">Scheduled Month</th>
                    <th className="p-4 text-xs font-bold uppercase text-[#4A4F4C]">Disbursement Pool</th>
                    <th className="p-4 text-xs font-bold uppercase text-[#4A4F4C]">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockAjoMembers.map((m) => (
                    <tr
                      key={m.rank}
                      className={m.rank === 6 ? 'bg-amber-50/50 font-medium' : 'hover:bg-gray-50/50'}
                    >
                      <td className="p-4 font-mono font-bold text-xs text-gray-500">#{m.rank}</td>
                      <td className="p-4 text-sm font-bold text-[#0B4F45]">
                        <div className="flex items-center gap-2">
                          <span>{m.name}</span>
                          {m.rank === 6 && (
                            <span className="bg-[#C75B30] text-white text-[10px] px-2 py-0.5 rounded-full font-black uppercase">
                              Active Turn
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-xs text-[#4A4F4C] font-mono">{m.month}</td>
                      <td className="p-4 text-sm font-mono font-bold text-gray-900">{m.amount}</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            m.status.includes('Paid')
                              ? 'bg-emerald-100 text-emerald-800'
                              : m.status.includes('Current')
                              ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {m.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* CREATE AJO GROUP MODAL */}
      <Modal isOpen={showCreateAjoModal} onClose={() => setShowCreateAjoModal(false)} title="Start New Resident Rent Ajo">
        <form onSubmit={handleCreateGroup} className="space-y-4 text-[#4A4F4C]">
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">Cooperative Group Name</label>
            <input
              type="text"
              placeholder="e.g. Victoria Island 2027 Rent Pool"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              required
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:border-[#0B4F45]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Monthly Contribution (₦)</label>
              <input
                type="number"
                value={newGroupContribution}
                onChange={(e) => setNewGroupContribution(e.target.value)}
                required
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-xs font-mono font-bold text-gray-800 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Total Members Roster</label>
              <select className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-xs font-bold bg-gray-50">
                <option value="5">5 Residents (5 Months)</option>
                <option value="10">10 Residents (10 Months)</option>
                <option value="12">12 Residents (1 Year)</option>
              </select>
            </div>
          </div>

          <div className="p-3 bg-teal-50 rounded-xl border border-teal-100 flex items-center gap-2.5 text-xs">
            <ShieldCheck size={18} className="text-[#0B4F45] shrink-0" />
            <p className="m-0 text-[#0B4F45]">
              All members undergo automated NIN & BVN trust screening before joining the payout cycle.
            </p>
          </div>

          <div className="flex gap-3 pt-2 justify-end">
            <button
              type="button"
              onClick={() => setShowCreateAjoModal(false)}
              className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 cursor-pointer bg-transparent"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#0B4F45] hover:bg-[#083D35] text-white rounded-xl text-xs font-bold cursor-pointer border-none shadow-sm"
            >
              Launch Cooperative Group
            </button>
          </div>
        </form>
      </Modal>

      {/* Advanced Filters Modal Drawer */}
      <Modal isOpen={showAdvancedFilters} onClose={() => setShowAdvancedFilters(false)} title="Advanced Transaction Filters">
        <div className="space-y-4 text-left">
          <div>
            <label className="text-xs font-bold text-gray-700 uppercase block mb-1">Payment Method</label>
            <select value={methodFilter} onChange={e => setMethodFilter(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#072F29]">
              <option value="All Methods">All Methods</option>
              <option value="Bank Account">Bank Account</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Transfer">Bank Transfer</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase block mb-1">Min Amount (₦)</label>
              <input type="number" placeholder="0" value={minAmount} onChange={e => setMinAmount(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm bg-gray-50 focus:outline-none" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase block mb-1">Max Amount (₦)</label>
              <input type="number" placeholder="5000000" value={maxAmount} onChange={e => setMaxAmount(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm bg-gray-50 focus:outline-none" />
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-6 justify-end">
          <button onClick={() => { setMethodFilter('All Methods'); setMinAmount(''); setMaxAmount(''); setCurrentPage(1); }} className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 cursor-pointer bg-transparent">Reset</button>
          <button onClick={() => { setShowAdvancedFilters(false); setCurrentPage(1); }} className="px-5 py-2 bg-[#072F29] text-white rounded-xl text-xs font-bold hover:bg-[#051f1b] cursor-pointer border-none">Apply Filters</button>
        </div>
      </Modal>

      {/* Failure Details Modal */}
      <Modal isOpen={!!selectedFailureTx} onClose={() => setSelectedFailureTx(null)} title="Transaction Details">
        {selectedFailureTx && (
          <div className="space-y-4 text-[#1E293B]">
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl space-y-1">
              <p className="text-xs font-bold text-red-900 uppercase tracking-wider m-0">Status: Payment Failed</p>
              <p className="text-xs text-red-800 m-0 leading-relaxed">
                Your financial institution declined or timed out during processing for <strong>{selectedFailureTx.description}</strong> ({formatCurrency(selectedFailureTx.amount)}).
              </p>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Transaction ID</span>
                <span className="font-mono font-bold">{selectedFailureTx.id}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Attempt Date</span>
                <span className="font-bold">{selectedFailureTx.date}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Payment Method</span>
                <span className="font-bold">{selectedFailureTx.method}</span>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button onClick={() => setSelectedFailureTx(null)} className="px-5 py-2 bg-[#04332C] text-white rounded-lg text-xs font-bold border-none cursor-pointer">Close</button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};

export default TenantPayments;
