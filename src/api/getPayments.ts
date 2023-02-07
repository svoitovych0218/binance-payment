import { config } from "../config"
import { ILastEvaluatedKey, IPayment } from "../types.ts/payment";
import api from "./auth/utils/jwtInterceptor";

export const getPayments = async (from?: string, to?: string, paidOnly?: boolean, limit?: number, cursor?: ILastEvaluatedKey) => {
    const res = await api.get(`${config.baseUrl}/payments`, {
        params: {
            startFrom: from,
            toDate: to,
            paidOnly: paidOnly || '',
            limit: limit,
            lastEvaluatedId: cursor?._id,
            lastEvaluatedSK: cursor?.SK
        }
    });

    return res.data.data as { payments: IPayment[], completedPaymentsSum: number, LastEvaluatedKey: ILastEvaluatedKey };
}