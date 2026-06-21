import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogoMark } from './Navbar';

/**
 * AuthLayout — centered card on a softly textured Forest Teal background.
 * No navbar or footer — focused auth experience.
 */
const AuthLayout = () => (
  <div className="min-h-screen bg-gradient-warm flex flex-col items-center justify-center p-4 relative overflow-hidden">
    {/* Subtle background pattern */}
    <div className="absolute inset-0 opacity-10" aria-hidden="true">
      <svg width="100%" height="100%">
        <defs>
          <pattern id="auth-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#auth-grid)" />
      </svg>
    </div>

    {/* Brand mark above the card */}
    <motion.div
      className="flex items-center gap-3 mb-8 relative z-10"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <LogoMark />
      <span className="font-display font-bold text-2xl text-white">RentFlow</span>
    </motion.div>

    {/* Auth card */}
    <motion.div
      className="relative z-10 w-full max-w-auth-card bg-white rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Outlet />
    </motion.div>

    <p className="mt-6 text-sm text-white/50 relative z-10">
      © {new Date().getFullYear()} RentFlow
    </p>
  </div>
);

export default AuthLayout;
