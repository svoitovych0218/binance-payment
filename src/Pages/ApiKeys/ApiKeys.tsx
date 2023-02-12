import { FormikProps } from "formik";
import { useCallback, useEffect, useRef, useState } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { getOrganization } from "../../api/getOrganization";
import { saveApiKeys } from "../../api/saveApiKeys";
import { IOrganization } from "../../models/IOrganization";
import { ApiKeysForm, FormValues } from "./ApiKeysForm";
import { ConfirmModal } from "./ConfirmModal";

export const ApiKeys = () => {
    const [open, setOpen] = useState(false);
    const [organization, setOrganization] = useState<IOrganization | undefined>(undefined);
    const formikRef = useRef<FormikProps<FormValues> | null>(null);

    useEffect(() => {
        getOrganization().then(res => {
            setOrganization(res);
        })
    }, []);

    const handleCloseModal = useCallback(() => {
        setOpen(false);
    }, []);

    const handleOpenModal = useCallback(() => {
        setOpen(true);
    }, []);

    const handleSubmit = useCallback(async (values: FormValues) => {
        handleCloseModal();
        const success = await saveApiKeys(values);
        if (success) {
            toast('Зміни збережено', { type: 'success' });
        }
    }, [handleCloseModal]);

    return (
        <Container>
            <Row>
                <h1>Api Ключі</h1>
                {organization ?
                    <ApiKeysForm
                        ref={formikRef}
                        initialValues={{ clientId: organization.clientId ?? '', secret: organization.clientSecret ?? '' }}
                        onSubmit={handleSubmit}
                        onConfirm={handleOpenModal}
                    /> : <Spinner animation="border" variant="primary" />}
            </Row>
            <ConfirmModal
                show={open}
                onHide={handleCloseModal}
                onSubmit={formikRef.current?.handleSubmit}
            />
        </Container>
    )
}