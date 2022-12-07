import axios from 'axios';

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
    const res = await axios.post('https://x8292499fi.execute-api.us-west-1.amazonaws.com/dev/login', request);

    return res.data.data as ILoginResponse;
}