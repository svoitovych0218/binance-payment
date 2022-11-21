import { Field, FieldAttributes, FieldProps } from "formik"
import { FormControl, FormGroup, FormLabel } from "react-bootstrap"

export interface FormFieldProps extends FieldAttributes<any> {
    label: string;
    type: string;
    name: string;
}
export const FormField = ({ label, type, name, ...props }: FormFieldProps) => {
    return (
        <Field
            name={name}
            render={({ field, form }: FieldProps<any>) => (
                <FormGroup>
                    <FormLabel>{label}</FormLabel>
                    <FormControl isInvalid={!!form.errors[field.name]} type={type} value={field.value} onChange={props.onChange ?? (e => form.setFieldValue(field.name, e.target.value))} />
                    <div>{form.errors[field.name] as string}</div>
                </FormGroup>
            )}
            {...props}
        />)
}