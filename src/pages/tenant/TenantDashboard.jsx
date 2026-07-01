import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { logout as authLogout } from '../../services/authService';
import { downloadAnnualReportDoc } from '../../utils/documentGenerator';
import Modal from '../../components/ui/Modal';

const TenantDashboard = () => {
  const { user, clearUser } = useAuthStore();
  const navigate = useNavigate();
  const [showContactModal, setShowContactModal] = useState(false);
  const tenantName = user?.name?.split(' ')[0] || 'Ayo';

  const handleDownloadAnnualReport = () => {
    downloadAnnualReportDoc();
  };

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
              <h1 className="text-2xl font-bold text-gray-900">Good morning, {tenantName}</h1>
              <p className="text-base text-[#4A4F4C] mt-1">Here's what's happening with your property today.</p>
            </div>
            <div className="flex gap-2">
              <button onClick={handleDownloadAnnualReport} className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-primary font-bold text-xs hover:bg-gray-50 transition-colors cursor-pointer">Download Annual Report</button>
            </div>
          </section>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-12 gap-6">
            {/* Rent Summary Card (Primary Focus) */}
            <div className="col-span-12 lg:col-span-7 bg-white rounded-xl p-6 border border-gray-200/80 card-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full -mr-24 -mt-24 transition-transform duration-700 group-hover:scale-110"></div>
              <div className="relative flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-primary [font-variation-settings:'FILL'_1]">payments</span>
                    <h2 className="text-sm font-semibold uppercase text-gray-800 tracking-wider m-0">Rent Summary</h2>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-end gap-6">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Total Rent Due</p>
                      <p className="text-5xl font-extrabold font-display text-primary m-0">₦3,250,000</p>
                    </div>
                    <div className="pb-2">
                      <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-[10px] uppercase font-bold tracking-tight border border-amber-200">Due in 4 days</span>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex flex-col md:flex-row items-center gap-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-surface-container rounded-lg flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">calendar_today</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 m-0">Next Payment</p>
                      <p className="text-base font-bold text-gray-900 m-0">Jul 01, 2026</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-surface-container rounded-lg flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">auto_stories</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 m-0">Method</p>
                      <p className="text-base font-bold text-gray-900 m-0">Autopay (•••• 4928)</p>
                    </div>
                  </div>
                  <div className="md:ml-auto w-full md:w-auto">
                    <button onClick={() => navigate('/tenant/pay-rent')} className="w-full md:w-auto bg-[#ff9973] text-[#380d00] font-bold px-8 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all cursor-pointer border-none">Pay Now</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Lease Snapshot */}
            <div className="col-span-12 lg:col-span-5 bg-white rounded-xl p-6 border border-gray-200/80 card-shadow flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary [font-variation-settings:'FILL'_1]">home</span>
                    <h2 className="text-sm font-semibold uppercase text-gray-800 tracking-wider m-0">Lease Snapshot</h2>
                  </div>
                  <button onClick={() => navigate('/tenant/lease')} className="text-primary hover:underline text-sm font-semibold cursor-pointer border-none bg-transparent">View Full Lease</button>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Property Address</p>
                    <p className="text-xl font-bold text-gray-900 leading-tight m-0">Victoria Island Towers, Suite 402, Lagos, Nigeria</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <p className="text-xs text-gray-500 m-0 mb-1">Start Date</p>
                      <p className="font-mono text-sm font-bold text-primary m-0">Jan 01, 2026</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <p className="text-xs text-gray-500 m-0 mb-1">End Date</p>
                      <p className="font-mono text-sm font-bold text-primary m-0">Dec 31, 2026</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between p-4 bg-[#072F29] rounded-xl text-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="material-symbols-outlined">support_agent</span>
                  </div>
                  <div>
                    <p className="text-xs text-white/70 m-0">Landlord Contact</p>
                    <p className="font-bold text-sm text-white m-0">Adeleke &amp; Co. Properties</p>
                  </div>
                </div>
                <button onClick={() => setShowContactModal(true)} className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer border-none bg-transparent text-white" title="Contact Landlord">
                  <span className="material-symbols-outlined">call</span>
                </button>
              </div>
            </div>

            {/* Maintenance Tracker */}
            <div className="col-span-12 lg:col-span-8 bg-white rounded-xl border border-gray-200/80 card-shadow overflow-hidden flex flex-col">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary [font-variation-settings:'FILL'_1]">build</span>
                  <h2 className="text-sm font-semibold uppercase text-gray-800 tracking-wider m-0">Maintenance Tracker</h2>
                </div>
                <button onClick={() => navigate('/tenant/maintenance')} className="flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all cursor-pointer border-none bg-transparent">
                  Request New <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>
              <div className="divide-y divide-gray-100 flex-1">
                {/* Item 1 */}
                <div onClick={() => navigate('/tenant/maintenance')} className="p-6 flex items-center justify-between hover:bg-gray-50/60 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                      <span className="material-symbols-outlined">plumbing</span>
                    </div>
                    <div>
                      <p className="font-bold text-base text-gray-900 m-0">Kitchen Sink Leak</p>
                      <p className="text-xs text-gray-500 m-0 mt-0.5">Request ID: #MT-84920 • Logged 2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider">Scheduled</span>
                      <p className="text-xs text-gray-500 m-0 mt-1">Tomorrow, 10:00 AM</p>
                    </div>
                    <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                  </div>
                </div>
                {/* Item 2 */}
                <div onClick={() => navigate('/tenant/maintenance')} className="p-6 flex items-center justify-between hover:bg-gray-50/60 transition-colors opacity-70 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600">
                      <span className="material-symbols-outlined">ac_unit</span>
                    </div>
                    <div>
                      <p className="font-bold text-base text-gray-900 m-0">AC Filter Replacement</p>
                      <p className="text-xs text-gray-500 m-0 mt-0.5">Request ID: #MT-84211 • Completed</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold uppercase tracking-wider">Resolved</span>
                      <p className="text-xs text-gray-500 m-0 mt-1">Jun 15, 2026</p>
                    </div>
                    <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="col-span-12 lg:col-span-4 bg-white rounded-xl border border-gray-200/80 card-shadow overflow-hidden flex flex-col">
              <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary [font-variation-settings:'FILL'_1]">history</span>
                  <h2 className="text-sm font-semibold uppercase text-gray-800 tracking-wider m-0">Recent Activity</h2>
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
                    <p className="text-sm font-bold text-gray-900 m-0">Payment Successful</p>
                    <p className="text-xs text-gray-500 m-0 mt-0.5 mb-2">Jun 01, 2026 • 09:42 AM</p>
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <p className="text-xs font-mono text-primary font-bold m-0">₦3,250,000 Paid via Autopay</p>
                    </div>
                  </div>
                </div>
                {/* Activity 2 */}
                <div className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-lg">schedule</span>
                    </div>
                    <div className="w-px h-full bg-gray-200 mt-2"></div>
                  </div>
                  <div className="pb-6">
                    <p className="text-sm font-bold text-gray-900 m-0">Maintenance Visit Scheduled</p>
                    <p className="text-xs text-gray-500 m-0 mt-0.5 mb-2">Today • 02:15 PM</p>
                    <p className="text-xs text-gray-600 italic m-0">"Plumber confirmed for Jul 02 at 10:00 AM."</p>
                  </div>
                </div>
                {/* Activity 3 */}
                <div className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-700 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-lg">notifications</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 m-0">New Document Uploaded</p>
                    <p className="text-xs text-gray-500 m-0 mt-0.5 mb-2">Yesterday • 11:30 AM</p>
                    <p onClick={() => navigate('/tenant/lease')} className="text-xs text-primary font-semibold hover:underline cursor-pointer m-0">Annual Safety Certificate 2026.pdf</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 text-center border-t border-gray-100">
                <button onClick={() => navigate('/tenant/payments')} className="text-xs font-bold text-primary uppercase tracking-widest hover:brightness-75 transition-all cursor-pointer border-none bg-transparent">View All Activity</button>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link to="/tenant/pay-rent" className="p-6 bg-white border border-gray-200/80 rounded-xl card-shadow flex items-center gap-4 hover:border-primary transition-all group">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">account_balance_wallet</span>
              </div>
              <div>
                <p className="font-bold text-sm text-gray-900 m-0">Payment Methods</p>
                <p className="text-xs text-gray-500 m-0 mt-0.5">Manage cards &amp; bank accounts</p>
              </div>
            </Link>
            <Link to="/tenant/lease" className="p-6 bg-white border border-gray-200/80 rounded-xl card-shadow flex items-center gap-4 hover:border-primary transition-all group">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">verified_user</span>
              </div>
              <div>
                <p className="font-bold text-sm text-gray-900 m-0">Insurance Info</p>
                <p className="text-xs text-gray-500 m-0 mt-0.5">Update tenant insurance policy</p>
              </div>
            </Link>
            <Link to="/tenant/receipts" className="p-6 bg-white border border-gray-200/80 rounded-xl card-shadow flex items-center gap-4 hover:border-primary transition-all group">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">folder_shared</span>
              </div>
              <div>
                <p className="font-bold text-sm text-gray-900 m-0">Document Center</p>
                <p className="text-xs text-gray-500 m-0 mt-0.5">Leases, receipts, and forms</p>
              </div>
            </Link>
            <Link to="/tenant/support" className="p-6 bg-white border border-gray-200/80 rounded-xl card-shadow flex items-center gap-4 hover:border-primary transition-all group">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">forum</span>
              </div>
              <div>
                <p className="font-bold text-sm text-gray-900 m-0">Contact Support</p>
                <p className="text-xs text-gray-500 m-0 mt-0.5">24/7 emergency concierge</p>
              </div>
            </Link>
          </section>

          {/* Landlord Contact Modal */}
          <Modal isOpen={showContactModal} onClose={() => setShowContactModal(false)} title="Contact Landlord & Concierge">
            <div className="space-y-4 text-[#1E293B]">
              <div className="p-4 bg-[#E6F2EF] rounded-xl border border-[#c4e3dc] flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#04332C] text-white flex items-center justify-center shrink-0 font-bold">
                  AC
                </div>
                <div>
                  <h4 className="font-black text-sm text-[#04332C] m-0">Adeleke & Co. Properties</h4>
                  <p className="text-xs text-gray-600 m-0 mt-0.5">Primary Property Management Office</p>
                </div>
              </div>
              <div className="space-y-3 pt-1 text-xs">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-500 font-bold">24/7 Telephone Hotline</span>
                  <a href="tel:+2348005550199" className="font-mono font-black text-[#04332C] hover:underline">+234 800 555 0199</a>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-500 font-bold">Emergency WhatsApp Desk</span>
                  <a href="https://wa.me/2348005550199" target="_blank" rel="noreferrer" className="font-mono font-black text-[#04332C] hover:underline">+234 800 555 0199</a>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-500 font-bold">Official Email Support</span>
                  <span className="font-bold text-gray-800">support@adelekeco.ng</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-500 font-bold">Office Location</span>
                  <span className="font-medium text-gray-800 text-right">Victoria Island Towers, Suite 101, Lagos</span>
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button onClick={() => setShowContactModal(false)} className="px-5 py-2 bg-[#04332C] text-white rounded-lg text-xs font-bold border-none cursor-pointer">Close</button>
              </div>
            </div>
          </Modal>
    </div>
  );
};

export default TenantDashboard;
