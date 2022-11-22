import Container from 'react-bootstrap/Container';
import { IPaymentTableItem, PaymentsTable } from './Table';
import Button from 'react-bootstrap/Button';
import { CreatePaymentModal, ICreatePaymentFormProps } from './CreatePaymentModal';
import { useCallback, useEffect, useState } from 'react';
import { createSinglePayment } from '../../api/createSinglePayment';
import { getPayments } from '../../api/getPayments';
import { PaymentCard } from './PaymentCard';
import { Col, Row } from 'react-bootstrap';

// const payments: IPaymentTableItem[] = [
//     {_id: '1', amountUah: 240, amountCrypto: 5.4, cryptoCurrency: 'USDT', status: 'Pending', createdAt: new Date() },
//     {_id: '2', amountUah: 443, amountCrypto: 8.12, cryptoCurrency: 'USDT', status: 'Pending', createdAt: new Date() },
//     {_id: '3', amountUah: 812, amountCrypto: 20.1, cryptoCurrency: 'USDT', status: 'Pending', createdAt: new Date() }

// ]

export const Dashboard = () => {
    const [showCreatePaymentModal, setShowCreatePaymentModal] = useState<boolean>(false);

    const [payments, setPayments] = useState<IPaymentTableItem[]>([]);

    const handleCreatePaymentClick = () => {
        setShowCreatePaymentModal(true);
    }

    const handleSubmitModal = async (values: ICreatePaymentFormProps) => {
        setShowCreatePaymentModal(false);
        await createSinglePayment({ receipeNumber: values.receipeNumber, amountBusd: values.amountBusd! });
        await init();
    }

    const init = useCallback(async () => {
        const res = await getPayments();
        setPayments(res);
    }, [setPayments])

    useEffect(() => {
        init();
    }, [init])

    console.log(payments);
    return (
        <Container>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2>Payments: </h2>
                <Button variant="outline-primary" onClick={handleCreatePaymentClick}>Create payment</Button>
            </div>
            {/* <PaymentsTable items={payments} /> */}
            <Row>
                {payments.map(s => (
                    <Col md={3} sm={12}>
                        <PaymentCard item={s} />
                    </Col>
                ))}
            </Row>
            <CreatePaymentModal show={showCreatePaymentModal} onClose={() => setShowCreatePaymentModal(false)} handleSubmit={handleSubmitModal} />
        </Container>
    )
}