import axios from 'axios';

interface IRefreshTokenRequest {
    refreshToken: string;
}

export const refreshToken = async (request: IRefreshTokenRequest) => {
    const res = await axios.post('https://x8292499fi.execute-api.us-west-1.amazonaws.com/dev/auth/refresh', request);

    return { token: res.data.data.token, refreshToken: res.data.data.refreshToken };
}