import { useState } from 'react';
import { NavLink, useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, CreditCard, History, Receipt, FileText,
  Wrench, User, Settings, LogOut, Menu, X, Bell, PlusCircle, HelpCircle, Search
} from 'lucide-react';
import useAuthStore from '../../store/authStore';
import useUIStore from '../../store/uiStore';
import { logout as authLogout } from '../../services/authService';
import Avatar from '../ui/Avatar';

// Exact brand logo mark matching Image 1
export const TenantLogoMark = () => (
  <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <rect width="42" height="42" rx="12" fill="#B84B14" />
    <path d="M13 29V17L21 12L29 17V29H13Z" fill="#FCD34D" fillOpacity="0.25" />
    <path d="M13 29V17L21 12L29 17V29" stroke="#FDE68A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17 29V23H25V29" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="19" y="16" width="4" height="4" rx="0.5" fill="#FFFFFF" />
  </svg>
);

const tenantNavItems = [
  { href: '/tenant/dashboard', icon: LayoutDashboard, label: 'DASHBOARD' },
  { href: '/tenant/pay-rent', icon: CreditCard, label: 'PAY RENT' },
  { href: '/tenant/payments', icon: History, label: 'PAYMENT HISTORY' },
  { href: '/tenant/receipts', icon: Receipt, label: 'RECEIPTS' },
  { href: '/tenant/maintenance', icon: Wrench, label: 'MAINTENANCE' },
  { href: '/tenant/lease', icon: FileText, label: 'LEASE DETAILS' },
  { href: '/tenant/profile', icon: User, label: 'PROFILE' },
];

