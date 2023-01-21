import { FC, useCallback, useMemo } from 'react';
import { Badge, Card, Col, Container, Row, Button } from 'react-bootstrap';
import { titleStyle, containerStyles, billingHistoryCardStyle } from 'Pages/PaymentRates/style';
import { useAuth } from 'hooks/useAuth';
import { getFormattedDateInLocalTimeZone } from 'utils/date';
import { useNavigate } from 'react-router-dom';
import { routes } from 'constants/routes';
import { BillingHistoryContainer } from 'Containers/BillingHistory';

export const BillingPage: FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const subscriptionPaidTill = auth?.user?.subscriptionPaidTill ?? '';

  const isSubscriptionActive = useMemo(() => {
    const currentDate = new Date().getTime();
    const subscriptionEndDate = new Date(subscriptionPaidTill).getTime();
    return currentDate < subscriptionEndDate;
  }, [subscriptionPaidTill]);

  const handleClickSubscriptionButton = useCallback(() => {
    navigate(routes.subscriptionRates);
  },[navigate]);

  return (
    <Container style={containerStyles}>
      <Row>
        <Col md={12} lg={6}>
          <Card>
            <Card.Title style={titleStyle}>Підписка</Card.Title>
            <Card.Body>
              <Row>
                <Col>
                  <Card.Text>Статус: </Card.Text>
                </Col>
                <Col>
                  <Badge bg={isSubscriptionActive ? 'primary' : 'danger'}>
                    {isSubscriptionActive ? 'Активна' : 'Неактивна'}
                  </Badge>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card.Text>Дійсна до: </Card.Text>
                </Col>
                <Col>
                  <Card.Text>{subscriptionPaidTill && getFormattedDateInLocalTimeZone(subscriptionPaidTill)}</Card.Text>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <Button onClick={handleClickSubscriptionButton}>
                Вибрати тарифний план
              </Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col md={12} lg={6}>
          <Card>
            <Card.Title style={titleStyle}>Баланс транзакцій</Card.Title>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card style={billingHistoryCardStyle}>
            <Card.Title style={titleStyle}>Історія Оплат</Card.Title>
            <BillingHistoryContainer />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}