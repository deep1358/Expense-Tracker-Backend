import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { loggedIn } = useSelector((state) => state.user);
  if (!loggedIn) return <Navigate to="/login" replace />;
  return <Outlet />;
};

export default ProtectedRoute;
