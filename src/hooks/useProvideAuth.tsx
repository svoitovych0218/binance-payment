import jwtDecode from 'jwt-decode';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCurrentUser } from '../api/auth/getCurrentUser';
import { ILoginRequest, login } from '../api/auth/login';
import { refreshToken } from '../api/auth/refreshToken';
import { UserRole } from '../providers/AuthProvider';

interface IUser {
    user_id: string;
    user_sk: string;
    user_role: UserRole;
    user_reset_password_required: boolean;
    exp: number;
}

export function useProvideAuth() {
    const [user, setUser] = useState<IUser | null>(() => {
        const token = localStorage.getItem('idToken');
        if (token) {
            const user = jwtDecode(token);
            return user as IUser;
        }
        return null;
    });

    const navigate = useNavigate();

    const signIn = useCallback(async (req: ILoginRequest) => {
        try {
            const response = await login(req);
            localStorage.setItem('idToken', response.token);
            localStorage.setItem('refreshToken', response.refreshToken);

            const user = await getCurrentUser();
            setUser(user);
            navigate('/dashboard');
        } catch (e:any) {
            toast(e.response?.data?.message ?? 'Something went wrong', {type:'error'});
        }
    }, [navigate]);

    const logout = useCallback(() => {
        localStorage.removeItem('idToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
    }, [setUser]);

    const refresh = useCallback(async () => {
        const response = await refreshToken({ refreshToken: localStorage.getItem('refreshToken')! });

        localStorage.setItem('idToken', response.token);
        localStorage.setItem('refreshToken', response.refreshToken);

        const user = await getCurrentUser();
        setUser(user);
    }, []);

    const provider: IAuthProvider = useMemo(() => ({
        user,
        login: signIn,
        refresh,
        logout
    }), [user, signIn, refresh, logout]);

    return provider;
}

export interface IAuthProvider {
    user: IUser | null;
    login: (req: ILoginRequest) => Promise<void>;
    refresh: () => Promise<void>;
    logout: () => void;
}
