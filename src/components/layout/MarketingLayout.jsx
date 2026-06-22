import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * MarketingLayout — public pages shell with Navbar + Footer.
 * Page content is rendered in the Outlet with a page-transition animation.
 */
const MarketingLayout = () => (
  <div className="min-h-screen flex flex-col bg-warm">
    <Navbar />
    <motion.main
      className="flex-1 pt-[72px]"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <Outlet />
    </motion.main>
    <Footer />
  </div>
);

export default MarketingLayout;
