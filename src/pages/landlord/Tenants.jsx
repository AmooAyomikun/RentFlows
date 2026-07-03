import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Filter, ArrowUpDown, Users, FileText, ShieldCheck, LogOut,
  Search, MoreVertical, ChevronLeft, ChevronRight, MessageSquare, TrendingUp, CheckCircle2,
  X, Send, Check, Bell, Wrench, Eye, Scale, AlertCircle, UploadCloud, FileCheck
} from 'lucide-react';

const initialDirectoryRows = [
  {
    id: 't1',
    name: 'Simisola Alabi',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
    isInitials: false,
    propertyUnit: 'Victoria Island Towers, #4B',
    leaseTerm: 'Oct 2023 – Sep 2024',
    rentAmount: 2450000,
    rent: '₦2,450,000',
    status: 'On Time',
    statusBg: 'bg-[#bae9df]/30',
    statusText: 'text-[#0b4f45]',
    dotBg: 'bg-[#0b4f45]',
    repScore: 890,
  },
  {
    id: 't2',
    name: 'Musa Rano',
    avatar: 'MR',
    isInitials: true,
    propertyUnit: 'Lekki Palms Villas, #12A',
    leaseTerm: 'Jan 2024 – Dec 2024',
    rentAmount: 3100000,
    rent: '₦3,100,000',
    status: 'Late',
    statusBg: 'bg-[#ffdad6]/40',
    statusText: 'text-[#ba1a1a]',
    dotBg: 'bg-[#ba1a1a]',
    repScore: 680,
  },
  {
    id: 't3',
    name: 'Dapo Solarin',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80',
    isInitials: false,
    propertyUnit: 'Maitama Heights, #3',
    leaseTerm: 'Mar 2023 – Feb 2024',
    rentAmount: 1850000,
    rent: '₦1,850,000',
    status: 'Grace Period',
    statusBg: 'bg-[#ffdbcf]/40',
    statusText: 'text-[#7f2800]',
    dotBg: 'bg-[#7f2800]',
    repScore: 745,
  },
  {
    id: 't4',
    name: 'Tunde Bakare',
    avatar: 'TB',
    isInitials: true,
    propertyUnit: 'Banana Island Lofts, #502',
    leaseTerm: 'Jun 2023 – May 2024',
    rentAmount: 4200000,
    rent: '₦4,200,000',
    status: 'On Time',
    statusBg: 'bg-[#bae9df]/30',
    statusText: 'text-[#0b4f45]',
    dotBg: 'bg-[#0b4f45]',
    repScore: 920,
  },
  {
    id: 't5',
    name: 'Zainab Balogun',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
    isInitials: false,
    propertyUnit: 'GRA Phase 2 Duplexes, #1',
    leaseTerm: 'Aug 2023 – Jul 2024',
    rentAmount: 2900000,
    rent: '₦2,900,000',
    status: 'On Time',
    statusBg: 'bg-[#bae9df]/30',
    statusText: 'text-[#0b4f45]',
    dotBg: 'bg-[#0b4f45]',
    repScore: 850,
  },
  {
    id: 't6',
    name: 'Emeka Nnamdi',
    avatar: 'EN',
    isInitials: true,
    propertyUnit: 'Victoria Island Towers, #9A',
    leaseTerm: 'Nov 2023 – Oct 2024',
    rentAmount: 2100000,
    rent: '₦2,100,000',
    status: 'Late',
    statusBg: 'bg-[#ffdad6]/40',
    statusText: 'text-[#ba1a1a]',
    dotBg: 'bg-[#ba1a1a]',
    repScore: 610,
  },
];

const mockApplications = [
  { id: 1, name: 'Chioma Nwosu', unit: 'Unit 4B, Victoria Island Towers', credit: 740, bg: 'Pending' },
  { id: 2, name: 'Adebayo Ogunlesi', unit: 'Unit 12A, Lekki Palms Villas', credit: 810, bg: 'Clear' },
  { id: 3, name: 'Folake Adeleke', unit: 'Unit 3, Maitama Heights', credit: 780, bg: 'Clear' },
  { id: 4, name: 'Chinedu Eze', unit: 'Unit 502, Banana Island Lofts', credit: 690, bg: 'Pending' },
  { id: 5, name: 'Bisi Silva', unit: 'Unit 1, GRA Phase 2 Duplexes', credit: 820, bg: 'Clear' },
  { id: 6, name: 'Oluwaseun Olabode', unit: 'Unit 9A, Victoria Island Towers', credit: 750, bg: 'Clear' },
];

