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

export const RouteHandler = () => (
  <>
    <Navigation />
    <Routes>
      <Route path="/cabinet" element={
        <RouteAuthGuard redirectTo="/login">
          <Cabinet />
        </RouteAuthGuard>
      } />
      <Route path="/dashboard" element={
        <RouteAuthGuard redirectTo="/login">
          <Dashboard />
        </RouteAuthGuard>
      } />
      <Route path="/super-admin" element={
        <RouteAuthGuard redirectTo="/login">
          <SuperAdmin />
        </RouteAuthGuard>
      } />
      <Route path="/login" element={<Login />} />
    </Routes>
  </>
)

export function RouteAuthGuard({ children, redirectTo }: { children: any, redirectTo: any }) {
  const auth = useAuth();
  return !!auth?.checkIsLoggedIn() ? children : <Navigate to={redirectTo} replace />;
}
