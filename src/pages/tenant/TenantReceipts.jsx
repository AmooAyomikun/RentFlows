import React from 'react';

const TenantReceipts = () => {
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
      <div className="max-w-[1400px] mx-auto space-y-8 pb-16">

<div className="flex justify-between items-end mb-8">
<div>
<nav className="flex items-center gap-2 text-sm text-outline mb-2">
<span>Portal</span>
<span className="material-symbols-outlined text-xs">chevron_right</span>
<span className="text-primary font-medium">Receipts</span>
</nav>
<h2 className="font-headline-md text-2xl text-headline-md text-primary">Billing &amp; Receipts</h2>
</div>
<div className="flex gap-3">
<select className="bg-white border border-outline-variant rounded-lg px-4 py-2 text-sm focus:ring-primary focus:border-primary">
<option>Year: 2023</option>
<option defaultValue="Year: 2024">Year: 2024</option>
</select>
<select className="bg-white border border-outline-variant rounded-lg px-4 py-2 text-sm focus:ring-primary focus:border-primary">
<option defaultValue="Year: 2024">All Payment Types</option>
<option>Rent</option>
<option>Utilities</option>
<option>Maintenance</option>
<option>Late Fees</option>
</select>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

<div className="bg-primary text-on-primary p-6 rounded-xl shadow-lg relative overflow-hidden group">
<div className="relative z-10">
<p className="font-label-caps text-xs text-on-primary-container opacity-80 mb-1">Total Available</p>
<h3 className="text-4xl font-bold font-headline-md text-on-primary mb-2">24</h3>
<p className="text-sm text-on-primary opacity-70">Official receipts archived since 2023</p>
</div>
<span className="material-symbols-outlined absolute -right-4 -bottom-4 text-9xl opacity-10 group-hover:scale-110 transition-transform duration-500">receipt_long</span>
</div>

<div className="bg-white border border-outline-variant/50 p-6 rounded-xl shadow-sm">
<div className="flex items-center gap-3 mb-4">
<div className="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined">task_alt</span>
</div>
<div>
<p className="font-label-caps text-xs text-outline">Last Payment</p>
<p className="text-base font-semibold text-on-surface">Oct 01, 2024</p>
</div>
</div>
<div className="flex justify-between items-end">
<div>
<p className="text-2xl font-headline-md font-bold text-primary">$2,450.00</p>
<p className="text-xs text-outline">Paid via Auto-pay (ACH)</p>
</div>
<button className="text-primary hover:bg-primary-container/10 p-2 rounded-full transition-colors">
<span className="material-symbols-outlined">download</span>
</button>
</div>
</div>

<div className="bg-white border border-outline-variant/50 p-6 rounded-xl shadow-sm relative overflow-hidden">
<p className="font-label-caps text-xs text-outline mb-4">Annual Spend Summary</p>
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

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

<div className="bg-white border border-outline-variant/30 rounded-xl p-5 receipt-card-hover transition-all duration-300 group">
<div className="flex justify-between items-start mb-6">
<div className="flex items-center gap-3">
<div className="w-12 h-12 bg-surface-container-high rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
<span className="material-symbols-outlined">apartment</span>
</div>
<div>
<h4 className="text-base font-semibold text-on-surface">Monthly Rent</h4>
<p className="text-xs text-outline">Receipt #RF-2024-1001</p>
</div>
</div>
<span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase">Verified</span>
</div>
<div className="space-y-3 mb-6">
<div className="flex justify-between text-sm">
<span className="text-outline">Date</span>
<span className="font-medium text-on-surface">Oct 01, 2024</span>
</div>
<div className="flex justify-between text-sm">
<span className="text-outline">Method</span>
<span className="font-medium text-on-surface">Direct Debit</span>
</div>
<div className="flex justify-between items-center pt-2 border-t border-outline-variant/10">
<span className="text-outline">Amount</span>
<span className="font-headline-md text-lg font-bold text-primary">$2,450.00</span>
</div>
</div>
<button className="w-full py-2.5 border border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-lg">download</span>
                        Download PDF
                    </button>
</div>

<div className="bg-white border border-outline-variant/30 rounded-xl p-5 receipt-card-hover transition-all duration-300 group">
<div className="flex justify-between items-start mb-6">
<div className="flex items-center gap-3">
<div className="w-12 h-12 bg-surface-container-high rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
<span className="material-symbols-outlined">bolt</span>
</div>
<div>
<h4 className="text-base font-semibold text-on-surface">Utility Package</h4>
<p className="text-xs text-outline">Receipt #RF-2024-0982</p>
</div>
</div>
<span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase">Verified</span>
</div>
<div className="space-y-3 mb-6">
<div className="flex justify-between text-sm">
<span className="text-outline">Date</span>
<span className="font-medium text-on-surface">Sep 15, 2024</span>
</div>
<div className="flex justify-between text-sm">
<span className="text-outline">Method</span>
<span className="font-medium text-on-surface">Credit Card (Visa)</span>
</div>
<div className="flex justify-between items-center pt-2 border-t border-outline-variant/10">
<span className="text-outline">Amount</span>
<span className="font-headline-md text-lg font-bold text-primary">$185.00</span>
</div>
</div>
<button className="w-full py-2.5 border border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-lg">download</span>
                        Download PDF
                    </button>
</div>

<div className="bg-white border border-outline-variant/30 rounded-xl p-5 receipt-card-hover transition-all duration-300 group">
<div className="flex justify-between items-start mb-6">
<div className="flex items-center gap-3">
<div className="w-12 h-12 bg-surface-container-high rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
<span className="material-symbols-outlined">apartment</span>
</div>
<div>
<h4 className="text-base font-semibold text-on-surface">Monthly Rent</h4>
<p className="text-xs text-outline">Receipt #RF-2024-0901</p>
</div>
</div>
<span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase">Verified</span>
</div>
<div className="space-y-3 mb-6">
<div className="flex justify-between text-sm">
<span className="text-outline">Date</span>
<span className="font-medium text-on-surface">Sep 01, 2024</span>
</div>
<div className="flex justify-between text-sm">
<span className="text-outline">Method</span>
<span className="font-medium text-on-surface">Direct Debit</span>
</div>
<div className="flex justify-between items-center pt-2 border-t border-outline-variant/10">
<span className="text-outline">Amount</span>
<span className="font-headline-md text-lg font-bold text-primary">$2,450.00</span>
</div>
</div>
<button className="w-full py-2.5 border border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-lg">download</span>
                        Download PDF
                    </button>
</div>

<div className="bg-white border border-outline-variant/30 rounded-xl p-5 receipt-card-hover transition-all duration-300 group">
<div className="flex justify-between items-start mb-6">
<div className="flex items-center gap-3">
<div className="w-12 h-12 bg-surface-container-high rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
<span className="material-symbols-outlined">build</span>
</div>
<div>
<h4 className="text-base font-semibold text-on-surface">HVAC Repair</h4>
<p className="text-xs text-outline">Receipt #RF-2024-0854</p>
</div>
</div>
<span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase">Verified</span>
</div>
<div className="space-y-3 mb-6">
<div className="flex justify-between text-sm">
<span className="text-outline">Date</span>
<span className="font-medium text-on-surface">Aug 20, 2024</span>
</div>
<div className="flex justify-between text-sm">
<span className="text-outline">Method</span>
<span className="font-medium text-on-surface">Manual Pay (Portal)</span>
</div>
<div className="flex justify-between items-center pt-2 border-t border-outline-variant/10">
<span className="text-outline">Amount</span>
<span className="font-headline-md text-lg font-bold text-primary">$120.00</span>
</div>
</div>
<button className="w-full py-2.5 border border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-lg">download</span>
                        Download PDF
                    </button>
</div>

<div className="bg-white border border-outline-variant/30 rounded-xl p-5 receipt-card-hover transition-all duration-300 group">
<div className="flex justify-between items-start mb-6">
<div className="flex items-center gap-3">
<div className="w-12 h-12 bg-surface-container-high rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
<span className="material-symbols-outlined">apartment</span>
</div>
<div>
<h4 className="text-base font-semibold text-on-surface">Monthly Rent</h4>
<p className="text-xs text-outline">Receipt #RF-2024-0801</p>
</div>
</div>
<span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase">Verified</span>
</div>
<div className="space-y-3 mb-6">
<div className="flex justify-between text-sm">
<span className="text-outline">Date</span>
<span className="font-medium text-on-surface">Aug 01, 2024</span>
</div>
<div className="flex justify-between text-sm">
<span className="text-outline">Method</span>
<span className="font-medium text-on-surface">Direct Debit</span>
</div>
<div className="flex justify-between items-center pt-2 border-t border-outline-variant/10">
<span className="text-outline">Amount</span>
<span className="font-headline-md text-lg font-bold text-primary">$2,450.00</span>
</div>
</div>
<button className="w-full py-2.5 border border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-lg">download</span>
                        Download PDF
                    </button>
</div>

<div className="bg-white border border-outline-variant/30 rounded-xl p-5 border-dashed border-2 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-primary/40 transition-colors">
<div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center text-outline group-hover:text-primary mb-4 transition-colors">
<span className="material-symbols-outlined text-3xl">history_toggle_off</span>
</div>
<h4 className="text-base font-semibold text-on-surface">Older Records</h4>
<p className="text-sm text-outline mt-1 px-8">Load archived receipts from previous lease terms</p>
<button className="mt-4 text-primary font-bold flex items-center gap-2 text-sm uppercase tracking-wider">
                        Request Archive
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</div>
</div>


</div>

<footer className="mt-12 p-8 border border-outline-variant/20 rounded-3xl bg-surface-container-low shadow-xs">
<div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
<div className="max-w-md">
<h5 className="text-base font-bold text-primary mb-2">Need billing assistance?</h5>
<p className="text-sm text-on-surface-variant">If you notice any discrepancies in your receipts or have questions about a payment, please contact the property management office directly through the support portal.</p>
</div>
<div className="flex gap-4">
<button className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-container transition-colors text-sm">
                        Open Support Ticket
                    </button>
<button className="px-6 py-2 border border-outline text-on-surface-variant font-semibold rounded-lg hover:bg-white transition-colors text-sm">
                        Contact Manager
                    </button>
</div>
</div>
<div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-outline-variant/20 flex flex-col sm:flex-row justify-between items-center text-[10px] text-outline uppercase tracking-widest font-bold">
<p className="text-[10px] text-outline">© 2024 RentFlow Property Group. All rights reserved.</p>
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
