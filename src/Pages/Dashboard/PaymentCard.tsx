import { Card, Dropdown, ListGroup } from "react-bootstrap"
import { PaymentStatus } from "types.ts/payment";
import { getFormattedDateInLocalTimeZone } from "utils/date";
import { getLocalizedStatus } from "../../utils/statuses";

export interface IPaymentTableItem {
    _id: string;
    SK: string;
    amount: number;
    status: PaymentStatus;
    currency: string;
    createdByUserName: string;
    createdAt: string;
    receipNumber?: string;
    binanceResponse: any;
}

const getColorFromStatus = (status: PaymentStatus) => {
    switch (status) {
        case 'COMPLETED':
            return 'green';
        case 'PENDING':
            return 'blue';
        case 'CANCELLED':
            return 'RED';
        case 'REFUNDED':
            return '#ca8a14'
        default:
            return 'gray';
    }
}

export const PaymentCard = ({ item, cancelPayment }: { item: IPaymentTableItem, cancelPayment: (paymentSK: string) => Promise<void> }) => {
    return (
        <Card style={{ marginBottom: '50px' }}>
            <Card.Body style={{ display: 'flex', justifyContent: 'center' }}>
                <img width="100%" src="logo_black.jpg" alt="make payment" />
            </Card.Body>
            <Card.Img variant="top" src={item.binanceResponse.data.qrcodeLink} />
            <ListGroup className="list-group-flush">
            <ListGroup.Item>{`#${item.SK}`}</ListGroup.Item>
            <ListGroup.Item>{`Чек #${item.receipNumber}`}</ListGroup.Item>
                <ListGroup.Item>Ціна: {item.amount.toFixed(2)} {item.currency}</ListGroup.Item>
                <ListGroup.Item>Створив: {item.createdByUserName}</ListGroup.Item>
                <ListGroup.Item style={{ color: getColorFromStatus(item.status) }}>Статус: {getLocalizedStatus(item.status)}</ListGroup.Item>
                <ListGroup.Item>Дата: {getFormattedDateInLocalTimeZone(item.createdAt)}</ListGroup.Item>
                <ListGroup.Item>
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            Дії
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => cancelPayment(item.SK)}>Cancel</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </ListGroup.Item>
            </ListGroup>
            {/* <Card.Body>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body> */}
        </Card>
    )
}