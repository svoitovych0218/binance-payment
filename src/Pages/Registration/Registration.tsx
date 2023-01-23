/* eslint-disable no-useless-escape */
import { Formik } from "formik";
import { useCallback, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap"
import { FormField } from "../../Components/Inputs/FormField";
import * as Yup from 'yup';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import { registration } from "../../api/registration";
import { toast } from "react-toastify";
import { routes } from "constants/routes";

interface ILoginFormProps {
    organizationName: string;
    userName: string;
    password: string;
    repeatPassword: string;
    email: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
}

const SignupSchema = Yup.object().shape({
    organizationName: Yup.string()
        .min(5, 'Назва організації має бути в межах від 5 до 15 символів.')
        .max(15, 'Назва організації має бути в межах від 5 до 15 символів.')
        .matches(/^[a-zA-Z0-9_]+$/, "Назва має складатись тільки з латинських символів та _")
        .required("Це поле обов'язкове"),
    email: Yup.string().email('Невірний емейл').required("Це поле обов'язкове"),
    firstName: Yup.string()
        .min(5, "Ім'я повинно буде в межах від 5 до 25 символів")
        .max(25, "Ім'я повинно буде в межах від 5 до 25 символів")
        .required("Це поле обов'язково"),

    lastName: Yup.string()
        .min(5, "Прізвище повинно буде в межах від 5 до 25 символів")
        .max(25, "Прізвище повинно буде в межах від 5 до 25 символів")
        .required("Це поле обов'язково"),
    phoneNumber: Yup.string().matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{2}[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2}[-\s\.]?[0-9]{2}$/,
        'Будь-ласка, введіть коректний номер телефону. Формат +380XXXXXXX або +380-XX-XXX-XX-XX'),
    userName: Yup.string()
        .min(5, "Логін має бути в межах від 5 до 15 символів")
        .max(15, "Логін має бути в межах від 5 до 15 символів")
        .matches(/^[a-zA-Z0-9_]+$/, "Допускаються лише латинські символи та знак _")
        .required("Це поле обов'язкове"),
    password: Yup.string()
        .matches(/^(?=.*[A-za-z@$!%*?&])(?=.*\d)[A-za-z\d@$!%*?&]{8,}$/, "Пароль має бути не менше 8 символів довжиною, а також складатись з хоча б однієї букви та однієї цифри")
        .required("Це поле обов'язкове"),
    repeatPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Паролі мають співпадати')
});

export const Registration = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);
    const [registered, setRegistered] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');

    const initialValues: ILoginFormProps =
        { organizationName: '', userName: '', password: '', email: '', phoneNumber: '+', repeatPassword: '', firstName: '', lastName: '' }

    const onSubmitHandler = useCallback(async (values: ILoginFormProps) => {
        try {
            await registration({
                firstName: values.firstName,
                lastName: values.lastName,
                userName: values.userName,
                password: values.password,
                organizationName: values.organizationName,
                email: values.email,
                phoneNumber: values.phoneNumber
            });

            setEmail(values.email);

            setRegistered(true);
            toast('Реєстрація пройшла успішно!');
        } catch (ex: any) {
            toast(ex?.response?.data?.data?.message ?? 'Сталася помилка, будь-ласка спробуйте ще раз', { type: 'error' })
        }
    }, []);

    return (
        <Container>
            <Row>
                <Col md={4} sm={12}></Col>
                <Col md={4} sm={12}>
                    {registered ? `Дякуємо за реєстрацію! На вашу електронну адресу ${email} було відправлено лист з посиланням для підтверження реєстрації.` :
                        <Formik
                            initialValues={initialValues}
                            onSubmit={onSubmitHandler}
                            validationSchema={SignupSchema}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                submitForm,
                                isSubmitting,
                                /* and other goodies */
                            }) => (
                                <Form onSubmit={handleSubmit}>
                                    <FormField
                                        onBlur={handleBlur}
                                        name='organizationName'
                                        label='Організація'
                                        type='text'
                                    />
                                    <FormField className='mt-4' name='userName' label='Логін' type='text' />
                                    <FormField className='mt-4' name='firstName' label="Ім'я" type='text' />
                                    <FormField className='mt-4' name='lastName' label="Прізвище" type='text' />
                                    <FormField className='mt-4' name='email' label='Email' type='text' />
                                    <FormField className='mt-4' name='phoneNumber' label='Телефон' type='text' />
                                    <FormField
                                        className='mt-4'
                                        name='password'
                                        label='Пароль'
                                        type={showPassword ? 'text' : 'password'}
                                        inputNode={<InputGroup.Text id="basic-addon2" onClick={() => setShowPassword((prev) => !prev)}>
                                            {showPassword ? <EyeSlash /> : <Eye />
                                            }
                                        </InputGroup.Text>}
                                        inputGroupPosition='after'
                                    />

                                    <FormField
                                        className='mt-4'
                                        name='repeatPassword'
                                        label='Повторіть пароль'
                                        type={showRepeatPassword ? 'text' : 'password'}
                                        inputNode={<InputGroup.Text id="basic-addon2" onClick={() => setShowRepeatPassword((prev) => !prev)}>
                                            {showPassword ? <EyeSlash /> : <Eye />
                                            }
                                        </InputGroup.Text>}
                                        inputGroupPosition='after'
                                    />

                                    <Button disabled={isSubmitting} className="mt-4 w-100" type="submit" variant="primary">
                                        {isSubmitting ? <div className="spinner-grow spinner-grow-sm text-light" role="status" /> : <>Реєстрація</>}
                                    </Button>
                                    <p>Вже зареєстровані? <a href={routes.login}>Вхід</a></p>
                                </Form>
                            )}
                        </Formik>
                    }
                </Col>
                <Col md={4} sm={12}></Col>
            </Row>
        </Container>
    )
}