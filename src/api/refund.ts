import { config } from "../config"
import api from "./auth/utils/jwtInterceptor";

export const refund = async (sk: string) => {
    const res = await api.post(`${config.baseUrl}/payment/${sk}/refund`);

    return res.status === 200;
}