import axios from "axios"
import { config } from "../../config"

export const getCurrentUser = async () => {
    const res = await axios.get(`${config.baseUrl}/users`);

    return res.data.data.user;
}