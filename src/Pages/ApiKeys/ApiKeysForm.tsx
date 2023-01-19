import { Form, Formik, FormikProps } from "formik"
import { forwardRef } from "react";
import { Button } from "react-bootstrap"
import { FormField } from "../../Components/Inputs/FormField"

export interface FormValues {
    clientId: string;
    secret: string;
}

interface FormProps {
    onConfirm: () => void
    onSubmit: (values: FormValues) => Promise<void>;
    initialValues: FormValues;
}

export const ApiKeysForm = forwardRef<FormikProps<FormValues>, FormProps>(({ initialValues, onSubmit, onConfirm }, ref) => {
    return <Formik
        innerRef={ref}
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
                    <Button disabled={isSubmitting} onClick={onConfirm} className="f-right mt-4" variant="primary" type='button'>
                        Зберегти
                    </Button>
                </Form>
            )
        }}
    </Formik>
})