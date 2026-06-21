import { NavLink, useNavigate, Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, FileText, CreditCard, Wrench,
  Bell, User, LogOut, Home
} from 'lucide-react';
import { LogoMark } from './Navbar';
import Avatar from '../ui/Avatar';
import useAuthStore from '../../store/authStore';
import { logout } from '../../services/authService';

const topNavItems = [
  { href: '/tenant/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/tenant/lease', icon: FileText, label: 'My Lease' },
  { href: '/tenant/pay-rent', icon: CreditCard, label: 'Pay Rent' },
  { href: '/tenant/maintenance', icon: Wrench, label: 'Maintenance' },
];

const moreItems = [
  { href: '/tenant/payments', icon: CreditCard, label: 'History' },
  { href: '/tenant/notifications', icon: Bell, label: 'Alerts' },
  { href: '/tenant/settings', icon: User, label: 'Profile' },
];

// Bottom tab bar items (mobile)
const tabItems = [
  { href: '/tenant/dashboard', icon: Home, label: 'Home' },
  { href: '/tenant/pay-rent', icon: CreditCard, label: 'Pay' },
  { href: '/tenant/maintenance', icon: Wrench, label: 'Issues' },
  { href: '/tenant/notifications', icon: Bell, label: 'Alerts' },
];

/**
 * TenantLayout — top navigation bar (not sidebar).
 * On mobile: collapses to a bottom tab bar.
 */
const TenantLayout = () => {
  const { user, clearUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    clearUser();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-warm flex flex-col">
      {/* Top nav — desktop */}
      <header className="hidden sm:flex fixed top-0 left-0 right-0 z-30 h-16 bg-white border-b border-border items-center px-6">
        <Link to="/tenant/dashboard" className="flex items-center gap-2 mr-8" aria-label="RentFlow tenant dashboard">
          <LogoMark />
          <span className="font-display font-bold text-base text-primary">RentFlow</span>
        </Link>

        <nav className="flex items-center gap-1 flex-1" aria-label="Tenant navigation">
          {topNavItems.map(({ href, icon: Icon, label }) => (
            <NavLink
              key={href}
              to={href}
              className={({ isActive }) =>
                [
                  'flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  isActive ? 'text-primary bg-primary/8' : 'text-muted hover:text-charcoal hover:bg-warm',
                ].join(' ')
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={16} aria-hidden="true" className={isActive ? 'text-primary' : ''} />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <NavLink to="/tenant/notifications" aria-label="Notifications" className="relative p-2 text-muted hover:text-charcoal rounded transition-colors">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" aria-label="Unread" />
          </NavLink>
          <NavLink to="/tenant/settings" className="flex items-center gap-2 p-1 rounded-lg hover:bg-warm transition-colors">
            <Avatar name={user?.name} size="sm" />
          </NavLink>
          <button onClick={handleLogout} aria-label="Log out" className="p-2 text-muted hover:text-charcoal rounded transition-colors">
            <LogOut size={18} />
          </button>
        </div>
      </header>

      {/* Content */}
      <motion.main
        className="flex-1 sm:pt-16 pb-16 sm:pb-0"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4 sm:p-6 max-w-4xl mx-auto">
          <Outlet />
        </div>
      </motion.main>

      {/* Mobile bottom tab bar */}
      <nav
        className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-border"
        aria-label="Mobile tenant navigation"
      >
        <div className="flex items-stretch h-16">
          {tabItems.map(({ href, icon: Icon, label }) => (
            <NavLink
              key={href}
              to={href}
              className={({ isActive }) =>
                [
                  'flex-1 flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors',
                  'focus-visible:outline-none',
                  isActive ? 'text-primary' : 'text-muted',
                ].join(' ')
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={20} aria-hidden="true" />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default TenantLayout;
