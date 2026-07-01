import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '../../store/authStore';
import useUIStore from '../../store/uiStore';
import { logout as authLogout } from '../../services/authService';
import { LogoMark } from './Navbar';
import {
  LayoutDashboard, CreditCard, History, Receipt,
  Wrench, FileText, User, Settings, AlertTriangle, LogOut,
  ChevronLeft, ChevronRight, X
} from 'lucide-react';

const translations = {
  'yo-NG': {
    'Dashboard': 'Pátákó Bútá',
    'Pay Rent': 'San Owó Ilé',
    'Payment History': 'Ìtàn Ìsanwó',
    'Receipts': 'Rísíìtì',
    'Maintenance': 'Ìtọ́jú Ilé',
    'Lease Details': 'Àlàyé Àdéhùn',
    'Profile': 'Púrófáìlì',
    'Settings': 'Ètò',
    'Make Payment': 'San Owó',
    'Report Issue': 'Ròyìn Ìṣòro',
    'Support': 'Ìrànwọ́',
    'Logout': 'Jáde',
    'Tenant Portal': 'Póńtá Tẹ́nàntì'
  },
  'ig-NG': {
    'Dashboard': 'Dáshbọ̀d',
    'Pay Rent': 'Kwụọ Ụgwọ Ụlọ',
    'Payment History': 'Akụkọ Ịkwụ Ụgwọ',
    'Receipts': 'Risiitị',
    'Maintenance': 'Mmezi',
    'Lease Details': 'Nkọwa Mgbazinye',
    'Profile': 'Prọfaịlụ',
    'Settings': 'Ntọala',
    'Make Payment': 'Kwụọ Ụgwọ',
    'Report Issue': 'Kọọ Nsogbu',
    'Support': 'Nkwado',
    'Logout': 'Pụọ',
    'Tenant Portal': 'Pọtụ Ndi Onye Obibi'
  },
  'ha-NG': {
    'Dashboard': 'Dashboard',
    'Pay Rent': 'Biyan Kudin Gida',
    'Payment History': 'Tarihin Biyayya',
    'Receipts': 'Rasit',
    'Maintenance': 'Gyaran Gida',
    'Lease Details': 'Bayanin Yarjejeniya',
    'Profile': 'Bayanin Mutum',
    'Settings': 'Saitini',
    'Make Payment': 'Biyan Kudi',
    'Report Issue': 'Kawo Rahoton Matsala',
    'Support': 'Taimako',
    'Logout': 'Fita',
    'Tenant Portal': 'Tashar Yan Gida'
  }
};

const t = (text, lang) => (translations[lang] && translations[lang][text]) ? translations[lang][text] : text;

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

