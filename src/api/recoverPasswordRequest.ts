import { config } from "../config"
import api from "./auth/utils/jwtInterceptor";

interface RecoverPasswordRequest {
    organization: string;
    userName: string;
}

export const recoverPassword = async (request: RecoverPasswordRequest) => {
    const res = await api.post(`${config.baseUrl}/user/recover-password`, request);

    return res.status === 200;
}