import { Button, Form, FormGroup, Spinner } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { getLocalizedStatus } from '../../utils/statuses';
import { getFormattedDateInLocalTimeZone } from 'utils/date';
import { useTransactionHistory } from './useTransactionHistory/useTransactionHistory';
import { TransactionHistoryFiltersActionTypes } from 'types.ts/payment';
import { useIntersection } from 'react-use';
import { useEffect, useRef } from 'react';

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
    const refDiv = useRef<HTMLDivElement>(null);
    const intersection = useIntersection(refDiv, {
        root: null,
        rootMargin: '0px',
        threshold: 1
    });
    const {
        completedTotal,
        payments,
        filters,
        dispatch,
        getExcellReportCallback,
        isLoadingPayments,
        fetchMorePayments
    } = useTransactionHistory();

    useEffect(() => {
        intersection?.isIntersecting && !isLoadingPayments && fetchMorePayments();
    },[intersection?.isIntersecting, fetchMorePayments, isLoadingPayments]);

    return (
        <>
            <div style={{ display: 'flex', margin: '20px 0' }}>
                <Form.Group style={{ display: 'flex' }}>
                    <Form.Label>Від</Form.Label>
                    <Form.Control
                        style={{ width: '300px' }}
                        className='ml-2'
                        size='sm'
                        type="date"
                        value={getFormattedDateInLocalTimeZone(filters.from, 'yyyy-MM-dd')}
                        name='from'
                        onChange={(e) => dispatch({
                            type: TransactionHistoryFiltersActionTypes.SET_FROM_DATE,
                            payload: {
                                from: e.target.value
                            }
                        })} />
                </Form.Group>
                <Form.Group className='ml-4' style={{ display: 'flex' }}>
                    <Form.Label>До</Form.Label>
                    <Form.Control
                        className='ml-2'
                        style={{ width: '300px' }}
                        size='sm' type="date"
                        value={getFormattedDateInLocalTimeZone(filters.to, 'yyyy-MM-dd')}
                        name='to'
                        onChange={(e) => dispatch({
                            type: TransactionHistoryFiltersActionTypes.SET_TO_DATE,
                            payload: {
                                to: e.target.value
                            }
                        })} />
                </Form.Group>
                <Form.Group className='ml-4'>
                    <Form.Check label="Оплачені" checked={filters.paidOnly} onChange={(e) => dispatch({
                        type: TransactionHistoryFiltersActionTypes.SET_PAID_ONLY,
                        payload: {
                            paidOnly: e.target.checked
                        }
                    })} />
                </Form.Group>
                <FormGroup className='ml-4'>
                    <Button variant='outline-primary' onClick={() => getExcellReportCallback()}>Excel Звіт</Button>
                </FormGroup>
            </div>
            <div>
                {completedTotal !== undefined && <h6>Загальна сума здійснених платежів: {completedTotal.toFixed(2)}</h6>}
            </div>
            <Table size='sm' striped bordered hover >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Чек #</th>
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
                            <td>{s.receipNumber}</td>
                            <td>{s.amountUAH} UAH</td>
                            <td>{s.amount.toFixed(2)} {s.currency}</td>
                            <td>{s.createdByUserName}</td>
                            <td style={{ color: getColorFromStatus(s.status) }}>{getLocalizedStatus(s.status)}</td>
                            <td>{s.cancelledBy}</td>
                            <td>{getFormattedDateInLocalTimeZone(s.createdAt)}</td>
                            <td>{s.paidAt && getFormattedDateInLocalTimeZone(s.paidAt)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {isLoadingPayments && <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px', marginBottom: '50px' }}>
                <Spinner animation="border" variant="primary"/>
            </div>
            }
            <div ref={refDiv}></div>
        </>
    );
}