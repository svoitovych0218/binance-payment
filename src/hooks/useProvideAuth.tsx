import jwtDecode from 'jwt-decode';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    useEffect(() => {
        console.log('useProvideAuth');
    }, [])
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
        const response = await login(req);
        localStorage.setItem('idToken', response.token);
        localStorage.setItem('refreshToken', response.refreshToken);

        const user = await getCurrentUser();
        setUser(user);
        navigate('/dashboard');
    }, [navigate]);

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
        refresh
    }), [user, signIn, refresh]);

    return provider;
}

export interface IAuthProvider {
    user: IUser | null;
    login: (req: ILoginRequest) => Promise<void>;
    refresh: () => Promise<void>;
}
