import { useState } from "react"
import { Button, Container } from "react-bootstrap";
import { createUser, ICreateUserRequest } from "../../api/createUser";
import { CreateUserModal } from "./CreateUserModal";
import { UsersTable } from "./Table"

export const Users = () => {
    const [showCreateUserModal, setShowCreatePaymentModal] = useState<boolean>(false);

    const handleCreateUser = async (values: ICreateUserRequest) => {
        await createUser(values);
        setShowCreatePaymentModal(false);
    }

    return (
        <Container>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 20px' }}>
                <h2>Users</h2>
                <Button variant="outline-primary" onClick={() => setShowCreatePaymentModal(true)}>Створити користувача</Button>
            </div>
            <UsersTable />
            <CreateUserModal show={showCreateUserModal} handleSubmit={handleCreateUser} handleClose={() => setShowCreatePaymentModal(false)} />
        </Container>
    )
}