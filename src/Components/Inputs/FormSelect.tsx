import { Field, FieldAttributes, FieldProps } from "formik"
import { Form, FormControl, FormGroup, FormLabel } from "react-bootstrap"

export interface FormFieldProps extends FieldAttributes<any> {
    // options: { label: string, value: any }[]
}
export const FormSelect = ({ options, name, label, type, ...props }: FormFieldProps) => {
    return (
        <Field
            name={name}
            render={({ field, form }: FieldProps<any>) => (
                <FormGroup>
                    <FormLabel>{label}</FormLabel>
                    <Form.Select isInvalid={!!form.errors[field.name]} value={field.value} onChange={props.onChange ?? (e => form.setFieldValue(field.name, e.target.value))}>
                        {options.map((s:any) => (
                            <option value={s.value}>{s.label}</option>
                        ))}
                    </Form.Select>
                    {/* <FormControl isInvalid={!!form.errors[field.name]} type={type} value={field.value} onChange={props.onChange ?? (e => form.setFieldValue(field.name, e.target.value))} /> */}
                    <div>{form.errors[field.name] as string}</div>
                </FormGroup>
            )}
            {...props}
        />)
}