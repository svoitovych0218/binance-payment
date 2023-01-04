import { Formik } from "formik";
import { useCallback, useMemo, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { recoverPasswordConfirmation } from "../../api/recoverPasswordConfirmation";
import { FormField } from "../../Components/Inputs/FormField";
import { useQuery } from "../../hooks/useQuery";

interface ILoginFormProps {
    password: string,
    repeatPassword: string,
}

export const PasswordRecoveryConfirmation = () => {
    const [requestSent, setRequestSent] = useState<boolean>(true);
    const initialValues: ILoginFormProps =
        { password: '', repeatPassword: '' }

    const query = useQuery();

    const queryData = useMemo(() => {
        return {
            organization: query.get('organization'),
            code: query.get('code'),
            userName: query.get('userName')
        }
    }, [query]);

    const wrongUrl = !queryData.code || !queryData.organization || !queryData.userName;


    const onSubmitHandler = useCallback(async (values: ILoginFormProps) => {
        try {
            await recoverPasswordConfirmation({ password: values.password, code: queryData.code!, organization: queryData.organization!, userName: queryData.userName! });
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
                    Дякуюємо! Ваш пароль змінено, тепер ви можете увійти в систему використовуючи новий пароль.{' '}
                    <Link to={'/login'}>Увійти</Link>
                </Col> : <Col md={4} sm={12}>
                    {wrongUrl ? 'Щось пішно не так. Посилання на зміну паролю не дійсне' :
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
                                    <FormField name='password' label='Новий пароль' type='password' />
                                    <FormField name='repeatPassword' label='Підтвердіть пароль' type='password' />
                                    <Button className="mt-4 w-100" type="submit" variant="primary">
                                        Змінити пароль
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    }
                </Col>
                }
                <Col md={4} sm={12}></Col>
            </Row>
        </Container>
    )
}