import { useNavigate, Link } from 'react-router-dom';
import { Bell, Menu, Search, LayoutGrid, FileSpreadsheet } from 'lucide-react';
import Avatar from '../ui/Avatar';
import useAuthStore from '../../store/authStore';
import useUIStore from '../../store/uiStore';

/**
 * Dashboard top bar — borderless warm header replicating screenshot layout.
 */
const Topbar = ({ title }) => {
  const { user } = useAuthStore();
  const { setMobileSidebarOpen } = useUIStore();
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col flex-shrink-0">
      <header className="flex items-center justify-between pt-4 pb-3 bg-transparent gap-4">
        {/* Left side: Mobile menu + Global search input */}
        <div className="flex items-center gap-3 flex-1 max-w-[360px]">
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-black rounded-lg transition-colors focus-visible:outline-none"
            onClick={() => setMobileSidebarOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={22} />
          </button>

          {/* Search input replicating screenshot */}
          <div className="relative w-full flex items-center bg-white border border-gray-200/80 rounded-xl h-10 px-3.5 shadow-sm focus-within:ring-2 focus-within:ring-[#0B4F45]/20 transition-all">
            <Search size={16} className="text-gray-400 mr-2.5 flex-shrink-0" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search properties, tenants..."
              className="w-full bg-transparent text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
              aria-label="Search properties, tenants"
            />
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
          {/* Generate Report button */}
          <button
            onClick={() => navigate('/landlord/reports')}
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 font-bold text-xs tracking-tight shadow-sm transition-all duration-150 active:scale-[0.98] cursor-pointer"
          >
            Generate Report
          </button>

          {/* Support link */}
          <Link
            to="/resources"
            className="text-xs sm:text-sm font-semibold text-gray-700 hover:text-black hidden sm:block px-1 transition-colors"
          >
            Support
          </Link>

          {/* Vertical divider */}
          <div className="hidden sm:block h-5 w-[1px] bg-gray-200 mx-0.5" aria-hidden="true" />

          {/* Notification bell */}
          <button
            onClick={() => navigate('/landlord/notifications')}
            aria-label="View notifications"
            className="relative p-1.5 text-gray-700 hover:text-black rounded-lg hover:bg-black/5 transition-colors"
          >
            <Bell size={19} aria-hidden="true" />
            <span
              className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#C75B30] ring-2 ring-[#FAF7F2]"
              aria-label="Unread notifications"
            />
          </button>

          {/* App switcher grid icon */}
          <button
            className="p-1.5 text-gray-700 hover:text-black rounded-lg hover:bg-black/5 transition-colors hidden sm:block"
            aria-label="App switcher"
          >
            <LayoutGrid size={19} aria-hidden="true" />
          </button>

          {/* User avatar */}
          <div className="flex items-center pl-1">
            <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80" name={user?.name || "Olumide CA"} size="sm" className="ring-2 ring-white shadow-sm cursor-pointer" />
          </div>
        </div>
      </header>

      {/* Horizontal separator line */}
      <div className="border-b border-gray-200/80 mb-6" />
    </div>
  );
};

export default Topbar;
