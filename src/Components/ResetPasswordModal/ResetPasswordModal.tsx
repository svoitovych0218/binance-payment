import { Formik } from "formik";
import { Button, Form, Modal } from "react-bootstrap";
import { FormField } from "../Inputs/FormField";
import * as Yup from 'yup';
import { useCallback, useMemo } from "react";
import { changePassword } from "../../api/auth/changePassword";
import { useAuth } from "../../hooks/useAuth";

interface IResetPasswordFormProps {
    password: string;
    repeatPassword: string;
}

const validation = Yup.object().shape({
    password: Yup.string(),
    repeatPassword: Yup.string().test('passwords-match', 'Паролі відрізняються', function (value) { 
        console.log(value);
        return this.parent.password === value
    })
});

export const ResetPasswordModal = () => {
    const initialValues: IResetPasswordFormProps = {
        password: '',
        repeatPassword: '',
    };

    const auth = useAuth();

    const handleSubmit = useCallback(async (values: {password: string, repeatPassword: string}) => {
      await changePassword(values);
      await auth?.refresh();
    }, [auth]);
  
    const showModal = useMemo(() => {
      const result = !!auth?.user?.user_reset_password_required;
      return result;
    }, [auth])

    return (
        <Modal show={showModal}>
            <Modal.Header closeButton>
                <Modal.Title>Ви вперше зайшли у свій аккаунт. Будь-ласка змініть пароль</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validation}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        setFieldValue
                        /* and other goodies */
                    }) => {
                        return (
                            <Form onSubmit={handleSubmit}>
                                <FormField name="password" label='Новий пароль' type='password' />
                                <FormField name="repeatPassword" label='Повторіть пароль' type='newPassword' />
                                <Button className="mt-4" variant="primary" type='submit'>
                                    Підтвердити
                                </Button>
                            </Form>
                        )
                    }}
                </Formik>
            </Modal.Body>
        </Modal>
    )
}