import { config } from "../config"
import api from "./auth/utils/jwtInterceptor";

export const cancelPayment = async (paymentSK: string) => {
    const res = await api.post(`${config.baseUrl}/payment/${paymentSK}/cancel`);

    return res.status === 200;
}