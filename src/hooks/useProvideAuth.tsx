import { routes } from 'constants/routes';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../api/auth/getCurrentUser';
import { refreshToken } from '../api/auth/refreshToken';
import { UserRole } from '../providers/AuthProvider';

interface IUser {
    _id: string;
    SK: string;
    name: string;
    role: UserRole;
    email: string;
    active: boolean;
    emailConfirmed?: boolean;
}

export function useProvideAuth() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [user, setUser] = useState<IUser | null>(null);

    const navigate = useNavigate();

    const loadUser = useCallback(async () => {
        const token = localStorage.getItem('idToken');
        setIsLoading(true);
        if (token) {
            const res = await getCurrentUser();
            setUser(res);
        } else {
            setUser(null);
        }
        setIsLoading(false);
    },[]);

    useEffect(() => {
        loadUser();
    }, [loadUser]);

    const logout = useCallback(() => {
        localStorage.removeItem('idToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
        navigate(routes.login);
    }, [setUser]);

    const refresh = useCallback(async () => {
        const response = await refreshToken({ refreshToken: localStorage.getItem('refreshToken')! });

        localStorage.setItem('idToken', response.token);
        localStorage.setItem('refreshToken', response.refreshToken);

        const user = await getCurrentUser();
        setUser(user);
    }, []);

    const provider: IAuthProvider = useMemo(() => ({
        isLoading,
        user,
        refresh,
        logout,
        isAuthorized: !!user,
        loadUser
    }), [isLoading, user, refresh, logout, loadUser]);

    return provider;
}

export interface IAuthProvider {
    isLoading: boolean;
    user: IUser | null;
    refresh: () => Promise<void>;
    logout: () => void;
    isAuthorized: boolean
    loadUser: () => void
}
