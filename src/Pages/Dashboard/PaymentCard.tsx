import { Card, Dropdown, ListGroup, Button } from "react-bootstrap"
import { PaymentStatus } from "types.ts/payment";
import { getFormattedDateInLocalTimeZone } from "utils/date";
import { getLocalizedStatus } from "../../utils/statuses";
import copy from 'copy-to-clipboard';
import { FC, useCallback } from "react";
import { toast } from "react-toastify";
import { isDesktop } from "react-device-detect";

export interface IPaymentTableItem {
    _id: string;
    SK: string;
    amount: number;
    status: PaymentStatus;
    amountUAH: number;
    currency: string;
    createdByUserName: string;
    createdAt: string;
    description: string;
    receipNumber: string;
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

interface IProps {
    item: IPaymentTableItem,
    cancelPayment: (paymentSK: string) => Promise<void>
    isDetailsMode?: boolean
}

export const PaymentCard: FC<IProps> = ({ item, cancelPayment, isDetailsMode }) => {

    const handleClickToClipboard = useCallback(() => {
        const trimedSK = item.SK.split('Payment-')[1];
        const trimedID = item._id.split('Organization-')[1];
        copy(`${window.origin}/payment/${trimedID}/details/${trimedSK}`);
        toast('Посилання скопійовано', { type: 'success' })
    }, [item.SK, item._id]);

    const handlePay = useCallback(() => {
        if (isDesktop) {
            window.open(item.binanceResponse?.data?.checkoutUrl);
        }
        else {
            window.open(item.binanceResponse?.data?.deeplink)
        }
    }, [item.binanceResponse?.data?.checkoutUrl, item.binanceResponse?.data?.deeplink]);

    return (
        <Card style={{ marginBottom: '50px' }}>
            <Card.Body style={{ display: 'flex', justifyContent: 'center' }}>
                <img width="100%" src={process.env.PUBLIC_URL + '/logo_black.jpg'} alt="make payment" />
            </Card.Body>
            <Card.Img variant="top" src={item.binanceResponse.data.qrcodeLink} />
            <ListGroup className="list-group-flush">
                <ListGroup.Item>{`Чек ${item.receipNumber}`}</ListGroup.Item>
                {item.description && <ListGroup.Item>{`Опис ${item.description}`}</ListGroup.Item>}
                <ListGroup.Item>Ціна: {item.amountUAH?.toFixed(2)} ГРН</ListGroup.Item>
                <ListGroup.Item>Ціна: {item.amount.toFixed(2)} {item.currency}</ListGroup.Item>
                {!isDetailsMode && <ListGroup.Item>Створив: {item.createdByUserName}</ListGroup.Item>}
                <ListGroup.Item style={{ color: getColorFromStatus(item.status) }}>Статус: {getLocalizedStatus(item.status)}</ListGroup.Item>
                {item.createdAt && <ListGroup.Item>Дата: {getFormattedDateInLocalTimeZone(item.createdAt)}</ListGroup.Item>}
                {!isDetailsMode && <ListGroup.Item>
                    <Dropdown>
                        <Dropdown.Toggle style={{ width: '100%' }} variant="primary" id="dropdown-basic">
                            Дії
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleClickToClipboard}>Поділитись</Dropdown.Item>
                            <Dropdown.Item onClick={() => cancelPayment(item.SK)}>Відмінити</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                </ListGroup.Item>
                }
                {isDetailsMode && item.status === PaymentStatus.PENDING &&
                    <ListGroup.Item>
                        <Button style={{ width: '100%' }} onClick={handlePay}>
                            Оплатити
                        </Button>
                    </ListGroup.Item>
                }
            </ListGroup>

        </Card>
    )
}