import './App.css';
import { RouteHandler } from './RouteHandler';
import { AuthProvider } from './providers/AuthProvider';
import { useEffect } from 'react';




const App = () => {
  // const [data, setData] = useState<IPaymentData | undefined>(undefined);
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  // const onPaymentClick = useCallback(async () => {
  //   setIsLoading(true);
  //   const res = await axios.post('https://ux8qu8rh13.execute-api.us-west-1.amazonaws.com/dev/create-order');
  //   if (res.data.status === 'SUCCESS') {
  //     setData(res.data.data);
  //   }
  //   setIsLoading(false);
  // }, [setData]);

  useEffect(()=>{
    console.log('App');

    return () => {
      console.log('Destruct App');
    }
  }, []);

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <button disabled={isLoading} className='binance-checkout' onClick={onPaymentClick}>Checkout</button>
    //     {data && <a className='binance-pay' href={isMobile ? data?.deeplink : data?.checkoutUrl} target="_blank" rel="noreferrer">Pay</a>}
    //   </header>
    // </div>
   <AuthProvider>
      <RouteHandler />
    </AuthProvider>
  );
}

export default App;
