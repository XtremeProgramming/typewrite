import { Navigate, Outlet } from 'react-router';

export default function ProtectedRoute() {
  const token = localStorage.getItem('access_token');

  return token ? <Outlet /> : <Navigate to="/signin" />;
}
