import { config } from "../config"
import api from "./auth/utils/jwtInterceptor";

export const saveApiKeys = async (request: {clientId: string; secret: string}) => {
    const res = await api.post(`${config.baseUrl}/api-keys`, request);

    return res.status === 200;
}