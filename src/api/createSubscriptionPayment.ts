import { TierSubscripton } from "types.ts/billing";
import { config } from "../config"
import api from "./auth/utils/jwtInterceptor";

export const createSubscriptionPayment = async (tier: TierSubscripton) => {
  const res = await api.post(`${config.baseUrl}/billing-payment`, { tier });
  return res.data;
}