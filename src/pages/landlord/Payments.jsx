import { useState } from 'react';
import { createPortal } from 'react-dom';
import { toast } from 'sonner';
import {
  Banknote, Send, Download, ChevronDown, Filter, MoreVertical,
  CreditCard, Landmark, Wallet, Calendar, Sliders, X, Check, Plus
} from 'lucide-react';

const initialTransactions = [
  {
    id: 'tx1',
    date: 'Oct 12, 2023',
    tenantInitials: 'JH',
    tenantBg: 'bg-teal-100 text-teal-800',
    tenantName: 'Jumoke H.',
    propertyUnit: 'Victoria Island Towers / 402B',
    method: 'Bank Transfer',
    methodIcon: Landmark,
    amount: '₦2,850,000',
    status: 'SUCCESS',
    statusBg: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 'tx2',
    date: 'Oct 11, 2023',
    tenantInitials: 'RM',
    tenantBg: 'bg-orange-100 text-orange-800',
    tenantName: 'Rotimi Mohammed',
    propertyUnit: 'Lekki Palms Villas / 12A',
    method: 'Card Payment',
    methodIcon: CreditCard,
    amount: '₦3,420,000',
    status: 'PROCESSING',
    statusBg: 'bg-amber-100 text-amber-700',
  },
  {
    id: 'tx3',
    date: 'Oct 10, 2023',
    tenantInitials: 'SA',
    tenantBg: 'bg-teal-100 text-teal-800',
    tenantName: 'Simisola Alabi',
    propertyUnit: 'Ikeja City Mall / G2',
    method: 'Bank Transfer',
    methodIcon: Landmark,
    amount: '₦1,950,000',
    status: 'SUCCESS',
    statusBg: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 'tx4',
    date: 'Oct 09, 2023',
    tenantInitials: 'TW',
    tenantBg: 'bg-rose-100 text-rose-800',
    tenantName: 'Tunde Williams',
    propertyUnit: 'Victoria Island Towers / 204C',
    method: 'Card Payment',
    methodIcon: CreditCard,
    amount: '₦2,100,000',
    status: 'FAILED',
    statusBg: 'bg-rose-100 text-rose-700',
  },
  {
    id: 'tx5',
    date: 'Oct 08, 2023',
    tenantInitials: 'LD',
    tenantBg: 'bg-gray-100 text-gray-800',
    tenantName: 'Lekan Danjuma',
    propertyUnit: 'Banana Island Lofts / 501',
    method: 'Bank Transfer',
    methodIcon: Banknote,
    amount: '₦1,750,000',
    status: 'SUCCESS',
    statusBg: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 'tx6',
    date: 'Oct 07, 2023',
    tenantInitials: 'CN',
    tenantBg: 'bg-purple-100 text-purple-800',
    tenantName: 'Chioma Nwosu',
    propertyUnit: 'Victoria Island Towers / 4B',
    method: 'Bank Transfer',
    methodIcon: Landmark,
    amount: '₦2,450,000',
    status: 'SUCCESS',
    statusBg: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 'tx7',
    date: 'Oct 05, 2023',
    tenantInitials: 'AO',
    tenantBg: 'bg-blue-100 text-blue-800',
    tenantName: 'Adebayo Ogunlesi',
    propertyUnit: 'Lekki Palms Villas / 12A',
    method: 'Card Payment',
    methodIcon: CreditCard,
    amount: '₦3,100,000',
    status: 'SUCCESS',
    statusBg: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 'tx8',
    date: 'Oct 03, 2023',
    tenantInitials: 'DS',
    tenantBg: 'bg-amber-100 text-amber-800',
    tenantName: 'Dapo Solarin',
    propertyUnit: 'Maitama Heights / 3',
    method: 'Bank Transfer',
    methodIcon: Landmark,
    amount: '₦1,850,000',
    status: 'PROCESSING',
    statusBg: 'bg-amber-100 text-amber-700',
  },
  {
    id: 'tx9',
    date: 'Sep 28, 2023',
    tenantInitials: 'EN',
    tenantBg: 'bg-rose-100 text-rose-800',
    tenantName: 'Emeka Nnamdi',
    propertyUnit: 'Victoria Island Towers / 9A',
    method: 'Card Payment',
    methodIcon: CreditCard,
    amount: '₦2,100,000',
    status: 'SUCCESS',
    statusBg: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 'tx10',
    date: 'Sep 25, 2023',
    tenantInitials: 'ZB',
    tenantBg: 'bg-teal-100 text-teal-800',
    tenantName: 'Zainab Balogun',
    propertyUnit: 'GRA Phase 2 Duplexes / 1',
    method: 'Bank Transfer',
    methodIcon: Landmark,
    amount: '₦2,900,000',
    status: 'SUCCESS',
    statusBg: 'bg-emerald-100 text-emerald-700',
  },
];

