import axios from "axios";
import { config } from "../../../config";

export function jwtInterceptor() {
    axios.interceptors.request.use((request) => {
        const idToken = localStorage.getItem('idToken');
        const isApiUrl = request.url?.startsWith(config.baseUrl);

        if (idToken && isApiUrl) {
            request.headers!.Authorization = `Bearer ${idToken}`;
        }
        return request;
    });

    // axios.interceptors.response.use(
    //     (response) => {
    //         return response;
    //     },
    //     async (error) => {
    //         if (error.response.status === 401) {
    //             const token = await firebaseAuth.currentUser?.getIdToken(true);
    //             if (!token) {
    //                 return Promise.reject(error);
    //             }
    //             localStorage.setItem('idToken', token);
    //             return axios.request(error.config);
    //         } else {
    //             return Promise.reject(error);
    //         }
    //     },
    // );
}