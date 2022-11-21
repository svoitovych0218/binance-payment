import axios from 'axios';

interface ILoginRequest {
    organizationName: string;
    userName: string;
    password: string;
}

export const login = async (request: ILoginRequest) => {
    const res = await axios.post('https://x8292499fi.execute-api.us-west-1.amazonaws.com/dev/login', request);

    return res.data.data.token;
}