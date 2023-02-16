import { Field, FieldAttributes, FieldProps } from "formik"
import { FormControl, FormGroup, FormLabel, InputGroup } from "react-bootstrap"

export interface FormFieldProps extends FieldAttributes<any> {
    label: string;
    type: string;
    name: string;
}

interface InputGroupProps {
    inputGroupPosition?: 'before' | 'after',
    inputNode?: React.ReactNode
}

export const FormField = ({ label, type, as, name, className, required, inputNode, disabled, inputGroupPosition, ...props }: FormFieldProps & InputGroupProps) => {
    return (
        <Field
            name={name}
            render={({ field, form, }: FieldProps<any>) => {
                // console.log(form.touched);
                return (
                    <FormGroup className={className}>
                        <FormLabel>{label}</FormLabel>
                        <InputGroup>
                            {/* /<InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text> */}
                            {inputNode && inputGroupPosition === 'before' ? inputNode : null }
                            <FormControl as={as} disabled={disabled} required={required} isInvalid={form.touched[field.name] && !!form.errors[field.name]} type={type} autoComplete="new-password" {...field} />
                            {inputNode && inputGroupPosition === 'after' ? inputNode : null }
                        </InputGroup>

                        <div style={{ color: 'red' }}>{form.touched[field.name] && form.errors[field.name] as string}</div>
                    </FormGroup >
                )
            }}
            onBlur={props.onBlur}
            {...props}
        />)
}