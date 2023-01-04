import { Formik } from "formik";
import { useCallback, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { toast } from "react-toastify";
import { recoverPassword } from "../../api/recoverPasswordRequest";
import { FormField } from "../../Components/Inputs/FormField";
import { useAuth } from "../../hooks/useAuth";

interface ILoginFormProps {
    organization: string,
    userName: string,
}

export const PasswordRecoveryRequest = () => {
    const [requestSent, setRequestSent] = useState<boolean>(false);
    const initialValues: ILoginFormProps =
        { organization: '', userName: '' }


    const onSubmitHandler = useCallback(async (values: ILoginFormProps) => {
        try {
            await recoverPassword(values);
            setRequestSent(true);
        } catch (e: any) {
            toast(e.response?.data?.message ?? 'Something went wrong', { type: 'error' });
        }
    }, []);

    return (
        <Container>
            <Row>
                <Col md={4} sm={12}></Col>
                {requestSent ? <Col md={4} sm={12}>
                    Запит на зміну паролю прийнято. На ваш емейл адрес було відправлено посилання, перейдіть по ньому для зміни паролю
                </Col> : <Col md={4} sm={12}>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmitHandler}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            /* and other goodies */
                        }) => (
                            <Form onSubmit={handleSubmit}>
                                <FormField name='organization' label='Організація' type='text' />
                                <FormField name='userName' label='Логін' type='text' />
                                <Button className="mt-4 w-100" type="submit" variant="primary">
                                    Скинути пароль
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Col>
                }
                <Col md={4} sm={12}></Col>
            </Row>
        </Container>
    )
}