import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Menu, Search, Bell, Grid } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import useUIStore from '../../store/uiStore';

/**
 * Dashboard top bar — borderless warm header replicating screenshot layout.
 */
const Topbar = ({ title }) => {
  const { user } = useAuthStore();
  const { setMobileSidebarOpen } = useUIStore();
  const navigate = useNavigate();
  const location = useLocation();

  let placeholder = 'Search transactions, properties, or tenants...';
  let centerTitle = null;
  if (location.pathname.includes('maintenance')) placeholder = 'Search maintenance requests...';
  else if (location.pathname.includes('tenants')) placeholder = 'Search tenant directory...';
  else if (location.pathname.includes('properties')) placeholder = 'Search properties...';
  else if (location.pathname.includes('reports')) {
    placeholder = 'Search portfolios...';
    centerTitle = 'Asset Dashboard';
  } else if (location.pathname.includes('notifications')) {
    placeholder = 'Search transactions...';
  } else if (location.pathname.includes('settings')) {
    placeholder = 'Search settings...';
  }

  return (
    <div className="w-full flex flex-col flex-shrink-0 relative">
      <header className="flex items-center justify-between pt-5 pb-4 bg-transparent gap-4 relative">
        {/* Center page title matching screenshot */}
        {centerTitle && (
          <div className="hidden lg:block font-display font-extrabold text-xl text-gray-900 absolute left-1/2 -translate-x-1/2 pointer-events-none tracking-tight">
            {centerTitle}
          </div>
        )}
        {/* Left side: Mobile menu + Global search input */}
        <div className="flex items-center gap-3 flex-1 max-w-[420px]">
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-black rounded-lg transition-colors focus-visible:outline-none"
            onClick={() => setMobileSidebarOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={22} />
          </button>

          {/* Search input replicating screenshot */}
          <div className="relative w-full flex items-center bg-white border border-gray-200/80 rounded-xl h-10 px-3.5 shadow-2xs focus-within:ring-2 focus-within:ring-[#0B4F45]/20 transition-all">
            <Search size={16} className="text-gray-400 mr-2.5 flex-shrink-0" aria-hidden="true" />
            <input
              type="text"
              placeholder={placeholder}
              className="w-full bg-transparent text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
              aria-label={placeholder}
            />
          </div>
        </div>

        {/* Right side actions replicating exact design screenshot */}
        <div className="flex items-center gap-5 flex-shrink-0">
          <Link
            to="/resources"
            className="text-xs font-bold text-[#0B4F45] hover:underline hidden sm:block"
          >
            Support
          </Link>

          <button
            onClick={() => navigate('/landlord/reports')}
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#072F29] hover:bg-[#0b4f45] text-white font-bold text-xs tracking-tight shadow-sm transition-all duration-150 active:scale-[0.98] cursor-pointer"
          >
            Generate Report
          </button>

          <div className="flex items-center gap-3 text-gray-600">
            <button
              onClick={() => navigate('/landlord/notifications')}
              className="p-1 hover:text-black transition-colors cursor-pointer relative"
              aria-label="Notifications"
            >
              <Bell size={18} />
            </button>

            <button
              onClick={() => navigate('/landlord/dashboard')}
              className="p-1 hover:text-black transition-colors cursor-pointer"
              aria-label="App Switcher"
            >
              <Grid size={18} />
            </button>
          </div>

          <div className="h-8 w-px bg-gray-200 hidden sm:block" />

          {/* User profile matching screenshot: Oripio Studio / Asset Manager */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/landlord/settings')}>
            <div className="text-right hidden md:block">
              <div className="text-xs font-black text-gray-900 leading-none">{user?.name || 'Oripio Studio'}</div>
              <div className="text-[9px] font-bold text-gray-400 tracking-wider mt-1">Asset Manager</div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80"
              alt="Oripio Studio"
              className="w-9 h-9 rounded-full object-cover border border-gray-200 shadow-2xs"
            />
          </div>
        </div>
      </header>

      {/* Horizontal separator line matching screenshot */}
      <div className="border-b border-gray-200/80 mb-6" />
    </div>
  );
};

export default Topbar;
