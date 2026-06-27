import { useState } from 'react';
import { NavLink, useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, CreditCard, History, FileText,
  Wrench, User, Settings, LogOut, MessageSquare, Menu, X, Bell, Grid, Plus, HelpCircle, Search, Building
} from 'lucide-react';
import useAuthStore from '../../store/authStore';
import useUIStore from '../../store/uiStore';
import { logout as authLogout } from '../../services/authService';
import Avatar from '../ui/Avatar';

// Red-coral Tenant brand logo mark
export const TenantLogoMark = () => (
  <svg width="32" height="32" viewBox="0 0 28 28" fill="none" aria-hidden="true" className="shrink-0">
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
  { href: '/tenant/maintenance', icon: Wrench, label: 'Maintenance' },
  { href: '/tenant/lease', icon: FileText, label: 'Lease Details' },
  { href: '/tenant/settings', icon: User, label: 'Profile' },
];

/**
 * SidebarContent declared outside so React does not remount DOM tree on route transitions.
 */
const SidebarContent = ({ onClose, location, handleLogout }) => (
  <div className="flex flex-col h-full bg-[#072F29] text-[#FAF7F2] overflow-hidden select-none">
    {/* Branding */}
    <div className="flex items-center justify-between px-5 pt-6 pb-4 shrink-0 border-b border-white/5">
      <Link to="/tenant/dashboard" className="flex items-center gap-3 min-w-0" onClick={onClose} aria-label="Tenant Portal dashboard">
        <TenantLogoMark />
        <div className="flex flex-col shrink-0">
          <span className="font-display font-black text-xl leading-none text-white tracking-tight">RentFlow</span>
          <span className="text-[9px] font-black text-[#F4C395] tracking-widest mt-1.5 block">TENANT PORTAL</span>
        </div>
      </Link>
      {onClose && (
        <button onClick={onClose} aria-label="Close menu" className="lg:hidden text-white/60 hover:text-white shrink-0 cursor-pointer">
          <X size={20} />
        </button>
      )}
    </div>

    {/* Property Info Switcher (matching screenshot 2 style) */}
    <div className="px-4 py-3 mx-3 mt-3 bg-white/5 rounded-xl border border-white/10 flex items-center gap-3 shrink-0">
      <div className="w-9 h-9 rounded-lg bg-[#9A3412] flex items-center justify-center text-white shrink-0 shadow-sm">
        <Building size={18} />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-bold text-white truncate">Green Valley Apts</p>
        <p className="text-[10px] font-semibold text-[#FAF7F2]/60 truncate">Unit 402 • Ikeja GRA</p>
      </div>
    </div>

    {/* Nav List */}
    <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto" aria-label="Tenant navigation">
      {tenantNavItems.map(({ href, icon: Icon, label }) => {
        const isActive = location.pathname === href;
        
        return (
          <Link
            key={label}
            to={href}
            onClick={onClose}
            className={[
              'relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-150 text-sm font-medium group overflow-hidden',
              isActive
                ? 'bg-[#0B4F45] text-white font-bold shadow-sm'
                : 'text-[#FAF7F2]/75 hover:text-white hover:bg-white/6',
            ].join(' ')}
          >
            {isActive && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[#C75B30] rounded-r" aria-hidden="true" />
            )}
            <Icon
              size={18}
              aria-hidden="true"
              className={isActive ? 'text-[#F4C395]' : 'text-[#FAF7F2]/65 group-hover:text-white transition-colors'}
            />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>

    {/* Issue Button & Bottom Actions */}
    <div className="p-4 mt-auto space-y-4 shrink-0 border-t border-white/10 bg-[#062823]">
      <Link
        to="/tenant/pay-rent"
        onClick={onClose}
        className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-[#C75B30] hover:bg-[#b54f27] text-white font-black text-xs uppercase tracking-wider shadow-md transition-all active:scale-[0.98]"
      >
        <span>Pay Rent Now</span>
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
          className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-semibold text-[#FAF7F2]/70 hover:text-white hover:bg-white/5 transition-colors cursor-pointer text-left"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  </div>
);

/**
 * TenantLayout — Forest Teal Sidebar navigation layout with dynamic top bar and mobile menu.
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

  const isPayRentPage = location.pathname === '/tenant/pay-rent';
  const isPaymentsPage = location.pathname === '/tenant/payments';

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex font-sans text-gray-900 overflow-x-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col fixed inset-y-0 left-0 z-30 w-[240px] bg-[#072F29] border-r border-white/5 shadow-xl" aria-label="Sidebar navigation">
        <SidebarContent onClose={undefined} location={location} handleLogout={handleLogout} />
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
              className="fixed inset-y-0 left-0 z-50 w-[240px] lg:hidden shadow-2xl bg-[#072F29]"
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: 'tween', duration: 0.25 }}
              aria-label="Mobile sidebar navigation"
            >
              <SidebarContent onClose={() => setMobileSidebarOpen(false)} location={location} handleLogout={handleLogout} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Content wrapper */}
      <div className="flex flex-col flex-1 min-w-0 transition-[margin-left] duration-300 lg:ml-[240px] min-h-screen">
        <div className="px-6 lg:px-10 max-w-[1440px] mx-auto w-full flex flex-col flex-1">
          {/* Dynamic Top Bar */}
          <header className="flex items-center justify-between pt-6 pb-5 bg-transparent gap-4 border-b border-gray-200/80 mb-8 shrink-0 relative">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <button
                className="lg:hidden p-2 text-gray-600 hover:text-black rounded-lg transition-colors focus-visible:outline-none shrink-0 cursor-pointer"
                onClick={() => setMobileSidebarOpen(true)}
                aria-label="Open navigation"
              >
                <Menu size={22} />
              </button>

              {/* Dynamic Left Content */}
              {isPayRentPage ? (
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight font-display truncate">Pay Rent</h1>
              ) : isPaymentsPage ? (
                <div className="flex items-center gap-6 min-w-0">
                  <span className="font-display font-bold text-lg sm:text-xl text-gray-900 tracking-tight shrink-0">TenantPortal</span>
                  <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-500">
                    <span className="text-gray-900 font-bold cursor-pointer">Home</span>
                    <span className="hover:text-gray-900 cursor-pointer transition-colors">Benefits</span>
                    <span className="hover:text-gray-900 cursor-pointer transition-colors">Community</span>
                  </nav>
                </div>
              ) : (
                <div className="relative w-full max-w-[420px] flex items-center bg-white border border-gray-200/80 rounded-xl h-10 px-3.5 shadow-2xs focus-within:ring-2 focus-within:ring-[#072F29]/20 transition-all">
                  <Search size={16} className="text-gray-400 mr-2.5 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search invoices, requests..."
                    className="w-full bg-transparent text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
                  />
                </div>
              )}
            </div>

            {/* Center Search for Payments page */}
            {isPaymentsPage && (
              <div className="hidden lg:flex relative w-64 items-center bg-gray-100/80 rounded-full h-9 px-4 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#072F29]/20 border border-transparent focus-within:border-gray-200 transition-all">
                <Search size={15} className="text-gray-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="w-full bg-transparent text-xs text-gray-800 placeholder-gray-500 focus:outline-none"
                />
              </div>
            )}

            {/* Actions Right */}
            <div className="flex items-center gap-4 sm:gap-6 shrink-0">
              <button
                onClick={() => navigate('/tenant/notifications')}
                className="p-1.5 hover:text-black text-gray-600 transition-colors cursor-pointer relative rounded-lg hover:bg-gray-100"
                aria-label="Notifications"
              >
                <Bell size={19} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#C75B30] rounded-full ring-2 ring-[#FAF7F2]" />
              </button>

              <button
                onClick={() => navigate('/tenant/settings')}
                className="p-1.5 hover:text-black text-gray-600 transition-colors cursor-pointer rounded-lg hover:bg-gray-100 hidden sm:block"
                aria-label="Help"
              >
                <HelpCircle size={19} />
              </button>

              <div className="h-6 w-px bg-gray-200 hidden sm:block" />

              <button
                onClick={() => navigate('/tenant/pay-rent')}
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-[#072F29] hover:bg-[#0b4f45] text-white font-extrabold text-xs tracking-wider shadow-sm transition-all active:scale-[0.98] cursor-pointer"
              >
                Make Payment
              </button>

              {/* User Avatar */}
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/tenant/settings')}>
                <Avatar name={user?.name || 'Dianne Russell'} size="sm" className="shadow-xs ring-2 ring-white" />
              </div>
            </div>
          </header>

          <motion.main
            className="flex-1 pt-1 pb-12"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Outlet />
          </motion.main>
        </div>
      </div>
    </div>
  );
};

export default TenantLayout;

