import { LoadingButton } from "Components/LoadingButton";
import { routes } from "constants/routes";
import { Formik } from "formik";
import { useAuth } from "hooks/useAuth";
import { useCallback, useEffect } from "react";
import { Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ILoginRequest, login } from "../../api/auth/login";
import { FormField } from "../../Components/Inputs/FormField";

interface ILoginFormProps {
    organizationName: string,
    userName: string,
    password: string
}

export const Login = () => {
    const auth = useAuth();
    const initialValues: ILoginFormProps =
        { organizationName: '', userName: '', password: '' }
    const isAuthorized = auth?.isAuthorized || false;
    const loadUser = auth?.loadUser || null;

    const navigate = useNavigate();

    useEffect(()=>{
        if (isAuthorized){
            navigate(routes.dashboard);
        }
    }, [navigate, isAuthorized]);

    const signIn = useCallback(async (req: ILoginRequest) => {
        try {
            const response = await login(req);
            localStorage.setItem('idToken', response.token);
            localStorage.setItem('refreshToken', response.refreshToken);
            if(loadUser)
                await loadUser();
            navigate(routes.dashboard);
        } catch (e: any) {
            toast(e.response?.data?.message ?? 'Щось пішло не так', { type: 'error' });
        }
    }, [navigate, loadUser]);

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
                                <LoadingButton isLoading={isSubmitting} className="mt-4 w-100" type="submit" variant="primary">
                                    Увійти
                                </LoadingButton>
                                <a href={routes.passwordRecovery}>Забули пароль ?</a>
                                <a className="f-right" href={routes.registration}>Реєстрація</a>
                            </Form>
                        )}
                    </Formik>
                </Col>
                <Col md={4} sm={12}></Col>
            </Row>
        </Container>
    )
}