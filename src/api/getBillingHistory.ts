import { config } from "../config"
import api from "./auth/utils/jwtInterceptor";

export const getBillingHistory = async () => {
  const res = await api.get(`${config.baseUrl}/billing-history`);
  return res.data.data.items;
}