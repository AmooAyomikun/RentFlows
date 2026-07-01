import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import useAuthStore from '../store/authStore';

// Layouts
import MarketingLayout from '../components/layout/MarketingLayout';
import AuthLayout from '../components/layout/AuthLayout';
import LandlordLayout from '../components/layout/LandlordLayout';
import TenantLayout from '../components/layout/TenantLayout';
import DashboardLayout from '../components/layout/DashboardLayout';

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
import Solutions from '../pages/marketing/Solutions';
import Resources from '../pages/marketing/Resources';
// Auth Pages
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import VerifyEmail from '../pages/auth/VerifyEmail';

// Landlord Pages
import LandlordDashboard from '../pages/landlord/LandlordDashboard';
import Properties from '../pages/landlord/Properties';
import AddProperty from '../pages/landlord/AddProperty';
import PropertyDetail from '../pages/landlord/PropertyDetail';
import Tenants from '../pages/landlord/Tenants'; // Force reload
import TenantDetail from '../pages/landlord/TenantDetail';
import Payments from '../pages/landlord/Payments';
import PaymentDetail from '../pages/landlord/PaymentDetail';
import Maintenance from '../pages/landlord/Maintenance';
import MaintenanceDetail from '../pages/landlord/MaintenanceDetail';
import Reports from '../pages/landlord/Reports';
import Settings from '../pages/landlord/Settings';
import LandlordProfile from '../pages/landlord/LandlordProfile';

// Tenant Pages
import TenantDashboard from '../pages/tenant/TenantDashboard';
import TenantLease from '../pages/tenant/TenantLease';
import TenantPayments from '../pages/tenant/TenantPayments';
import TenantPayRent from '../pages/tenant/TenantPayRent';
import TenantReceipts from '../pages/tenant/TenantReceipts';
import TenantMaintenance from '../pages/tenant/TenantMaintenance';
import TenantSettings from '../pages/tenant/TenantSettings';
import TenantReportIssue from '../pages/tenant/TenantReportIssue';
import TenantProfile from '../pages/tenant/TenantProfile';
import TenantSupport from '../pages/tenant/TenantSupport';

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
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/resources" element={<Resources />} />
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
          <Route path="/verify-email" element={<VerifyEmail />} />
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
          <Route path="tenants/:id" element={<TenantDetail />} />
          <Route path="payments" element={<Payments />} />
          <Route path="payments/:id" element={<PaymentDetail />} />
          <Route path="maintenance" element={<Maintenance />} />
          <Route path="maintenance/:id" element={<MaintenanceDetail />} />
          <Route path="reports" element={<Reports />} />
          <Route path="notifications" element={<Notifications role="landlord" />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<LandlordProfile />} />
        </Route>

        {/* Tenant Routes */}
        <Route
          path="/tenant"
          element={
            <RequireAuth allowedRole="tenant">
              <DashboardLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<TenantDashboard />} />
          <Route path="lease" element={<TenantLease />} />
          <Route path="pay-rent" element={<TenantPayRent />} />
          <Route path="payments" element={<TenantPayments />} />
          <Route path="receipts" element={<TenantReceipts />} />
          <Route path="maintenance" element={<TenantMaintenance />} />
          <Route path="report-issue" element={<TenantReportIssue />} />
          <Route path="support" element={<TenantSupport />} />
          <Route path="maintenance/:id" element={<PlaceholderView title="Maintenance Ticket" type="Ticket View" />} />
          <Route path="notifications" element={<Notifications role="tenant" />} />
          <Route path="settings" element={<TenantSettings />} />
          <Route path="profile" element={<TenantProfile />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRouter;
