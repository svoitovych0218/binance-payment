import { FormikProps } from "formik";
import { useCallback, useEffect, useRef, useState } from "react";
import { Container, Row, Spinner, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { getOrganization } from "../../api/getOrganization";
import { saveApiKeys } from "../../api/saveApiKeys";
import { IOrganization } from "../../models/IOrganization";
import { ApiKeysForm, FormValues } from "./ApiKeysForm";
import { ConfirmModal } from "./ConfirmModal";

export const ApiKeys = () => {
    const [isEditMode, setIsEditMode] = useState(false);
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

    const handleOpenModal = useCallback(async () => {
        formikRef.current?.setTouched({
            clientId: true,
            secret: true
        })
        await formikRef.current?.validateForm()
        if(formikRef.current?.isValid)
            setOpen(true);
    }, []);

    const handleSubmit = useCallback(async (values: FormValues) => {
        handleCloseModal();
        const success = await saveApiKeys(values);
        if (success) {
            setIsEditMode(false);
            toast('Зміни збережено', { type: 'success' });
            if(organization)
                setOrganization({
                    ...organization,
                    clientId: values.clientId
                })
        }
    }, [handleCloseModal, organization]);

    if (!organization)
        return <div style={{ textAlign: 'center', marginTop: 100 }}>
            <Spinner animation="border" variant="primary" />
        </div>

    return (
        <Container>
            <Row>
                <h1>API Ключі</h1>
                {isEditMode ?
                    <ApiKeysForm
                        ref={formikRef}
                        initialValues={{ clientId: '', secret: '' }}
                        onSubmit={handleSubmit}
                        onConfirm={handleOpenModal}
                    />
                    : <div>
                        <p>API Key: <strong>{organization.clientId ?? '-'}</strong></p>
                        <Button onClick={() => setIsEditMode(true)}>
                            Ввести нові ключі
                        </Button>
                    </div>
                }
            </Row>
            <ConfirmModal
                show={open}
                onHide={handleCloseModal}
                onSubmit={formikRef.current?.handleSubmit}
            />
        </Container>
    )
}