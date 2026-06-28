import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getTenantDashboard } from '../../services/tenantService';
import useAuthStore from '../../store/authStore';
import { formatCurrency } from '../../utils/formatCurrency';

const TenantDashboard = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const { data: dashData } = useQuery({
    queryKey: ['tenant-dashboard'],
    queryFn: getTenantDashboard,
  });

  const balanceAmount = dashData?.balanceAmount || 3250000;

  return (
    <div className="space-y-8 pb-28 relative font-body-lg text-charcoal">
      {/* Welcome Header */}
      <section className="flex justify-between items-end">
        <div>
          <h2 className="font-headline-md text-headline-md text-primary font-bold">
            Good morning, {user?.name ? user.name.split(' ')[0] : 'Dianne'}
          </h2>
          <p className="text-body font-body-lg">Here's what's happening with your property today.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => toast.info('Downloading Annual Report...')} 
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-primary font-label-caps text-label-caps hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Download Annual Report
          </button>
        </div>
      </section>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-card-gap">
        
        {/* Rent Summary Card (Primary Focus) */}
        <div className="col-span-12 lg:col-span-7 bg-white rounded-xl p-8 border border-gray-200 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full -mr-24 -mt-24 transition-transform duration-700 group-hover:scale-110"></div>
          <div className="relative flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
                <h3 className="font-label-caps text-label-caps uppercase text-body tracking-widest">Rent Summary</h3>
              </div>
              <div className="flex flex-col md:flex-row md:items-end gap-6">
                <div>
                  <p className="font-body-sm text-body mb-1">Total Rent Due</p>
                  <p className="font-headline-md text-5xl font-bold text-primary">{formatCurrency(balanceAmount)}</p>
                </div>
                <div className="pb-2">
                  <span className="px-3 py-1 bg-accent/20 text-[#C75B30] rounded-full font-label-caps text-[10px] sm:text-xs uppercase font-bold tracking-tight border border-accent/30 whitespace-nowrap inline-flex items-center shrink-0">Due in 4 days</span>
                </div>
              </div>
            </div>
            <div className="mt-12 flex flex-col md:flex-row items-center gap-8 pt-8 border-t border-gray-200/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">calendar_today</span>
                </div>
                <div>
                  <p className="font-body-sm text-body">Next Payment</p>
                  <p className="font-bold text-primary">Oct 01, 2026</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">auto_stories</span>
                </div>
                <div>
                  <p className="font-body-sm text-body">Method</p>
                  <p className="font-bold text-primary">Autopay (•••• 4928)</p>
                </div>
              </div>
              <div className="md:ml-auto w-full md:w-auto shrink-0">
                <button 
                  onClick={() => navigate('/tenant/pay-rent')} 
                  className="w-full md:w-auto bg-[#ff9973] hover:bg-[#ff8559] text-[#380d00] font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all cursor-pointer block text-center"
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Lease Snapshot */}
        <div className="col-span-12 lg:col-span-5 bg-white rounded-xl p-8 border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
                <h3 className="font-label-caps text-label-caps uppercase text-body tracking-widest">Lease Snapshot</h3>
              </div>
              <button onClick={() => navigate('/tenant/lease')} className="text-primary hover:underline text-sm font-bold cursor-pointer inline-flex items-center gap-1">View Full Lease</button>
            </div>
            <div className="space-y-6">
              <div>
                <p className="font-body-sm text-body mb-1">Property Address</p>
                <p className="font-headline-md text-xl font-bold text-charcoal leading-tight">6301 Elgin St. Celina, Delaware 10299</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-2xs">
                  <p className="font-body-sm text-body text-xs">Start Date</p>
                  <p className="font-data-mono text-data-mono font-bold text-primary mt-1">Jan 12, 2025</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-2xs">
                  <p className="font-body-sm text-body text-xs">End Date</p>
                  <p className="font-data-mono text-data-mono font-bold text-primary mt-1">Jan 11, 2027</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex items-center justify-between p-4 bg-primary rounded-xl text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <span className="material-symbols-outlined">support_agent</span>
              </div>
              <div>
                <p className="text-xs opacity-70">Landlord Contact</p>
                <p className="font-bold">{user?.landlordName || 'Marvin McKinney'}</p>
              </div>
            </div>
            <a href={`tel:${user?.landlordPhone || '+15550123456'}`} className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer block">
              <span className="material-symbols-outlined">call</span>
            </a>
          </div>
        </div>

        {/* Maintenance Tracker */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-white">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>build</span>
              <h3 className="font-label-caps text-label-caps uppercase text-body tracking-widest">Maintenance Tracker</h3>
            </div>
            <button onClick={() => navigate('/tenant/maintenance')} className="flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all cursor-pointer">
              Request New <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>
          <div className="divide-y divide-gray-200/30 flex-1">
            {/* Item 1 */}
            <div onClick={() => navigate('/tenant/maintenance')} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#E6F4EA] rounded-full flex items-center justify-center text-[#137333]">
                  <span className="material-symbols-outlined">plumbing</span>
                </div>
                <div>
                  <p className="font-bold text-charcoal">Kitchen Sink Leak</p>
                  <p className="text-sm text-body">Request ID: #MT-84920 • Logged 2 days ago</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <span className="px-3 py-1 bg-[#E6F4EA] text-[#137333] rounded-full text-xs font-bold uppercase tracking-wider">Scheduled</span>
                  <p className="text-xs text-body mt-1">Tomorrow, 10:00 AM</p>
                </div>
                <span className="material-symbols-outlined text-body">chevron_right</span>
              </div>
            </div>
            {/* Item 2 */}
            <div onClick={() => navigate('/tenant/maintenance')} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors opacity-70 cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-body">
                  <span className="material-symbols-outlined">ac_unit</span>
                </div>
                <div>
                  <p className="font-bold text-charcoal">AC Filter Replacement</p>
                  <p className="text-sm text-body">Request ID: #MT-84211 • Completed</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <span className="px-3 py-1 bg-gray-100 text-body rounded-full text-xs font-bold uppercase tracking-wider">Resolved</span>
                  <p className="text-xs text-body mt-1">Aug 15, 2026</p>
                </div>
                <span className="material-symbols-outlined text-body">chevron_right</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="col-span-12 lg:col-span-4 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>history</span>
              <h3 className="font-label-caps text-label-caps uppercase text-body tracking-widest">Recent Activity</h3>
            </div>
          </div>
          <div className="p-6 space-y-6 flex-1 overflow-y-auto max-h-[400px]">
            {/* Activity 1 */}
            <div className="flex gap-4 group">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-lg">check_circle</span>
                </div>
                <div className="w-px h-full bg-gray-200 mt-2"></div>
              </div>
              <div className="pb-6">
                <p className="text-sm font-bold text-charcoal">Payment Successful</p>
                <p className="text-xs text-body mb-2">Aug 01, 2026 • 09:42 AM</p>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200/30">
                  <p className="text-xs font-data-mono text-primary font-bold">{formatCurrency(balanceAmount)} Paid via Autopay</p>
                </div>
              </div>
            </div>
            {/* Activity 2 */}
            <div className="flex gap-4 group">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[#E6F4EA] flex items-center justify-center text-[#137333] group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-lg">schedule</span>
                </div>
                <div className="w-px h-full bg-gray-200 mt-2"></div>
              </div>
              <div className="pb-6">
                <p className="text-sm font-bold text-charcoal">Maintenance Visit Scheduled</p>
                <p className="text-xs text-body mb-2">Today • 02:15 PM</p>
                <p className="text-xs text-body italic">"Plumber confirmed for Sep 28 at 10:00 AM."</p>
              </div>
            </div>
            {/* Activity 3 */}
            <div className="flex gap-4 group">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-[#C75B30] group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-lg">notifications</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-charcoal">New Document Uploaded</p>
                <p className="text-xs text-body mb-2">Yesterday • 11:30 AM</p>
                <p onClick={() => navigate('/tenant/lease')} className="text-xs text-primary font-medium hover:underline cursor-pointer">Annual Safety Certificate 2026.pdf</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-gray-50 text-center border-t border-gray-100">
            <button onClick={() => navigate('/tenant/payments')} className="text-xs font-bold text-primary uppercase tracking-widest hover:brightness-75 transition-all cursor-pointer">View All Activity</button>
          </div>
        </div>

      </div>

      {/* Activity Bar Above Quick Links */}
      <div className="flex justify-between items-center pt-2 px-1">
        <h3 className="font-label-caps text-label-caps uppercase text-body tracking-widest">Quick Actions</h3>
        <button 
          onClick={() => navigate('/tenant/payments')} 
          className="text-xs font-bold text-primary uppercase tracking-widest hover:underline flex items-center gap-1 cursor-pointer"
        >
          VIEW ALL ACTIVITY <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>

      {/* Quick Links Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <a onClick={(e) => { e.preventDefault(); navigate('/tenant/payments'); }} className="p-6 bg-white border border-gray-200 rounded-xl flex items-center gap-4 hover:border-primary hover:shadow-md transition-all group cursor-pointer" href="#">
          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
            <span className="material-symbols-outlined">account_balance_wallet</span>
          </div>
          <div>
            <p className="font-bold text-sm">Payment Methods</p>
            <p className="text-xs text-body">Manage cards &amp; bank accounts</p>
          </div>
        </a>
        <a onClick={(e) => { e.preventDefault(); navigate('/tenant/settings'); }} className="p-6 bg-white border border-gray-200 rounded-xl flex items-center gap-4 hover:border-primary hover:shadow-md transition-all group cursor-pointer" href="#">
          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
            <span className="material-symbols-outlined">verified_user</span>
          </div>
          <div>
            <p className="font-bold text-sm">Insurance Info</p>
            <p className="text-xs text-body">Update tenant insurance policy</p>
          </div>
        </a>
        <a onClick={(e) => { e.preventDefault(); navigate('/tenant/lease'); }} className="p-6 bg-white border border-gray-200 rounded-xl flex items-center gap-4 hover:border-primary hover:shadow-md transition-all group cursor-pointer" href="#">
          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
            <span className="material-symbols-outlined">folder_shared</span>
          </div>
          <div>
            <p className="font-bold text-sm">Document Center</p>
            <p className="text-xs text-body">Leases, receipts, and forms</p>
          </div>
        </a>
        <a href="mailto:support@rentflow.ng" className="p-6 bg-white border border-gray-200 rounded-xl flex items-center gap-4 hover:border-primary hover:shadow-md transition-all group cursor-pointer">
          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
            <span className="material-symbols-outlined">forum</span>
          </div>
          <div>
            <p className="font-bold text-sm">Contact Support</p>
            <p className="text-xs text-body">24/7 emergency concierge</p>
          </div>
        </a>
      </section>

      {/* Floating Chat Button (Contextual Action) */}
      <a href="mailto:support@rentflow.ng" className="fixed bottom-6 right-4 sm:right-6 lg:bottom-8 lg:right-6 xl:right-10 w-16 h-16 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 cursor-pointer">
        <span className="material-symbols-outlined text-3xl">chat</span>
      </a>
    </div>
  );
};

export default TenantDashboard;
