import Table from 'react-bootstrap/Table';

export interface IOrganization {
    _id: string;
    SK: string;
    name: string;
    email: string;
    phoneNumber: string;
    payedTill: string;
}

export const OrganizationsTable = ({ items }: { items: IOrganization[] }) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone number</th>
                    <th>Payed till</th>
                </tr>
            </thead>
            <tbody>
                {items.map(s => (
                    <tr key={s.SK}>
                        <td>{s.name}</td>
                        <td>{s.email}</td>
                        <td>{s.phoneNumber}</td>
                        <td>{new Date(s.payedTill).toLocaleDateString()}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}