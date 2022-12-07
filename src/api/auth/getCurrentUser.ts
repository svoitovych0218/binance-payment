import { config } from "../../config"
import api from "./utils/jwtInterceptor";

export const getCurrentUser = async () => {
    const res = await api.get(`${config.baseUrl}/users`);

    return res.data.data.user;
}