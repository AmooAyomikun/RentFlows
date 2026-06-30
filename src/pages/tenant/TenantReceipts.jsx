import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const mockReceiptsData = [
  { id: 'RF-2026-1001', title: 'Monthly Rent', type: 'Rent', year: '2026', date: 'Jun 01, 2026', method: 'Direct Debit', amount: '₦3,250,000', icon: 'apartment' },
  { id: 'RF-2026-0982', title: 'Utility Package', type: 'Utilities', year: '2026', date: 'May 15, 2026', method: 'Credit Card (Visa)', amount: '₦200,000', icon: 'bolt' },
  { id: 'RF-2026-0901', title: 'Monthly Rent', type: 'Rent', year: '2026', date: 'May 01, 2026', method: 'Direct Debit', amount: '₦3,250,000', icon: 'apartment' },
  { id: 'RF-2026-0854', title: 'Plumbing Repair', type: 'Maintenance', year: '2026', date: 'Apr 20, 2026', method: 'Manual Pay (Portal)', amount: '₦120,000', icon: 'build' },
  { id: 'RF-2026-0801', title: 'Monthly Rent', type: 'Rent', year: '2026', date: 'Apr 01, 2026', method: 'Direct Debit', amount: '₦3,250,000', icon: 'apartment' },
  { id: 'RF-2025-1205', title: 'Late Fee Adjustment', type: 'Late Fees', year: '2025', date: 'Dec 05, 2025', method: 'Bank Transfer', amount: '₦50,000', icon: 'warning' },
  { id: 'RF-2025-1101', title: 'Monthly Rent', type: 'Rent', year: '2025', date: 'Nov 01, 2025', method: 'Direct Debit', amount: '₦3,000,000', icon: 'apartment' },
];

