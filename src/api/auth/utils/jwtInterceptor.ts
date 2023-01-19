import axios from "axios";
import { config } from "../../../config";

const api = axios.create({
    baseURL: 'https://x8292499fi.execute-api.us-west-1.amazonaws.com/dev'
});

api.interceptors.request.use((request) => {
    const idToken = localStorage.getItem('idToken');
    const isApiUrl = request.url?.startsWith(config.baseUrl);

    if (idToken && isApiUrl) {
        request.headers!.Authorization = `Bearer ${idToken}`;
    }
    return request;
}, error => {
    Promise.reject(error)
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error && error.response && error.response.status === 401 && !error.config.__isRetry) {
            try {
                const newTokenResponse = await axios.post('https://x8292499fi.execute-api.us-west-1.amazonaws.com/dev/auth/refresh', { refreshToken: `${localStorage.getItem('refreshToken')}` }); //await refreshToken({ token: `Bearer ${localStorage.getItem('refreshToken')}` });
                if (newTokenResponse.status === 200) {
                    localStorage.setItem('idToken', newTokenResponse.data.data.token);
                    localStorage.setItem('refreshToken', newTokenResponse.data.data.refreshToken);
                    const newConfig = {
                        ...error.config,
                        headers: {
                            ...error.config.headers,
                            Authorization: `Bearer ${newTokenResponse.data.data.token}`,
                        },
                        __isRetry: true
                    }
                    return api.request(newConfig);
                } else {
                    localStorage.clear()
                    window.location.href = "/login"
                }
            } catch (error) {
                localStorage.clear()
                window.location.href = "/login"
            }
        } else {
            return Promise.reject(error);
        }
    },
);

export default api;