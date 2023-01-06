const tranlations: Record<string, string> = {
    'PENDING': 'Очікується',
    'COMPLETED': 'Оплачено',
    'CANCELLED': 'Скасовано',
    'REJECTED': 'Відхилено',

}

export const getLocalizedStatus = (status: string) => {
    return tranlations[status];
}