import { config } from "../config"
import api from "./auth/utils/jwtInterceptor";

export interface ICreateUserRequest {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    organizationName: string;
    phoneNumber: string;
}

export const registration = async (request: ICreateUserRequest) => {
    const res = await api.post(`${config.baseUrl}/registration`, request);

    return res;
}