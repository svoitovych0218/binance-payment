import { config } from "../config"
import { UserRole } from "../providers/AuthProvider";
import api from "./auth/utils/jwtInterceptor";

export interface ICreateUserRequest {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    userRole: UserRole;
    password: string;
}

export const createUser = async (request: ICreateUserRequest) => {
    const res = await api.post(`${config.baseUrl}/user`, request);

    return res.status === 200;
}