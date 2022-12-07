import { useCallback, useState } from "react";
import { Button, Container } from "react-bootstrap"
import { CreateOrganizationModal, CreateOrganizationRequest } from "./CreateOrganizationModal";
import { IOrganization, OrganizationsTable } from "./Table"

const organizationsMock: IOrganization[] = [
    { _id: '1', SK: '1', name: 'Aroma kava', email: 'aroma@gmail.com', phoneNumber: '0992223322', payedTill: new Date().toISOString() },
    { _id: '2', SK: '2', name: 'Puzata hata', email: 'puzata@gmail.com', phoneNumber: '0673344333', payedTill: new Date().toISOString() },
    { _id: '3', SK: '3', name: 'Aroma kava', email: 'aroma@gmail.com', phoneNumber: '0667778889', payedTill: new Date().toISOString() },
]

export const SuperAdmin = () => {
    const [showCreateOrganizationModal, setShowCreateOrganizationModal] = useState<boolean>(false);
    const [organizations, setOrganizations] = useState<IOrganization[]>(organizationsMock);

    const handleCreateOrganizationButtonClick = () => {
        setShowCreateOrganizationModal(true);
    }
    const handleModalSubmit = useCallback(async (organization: CreateOrganizationRequest) => {
        setOrganizations(prev => [...prev, { ...organization, _id: '4', SK: '4', payedTill: new Date().toISOString() }]);
        setShowCreateOrganizationModal(false);
    }, [setOrganizations])

    return (
        <Container>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2>Payments: </h2>
                <Button variant="outline-primary" onClick={handleCreateOrganizationButtonClick}>Add Organization</Button>
            </div>
            <OrganizationsTable items={organizations} />
            <CreateOrganizationModal handleSubmit={handleModalSubmit} show={showCreateOrganizationModal}/>
        </Container>
    )
}