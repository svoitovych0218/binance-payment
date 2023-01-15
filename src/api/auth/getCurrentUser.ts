import { config } from "../../config"
import api from "./utils/jwtInterceptor";

export const getCurrentUser = async () => {
    const res = await api.get(`${config.baseUrl}/user`);

    return res.data.data;
}