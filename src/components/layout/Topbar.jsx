import { useNavigate, Link } from 'react-router-dom';
import { Menu, Search, FileSpreadsheet, HelpCircle, UserCircle2 } from 'lucide-react';
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
              placeholder="Search tenants, properties, or transactions..."
              className="w-full bg-transparent text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
              aria-label="Search tenants, properties, or transactions"
            />
          </div>
        </div>

        {/* Right side actions replicating exact design screenshot */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => navigate('/landlord/reports')}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 font-bold text-xs tracking-tight shadow-2xs transition-all duration-150 active:scale-[0.98] cursor-pointer"
          >
            <FileSpreadsheet size={15} className="text-gray-600" />
            Generate Report
          </button>

          <button
            onClick={() => navigate('/resources')}
            className="p-1.5 text-gray-600 hover:text-black rounded-lg hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Help Center"
          >
            <HelpCircle size={20} />
          </button>

          <button
            onClick={() => navigate('/landlord/settings')}
            className="p-1.5 text-gray-600 hover:text-black rounded-lg hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Profile Settings"
          >
            <UserCircle2 size={20} />
          </button>
        </div>
      </header>

      {/* Horizontal separator line */}
      <div className="border-b border-gray-200/80 mb-6" />
    </div>
  );
};

export default Topbar;
