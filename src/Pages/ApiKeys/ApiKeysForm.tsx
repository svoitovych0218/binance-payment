import { Form, Formik, FormikProps } from "formik"
import { forwardRef } from "react";
import { Button } from "react-bootstrap"
import { FormEyeInput } from "Components/Inputs/FormEyeInput";
import { apiKeysSchema } from "./validationSchema";

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
        validationSchema={apiKeysSchema}
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
                    <FormEyeInput required className='mb-2' name="clientId" label='API Key' type='password' />
                    <FormEyeInput required name="secret" label='Secret Key' type='password' />
                    <Button disabled={isSubmitting} onClick={onConfirm} className="f-right mt-4" variant="primary" type='button'>
                        Зберегти
                    </Button>
                </Form>
            )
        }}
    </Formik>
})