import { Form, Formik } from "formik"
import { Button } from "react-bootstrap"
import { FormField } from "../../Components/Inputs/FormField"

export interface FormValues {
    clientId: string;
    secret: string;
}

interface FormProps {
    onSubmit: (values: FormValues) => Promise<void>;
    initialValues: FormValues;
}

export const ApiKeysForm = ({initialValues, onSubmit}:FormProps) => {
    return <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
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
                                <FormField required className='mb-2' name="clientId" label='Client Id' type='password' />
                                <FormField required name="secret" label='Secret' type='password' />
                                <Button className="f-right mt-4" variant="primary" type='submit'>
                                    Зберегти
                                </Button>
                            </Form>
                        )
                    }}
                </Formik>
}