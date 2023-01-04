import { Formik } from "formik";
import { useCallback } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { FormField } from "../../Components/Inputs/FormField";
import { useAuth } from "../../hooks/useAuth";

interface ILoginFormProps {
    organizationName: string,
    userName: string,
    password: string
}

export const Login = () => {
    const initialValues: ILoginFormProps =
        { organizationName: '', userName: '', password: '' }

    const auth = useAuth();

    const onSubmitHandler = useCallback(async (values: ILoginFormProps) => {
        await auth!.login(values);
    }, [auth]);

    return (
        <Container>
            <Row>
                <Col md={4} sm={12}></Col>
                <Col md={4} sm={12}>
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
                            <FormField name='organizationName' label='Організація' type='text' />
                            <FormField name='userName' label='Логін' type='text' />
                            <FormField name='password' label='Пароль' type='password' />
                            <Button className="mt-4 w-100" type="submit" variant="primary">
                                Log In
                            </Button>
                            <a href='/password-recovery'>Забули пароль ?</a>
                        </Form>
                    )}
                </Formik>
                </Col>
                <Col md={4} sm={12}></Col>
            </Row>
        </Container>
    )
}