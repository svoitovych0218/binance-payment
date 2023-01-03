import { config } from "../config"
import api from "./auth/utils/jwtInterceptor";

export const getExcelReport = async (from?: string, to?: string, paidOnly?: boolean): Promise<string> => {
    const res = await api.get(`${config.baseUrl}/payments-report?startFrom=${from ?? ''}&toDate=${to ?? ''}&paidOnly=${paidOnly ? 'true' : ''}`, {responseType: 'stream'});

    return res.data.data.url;
}