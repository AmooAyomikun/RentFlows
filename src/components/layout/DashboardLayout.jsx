import { useState } from 'react';
import { NavLink, useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '../../store/authStore';
import useUIStore from '../../store/uiStore';
import { logout as authLogout } from '../../services/authService';

const tenantNavItems = [
  { href: '/tenant/dashboard', icon: 'dashboard', label: 'Dashboard' },
  { href: '/tenant/pay-rent', icon: 'payments', label: 'Pay Rent' },
  { href: '/tenant/payments', icon: 'history', label: 'Payment History' },
  { href: '/tenant/receipts', icon: 'receipt_long', label: 'Receipts' },
  { href: '/tenant/maintenance', icon: 'build', label: 'Maintenance' },
  { href: '/tenant/lease', icon: 'description', label: 'Lease Details' },
  { href: '/tenant/profile', icon: 'person', label: 'Profile' },
];

const SidebarContent = ({ onClose, location, handleLogout, navigate }) => (
  <div className="flex flex-col h-full bg-[#00372f] text-white py-4 select-none overflow-hidden">
    {/* Branding Header */}
    <div className="px-5 mb-5 shrink-0">
      <Link to="/tenant/dashboard" onClick={onClose} className="flex items-center gap-3">
        <div className="w-9 h-9 bg-[#7f2800] rounded-lg flex items-center justify-center text-[#ff9973] shadow-lg shrink-0">
          <span className="material-symbols-outlined text-xl [font-variation-settings:'FILL'_1]">apartment</span>
        </div>
        <div>
          <h1 className="font-headline-md text-xl font-bold text-white leading-tight">RentFlow</h1>
          <p className="font-label-caps text-[11px] text-[#84bfb2] opacity-80 uppercase tracking-widest">Tenant Portal</p>
        </div>
      </Link>
    </div>

    {/* Navigation List matching screenshot styling, optimized for fitting all items */}
    <nav className="flex-1 space-y-1 px-3.5 overflow-y-auto [&::-webkit-scrollbar]:hidden">
      {tenantNavItems.map(({ href, icon, label }) => {
        const isActive = location.pathname === href || (href === '/tenant/profile' && location.pathname === '/tenant/settings');
        
        if (isActive) {
          return (
            <Link
              key={label}
              to={href}
              onClick={onClose}
              className="relative flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl bg-white/10 text-white font-semibold transition-all duration-200 shadow-sm overflow-hidden"
            >
              {/* Orange vertical indicator bar on left edge */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#C75B30] rounded-r-full" />
              <span className="material-symbols-outlined [font-variation-settings:'FILL'_1] shrink-0 text-[20px] text-white">{icon}</span>
              <span className="text-[15px] tracking-normal">{label}</span>
            </Link>
          );
        }

        return (
          <Link
            key={label}
            to={href}
            onClick={onClose}
            className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-[#84bfb2] hover:text-white hover:bg-white/5 border border-transparent hover:border-white/20 transition-all duration-200 active:scale-[0.98]"
          >
            <span className="material-symbols-outlined shrink-0 text-[20px]">{icon}</span>
            <span className="text-[15px] font-medium tracking-normal">{label}</span>
          </Link>
        );
      })}

      {/* Divider */}
      <div className="my-2 border-t border-white/10 pt-1" />

      {/* Report Issue */}
      <button
        onClick={() => {
          if (onClose) onClose();
          navigate('/tenant/report-issue');
        }}
        className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer text-left ${
          location.pathname === '/tenant/report-issue'
            ? 'relative bg-white/10 text-white font-semibold overflow-hidden'
            : 'text-[#84bfb2] hover:text-white hover:bg-white/5 border border-transparent hover:border-white/20 font-medium'
        }`}
      >
        {location.pathname === '/tenant/report-issue' && (
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#C75B30] rounded-r-full" />
        )}
        <span className="material-symbols-outlined shrink-0 text-[20px]">report_problem</span>
        <span className="text-[15px] tracking-normal">Report Issue</span>
      </button>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-[#84bfb2] hover:text-white hover:bg-white/5 border border-transparent hover:border-white/20 transition-all duration-200 cursor-pointer text-left font-medium"
      >
        <span className="material-symbols-outlined shrink-0 text-[20px]">logout</span>
        <span className="text-[15px] tracking-normal">Logout</span>
      </button>
    </nav>

    {/* Bottom Section: Make Payment Button */}
    <div className="mt-auto px-3.5 pt-3 shrink-0">
      <button
        onClick={() => {
          if (onClose) onClose();
          navigate('/tenant/pay-rent');
        }}
        className="w-full bg-[#C75B30] hover:bg-[#d8683b] text-white font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all text-center text-[15px] cursor-pointer"
      >
        Make Payment
      </button>
    </div>
  </div>
);

const DashboardLayout = () => {
  const { user, clearUser } = useAuthStore();
  const { mobileSidebarOpen, setMobileSidebarOpen } = useUIStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setMobileSidebarOpen(false);
    await authLogout();
    clearUser();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-surface flex font-body-lg text-on-surface overflow-x-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col fixed inset-y-0 left-0 z-50 w-sidebar-width bg-primary dark:bg-primary-container border-r border-outline-variant dark:border-outline shadow-sm h-screen overflow-hidden" aria-label="Sidebar navigation">
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
              className="fixed inset-y-0 left-0 z-50 w-sidebar-width lg:hidden shadow-2xl bg-primary dark:bg-primary-container border-r border-outline-variant dark:border-outline h-screen overflow-hidden"
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: 'tween', duration: 0.25 }}
              aria-label="Mobile sidebar navigation"
            >
              <SidebarContent onClose={() => setMobileSidebarOpen(false)} location={location} handleLogout={handleLogout} navigate={navigate} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Top App Bar matching Stitch Dashboard design exactly */}
      <header className="fixed top-0 right-0 w-full lg:w-[calc(100%-260px)] z-40 flex justify-between items-center px-container-padding h-16 bg-surface/80 backdrop-blur-md border-b border-outline-variant dark:border-outline">
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden p-1 text-on-surface-variant hover:text-primary transition-colors cursor-pointer mr-2"
            onClick={() => setMobileSidebarOpen(true)}
            aria-label="Open navigation"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none transition-colors group-focus-within:text-primary">search</span>
            <input
              className="bg-surface-container-low border-none rounded-full pl-10 pr-4 py-2 w-48 sm:w-72 text-sm focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none text-on-surface placeholder:text-on-surface-variant/60"
              placeholder="Search invoices, requests..."
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-4 border-r border-outline-variant pr-6">
            <button
              onClick={() => navigate('/tenant/notifications')}
              className="relative text-on-surface-variant hover:text-primary transition-colors active:scale-95 cursor-pointer"
              aria-label="Notifications"
            >
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full border-2 border-surface"></span>
            </button>
            <button
              onClick={() => navigate('/tenant/report-issue')}
              className="text-on-surface-variant hover:text-primary transition-colors active:scale-95 cursor-pointer"
              aria-label="Messages"
            >
              <span className="material-symbols-outlined">chat_bubble</span>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/tenant/settings')}
              className="hidden sm:block text-on-surface-variant hover:text-primary transition-colors font-label-caps text-label-caps uppercase cursor-pointer"
            >
              Help
            </button>
            <button
              onClick={() => navigate('/tenant/pay-rent')}
              className="bg-primary text-on-primary font-label-caps text-label-caps uppercase px-5 py-2 rounded-full hover:bg-primary-container transition-all active:scale-95 cursor-pointer shadow-xs"
            >
              Make Payment
            </button>
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

      {/* Main Content Canvas */}
      <main className="flex-1 lg:ml-sidebar-width pt-28 px-container-padding pb-12 min-h-screen w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
