import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import useAuthStore from '../store/authStore';

// Layouts
import MarketingLayout from '../components/layout/MarketingLayout';
import AuthLayout from '../components/layout/AuthLayout';
import LandlordLayout from '../components/layout/LandlordLayout';
import TenantLayout from '../components/layout/TenantLayout';

// Marketing Pages
import Home from '../pages/marketing/Home';
import Features from '../pages/marketing/Features';
import Pricing from '../pages/marketing/Pricing';
import ForLandlords from '../pages/marketing/ForLandlords';
import ForTenants from '../pages/marketing/ForTenants';
import HowItWorks from '../pages/marketing/HowItWorks';
import Testimonials from '../pages/marketing/Testimonials';
import About from '../pages/marketing/About';
import FAQ from '../pages/marketing/FAQ';
import Blog from '../pages/marketing/Blog';
import BlogPost from '../pages/marketing/BlogPost';
import Contact from '../pages/marketing/Contact';
import PrivacyPolicy, { TermsOfService } from '../pages/marketing/Legal';

// Auth Pages
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';

// Landlord Pages
import LandlordDashboard from '../pages/landlord/LandlordDashboard';
import Properties from '../pages/landlord/Properties';
import AddProperty from '../pages/landlord/AddProperty';
import PropertyDetail from '../pages/landlord/PropertyDetail';
import Tenants from '../pages/landlord/Tenants';
import Payments from '../pages/landlord/Payments';
import Maintenance from '../pages/landlord/Maintenance';
import Reports from '../pages/landlord/Reports';
import Settings from '../pages/landlord/Settings';

// Tenant Pages
import TenantDashboard from '../pages/tenant/TenantDashboard';
import TenantLease from '../pages/tenant/TenantLease';
import TenantPayments from '../pages/tenant/TenantPayments';
import TenantMaintenance from '../pages/tenant/TenantMaintenance';
import TenantSettings from '../pages/tenant/TenantSettings';

// Fallbacks
import NotFound from '../pages/NotFound';
import PlaceholderView from '../pages/PlaceholderView';
import Notifications from '../pages/Notifications';

// Route Guards
const RequireAuth = ({ children, allowedRole }) => {
  const { user, isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRole && user?.role !== allowedRole) {
    // Redirect to their respective dashboard if they try to access the wrong role's area
    return <Navigate to={user?.role === 'landlord' ? '/landlord/dashboard' : '/tenant/dashboard'} replace />;
  }

  return children;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppRouter = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Marketing Routes */}
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/for-landlords" element={<ForLandlords />} />
          <Route path="/for-tenants" element={<ForTenants />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Route>

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* Landlord Routes */}
        <Route
          path="/landlord"
          element={
            <RequireAuth allowedRole="landlord">
              <LandlordLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<LandlordDashboard />} />
          <Route path="properties" element={<Properties />} />
          <Route path="properties/new" element={<AddProperty />} />
          <Route path="properties/:id" element={<PropertyDetail />} />
          <Route path="properties/:id/units/new" element={<PlaceholderView title="Add Unit" type="Unit Creation" />} />
          <Route path="properties/:id/units/:unitId" element={<PlaceholderView title="Unit Details" type="Unit View" />} />
          <Route path="tenants" element={<Tenants />} />
          <Route path="tenants/:id" element={<PlaceholderView title="Tenant Profile" type="Tenant Record" />} />
          <Route path="payments" element={<Payments />} />
          <Route path="maintenance" element={<Maintenance />} />
          <Route path="maintenance/:id" element={<PlaceholderView title="Maintenance Ticket" type="Ticket View" />} />
          <Route path="reports" element={<Reports />} />
          <Route path="notifications" element={<Notifications role="landlord" />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Tenant Routes */}
        <Route
          path="/tenant"
          element={
            <RequireAuth allowedRole="tenant">
              <TenantLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<TenantDashboard />} />
          <Route path="lease" element={<TenantLease />} />
          <Route path="pay-rent" element={<TenantPayments />} />
          <Route path="payments" element={<TenantPayments />} />
          <Route path="maintenance" element={<TenantMaintenance />} />
          <Route path="maintenance/:id" element={<PlaceholderView title="Maintenance Ticket" type="Ticket View" />} />
          <Route path="notifications" element={<Notifications role="tenant" />} />
          <Route path="settings" element={<TenantSettings />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRouter;
