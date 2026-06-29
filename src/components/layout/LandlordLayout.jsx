import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import useUIStore from '../../store/uiStore';

/**
 * LandlordLayout — fixed sidebar + topbar + scrollable content area.
 * Content area shifts right based on sidebar width.
 */
const LandlordLayout = ({ title }) => {
  const { sidebarCollapsed } = useUIStore();

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex font-sans text-gray-900">
      <Sidebar />

      {/* Main content shifts right based on sidebar width */}
      <div
        className={[
          'flex flex-col flex-1 min-w-0 transition-[margin-left] duration-300 ease-out min-h-screen',
          sidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-[260px]',
        ].join(' ')}
      >
        <div className="px-6 lg:px-8 max-w-[1400px] mx-auto w-full flex flex-col flex-1">
          <Topbar title={title} />

          <motion.main
            className="flex-1 pt-1 pb-8"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.main>
        </div>
      </div>
    </div>
  );
};

export default LandlordLayout;
