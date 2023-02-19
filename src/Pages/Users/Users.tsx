import { activateUser } from "api/activateUser";
import { getUsers } from "api/getUsers";
import { useCallback, useEffect, useState } from "react"
import { Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { IUser } from "types.ts/user";
import { createUser, ICreateUserRequest } from "../../api/createUser";
import { CreateUserModal } from "./CreateUserModal";
import { UsersTable } from "./Table"

export const Users = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [showCreateUserModal, setShowCreatePaymentModal] = useState<boolean>(false);

    const fetchUsers = async () => {
        const res = await getUsers();
        setUsers(res.users);
    };

    useEffect(() => {
        fetchUsers();
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

    const handleCreateUser = async (values: ICreateUserRequest) => {
        await createUser(values);
        setShowCreatePaymentModal(false);
        await fetchUsers();
    }

    return (
        <Container>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 20px' }}>
                <h2>Користувачі</h2>
                <Button variant="outline-primary" onClick={() => setShowCreatePaymentModal(true)}>Створити користувача</Button>
            </div>
            <UsersTable users={users} activateUserCallback={activateUserCallback} />
            <CreateUserModal show={showCreateUserModal} handleSubmit={handleCreateUser} handleClose={() => setShowCreatePaymentModal(false)} />
        </Container>
    )
}