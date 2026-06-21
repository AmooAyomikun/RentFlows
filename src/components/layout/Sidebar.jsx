import { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Building2, Users, CreditCard,
  Wrench, BarChart3, Bell, Settings, ChevronLeft,
  ChevronRight, LogOut, Menu, X
} from 'lucide-react';
import { LogoMark } from './Navbar';
import Avatar from '../ui/Avatar';
import useAuthStore from '../../store/authStore';
import useUIStore from '../../store/uiStore';
import { logout } from '../../services/authService';

const navItems = [
  { href: '/landlord/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/landlord/properties', icon: Building2, label: 'Properties' },
  { href: '/landlord/tenants', icon: Users, label: 'Tenants' },
  { href: '/landlord/payments', icon: CreditCard, label: 'Payments' },
  { href: '/landlord/maintenance', icon: Wrench, label: 'Maintenance' },
  { href: '/landlord/reports', icon: BarChart3, label: 'Reports' },
];

const bottomItems = [
  { href: '/landlord/notifications', icon: Bell, label: 'Notifications' },
  { href: '/landlord/settings', icon: Settings, label: 'Settings' },
];

/**
 * Landlord dashboard sidebar — fixed left, collapsible to icon-only.
 * Forest Teal Dark background (sidebar-bg).
 */
const Sidebar = () => {
  const { sidebarCollapsed, toggleSidebar, mobileSidebarOpen, setMobileSidebarOpen } = useUIStore();
  const { user, clearUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    clearUser();
    navigate('/login');
  };

  const SidebarContent = ({ onClose }) => (
    <div className="flex flex-col h-full sidebar-bg text-sidebar-text">
      {/* Logo / collapse toggle */}
      <div className={`flex items-center justify-between px-4 h-16 border-b border-white/10 flex-shrink-0 ${sidebarCollapsed ? 'justify-center' : ''}`}>
        {!sidebarCollapsed && (
          <Link to="/landlord/dashboard" className="flex items-center gap-2.5" aria-label="RentFlow dashboard">
            <LogoMark />
            <span className="font-display font-bold text-base text-white">RentFlow</span>
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
          className="hidden lg:flex items-center justify-center w-7 h-7 rounded text-sidebar-text/60 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
        {/* Mobile close */}
        {onClose && (
          <button onClick={onClose} aria-label="Close menu" className="lg:hidden text-sidebar-text/60 hover:text-white">
            <X size={20} />
          </button>
        )}
      </div>

      {/* Primary nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto" aria-label="Landlord navigation">
        {navItems.map(({ href, icon: Icon, label }) => (
          <NavLink
            key={href}
            to={href}
            onClick={onClose}
            className={({ isActive }) =>
              [
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-150 text-sm font-medium group',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white',
                isActive
                  ? 'bg-white/12 text-white'
                  : 'text-sidebar-text/70 hover:text-white hover:bg-white/8',
                sidebarCollapsed ? 'justify-center' : '',
              ].join(' ')
            }
            title={sidebarCollapsed ? label : undefined}
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={20}
                  aria-hidden="true"
                  className={isActive ? 'text-accent' : 'text-sidebar-text/60 group-hover:text-white'}
                />
                {!sidebarCollapsed && <span>{label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom items */}
      <div className="px-3 py-3 border-t border-white/10 space-y-0.5">
        {bottomItems.map(({ href, icon: Icon, label }) => (
          <NavLink
            key={href}
            to={href}
            onClick={onClose}
            className={({ isActive }) =>
              [
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white',
                isActive ? 'bg-white/12 text-white' : 'text-sidebar-text/70 hover:text-white hover:bg-white/8',
                sidebarCollapsed ? 'justify-center' : '',
              ].join(' ')
            }
            title={sidebarCollapsed ? label : undefined}
          >
            <Icon size={20} aria-hidden="true" />
            {!sidebarCollapsed && label}
          </NavLink>
        ))}

        {/* User menu */}
        <div className={`flex items-center gap-3 px-3 py-2.5 mt-2 rounded-lg border-t border-white/10 pt-3 ${sidebarCollapsed ? 'justify-center' : ''}`}>
          <Avatar name={user?.name} size="sm" />
          {!sidebarCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">{user?.name}</p>
              <p className="text-xs text-sidebar-text/50 truncate">{user?.businessName || user?.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            aria-label="Log out"
            className="text-sidebar-text/50 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded p-1"
          >
            <LogOut size={15} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        className={`hidden lg:flex flex-col fixed left-0 top-0 bottom-0 z-30 transition-[width] duration-300 ease-out ${sidebarCollapsed ? 'w-[68px]' : 'w-[240px]'}`}
        aria-label="Sidebar navigation"
      >
        <SidebarContent />
      </motion.aside>

      {/* Mobile sidebar overlay + drawer */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-charcoal/50 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              className="fixed left-0 top-0 bottom-0 z-50 w-[240px] lg:hidden"
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
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
