import { config } from "../../config"
import api from "./utils/jwtInterceptor";

interface IRequest {
    password: string;
    repeatPassword: string;
}

export const changePassword = async (request: IRequest) => {
    const res = await api.post(`${config.baseUrl}/user/reset-password`, request);

    return res.status === 200;
}