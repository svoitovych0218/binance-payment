import { config } from "../config"
import api from "./auth/utils/jwtInterceptor";

interface ICreateSinglePaymentRequest {
    receipeNumber: string;
    amountBusd: number;
    amountUah: number;
    description: string;
}

export const createSinglePayment = async (request: ICreateSinglePaymentRequest) => {
    const res = await api.post(`${config.baseUrl}/signle-payment`, request);

    return res.status === 200;
}