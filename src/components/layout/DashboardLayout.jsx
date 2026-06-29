import { useState } from 'react';
import { NavLink, useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '../../store/authStore';
import useUIStore from '../../store/uiStore';
import { logout as authLogout } from '../../services/authService';
import { LogoMark } from './Navbar';
import {
  LayoutDashboard, CreditCard, History, Receipt,
  Wrench, FileText, User, Settings, AlertTriangle, LogOut,
  ChevronLeft, ChevronRight
} from 'lucide-react';

const tenantNavItems = [
  { href: '/tenant/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/tenant/pay-rent', icon: CreditCard, label: 'Pay Rent' },
  { href: '/tenant/payments', icon: History, label: 'Payment History' },
  { href: '/tenant/receipts', icon: Receipt, label: 'Receipts' },
  { href: '/tenant/maintenance', icon: Wrench, label: 'Maintenance' },
  { href: '/tenant/lease', icon: FileText, label: 'Lease Details' },
  { href: '/tenant/profile', icon: User, label: 'Profile' },
  { href: '/tenant/settings', icon: Settings, label: 'Settings' },
];

const SidebarContent = ({ onClose, location, handleLogout, navigate, sidebarCollapsed, toggleSidebar }) => (
  <div className="flex flex-col h-full bg-[#00372f] text-white py-4 select-none overflow-hidden">
    {/* Branding Header */}
    <div className={`flex items-center justify-between px-5 mb-5 shrink-0 ${sidebarCollapsed ? 'justify-center px-2' : ''}`}>
      {!sidebarCollapsed && (
        <Link to="/tenant/dashboard" onClick={onClose} className="flex items-center gap-3 min-w-0" aria-label="RentFlow dashboard">
          <LogoMark />
          <div className="flex flex-col shrink-0">
            <h1 className="text-xl font-bold text-white leading-tight">RentFlow</h1>
            <p className="text-[11px] font-semibold text-[#84bfb2] opacity-80 uppercase tracking-widest">Tenant Portal</p>
          </div>
        </Link>
      )}
      {sidebarCollapsed && (
        <Link to="/tenant/dashboard" onClick={onClose} aria-label="RentFlow dashboard" className="mx-auto">
          <LogoMark />
        </Link>
      )}
      {/* Desktop collapse toggle */}
      <button
        onClick={onClose || toggleSidebar}
        aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className="hidden lg:flex items-center justify-center w-6 h-6 rounded text-white/50 hover:text-white hover:bg-white/10 transition-colors ml-1 shrink-0 cursor-pointer"
      >
        {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </div>

    {/* Navigation List matching landlord dashboard styling */}
    <nav className="flex-1 space-y-1 px-3.5 overflow-y-auto [&::-webkit-scrollbar]:hidden">
      {tenantNavItems.map(({ href, icon: Icon, label }) => (
        <NavLink
          key={label}
          to={href}
          onClick={onClose}
          className={({ isActive }) =>
            [
              'relative flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl transition-all duration-200 overflow-hidden',
              isActive
                ? 'bg-white/10 text-white font-semibold shadow-sm'
                : 'text-[#84bfb2] hover:text-white hover:bg-white/5 border border-transparent hover:border-white/20 active:scale-[0.98] font-medium',
              sidebarCollapsed ? 'justify-center px-0' : '',
            ].join(' ')
          }
          title={sidebarCollapsed ? label : undefined}
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#C75B30] rounded-r-full" />
              )}
              <Icon
                size={20}
                aria-hidden="true"
                className={`shrink-0 ${isActive ? 'text-white' : 'text-[#84bfb2]'}`}
              />
              {!sidebarCollapsed && <span className="text-[15px] tracking-normal truncate">{label}</span>}
            </>
          )}
        </NavLink>
      ))}
    </nav>

    {/* Bottom section matching landlord dashboard styling */}
    <div className="p-3.5 mt-auto space-y-3 shrink-0 border-t border-white/10">
      <Link
        to="/tenant/pay-rent"
        onClick={onClose}
        className={`flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-[#C75B30] hover:bg-[#d8683b] text-white font-bold text-[15px] shadow-md hover:shadow-lg transition-all active:scale-95 ${sidebarCollapsed ? 'px-0 w-11 h-11 mx-auto' : ''}`}
        title="Make Payment"
      >
        <CreditCard size={20} className="shrink-0" />
        {!sidebarCollapsed && <span>Make Payment</span>}
      </Link>

      <div className="space-y-1 pt-1">
        <Link
          to="/tenant/report-issue"
          onClick={onClose}
          className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-[#84bfb2] hover:text-white hover:bg-white/5 border border-transparent hover:border-white/20 transition-all duration-200 font-medium ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
          title="Report Issue"
        >
          <AlertTriangle size={20} className="shrink-0 text-[#C75B30]" />
          {!sidebarCollapsed && <span className="text-[15px]">Report Issue</span>}
        </Link>

        <Link
          to="/tenant/support"
          onClick={onClose}
          className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-[#84bfb2] hover:text-white hover:bg-white/5 border border-transparent hover:border-white/20 transition-all duration-200 font-medium ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
          title="Support"
        >
          <div className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[11px] font-bold shrink-0">?</div>
          {!sidebarCollapsed && <span className="text-[15px]">Support</span>}
        </Link>

        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-[#84bfb2] hover:text-white hover:bg-white/5 border border-transparent hover:border-white/20 transition-all duration-200 cursor-pointer text-left font-medium ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
          title="Logout"
        >
          <LogOut size={20} className="shrink-0" />
          {!sidebarCollapsed && <span className="text-[15px]">Logout</span>}
        </button>
      </div>
    </div>
  </div>
);

const DashboardLayout = () => {
  const { user, clearUser } = useAuthStore();
  const { mobileSidebarOpen, setMobileSidebarOpen, sidebarCollapsed, toggleSidebar } = useUIStore();
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname;
  const isPayRent = path.includes('/pay-rent');
  const isMaintenance = path.includes('/maintenance');
  const isPayments = path.includes('/payments');
  const isLease = path.includes('/lease');
  const isReceipts = path.includes('/receipts');
  const isProfile = path.includes('/profile');
  const isSettings = path.includes('/settings');
  const isReportIssue = path.includes('/report-issue');
  const isDashboard = path.includes('/dashboard') || (!isPayRent && !isMaintenance && !isPayments && !isLease && !isReceipts && !isProfile && !isSettings && !isReportIssue);

  // Determine Title vs Search input
  let headerTitle = null;
  if (isPayRent) headerTitle = "Pay Rent";
  else if (isProfile) headerTitle = "Profile Settings";
  else if (isSettings) headerTitle = "Settings";
  else if (isReportIssue) headerTitle = "Report Issue";

  // Determine Search placeholder
  let searchPlaceholder = "Search invoices, requests...";
  if (isMaintenance) searchPlaceholder = "Search maintenance tickets...";
  else if (isPayments) searchPlaceholder = "Search transactions...";
  else if (isLease) searchPlaceholder = "Search lease clauses...";
  else if (isReceipts) searchPlaceholder = "Search receipts...";
  else if (isSettings) searchPlaceholder = "Search settings...";

  // Determine Badge
  const showBadge = isMaintenance || isPayments || isLease || isReceipts;
  let badgeText = "UNIT 402 • ACTIVE LEASE";
  if (isReceipts) badgeText = "UNIT 402B";

  // Right side configuration per Stitch exports
  const showChat = isDashboard;
  const showHelpIcon = isMaintenance || isPayments || isSettings;
  const showHelpText = isDashboard;
  const showMakePayment = isDashboard || isPayRent || isReportIssue || isPayments;
  const showAccountIcon = isPayRent;

  const handleLogout = async () => {
    setMobileSidebarOpen(false);
    await authLogout();
    clearUser();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-surface flex font-body-lg text-on-surface overflow-x-hidden">
      {/* Desktop sidebar */}
      <aside className={`hidden lg:flex flex-col fixed inset-y-0 left-0 z-50 transition-[width] duration-300 ease-out bg-primary dark:bg-primary-container border-r border-outline-variant dark:border-outline shadow-sm h-screen overflow-hidden ${sidebarCollapsed ? 'w-[72px]' : 'w-sidebar-width'}`} aria-label="Sidebar navigation">
        <SidebarContent onClose={undefined} location={location} handleLogout={handleLogout} navigate={navigate} sidebarCollapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
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
              className="fixed inset-y-0 left-0 z-50 w-sidebar-width lg:hidden shadow-2xl bg-primary dark:bg-primary-container border-r border-outline-variant dark:border-outline h-screen overflow-hidden"
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: 'tween', duration: 0.25 }}
              aria-label="Mobile sidebar navigation"
            >
              <SidebarContent onClose={() => setMobileSidebarOpen(false)} location={location} handleLogout={handleLogout} navigate={navigate} sidebarCollapsed={false} toggleSidebar={toggleSidebar} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Top App Bar matching page-specific Stitch designs exactly */}
      <header className={`fixed top-0 right-0 z-50 flex justify-between items-center px-container-padding py-3 min-h-[76px] bg-surface/95 backdrop-blur-md border-b border-outline-variant dark:border-outline shadow-xs transition-[width] duration-300 ease-out ${sidebarCollapsed ? 'w-full lg:w-[calc(100%-72px)]' : 'w-full lg:w-[calc(100%-260px)]'}`}>
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden p-1 text-on-surface-variant hover:text-primary transition-colors cursor-pointer mr-2"
            onClick={() => setMobileSidebarOpen(true)}
            aria-label="Open navigation"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
          
          {headerTitle && !isSettings ? (
            <h2 className="font-headline-md text-xl font-bold text-primary">{headerTitle}</h2>
          ) : (
            <>
              {isSettings && <h2 className="font-headline-md text-xl font-bold text-primary mr-2 hidden sm:block">{headerTitle}</h2>}
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none transition-colors group-focus-within:text-primary">search</span>
                <input
                  className="bg-surface-container-low border-none rounded-full pl-10 pr-4 py-2 w-48 sm:w-72 text-sm focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none text-on-surface placeholder:text-on-surface-variant/60"
                  placeholder={searchPlaceholder}
                  type="text"
                />
              </div>
              {showBadge && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-secondary-container/30 border border-secondary/20 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                  <span className="text-secondary font-label-caps text-[11px] font-bold uppercase tracking-wider">{badgeText}</span>
                </div>
              )}
            </>
          )}
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 border-r border-outline-variant pr-6">
            <button
              onClick={() => navigate('/tenant/notifications')}
              className="relative text-on-surface-variant hover:text-primary transition-colors active:scale-95 cursor-pointer"
              aria-label="Notifications"
            >
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full border-2 border-surface"></span>
            </button>
            {showChat && (
              <button
                onClick={() => navigate('/tenant/report-issue')}
                className="text-on-surface-variant hover:text-primary transition-colors active:scale-95 cursor-pointer"
                aria-label="Messages"
              >
                <span className="material-symbols-outlined">chat_bubble</span>
              </button>
            )}
            {showHelpIcon && (
              <button
                onClick={() => navigate('/tenant/support')}
                className="text-on-surface-variant hover:text-primary transition-colors active:scale-95 cursor-pointer"
                aria-label="Help"
              >
                <span className="material-symbols-outlined text-[22px]">help_outline</span>
              </button>
            )}
            {showAccountIcon && (
              <button
                onClick={() => navigate('/tenant/profile')}
                className="text-on-surface-variant hover:text-primary transition-colors active:scale-95 cursor-pointer"
                aria-label="Account"
              >
                <span className="material-symbols-outlined text-[24px]">account_circle</span>
              </button>
            )}
          </div>
          <div className="flex items-center gap-4">
            {showHelpText && (
              <button
                onClick={() => navigate('/tenant/settings')}
                className="hidden sm:block text-on-surface-variant hover:text-primary transition-colors font-label-caps text-label-caps uppercase cursor-pointer"
              >
                Help
              </button>
            )}
            {showMakePayment && (
              <button
                onClick={() => navigate('/tenant/pay-rent')}
                className="bg-primary text-on-primary font-label-caps text-label-caps uppercase px-5 py-2 rounded-full hover:bg-primary-container transition-all active:scale-95 cursor-pointer shadow-xs"
              >
                Make Payment
              </button>
            )}
            <div
              onClick={() => navigate('/tenant/profile')}
              className="w-10 h-10 rounded-full border-2 border-primary-fixed overflow-hidden bg-surface-container-high cursor-pointer hover:scale-105 transition-transform shrink-0"
            >
              <img
                className="w-full h-full object-cover"
                alt="User Profile"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSATJ-G-vHa4bNj34nATx1BKm2za_S-96OxC_mss9_r1r-1Pci828_GB06QhPzoNu0Tfz9OMNsO3hA9ps6H1Tqi-AHL5InKHa1_1c1UxTBPvePEaYDAzK-PSNgNppbzt4SoGasXMLEksucSGIcLlhTpjefsPv3uvu1hhGHGMwFsuaKx0AhKkry0JdQwcDgJRFa6YBC5sqODuybER7Fir57dVhYnq_Mv4UiaGBI8NvmNgCkANwVvO3Atrz2kAtCJpktqVL7o7vu7--s"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Canvas with guaranteed clearance below header */}
      <main className={`flex-1 transition-[margin-left] duration-300 ease-out pt-32 sm:pt-36 px-container-padding pb-16 min-h-screen w-full relative z-10 ${sidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-sidebar-width'}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
