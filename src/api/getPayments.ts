import { config } from "../config"
import { IPayment } from "../types.ts/payment";
import api from "./auth/utils/jwtInterceptor";

export const getPayments = async (from?: string, to?: string, paidOnly?: boolean) => {
    const res = await api.get(`${config.baseUrl}/payments?startFrom=${from}&toDate=${to}&paidOnly=${paidOnly ? 'true' : ''}`);

    return res.data.data as {payments: IPayment[], completedPaymentsSum: number };
}