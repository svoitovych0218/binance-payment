import { Button, Form, FormGroup, Tooltip, OverlayTrigger, Spinner } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { getLocalizedStatus } from '../../utils/statuses';
import { getFormattedDateInLocalTimeZone } from 'utils/date';
import { useTransactionHistory } from './useTransactionHistory/useTransactionHistory';
import { TransactionHistoryFiltersActionTypes } from 'types.ts/payment';
import { PaymentStatus } from 'types.ts/payment';
import { Cash } from 'react-bootstrap-icons';
import { LoadingButton } from 'Components/LoadingButton';
import { useRef } from 'react';

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

export const PaymentsTable = () => {
    const timeout = useRef<NodeJS.Timeout>();
    const {
        completedTotal,
        payments,
        filters,
        dispatch,
        getExcellReportCallback,
        isLoadingPayments,
        fetchMorePayments,
        handleOpenRefundModal,
        refundModalElement
    } = useTransactionHistory();

    return (
        <>
            <div style={{ display: 'flex', margin: '20px 0' }}>
                <Form.Group>
                    <Form.Label>Пошук</Form.Label>
                    <Form.Control
                        style={{ width: '300px' }}
                        size='sm'
                        placeholder="Введіть номер чеку"
                        type="text"
                        name='search'
                        onChange={(e) => {
                            clearTimeout(timeout.current);
                            timeout.current = setTimeout(() => {
                                dispatch({
                                    type: TransactionHistoryFiltersActionTypes.SET_SEARCH,
                                    payload: e.target.value
                                })
                            }, 1000);

                        }} />
                </Form.Group>
                <Form.Group className='ml-2'>
                    <Form.Label>Від</Form.Label>
                    <Form.Control
                        style={{ width: '150px' }}
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
                <Form.Group className='ml-2'>
                    <Form.Label>До</Form.Label>
                    <Form.Control
                        style={{ width: '150px' }}
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
                <Form.Group className='ml-2' style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Form.Check label="Оплачені" checked={filters.paidOnly} onChange={(e) => dispatch({
                        type: TransactionHistoryFiltersActionTypes.SET_PAID_ONLY,
                        payload: {
                            paidOnly: e.target.checked
                        }
                    })} />
                </Form.Group>
                <FormGroup style={{ marginLeft: 'auto' }}>
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
                        <th>Створено</th>
                        <th>Оплачено</th>
                        <th></th>
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
                            <td style={{ color: getColorFromStatus(s.status), textAlign: 'center' }}>
                                {getLocalizedStatus(s.status)} <br />
                                {s.status === PaymentStatus.REFUNDED && s.refundedBy && <div style={{ color: 'initial' }}>
                                    ({s.refundedBy})
                                </div>}
                                {s.status === PaymentStatus.CANCELLED && s.cancelledBy && <div style={{ color: 'initial' }}>
                                    ({s.cancelledBy})
                                </div>}
                            </td>
                            <td>{getFormattedDateInLocalTimeZone(s.createdAt)}</td>
                            <td>{s.paidAt && getFormattedDateInLocalTimeZone(s.paidAt)}</td>
                            <td>{s.status === PaymentStatus.COMPLETED &&
                                <OverlayTrigger
                                    placement='top'
                                    overlay={
                                        <Tooltip id={`tooltip-${s.SK}`}>
                                            Повернути кошти
                                        </Tooltip>
                                    }
                                >
                                    <Cash
                                        width={20}
                                        height={20}
                                        onClick={() => handleOpenRefundModal(s.SK)}
                                        cursor="pointer"
                                        color='green'
                                    />
                                </OverlayTrigger>
                            }</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {refundModalElement}
            {isLoadingPayments && <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '50px',
                    marginBottom: '50px'
                }}>
                <Spinner animation="border" variant="primary" />
            </div>
            }
            {filters.cursor && !isLoadingPayments && <div style={{ textAlign: 'center' }}>
                <LoadingButton
                    isLoading={isLoadingPayments}
                    onClick={fetchMorePayments}
                >
                    Завантажити ще
                </LoadingButton>
            </div>
            }
        </>
    );
}