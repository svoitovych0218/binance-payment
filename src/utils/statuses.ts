import { PaymentStatus } from "types.ts/payment";

const tranlations: Record<PaymentStatus, string> = {
    'PENDING': 'Очікується',
    'COMPLETED': 'Оплачено',
    'CANCELLED': 'Скасовано',
    'REJECTED': 'Відхилено',
    'REFUNDED': 'Повернено'
}

export const getLocalizedStatus = (status: PaymentStatus) => {
    return tranlations[status];
}