import { Formik } from "formik";
import { Button, Form, Modal } from "react-bootstrap";
import { ICreateUserRequest } from "../../api/createUser";
import { FormField } from "../../Components/Inputs/FormField";
import { FormSelect } from "../../Components/Inputs/FormSelect";
import { UserRole } from "../../providers/AuthProvider";
import { createUserSchema } from "./validationSchemas";

interface ICreateUserModalProps {
    show: boolean;
    handleClose: () => void;
    handleSubmit: (request: ICreateUserRequest) => Promise<void>;
}

interface ICreateUserFormProps {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    userRole: UserRole;
    password: string;
}

export const CreateUserModal = ({ show, handleClose, handleSubmit }: ICreateUserModalProps) => {
    const initialValues: ICreateUserFormProps = {
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        userRole: UserRole.Operator,
        password: ''
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Заповніть форму</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    validateOnChange={false}
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={createUserSchema}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        setFieldValue,
                        isValidating,
                        /* and other goodies */
                    }) => {
                        return (
                            <Form onSubmit={handleSubmit}>
                                <FormField name="userName" label='Логін' type='text' />
                                <FormField name="firstName" label="Ім'я" type='text' />
                                <FormField name="lastName" label='Прізвище' type='text' />
                                <FormField name="email" label='Email' type='email' />
                                <FormField name="password" label='Пароль' type='password' />
                                <FormSelect name="userRole" label="Роль" options={[{ value: UserRole.Admin, label: 'Адмін' }, { value: UserRole.Operator, label: 'Оператор' }]} />
                                <Button disabled={isValidating} style={{margin: '20px auto 0 auto'}} variant="primary" type='submit'>
                                    Створити
                                </Button>
                            </Form>
                        )
                    }}
                </Formik>
            </Modal.Body>
        </Modal>
    )
}