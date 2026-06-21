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
    <div className="min-h-screen bg-warm flex">
      <Sidebar />

      {/* Main content shifts right based on sidebar width */}
      <div
        className={[
          'flex flex-col flex-1 min-w-0 transition-[margin-left] duration-300 ease-out',
          'lg:ml-[240px]',
          sidebarCollapsed ? 'lg:ml-[68px]' : 'lg:ml-[240px]',
        ].join(' ')}
      >
        <Topbar title={title} />

        <motion.main
          className="flex-1 overflow-auto"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4 lg:p-6 max-w-dashboard mx-auto">
            <Outlet />
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default LandlordLayout;
