import { Formik } from "formik";
import { useCallback } from "react";
import { Button, Container, Form } from "react-bootstrap"
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
                        <Button type="submit" variant="primary">
                            Log In
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    )
}