import axios from 'axios';
import { config } from 'config';

export interface ILoginRequest {
    organizationName: string;
    userName: string;
    password: string;
}

export interface ILoginResponse {
    token: string;
    refreshToken: string;
}

export const login = async (request: ILoginRequest): Promise<ILoginResponse> => {
    const res = await axios.post(`${config.baseUrl}/login`, request);

    return res.data.data as ILoginResponse;
}