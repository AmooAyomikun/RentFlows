import { useState } from 'react';
import { Download, ChevronDown, Check, Building2, Zap, Wrench, Clock, Receipt as ReceiptIcon, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const receiptsData = [
  {
    id: 'RF-2024-1001',
    title: 'Monthly Rent',
    icon: Building2,
    date: 'Oct 01, 2024',
    method: 'Direct Debit',
    amount: '$2,450.00',
    status: 'VERIFIED',
  },
  {
    id: 'RF-2024-0982',
    title: 'Utility Package',
    icon: Zap,
    date: 'Sep 15, 2024',
    method: 'Credit Card (Visa)',
    amount: '$185.00',
    status: 'VERIFIED',
  },
  {
    id: 'RF-2024-0901',
    title: 'Monthly Rent',
    icon: Building2,
    date: 'Sep 01, 2024',
    method: 'Direct Debit',
    amount: '$2,450.00',
    status: 'VERIFIED',
  },
  {
    id: 'RF-2024-0854',
    title: 'HVAC Repair',
    icon: Wrench,
    date: 'Aug 20, 2024',
    method: 'Manual Pay (Portal)',
    amount: '$120.00',
    status: 'VERIFIED',
  },
  {
    id: 'RF-2024-0801',
    title: 'Monthly Rent',
    icon: Building2,
    date: 'Aug 01, 2024',
    method: 'Direct Debit',
    amount: '$2,450.00',
    status: 'VERIFIED',
  },
];

const TenantReceipts = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedType, setSelectedType] = useState('All Payment Types');

  const handleDownload = (id) => {
    toast.success(`Downloading PDF for Receipt #${id}...`);
  };

  const handleSupportTicket = () => {
    toast.info('Opening Support Portal...');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-400">
        <span className="hover:text-gray-600 cursor-pointer transition-colors">Portal</span>
        <span>›</span>
        <span className="text-gray-800 font-bold">Receipts</span>
      </div>

      {/* Title & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="font-display font-black text-2xl sm:text-3xl text-gray-900 tracking-tight">
          Billing & Receipts
        </h1>

        <div className="flex items-center gap-3">
          <button
            onClick={() => toast.info('Filtering by Year...')}
            className="inline-flex items-center justify-between gap-2.5 bg-white border border-gray-200/80 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold text-gray-800 shadow-2xs hover:bg-gray-50 transition-all cursor-pointer"
          >
            <span>Year: {selectedYear}</span>
            <ChevronDown size={15} className="text-gray-400" />
          </button>

          <button
            onClick={() => toast.info('Filtering by Payment Type...')}
            className="inline-flex items-center justify-between gap-2.5 bg-white border border-gray-200/80 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold text-gray-800 shadow-2xs hover:bg-gray-50 transition-all cursor-pointer"
          >
            <span>{selectedType}</span>
            <ChevronDown size={15} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {/* Total Available Card */}
        <div className="bg-[#04332C] text-white rounded-2xl p-6 shadow-md relative overflow-hidden flex flex-col justify-between min-h-[160px]">
          <div>
            <p className="text-xs font-semibold text-[#FAF7F2]/70 uppercase tracking-wider">Total Available</p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mt-2 font-display">24</h2>
          </div>
          <p className="text-xs font-medium text-[#FAF7F2]/60 mt-4 relative z-10">Official receipts archived since 2023</p>
          <ReceiptIcon className="absolute -right-4 -bottom-4 text-white/10 w-32 h-32 rotate-12 pointer-events-none" />
        </div>

        {/* Last Payment Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between min-h-[160px]">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#E6F2EF] text-[#04332C] flex items-center justify-center font-bold">
                <Check size={16} strokeWidth={3} />
              </div>
              <span className="text-xs font-extrabold text-gray-500 uppercase tracking-wider">Last Payment</span>
            </div>
            <span className="text-xs font-bold text-gray-900">Oct 01, 2024</span>
          </div>

          <div className="flex items-baseline justify-between mt-3">
            <span className="text-3xl font-black text-gray-900 tracking-tight font-display">$2,450.00</span>
            <button
              onClick={() => handleDownload('RF-2024-1001')}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer"
              title="Download Last Receipt"
            >
              <Download size={18} />
            </button>
          </div>

          <p className="text-xs font-semibold text-gray-400 mt-3">Paid via Auto-pay (ACH)</p>
        </div>

        {/* Annual Spend Summary Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between min-h-[160px]">
          <span className="text-xs font-extrabold text-gray-500 uppercase tracking-wider">Annual Spend Summary</span>

          {/* Mini Bar Chart */}
          <div className="flex items-end justify-between h-20 pt-3 px-1 gap-2 mt-auto">
            <div className="flex flex-col items-center flex-1 gap-1.5">
              <div className="w-full h-8 bg-[#CBD5E1] rounded-t-sm hover:opacity-80 transition-opacity" title="May" />
              <span className="text-[10px] font-extrabold text-gray-400 uppercase">MAY</span>
            </div>
            <div className="flex flex-col items-center flex-1 gap-1.5">
              <div className="w-full h-10 bg-[#94A3B8] rounded-t-sm hover:opacity-80 transition-opacity" title="Jun" />
              <span className="text-[10px] font-extrabold text-gray-400 uppercase">JUN</span>
            </div>
            <div className="flex flex-col items-center flex-1 gap-1.5">
              <div className="w-full h-12 bg-[#64748B] rounded-t-sm hover:opacity-80 transition-opacity" title="Jul" />
              <span className="text-[10px] font-extrabold text-gray-400 uppercase">JUL</span>
            </div>
            <div className="flex flex-col items-center flex-1 gap-1.5">
              <div className="w-full h-16 bg-[#475569] rounded-t-sm hover:opacity-80 transition-opacity" title="Aug" />
              <span className="text-[10px] font-extrabold text-gray-400 uppercase">AUG</span>
            </div>
            <div className="flex flex-col items-center flex-1 gap-1.5">
              <div className="w-full h-14 bg-[#334155] rounded-t-sm hover:opacity-80 transition-opacity" title="Sep" />
              <span className="text-[10px] font-extrabold text-gray-400 uppercase">SEP</span>
            </div>
            <div className="flex flex-col items-center flex-1 gap-1.5">
              <div className="w-full h-16 bg-[#04332C] rounded-t-sm hover:opacity-80 transition-opacity shadow-xs" title="Oct" />
              <span className="text-[10px] font-extrabold text-gray-900 uppercase">OCT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Receipts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {receiptsData.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-700 shrink-0">
                      <IconComponent size={20} strokeWidth={2.2} />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-gray-900 text-sm">{item.title}</h3>
                      <p className="text-[11px] font-medium text-gray-400">Receipt #{item.id}</p>
                    </div>
                  </div>
                  <span className="bg-[#D1FAE5] text-[#065F46] font-black text-[10px] px-2.5 py-1 rounded-md tracking-wider uppercase">
                    {item.status}
                  </span>
                </div>

                <div className="my-5 space-y-2.5 text-xs sm:text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 font-medium">Date</span>
                    <span className="font-bold text-gray-900">{item.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 font-medium">Method</span>
                    <span className="font-bold text-gray-900">{item.method}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-gray-500 font-medium">Amount</span>
                    <span className="text-lg font-black text-gray-900 font-display">{item.amount}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDownload(item.id)}
                className="w-full py-2.5 px-4 rounded-xl border border-gray-200 hover:border-gray-300 font-bold text-xs text-gray-800 flex items-center justify-center gap-2 hover:bg-gray-50 transition-all active:scale-[0.99] cursor-pointer shadow-2xs mt-2"
              >
                <Download size={15} />
                <span>Download PDF</span>
              </button>
            </div>
          );
        })}

        {/* Older Records Card */}
        <div className="border-2 border-dashed border-gray-200/80 bg-white/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center min-h-[260px] hover:bg-white transition-colors">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 mb-3 shadow-2xs">
            <Clock size={22} />
          </div>
          <h3 className="font-extrabold text-base text-gray-900">Older Records</h3>
          <p className="text-xs text-gray-500 max-w-[180px] mt-1 mb-6 leading-relaxed font-medium">
            Load archived receipts from previous lease terms
          </p>
          <button
            onClick={() => toast.info('Requesting archived records...')}
            className="inline-flex items-center gap-1.5 text-xs font-black tracking-widest uppercase text-gray-900 hover:text-[#C75B30] transition-colors cursor-pointer group"
          >
            <span>REQUEST ARCHIVE</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Bottom Assistance Banner */}
      <div className="mt-10 bg-[#F1F5F4] border border-gray-200/80 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xs">
        <div className="max-w-2xl">
          <h3 className="text-lg font-black text-gray-900 tracking-tight">Need billing assistance?</h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed font-medium">
            If you notice any discrepancies in your receipts or have questions about a payment, please contact the property management office directly through the support portal.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto shrink-0">
          <button
            onClick={handleSupportTicket}
            className="flex-1 md:flex-none px-5 py-3 rounded-xl bg-[#04332C] hover:bg-[#064e43] text-white font-bold text-xs tracking-wider uppercase shadow-sm transition-all active:scale-[0.98] cursor-pointer text-center"
          >
            Open Support Ticket
          </button>
          <button
            onClick={() => toast.info('Connecting to property manager...')}
            className="flex-1 md:flex-none px-5 py-3 rounded-xl bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-bold text-xs tracking-wider uppercase shadow-2xs transition-all active:scale-[0.98] cursor-pointer text-center"
          >
            Contact Manager
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="flex flex-col sm:flex-row items-center justify-between pt-8 mt-12 border-t border-gray-200/60 text-[11px] font-bold text-gray-400 gap-4 uppercase tracking-wider">
        <div>© 2024 RENTFLOW PROPERTY GROUP. ALL RIGHTS RESERVED.</div>
        <div className="flex items-center gap-6">
          <span className="hover:text-gray-600 cursor-pointer transition-colors">PRIVACY POLICY</span>
          <span className="hover:text-gray-600 cursor-pointer transition-colors">TERMS OF SERVICE</span>
        </div>
      </footer>
    </div>
  );
};

export default TenantReceipts;
