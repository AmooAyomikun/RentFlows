import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Menu, Search, Bell, Grid } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import useUIStore from '../../store/uiStore';

/**
 * Dashboard top bar — clean borderless header.
 */
const Topbar = ({ title }) => {
  const { user } = useAuthStore();
  const { setMobileSidebarOpen } = useUIStore();
  const navigate = useNavigate();
  const location = useLocation();

  let placeholder = 'Search transactions, properties, or tenants...';
  if (location.pathname.includes('maintenance')) placeholder = 'Search maintenance requests...';
  else if (location.pathname.includes('tenants')) placeholder = 'Search tenant directory...';
  else if (location.pathname.includes('properties')) placeholder = 'Search properties...';
  else if (location.pathname.includes('reports')) placeholder = 'Search portfolios...';
  else if (location.pathname.includes('notifications')) placeholder = 'Search notifications & alerts...';
  else if (location.pathname.includes('settings')) placeholder = 'Search settings...';

  return (
    <div className="w-full flex flex-col flex-shrink-0 relative">
      <header className="flex items-center justify-between pt-5 pb-4 bg-transparent gap-4 relative">
        {/* Left side: Mobile menu + Back button + Global search input */}
        <div className="flex items-center gap-2.5 flex-1 max-w-[460px]">
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-black rounded-lg transition-colors focus-visible:outline-none cursor-pointer"
            onClick={() => setMobileSidebarOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={22} />
          </button>

          {location.pathname !== '/landlord/dashboard' && (
            <button
              onClick={() => navigate(-1)}
              className="px-3 py-2 text-gray-700 hover:text-[#0B4F45] hover:bg-white rounded-xl transition-all flex items-center gap-1.5 font-bold text-xs shrink-0 cursor-pointer shadow-2xs bg-gray-50/90 border border-gray-200/80 active:scale-95"
              title="Go back to previous page"
            >
              <span className="text-base leading-none">&larr;</span>
              <span className="hidden sm:inline">Back</span>
            </button>
          )}

          {/* Search input */}
          <div className="relative w-full flex items-center bg-white border border-gray-200 rounded-xl h-10 px-3.5 shadow-2xs focus-within:border-[#0B4F45] focus-within:ring-2 focus-within:ring-[#0B4F45]/20 transition-all overflow-hidden">
            <Search size={16} className="text-gray-400 mr-2.5 flex-shrink-0 pointer-events-none" aria-hidden="true" />
            <input
              type="text"
              placeholder={placeholder}
              className="w-full bg-transparent border-0 outline-none focus:outline-none focus:ring-0 text-xs sm:text-sm text-gray-800 placeholder-gray-400 p-0 leading-normal"
              aria-label={placeholder}
            />
          </div>
        </div>

        {/* Right side actions */}
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

          <div className="flex items-center gap-4 text-gray-600">
            <button
              onClick={() => navigate('/landlord/notifications')}
              className="p-1 hover:text-black transition-colors cursor-pointer relative flex items-center justify-center"
              aria-label="Notifications"
              title="WhatsApp & System Notifications (3 unread)"
            >
              <Bell size={18} />
              <span className="absolute -top-1.5 -right-3.5 flex items-center gap-0.5 bg-[#25D366] text-white font-mono text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-2xs border border-white">
                <svg className="w-2.5 h-2.5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M11.996 0C5.372 0 0 5.372 0 11.996c0 2.121.554 4.195 1.605 6.012L.053 23.633l5.803-1.52A11.94 11.94 0 0 0 11.996 24C18.62 24 24 18.62 24 11.996S18.62 0 11.996 0zm6.98 17.15c-.294.829-1.458 1.516-2.392 1.644-.64.088-1.472.16-4.266-.998-3.576-1.482-5.882-5.12-6.06-5.358-.176-.236-1.444-1.922-1.444-3.666 0-1.744.912-2.604 1.236-2.956.324-.352.708-.442.944-.442.236 0 .472.002.678.012.216.01.506-.082.792.604.294.708.998 2.454 1.086 2.632.088.176.148.382.028.618-.118.236-.176.382-.352.588-.176.206-.368.46-.526.618-.176.176-.358.368-.152.722.206.352.916 1.51 1.96 2.44 1.344 1.196 2.476 1.566 2.828 1.744.352.176.558.148.764-.088.206-.236.884-1.03 1.12-1.382.236-.352.472-.294.796-.176.324.118 2.06.972 2.414 1.148.352.176.588.264.676.412.088.148.088.854-.206 1.684z" />
                </svg>
                <span>3</span>
              </span>
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

          {/* User profile */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/landlord/settings')}>
            <div className="text-right hidden md:block">
              <div className="text-xs font-black text-gray-900 leading-none">{user?.name || 'Amoo Ayomikun'}</div>
              <div className="text-[9px] font-bold text-gray-400 tracking-wider mt-1">{user?.role || 'Asset Manager'}</div>
            </div>
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80"}
              alt={user?.name || "Amoo Ayomikun"}
              className="w-9 h-9 rounded-full object-cover border border-gray-200 shadow-2xs"
            />
          </div>
        </div>
      </header>

      {/* Horizontal separator line */}
      <div className="border-b border-gray-200/80 mb-6" />
    </div>
  );
};

export default Topbar;
