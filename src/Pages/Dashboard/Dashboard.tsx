import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { CreatePaymentModal, ICreatePaymentFormProps } from './CreatePaymentModal';
import { useCallback, useEffect, useState } from 'react';
import { createSinglePayment } from '../../api/createSinglePayment';
import { getPayments } from '../../api/getPayments';
import { PaymentCard } from './PaymentCard';
import { Col, Row } from 'react-bootstrap';
import { IPayment } from '../../types.ts/payment';
import { cancelPayment } from '../../api/cancelPayment';
import { toast } from 'react-toastify';

export const Dashboard = () => {
    const [showCreatePaymentModal, setShowCreatePaymentModal] = useState<boolean>(false);

    const [payments, setPayments] = useState<IPayment[]>([]);

    const handleCreatePaymentClick = () => {
        setShowCreatePaymentModal(true);
    }

    const handleSubmitModal = async (values: ICreatePaymentFormProps) => {
        setShowCreatePaymentModal(false);
        await createSinglePayment({ receipeNumber: values.receipeNumber, amountBusd: values.amountBusd!, amountUah: values.amountUAH! });
        const res = await getPayments();
        setPayments(res.payments);
    }

    useEffect(() => {
        (async () => {
            const res = await getPayments();
            setPayments(res.payments);
        })();
        console.log("Dashboard");

        return () => {
            console.log('Destruct Dashboard');
        }
    }, []);

    const cancelPaymentCallback = useCallback(async (paymentSK: string) => {
        try {
            const success = await cancelPayment(paymentSK);
            if (!success) {
                toast('Something went wrong', { type: 'error' });
                return;
            }
            const res = await getPayments();
            setPayments(res.payments);
            toast('Successfully cancelled', { type: 'success' });
        } catch (e:any) {
            toast(e.response?.data?.message ?? 'Something went wrong', { type: 'error' });
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
                        <PaymentCard key={`pc-${s.SK}`} item={s} cancelPayment={cancelPaymentCallback} />
                    </Col>
                ))}
            </Row>
            <CreatePaymentModal show={showCreatePaymentModal} onClose={() => setShowCreatePaymentModal(false)} handleSubmit={handleSubmitModal} />
        </Container>
    )
}