import { PaymentrRateCard } from "Components/PaymentRateCard";
import { FC, useCallback, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { TierSubscripton } from "types.ts/billing";
import { subscriptionRates } from "constants/subscriptionRates";
import { createSubscriptionPayment } from "api/createSubscriptionPayment";
import { toast } from "react-toastify";

export const PaymentRates: FC = () => {
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(false);
  const handleClickSubscribeButton = useCallback(async (tier: TierSubscripton) => {
    setIsLoadingSubscription(true);
    try {
      const res = await createSubscriptionPayment(tier);
      window.open(res.data.url);
    }
    catch (error) {
      toast('Щось пішло не так', { type: 'error' })
    }
    finally {
      setIsLoadingSubscription(false);
    }
  },[]);

  return (
    <Container>
      <Row>
        <Col>
          <h2>Тарифні плани</h2>
        </Col>
      </Row>
      <Row>
        {Object.values(TierSubscripton).map(tier => <Col key={tier} md={6} lg={4} xl={3}>
          <PaymentrRateCard
            isLoading={isLoadingSubscription}
            onClick={() => handleClickSubscribeButton(tier)}
            {...subscriptionRates[tier]}
          />
        </Col>)}
      </Row>
    </Container>
  )
}