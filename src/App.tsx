import './App.css';
import { RouteHandler } from './RouteHandler';
import { AuthProvider } from './providers/AuthProvider';
import { ResetPasswordModal } from './Components/ResetPasswordModal/ResetPasswordModal';

const App = () => {
  return (
    <AuthProvider>
      <>
        <RouteHandler />
        <ResetPasswordModal />
      </>
    </AuthProvider>
  );
}

export default App;
