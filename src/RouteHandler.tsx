import {
  Routes,
  Route,
} from 'react-router-dom';
import { Navigation } from './Navigation';
import { Cabinet } from './Pages/Cabinet/Cabinet';
import { Dashboard } from './Pages/Dashboard/Dashboard';
import { Login } from './Pages/Login/Login';
import { SuperAdmin } from './Pages/SuperAdmin/SuperAdmin';
import { Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { UserRole } from './providers/AuthProvider';
import { useEffect } from 'react';

export const RouteHandler = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={
          <Navigate to='/dashboard' />
        } />
        <Route path="/cabinet" element={
          <RouteAuthGuard userRoles={[UserRole.Admin]} redirectTo="/login">
            <Cabinet />
          </RouteAuthGuard>
        } />
        <Route path="/dashboard" element={
          <RouteAuthGuard userRoles={[UserRole.Admin, UserRole.Operator]} redirectTo="/login">
            <Dashboard />
          </RouteAuthGuard>
        } />
        <Route path="/super-admin" element={
          <RouteAuthGuard userRoles={[UserRole.SuperAdmin]} redirectTo="/login">
            <SuperAdmin />
          </RouteAuthGuard>
        } />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export function RouteAuthGuard({ children, redirectTo, userRoles }: { children: any, redirectTo: any, userRoles: UserRole[] }) {
  useEffect(()=>{
    console.log('RouteAuthGuard');
  }, [])
  const auth = useAuth();
  return !!auth?.user ? children : <Navigate to={redirectTo} replace />;
}
