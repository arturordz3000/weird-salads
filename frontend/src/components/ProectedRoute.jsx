import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const ProtectedRoute = ({ children }) => {
  const [cookies] = useCookies();

  // Example: check if auth token exists
  const isAuthenticated = !!cookies.staffId;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;