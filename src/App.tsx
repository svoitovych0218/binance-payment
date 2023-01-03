import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import { RouteHandler } from './RouteHandler';
import { AuthProvider } from './providers/AuthProvider';
import { ResetPasswordModal } from './Components/ResetPasswordModal/ResetPasswordModal';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <AuthProvider>
      <>
        <RouteHandler />
        <ResetPasswordModal />
        <ToastContainer/>
      </>
    </AuthProvider>
  );
}

export default App;
