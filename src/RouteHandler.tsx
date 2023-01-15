import {
  Routes,
  Route,
} from 'react-router-dom';
import { Navigation } from './Navigation';
import { Dashboard } from './Pages/Dashboard/Dashboard';
import { Login } from './Pages/Login/Login';
import { SuperAdmin } from './Pages/SuperAdmin/SuperAdmin';
import { Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { UserRole } from './providers/AuthProvider';
import { useEffect } from 'react';
import { TransactionHistory } from './Pages/TransactionHistory/TransactionHistory';
import { Users } from './Pages/Users/Users';
import { ApiKeys } from './Pages/ApiKeys/ApiKeys';
import { PasswordRecoveryRequest } from './Pages/PasswordRecovery/PasswordRecoveryRequest';
import { PasswordRecoveryConfirmation } from './Pages/PasswordRecoveryConfirmation/PasswordRecoveryConfirmation';
import { Registration } from './Pages/Registration/Registration';
import { PagePreloader } from './Components/PagePreloader/PagePreloader';
import { EmailConfirmation } from './Pages/EmailConfirmation/EmailConfirmation';
import { EmailNotActivated } from './Pages/EmailNotActivated/EmailNotActivated';

export const RouteHandler = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={
          <Navigate to='/dashboard' />
        } />
        <Route path="/transaction-history" element={
          <RouteAuthGuard userRoles={[UserRole.Owner, UserRole.Admin]} redirectTo="/login">
            <TransactionHistory />
          </RouteAuthGuard>
        } />
        <Route path="/configurations" element={
          <RouteAuthGuard userRoles={[UserRole.Admin, UserRole.Owner]} redirectTo="/login">
            <Users />
          </RouteAuthGuard>
        } />
        <Route path="/dashboard" element={
          <RouteAuthGuard userRoles={[UserRole.Admin, UserRole.Operator, UserRole.Owner]} redirectTo="/login">
            <Dashboard />
          </RouteAuthGuard>
        } />
        <Route path="/super-admin" element={
          <RouteAuthGuard userRoles={[UserRole.SuperAdmin]} redirectTo="/login">
            <SuperAdmin />
          </RouteAuthGuard>
        } />
        <Route path="/api-keys" element={
          <RouteAuthGuard userRoles={[UserRole.Owner]} redirectTo="/dashboard">
            <ApiKeys />
          </RouteAuthGuard>
        } />
        <Route path="/password-recovery" element={
          <PasswordRecoveryRequest />
        } />
        <Route path="/recovery-password-confirmation*" element={
          <PasswordRecoveryConfirmation />
        }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/email-confirmation" element={<EmailConfirmation />} />
        <Route path='/email-not-confirmed' element={<EmailNotActivated />} />
      </Routes>
    </>
  )
}

export function RouteAuthGuard({ children, redirectTo, userRoles }: { children: any, redirectTo: any, userRoles: UserRole[] }) {
  useEffect(() => {
    console.log('RouteAuthGuard');
  }, []);
  const auth = useAuth();
  console.log('isLoading', auth?.isLoading);
  console.log('user:', auth?.user)
  return !!auth?.isLoading
    ? <PagePreloader />
    : !!auth?.user
      ? !!auth?.user?.emailConfirmed
        ? userRoles.some(s => {
          return s === auth?.user?.role
        })
          ? children
          : <Navigate to={'/dashboard'} />
        : <Navigate to={'/email-not-confirmed'} />
      : <Navigate to={redirectTo} replace />;
}