const TenantReceipts = () => {
  const navigate = useNavigate();
  const [yearFilter, setYearFilter] = useState('2026');
  const [typeFilter, setTypeFilter] = useState('All Payment Types');

  const filteredReceipts = mockReceiptsData.filter(r => {
    const matchesYear = yearFilter === 'All Years' || r.year === yearFilter;
    const matchesType = typeFilter === 'All Payment Types' || r.type.toLowerCase() === typeFilter.toLowerCase();
    return matchesYear && matchesType;
  });
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24 !important;
        }
        .receipt-card-hover:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 30px -5px rgba(11, 79, 69, 0.12);
        }
      `}} />
      <div className="space-y-6">

<div className="flex justify-between items-end mb-8">
<div>
<nav className="flex items-center gap-2 text-sm text-outline mb-2">
<span>Portal</span>
<span className="material-symbols-outlined text-xs">chevron_right</span>
<span className="text-primary font-medium">Receipts</span>
</nav>
<h1 className="text-2xl font-bold text-gray-900 m-0">Billing &amp; Receipts</h1>
</div>
<div className="flex gap-3">
<select value={yearFilter} onChange={e => setYearFilter(e.target.value)} className="bg-white border border-outline-variant rounded-lg px-4 py-2 text-sm focus:ring-primary focus:border-primary cursor-pointer">
<option value="2026">Year: 2026</option>
<option value="2025">Year: 2025</option>
<option value="All Years">All Years</option>
</select>
<select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="bg-white border border-outline-variant rounded-lg px-4 py-2 text-sm focus:ring-primary focus:border-primary cursor-pointer">
<option value="All Payment Types">All Payment Types</option>
<option value="Rent">Rent</option>
<option value="Utilities">Utilities</option>
<option value="Maintenance">Maintenance</option>
<option value="Late Fees">Late Fees</option>
</select>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

<div className="bg-primary text-on-primary p-6 rounded-xl shadow-lg relative overflow-hidden group">
<div className="relative z-10">
<p className="text-xs font-bold uppercase tracking-widest text-on-primary-container opacity-80 mb-1 m-0">Total Available</p>
<h2 className="text-4xl font-bold text-on-primary mb-2 m-0">24</h2>
<p className="text-sm text-on-primary opacity-70 m-0">Official receipts archived since 2023</p>
</div>
<span className="material-symbols-outlined absolute -right-4 -bottom-4 text-9xl opacity-10 group-hover:scale-110 transition-transform duration-500">receipt_long</span>
</div>

<div className="bg-white border border-gray-200 p-6 rounded-xl card-shadow">
<div className="flex items-center gap-3 mb-4">
<div className="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined">task_alt</span>
</div>
<div>
<p className="text-xs font-bold uppercase tracking-widest text-outline m-0">Last Payment</p>
<p className="text-base text-[#4A4F4C] font-semibold m-0">Jun 01, 2026</p>
</div>
</div>
<div className="flex justify-between items-end">
<div>
<p className="text-2xl font-bold text-primary m-0">₦3,250,000</p>
<p className="text-xs text-outline m-0">Paid via Auto-pay (ACH)</p>
</div>
<button onClick={() => toast.success('Downloading receipt summary PDF...')} className="text-primary hover:bg-primary-container/10 p-2 rounded-full transition-colors cursor-pointer">
<span className="material-symbols-outlined">download</span>
</button>
</div>
</div>

<div className="bg-white border border-gray-200 p-6 rounded-xl card-shadow relative overflow-hidden">
<p className="text-xs font-bold uppercase tracking-widest text-outline mb-4 m-0">Annual Spend Summary</p>
<div className="h-16 flex items-end gap-1">
<div className="w-full bg-primary-container/20 h-1/2 rounded-t-sm"></div>
<div className="w-full bg-primary-container/20 h-2/3 rounded-t-sm"></div>
<div className="w-full bg-primary-container/40 h-3/4 rounded-t-sm"></div>
<div className="w-full bg-primary-container/60 h-full rounded-t-sm"></div>
<div className="w-full bg-primary-container/80 h-[90%] rounded-t-sm"></div>
<div className="w-full bg-primary h-[95%] rounded-t-sm"></div>
</div>
<div className="mt-2 flex justify-between text-[10px] text-outline font-medium">
<span>MAY</span>
<span>JUN</span>
<span>JUL</span>
<span>AUG</span>
<span>SEP</span>
<span>OCT</span>
</div>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
  {filteredReceipts.map(receipt => (
    <div key={receipt.id} className="bg-white border border-gray-200 rounded-xl p-6 card-shadow receipt-card-hover transition-all duration-300 group flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-surface-container-high rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">{receipt.icon}</span>
            </div>
            <div>
              <h2 className="text-sm font-semibold uppercase text-gray-800 m-0">{receipt.title}</h2>
              <p className="text-xs text-outline m-0">Receipt #{receipt.id}</p>
            </div>
          </div>
          <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase">Verified</span>
        </div>
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-outline">Date</span>
            <span className="font-medium text-on-surface">{receipt.date}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-outline">Method</span>
            <span className="font-medium text-on-surface">{receipt.method}</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-outline-variant/10">
            <span className="text-outline">Amount</span>
            <span className="text-lg font-bold text-primary">{receipt.amount}</span>
          </div>
        </div>
      </div>
      <button onClick={() => toast.success(`Downloading Receipt #${receipt.id}...`)} className="w-full py-2.5 border border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer">
        <span className="material-symbols-outlined text-lg">download</span>
        Download PDF
      </button>
    </div>
  ))}

  {filteredReceipts.length === 0 && (
    <div className="col-span-1 md:col-span-3 py-12 text-center bg-white rounded-xl border border-gray-200">
      <p className="text-gray-500 font-medium">No receipts match your selected filters.</p>
    </div>
  )}
</div>

</div>

<footer className="mt-12 p-6 border border-gray-200 rounded-xl bg-surface-container-low card-shadow">
<div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
<div className="max-w-md">
<h3 className="text-base font-bold text-primary mb-2 m-0">Need billing assistance?</h3>
<p className="text-sm text-gray-600 m-0">If you notice any discrepancies in your receipts or have questions about a payment, please contact the property management office directly through the support portal.</p>
</div>
<div className="flex gap-4">
<button onClick={() => navigate('/tenant/report-issue')} className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-container transition-colors text-sm cursor-pointer border-none">
                        Open Support Ticket
                    </button>
<button onClick={() => navigate('/tenant/report-issue')} className="px-6 py-2 border border-outline text-on-surface-variant font-semibold rounded-lg hover:bg-white transition-colors text-sm cursor-pointer bg-transparent">
                        Contact Manager
                    </button>
</div>
</div>
<div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-outline-variant/20 flex flex-col sm:flex-row justify-between items-center text-[10px] text-outline uppercase tracking-widest font-bold">
<p className="text-[10px] text-outline m-0">© 2026 RentFlow Property Group. All rights reserved.</p>
<div className="flex gap-6 mt-4 sm:mt-0">
<a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
<a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
</div>
</div>
</footer>
    </>
  );
};

export default TenantReceipts;
