import { useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  Calendar, CreditCard, Wrench, ShieldCheck, ChevronRight,
  CheckCircle2, Clock, FileText, Phone, ArrowRight, Download,
  MessageSquare, Briefcase, Shield, Folder, HelpCircle
} from 'lucide-react';
import { getTenantDashboard } from '../../services/tenantService';
import useAuthStore from '../../store/authStore';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';

const TenantDashboard = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const { data: dashData, isLoading } = useQuery({
    queryKey: ['tenant-dashboard'],
    queryFn: getTenantDashboard,
  });

  const lease = dashData?.lease;
  const balanceAmount = 3250000; // ₦3,250,000.00 matching $3,250.00 localized in Nigerian context

  return (
    <div className="space-y-6 pb-12 relative">
      {/* Top Banner section */}
      <motion.div 
        initial={{ opacity: 0, y: 8 }} 
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-gray-900 tracking-tight">
            Good morning, {user?.name ? user.name.split(' ')[0] : 'Adaeze'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">Here's what's happening with your property today.</p>
        </div>

        <button 
          onClick={() => {}}
          className="hidden sm:inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-xl bg-white hover:bg-gray-50 text-gray-700 font-bold text-xs shadow-2xs transition-colors cursor-pointer"
        >
          Download Annual Report
        </button>
      </motion.div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Column 1 & 2: Rent Summary & Maintenance (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Rent Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <div className="bg-white border border-gray-200/80 rounded-2xl p-6 relative overflow-hidden shadow-2xs">
              {/* Top-Right Decorative Curve */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E6F0EE]/40 rounded-bl-full pointer-events-none -mr-4 -mt-4" />
              
              <div className="relative z-10">
                {/* Header label */}
                <div className="flex items-center gap-2 text-gray-400 font-black text-[11px] tracking-wider uppercase mb-4">
                  <CreditCard size={14} className="text-gray-400" />
                  <span>Rent Summary</span>
                </div>

                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Rent Due</p>
                <div className="flex items-baseline mt-1.5">
                  <span className="font-display font-black text-3xl sm:text-4xl text-[#072F29] tracking-tight">
                    {formatCurrency(balanceAmount)}
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#FEE2E2] text-[#B91C1C] ml-3.5 transform -translate-y-1">
                    DUE IN 4 DAYS
                  </span>
                </div>

                {/* Horizontal Separator */}
                <div className="border-b border-gray-100 my-6" />

                {/* Column details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 flex-shrink-0">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Next Payment</p>
                      <p className="text-sm font-black text-gray-900 mt-0.5">Oct 01, 2026</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 flex-shrink-0">
                      <CreditCard size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Method</p>
                      <p className="text-sm font-black text-gray-900 mt-0.5">Autopay (•••• 4928)</p>
                    </div>
                  </div>

                  <div className="sm:text-right pt-2 sm:pt-0">
                    <button
                      onClick={() => navigate('/tenant/pay-rent')}
                      className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#FFA57E] hover:bg-[#ff966b] text-[#7C2D12] font-black text-sm shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
                    >
                      Pay Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Maintenance Tracker Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-white border border-gray-200/80 rounded-2xl shadow-2xs overflow-hidden">
              <div className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-800 font-bold text-sm">
                  <Wrench size={18} className="text-gray-500" />
                  <span className="uppercase tracking-wider font-extrabold text-xs text-gray-500">Maintenance Tracker</span>
                </div>
                <Link to="/tenant/maintenance" className="inline-flex items-center gap-1.5 text-[#072F29] font-black text-xs hover:underline uppercase">
                  <span>Request New</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              {/* Table / List */}
              <div className="border-t border-gray-100 divide-y divide-gray-100">
                {/* Item 1 */}
                <div 
                  onClick={() => navigate('/tenant/maintenance')}
                  className="p-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#E6F4EA] flex items-center justify-center text-[#137333] flex-shrink-0">
                      <Wrench size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">Kitchen Sink Leak</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Request ID: #MT-84920 • Logged 2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#E6F4EA] text-[#137333] uppercase">
                        Scheduled
                      </span>
                      <p className="text-[10px] text-gray-500 font-medium mt-1">Tomorrow, 10:00 AM</p>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                </div>

                {/* Item 2 */}
                <div 
                  onClick={() => navigate('/tenant/maintenance')}
                  className="p-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 flex-shrink-0">
                      <Wrench size={18} className="rotate-90" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">AC Filter Replacement</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Request ID: #MT-84211 • Completed</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black bg-gray-100 text-gray-600 uppercase">
                        Resolved
                      </span>
                      <p className="text-[10px] text-gray-500 font-medium mt-1">Aug 15, 2026</p>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Column 3: Lease Snapshot & Recent Activity (1/3 width) */}
        <div className="space-y-6">
          
          {/* Lease Snapshot Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-2xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-gray-800 font-bold text-sm">
                  <ShieldCheck size={18} className="text-gray-500" />
                  <span className="uppercase tracking-wider font-extrabold text-xs text-gray-500">Lease Snapshot</span>
                </div>
                <Link to="/tenant/lease" className="text-[#072F29] font-black text-xs hover:underline uppercase">
                  View Full Lease
                </Link>
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-4">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Property Address</p>
                  <p className="text-sm font-black text-gray-900 mt-1 leading-snug">
                    Plot 63, Elgin Street, Ikeja GRA, Lagos, Nigeria
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-3">
                    <span className="text-[9px] font-bold text-gray-400 block uppercase">Start Date</span>
                    <span className="text-xs font-black text-gray-800 mt-1 block">Jan 12, 2025</span>
                  </div>
                  <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-3">
                    <span className="text-[9px] font-bold text-gray-400 block uppercase">End Date</span>
                    <span className="text-xs font-black text-gray-800 mt-1 block">Jan 11, 2027</span>
                  </div>
                </div>

                {/* Landlord Contact Card (Forest Green background) */}
                <div className="bg-[#072F29] rounded-2xl p-4 flex items-center justify-between text-white shadow-2xs mt-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white flex-shrink-0">
                      <Phone size={16} />
                    </div>
                    <div>
                      <p className="text-[9px] font-semibold text-[#F4C395] uppercase tracking-wider leading-none">Landlord Contact</p>
                      <p className="text-xs font-black text-white mt-1.5 leading-none">
                        {user?.landlordName || 'Chidi Amaechi'}
                      </p>
                    </div>
                  </div>
                  <a 
                    href={`tel:${user?.landlordPhone || '+234 802 123 4567'}`} 
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/80 hover:text-white"
                    aria-label="Call Landlord"
                  >
                    <Phone size={16} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recent Activity Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white border border-gray-200/80 rounded-2xl shadow-2xs overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <div className="flex items-center gap-2 text-gray-800 font-bold text-sm">
                  <Clock size={18} className="text-gray-500" />
                  <span className="uppercase tracking-wider font-extrabold text-xs text-gray-500">Recent Activity</span>
                </div>
              </div>

              {/* Activity Timeline */}
              <div className="p-5 relative">
                {/* Center line */}
                <div className="absolute left-9 top-6 bottom-6 w-0.5 bg-gray-100 z-0" />
                
                <div className="space-y-6 relative z-10">
                  {/* Activity Item 1 */}
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#E6F4EA] border-2 border-white flex items-center justify-center text-[#137333] flex-shrink-0 shadow-2xs">
                      <CheckCircle2 size={14} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline gap-2">
                        <h5 className="font-black text-xs text-gray-900">Payment Successful</h5>
                        <span className="text-[10px] text-gray-400 whitespace-nowrap">Aug 01, 2026</span>
                      </div>
                      <p className="text-[10px] text-gray-500 mt-0.5">09:42 AM</p>
                      <div className="bg-gray-50 border border-gray-100 rounded-lg p-2.5 mt-2">
                        <p className="font-mono text-[10px] font-black text-gray-700">
                          {formatCurrency(balanceAmount)} Paid via Autopay
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Activity Item 2 */}
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#E8F0FE] border-2 border-white flex items-center justify-center text-[#1A73E8] flex-shrink-0 shadow-2xs">
                      <Clock size={14} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline gap-2">
                        <h5 className="font-black text-xs text-gray-900">Maintenance Visit Scheduled</h5>
                        <span className="text-[10px] text-gray-400 whitespace-nowrap">Today</span>
                      </div>
                      <p className="text-[10px] text-gray-500 mt-0.5">02:15 PM</p>
                      <p className="text-[11px] text-gray-500 italic mt-1.5 leading-relaxed">
                        "Plumber confirmed for Sep 28 at 10:00 AM."
                      </p>
                    </div>
                  </div>

                  {/* Activity Item 3 */}
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#FEF7E0] border-2 border-white flex items-center justify-center text-[#B06000] flex-shrink-0 shadow-2xs">
                      <FileText size={14} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline gap-2">
                        <h5 className="font-black text-xs text-gray-900">New Document Uploaded</h5>
                        <span className="text-[10px] text-gray-400 whitespace-nowrap">Yesterday</span>
                      </div>
                      <p className="text-[10px] text-gray-500 mt-0.5">11:30 AM</p>
                      <div className="flex items-center gap-2 text-[10px] text-gray-600 hover:text-gray-900 hover:underline cursor-pointer mt-2 bg-gray-50/50 border border-gray-100 rounded-lg p-2">
                        <FileText size={12} className="text-gray-400" />
                        <span className="font-medium truncate">Annual Safety Certificate 2026.pdf</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer View All link */}
              <div className="border-t border-gray-100 p-3 bg-gray-50/40 text-center">
                <Link to="/tenant/payments" className="text-[11px] font-black text-gray-500 hover:text-gray-800 uppercase tracking-wider transition-colors">
                  View All Activity
                </Link>
              </div>
            </div>
          </motion.div>

        </div>

      </div>

      {/* Bottom Grid Nav: 4 Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        {/* Card 1 */}
        <Link 
          to="/tenant/payments"
          className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-2xs hover:shadow-sm hover:border-gray-300 transition-all group flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-[#E6F0EE] group-hover:text-[#072F29] flex-shrink-0 transition-colors">
            <CreditCard size={18} />
          </div>
          <div>
            <h4 className="font-bold text-sm text-gray-900 leading-snug">Payment Methods</h4>
            <p className="text-xs text-gray-400 mt-1 leading-normal">Manage cards & bank accounts</p>
          </div>
        </Link>

        {/* Card 2 */}
        <Link 
          to="/tenant/settings"
          className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-2xs hover:shadow-sm hover:border-gray-300 transition-all group flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-[#E6F0EE] group-hover:text-[#072F29] flex-shrink-0 transition-colors">
            <ShieldCheck size={18} />
          </div>
          <div>
            <h4 className="font-bold text-sm text-gray-900 leading-snug">Insurance Info</h4>
            <p className="text-xs text-gray-400 mt-1 leading-normal">Update tenant insurance policy</p>
          </div>
        </Link>

        {/* Card 3 */}
        <Link 
          to="/tenant/lease"
          className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-2xs hover:shadow-sm hover:border-gray-300 transition-all group flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-[#E6F0EE] group-hover:text-[#072F29] flex-shrink-0 transition-colors">
            <Folder size={18} />
          </div>
          <div>
            <h4 className="font-bold text-sm text-gray-900 leading-snug">Document Center</h4>
            <p className="text-xs text-gray-400 mt-1 leading-normal">Leases, receipts, and forms</p>
          </div>
        </Link>

        {/* Card 4 */}
        <a 
          href="mailto:support@rentflow.ng"
          className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-2xs hover:shadow-sm hover:border-gray-300 transition-all group flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-[#E6F0EE] group-hover:text-[#072F29] flex-shrink-0 transition-colors">
            <MessageSquare size={18} />
          </div>
          <div>
            <h4 className="font-bold text-sm text-gray-900 leading-snug">Contact Support</h4>
            <p className="text-xs text-gray-400 mt-1 leading-normal">24/7 emergency concierge</p>
          </div>
        </a>
      </motion.div>

      {/* Floating message icon in bottom-right corner */}
      <div className="fixed bottom-6 right-6 z-40">
        <a 
          href="mailto:support@rentflow.ng"
          className="w-12 h-12 bg-[#072F29] hover:bg-[#0b4f45] text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Contact Concierge Support"
        >
          <MessageSquare size={20} className="fill-white" />
        </a>
      </div>
    </div>
  );
};

export default TenantDashboard;
