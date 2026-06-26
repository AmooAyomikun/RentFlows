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
    <header className="flex items-center justify-between pt-3 pb-1 bg-transparent flex-shrink-0 gap-4">
      {/* Left side: Mobile menu + Global search input */}
      <div className="flex items-center gap-3 flex-1 max-w-[480px]">
        <button
          className="lg:hidden p-2 text-gray-600 hover:text-black rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B4F45]"
          onClick={() => setMobileSidebarOpen(true)}
          aria-label="Open navigation"
        >
          <Menu size={22} />
        </button>

        {/* Search input replicating screenshot */}
        <div className="relative w-full flex items-center bg-white/80 border border-gray-200/80 rounded-xl h-11 px-3.5 shadow-sm focus-within:ring-2 focus-within:ring-[#0B4F45]/30 focus-within:border-[#0B4F45] transition-all">
          <Search size={18} className="text-gray-400 mr-2.5 flex-shrink-0" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search properties, tenants, or payments..."
            className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
            aria-label="Search properties, tenants, or payments"
          />
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
        {/* Notification bell */}
        <button
          onClick={() => navigate('/landlord/notifications')}
          aria-label="View notifications"
          className="relative p-2 text-gray-600 hover:text-black rounded-lg hover:bg-black/5 transition-colors focus-visible:outline-none"
        >
          <Bell size={20} aria-hidden="true" />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#C75B30] ring-2 ring-[#FAF7F2]"
            aria-label="Unread notifications"
          />
        </button>

        {/* App switcher grid icon */}
        <button
          className="p-2 text-gray-600 hover:text-black rounded-lg hover:bg-black/5 transition-colors hidden sm:block focus-visible:outline-none"
          aria-label="App switcher"
        >
          <LayoutGrid size={20} aria-hidden="true" />
        </button>

        {/* Support link */}
        <Link
          to="/resources"
          className="text-sm font-semibold text-gray-600 hover:text-black hidden md:block px-1 transition-colors"
        >
          Support
        </Link>

        {/* Generate Report button */}
        <button
          onClick={() => navigate('/landlord/reports')}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#072F29] hover:bg-[#0B4F45] text-white font-bold text-xs tracking-wide shadow-sm transition-all duration-200 active:scale-[0.98] cursor-pointer"
        >
          Generate Report
        </button>

        {/* User avatar */}
        <div className="flex items-center pl-1">
          <Avatar name={user?.name || "Sarah Jones"} size="sm" className="ring-2 ring-white shadow-sm cursor-pointer" />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
