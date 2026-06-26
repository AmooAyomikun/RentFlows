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

const mainNavItems = [
  { href: '/landlord/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/landlord/properties', icon: Building2, label: 'Properties' },
  { href: '/landlord/tenants', icon: Users, label: 'Tenants' },
  { href: '/landlord/payments', icon: CreditCard, label: 'Payments' },
  { href: '/landlord/maintenance', icon: Wrench, label: 'Maintenance' },
  { href: '/landlord/reports', icon: BarChart3, label: 'Reports' },
];

const bottomNavItems = [
  { href: '/landlord/settings', icon: Settings, label: 'Settings' },
  { href: '/landlord/notifications', icon: Bell, label: 'Notifications' },
];

/**
 * Landlord dashboard sidebar — fixed left, replicating exact design.
 */
const Sidebar = () => {
  const { sidebarCollapsed, toggleSidebar, mobileSidebarOpen, setMobileSidebarOpen } = useUIStore();

  const SidebarContent = ({ onClose }) => (
    <div className="flex flex-col h-full bg-[#072F29] text-[#FAF7F2] overflow-hidden">
      {/* Branding header */}
      <div className={`flex items-center justify-between px-4 pt-5 pb-3 flex-shrink-0 ${sidebarCollapsed ? 'justify-center px-2' : ''}`}>
        {!sidebarCollapsed && (
          <Link to="/landlord/dashboard" className="flex items-center gap-2.5 min-w-0" aria-label="EstatePro dashboard">
            <LogoMark />
            <div className="flex flex-col flex-shrink-0">
              <span className="font-display font-black text-base leading-none text-white tracking-tight">EstatePro</span>
              <span className="!text-[10px] !font-medium text-[#FAF7F2]/60 !mt-1 block">Asset Management</span>
            </div>
          </Link>
        )}
        {sidebarCollapsed && (
          <Link to="/landlord/dashboard" aria-label="EstatePro dashboard">
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

      {/* Top CTA Button matching screenshot */}
      <div className="px-3 pb-2 flex-shrink-0">
        <Link
          to="/landlord/properties/new"
          onClick={onClose}
          className={`flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-[#C75B30] hover:bg-[#b5522b] !text-white !font-bold !text-xs shadow-sm transition-all active:scale-[0.98] ${sidebarCollapsed ? 'px-0 w-9 h-9 mx-auto' : ''}`}
          title="New Property"
        >
          <Plus size={16} strokeWidth={2.5} />
          {!sidebarCollapsed && <span>New Property</span>}
        </Link>
      </div>

      {/* Primary nav list */}
      <nav className="flex-1 px-3 py-1 space-y-0.5 overflow-y-auto" aria-label="Landlord navigation">
        {mainNavItems.map(({ href, icon: Icon, label }) => (
          <NavLink
            key={href}
            to={href}
            onClick={onClose}
            className={({ isActive }) =>
              [
                'relative flex items-center gap-2.5 px-3 py-1.5 rounded-xl transition-all duration-150 text-xs font-medium group overflow-hidden',
                isActive
                  ? 'bg-white/10 text-white font-semibold'
                  : 'text-[#FAF7F2]/70 hover:text-white hover:bg-white/5',
                sidebarCollapsed ? 'justify-center px-0 py-2' : '',
              ].join(' ')
            }
            title={sidebarCollapsed ? label : undefined}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-4 bg-[#C75B30] rounded-r" aria-hidden="true" />
                )}
                <Icon
                  size={17}
                  aria-hidden="true"
                  className={isActive ? 'text-white' : 'text-[#FAF7F2]/60 group-hover:text-white transition-colors'}
                />
                {!sidebarCollapsed && <span>{label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom nav items exactly matching screenshot */}
      <div className="p-2.5 mt-auto space-y-0.5 flex-shrink-0">
        {bottomNavItems.map(({ href, icon: Icon, label }) => (
          <NavLink
            key={href}
            to={href}
            onClick={onClose}
            className={({ isActive }) =>
              [
                'relative flex items-center gap-2.5 px-3 py-1.5 rounded-xl transition-all duration-150 text-xs font-medium group overflow-hidden',
                isActive
                  ? 'bg-white/10 text-white font-semibold'
                  : 'text-[#FAF7F2]/70 hover:text-white hover:bg-white/5',
                sidebarCollapsed ? 'justify-center px-0 py-2' : '',
              ].join(' ')
            }
            title={sidebarCollapsed ? label : undefined}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-4 bg-[#C75B30] rounded-r" aria-hidden="true" />
                )}
                <Icon
                  size={17}
                  aria-hidden="true"
                  className={isActive ? 'text-white' : 'text-[#FAF7F2]/60 group-hover:text-white transition-colors'}
                />
                {!sidebarCollapsed && <span>{label}</span>}
              </>
            )}
          </NavLink>
        ))}
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
