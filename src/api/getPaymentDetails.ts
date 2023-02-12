import { config } from "../config"
import { IPayment } from "types.ts/payment";
import api from "./auth/utils/jwtInterceptor";

export const getPaymentDetails = async (id: string, sk: string) => {
    const res = await api.get(`${config.baseUrl}/organization/${id}/payment/${sk}`);

    return res.data.data as IPayment;
}