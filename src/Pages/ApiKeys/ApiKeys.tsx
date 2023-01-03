import { useCallback, useEffect, useState } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { getOrganization } from "../../api/getOrganization";
import { saveApiKeys } from "../../api/saveApiKeys";
import { IOrganization } from "../../models/IOrganization";
import { ApiKeysForm, FormValues } from "./ApiKeysForm";

export const ApiKeys = () => {
    const [organization, setOrganization] = useState<IOrganization | undefined>(undefined);

    useEffect(() => {
        getOrganization().then(res => {
            setOrganization(res);
        })
    }, []);

    const handleSubmit = useCallback(async (values: FormValues) => {
        const success = await saveApiKeys(values);
        if (success) {
            toast('Successfully saved', {type:'success'});
        }
    }, []);

    return (
        <Container>
            <Row>
                <h1>Api Keys</h1>
                {organization ?
                    <ApiKeysForm
                        initialValues={{ clientId: organization.clientId ?? '', secret: organization.clientSecret ?? '' }}
                        onSubmit={handleSubmit}
                    /> : <Spinner animation="border" variant="primary" />}
            </Row>
        </Container>
    )
}