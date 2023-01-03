import { useCallback, useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify/dist/components';
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
                        <th>UserName</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>IsActive</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(s => (
                        <tr key={s.SK}>
                            <td>{s.SK.replace('User-', '')}</td>
                            <td>{s.name}</td>
                            <td>{s.email}</td>
                            <td>{s.role}</td>
                            <td>{s.active ? 'Yes' : 'No'}</td>
                            <td><Dropdown>
                                <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
                                    Actions
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => activateUserCallback(s.SK, false)}>Deactivate</Dropdown.Item>
                                    <Dropdown.Item onClick={() => activateUserCallback(s.SK, true)}>Activate</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}