const SidebarContent = ({ onClose, location, handleLogout, navigate }) => (
  <div className="flex flex-col h-full max-h-screen bg-[#04332C] text-[#FAF7F2] overflow-hidden select-none px-4 py-4">
    {/* Branding Header */}
    <div className="flex items-center justify-between pb-3 shrink-0 px-1">
      <Link to="/tenant/dashboard" className="flex items-center gap-3 min-w-0" onClick={onClose} aria-label="Tenant Portal dashboard">
        <TenantLogoMark />
        <div className="flex flex-col shrink-0">
          <span className="font-display font-black text-xl leading-none text-white tracking-tight">RentFlow</span>
          <span className="text-[9px] font-extrabold text-[#3D8E7C] tracking-widest mt-1 block">TENANT PORTAL</span>
        </div>
      </Link>
      {onClose && (
        <button onClick={onClose} aria-label="Close menu" className="lg:hidden text-white/60 hover:text-white shrink-0 cursor-pointer">
          <X size={20} />
        </button>
      )}
    </div>

    {/* Navigation List - Optimized spacing to fit all 7 items visible without scrollbars */}
    <nav className="flex-1 space-y-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-1" aria-label="Tenant navigation">
      {tenantNavItems.map(({ href, icon: Icon, label }) => {
        const isActive = location.pathname === href || (href === '/tenant/profile' && location.pathname === '/tenant/settings');
        
        return (
          <Link
            key={label}
            to={href}
            onClick={onClose}
            className={[
              'relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-150 text-xs tracking-wider font-extrabold group shrink-0',
              isActive
                ? 'bg-[#9B3A0E] text-white shadow-md'
                : 'text-[#338474] hover:text-white hover:bg-white/5',
            ].join(' ')}
          >
            {isActive && (
              <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-4 bg-white/90 rounded-full" aria-hidden="true" />
            )}
            <Icon
              size={17}
              aria-hidden="true"
              className={isActive ? 'text-white shrink-0' : 'text-[#338474] group-hover:text-white transition-colors shrink-0'}
            />
            <span className="truncate">{label}</span>
          </Link>
        );
      })}
    </nav>

    {/* Bottom Section - Action Button & Links */}
    <div className="mt-auto pt-2 space-y-2.5 shrink-0 px-0.5">
      <button
        onClick={() => {
          if (onClose) onClose();
          navigate('/tenant/maintenance?new=true');
        }}
        className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-[#FF8C5A] hover:bg-[#ff7a40] text-[#2D1404] font-black text-xs shadow-md transition-all active:scale-[0.98] cursor-pointer shrink-0 uppercase tracking-wider"
      >
        <PlusCircle size={16} strokeWidth={2.5} />
        <span>Report Issue</span>
      </button>

      <div className="space-y-0.5 pt-0.5 shrink-0">
        <Link
          to="/tenant/settings"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#338474] hover:text-white hover:bg-white/5 transition-colors"
        >
          <Settings size={16} />
          <span>Settings</span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#338474] hover:text-white hover:bg-white/5 transition-colors cursor-pointer text-left"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  </div>
);

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

  const getSearchPlaceholder = (path) => {
    if (path.includes('maintenance')) return 'Search maintenance tickets...';
    if (path.includes('receipts') || path.includes('payments')) return 'Search receipts...';
    return 'Search invoices, requests...';
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex font-sans text-gray-900 overflow-x-hidden">
      {/* Desktop sidebar - Fixed width 250px, no scrolling */}
      <aside className="hidden lg:flex flex-col fixed inset-y-0 left-0 z-30 w-[250px] bg-[#04332C] border-r border-white/5 shadow-2xl h-screen overflow-hidden" aria-label="Sidebar navigation">
        <SidebarContent onClose={undefined} location={location} handleLogout={handleLogout} navigate={navigate} />
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
              className="fixed inset-y-0 left-0 z-50 w-[250px] lg:hidden shadow-2xl bg-[#04332C] h-screen overflow-hidden"
              initial={{ x: -250 }}
              animate={{ x: 0 }}
              exit={{ x: -250 }}
              transition={{ type: 'tween', duration: 0.25 }}
              aria-label="Mobile sidebar navigation"
            >
              <SidebarContent onClose={() => setMobileSidebarOpen(false)} location={location} handleLogout={handleLogout} navigate={navigate} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
      {/* Content wrapper */}
      <div className="flex flex-col flex-1 min-w-0 transition-[margin-left] duration-300 lg:ml-[250px] min-h-screen">
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
              <div className="relative w-full max-w-[440px] flex items-center bg-white border border-gray-200/80 rounded-full h-11 px-4 shadow-2xs focus-within:ring-2 focus-within:ring-[#04332C]/20 transition-all">
                <Search size={18} className="text-gray-400 mr-3 shrink-0" />
                <input
                  type="text"
                  placeholder={getSearchPlaceholder(location.pathname)}
                  className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Actions Right matching design screenshot */}
            <div className="flex items-center gap-4 sm:gap-6 shrink-0">
              {location.pathname.includes('receipts') ? (
                <div className="hidden sm:flex flex-col text-right mr-1">
                  <span className="text-sm font-bold text-gray-900 leading-tight">Alex Thompson</span>
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">UNIT 402B</span>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2 bg-[#FEE2E2]/70 text-[#9A3412] border border-[#FCA5A5]/40 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-[#EA580C]" />
                  UNIT 402 • ACTIVE LEASE
                </div>
              )}

              <button
                onClick={() => navigate('/tenant/notifications')}
                className="p-2 hover:text-black text-gray-600 transition-colors cursor-pointer relative rounded-full hover:bg-gray-100 border border-gray-200/80 bg-white shadow-2xs"
                aria-label="Notifications"
              >
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#C75B30] rounded-full ring-2 ring-white" />
              </button>

              <button
                onClick={() => navigate('/tenant/settings')}
                className="p-2 hover:text-black text-gray-600 transition-colors cursor-pointer rounded-full hover:bg-gray-100 border border-gray-200/80 bg-white shadow-2xs hidden sm:block"
                aria-label="Help"
              >
                <HelpCircle size={18} />
              </button>

              {/* User Avatar */}
              <div className="flex items-center gap-3 cursor-pointer ml-1" onClick={() => navigate('/tenant/settings')}>
                <Avatar name={user?.name || 'Alex Thompson'} size="md" className="shadow-xs ring-2 ring-white" />
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


