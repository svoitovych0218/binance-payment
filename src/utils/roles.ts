import { UserRole } from "providers/AuthProvider";

const tranlations: Record<UserRole, string> = {
    'ADMIN': 'Адмін',
    'OWNER': 'Власник',
    'OPERATOR': 'Оператор',
    'SUPERADMIN': 'Супер Адмін'
}

export const getLocalizedRole = (status: UserRole) => {
    return tranlations[status];
}