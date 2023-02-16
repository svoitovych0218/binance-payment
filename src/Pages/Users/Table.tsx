import { useCallback, useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { toast } from 'react-toastify';
import { getLocalizedRole } from 'utils/roles';
import { activateUser } from '../../api/activateUser';
import { getUsers } from '../../api/getUsers';
import { IUser } from '../../types.ts/user';

export const UsersTable = () => {

    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        (async () => {
            const res = await getUsers();
            setUsers(res.users);
        })();
    }, []);

    const activateUserCallback = useCallback(async (userSK: string, active: boolean) => {
        try {
            const success = await activateUser(userSK, active);
            if (success) {
                setUsers(prev => prev.map(s => s.SK === userSK ? ({ ...s, active: active }) : s));
                toast('Successfully changed');
            } else {
                toast('Something went wrong', { type: 'error' });
            }
        } catch (ex) {
            toast('Something went wrong', { type: 'error' });
        }
    }, []);

    return (
        <>
            <Table size='sm' striped bordered hover >
                <thead>
                    <tr>
                        <th>Ім'я</th>
                        <th>Логін</th>
                        <th>Email</th>
                        <th>Роль</th>
                        <th>Статус</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(s => (
                        <tr key={s.SK}>
                            <td>{s.name}</td>
                            <td>{s.SK.replace('User-', '')}</td>
                            <td>{s.email}</td>
                            <td>{getLocalizedRole(s.role)}</td>
                            <td>{s.active ? 'Автивний' : 'Неактивний'}</td>
                            <td><Dropdown>
                                <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
                                    Дії
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => activateUserCallback(s.SK, false)}>Деактивувати</Dropdown.Item>
                                    <Dropdown.Item onClick={() => activateUserCallback(s.SK, true)}>Активувати</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}