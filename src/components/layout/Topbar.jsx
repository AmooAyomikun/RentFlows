import { useNavigate } from 'react-router-dom';
import { Bell, Menu, Search, ChevronDown } from 'lucide-react';
import Avatar from '../ui/Avatar';
import useAuthStore from '../../store/authStore';
import useUIStore from '../../store/uiStore';

/**
 * Dashboard top bar — page title, global search, notification bell, avatar menu.
 */
const Topbar = ({ title }) => {
  const { user } = useAuthStore();
  const { setMobileSidebarOpen } = useUIStore();
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between h-16 px-4 lg:px-6 bg-white border-b border-border flex-shrink-0">
      {/* Mobile hamburger + title */}
      <div className="flex items-center gap-3">
        <button
          className="lg:hidden p-2 text-muted hover:text-charcoal rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          onClick={() => setMobileSidebarOpen(true)}
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>
        {title && (
          <h1 className="font-display font-bold text-lg text-charcoal hidden sm:block">{title}</h1>
        )}
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-2">
        {/* Search button (opens search on click) */}
        <button
          aria-label="Search"
          className="flex items-center gap-2 h-9 px-3 text-sm text-muted bg-warm rounded border border-border hover:border-primary/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hidden sm:flex"
        >
          <Search size={15} aria-hidden="true" />
          <span className="text-muted/60 text-xs font-medium">Search…</span>
        </button>

        {/* Notification bell */}
        <button
          onClick={() => navigate('/landlord/notifications')}
          aria-label="View notifications"
          className="relative p-2 text-muted hover:text-charcoal rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Bell size={20} aria-hidden="true" />
          {/* Unread dot */}
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent"
            aria-label="Unread notifications"
          />
        </button>

        {/* Avatar menu */}
        <button
          className="flex items-center gap-2 p-1 rounded-lg hover:bg-warm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Account menu"
          aria-haspopup="true"
        >
          <Avatar name={user?.name} size="sm" />
          <ChevronDown size={14} className="text-muted hidden sm:block" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
