import { config } from "../config"
import api from "./auth/utils/jwtInterceptor";

export const activateUser = async (userSK: string, active: boolean) => {
    const res = await api.post(`${config.baseUrl}/user/${userSK}/deactivate`, {active});

    return res.status === 200;
}