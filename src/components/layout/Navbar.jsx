import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, LogIn } from 'lucide-react';
import Button from '../ui/Button';
import useAuthStore from '../../store/authStore';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Features', href: '/features' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'For Landlords', href: '/for-landlords' },
  { label: 'For Tenants', href: '/for-tenants' },
  { label: 'Resources', href: '/resources' },
  { label: 'Pricing', href: '/pricing' },
];

/**
 * Marketing navbar — sticky, transparent-to-solid on scroll.
 * Collapses into a slide-in drawer below 1024px.
 */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, role } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close drawer on route change
  useEffect(() => { setMobileOpen(false); }, []);

  const dashboardPath = role === 'tenant' ? '/tenant/dashboard' : '/landlord/dashboard';

  return (
    <>
      <header
        className={[
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          scrolled || mobileOpen
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-border/60'
            : 'bg-transparent',
        ].join(' ')}
        role="banner"
      >
        <div className="max-w-marketing mx-auto px-6">
          <div className="flex items-center justify-between h-12 lg:h-14">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 font-display font-bold text-xl text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
              aria-label="RentFlow — Go to homepage"
            >
              <LogoMark />
              <span>RentFlow</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1" aria-label="Main navigation">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  className={({ isActive }) =>
                    [
                      'px-1.5 xl:px-2 py-1.5 text-[12px] xl:text-[13px] font-medium rounded transition-colors duration-150',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                      isActive
                        ? 'text-primary bg-primary/6'
                        : 'text-body hover:text-primary hover:bg-primary/4',
                    ].join(' ')
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              {isAuthenticated ? (
                <Button
                  size="sm"
                  onClick={() => navigate(dashboardPath)}
                >
                  Go to Dashboard
                </Button>
              ) : (
                <>
                  <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                    Log In
                  </Button>
                  <Button size="sm" onClick={() => navigate('/signup')}>
                    Get Started
                  </Button>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 text-charcoal rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-drawer"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-30 bg-charcoal/30 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              id="mobile-drawer"
              className="fixed top-16 left-0 right-0 z-30 bg-white border-b border-border shadow-lg lg:hidden"
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <nav className="px-6 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      [
                        'px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                        isActive
                          ? 'text-primary bg-primary/8'
                          : 'text-body hover:text-primary hover:bg-warm',
                      ].join(' ')
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                <div className="flex flex-col gap-2 pt-4 border-t border-border mt-2">
                  {isAuthenticated ? (
                    <Button size="md" onClick={() => { navigate(dashboardPath); setMobileOpen(false); }}>
                      Go to Dashboard
                    </Button>
                  ) : (
                    <>
                      <Button variant="outline" size="md" onClick={() => { navigate('/login'); setMobileOpen(false); }}>
                        Log In
                      </Button>
                      <Button size="md" onClick={() => { navigate('/signup'); setMobileOpen(false); }}>
                        Get Started
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

/** RentFlow brand mark SVG */
const LogoMark = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <rect width="28" height="28" rx="6" fill="#0B4F45" />
    <path
      d="M8 20V12l6-4 6 4v8"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11 20v-4h6v4"
      stroke="#C75B30"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export { LogoMark };
export default Navbar;
