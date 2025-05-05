import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

// Component for routes that require authentication
export function ProtectedRoute({ children, requiredRole }) {
  const { isAuthenticated, userRole } = useAuth();
  const location = useLocation();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    toast.error('Please log in to access this page');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If role is required and doesn't match, redirect to dashboard
  if (requiredRole && userRole !== requiredRole) {
    toast.error(`Access denied: You need to be a ${requiredRole.replace('_', ' ')} to view this page`);
    return <Navigate to="/dashboard" replace />;
  }

  // Otherwise, render the children
  return children;
}

// Component for routes that should only be accessible when NOT authenticated
export function AuthRedirect({ children }) {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
}

export default ProtectedRoute;