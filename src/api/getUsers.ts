import { config } from "../config"
import { IUser } from "../types.ts/user";
import api from "./auth/utils/jwtInterceptor";

export const getUsers = async () => {
    const res = await api.get(`${config.baseUrl}/users`);

    return res.data.data as {users: IUser[] };
}