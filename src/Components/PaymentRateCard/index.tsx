import { Badge, Card, Button } from 'react-bootstrap';
import { FC } from 'react';
import { badgeStyles, titleStyle, subtitleStyle, footerStyle, cardStyle } from './style';
import { ISubscriptionRate } from 'types.ts/billing';

interface IProps extends ISubscriptionRate {
  onClick: () => void
  isLoading?: boolean
}

export const PaymentrRateCard: FC<IProps> = ({ isBestPrice, price, duration, onClick, isLoading }) => {
  return (
    <Card style={cardStyle}>
      {isBestPrice && <Badge style={badgeStyles}>
        Краща ціна
      </Badge>
      }
      <Card.Title style={titleStyle}>
        {duration}
      </Card.Title>
      <Card.Subtitle style={subtitleStyle}>
        {price}грн/місяць
      </Card.Subtitle>
      <Card.Footer style={footerStyle}>
        <Button disabled={isLoading} onClick={onClick}>Вибрати</Button>
      </Card.Footer>
    </Card>
  );
}