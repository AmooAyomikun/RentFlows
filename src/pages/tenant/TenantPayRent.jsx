import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Modal from '../../components/ui/Modal';
import { formatCurrency } from '../../utils/formatCurrency';

const partnersData = {
  kwara: {
    name: 'Kwara Cooperative Credit',
    feePct: 1.5,
    tag: 'Recommended • Instant Approval',
    desc: 'Low interest cooperative financing. Builds your credit score with NIBSS.',
  },
  carbon: {
    name: 'Carbon Digital Split',
    feePct: 2.5,
    tag: 'Automated Direct Debit',
    desc: 'Seamless digital split with flexible monthly auto-deductions.',
  },
  renmoney: {
    name: 'Renmoney Housing Financing',
    feePct: 2.0,
    tag: 'Structured Tenor',
    desc: 'Dedicated residential loan structure with 24/7 support.',
  },
  direct: {
    name: 'Direct Landlord Agreement',
    feePct: 0.0,
    tag: '0% Interest • Landlord Review Required',
    desc: 'Direct split agreement with Chief Emeka Okafor. Subject to landlord approval.',
  },
};

const TenantPayRent = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pay'); // 'pay' | 'active_plan'
  const [paymentMode, setPaymentMode] = useState('full'); // 'full' | 'instalment'
  const [scheduleType, setScheduleType] = useState('now'); // 'now' | 'later'
  const [paymentMethod, setPaymentMethod] = useState('bank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Instalment setup state
  const [trancheCount, setTrancheCount] = useState(3);
  const [partnerKey, setPartnerKey] = useState('kwara');
  const [trancheDates, setTrancheDates] = useState([
    '2026-07-01',
    '2026-08-01',
    '2026-09-01',
    '2026-10-01',
  ]);
  const [isSubmittingPlan, setIsSubmittingPlan] = useState(false);

  // Active Plan management state
  const [activePlan, setActivePlan] = useState({
    id: 'PLAN-88219',
    property: 'Victoria Island Towers, Suite 402, Lagos',
    totalRent: 3250000,
    partner: 'Kwara Cooperative Credit',
    feeRate: '1.5%',
    totalPayable: 3298750,
    amountPaid: 1099583,
    tranches: [
      { id: 'tr-1', name: 'Tranche 1 (Upfront)', amount: 1099583, dueDate: 'Jul 01, 2026', status: 'Paid', paidDate: 'Jul 01, 2026' },
      { id: 'tr-2', name: 'Tranche 2 (Mid-Tenancy)', amount: 1099583, dueDate: 'Aug 01, 2026', status: 'Due Now' },
      { id: 'tr-3', name: 'Tranche 3 (Final Settlement)', amount: 1099584, dueDate: 'Sep 01, 2026', status: 'Upcoming' },
    ],
  });
  const [payingTrancheId, setPayingTrancheId] = useState(null);

  // Modal & Add Method state
  const [savedMethods, setSavedMethods] = useState([
    { id: 'bank', title: 'Bank Account', subtitle: 'Ending in 4928 • GTBank Savings', icon: 'account_balance' },
    { id: 'card', title: 'Debit Card', subtitle: 'Ending in 1022 • Mastercard Exp 12/26', icon: 'credit_card' },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMethodType, setNewMethodType] = useState('bank');
  const [newBankName, setNewBankName] = useState('Zenith Bank');
  const [newAccNum, setNewAccNum] = useState('');
  const [formError, setFormError] = useState('');

  const baseRentTotal = 3250000;
  const currentPartner = partnersData[partnerKey];
  const feeAmount = Math.round((baseRentTotal * currentPartner.feePct) / 100);
  const totalInstalmentPayable = baseRentTotal + feeAmount;
  const amountPerTranche = Math.round(totalInstalmentPayable / trancheCount);

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      toast.success('Full rent payment authorized successfully!');
    }, 1500);
  };

  const handleSubmitInstalmentPlan = () => {
    setIsSubmittingPlan(true);
    setTimeout(() => {
      setIsSubmittingPlan(false);
      // Create new active plan
      const newTranches = Array.from({ length: trancheCount }).map((_, idx) => ({
        id: `tr-new-${idx + 1}`,
        name: `Tranche ${idx + 1} (${idx === 0 ? 'Upfront' : idx === trancheCount - 1 ? 'Final Settlement' : 'Instalment'})`,
        amount: idx === trancheCount - 1 ? totalInstalmentPayable - amountPerTranche * (trancheCount - 1) : amountPerTranche,
        dueDate: trancheDates[idx] || `2026-0${idx + 7}-01`,
        status: idx === 0 ? 'Due Now' : 'Upcoming',
      }));

      setActivePlan({
        id: `PLAN-${Math.floor(10000 + Math.random() * 90000)}`,
        property: 'Victoria Island Towers, Suite 402, Lagos',
        totalRent: baseRentTotal,
        partner: currentPartner.name,
        feeRate: `${currentPartner.feePct}%`,
        totalPayable: totalInstalmentPayable,
        amountPaid: 0,
        tranches: newTranches,
      });

      toast.success(`Instalment schedule created via ${currentPartner.name}!`);
      setActiveTab('active_plan');
    }, 1200);
  };

  const handlePayTranche = (trancheId) => {
    setPayingTrancheId(trancheId);
    setTimeout(() => {
      setActivePlan((prev) => {
        const target = prev.tranches.find((t) => t.id === trancheId);
        const addAmount = target ? target.amount : 0;
        const updatedTranches = prev.tranches.map((t, idx) => {
          if (t.id === trancheId) {
            return { ...t, status: 'Paid', paidDate: 'Today' };
          }
          return t;
        });
        // Find next non-paid tranche and set to Due Now
        const nextIdx = updatedTranches.findIndex((t) => t.status !== 'Paid');
        if (nextIdx !== -1 && updatedTranches[nextIdx].status === 'Upcoming') {
          updatedTranches[nextIdx].status = 'Due Now';
        }

        return {
          ...prev,
          amountPaid: prev.amountPaid + addAmount,
          tranches: updatedTranches,
        };
      });
      setPayingTrancheId(null);
      toast.success('Tranche payment confirmed and digital receipt generated!');
    }, 1000);
  };

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto mt-16 text-center bg-white rounded-xl p-6 border border-gray-200 card-shadow">
        <div className="w-16 h-16 bg-primary-container/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-3xl">check_circle</span>
        </div>
        <h1 className="text-2xl font-bold text-[#0B4F45] m-0 mb-2">Payment Authorized</h1>
        <p className="text-sm text-[#4A4F4C] mb-6 leading-relaxed m-0">
          Your payment of <span className="font-mono font-bold text-[#0B4F45]">₦3,250,000</span> has been successfully processed. A receipt has been dispatched to your email.
        </p>
        <div className="bg-surface rounded-lg p-4 mb-6 text-left space-y-2 text-xs border border-outline-variant/60">
          <div className="flex justify-between"><span className="text-on-surface-variant">Transaction Ref:</span><span className="font-mono font-bold text-on-surface">RF-PAY-{Date.now().toString().slice(-6)}</span></div>
          <div className="flex justify-between"><span className="text-on-surface-variant">Date & Time:</span><span className="font-medium text-on-surface">{new Date().toLocaleString()}</span></div>
          <div className="flex justify-between"><span className="text-on-surface-variant">Payment Source:</span><span className="font-bold text-on-surface uppercase">{paymentMethod === 'bank' ? 'Bank Account (**4928)' : 'Credit Card (**1022)'}</span></div>
          <div className="flex justify-between"><span className="text-on-surface-variant">Status:</span><span className="text-[#0B4F45] font-bold">SETTLED</span></div>
        </div>
        <button
          onClick={() => navigate('/tenant/payments')}
          className="w-full py-3 px-6 rounded-lg bg-[#0B4F45] hover:opacity-90 text-white font-semibold text-sm transition-all shadow-sm cursor-pointer border-none"
        >
          View Payment History
        </button>
      </div>
    );
  }

  const progressPercentage = Math.min(100, Math.round((activePlan.amountPaid / activePlan.totalPayable) * 100));

  return (
    <div className="space-y-6 relative font-sans text-[#4A4F4C] pb-16">
      
      {/* Top Header & Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-display font-extrabold text-[#0B4F45] m-0 tracking-tight">
            Rent Payment Hub
          </h1>
          <p className="text-xs sm:text-sm text-[#4A4F4C] font-medium mt-1 m-0">
            Pay rent in full upfront or structure flexible instalment tranches with certified financing partners.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-2xl shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('pay')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border-none flex items-center gap-2 ${
              activeTab === 'pay'
                ? 'bg-[#0B4F45] text-white shadow-xs'
                : 'bg-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <span>💳 Pay / New Plan</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('active_plan')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border-none flex items-center gap-2 ${
              activeTab === 'active_plan'
                ? 'bg-[#0B4F45] text-white shadow-xs'
                : 'bg-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#C75B30] inline-block animate-pulse"></span>
            <span>Active Instalment Plan</span>
          </button>
        </div>
      </div>

      {activeTab === 'active_plan' ? (
        /* ── INSTALMENT MANAGEMENT VIEW ── */
        <div className="space-y-6 animate-fade-in">
          
          {/* Progress Overview Banner */}
          <div className="dashboard-card bg-[#0B4F45] text-white p-6 sm:p-8 rounded-2xl shadow-md relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2">
                <span className="bg-white/10 text-white border border-white/20 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
                  {activePlan.partner} ({activePlan.feeRate} fee)
                </span>
                <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white m-0">
                  {activePlan.id} • Split Rent Schedule
                </h2>
                <p className="text-xs sm:text-sm text-white/80 m-0">
                  {activePlan.property}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 min-w-[260px]">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-xs text-white/70 font-bold uppercase tracking-wider">Amount Cleared</span>
                  <span className="text-lg font-mono font-extrabold text-[#F4C395]">{progressPercentage}%</span>
                </div>
                <div className="text-xl sm:text-2xl font-mono font-black text-white">
                  {formatCurrency(activePlan.amountPaid)} <span className="text-xs font-sans text-white/60">/ {formatCurrency(activePlan.totalPayable)}</span>
                </div>
                {/* Visual Progress Bar */}
                <div className="w-full bg-black/30 h-3 rounded-full mt-3 overflow-hidden p-0.5 border border-white/10">
                  <div
                    className="bg-gradient-to-r from-[#C75B30] to-[#F4C395] h-full rounded-full transition-all duration-700"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Tranche Cards List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="dashboard-title text-base sm:text-lg font-bold text-[#0B4F45] m-0">
                Instalment Tranche Schedule
              </h3>
              <span className="text-xs font-bold text-[#4A4F4C]">
                {activePlan.tranches.filter((t) => t.status === 'Paid').length} of {activePlan.tranches.length} Tranches Paid
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {activePlan.tranches.map((tranche, idx) => (
                <div
                  key={tranche.id}
                  className={`dashboard-card rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                    tranche.status === 'Paid'
                      ? 'bg-emerald-50/40 border-emerald-200'
                      : tranche.status === 'Due Now'
                      ? 'bg-amber-50/50 border-[#C75B30] shadow-sm ring-2 ring-[#C75B30]/20'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-black text-gray-500 uppercase tracking-wider font-mono">
                        Tranche {idx + 1}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider ${
                          tranche.status === 'Paid'
                            ? 'bg-emerald-100 text-emerald-800'
                            : tranche.status === 'Due Now'
                            ? 'bg-[#C75B30] text-white animate-pulse shadow-2xs'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {tranche.status}
                      </span>
                    </div>

                    <h4 className="dashboard-card-title text-base font-bold text-[#0B4F45] m-0 mb-1">
                      {tranche.name}
                    </h4>
                    <p className="dashboard-body-text text-xs text-[#4A4F4C] m-0 mb-4">
                      Due Date: <strong className="text-gray-900">{tranche.dueDate}</strong>
                    </p>

                    <div className="bg-white/80 p-3.5 rounded-xl border border-gray-200/80 mb-4">
                      <span className="text-[10px] uppercase font-bold text-gray-500 block">Tranche Amount</span>
                      <span className="text-xl font-mono font-extrabold text-[#0B4F45]">
                        {formatCurrency(tranche.amount)}
                      </span>
                    </div>
                  </div>

                  <div>
                    {tranche.status === 'Paid' ? (
                      <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-100/60 text-emerald-900 text-xs font-bold">
                        <span>Paid on {tranche.paidDate}</span>
                        <span className="material-symbols-outlined text-emerald-700">verified</span>
                      </div>
                    ) : tranche.status === 'Due Now' ? (
                      <button
                        type="button"
                        onClick={() => handlePayTranche(tranche.id)}
                        disabled={payingTrancheId === tranche.id}
                        className="w-full py-3.5 rounded-xl bg-[#C75B30] hover:bg-[#b04a25] text-white font-bold text-xs sm:text-sm border-none cursor-pointer shadow-md transition-all flex items-center justify-center gap-2"
                      >
                        {payingTrancheId === tranche.id ? (
                          <span>Processing NIBSS Transfer...</span>
                        ) : (
                          <>
                            <span>Pay Tranche Now</span>
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="w-full py-3 rounded-xl bg-gray-100 text-gray-400 font-bold text-xs border border-gray-200 cursor-not-allowed"
                      >
                        Scheduled Future Payment
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ── NEW PAYMENT / PLAN SETUP VIEW ── */
        <div className="space-y-6 animate-fade-in">
          
          {/* Payment Mode Choice Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setPaymentMode('full')}
              className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-4 ${
                paymentMode === 'full'
                  ? 'bg-white border-[#0B4F45] ring-2 ring-[#0B4F45]/20 shadow-sm'
                  : 'bg-[#FAF7F2] border-gray-200/80 hover:bg-white'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${paymentMode === 'full' ? 'bg-[#0B4F45] text-white' : 'bg-gray-200 text-gray-700'}`}>
                <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#0B4F45] m-0">Full One-Time Payment</h3>
                  {paymentMode === 'full' && <span className="w-2.5 h-2.5 rounded-full bg-[#0B4F45]"></span>}
                </div>
                <p className="text-xs text-[#4A4F4C] m-0 mt-1 leading-relaxed">
                  Clear your entire annual rent of <strong className="text-gray-900">₦3,250,000</strong> in a single transaction via Bank Transfer or Card.
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMode('instalment')}
              className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-4 ${
                paymentMode === 'instalment'
                  ? 'bg-white border-[#C75B30] ring-2 ring-[#C75B30]/20 shadow-sm'
                  : 'bg-[#FAF7F2] border-gray-200/80 hover:bg-white'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${paymentMode === 'instalment' ? 'bg-[#C75B30] text-white' : 'bg-gray-200 text-gray-700'}`}>
                <span className="material-symbols-outlined text-2xl">splitscreen</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#C75B30] m-0">Instalment / Split Payment Plan</h3>
                  {paymentMode === 'instalment' && <span className="w-2.5 h-2.5 rounded-full bg-[#C75B30]"></span>}
                </div>
                <p className="text-xs text-[#4A4F4C] m-0 mt-1 leading-relaxed">
                  Split your rent into <strong className="text-gray-900">2, 3, or 4 tranches</strong> partnered with Kwara, Carbon, Renmoney, or Direct Agreement.
                </p>
              </div>
            </button>
          </div>

          {paymentMode === 'full' ? (
            /* ── FULL PAYMENT WORKFLOW (Existing Bento Layout) ── */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Summary & Schedule */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <section className="dashboard-card bg-white rounded-2xl border border-gray-200 p-6 card-shadow">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="dashboard-title text-sm font-semibold uppercase text-[#0B4F45] m-0">Annual Rent Summary</h2>
                      <p className="dashboard-body-text text-sm text-[#4A4F4C] mt-1 m-0">Victoria Island Towers, Suite 402, Lagos, Nigeria</p>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold">Active Lease</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-base text-[#4A4F4C]">Base Rent</span>
                      <span className="font-mono text-[#0B4F45] font-semibold">₦3,000,000</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-base text-[#4A4F4C]">Utilities (Fixed Annual)</span>
                      <span className="font-mono text-[#0B4F45] font-semibold">₦200,000</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-base text-[#4A4F4C]">Parking Space #42</span>
                      <span className="font-mono text-[#0B4F45] font-semibold">₦50,000</span>
                    </div>
                    <div className="flex justify-between items-center pt-4">
                      <span className="text-lg font-bold text-gray-900">Total Rent Due</span>
                      <span className="text-2xl font-bold text-[#0B4F45] font-mono">₦3,250,000</span>
                    </div>
                  </div>
                </section>

                <section className="dashboard-card bg-white rounded-2xl border border-gray-200 p-6 card-shadow">
                  <h2 className="dashboard-title text-sm font-semibold uppercase text-[#0B4F45] mb-4 m-0">Schedule Payment</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setScheduleType('now')}
                      className={`relative flex flex-col items-start p-4 rounded-xl transition-all text-left cursor-pointer ${
                        scheduleType === 'now'
                          ? 'border-2 border-[#0B4F45] bg-teal-50/40'
                          : 'border border-gray-200 hover:border-[#0B4F45]'
                      }`}
                    >
                      <span className={`material-symbols-outlined mb-2 ${scheduleType === 'now' ? 'text-[#0B4F45]' : 'text-gray-400'}`}>bolt</span>
                      <span className="font-bold text-[#0B4F45] text-sm">Pay Now</span>
                      <span className="text-xs text-[#4A4F4C] mt-1">Process immediately via NIBSS</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setScheduleType('later')}
                      className={`relative flex flex-col items-start p-4 rounded-xl transition-all text-left cursor-pointer ${
                        scheduleType === 'later'
                          ? 'border-2 border-[#0B4F45] bg-teal-50/40'
                          : 'border border-gray-200 hover:border-[#0B4F45]'
                      }`}
                    >
                      <span className={`material-symbols-outlined mb-2 ${scheduleType === 'later' ? 'text-[#0B4F45]' : 'text-gray-400'}`}>calendar_today</span>
                      <span className="font-bold text-[#0B4F45] text-sm">Schedule for later</span>
                      <span className="text-xs text-[#4A4F4C] mt-1">Choose a future date</span>
                    </button>
                  </div>
                </section>
              </div>

              {/* Right Column: Methods & Action */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <section className="dashboard-card bg-white rounded-2xl border border-gray-200 p-6 card-shadow flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="dashboard-title text-sm font-semibold uppercase text-[#0B4F45] m-0">Payment Method</h2>
                      <button type="button" onClick={() => setShowAddModal(true)} className="text-[#C75B30] text-xs font-bold hover:underline cursor-pointer border-none bg-transparent">Add New</button>
                    </div>
                    <div className="space-y-3">
                      {savedMethods.map((method) => (
                        <label
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${
                            paymentMethod === method.id
                              ? 'border-[#0B4F45] bg-teal-50/40 font-bold'
                              : 'border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment_method"
                            checked={paymentMethod === method.id}
                            onChange={() => setPaymentMethod(method.id)}
                            className="w-5 h-5 text-[#0B4F45]"
                          />
                          <div className="flex-1">
                            <p className="font-bold text-gray-900 m-0 text-sm">{method.title}</p>
                            <p className="text-xs text-[#4A4F4C] m-0 mt-0.5">{method.subtitle}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8">
                    <button
                      type="button"
                      onClick={handlePay}
                      disabled={isProcessing}
                      className="w-full bg-[#C75B30] hover:bg-[#b04a25] disabled:opacity-75 text-white py-4 rounded-xl font-bold text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border-none"
                    >
                      <span>{isProcessing ? 'Processing Payment...' : 'Confirm and Pay ₦3,250,000'}</span>
                    </button>
                  </div>
                </section>
              </div>
            </div>
          ) : (
            /* ── INSTALMENT / SPLIT PAYMENT SETUP FLOW ── */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
              {/* Left Column: Interactive Flow Steps */}
              <div className="lg:col-span-7 space-y-6">
                {/* Step 1: Number of Instalments */}
                <div className="dashboard-card bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="dashboard-title text-base font-bold text-[#0B4F45] m-0 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-teal-100 text-[#0B4F45] text-xs font-black flex items-center justify-center">1</span>
                      Select Number of Instalments
                    </h2>
                    <span className="text-xs text-[#4A4F4C] font-semibold">Tranche Schedule</span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[2, 3, 4].map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => {
                          setTrancheCount(count);
                          toast.info(`Updated schedule to ${count} payment tranches.`);
                        }}
                        className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                          trancheCount === count
                            ? 'bg-[#0B4F45] text-white border-[#0B4F45] shadow-xs font-bold'
                            : 'bg-gray-50 border-gray-200 text-gray-800 hover:bg-gray-100'
                        }`}
                      >
                        <span className="text-xl font-display font-extrabold block">{count} Tranches</span>
                        <span className="text-[11px] opacity-80 block mt-1">
                          {count === 2 ? '50% / 50% split' : count === 3 ? '33% / 33% / 34%' : '25% quarterly'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Pick Due Dates */}
                <div className="dashboard-card bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="dashboard-title text-base font-bold text-[#0B4F45] m-0 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-teal-100 text-[#0B4F45] text-xs font-black flex items-center justify-center">2</span>
                      Configure Tranche Due Dates
                    </h2>
                    <span className="text-xs text-[#4A4F4C] font-semibold">Editable Schedule</span>
                  </div>

                  <div className="space-y-3">
                    {Array.from({ length: trancheCount }).map((_, idx) => (
                      <div key={idx} className="flex items-center justify-between gap-4 p-3.5 rounded-xl bg-gray-50 border border-gray-200/80">
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-white border border-gray-200 text-xs font-mono font-bold text-[#0B4F45] flex items-center justify-center">
                            #{idx + 1}
                          </span>
                          <div>
                            <h4 className="text-xs font-bold text-gray-900 m-0">
                              Tranche {idx + 1} ({idx === 0 ? 'Upfront Tranche' : `Tranche ${idx + 1}`})
                            </h4>
                            <p className="text-[11px] text-[#4A4F4C] m-0 font-mono">
                              Estimated: {formatCurrency(amountPerTranche)}
                            </p>
                          </div>
                        </div>
                        <input
                          type="date"
                          value={trancheDates[idx] || `2026-0${idx + 7}-01`}
                          onChange={(e) => {
                            const newDates = [...trancheDates];
                            newDates[idx] = e.target.value;
                            setTrancheDates(newDates);
                          }}
                          className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white text-xs font-bold text-gray-800 focus:outline-none focus:border-[#0B4F45]"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step 3: Select Financing Partner */}
                <div className="dashboard-card bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="dashboard-title text-base font-bold text-[#0B4F45] m-0 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-teal-100 text-[#0B4F45] text-xs font-black flex items-center justify-center">3</span>
                      Select Split Financing Partner
                    </h2>
                    <span className="text-xs text-[#4A4F4C] font-semibold">Verified NIBSS Partners</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(partnersData).map(([key, p]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setPartnerKey(key)}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          partnerKey === key
                            ? 'bg-teal-50/60 border-[#0B4F45] ring-2 ring-[#0B4F45]/20'
                            : 'bg-white border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="text-sm font-bold text-[#0B4F45] m-0">{p.name}</h4>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.feePct === 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'}`}>
                              {p.feePct}% Fee
                            </span>
                          </div>
                          <span className="text-[10px] font-bold text-[#C75B30] block mb-2">{p.tag}</span>
                          <p className="text-xs text-[#4A4F4C] m-0 leading-relaxed">{p.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Fee & Interest Breakdown Card */}
              <div className="lg:col-span-5 space-y-6">
                <div className="dashboard-card bg-[#FAF7F2] rounded-2xl border border-[#0B4F45]/20 p-6 shadow-sm sticky top-6">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <h3 className="dashboard-card-title text-base font-extrabold text-[#0B4F45] m-0">
                      Instalment Financial Plan
                    </h3>
                    <span className="bg-[#0B4F45] text-white px-3 py-1 rounded-full text-xs font-bold">
                      {trancheCount} Tranches
                    </span>
                  </div>

                  <div className="py-4 space-y-3 border-b border-gray-200 text-xs sm:text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-[#4A4F4C]">Base Annual Rent</span>
                      <span className="font-mono font-bold text-gray-900">{formatCurrency(baseRentTotal)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#4A4F4C]">Partner Financing Fee ({currentPartner.feePct}%)</span>
                      <span className="font-mono font-bold text-[#C75B30]">+{formatCurrency(feeAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-gray-200/80">
                      <span className="font-bold text-gray-900">Total Instalment Payable</span>
                      <span className="font-mono text-lg font-black text-[#0B4F45]">{formatCurrency(totalInstalmentPayable)}</span>
                    </div>
                  </div>

                  <div className="py-4 bg-white rounded-xl p-4 my-4 border border-gray-200/80">
                    <h4 className="text-xs font-bold text-[#0B4F45] uppercase tracking-wider m-0 mb-2">Per Tranche Breakdown</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-[#4A4F4C]">Due per Tranche ({trancheCount}x)</span>
                      <span className="font-mono text-base font-extrabold text-[#0B4F45]">{formatCurrency(amountPerTranche)}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmitInstalmentPlan}
                    disabled={isSubmittingPlan}
                    className="w-full py-4 rounded-xl bg-[#0B4F45] hover:bg-[#083D35] text-white font-bold text-sm sm:text-base border-none cursor-pointer shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmittingPlan ? (
                      <span>Submitting Schedule...</span>
                    ) : (
                      <>
                        <span>Submit Instalment Plan Request</span>
                        <span className="material-symbols-outlined text-base">check_circle</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-[#4A4F4C] m-0 mt-3 leading-relaxed">
                    By submitting, your structured request will be sent to <strong>{currentPartner.name}</strong> and your landlord for approval.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Add New Payment Method Modal */}
      <Modal isOpen={showAddModal} onClose={() => { setShowAddModal(false); setNewAccNum(''); setFormError(''); }} title="Add Payment Method">
        {formError && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-100 font-medium">
            {formError}
          </div>
        )}
        <div className="space-y-4 text-left font-sans">
          <div>
            <label className="text-xs font-bold text-gray-700 uppercase block mb-1">Method Type</label>
            <select value={newMethodType} onChange={e => setNewMethodType(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm bg-gray-50 focus:outline-none">
              <option value="bank">Bank Account (NUBAN)</option>
              <option value="card">Debit / Credit Card</option>
            </select>
          </div>
          {newMethodType === 'bank' ? (
            <>
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase block mb-1">Select Bank</label>
                <select value={newBankName} onChange={e => setNewBankName(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm bg-gray-50 focus:outline-none">
                  <option value="Zenith Bank">Zenith Bank Plc</option>
                  <option value="GTBank">Guaranty Trust Bank (GTCO)</option>
                  <option value="Access Bank">Access Bank Plc</option>
                  <option value="UBA">United Bank for Africa (UBA)</option>
                  <option value="First Bank">First Bank of Nigeria</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase block mb-1">10-Digit Account Number</label>
                <input type="text" maxLength={10} placeholder="0123456789" value={newAccNum} onChange={e => setNewAccNum(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm bg-gray-50 focus:outline-none" />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase block mb-1">Card Number</label>
                <input type="text" placeholder="5399 •••• •••• ••••" value={newAccNum} onChange={e => setNewAccNum(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm bg-gray-50 focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase block mb-1">Expiry</label>
                  <input type="text" placeholder="MM/YY" className="w-full px-3 py-2 border rounded-xl text-sm bg-gray-50 focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase block mb-1">CVV</label>
                  <input type="password" maxLength={4} placeholder="123" className="w-full px-3 py-2 border rounded-xl text-sm bg-gray-50 focus:outline-none" />
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex gap-3 mt-6 justify-end">
          <button onClick={() => { setShowAddModal(false); setNewAccNum(''); setFormError(''); }} className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 cursor-pointer bg-transparent">Cancel</button>
          <button onClick={() => {
            if (!newAccNum || newAccNum.length < 4) {
              setFormError('Please enter a valid account or card number (min 4 characters).');
              return;
            }
            const last4 = newAccNum.slice(-4);
            const newId = `method-${Date.now()}`;
            const newObj = newMethodType === 'bank' 
              ? { id: newId, title: 'Bank Account', subtitle: `Ending in ${last4} • ${newBankName}`, icon: 'account_balance' }
              : { id: newId, title: 'Debit Card', subtitle: `Ending in ${last4} • Mastercard`, icon: 'credit_card' };
            setSavedMethods(prev => [...prev, newObj]);
            setPaymentMethod(newId);
            setShowAddModal(false);
            setNewAccNum('');
            setFormError('');
          }} className="px-5 py-2 bg-[#0B4F45] text-white rounded-xl text-xs font-bold hover:bg-[#083D35] cursor-pointer border-none">Save Method</button>
        </div>
      </Modal>
    </div>
  );
};

export default TenantPayRent;
