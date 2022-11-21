import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../api/auth/getCurrentUser';

interface IUser {
    user_id: string;
    user_sk: string;
    user_role: string;
}

export function useProvideAuth() {
    const [user, setUser] = useState<IUser | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        reloadUserData();
    }, [])

    const reloadUserData = async () => {
        const userData = await getCurrentUser();
        const currentUser: IUser = {
            ...userData,
        };

        setUser(currentUser);
    };

    const signOut = async () => {
        localStorage.removeItem('idToken');
        setUser(null);
        navigate('/');
    };

    function checkIsLoggedIn() {
        return !!localStorage.getItem('idToken');
    }


    const provider: IAuthProvider = {
        user,
        reloadUserData,
        signOut,
        checkIsLoggedIn,
    };

    return provider;
}

export interface IAuthProvider {
    user: IUser | null;
    reloadUserData: () => Promise<void>;
    signOut: () => void;
    checkIsLoggedIn: () => boolean;
}
