import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import { RouteHandler } from './RouteHandler';
import { AuthProvider } from './providers/AuthProvider';
// import { ResetPasswordModal } from './Components/ResetPasswordModal/ResetPasswordModal';
import { ToastContainer } from 'react-toastify';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Headset } from 'react-bootstrap-icons';

const App = () => {
  return (
    <AuthProvider>
      <>

        <RouteHandler />
        {/* <ResetPasswordModal /> */}
        <ToastContainer />
        <OverlayTrigger
          placement='left'
          overlay={
            <Tooltip id="support">
              Підтримка
            </Tooltip>
          }
        >
          <Button
            as='a'
            target='_blank'
            href='https://t.me/makepay_bot'
            style={{
              width: 40,
              height: 40,
              position: 'fixed',
              right: '10px',
              bottom: '10px',
              zIndex: 20
            }}
          >
            <Headset />
          </Button>
        </OverlayTrigger>
      </>
    </AuthProvider>
  );
}

export default App;
