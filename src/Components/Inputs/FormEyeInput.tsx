import { Field, FieldAttributes, FieldProps } from "formik"
import { FormControl, FormGroup, FormLabel, InputGroup, Button } from "react-bootstrap"
import { FC, useState } from 'react';
import { Eye, EyeSlash } from "react-bootstrap-icons";

export interface Props extends FieldAttributes<any> {
  label: string;
  type: string;
  name: string;
  defaultVisible?: boolean
}

export const FormEyeInput: FC<Props> = ({ label, name, className, required, defaultVisible = false, ...props }) => {
  const [isValueVisible, setIsValueVisible] = useState<boolean>(defaultVisible);
  return (
    <Field
      name={name}
      render={({ field, form, }: FieldProps<any>) => {
        return (
          <FormGroup className={className}>
            <FormLabel>{label}</FormLabel>
            <InputGroup>
              <FormControl
                required={required}
                isInvalid={form.touched[field.name] && !!form.errors[field.name]}
                type={isValueVisible ? 'text' : 'password'}
                autoComplete="new-password"
                {...field}
              />
              <Button type="button" onClick={() => setIsValueVisible(prevVal => !prevVal)}>
                {!isValueVisible ? <Eye /> : <EyeSlash />}
              </Button>
            </InputGroup>

            <div style={{ color: 'red' }}>{form.touched[field.name] && form.errors[field.name] as string}</div>
          </FormGroup >
        )
      }}
      {...props}
    />)
}