const chartVariations = {
  'Last 6 Months': {
    labels: ['MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT'],
    expPath: 'M 60 172 L 155 168 L 250 170 L 345 160 L 440 156 L 535 158',
    expFill: 'M 60 172 L 155 168 L 250 170 L 345 160 L 440 156 L 535 158 L 535 180 L 60 180 Z',
    revPath: 'M 60 155 L 155 125 L 250 95 L 345 102 L 440 60 L 535 45',
    revFill: 'M 60 155 L 155 125 L 250 95 L 345 102 L 440 60 L 535 45 L 535 180 L 60 180 Z',
    expPoints: [[60, 172], [155, 168], [250, 170], [345, 160], [440, 156], [535, 158]],
    revPoints: [[60, 155], [155, 125], [250, 95], [345, 102], [440, 60], [535, 45]]
  },
  'This Year': {
    labels: ['JAN', 'MAR', 'MAY', 'JUL', 'SEP', 'NOV'],
    expPath: 'M 60 165 L 155 160 L 250 162 L 345 150 L 440 148 L 535 142',
    expFill: 'M 60 165 L 155 160 L 250 162 L 345 150 L 440 148 L 535 142 L 535 180 L 60 180 Z',
    revPath: 'M 60 140 L 155 130 L 250 110 L 345 90 L 440 70 L 535 30',
    revFill: 'M 60 140 L 155 130 L 250 110 L 345 90 L 440 70 L 535 30 L 535 180 L 60 180 Z',
    expPoints: [[60, 165], [155, 160], [250, 162], [345, 150], [440, 148], [535, 142]],
    revPoints: [[60, 140], [155, 130], [250, 110], [345, 90], [440, 70], [535, 30]]
  },
  'All Time': {
    labels: ['2021', '2022', '2023', '2024', '2025', '2026'],
    expPath: 'M 60 170 L 155 165 L 250 155 L 345 145 L 440 135 L 535 130',
    expFill: 'M 60 170 L 155 165 L 250 155 L 345 145 L 440 135 L 535 130 L 535 180 L 60 180 Z',
    revPath: 'M 60 160 L 155 140 L 250 120 L 345 90 L 440 50 L 535 20',
    revFill: 'M 60 160 L 155 140 L 250 120 L 345 90 L 440 50 L 535 20 L 535 180 L 60 180 Z',
    expPoints: [[60, 170], [155, 165], [250, 155], [345, 145], [440, 135], [535, 130]],
    revPoints: [[60, 160], [155, 140], [250, 120], [345, 90], [440, 50], [535, 20]]
  }
};

