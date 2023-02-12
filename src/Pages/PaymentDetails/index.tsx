import { FC, useEffect, useState } from "react";
import { PaymentCard } from "Pages/Dashboard/PaymentCard";
import { useParams } from "react-router-dom";
import { IPayment } from "types.ts/payment";
import { getPaymentDetails } from "api/getPaymentDetails";
import { PagePreloader } from "Components/PagePreloader/PagePreloader";
import { Container } from "react-bootstrap";

export const PaymentDetails: FC = () => {
  const { id, sk } = useParams();
  const [item, setItem] = useState<IPayment>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id && sk)
      (async () => {
        setIsLoading(true);
        try {
          const res = await getPaymentDetails(id, sk);
          setItem(res);
          console.log(res);
        }
        catch {

        }
        finally {
          setIsLoading(false);
        }
      })();
  }, [id, sk]);

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (id && sk) {
      interval = setInterval(async () => {
        const res = await getPaymentDetails(id, sk);
        setItem(res);
        console.log(res);
      }, 10000)
    }
    return () => clearInterval(interval);
  }, [id, sk]);


  return (
    <>
      {isLoading && <PagePreloader />}
      {item && !isLoading && <Container style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{maxWidth: '340px', marginTop: '50px'}}>
          <PaymentCard
            item={item}
            cancelPayment={(sk) => Promise.resolve()}
            isDetailsMode
          />
        </div>
      </Container>
      }
    </>
  );
}

