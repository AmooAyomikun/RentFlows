import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';

/**
 * ProtectedRoute — redirects to /login if not authenticated.
 */
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

/**
 * RoleRoute — redirects to the correct dashboard if the user's role doesn't match.
 * @param {'landlord'|'tenant'} role - Required role for this route
 */
export const RoleRoute = ({ role, children }) => {
  const { isAuthenticated, role: userRole } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (userRole !== role) {
    const dashPath = userRole === 'tenant' ? '/tenant/dashboard' : '/landlord/dashboard';
    return <Navigate to={dashPath} replace />;
  }

  return children;
};

/**
 * PublicOnlyRoute — redirects authenticated users to their dashboard.
 * Used for /login and /signup.
 */
export const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated, role } = useAuthStore();

  if (isAuthenticated) {
    const dashPath = role === 'tenant' ? '/tenant/dashboard' : '/landlord/dashboard';
    return <Navigate to={dashPath} replace />;
  }

  return children;
};
