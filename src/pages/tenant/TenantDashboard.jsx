import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import useAuthStore from '../../store/authStore';
import { logout as authLogout } from '../../services/authService';

const TenantDashboard = () => {
  const { clearUser } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      document.documentElement.style.setProperty('--mouse-x', x);
      document.documentElement.style.setProperty('--mouse-y', y);
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleLogout = async () => {
    await authLogout();
    clearUser();
    navigate('/login');
  };

  return (
    <div className="max-w-[1440px] mx-auto space-y-8">
          {/* Welcome Header */}
          <section className="flex justify-between items-end">
            <div>
              <h2 className="font-headline-md text-headline-md text-primary font-bold">Good morning, Dianne</h2>
              <p className="text-on-surface-variant font-body-lg">Here's what's happening with your property today.</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => toast.info('Downloading Annual Report...')} className="px-4 py-2 bg-white border border-outline-variant rounded-lg text-primary font-label-caps text-label-caps hover:bg-surface-container-low transition-colors cursor-pointer">Download Annual Report</button>
            </div>
          </section>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-12 gap-card-gap">
            {/* Rent Summary Card (Primary Focus) */}
            <div className="col-span-12 lg:col-span-7 bg-white rounded-xl p-8 border border-outline-variant shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full -mr-24 -mt-24 transition-transform duration-700 group-hover:scale-110"></div>
              <div className="relative flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-primary [font-variation-settings:'FILL'_1]">payments</span>
                    <h3 className="font-label-caps text-label-caps uppercase text-on-surface-variant tracking-widest">Rent Summary</h3>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-end gap-6">
                    <div>
                      <p className="font-body-sm text-on-surface-variant mb-1">Total Rent Due</p>
                      <p className="font-headline-md text-5xl font-bold text-primary">$3,250.00</p>
                    </div>
                    <div className="pb-2">
                      <span className="px-3 py-1 bg-tertiary-container/20 text-on-tertiary-container rounded-full font-label-caps text-[10px] uppercase font-bold tracking-tighter border border-tertiary-container/30">Due in 4 days</span>
                    </div>
                  </div>
                </div>
                <div className="mt-12 flex flex-col md:flex-row items-center gap-8 pt-8 border-t border-outline-variant/30">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-surface-container rounded-lg flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">calendar_today</span>
                    </div>
                    <div>
                      <p className="font-body-sm text-on-surface-variant">Next Payment</p>
                      <p className="font-bold text-primary">Oct 01, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-surface-container rounded-lg flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">auto_stories</span>
                    </div>
                    <div>
                      <p className="font-body-sm text-on-surface-variant">Method</p>
                      <p className="font-bold text-primary">Autopay (•••• 4928)</p>
                    </div>
                  </div>
                  <div className="md:ml-auto w-full md:w-auto">
                    <button onClick={() => navigate('/tenant/pay-rent')} className="w-full md:w-auto bg-[#ff9973] text-[#380d00] font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all cursor-pointer">Pay Now</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Lease Snapshot */}
            <div className="col-span-12 lg:col-span-5 bg-white rounded-xl p-8 border border-outline-variant shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary [font-variation-settings:'FILL'_1]">home</span>
                    <h3 className="font-label-caps text-label-caps uppercase text-on-surface-variant tracking-widest">Lease Snapshot</h3>
                  </div>
                  <button onClick={() => navigate('/tenant/lease')} className="text-primary hover:underline text-sm font-medium cursor-pointer">View Full Lease</button>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="font-body-sm text-on-surface-variant mb-1">Property Address</p>
                    <p className="font-headline-md text-xl font-bold text-on-surface leading-tight">6301 Elgin St. Celina, Delaware 10299</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-surface-container-lowest rounded-lg border border-outline-variant/30">
                      <p className="font-body-sm text-on-surface-variant text-xs">Start Date</p>
                      <p className="font-data-mono text-data-mono text-primary">Jan 12, 2023</p>
                    </div>
                    <div className="p-4 bg-surface-container-lowest rounded-lg border border-outline-variant/30">
                      <p className="font-body-sm text-on-surface-variant text-xs">End Date</p>
                      <p className="font-data-mono text-data-mono text-primary">Jan 11, 2025</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex items-center justify-between p-4 bg-primary-container rounded-xl text-on-primary-container">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="material-symbols-outlined">support_agent</span>
                  </div>
                  <div>
                    <p className="text-xs opacity-70">Landlord Contact</p>
                    <p className="font-bold">Marvin McKinney</p>
                  </div>
                </div>
                <button onClick={() => toast.info('Calling Marvin McKinney...')} className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer">
                  <span className="material-symbols-outlined">call</span>
                </button>
              </div>
            </div>

            {/* Maintenance Tracker */}
            <div className="col-span-12 lg:col-span-8 bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col">
              <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary [font-variation-settings:'FILL'_1]">build</span>
                  <h3 className="font-label-caps text-label-caps uppercase text-on-surface-variant tracking-widest">Maintenance Tracker</h3>
                </div>
                <button onClick={() => navigate('/tenant/maintenance')} className="flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all cursor-pointer">
                  Request New <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>
              <div className="divide-y divide-outline-variant/30 flex-1">
                {/* Item 1 */}
                <div onClick={() => navigate('/tenant/maintenance')} className="p-6 flex items-center justify-between hover:bg-surface-container-low transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-secondary-container rounded-full flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined">plumbing</span>
                    </div>
                    <div>
                      <p className="font-bold text-on-surface">Kitchen Sink Leak</p>
                      <p className="text-sm text-on-surface-variant">Request ID: #MT-84920 • Logged 2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold uppercase tracking-wider">Scheduled</span>
                      <p className="text-xs text-on-surface-variant mt-1">Tomorrow, 10:00 AM</p>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
                  </div>
                </div>
                {/* Item 2 */}
                <div onClick={() => navigate('/tenant/maintenance')} className="p-6 flex items-center justify-between hover:bg-surface-container-low transition-colors opacity-70 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-surface-container rounded-full flex items-center justify-center text-on-surface-variant">
                      <span className="material-symbols-outlined">ac_unit</span>
                    </div>
                    <div>
                      <p className="font-bold text-on-surface">AC Filter Replacement</p>
                      <p className="text-sm text-on-surface-variant">Request ID: #MT-84211 • Completed</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <span className="px-3 py-1 bg-surface-container text-on-surface-variant rounded-full text-xs font-bold uppercase tracking-wider">Resolved</span>
                      <p className="text-xs text-on-surface-variant mt-1">Aug 15, 2024</p>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="col-span-12 lg:col-span-4 bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col">
              <div className="p-6 border-b border-outline-variant bg-surface-container-lowest">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary [font-variation-settings:'FILL'_1]">history</span>
                  <h3 className="font-label-caps text-label-caps uppercase text-on-surface-variant tracking-widest">Recent Activity</h3>
                </div>
              </div>
              <div className="p-6 space-y-6 flex-1 overflow-y-auto max-h-[400px]">
                {/* Activity 1 */}
                <div className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-lg">check_circle</span>
                    </div>
                    <div className="w-px h-full bg-outline-variant mt-2"></div>
                  </div>
                  <div className="pb-6">
                    <p className="text-sm font-bold text-on-surface">Payment Successful</p>
                    <p className="text-xs text-on-surface-variant mb-2">Aug 01, 2024 • 09:42 AM</p>
                    <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant/30">
                      <p className="text-xs font-data-mono text-primary font-bold">$3,250.00 Paid via Autopay</p>
                    </div>
                  </div>
                </div>
                {/* Activity 2 */}
                <div className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-lg">schedule</span>
                    </div>
                    <div className="w-px h-full bg-outline-variant mt-2"></div>
                  </div>
                  <div className="pb-6">
                    <p className="text-sm font-bold text-on-surface">Maintenance Visit Scheduled</p>
                    <p className="text-xs text-on-surface-variant mb-2">Today • 02:15 PM</p>
                    <p className="text-xs text-on-surface-variant italic">"Plumber confirmed for Sep 28 at 10:00 AM."</p>
                  </div>
                </div>
                {/* Activity 3 */}
                <div className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-tertiary-container/20 flex items-center justify-center text-on-tertiary-container group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-lg">notifications</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-surface">New Document Uploaded</p>
                    <p className="text-xs text-on-surface-variant mb-2">Yesterday • 11:30 AM</p>
                    <p onClick={() => navigate('/tenant/lease')} className="text-xs text-primary font-medium hover:underline cursor-pointer">Annual Safety Certificate 2024.pdf</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-surface-container-low text-center">
                <button onClick={() => navigate('/tenant/payments')} className="text-xs font-bold text-primary uppercase tracking-widest hover:brightness-75 transition-all cursor-pointer">View All Activity</button>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/tenant/payments" className="p-6 bg-white border border-outline-variant rounded-xl flex items-center gap-4 hover:border-primary hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">account_balance_wallet</span>
              </div>
              <div>
                <p className="font-bold text-sm">Payment Methods</p>
                <p className="text-xs text-on-surface-variant">Manage cards &amp; bank accounts</p>
              </div>
            </Link>
            <Link to="/tenant/settings" className="p-6 bg-white border border-outline-variant rounded-xl flex items-center gap-4 hover:border-primary hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">verified_user</span>
              </div>
              <div>
                <p className="font-bold text-sm">Insurance Info</p>
                <p className="text-xs text-on-surface-variant">Update tenant insurance policy</p>
              </div>
            </Link>
            <Link to="/tenant/lease" className="p-6 bg-white border border-outline-variant rounded-xl flex items-center gap-4 hover:border-primary hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">folder_shared</span>
              </div>
              <div>
                <p className="font-bold text-sm">Document Center</p>
                <p className="text-xs text-on-surface-variant">Leases, receipts, and forms</p>
              </div>
            </Link>
            <a href="mailto:support@rentflow.ng" className="p-6 bg-white border border-outline-variant rounded-xl flex items-center gap-4 hover:border-primary hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">forum</span>
              </div>
              <div>
                <p className="font-bold text-sm">Contact Support</p>
                <p className="text-xs text-on-surface-variant">24/7 emergency concierge</p>
              </div>
            </a>
          </section>
    </div>
  );
};

export default TenantDashboard;
