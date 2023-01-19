import { ReactElement, createContext } from 'react';

import { IAuthProvider, useProvideAuth } from '../hooks/useProvideAuth';

export const AuthContext = createContext<IAuthProvider | null>(null);

interface AuthProviderProps {
    children: ReactElement<any, any>;
}

export enum UserRole {
    Operator = "OPERATOR",
    Admin = "ADMIN",
    Owner = "OWNER",
    SuperAdmin = "SUPERADMIN"
}

export function AuthProvider({ children }: AuthProviderProps) {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