const Payments = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [timeRange, setTimeRange] = useState('Last 6 Months');
  const activeChart = chartVariations[timeRange] || chartVariations['Last 6 Months'];
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const [statusFilter, setStatusFilter] = useState('ALL');
  const [showFilterModal, setShowFilterModal] = useState(false);

  const [activeTab, setActiveTab] = useState('ledger'); // 'ledger' | 'instalments'
  const [instalmentRequests, setInstalmentRequests] = useState([
    {
      id: 'REQ-1092',
      tenantName: 'Simisola Alabi',
      tenantInitials: 'SA',
      tenantBg: 'bg-teal-100 text-teal-800',
      propertyUnit: 'Victoria Island Towers / Suite 402B',
      totalRent: '₦3,250,000',
      trancheCount: 3,
      scheduleText: '3 Tranches (Oct 1, Nov 1, Dec 1)',
      partner: 'Kwara Cooperative Credit',
      partnerFee: '1.5% (₦48,750)',
      status: 'Pending',
      submittedDate: '2 hours ago'
    },
    {
      id: 'REQ-1093',
      tenantName: 'Obafemi Martins',
      tenantInitials: 'OM',
      tenantBg: 'bg-orange-100 text-orange-800',
      propertyUnit: 'Lekki Palms Villas / Duplex 12A',
      totalRent: '₦4,500,000',
      trancheCount: 4,
      scheduleText: '4 Tranches Quarterly (Q4 2023 - Q3 2024)',
      partner: 'Carbon Digital Split',
      partnerFee: '2.5% (₦112,500)',
      status: 'Pending',
      submittedDate: 'Yesterday'
    },
    {
      id: 'REQ-1094',
      tenantName: 'Folake Adeyemi',
      tenantInitials: 'FA',
      tenantBg: 'bg-purple-100 text-purple-800',
      propertyUnit: 'Ikeja City Mall / Retail G2',
      totalRent: '₦2,100,000',
      trancheCount: 2,
      scheduleText: '2 Tranches (50% Upfront, 50% in 60 days)',
      partner: 'Direct Landlord Agreement',
      partnerFee: '0% Interest Fee',
      status: 'Pending',
      submittedDate: '2 days ago'
    },
    {
      id: 'REQ-1095',
      tenantName: 'Chinedu Eze',
      tenantInitials: 'CE',
      tenantBg: 'bg-blue-100 text-blue-800',
      propertyUnit: 'Maitama Heights / Penthouse 3',
      totalRent: '₦3,800,000',
      trancheCount: 3,
      scheduleText: '3 Tranches Monthly Split',
      partner: 'Renmoney Housing Financing',
      partnerFee: '2.0% (₦76,000)',
      status: 'Pending',
      submittedDate: '3 days ago'
    }
  ]);

  const handleApproveInstalment = (reqId, tenantName) => {
    setInstalmentRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: 'Approved' } : r));
    toast.success(`Split payment request approved for ${tenantName}. Digital contract executed!`);
  };

  const handleRejectInstalment = (reqId, tenantName) => {
    setInstalmentRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: 'Rejected' } : r));
    toast.info(`Split payment request declined for ${tenantName}.`);
  };

  const [showManualModal, setShowManualModal] = useState(false);
  const [manualForm, setManualForm] = useState({
    tenantName: '',
    propertyUnit: '',
    amount: '',
    method: 'Bank Transfer'
  });

  const [showReminderModal, setShowReminderModal] = useState(false);

  const filteredTx = transactions.filter(tx => {
    if (statusFilter === 'ALL') return true;
    return tx.status === statusFilter;
  });

  const totalPages = Math.ceil(filteredTx.length / rowsPerPage) || 1;
  const paginatedTx = filteredTx.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleExportCSV = () => {
    const headers = ['Transaction ID,Date,Tenant Name,Property/Unit,Method,Amount,Status'];
    const rows = transactions.map(t => `"${t.id}","${t.date}","${t.tenantName}","${t.propertyUnit}","${t.method}","${t.amount}","${t.status}"`);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `financial_ledger_${timeRange.toLowerCase().replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('Financial ledger exported and downloaded successfully!');
  };

  const handleRecordPayment = (e) => {
    e.preventDefault();
    if (!manualForm.tenantName || !manualForm.amount || !manualForm.propertyUnit) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const initials = manualForm.tenantName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    const newTx = {
      id: `tx_${Date.now()}`,
      date: 'Oct 24, 2023',
      tenantInitials: initials || 'TX',
      tenantBg: 'bg-teal-100 text-teal-800',
      tenantName: manualForm.tenantName,
      propertyUnit: manualForm.propertyUnit,
      method: manualForm.method,
      methodIcon: manualForm.method === 'Bank Transfer' ? Landmark : CreditCard,
      amount: manualForm.amount.startsWith('₦') ? manualForm.amount : `₦${Number(manualForm.amount.replace(/[^0-9]/g, '')).toLocaleString()}`,
      status: 'SUCCESS',
      statusBg: 'bg-emerald-100 text-emerald-700'
    };

    setTransactions([newTx, ...transactions]);
    setShowManualModal(false);
    setManualForm({ tenantName: '', propertyUnit: '', amount: '', method: 'Bank Transfer' });
    setCurrentPage(1);
    toast.success('Manual payment successfully recorded and added to ledger!');
  };

  const handleSendReminders = () => {
    setShowReminderModal(false);
    toast.success('Payment reminders sent via SMS & WhatsApp to 25 overdue units!');
  };

  return (
    <div className="font-sans text-gray-900 pb-12 relative">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight m-0">Financial Dashboard</h1>
          <p className="text-base text-[#4A4F4C] font-medium mt-1 mb-0">Overview of your real estate portfolio performance ({timeRange}).</p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-2.5 shrink-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setShowManualModal(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 font-bold text-xs shadow-2xs transition-all cursor-pointer active:scale-95"
            >
              <Banknote size={15} className="text-gray-600" />
              Record Manual Payment
            </button>
            <button
              onClick={() => setShowReminderModal(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 font-bold text-xs shadow-2xs transition-all cursor-pointer active:scale-95"
            >
              <Send size={14} className="text-gray-600" />
              Send Reminders
            </button>
          </div>
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#072F29] hover:bg-[#0b4f45] text-white font-bold text-xs shadow-sm transition-all cursor-pointer active:scale-95"
          >
            <Download size={14} />
            Export Financials (CSV)
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-2xl w-fit mb-6">
        <button
          onClick={() => setActiveTab('ledger')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border-none flex items-center gap-2 ${
            activeTab === 'ledger' ? 'bg-[#0B4F45] text-white shadow-xs' : 'bg-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <span>📊 Financial Ledger & Analytics</span>
        </button>
        <button
          onClick={() => setActiveTab('instalments')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border-none flex items-center gap-2 ${
            activeTab === 'instalments' ? 'bg-[#0B4F45] text-white shadow-xs' : 'bg-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <span>🤝 Split Rent & Instalment Requests</span>
          <span className="bg-[#C75B30] text-white px-2 py-0.5 rounded-full text-[10px] font-black">
            {instalmentRequests.filter(r => r.status === 'Pending').length}
          </span>
        </button>
      </div>

      {activeTab === 'ledger' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl border border-gray-200/80 p-6 card-shadow flex flex-col justify-between min-h-[145px]">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center shrink-0">
                    <Banknote size={18} />
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">+12.5%</span>
            </div>
            <p className="text-sm font-semibold uppercase text-gray-800 mt-4 mb-1">Total Revenue (MTD)</p>
            <p className="text-2xl font-display font-black text-gray-900 m-0 tracking-tight">₦142.4M</p>
          </div>
        </div>

        {/* Outstanding Rent */}
        <div className="bg-white rounded-xl border border-gray-200/80 p-6 card-shadow flex flex-col justify-between min-h-[145px]">
          <div>
            <div className="flex items-center justify-between gap-2">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <Calendar size={18} />
              </div>
              <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full">-3.2%</span>
            </div>
            <p className="text-sm font-semibold uppercase text-gray-800 mt-4 mb-1">Outstanding Rent</p>
            <p className="text-2xl font-display font-black text-gray-900 m-0 tracking-tight">₦8.25M</p>
          </div>
          <div className="mt-3 pt-1">
            <svg className="w-full h-8 overflow-visible" viewBox="0 0 140 30">
              <path d="M 0 12 C 25 12, 40 18, 65 18 C 85 18, 95 28, 115 10 C 125 4, 130 6, 135 6" fill="none" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Collection Rate */}
        <div className="bg-white rounded-xl border border-gray-200/80 p-6 card-shadow flex flex-col justify-between min-h-[145px]">
          <div>
            <div className="flex items-center justify-between gap-2">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center shrink-0">
                <Sliders size={18} />
              </div>
              <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Stable</span>
            </div>
            <p className="text-sm font-semibold uppercase text-gray-800 mt-4 mb-1">Collection Rate</p>
            <p className="text-2xl font-display font-black text-gray-900 m-0 tracking-tight">94.8%</p>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-100 h-3.5 rounded-full overflow-hidden">
              <div className="bg-[#072F29] h-full rounded-full w-[94.8%]" />
            </div>
          </div>
        </div>

        {/* Net Cash Flow */}
        <div className="bg-white rounded-xl border border-gray-200/80 p-6 card-shadow flex flex-col justify-between min-h-[145px]">
          <div>
            <div className="flex items-center justify-between gap-2">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                <Wallet size={18} />
              </div>
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">+8.1%</span>
            </div>
            <p className="text-sm font-semibold uppercase text-gray-800 mt-4 mb-1">Net Cash Flow</p>
            <p className="text-2xl font-display font-black text-gray-900 m-0 tracking-tight">₦92.1M</p>
          </div>
          <div className="mt-3 pt-1">
            <svg className="w-full h-8 overflow-visible" viewBox="0 0 140 30">
              <path d="M 0 24 C 20 22, 35 18, 55 18 C 75 18, 85 28, 105 8 C 115 -2, 125 8, 135 8" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── MIDDLE ANALYTICS GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Left: Revenue vs Expenses Analytics */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200/80 p-6 card-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h2 className="text-sm font-semibold uppercase text-gray-800 m-0">Revenue vs Expenses Analytics</h2>
            <div className="relative">
              <select
                value={timeRange}
                onChange={(e) => {
                  setTimeRange(e.target.value);
                  toast.success(`Financial analytics dynamically updated for: ${e.target.value}`);
                }}
                className="bg-gray-100 hover:bg-gray-200/80 text-gray-700 font-bold text-xs py-1.5 pl-3 pr-8 rounded-lg appearance-none border-none cursor-pointer focus:outline-none"
              >
                <option value="Last 6 Months">Last 6 Months</option>
                <option value="This Year">This Year</option>
                <option value="All Time">All Time</option>
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
                <path d={activeChart.expFill} fill="#F4A261" opacity="0.18" className="transition-all duration-500 ease-in-out" />

                {/* Operating Expenses Dashed Line */}
                <path d={activeChart.expPath} fill="none" stroke="#F4A261" strokeWidth="2.5" strokeDasharray="5 5" className="transition-all duration-500 ease-in-out" />
                {activeChart.expPoints.map((pt, idx) => (
                  <circle key={`exp-${idx}`} cx={pt[0]} cy={pt[1]} r="3.5" fill="#F4A261" className="transition-all duration-500 ease-in-out" />
                ))}

                {/* Gross Revenue Shading */}
                <path d={activeChart.revFill} fill="#072F29" opacity="0.06" className="transition-all duration-500 ease-in-out" />

                {/* Gross Revenue Thick Line */}
                <path d={activeChart.revPath} fill="none" stroke="#072F29" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-500 ease-in-out" />
                {activeChart.revPoints.map((pt, idx) => (
                  <circle key={`rev-${idx}`} cx={pt[0]} cy={pt[1]} r="4" fill="#072F29" className="transition-all duration-500 ease-in-out" />
                ))}

                {/* X-axis Month Labels */}
                {activeChart.labels.map((m, i) => (
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
        <div className="bg-white rounded-xl border border-gray-200/80 p-6 card-shadow flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-semibold uppercase text-gray-800 m-0">Payment Status</h2>
            <p className="text-base text-[#4A4F4C] m-0 mt-0.5">Current month distribution</p>
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
      <div className="bg-white rounded-xl border border-gray-200/80 card-shadow overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-sm font-semibold uppercase text-gray-800 m-0">
            Recent Transactions {statusFilter !== 'ALL' && `(${statusFilter})`}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilterModal(true)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${statusFilter !== 'ALL' ? 'bg-[#072F29] text-white border-[#072F29]' : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'}`}
            >
              <Filter size={14} /> Filter {statusFilter !== 'ALL' && `(${statusFilter})`}
            </button>
            {statusFilter !== 'ALL' && (
              <button
                onClick={() => { setStatusFilter('ALL'); setCurrentPage(1); }}
                className="text-xs font-bold text-rose-600 hover:underline bg-transparent border-none cursor-pointer"
              >
                Clear
              </button>
            )}
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
              {paginatedTx.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500 font-medium">
                    No transactions found for status "{statusFilter}".
                  </td>
                </tr>
              ) : (
                paginatedTx.map((tx) => (
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
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Pagination Footer */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-white text-xs text-gray-500 font-medium">
          <span>
            Showing {filteredTx.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1}–{Math.min(currentPage * rowsPerPage, filteredTx.length)} of {filteredTx.length} transactions
          </span>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="px-3.5 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 text-gray-700 font-bold shadow-2xs transition-all cursor-pointer active:scale-95"
            >
              Previous
            </button>
            <span className="px-3 py-1 font-bold text-gray-800 bg-gray-100 rounded-lg">
              {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="px-3.5 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 text-gray-700 font-bold shadow-2xs transition-all cursor-pointer active:scale-95"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
    ) : (
        /* ── INSTALMENT REQUESTS VIEW ── */
        <div className="space-y-6 animate-fade-in">
          <div className="dashboard-card bg-[#FAF7F2] p-6 rounded-2xl border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="dashboard-title text-lg font-bold text-[#0B4F45] m-0">
                Pending Split Rent & Instalment Plans
              </h2>
              <p className="dashboard-body-text text-xs text-[#4A4F4C] mt-1 m-0">
                Review proposed split payment schedules submitted by tenants. Approving executes a legally binding digital addendum.
              </p>
            </div>
            <span className="bg-[#0B4F45] text-white px-4 py-1.5 rounded-full text-xs font-bold shrink-0">
              {instalmentRequests.filter(r => r.status === 'Pending').length} Actionable Requests
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {instalmentRequests.map((req) => (
              <div
                key={req.id}
                className={`dashboard-card rounded-2xl p-6 border transition-all flex flex-col justify-between ${
                  req.status === 'Approved'
                    ? 'bg-emerald-50/40 border-emerald-200'
                    : req.status === 'Rejected'
                    ? 'bg-gray-50/70 border-gray-200 opacity-75'
                    : 'bg-white border-gray-200 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-xl font-bold flex items-center justify-center shrink-0 ${req.tenantBg}`}>
                        {req.tenantInitials}
                      </div>
                      <div>
                        <h3 className="dashboard-card-title text-base font-bold text-[#0B4F45] m-0">
                          {req.tenantName}
                        </h3>
                        <p className="dashboard-body-text text-xs text-[#4A4F4C] m-0 mt-0.5">
                          {req.propertyUnit}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider shrink-0 ${
                        req.status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : req.status === 'Rejected'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-900 animate-pulse'
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>

                  <div className="py-4 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#4A4F4C] font-semibold">Total Rent Contract:</span>
                      <span className="font-mono font-bold text-gray-900 text-sm">{req.totalRent}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#4A4F4C] font-semibold">Financing Partner:</span>
                      <span className="font-bold text-[#0B4F45]">{req.partner}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#4A4F4C] font-semibold">Partner Fee & Interest:</span>
                      <span className="font-mono text-[#C75B30] font-bold">{req.partnerFee}</span>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-200/80 mt-2">
                      <span className="text-[10px] uppercase font-bold text-gray-500 block mb-1">Proposed Schedule</span>
                      <span className="text-xs font-bold text-[#0B4F45]">{req.scheduleText}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-[#4A4F4C] font-medium">Submitted {req.submittedDate}</span>
                  {req.status === 'Pending' ? (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleRejectInstalment(req.id, req.tenantName)}
                        className="px-4 py-2 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-bold transition-all cursor-pointer"
                      >
                        Decline
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApproveInstalment(req.id, req.tenantName)}
                        className="px-5 py-2 rounded-xl bg-[#0B4F45] hover:bg-[#083D35] text-white text-xs font-bold shadow-sm transition-all cursor-pointer border-none flex items-center gap-1.5"
                      >
                        <span>Approve Plan</span>
                        <span className="material-symbols-outlined text-sm">verified</span>
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs font-bold text-gray-500 italic">
                      Decision Recorded ({req.status})
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODALS */}
      {typeof document !== 'undefined' && createPortal(
        <>
          {/* MODAL 1: Filter Transactions */}
          {showFilterModal && (
            <div className="fixed inset-0 bg-black/50 z-[99999] flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
              <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-gray-100">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
                  <h3 className="text-lg font-bold text-gray-900 m-0">Filter Transactions</h3>
                  <button onClick={() => setShowFilterModal(false)} className="text-gray-400 hover:text-gray-700 bg-transparent border-none cursor-pointer p-1">
                    <X size={20} />
                  </button>
                </div>
                <div className="space-y-2">
                  {['ALL', 'SUCCESS', 'PROCESSING', 'FAILED'].map(st => (
                    <button
                      key={st}
                      onClick={() => { setStatusFilter(st); setCurrentPage(1); setShowFilterModal(false); toast.success(`Filtered transactions by: ${st}`); }}
                      className={`w-full text-left p-3 rounded-xl text-xs font-bold border cursor-pointer transition-all flex items-center justify-between ${statusFilter === st ? 'bg-[#072F29] text-white border-[#072F29]' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'}`}
                    >
                      <span>{st === 'ALL' ? 'All Statuses' : st}</span>
                      {statusFilter === st && <Check size={16} />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MODAL 2: Record Manual Payment */}
          {showManualModal && (
            <div className="fixed inset-0 bg-black/50 z-[99999] flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
              <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
                  <h3 className="text-lg font-bold text-gray-900 m-0">Record Manual Payment</h3>
                  <button onClick={() => setShowManualModal(false)} className="text-gray-400 hover:text-gray-700 bg-transparent border-none cursor-pointer p-1">
                    <X size={20} />
                  </button>
                </div>
                <form onSubmit={handleRecordPayment} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Tenant Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Obafemi Martins"
                      value={manualForm.tenantName}
                      onChange={e => setManualForm({ ...manualForm, tenantName: e.target.value })}
                      className="w-full p-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-[#072F29]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Property / Unit</label>
                    <input
                      type="text"
                      required
                      list="payments-property-list"
                      placeholder="Type or select property / unit..."
                      value={manualForm.propertyUnit}
                      onChange={e => setManualForm({ ...manualForm, propertyUnit: e.target.value })}
                      className="w-full p-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-[#072F29]"
                    />
                    <datalist id="payments-property-list">
                      <option value="Victoria Island Towers / 402B" />
                      <option value="Lekki Palms Villas / 12A" />
                      <option value="Ikeja City Mall / G2" />
                      <option value="Victoria Island Towers / 204C" />
                      <option value="Banana Island Lofts / 501" />
                      <option value="Maitama Heights / 3" />
                      <option value="GRA Phase 2 Duplexes / 1" />
                    </datalist>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Amount (₦)</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 2,500,000"
                      value={manualForm.amount}
                      onChange={e => setManualForm({ ...manualForm, amount: e.target.value })}
                      className="w-full p-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-[#072F29]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Payment Method</label>
                    <select
                      value={manualForm.method}
                      onChange={e => setManualForm({ ...manualForm, method: e.target.value })}
                      className="w-full p-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-[#072F29] bg-white cursor-pointer"
                    >
                      <option>Bank Transfer</option>
                      <option>Card Payment</option>
                      <option>Cash / Cheque</option>
                    </select>
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex justify-end gap-2">
                    <button type="button" onClick={() => setShowManualModal(false)} className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 border-none bg-transparent cursor-pointer">
                      Cancel
                    </button>
                    <button type="submit" className="px-5 py-2 rounded-xl text-xs font-bold bg-[#072F29] text-white hover:bg-[#0b4f45] border-none cursor-pointer shadow-sm">
                      Add to Ledger
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* MODAL 3: Send Reminders Confirmation */}
          {showReminderModal && (
            <div className="fixed inset-0 bg-black/50 z-[99999] flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
              <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 text-center">
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4">
                  <Send size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 m-0 mb-2">Dispatch Payment Reminders?</h3>
                <p className="text-xs text-gray-600 m-0 mb-6 leading-relaxed">
                  You are about to broadcast automated reminders via SMS and Email to all <strong className="text-gray-900">25 overdue tenants</strong> across your portfolio.
                </p>
                <div className="flex justify-center gap-3">
                  <button onClick={() => setShowReminderModal(false)} className="px-5 py-2.5 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 border border-gray-200 bg-white cursor-pointer">
                    Cancel
                  </button>
                  <button onClick={handleSendReminders} className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#072F29] text-white hover:bg-[#0b4f45] border-none cursor-pointer shadow-sm">
                    Confirm & Send
                  </button>
                </div>
              </div>
            </div>
          )}
        </>,
        document.body
      )}
    </div>
  );
};

export default Payments;
