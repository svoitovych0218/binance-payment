import { config } from "../config"
import api from "./auth/utils/jwtInterceptor";

export const confirmEmail = async (code: string, organization: string, userName: string) => {
    const res = await api.post(`${config.baseUrl}/email-confirmation`, {organization, userName, code});

    return res.status === 200;
}