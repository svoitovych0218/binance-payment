import { config } from "../config"
import api from "./auth/utils/jwtInterceptor";

export const checkEmailAvailable = async (email: string) => {
    const res = await api.get(`${config.baseUrl}/email/${email}/available`);
    return res.status === 200 && res.data.available;
}