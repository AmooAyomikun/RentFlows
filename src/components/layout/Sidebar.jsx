import { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Building2, Users, CreditCard,
  Wrench, BarChart3, Bell, Settings, ChevronLeft,
  ChevronRight, Plus, LogOut, X
} from 'lucide-react';
import { LogoMark } from './Navbar';
import useAuthStore from '../../store/authStore';
import useUIStore from '../../store/uiStore';
import { logout as authLogout } from '../../services/authService';

const mainNavItems = [
  { href: '/landlord/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/landlord/properties', icon: Building2, label: 'Properties' },
  { href: '/landlord/tenants', icon: Users, label: 'Tenants' },
  { href: '/landlord/payments', icon: CreditCard, label: 'Payments' },
  { href: '/landlord/maintenance', icon: Wrench, label: 'Maintenance' },
  { href: '/landlord/reports', icon: BarChart3, label: 'Reports' },
  { href: '/landlord/settings', icon: Settings, label: 'Settings' },
  { href: '/landlord/notifications', icon: Bell, label: 'Notifications' },
];

/**
 * Landlord dashboard sidebar — fixed left, replicating exact design screenshot.
 */
const Sidebar = () => {
  const navigate = useNavigate();
  const { sidebarCollapsed, toggleSidebar, mobileSidebarOpen, setMobileSidebarOpen } = useUIStore();
  const { clearUser } = useAuthStore();

  const handleLogout = async () => {
    setMobileSidebarOpen(false);
    await authLogout();
    clearUser();
    navigate('/login');
  };

  const SidebarContent = ({ onClose }) => (
    <div className="flex flex-col h-full bg-[#00372f] text-white py-4 select-none overflow-hidden">
      {/* Branding header */}
      <div className={`flex items-center justify-between px-5 mb-5 shrink-0 ${sidebarCollapsed ? 'justify-center px-2' : ''}`}>
        {!sidebarCollapsed && (
          <Link to="/landlord/dashboard" className="flex items-center gap-3 min-w-0" aria-label="RentFlow dashboard">
            <LogoMark />
            <div className="flex flex-col shrink-0">
              <h1 className="font-headline-md text-xl font-bold text-white leading-tight">RentFlow</h1>
              <p className="font-label-caps text-[11px] text-[#84bfb2] opacity-80 uppercase tracking-widest">Landlord Portal</p>
            </div>
          </Link>
        )}
        {sidebarCollapsed && (
          <Link to="/landlord/dashboard" aria-label="RentFlow dashboard" className="mx-auto">
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

      {/* Primary nav list */}
      <nav className="flex-1 space-y-1 px-3.5 overflow-y-auto [&::-webkit-scrollbar]:hidden" aria-label="Landlord navigation">
        {mainNavItems.map(({ href, icon: Icon, label }) => (
          <NavLink
            key={href}
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

      {/* Bottom section matching tenant dashboard styling */}
      <div className="p-3.5 mt-auto space-y-3 shrink-0 border-t border-white/10">
        <Link
          to="/landlord/properties/new"
          onClick={onClose}
          className={`flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-[#C75B30] hover:bg-[#d8683b] text-white font-bold text-[15px] shadow-md hover:shadow-lg transition-all active:scale-95 ${sidebarCollapsed ? 'px-0 w-11 h-11 mx-auto' : ''}`}
          title="Add Property"
        >
          <Plus size={20} strokeWidth={2.5} className="shrink-0" />
          {!sidebarCollapsed && <span>Add Property</span>}
        </Link>

        <div className="space-y-1 pt-1">
          <Link
            to="/resources"
            onClick={onClose}
            className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-[#84bfb2] hover:text-white hover:bg-white/5 border border-transparent hover:border-white/20 transition-all duration-200 font-medium ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
            title="Help Center"
          >
            <div className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[11px] font-bold shrink-0">?</div>
            {!sidebarCollapsed && <span className="text-[15px]">Help Center</span>}
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

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        className={`hidden lg:flex flex-col fixed inset-y-0 left-0 z-50 transition-[width] duration-300 ease-out bg-[#00372f] border-r border-outline-variant/10 shadow-sm h-screen overflow-hidden ${sidebarCollapsed ? 'w-[72px]' : 'w-[260px]'}`}
        aria-label="Sidebar navigation"
      >
        <SidebarContent />
      </motion.aside>

      {/* Mobile sidebar overlay + drawer */}
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
              className="fixed left-0 top-0 bottom-0 z-50 w-[260px] lg:hidden shadow-2xl"
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
    </>
  );
};

export default Sidebar;
