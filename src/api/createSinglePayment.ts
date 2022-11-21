import axios from "axios"
import { config } from "../config"

interface ICreateSinglePaymentRequest {
    receipeNumber: string;
    amountBusd: number;
}

export const createSinglePayment = async (request: ICreateSinglePaymentRequest) => {
    const res = await axios.post(`${config.baseUrl}/signle-payment`, request);

    return res.status === 200;
}