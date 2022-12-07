import axios from 'axios';

interface IRefreshTokenRequest {
    token: string;
}

export const refreshToken = async (request: IRefreshTokenRequest) => {
    const res = await axios.post('https://x8292499fi.execute-api.us-west-1.amazonaws.com/dev/auth/refresh', request);

    return res.data.data.token;
}