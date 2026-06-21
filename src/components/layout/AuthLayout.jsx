import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogoMark } from './Navbar';

/**
 * AuthLayout — centered card on a softly textured Forest Teal background.
 * Adapts to a wider two-column layout for the Signup page.
 */
const AuthLayout = () => {
  const location = useLocation();
  const isSignup = location.pathname === '/signup';

  return (
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
        className={`relative z-10 w-full ${isSignup ? 'max-w-4xl' : 'max-w-auth-card'} bg-white rounded-lg shadow-xl flex overflow-hidden`}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className={isSignup ? 'w-full md:w-1/2 flex flex-col' : 'w-full'}>
          <Outlet />
        </div>
        
        {isSignup && (
          <div className="hidden md:flex w-1/2 bg-warm p-10 flex-col justify-center border-l border-border relative overflow-hidden">
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80" 
                alt="Apartment building" 
                className="w-full h-full object-cover opacity-10" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-warm via-warm/80 to-transparent"></div>
            </div>
            
            <div className="relative z-10 max-w-sm mx-auto">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-primary/40 mb-6" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 11l-2 2-2-2m6 2l2-2 2 2m-4-6v8m-4-8v8m14 1H2a1 1 0 01-1-1V4a1 1 0 011-1h20a1 1 0 011 1v16a1 1 0 01-1 1z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3 className="font-display font-medium text-2xl text-charcoal mb-6 leading-tight">
                "RentFlow completely transformed how I collect rent. My tenants love the automated receipts, and I love the dashboard."
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">AD</div>
                <div>
                  <p className="font-semibold text-charcoal text-sm">Abiola D.</p>
                  <p className="text-muted text-xs">Landlord, 12 properties</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      <p className="mt-6 text-sm text-white/50 relative z-10">
        © {new Date().getFullYear()} RentFlow
      </p>
    </div>
  );
};

export default AuthLayout;
