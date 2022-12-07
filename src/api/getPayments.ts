import { config } from "../config"
import api from "./auth/utils/jwtInterceptor";

export const getPayments = async () => {
    console.log('get payments');
    const res = await api.get(`${config.baseUrl}/payments`);

    return res.data.data.payments;
}