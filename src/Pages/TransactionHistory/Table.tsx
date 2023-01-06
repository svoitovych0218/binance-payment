import { useCallback, useEffect, useState } from 'react';
import { Button, Form, FormGroup } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { toast } from 'react-toastify';
import { getExcelReport } from '../../api/getExcelReport';
import { getPayments } from '../../api/getPayments';
import { IPayment } from '../../types.ts/payment';

interface IFilters {
    from: string;
    to: string;
    paidOnly: boolean;
}

const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
}

const getColorFromStatus = (status: string) => {
    switch (status) {
        case 'COMPLETED':
            return 'green';
        case 'PENDING':
            return 'blue';
        case 'CANCELLED':
            return 'RED';
        default:
            return 'gray';
    }
}

export const PaymentsTable = () => {
    const date = new Date();
    const firstMonthDate = formatDate(new Date(date.getFullYear(), date.getMonth(), 1));
    const now = formatDate(date);

    const [filters, setFilters] = useState<IFilters>({
        from: firstMonthDate,
        to: now,
        paidOnly: false
    });

    const [payments, setPayments] = useState<IPayment[]>([]);
    const [completedTotal, setCompletedTotal] = useState<number | undefined>();

    useEffect(() => {
        (async () => {
            const res = await getPayments(new Date(filters.from).toISOString(), new Date(filters.to).toISOString(), filters.paidOnly);
            setPayments(res.payments);
            setCompletedTotal(res.completedPaymentsSum);
        })()
    }, [filters]);

    const getExcellReportCallback = useCallback(async () => {
        try {
            const url = await getExcelReport(new Date(filters.from).toISOString(), new Date(filters.to).toISOString(), filters.paidOnly);
            window.open(url);
        } catch (e: any) {
            toast(e.response?.data?.message ?? 'Something went wrong', { type: 'error' });
        }
    }, [filters]);

    return (
        <>
            <div style={{ display: 'flex', margin: '20px 0' }}>
                <Form.Group style={{ display: 'flex' }}>
                    <Form.Label>From</Form.Label>
                    <Form.Control
                        style={{ width: '300px' }}
                        className='ml-2'
                        size='sm'
                        type="date"
                        value={filters.from}
                        name='from'
                        onChange={(e) => setFilters(prev => ({ ...prev, from: e.target.value }))} />
                </Form.Group>
                <Form.Group className='ml-4' style={{ display: 'flex' }}>
                    <Form.Label>To</Form.Label>
                    <Form.Control
                        className='ml-2'
                        style={{ width: '300px' }}
                        size='sm' type="date"
                        value={filters.to}
                        name='to'
                        onChange={(e) => setFilters(prev => ({ ...prev, to: e.target.value }))} />
                </Form.Group>
                <Form.Group className='ml-4'>
                    <Form.Check label="Paid only" checked={filters.paidOnly} onChange={() => setFilters(prev => ({ ...prev, paidOnly: !prev.paidOnly }))} />
                </Form.Group>
                <FormGroup className='ml-4'>
                    <Button variant='outline-primary' onClick={() => getExcellReportCallback()}>Excel Звіт</Button>
                </FormGroup>
            </div>
            <div>
                {completedTotal && <h6>Completed payments total amount: {completedTotal.toFixed(2)}</h6>}
            </div>
            <Table size='sm' striped bordered hover >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Сума</th>
                        <th>Сума</th>
                        <th>Створив</th>
                        <th>Статус</th>
                        <th>Відмінив</th>
                        <th>Створено</th>
                        <th>Оплачено</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map(s => (
                        <tr key={s.SK}>
                            <td>{s.SK}</td>
                            <td>{s.amountUAH} UAH</td>
                            <td>{s.amount.toFixed(2)} {s.currency}</td>
                            <td>{s.createdByUserName}</td>
                            <td style={{ color: getColorFromStatus(s.status) }}>{s.status}</td>
                            <td>{s.cancelledBy}</td>
                            <td>{new Date(s.createdAt).toLocaleDateString() + ' ' + new Date(s.createdAt).toLocaleTimeString()}</td>
                            <td>{s.paidAt}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}