import axios from "axios"
import { config } from "../config"

export const getPayments = async () => {
    const res = await axios.get(`${config.baseUrl}/payments`);

    return res.data.data.payments;
}