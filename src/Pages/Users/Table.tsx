import { Dropdown } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { getLocalizedRole } from 'utils/roles';
import { IUser } from '../../types.ts/user';

interface IUsersTableProps {
    users: IUser[];
    activateUserCallback: (userSK: string, active: boolean) => Promise<void>;
}

export const UsersTable = ({ users, activateUserCallback }: IUsersTableProps) => {
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