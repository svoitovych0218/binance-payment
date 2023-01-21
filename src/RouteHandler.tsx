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
import { routes } from 'constants/routes';
import { PaymentRates } from 'Pages/PaymentRates';
import { BillingPage } from 'Pages/Billing';

export const RouteHandler = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path={routes.baseRoute} element={
          <Navigate to={routes.dashboard} />
        } />
        <Route path={routes.transactionHistory} element={
          <RouteAuthGuard userRoles={[UserRole.Owner, UserRole.Admin]} redirectTo={routes.login}>
            <TransactionHistory />
          </RouteAuthGuard>
        } />
        <Route path={routes.configurations} element={
          <RouteAuthGuard userRoles={[UserRole.Admin, UserRole.Owner]} redirectTo={routes.login}>
            <Users />
          </RouteAuthGuard>
        } />
        <Route path={routes.dashboard} element={
          <RouteAuthGuard userRoles={[UserRole.Admin, UserRole.Operator, UserRole.Owner]} redirectTo={routes.login}>
            <Dashboard />
          </RouteAuthGuard>
        } />
        <Route path={routes.superAdmin} element={
          <RouteAuthGuard userRoles={[UserRole.SuperAdmin]} redirectTo={routes.login}>
            <SuperAdmin />
          </RouteAuthGuard>
        } />
        <Route path={routes.apiKeys} element={
          <RouteAuthGuard userRoles={[UserRole.Owner]} redirectTo={routes.dashboard}>
            <ApiKeys />
          </RouteAuthGuard>
        } />
        <Route path={routes.passwordRecovery} element={
          <PasswordRecoveryRequest />
        } />
        <Route path={routes.recoveryPasswordConfirmation} element={
          <PasswordRecoveryConfirmation />
        }
        />
        <Route path={routes.billing} element={
          <RouteAuthGuard userRoles={[UserRole.Admin, UserRole.Owner]} redirectTo={routes.dashboard}>
            <BillingPage />
          </RouteAuthGuard>
        } />
        <Route path={routes.subscriptionRates} element={<PaymentRates />} />
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.registration} element={<Registration />} />
        <Route path={routes.emailConfirmation} element={<EmailConfirmation />} />
        <Route path={routes.emailNotConfirmed} element={<EmailNotActivated />} />
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
          : <Navigate to={routes.dashboard} />
        : <Navigate to={routes.emailNotConfirmed} />
      : <Navigate to={redirectTo} replace />;
}