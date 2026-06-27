import { useState } from 'react';
import { NavLink, useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, CreditCard, History, FileText,
  Wrench, User, Settings, LogOut, MessageSquare, Menu, X, Bell, Grid, Plus, HelpCircle
} from 'lucide-react';
import useAuthStore from '../../store/authStore';
import useUIStore from '../../store/uiStore';
import { logout as authLogout } from '../../services/authService';
import Avatar from '../ui/Avatar';

// Red-coral Tenant brand logo mark
export const TenantLogoMark = () => (
  <svg width="32" height="32" viewBox="0 0 28 28" fill="none" aria-hidden="true" className="flex-shrink-0">
    <rect width="28" height="28" rx="6" fill="#9A3412" />
    <path
      d="M8 20V12l6-4 6 4v8"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11 20v-4h6v4"
      stroke="#FCA5A5"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const tenantNavItems = [
  { href: '/tenant/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/tenant/pay-rent', icon: CreditCard, label: 'Pay Rent' },
  { href: '/tenant/payments', icon: History, label: 'Payment History' },
  { href: '/tenant/payments?filter=receipts', icon: FileText, label: 'Receipts' },
  { href: '/tenant/maintenance', icon: Wrench, label: 'Maintenance' },
  { href: '/tenant/lease', icon: FileText, label: 'Lease Details' },
  { href: '/tenant/settings', icon: User, label: 'Profile' },
];

/**
 * TenantLayout — Forest Teal Sidebar navigation layout with desktop top bar and mobile menu.
 */
const TenantLayout = () => {
  const { user, clearUser } = useAuthStore();
  const { mobileSidebarOpen, setMobileSidebarOpen } = useUIStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    setMobileSidebarOpen(false);
    await authLogout();
    clearUser();
    navigate('/login');
  };

  const SidebarContent = ({ onClose }) => (
    <div className="flex flex-col h-full bg-[#072F29] text-[#FAF7F2] overflow-hidden">
      {/* Branding */}
      <div className="flex items-center justify-between px-5 pt-6 pb-4 flex-shrink-0">
        <Link to="/tenant/dashboard" className="flex items-center gap-3 min-w-0" onClick={onClose} aria-label="Tenant Portal dashboard">
          <TenantLogoMark />
          <div className="flex flex-col flex-shrink-0">
            <span className="font-display font-black text-xl leading-none text-white tracking-tight">RentFlow</span>
            <span className="text-[9px] font-black text-[#F4C395] tracking-widest mt-1.5 block">TENANT PORTAL</span>
          </div>
        </Link>
        {onClose && (
          <button onClick={onClose} aria-label="Close menu" className="lg:hidden text-white/60 hover:text-white flex-shrink-0 cursor-pointer">
            <X size={20} />
          </button>
        )}
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto" aria-label="Tenant navigation">
        {tenantNavItems.map(({ href, icon: Icon, label }) => {
          const isActive = location.pathname + location.search === href || 
            (href.startsWith('/tenant/payments') && location.pathname === '/tenant/payments');
          
          return (
            <Link
              key={label}
              to={href}
              onClick={onClose}
              className={[
                'relative flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-150 text-sm font-medium group overflow-hidden',
                isActive
                  ? 'bg-[#9A3412] text-white font-bold shadow-sm'
                  : 'text-[#FAF7F2]/75 hover:text-white hover:bg-white/6',
              ].join(' ')}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-white rounded-r" aria-hidden="true" />
              )}
              <Icon
                size={18}
                aria-hidden="true"
                className={isActive ? 'text-white' : 'text-[#FAF7F2]/65 group-hover:text-white transition-colors'}
              />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Issue Button & Bottom Actions */}
      <div className="p-4 mt-auto space-y-4 flex-shrink-0 border-t border-white/10">
        <Link
          to="/tenant/maintenance"
          onClick={onClose}
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-full bg-[#FCA5A5] hover:bg-[#fca5a5]/95 text-[#7C2D12] font-black text-sm shadow-sm transition-all active:scale-[0.98]"
        >
          <Plus size={18} strokeWidth={2.5} />
          <span>Report Issue</span>
        </Link>

        <div className="space-y-1 pt-1">
          <Link
            to="/tenant/settings"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-semibold text-[#FAF7F2]/70 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Settings size={16} />
            <span>Settings</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-semibold text-[#FAF7F2]/70 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex font-sans text-gray-900">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 z-30 w-[230px] bg-[#072F29] border-r border-white/5" aria-label="Sidebar navigation">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              className="fixed left-0 top-0 bottom-0 z-50 w-[230px] lg:hidden shadow-2xl"
              initial={{ x: -230 }}
              animate={{ x: 0 }}
              exit={{ x: -230 }}
              transition={{ type: 'tween', duration: 0.25 }}
              aria-label="Mobile sidebar navigation"
            >
              <SidebarContent onClose={() => setMobileSidebarOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Content wrapper */}
      <div className="flex flex-col flex-1 min-w-0 transition-[margin-left] duration-300 lg:ml-[230px] min-h-screen">
        <div className="px-6 lg:px-8 max-w-[1400px] mx-auto w-full flex flex-col flex-1">
          {/* Top Bar matching screenshot style */}
          <header className="flex items-center justify-between pt-5 pb-4 bg-transparent gap-4 border-b border-gray-200/80 mb-6 flex-shrink-0 relative">
            <div className="flex items-center gap-3 flex-1 max-w-[420px]">
              <button
                className="lg:hidden p-2 text-gray-600 hover:text-black rounded-lg transition-colors focus-visible:outline-none"
                onClick={() => setMobileSidebarOpen(true)}
                aria-label="Open navigation"
              >
                <Menu size={22} />
              </button>

              {/* Search Bar */}
              <div className="relative w-full flex items-center bg-white border border-gray-200/80 rounded-xl h-10 px-3.5 shadow-2xs focus-within:ring-2 focus-within:ring-[#0B4F45]/20 transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mr-2.5 flex-shrink-0"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <input
                  type="text"
                  placeholder="Search invoices, requests..."
                  className="w-full bg-transparent text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-5 flex-shrink-0">
              <button
                onClick={() => navigate('/tenant/notifications')}
                className="p-1 hover:text-black text-gray-600 transition-colors cursor-pointer relative"
                aria-label="Notifications"
              >
                <Bell size={18} />
                <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-[#C75B30] rounded-full" />
              </button>

              <button
                onClick={() => navigate('/tenant/settings')}
                className="p-1 hover:text-black text-gray-600 transition-colors cursor-pointer"
                aria-label="Messages"
              >
                <MessageSquare size={18} />
              </button>

              <div className="h-6 w-px bg-gray-200 hidden sm:block" />

              <Link
                to="/resources"
                className="text-xs font-black text-gray-500 hover:text-gray-900 tracking-wider hidden sm:block uppercase"
              >
                Help
              </Link>

              <button
                onClick={() => navigate('/tenant/pay-rent')}
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-[#072F29] hover:bg-[#0b4f45] text-white font-black text-xs tracking-wider shadow-sm transition-all active:scale-[0.98] uppercase cursor-pointer"
              >
                Make Payment
              </button>

              <div className="h-8 w-px bg-gray-200 hidden sm:block" />

              {/* User Avatar */}
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/tenant/settings')}>
                <Avatar name={user?.name || 'Dianne Russell'} size="sm" className="shadow-2xs" />
              </div>
            </div>
          </header>

          <motion.main
            className="flex-1 pt-1 pb-8"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.main>
        </div>
      </div>
    </div>
  );
};

export default TenantLayout;
