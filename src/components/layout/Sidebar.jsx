import { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Building2, Users, CreditCard,
  Wrench, BarChart3, Bell, Settings, ChevronLeft,
  ChevronRight, Plus, X
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
    <div className="flex flex-col h-full bg-[#072F29] text-[#FAF7F2] overflow-hidden">
      {/* Branding header */}
      <div className={`flex items-center justify-between px-5 pt-6 pb-4 flex-shrink-0 ${sidebarCollapsed ? 'justify-center px-2' : ''}`}>
        {!sidebarCollapsed && (
          <Link to="/landlord/dashboard" className="flex items-center gap-3 min-w-0" aria-label="RentFlow dashboard">
            <LogoMark />
            <div className="flex flex-col flex-shrink-0">
              <span className="font-display font-black text-xl leading-none text-white tracking-tight">RentFlow</span>
              <span className="text-[11px] font-medium text-[#FAF7F2]/60 mt-1 block">Premium Landlord</span>
            </div>
          </Link>
        )}
        {sidebarCollapsed && (
          <Link to="/landlord/dashboard" aria-label="RentFlow dashboard">
            <LogoMark />
          </Link>
        )}
        {/* Desktop collapse toggle */}
        <button
          onClick={onClose || toggleSidebar}
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="hidden lg:flex items-center justify-center w-6 h-6 rounded text-white/50 hover:text-white hover:bg-white/10 transition-colors ml-1 flex-shrink-0 cursor-pointer"
        >
          {sidebarCollapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
        </button>
        {/* Mobile close */}
        {onClose && (
          <button onClick={onClose} aria-label="Close menu" className="lg:hidden text-white/60 hover:text-white flex-shrink-0">
            <X size={20} />
          </button>
        )}
      </div>

      {/* Primary nav list */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto" aria-label="Landlord navigation">
        {mainNavItems.map(({ href, icon: Icon, label }) => (
          <NavLink
            key={href}
            to={href}
            onClick={onClose}
            className={({ isActive }) =>
              [
                'relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-150 text-sm font-medium group overflow-hidden',
                isActive
                  ? 'bg-white/12 text-white font-bold shadow-xs'
                  : 'text-[#FAF7F2]/75 hover:text-white hover:bg-white/6',
                sidebarCollapsed ? 'justify-center px-0 py-2.5' : '',
              ].join(' ')
            }
            title={sidebarCollapsed ? label : undefined}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-white rounded-r" aria-hidden="true" />
                )}
                <Icon
                  size={18}
                  aria-hidden="true"
                  className={isActive ? 'text-white' : 'text-[#FAF7F2]/65 group-hover:text-white transition-colors'}
                />
                {!sidebarCollapsed && <span>{label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom section exactly matching screenshot */}
      <div className="p-4 mt-auto space-y-3 flex-shrink-0 border-t border-white/10">
        <Link
          to="/landlord/properties/new"
          onClick={onClose}
          className={`flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#F4C395] hover:bg-[#e3b284] text-[#072F29] font-bold text-sm shadow-sm transition-all active:scale-[0.98] ${sidebarCollapsed ? 'px-0 w-10 h-10 mx-auto' : ''}`}
          title="Add Property"
        >
          <Plus size={18} strokeWidth={2.5} />
          {!sidebarCollapsed && <span>Add Property</span>}
        </Link>

        <div className="space-y-1 pt-1">
          <Link
            to="/resources"
            onClick={onClose}
            className={`flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#FAF7F2]/70 hover:text-white hover:bg-white/5 transition-colors ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
            title="Help Center"
          >
            <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px] font-bold flex-shrink-0">?</div>
            {!sidebarCollapsed && <span>Help Center</span>}
          </Link>

          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#FAF7F2]/70 hover:text-white hover:bg-white/5 transition-colors cursor-pointer ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
            title="Logout"
          >
            <X size={16} className="rotate-45" />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        className={`hidden lg:flex flex-col fixed left-0 top-0 bottom-0 z-30 transition-[width] duration-300 ease-out bg-[#072F29] border-r border-white/5 ${sidebarCollapsed ? 'w-[72px]' : 'w-[230px]'}`}
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
    </>
  );
};

export default Sidebar;