const Tenants = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name'); // name, rent, status
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;

  // Modal states
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [showAllAppsModal, setShowAllAppsModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [selectedTenantAction, setSelectedTenantAction] = useState(null);

  const activeTenantsCount = initialDirectoryRows.length;
  const onTimeCount = initialDirectoryRows.filter(r => r.status === 'Active').length;
  const paymentHealthRate = Math.round((onTimeCount / (activeTenantsCount || 1)) * 100) || 94;
  const actionRequiredCount = initialDirectoryRows.filter(r => r.status === 'Late' || r.status === 'Grace Period').length;

  // Filter and Sort logic
  let filtered = initialDirectoryRows.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.propertyUnit.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  filtered.sort((a, b) => {
    if (sortBy === 'name') {
      return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else if (sortBy === 'rent') {
      return sortOrder === 'asc' ? a.rentAmount - b.rentAmount : b.rentAmount - a.rentAmount;
    } else if (sortBy === 'status') {
      return sortOrder === 'asc' ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status);
    }
    return 0;
  });

  const totalPages = Math.ceil(filtered.length / rowsPerPage) || 1;
  const paginatedRows = filtered.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleSendReply = () => {
    if (!replyMessage.trim()) {
      toast.error('Please enter a message before sending.');
      return;
    }
    toast.success('Reply dispatched to Nneka Okafor via SMS & Email!');
    setReplyMessage('');
    setShowReplyModal(false);
  };

  const [activeTab, setActiveTab] = useState('directory'); // 'directory' | 'disputes'
  const [disputeDocket, setDisputeDocket] = useState([
    {
      id: 'DSP-209',
      tenantName: 'Simisola Alabi',
      propertyUnit: 'Victoria Island Towers, #4B',
      category: 'Security Deposit Deduction Contest',
      amountContested: '₦150,000',
      filedDate: 'Jun 14, 2026',
      status: 'Awaiting Landlord Counter-Evidence',
      step: 2,
      claimSummary: 'Tenant contests wall scuff painting deduction, claiming pre-move-in inspection report proves scuffs existed prior to move-in.',
      landlordResponse: ''
    },
    {
      id: 'DSP-195',
      tenantName: 'Musa Rano',
      propertyUnit: 'Lekki Palms Villas, #12A',
      category: 'Quiet Enjoyment & Generator Noise Breach',
      amountContested: '₦100,000 Rebate Claim',
      filedDate: 'May 28, 2026',
      status: 'Arbitrator Deliberating',
      step: 3,
      claimSummary: 'Tenant claims backup industrial generator operates outside scheduled 10 PM curfew, causing acoustic disturbance.',
      landlordResponse: 'Submitted maintenance log showing soundproof enclosure installation completed May 30.'
    }
  ]);

  const [showCounterModal, setShowCounterModal] = useState(false);
  const [showNewClaimModal, setShowNewClaimModal] = useState(false);
  const [activeDisputeId, setActiveDisputeId] = useState(null);
  const [counterForm, setCounterForm] = useState({ responseText: '', files: [] });
  const [newClaimForm, setNewClaimForm] = useState({
    tenantName: 'Simisola Alabi',
    propertyUnit: 'Victoria Island Towers, #4B',
    category: 'Property Damage & Fixture Repair Claim',
    amount: '₦85,000',
    summary: ''
  });

  const handleOpenCounterModal = (d) => {
    setActiveDisputeId(d.id);
    setCounterForm({ responseText: d.landlordResponse || '', files: d.attachedFiles || [] });
    setShowCounterModal(true);
  };

  const handleAttachSimulatedFile = () => {
    const mockFiles = [
      'Move_In_Condition_Report_Signed.pdf (2.4 MB)',
      'Contractor_Repair_Receipt_2026.pdf (1.1 MB)',
      'Timestamped_Wall_Inspection_Photo.jpg (3.8 MB)'
    ];
    const randomFile = mockFiles[counterForm.files.length % mockFiles.length];
    if (!counterForm.files.includes(randomFile)) {
      setCounterForm(prev => ({ ...prev, files: [...prev.files, randomFile] }));
      toast.success(`Attached evidence document: ${randomFile}`);
    }
  };

  const handleSubmitCounter = (e) => {
    e.preventDefault();
    if (!counterForm.responseText.trim()) return;
    setDisputeDocket(prev => prev.map(d => d.id === activeDisputeId ? {
      ...d,
      landlordResponse: counterForm.responseText,
      attachedFiles: counterForm.files,
      status: 'Evidence Submitted to Arbitrator',
      step: 3
    } : d));
    toast.success(`Counter-evidence submitted for Case #${activeDisputeId}. Arbitrator review initiated.`);
    setShowCounterModal(false);
  };

  const handleCreateNewClaim = (e) => {
    e.preventDefault();
    if (!newClaimForm.summary.trim()) return;
    const newCase = {
      id: `DSP-${Math.floor(200 + Math.random() * 800)}`,
      tenantName: newClaimForm.tenantName,
      propertyUnit: newClaimForm.propertyUnit,
      category: newClaimForm.category,
      amountContested: newClaimForm.amount.startsWith('₦') ? newClaimForm.amount : `₦${newClaimForm.amount}`,
      filedDate: 'Today',
      status: 'Notice Served to Tenant',
      step: 1,
      claimSummary: newClaimForm.summary,
      landlordResponse: 'Landlord originated formal claim via Multi-Door Arbitration Portal.'
    };
    setDisputeDocket([newCase, ...disputeDocket]);
    setShowNewClaimModal(false);
    setNewClaimForm({
      tenantName: 'Simisola Alabi',
      propertyUnit: 'Victoria Island Towers, #4B',
      category: 'Property Damage & Fixture Repair Claim',
      amount: '₦85,000',
      summary: ''
    });
    toast.success('Formal Landlord Claim filed and docketed! Notice dispatched to resident.');
  };

  return (
    <div className="flex-1 overflow-y-auto relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 m-0">Tenant Management Center</h1>
          <p className="text-gray-500 text-sm mt-1">Monitor resident health, active leases, payment status and dispute docket across all portfolio units.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm inline-flex items-center gap-2 cursor-pointer">
            <Send size={16} /> Invite Tenant
          </button>
          <button onClick={() => setShowNewClaimModal(true)} className="px-4 py-2 bg-[#072F29] text-white rounded-xl text-sm font-bold hover:bg-[#05221e] transition-colors shadow-sm inline-flex items-center gap-2 cursor-pointer border-none">
            <Scale size={16} /> File Claim
          </button>
        </div>
      </div>

      {/* 4 KPIs row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="glass-card rounded-xl p-6 flex flex-col justify-between min-h-[130px]">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-semibold text-[#404946] uppercase tracking-wider">Total Tenants</h3>
            <span className="p-2 rounded-full bg-[#b1efe1]/20 text-[#0b4f45] flex items-center justify-center shrink-0">
              <Users size={20} />
            </span>
          </div>
          <div>
            <span className="text-2xl font-bold text-[#181c1a] leading-none">{activeTenantsCount}</span>
            <p className="text-sm text-[#3a665e] mt-2 flex items-center gap-1 font-medium">
              <TrendingUp size={16} /> +12 this month
            </p>
          </div>
        </div>

        <div className="glass-card rounded-xl p-6 flex flex-col justify-between min-h-[130px]">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-semibold text-[#404946] uppercase tracking-wider">New Leases</h3>
            <span className="p-2 rounded-full bg-[#ffdbcf]/20 text-[#7f2800] flex items-center justify-center shrink-0">
              <FileText size={20} />
            </span>
          </div>
          <div>
            <span className="text-2xl font-bold text-[#181c1a] leading-none">{mockApplications.length}</span>
            <p className="text-sm text-[#404946] mt-2 font-medium">Active Applications</p>
          </div>
        </div>

        <div className="glass-card rounded-xl p-6 flex flex-col justify-between min-h-[130px]">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-semibold text-[#404946] uppercase tracking-wider">Payment Health</h3>
            <span className="p-2 rounded-full bg-[#bae9df]/30 text-[#0b4f45] flex items-center justify-center shrink-0">
              <ShieldCheck size={20} />
            </span>
          </div>
          <div>
            <span className="text-2xl font-bold text-[#181c1a] leading-none">{paymentHealthRate}%</span>
            <p className="text-sm text-[#3a665e] mt-2 flex items-center gap-1 font-medium">
              <CheckCircle2 size={16} /> On-time rate
            </p>
          </div>
        </div>

        <div className="glass-card rounded-xl p-6 flex flex-col justify-between min-h-[130px]">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-semibold text-[#404946] uppercase tracking-wider">Upcoming Move-outs</h3>
            <span className="p-2 rounded-full bg-[#ffdad6]/30 text-[#ba1a1a] flex items-center justify-center shrink-0">
              <LogOut size={20} />
            </span>
          </div>
          <div>
            <span className="text-2xl font-bold text-[#181c1a] leading-none">{actionRequiredCount}</span>
            <p className="text-sm text-[#404946] mt-2 font-medium">Requires Action</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-2xl w-fit mb-6">
        <button
          onClick={() => setActiveTab('directory')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border-none flex items-center gap-2 ${
            activeTab === 'directory' ? 'bg-[#00372f] text-white shadow-xs' : 'bg-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <Users size={15} />
          <span>Active Residents Directory</span>
        </button>
        <button
          onClick={() => setActiveTab('disputes')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border-none flex items-center gap-2 ${
            activeTab === 'disputes' ? 'bg-[#00372f] text-white shadow-xs' : 'bg-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <Scale size={15} className="text-[#C75B30]" />
          <span>Mediation & Dispute Docket</span>
          <span className="bg-[#C75B30] text-white px-2 py-0.5 rounded-full text-[10px] font-black">
            {disputeDocket.filter(d => d.step < 4).length} Active
          </span>
        </button>
      </div>

      {activeTab === 'directory' ? (
        <div className="space-y-6 animate-fade-in">
          {/* Comprehensive Tenant Table */}
          <div className="glass-card rounded-xl overflow-hidden flex flex-col mb-6">
        <div className="p-6 border-b border-[#e0e3e0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-sm font-semibold uppercase text-[#181c1a] tracking-wider">Tenant Directory ({filtered.length})</h3>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 sm:flex-initial">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#404946]" />
              <input
                type="text"
                placeholder="Search tenants..."
                value={searchTerm}
                onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="pl-9 pr-4 py-2 text-sm bg-[#f7faf6] border border-[#bfc9c5] rounded-lg focus:outline-none focus:border-[#00372f] text-[#181c1a] placeholder:text-[#404946] w-full sm:w-64"
              />
            </div>
            <button
              onClick={() => setShowFilterModal(true)}
              className={`px-3.5 py-2 border rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer active:scale-95 ${statusFilter !== 'All' ? 'bg-[#00372f] text-white border-[#00372f]' : 'bg-[#f7faf6] border-[#bfc9c5] text-[#181c1a] hover:bg-[#f1f4f1]'}`}
            >
              <Filter size={15} className={statusFilter !== 'All' ? 'text-white' : 'text-[#404946]'} />
              Filter {statusFilter !== 'All' && `(${statusFilter})`}
            </button>
            <button
              onClick={() => setShowSortModal(true)}
              className="px-3.5 py-2 border border-[#bfc9c5] rounded-lg text-xs font-bold bg-[#f7faf6] hover:bg-[#f1f4f1] flex items-center gap-1.5 text-[#181c1a] shadow-sm transition-all cursor-pointer active:scale-95"
            >
              <ArrowUpDown size={15} className="text-[#404946]" />
              Sort ({sortBy.toUpperCase()})
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left min-w-[650px]">
            <thead>
              <tr className="bg-[#f1f4f1] border-b border-[#e0e3e0]">
                {['Tenant', 'Property / Unit', 'Lease Term', 'Monthly Rent', 'Status', 'Trust Score', 'Actions'].map(h => (
                  <th key={h} className="p-4 text-xs font-semibold uppercase tracking-wider text-[#404946]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e0e3e0]">
              {paginatedRows.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-[#404946] font-medium">
                    No tenants match your current search or filter criteria.
                  </td>
                </tr>
              ) : (
                paginatedRows.map(row => (
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
                    <td className="p-4 font-mono font-bold text-xs" onClick={e => e.stopPropagation()}>
                      <span className={`px-2.5 py-1 rounded-lg border flex items-center gap-1 w-fit ${
                        (row.repScore || 800) >= 800
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}>
                        <span>★ {row.repScore || 800}</span>
                      </span>
                    </td>
                    <td className="p-4 text-right" onClick={e => e.stopPropagation()}>
                      <button
                        onClick={() => setSelectedTenantAction(row)}
                        className="text-[#404946] hover:text-[#181c1a] p-1 rounded-lg hover:bg-[#e0e3e0]/50 transition-colors bg-transparent border-none cursor-pointer"
                      >
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-[#e0e3e0] flex items-center justify-between bg-[#f7faf6]/50">
          <span className="text-xs font-medium text-[#404946]">
            Showing {filtered.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1}–{Math.min(currentPage * rowsPerPage, filtered.length)} of {filtered.length}
          </span>
          <div className="flex gap-2">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="p-1.5 border border-[#bfc9c5] rounded-lg text-[#181c1a] disabled:opacity-40 hover:bg-[#e0e3e0]/50 bg-transparent cursor-pointer active:scale-95 transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="px-3 py-1 text-xs font-bold flex items-center bg-white border border-[#bfc9c5] rounded-lg text-[#00372f]">
              {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="p-1.5 border border-[#bfc9c5] rounded-lg text-[#181c1a] disabled:opacity-40 hover:bg-[#e0e3e0]/50 bg-transparent cursor-pointer active:scale-95 transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Row: Active Applications & Recent Communications side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
        <div className="glass-card rounded-xl p-6 flex flex-col">
          <div className="flex items-center justify-between gap-3 mb-5 pb-4 border-b border-[#e0e3e0]">
            <h3 className="text-sm font-bold uppercase text-[#181c1a] tracking-wider leading-tight">Active Applications</h3>
            <button
              onClick={() => setShowAllAppsModal(true)}
              className="text-xs font-bold text-[#00372f] hover:underline bg-[#b1efe1]/20 hover:bg-[#b1efe1]/40 px-3 py-1.5 rounded-lg border-none cursor-pointer whitespace-nowrap shrink-0 transition-colors"
            >
              View All
            </button>
          </div>
          <div className="flex flex-col gap-3.5">
            {mockApplications.slice(0, 2).map(app => (
              <div key={app.id} className="flex items-center justify-between gap-4 p-3.5 hover:bg-[#f1f4f1]/80 rounded-xl transition-all border border-[#e0e3e0]/50 hover:border-[#bfc9c5] shadow-sm bg-white/60">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-[#00372f] text-white font-bold flex items-center justify-center shrink-0 shadow-sm">
                    {app.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-[#181c1a] truncate leading-tight">{app.name}</h4>
                    <p className="text-xs font-medium text-[#404946] truncate mt-0.5">{app.unit}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="inline-flex items-center px-2.5 py-1 bg-[#bae9df]/30 text-[#0b4f45] rounded-md text-[11px] font-bold whitespace-nowrap">Credit: {app.credit}</span>
                  <span title={`Background Verification ${app.bg}`} className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold whitespace-nowrap cursor-help ${app.bg === 'Clear' ? 'bg-[#bae9df]/30 text-[#0b4f45]' : 'bg-[#e6e9e5] text-[#404946]'}`}>Background: {app.bg}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

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
                <span className="text-sm font-bold text-[#181c1a] truncate">Nneka Okafor (Victoria Island Towers, #4B)</span>
                <span className="text-xs font-medium text-[#404946] shrink-0">2 hours ago</span>
              </div>
              <p className="text-sm text-[#404946] my-1.5 truncate">
                Question regarding the upcoming maintenance schedule for the generator plant...
              </p>
              <button
                onClick={() => setShowReplyModal(true)}
                className="text-xs font-bold text-[#00372f] hover:underline bg-transparent border-none cursor-pointer p-0"
              >
                Reply
              </button>
            </div>
            </div>
          </div>
        </div>
      </div>
      ) : activeTab === 'disputes' ? (
        /* ── MEDIATION & DISPUTE DOCKET VIEW ── */
        <div className="space-y-6 animate-fade-in mb-8">
          
          <div className="bg-[#00372f] text-white p-6 sm:p-8 rounded-2xl shadow-md relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="bg-[#C75B30] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
                <Scale size={14} /> Multi-Door Arbitration Docket
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white m-0">
                Active Tenant Disputes & Mediation Cases
              </h2>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed m-0">
                All formal claims docketed by tenants are adjudicated by independent court-accredited arbitrators. Submit counter-evidence within 7 business days to release escrow funds.
              </p>
              <button
                type="button"
                onClick={() => setShowNewClaimModal(true)}
                className="mt-3 px-4 py-2 bg-[#C75B30] hover:bg-[#b04a25] text-white rounded-xl text-xs font-bold border-none cursor-pointer shadow-sm transition-all flex items-center gap-2"
              >
                <FileCheck size={14} />
                <span>File New Landlord Claim / Deduction Notice</span>
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 text-center min-w-[220px]">
              <span className="text-xs text-white/70 font-bold uppercase tracking-wider block mb-1">Contested Escrow Pool</span>
              <div className="text-3xl font-mono font-black text-[#F4C395]">
                ₦250,000
              </div>
              <span className="text-xs font-bold text-amber-300 mt-1 block">
                {disputeDocket.filter(d => d.step < 4).length} Pending Resolution
              </span>
            </div>
          </div>

          <div className="space-y-6">
            {disputeDocket.map((d) => (
              <div key={d.id} className="glass-card rounded-2xl p-6 border border-gray-200/80 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-gray-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black text-[#C75B30] uppercase tracking-wider">{d.id}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-xs font-bold text-gray-500">{d.category}</span>
                    </div>
                    <h4 className="text-lg font-display font-bold text-[#00372f] m-0 mt-1">Tenant Claim: {d.tenantName}</h4>
                    <p className="text-xs text-[#404946] m-0 mt-1">Property Unit: <strong className="text-gray-800">{d.propertyUnit}</strong> • Docketed: {d.filedDate}</p>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <span className="text-[11px] font-bold text-gray-400 uppercase block">Contested Value</span>
                    <span className="text-xl font-mono font-black text-gray-900 block">{d.amountContested}</span>
                    <span className="inline-block mt-1 px-3 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900">
                      {d.status}
                    </span>
                  </div>
                </div>

                {/* 4-Step Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-[11px] font-bold text-gray-600">
                    <span className={d.step >= 1 ? 'text-[#00372f]' : ''}>1. Tenant Filed</span>
                    <span className={d.step >= 2 ? 'text-[#00372f]' : ''}>2. Landlord Evidence</span>
                    <span className={d.step >= 3 ? 'text-[#00372f]' : ''}>3. Tribunal Review</span>
                    <span className={d.step >= 4 ? 'text-emerald-600' : ''}>4. Binding Verdict</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((sIdx) => (
                      <div
                        key={sIdx}
                        className={`h-2.5 rounded-full transition-all ${
                          d.step >= sIdx ? 'bg-[#00372f]' : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/80 space-y-3">
                  <p className="text-xs text-[#404946] m-0 leading-relaxed">
                    <strong className="text-[#00372f]">Tenant Allegation:</strong> {d.claimSummary}
                  </p>
                  {d.landlordResponse ? (
                    <div className="space-y-2 bg-teal-50/80 p-3 rounded-xl border border-teal-200">
                      <p className="text-xs text-[#00372f] m-0 font-medium leading-relaxed">
                        <strong className="font-bold">Your Submitted Defense:</strong> {d.landlordResponse}
                      </p>
                      {d.attachedFiles && d.attachedFiles.length > 0 && (
                        <div className="pt-2 border-t border-teal-200/60 flex flex-wrap gap-2">
                          {d.attachedFiles.map((fname, i) => (
                            <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white text-[#00372f] text-[11px] font-bold border border-teal-300 shadow-2xs">
                              <FileText size={12} className="text-[#C75B30]" />
                              <span>{fname}</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                      <span className="text-xs font-bold text-amber-800 flex items-center gap-1">
                        <AlertCircle size={14} /> Counter-evidence required within 7 days
                      </span>
                      <button
                        type="button"
                        onClick={() => handleOpenCounterModal(d)}
                        className="px-4 py-2 rounded-xl bg-[#00372f] hover:bg-[#002822] text-white text-xs font-bold border-none cursor-pointer shadow-sm transition-all"
                      >
                        Submit Defense & Evidence
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      ) : null}
      {typeof document !== 'undefined' && createPortal(
        <>
          {/* MODAL 1: Filter Options */}
          {showFilterModal && (
            <div className="fixed inset-0 bg-black/50 z-[99999] flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
              <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
                  <h3 className="text-lg font-bold text-gray-900 m-0">Filter Tenant Directory</h3>
                  <button onClick={() => setShowFilterModal(false)} className="text-gray-400 hover:text-gray-700 bg-transparent border-none cursor-pointer p-1">
                    <X size={20} />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Payment Status</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['All', 'On Time', 'Late', 'Grace Period'].map(status => (
                        <button
                          key={status}
                          onClick={() => { setStatusFilter(status); setCurrentPage(1); }}
                          className={`py-2.5 px-3 rounded-xl text-xs font-bold border cursor-pointer transition-all ${statusFilter === status ? 'bg-[#00372f] text-white border-[#00372f] shadow-sm' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'}`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end gap-2">
                  <button
                    onClick={() => { setStatusFilter('All'); setCurrentPage(1); setShowFilterModal(false); toast.info('Filters reset.'); }}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 border-none bg-transparent cursor-pointer"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => { setShowFilterModal(false); toast.success(`Filter applied: ${statusFilter}`); }}
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-[#00372f] text-white hover:bg-[#002822] border-none cursor-pointer shadow-sm"
                  >
                    Apply Filter
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* MODAL 2: Sort Options */}
          {showSortModal && (
            <div className="fixed inset-0 bg-black/50 z-[99999] flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
              <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
                  <h3 className="text-lg font-bold text-gray-900 m-0">Sort Directory</h3>
                  <button onClick={() => setShowSortModal(false)} className="text-gray-400 hover:text-gray-700 bg-transparent border-none cursor-pointer p-1">
                    <X size={20} />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Sort By</label>
                    <div className="flex flex-col gap-2">
                      {[
                        { key: 'name', label: 'Tenant Name (Alphabetical)' },
                        { key: 'rent', label: 'Monthly Rent Amount' },
                        { key: 'status', label: 'Payment Status' }
                      ].map(item => (
                        <button
                          key={item.key}
                          onClick={() => setSortBy(item.key)}
                          className={`flex items-center justify-between p-3 rounded-xl text-xs font-bold border cursor-pointer transition-all ${sortBy === item.key ? 'bg-teal-50 border-teal-500 text-teal-900' : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'}`}
                        >
                          <span>{item.label}</span>
                          {sortBy === item.key && <Check size={16} className="text-teal-600" />}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Order</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setSortOrder('asc')}
                        className={`py-2 rounded-xl text-xs font-bold border cursor-pointer ${sortOrder === 'asc' ? 'bg-[#00372f] text-white border-[#00372f]' : 'bg-gray-50 text-gray-700 border-gray-200'}`}
                      >
                        Ascending (A-Z / Low-High)
                      </button>
                      <button
                        onClick={() => setSortOrder('desc')}
                        className={`py-2 rounded-xl text-xs font-bold border cursor-pointer ${sortOrder === 'desc' ? 'bg-[#00372f] text-white border-[#00372f]' : 'bg-gray-50 text-gray-700 border-gray-200'}`}
                      >
                        Descending (Z-A / High-Low)
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                  <button
                    onClick={() => { setShowSortModal(false); toast.success(`Directory sorted by ${sortBy} (${sortOrder})`); }}
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-[#00372f] text-white hover:bg-[#002822] border-none cursor-pointer shadow-sm"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* MODAL 3: View All Active Applications */}
          {showAllAppsModal && (
            <div className="fixed inset-0 bg-black/50 z-[99999] flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
              <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-gray-100 max-h-[80vh] flex flex-col">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4 shrink-0">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 m-0">All Active Applications</h3>
                    <p className="text-xs text-gray-500 m-0 mt-0.5">Reviewing prospective tenants undergoing screening</p>
                  </div>
                  <button onClick={() => setShowAllAppsModal(false)} className="text-gray-400 hover:text-gray-700 bg-transparent border-none cursor-pointer p-1">
                    <X size={20} />
                  </button>
                </div>
                <div className="overflow-y-auto space-y-3 pr-1 flex-1">
                  {mockApplications.map(app => (
                    <div key={app.id} className="flex items-center justify-between gap-4 p-3.5 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all border border-gray-200/60">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-10 h-10 rounded-full bg-[#00372f] text-white font-bold flex items-center justify-center shrink-0 shadow-sm">
                          {app.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-[#181c1a] truncate leading-tight">{app.name}</h4>
                          <p className="text-xs font-medium text-[#404946] truncate mt-0.5">{app.unit}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="inline-flex items-center px-2.5 py-1 bg-[#bae9df]/30 text-[#0b4f45] rounded-md text-[11px] font-bold">Credit: {app.credit}</span>
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold ${app.bg === 'Clear' ? 'bg-[#bae9df]/30 text-[#0b4f45]' : 'bg-[#e6e9e5] text-[#404946]'}`}>Background: {app.bg}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end shrink-0">
                  <button onClick={() => setShowAllAppsModal(false)} className="px-5 py-2 rounded-xl text-xs font-bold bg-[#00372f] text-white hover:bg-[#002822] border-none cursor-pointer">
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* MODAL 4: Reply Message */}
          {showReplyModal && (
            <div className="fixed inset-0 bg-black/50 z-[99999] flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
              <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 m-0">Reply to Nneka Okafor</h3>
                    <p className="text-xs text-gray-500 m-0 mt-0.5">Victoria Island Towers, #4B</p>
                  </div>
                  <button onClick={() => setShowReplyModal(false)} className="text-gray-400 hover:text-gray-700 bg-transparent border-none cursor-pointer p-1">
                    <X size={20} />
                  </button>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 mb-4 text-xs text-gray-600 italic">
                  "Question regarding the upcoming maintenance schedule for the generator plant..."
                </div>
                <textarea
                  rows="4"
                  value={replyMessage}
                  onChange={e => setReplyMessage(e.target.value)}
                  placeholder="Type your response here..."
                  className="w-full p-3 text-sm bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#00372f] resize-none text-gray-900 placeholder:text-gray-400 mb-4"
                />
                <div className="flex justify-end gap-2">
                  <button onClick={() => setShowReplyModal(false)} className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 border-none bg-transparent cursor-pointer">
                    Cancel
                  </button>
                  <button onClick={handleSendReply} className="px-5 py-2 rounded-xl text-xs font-bold bg-[#00372f] text-white hover:bg-[#002822] border-none cursor-pointer flex items-center gap-2 shadow-sm">
                    <Send size={14} /> Send Message
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tenant Quick Actions Modal */}
          {selectedTenantAction && (
            <div className="fixed inset-0 bg-black/60 z-[99999] flex items-center justify-center p-4 backdrop-blur-xs animate-fadeIn">
              <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-gray-100 flex flex-col">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
                  <div className="flex items-center gap-3">
                    {selectedTenantAction.isInitials ? (
                      <div className="w-10 h-10 rounded-full bg-[#7f2800] text-white text-sm font-bold flex items-center justify-center shrink-0">
                        {selectedTenantAction.avatar}
                      </div>
                    ) : (
                      <img src={selectedTenantAction.avatar} alt={selectedTenantAction.name} className="w-10 h-10 rounded-full object-cover shrink-0 border border-gray-200" />
                    )}
                    <div>
                      <h3 className="text-base font-bold text-gray-900 m-0 leading-snug">{selectedTenantAction.name}</h3>
                      <p className="text-xs text-gray-500 m-0 mt-0.5">{selectedTenantAction.propertyUnit}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedTenantAction(null)} className="text-gray-400 hover:text-gray-700 bg-transparent border-none cursor-pointer p-1">
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => {
                      const id = selectedTenantAction.id;
                      setSelectedTenantAction(null);
                      navigate(`/landlord/tenants/${id}`);
                    }}
                    className="w-full p-3 rounded-xl bg-gray-50 hover:bg-[#00372f] text-gray-800 hover:text-white font-bold text-xs transition-all flex items-center gap-3 border border-gray-200/80 hover:border-[#00372f] cursor-pointer"
                  >
                    <Eye size={16} /> View Full Profile & History
                  </button>

                  <button
                    onClick={() => {
                      toast.success(`Payment reminder sent to ${selectedTenantAction.name} via SMS & Email.`);
                      setSelectedTenantAction(null);
                    }}
                    className="w-full p-3 rounded-xl bg-gray-50 hover:bg-[#00372f] text-gray-800 hover:text-white font-bold text-xs transition-all flex items-center gap-3 border border-gray-200/80 hover:border-[#00372f] cursor-pointer"
                  >
                    <Bell size={16} /> Send Payment Reminder
                  </button>

                  <button
                    onClick={() => {
                      setSelectedTenantAction(null);
                      navigate('/landlord/maintenance');
                    }}
                    className="w-full p-3 rounded-xl bg-gray-50 hover:bg-[#00372f] text-gray-800 hover:text-white font-bold text-xs transition-all flex items-center gap-3 border border-gray-200/80 hover:border-[#00372f] cursor-pointer"
                  >
                    <Wrench size={16} /> Log Maintenance Request
                  </button>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 flex justify-end">
                  <button
                    onClick={() => setSelectedTenantAction(null)}
                    className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs transition-colors cursor-pointer border-none"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* MODAL 6: Submit Counter Evidence */}
          {showCounterModal && (
            <div className="fixed inset-0 bg-black/50 z-[99999] flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
              <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
                  <h3 className="text-lg font-bold text-gray-900 m-0">Submit Arbitration Response</h3>
                  <button onClick={() => setShowCounterModal(false)} className="text-gray-400 hover:text-gray-700 bg-transparent border-none cursor-pointer p-1">
                    <X size={20} />
                  </button>
                </div>
                <form onSubmit={handleSubmitCounter} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Defense & Facts Chronology</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="State exact timeline, move-in log evidence, or repair receipts proving validity of charges..."
                      value={counterForm.responseText}
                      onChange={e => setCounterForm({ ...counterForm, responseText: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:border-[#00372f] resize-none"
                    />
                  </div>
                  <div 
                    onClick={handleAttachSimulatedFile}
                    className="p-3.5 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 text-center cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <UploadCloud size={20} className="mx-auto text-gray-400 mb-1" />
                    <span className="text-xs font-bold text-[#00372f] block">Click to Attach Supporting Evidence (Move-in Photos, Contractor Bills)</span>
                    <span className="text-[10px] text-gray-400">Supported: PDF, JPG, PNG up to 15MB</span>
                    {counterForm.files && counterForm.files.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-gray-200 flex flex-wrap gap-1.5 justify-center">
                        {counterForm.files.map((f, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-white text-[#00372f] text-[10px] font-bold rounded border border-gray-300 shadow-2xs">
                            ✓ {f}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowCounterModal(false)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 bg-transparent border-none cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl text-xs font-bold bg-[#00372f] text-white hover:bg-[#002822] border-none cursor-pointer shadow-sm"
                    >
                      Submit Counter-Evidence ({counterForm.files.length} files)
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* MODAL 7: File New Landlord Claim / Deduction Notice */}
          {showNewClaimModal && (
            <div className="fixed inset-0 bg-black/50 z-[99999] flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
              <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
                  <h3 className="text-lg font-bold text-gray-900 m-0">File Formal Landlord Claim</h3>
                  <button onClick={() => setShowNewClaimModal(false)} className="text-gray-400 hover:text-gray-700 bg-transparent border-none cursor-pointer p-1">
                    <X size={20} />
                  </button>
                </div>
                <form onSubmit={handleCreateNewClaim} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">Resident Tenant</label>
                      <select
                        value={newClaimForm.tenantName}
                        onChange={e => setNewClaimForm({ ...newClaimForm, tenantName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 bg-white"
                      >
                        <option value="Simisola Alabi">Simisola Alabi</option>
                        <option value="Musa Rano">Musa Rano</option>
                        <option value="Dapo Solarin">Dapo Solarin</option>
                        <option value="Tunde Bakare">Tunde Bakare</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">Property & Unit</label>
                      <input
                        type="text"
                        value={newClaimForm.propertyUnit}
                        onChange={e => setNewClaimForm({ ...newClaimForm, propertyUnit: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium text-gray-800"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">Claim Category</label>
                      <select
                        value={newClaimForm.category}
                        onChange={e => setNewClaimForm({ ...newClaimForm, category: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 bg-white"
                      >
                        <option value="Property Damage & Fixture Repair Claim">Property Damage & Fixture Repair</option>
                        <option value="Unpaid Utility Offset Deduction">Unpaid Utility Offset Deduction</option>
                        <option value="Unauthorized Alteration / Lease Breach">Unauthorized Alteration / Lease Breach</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">Claim Amount (₦)</label>
                      <input
                        type="text"
                        value={newClaimForm.amount}
                        onChange={e => setNewClaimForm({ ...newClaimForm, amount: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-black text-gray-900"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Detailed Claim Summary & Legal Basis</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Explain the damage or breach justifying formal deduction notice..."
                      value={newClaimForm.summary}
                      onChange={e => setNewClaimForm({ ...newClaimForm, summary: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 resize-none"
                    />
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowNewClaimModal(false)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 bg-transparent border-none cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl text-xs font-bold bg-[#C75B30] text-white hover:bg-[#b04a25] border-none cursor-pointer shadow-sm"
                    >
                      Docket Landlord Claim
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>,
        document.body
      )}
    </div>
  );
};

export default Tenants;