const SidebarContent = ({ onClose, location, handleLogout, navigate, sidebarCollapsed, toggleSidebar, portalLanguage }) => (
  <div className="flex flex-col h-full bg-[#00372f] text-white py-4 select-none overflow-hidden">
    {/* Branding Header */}
    <div className={`flex items-center justify-between px-5 mb-5 shrink-0 ${sidebarCollapsed ? 'justify-center px-2' : ''}`}>
      {!sidebarCollapsed && (
        <Link to="/tenant/dashboard" onClick={onClose} className="flex items-center gap-3 min-w-0" aria-label="RentFlow dashboard">
          <LogoMark />
          <div className="flex flex-col shrink-0">
            <h1 className="text-xl font-bold text-white leading-tight">RentFlow</h1>
            <p className="text-[11px] font-semibold text-[#84bfb2] opacity-80 uppercase tracking-widest">{t('Tenant Portal', portalLanguage)}</p>
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
      {/* Mobile close */}
      {onClose && (
        <button onClick={onClose} aria-label="Close menu" className="lg:hidden text-white/60 hover:text-white shrink-0">
          <X size={20} />
        </button>
      )}
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
          title={sidebarCollapsed ? t(label, portalLanguage) : undefined}
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
              {!sidebarCollapsed && <span className="text-[15px] tracking-normal truncate">{t(label, portalLanguage)}</span>}
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
        title={t('Make Payment', portalLanguage)}
      >
        <CreditCard size={20} className="shrink-0" />
        {!sidebarCollapsed && <span>{t('Make Payment', portalLanguage)}</span>}
      </Link>

      <div className="space-y-1 pt-1">
        <Link
          to="/tenant/report-issue"
          onClick={onClose}
          className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-[#84bfb2] hover:text-white hover:bg-white/5 border border-transparent hover:border-white/20 transition-all duration-200 font-medium ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
          title={t('Report Issue', portalLanguage)}
        >
          <AlertTriangle size={20} className="shrink-0 text-[#C75B30]" />
          {!sidebarCollapsed && <span className="text-[15px]">{t('Report Issue', portalLanguage)}</span>}
        </Link>

        <Link
          to="/tenant/support"
          onClick={onClose}
          className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-[#84bfb2] hover:text-white hover:bg-white/5 border border-transparent hover:border-white/20 transition-all duration-200 font-medium ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
          title={t('Support', portalLanguage)}
        >
          <div className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[11px] font-bold shrink-0">?</div>
          {!sidebarCollapsed && <span className="text-[15px]">{t('Support', portalLanguage)}</span>}
        </Link>

        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-[#84bfb2] hover:text-white hover:bg-white/5 border border-transparent hover:border-white/20 transition-all duration-200 cursor-pointer text-left font-medium ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
          title={t('Logout', portalLanguage)}
        >
          <LogOut size={20} className="shrink-0" />
          {!sidebarCollapsed && <span className="text-[15px]">{t('Logout', portalLanguage)}</span>}
        </button>
      </div>
    </div>
  </div>
);

const DashboardLayout = () => {
  const { user, clearUser } = useAuthStore();
  const { mobileSidebarOpen, setMobileSidebarOpen, sidebarCollapsed, toggleSidebar, portalLanguage, searchOpen, setSearchOpen } = useUIStore();
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if ((e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) && searchOpen) {
        e.preventDefault();
        e.stopPropagation();
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handler, true);
    return () => window.removeEventListener('keydown', handler, true);
  }, [searchOpen, setSearchOpen]);

  const path = location.pathname;
  const isPayRent = path.includes('/pay-rent');
  const isMaintenance = path.includes('/maintenance');
  const isPayments = path.includes('/payments');
  const isLease = path.includes('/lease');
  const isReceipts = path.includes('/receipts');
  const isProfile = path.includes('/profile');
  const isSettings = path.includes('/settings');
  const isReportIssue = path.includes('/report-issue');
  const isSupport = path.includes('/support');
  const isDashboard = path.includes('/dashboard') || (!isPayRent && !isMaintenance && !isPayments && !isLease && !isReceipts && !isProfile && !isSettings && !isReportIssue && !isSupport);

  // Determine Title vs Search input
  let headerTitle = null;
  if (isPayRent) headerTitle = t("Pay Rent", portalLanguage);
  else if (isProfile) headerTitle = t("Profile", portalLanguage);
  else if (isSettings) headerTitle = t("Settings", portalLanguage);
  else if (isReportIssue) headerTitle = t("Report Issue", portalLanguage);
  else if (isSupport) headerTitle = t("Support", portalLanguage);

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

  const searchResults = [
    { title: 'Pay Rent Online', cat: 'Billing', path: '/tenant/pay-rent' },
    { title: 'Payment History & Ledger', cat: 'Billing', path: '/tenant/payments' },
    { title: 'Official Rent Receipts PDF', cat: 'Documents', path: '/tenant/receipts' },
    { title: 'Log Maintenance Request', cat: 'Facility', path: '/tenant/maintenance' },
    { title: 'Lease Agreement RF-8921-LG', cat: 'Contract', path: '/tenant/lease' },
    { title: 'Report Facility Issue', cat: 'Support', path: '/tenant/report-issue' },
    { title: '24/7 Concierge Support Center', cat: 'Support', path: '/tenant/support' },
    { title: 'Resident Profile & Unit Info', cat: 'Account', path: '/tenant/profile' },
    { title: 'Portal Preferences & Language', cat: 'Settings', path: '/tenant/settings' },
  ].filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.cat.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-surface flex font-body-lg text-on-surface overflow-x-hidden">
      {/* Desktop sidebar */}
      <aside className={`hidden lg:flex flex-col fixed inset-y-0 left-0 z-50 transition-[width] duration-300 ease-out bg-primary dark:bg-primary-container border-r border-outline-variant dark:border-outline shadow-sm h-screen overflow-hidden ${sidebarCollapsed ? 'w-[72px]' : 'w-sidebar-width'}`} aria-label="Sidebar navigation">
        <SidebarContent onClose={undefined} location={location} handleLogout={handleLogout} navigate={navigate} sidebarCollapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} portalLanguage={portalLanguage} />
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
              <SidebarContent onClose={() => setMobileSidebarOpen(false)} location={location} handleLogout={handleLogout} navigate={navigate} sidebarCollapsed={false} toggleSidebar={toggleSidebar} portalLanguage={portalLanguage} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Interactive Global Quick Search Modal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {searchOpen && (
            <div className="fixed inset-0 z-[99999] flex items-start justify-center pt-24 px-4 bg-black/50 backdrop-blur-xs" onClick={() => setSearchOpen(false)}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-lg overflow-hidden"
              >
                <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                  <span className="material-symbols-outlined text-gray-400">search</span>
                  <input
                    autoFocus
                    type="text"
                    placeholder="Type a page or keyword (e.g. rent, receipt, lease)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-none text-sm text-gray-800 focus:outline-none placeholder:text-gray-400 font-medium"
                  />
                  <button onClick={() => setSearchOpen(false)} className="text-gray-400 hover:text-gray-600 border-none bg-transparent cursor-pointer">
                    <X size={18} />
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto p-2 divide-y divide-gray-50">
                  {searchResults.length > 0 ? (
                    searchResults.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          navigate(item.path);
                          setSearchOpen(false);
                        }}
                        className="p-3 hover:bg-gray-50 rounded-xl flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                            →
                          </span>
                          <div>
                            <p className="text-xs font-bold text-gray-800 m-0">{item.title}</p>
                            <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">{item.cat}</span>
                          </div>
                        </div>
                        <span className="text-[11px] font-bold text-primary">Jump</span>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-xs text-gray-500 font-medium">No portal features matched "{searchQuery}".</div>
                  )}
                </div>
                <div className="p-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-[11px] text-gray-500">
                  <span>Quick Jump Navigation</span>
                  <span className="font-mono bg-gray-200 px-1.5 py-0.5 rounded text-[10px]">ESC to close</span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

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
              <div className="relative group cursor-pointer" onClick={() => setSearchOpen(true)}>
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none transition-colors group-focus-within:text-primary">search</span>
                <input
                  readOnly
                  className="bg-surface-container-low border-none rounded-full pl-10 pr-4 py-2 w-48 sm:w-72 text-sm focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none text-on-surface placeholder:text-on-surface-variant/60 cursor-pointer"
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
              className="relative text-on-surface-variant hover:text-primary transition-colors active:scale-95 cursor-pointer flex items-center justify-center p-1"
              aria-label="Notifications"
              title="WhatsApp & System Notifications (3 unread)"
            >
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute -top-1.5 -right-3.5 flex items-center gap-0.5 bg-[#25D366] text-white font-mono text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-2xs border border-white">
                <svg className="w-2.5 h-2.5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M11.996 0C5.372 0 0 5.372 0 11.996c0 2.121.554 4.195 1.605 6.012L.053 23.633l5.803-1.52A11.94 11.94 0 0 0 11.996 24C18.62 24 24 18.62 24 11.996S18.62 0 11.996 0zm6.98 17.15c-.294.829-1.458 1.516-2.392 1.644-.64.088-1.472.16-4.266-.998-3.576-1.482-5.882-5.12-6.06-5.358-.176-.236-1.444-1.922-1.444-3.666 0-1.744.912-2.604 1.236-2.956.324-.352.708-.442.944-.442.236 0 .472.002.678.012.216.01.506-.082.792.604.294.708.998 2.454 1.086 2.632.088.176.148.382.028.618-.118.236-.176.382-.352.588-.176.206-.368.46-.526.618-.176.176-.358.368-.152.722.206.352.916 1.51 1.96 2.44 1.344 1.196 2.476 1.566 2.828 1.744.352.176.558.148.764-.088.206-.236.884-1.03 1.12-1.382.236-.352.472-.294.796-.176.324.118 2.06.972 2.414 1.148.352.176.588.264.676.412.088.148.088.854-.206 1.684z" />
                </svg>
                <span>3</span>
              </span>
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
                onClick={() => navigate('/tenant/support')}
                className="hidden sm:block text-on-surface-variant hover:text-primary transition-colors font-label-caps text-label-caps uppercase cursor-pointer"
              >
                {t('Support', portalLanguage)}
              </button>
            )}
            {showMakePayment && (
              <button
                onClick={() => navigate('/tenant/pay-rent')}
                className="bg-primary text-on-primary font-label-caps text-label-caps uppercase px-5 py-2 rounded-full hover:bg-primary-container transition-all active:scale-95 cursor-pointer shadow-xs"
              >
                {t('Make Payment', portalLanguage)}
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
