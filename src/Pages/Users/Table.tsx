import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getUsers } from '../../api/getUsers';
import { IUser } from '../../types.ts/user';

export const UsersTable = () => {

    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        (async () => {
            const res = await getUsers();
            setUsers(res.users);
        })();
    }, [])

    return (
        <>
            <Table size='sm' striped bordered hover >
                <thead>
                    <tr>
                        <th>UserName</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(s => (
                        <tr key={s.SK}>
                            <td>{s.SK.replace('User-', '')}</td>
                            <td>{s.name} UAH</td>
                            <td>{s.email}</td>
                            <td>{s.role}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}