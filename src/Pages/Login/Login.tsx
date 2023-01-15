import { Formik } from "formik";
import { useCallback, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ILoginRequest, login } from "../../api/auth/login";
import { FormField } from "../../Components/Inputs/FormField";

interface ILoginFormProps {
    organizationName: string,
    userName: string,
    password: string
}

export const Login = () => {
    const initialValues: ILoginFormProps =
        { organizationName: '', userName: '', password: '' }

    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem('idToken');
        if (token){
            navigate('/dashboard');
        }
    }, []);

    const signIn = useCallback(async (req: ILoginRequest) => {
        try {
            const response = await login(req);
            localStorage.setItem('idToken', response.token);
            localStorage.setItem('refreshToken', response.refreshToken);

            navigate('/dashboard');
        } catch (e: any) {
            toast(e.response?.data?.message ?? 'Something went wrong', { type: 'error' });
        }
    }, [navigate]);

    const onSubmitHandler = useCallback(async (values: ILoginFormProps) => {
        await signIn(values);
    }, [signIn]);

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
                                <a className="f-right" href='/registration'>Реєстрація</a>
                            </Form>
                        )}
                    </Formik>
                </Col>
                <Col md={4} sm={12}></Col>
            </Row>
        </Container>
    )
}