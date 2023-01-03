import { config } from "../config"
import { IOrganization } from "../models/IOrganization";
import api from "./auth/utils/jwtInterceptor";

export const getOrganization = async () => {
    const res = await api.get(`${config.baseUrl}/organization`);

    return res.data.data as IOrganization;
}