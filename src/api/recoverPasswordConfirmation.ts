import { config } from "../config"
import api from "./auth/utils/jwtInterceptor";

interface RecoverPasswordRequest {
    organization: string;
    userName: string;
    code: string;
    password: string;
}

export const recoverPasswordConfirmation = async (request: RecoverPasswordRequest) => {
    const res = await api.post(`${config.baseUrl}/user/recover-password-confirmation`, request);

    return res.status === 200;
}