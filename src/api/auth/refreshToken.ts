import axios from 'axios';
import { config } from 'config';

interface IRefreshTokenRequest {
    refreshToken: string;
}

export const refreshToken = async (request: IRefreshTokenRequest) => {
    const res = await axios.post(`${config.baseUrl}/auth/refresh`, request);

    return { token: res.data.data.token, refreshToken: res.data.data.refreshToken };
}