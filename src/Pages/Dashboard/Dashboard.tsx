import Container from 'react-bootstrap/Container';
import { IPaymentTableItem } from './Table';
import Button from 'react-bootstrap/Button';
import { CreatePaymentModal, ICreatePaymentFormProps } from './CreatePaymentModal';
import { useCallback, useEffect, useState } from 'react';
import { createSinglePayment } from '../../api/createSinglePayment';
import { getPayments } from '../../api/getPayments';
import { PaymentCard } from './PaymentCard';
import { Col, Row } from 'react-bootstrap';

export const Dashboard = () => {
    const [showCreatePaymentModal, setShowCreatePaymentModal] = useState<boolean>(false);

    const [payments, setPayments] = useState<IPaymentTableItem[]>([]);

    const handleCreatePaymentClick = () => {
        setShowCreatePaymentModal(true);
    }

    const handleSubmitModal = async (values: ICreatePaymentFormProps) => {
        setShowCreatePaymentModal(false);
        await createSinglePayment({ receipeNumber: values.receipeNumber, amountBusd: values.amountBusd! });
        const res = await getPayments();
        setPayments(res);
    }



    useEffect(() => {
        (async () => {
            const res = await getPayments();
            setPayments(res);
        })();
        console.log("Dashboard");

        return () => {
            console.log('Destruct Dashboard');
        }
    }, [])

    return (
        <Container>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 20px' }}>
                <h2>Платежі</h2>
                <Button variant="outline-primary" onClick={handleCreatePaymentClick}>Створити платіж</Button>
            </div>
            {/* <PaymentsTable items={payments} /> */}
            <Row>
                {payments.map(s => (
                    <Col key={`col-${s.SK}`} md={3} sm={12}>
                        <PaymentCard key={`pc-${s.SK}`} item={s} />
                    </Col>
                ))}
            </Row>
            <CreatePaymentModal show={showCreatePaymentModal} onClose={() => setShowCreatePaymentModal(false)} handleSubmit={handleSubmitModal} />
        </Container>
    )
}