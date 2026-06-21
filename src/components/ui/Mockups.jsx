import React from 'react';
import { CheckCircle, TrendingUp } from 'lucide-react';

/** Shell wrapper for all mockups to ensure consistent, realistic desktop UI */
export const MockupShell = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl border border-border shadow-2xl overflow-hidden w-full ${className}`}>
    {/* Browser chrome */}
    <div className="bg-warm/80 px-4 py-3 border-b border-border flex items-center gap-1.5">
      <div className="w-2.5 h-2.5 rounded-full bg-error/50" />
      <div className="w-2.5 h-2.5 rounded-full bg-warning/50" />
      <div className="w-2.5 h-2.5 rounded-full bg-success/50" />
      <div className="flex-1 bg-border/70 h-4 rounded-sm mx-3 max-w-[200px]" />
    </div>
    <div className="p-6 bg-[#FAF7F2] h-full relative">
      {children}
    </div>
  </div>
);

/** 1. Full Hero Dashboard Mockup */
export const HeroMockup = () => (
  <MockupShell className="max-w-4xl mx-auto border-border/80 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
    <div className="flex gap-6 h-full">
      {/* Sidebar */}
      <div className="w-48 hidden sm:flex flex-col gap-2">
        <div className="h-8 bg-charcoal/5 rounded w-24 mb-4" />
        {['Dashboard', 'Properties', 'Tenants', 'Payments', 'Maintenance'].map((item, i) => (
          <div key={item} className={`h-8 rounded px-3 flex items-center ${i === 0 ? 'bg-primary text-white font-medium' : 'text-muted font-medium hover:bg-charcoal/5'}`}>
            <span className="text-xs">{item}</span>
          </div>
        ))}
      </div>
      
      {/* Main Content */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted font-medium">Good morning, Chidi 👋</p>
          <div className="w-8 h-8 rounded-full bg-charcoal/10" />
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Properties', value: '14', color: 'bg-primary/10 text-primary' },
            { label: 'Revenue (MTD)', value: '₦8.4M', color: 'bg-success/10 text-success' },
            { label: 'Occupancy', value: '42/45', color: 'bg-accent/10 text-accent' },
            { label: 'Overdue', value: '3', color: 'bg-error/10 text-error' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-lg p-4 border border-[#E5E1DA] shadow-sm">
              <p className="text-[11px] text-muted mb-1.5 font-medium uppercase tracking-wider">{s.label}</p>
              <p className={`font-mono font-bold text-xl ${s.color.split(' ')[1]}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Main Chart area + List */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 bg-white rounded-lg border border-[#E5E1DA] p-4 shadow-sm h-48 flex flex-col">
            <p className="text-xs font-semibold text-charcoal mb-4">Revenue Overview</p>
            <div className="flex items-end gap-2 h-full">
              {[40, 55, 48, 62, 75, 68, 85, 95, 80, 100].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm"
                  style={{ height: `${h}%`, background: i === 9 ? '#0B4F45' : 'rgba(11,79,69,0.15)' }}
                />
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-[#E5E1DA] p-4 shadow-sm h-48">
             <p className="text-xs font-semibold text-charcoal mb-4">Recent Payments</p>
             <div className="space-y-3">
               {['Unit 4B', 'Unit 7A', 'Unit 12'].map((unit) => (
                 <div key={unit} className="flex justify-between items-center text-xs">
                   <div className="flex items-center gap-2">
                     <div className="w-6 h-6 rounded bg-success/10 text-success flex items-center justify-center"><CheckCircle size={12}/></div>
                     <span className="font-medium">{unit}</span>
                   </div>
                   <span className="font-mono text-charcoal">₦450k</span>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  </MockupShell>
);

/** Property & Tenant Management mockup */
export const PropertyMockup = () => (
  <MockupShell>
    <p className="text-[11px] text-muted font-semibold uppercase tracking-widest mb-4">Properties Portfolio</p>
    <div className="space-y-3">
      {[
        { name: 'Lekki Gardens Estate', units: '12 units', occupied: 11, total: 12, status: 'bg-success/10 text-success', label: 'High occupancy' },
        { name: 'Ikeja Court Block A', units: '8 units', occupied: 6, total: 8, status: 'bg-warning/10 text-warning', label: 'Partial' },
        { name: 'Ajah Terrace', units: '6 units', occupied: 6, total: 6, status: 'bg-success/10 text-success', label: 'Full' },
      ].map((p) => (
        <div key={p.name} className="bg-white rounded-lg border border-border p-4 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-sm font-semibold text-charcoal">{p.name}</p>
            <p className="text-[11px] text-muted mt-1 font-medium">{p.occupied}/{p.total} occupied · {p.units}</p>
          </div>
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${p.status}`}>{p.label}</span>
        </div>
      ))}
    </div>
  </MockupShell>
);

/** Online Rent Payment mockup */
export const PaymentMockup = () => (
  <MockupShell>
    <div className="bg-white rounded-xl border border-border p-6 shadow-sm max-w-sm mx-auto mt-2">
      <div className="text-center pb-2 border-b border-border mb-4">
        <div className="w-14 h-14 rounded-full bg-success/15 flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={28} className="text-success" aria-hidden="true" />
        </div>
        <p className="text-sm text-muted mb-1 font-medium">Payment confirmed</p>
        <p className="font-mono font-bold text-charcoal text-4xl mb-4">₦450,000</p>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-success/10 text-success px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-success" aria-hidden="true" />
          Paid via Paystack
        </span>
      </div>
      <div className="space-y-3 pt-2">
        {[
          { label: 'Tenant', value: 'Ngozi Eze' },
          { label: 'Property', value: 'Ikeja Court — Unit 4B' },
          { label: 'Period', value: 'July 2025' },
        ].map((row) => (
          <div key={row.label} className="flex justify-between text-sm">
            <span className="text-muted">{row.label}</span>
            <span className="font-semibold text-charcoal">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  </MockupShell>
);

/** Auto-Generated Receipts mockup */
export const ReceiptMockup = () => (
  <MockupShell>
    <div className="bg-white rounded-xl shadow-md border border-border max-w-sm mx-auto overflow-hidden mt-2">
      {/* Receipt header */}
      <div className="bg-primary px-6 py-5 flex items-center justify-between">
        <div>
          <p className="text-white font-bold text-lg">RentFlow</p>
          <p className="text-white/70 text-[11px] font-medium mt-1">Invoice #RF-2847</p>
        </div>
        <span className="text-[10px] bg-success text-white px-2.5 py-1 rounded-full font-bold tracking-widest border border-white/20">
          PAID IN FULL
        </span>
      </div>
      {/* Receipt body */}
      <div className="p-6">
        <div className="space-y-3 text-sm border-b border-border pb-5 mb-5">
          <div className="flex justify-between"><span className="text-muted">Billed To:</span><span className="font-semibold">Emeka Nwosu</span></div>
          <div className="flex justify-between"><span className="text-muted">Property:</span><span className="font-semibold">Lekki Gardens - Unit 7</span></div>
          <div className="flex justify-between"><span className="text-muted">Date:</span><span className="font-medium">01 Jun 2025</span></div>
        </div>
        <div className="flex justify-between text-sm mb-2 font-medium">
          <span className="text-charcoal">Rent (June 2025)</span>
          <span className="font-mono">₦120,000</span>
        </div>
        <div className="flex justify-between text-lg font-bold mt-6 pt-4 border-t border-border">
          <span>Total Paid</span>
          <span className="font-mono text-primary">₦120,000</span>
        </div>
      </div>
    </div>
  </MockupShell>
);

/** Late Payment Tracking mockup */
export const LatePaymentMockup = () => (
  <MockupShell>
    <div className="flex items-center justify-between mb-4">
      <p className="text-[11px] text-muted font-semibold uppercase tracking-widest">Outstanding Balances</p>
      <span className="text-[10px] bg-error/10 text-error font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">2 Action Required</span>
    </div>
    <div className="space-y-3">
      {[
        { name: 'Emeka Nwosu', unit: 'Unit 7', amount: '₦120,000', status: 'Paid', daysLabel: 'Paid on time', statusClass: 'bg-success/10 text-success' },
        { name: 'Chinyere Obi', unit: 'Unit 3', amount: '₦450,000', status: 'Due', daysLabel: 'Due in 2 days', statusClass: 'bg-warning/10 text-warning' },
        { name: 'Tunde Bakare', unit: 'Unit 11', amount: '₦200,000', status: 'Overdue', daysLabel: '5 days overdue', statusClass: 'bg-error/10 text-error' },
        { name: 'Aisha Musa', unit: 'Unit 2', amount: '₦180,000', status: 'Overdue', daysLabel: '12 days overdue', statusClass: 'bg-error/10 text-error' },
      ].map((t) => (
        <div key={t.name} className="bg-white rounded-lg border border-border p-4 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-sm font-semibold text-charcoal">{t.name}</p>
            <p className="text-xs font-mono font-medium text-muted mt-1">{t.amount} · {t.unit}</p>
          </div>
          <div className="text-right">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${t.statusClass}`}>{t.status}</span>
            <p className={`text-[11px] mt-1.5 font-medium ${t.status === 'Overdue' ? 'text-error' : 'text-muted'}`}>{t.daysLabel}</p>
          </div>
        </div>
      ))}
    </div>
  </MockupShell>
);

/** Maintenance Requests kanban mockup */
export const KanbanMockup = () => {
  const columns = [
    {
      label: 'Received',
      color: 'text-charcoal',
      bg: 'bg-charcoal/5',
      cards: [
        { title: 'Leaking pipe', unit: 'Unit 4B', priority: 'bg-error/10 text-error', pLabel: 'Urgent' },
      ],
    },
    {
      label: 'In Progress',
      color: 'text-warning',
      bg: 'bg-warning/10',
      cards: [
        { title: 'Broken door lock', unit: 'Unit 7', priority: 'bg-warning/10 text-warning', pLabel: 'Medium' },
        { title: 'AC not cooling', unit: 'Unit 2', priority: 'bg-warning/10 text-warning', pLabel: 'Medium' },
      ],
    },
    {
      label: 'Resolved',
      color: 'text-success',
      bg: 'bg-success/10',
      cards: [
        { title: 'Faulty light switch', unit: 'Unit 11', priority: 'bg-success/10 text-success', pLabel: 'Done' },
      ],
    },
  ];

  return (
    <MockupShell>
      <p className="text-[11px] text-muted font-semibold uppercase tracking-widest mb-4">Maintenance Board</p>
      <div className="grid grid-cols-3 gap-3">
        {columns.map((col) => (
          <div key={col.label}>
            <div className={`${col.bg} rounded-md px-3 py-2 mb-3`}>
              <p className={`text-[10px] font-bold uppercase tracking-wider ${col.color}`}>{col.label}</p>
            </div>
            <div className="space-y-2">
              {col.cards.map((card) => (
                <div key={card.title} className="bg-white rounded-lg shadow-sm border border-border p-3">
                  <p className="text-xs font-semibold text-charcoal leading-snug">{card.title}</p>
                  <p className="text-[10px] font-medium text-muted mt-1">{card.unit}</p>
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mt-2 inline-block ${card.priority}`}>
                    {card.pLabel}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </MockupShell>
  );
};

/** Financial Dashboard mockup with bar chart */
export const ChartMockup = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const values = [62, 78, 55, 90, 84, 100];

  return (
    <MockupShell>
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: 'Revenue', value: '₦2.4M', color: 'text-primary', bg: 'bg-primary/5 border border-primary/20' },
          { label: 'Outstanding', value: '₦340K', color: 'text-error', bg: 'bg-error/5 border border-error/20' },
          { label: 'Occupancy', value: '88%', color: 'text-success', bg: 'bg-success/5 border border-success/20' },
        ].map((m) => (
          <div key={m.label} className={`${m.bg} rounded-lg p-3 text-center shadow-sm`}>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted mb-1">{m.label}</p>
            <p className={`font-mono font-bold text-lg ${m.color}`}>{m.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-border p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold text-charcoal">Revenue Trend</p>
          <div className="flex items-center gap-1.5 text-xs text-success font-semibold bg-success/10 px-2.5 py-1 rounded-full">
            <TrendingUp size={12} aria-hidden="true" />
            +19% MoM
          </div>
        </div>
        <div className="flex items-end gap-2 h-28">
          {values.map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
              <div
                className="w-full rounded-t-sm transition-all duration-300 group-hover:opacity-80"
                style={{
                  height: `${v}%`,
                  background: i === values.length - 1 ? '#0B4F45' : 'rgba(11,79,69,0.15)',
                }}
              />
              <span className="text-[9px] font-medium text-muted uppercase">{months[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </MockupShell>
  );
};
