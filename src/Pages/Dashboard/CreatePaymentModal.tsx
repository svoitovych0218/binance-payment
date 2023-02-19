import { useCallback, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDebounce } from '../../hooks/Debounce';
import axios from 'axios';
import { Field, FieldProps, Formik, useFormikContext } from 'formik';
import { FormField, FormFieldProps } from '../../Components/Inputs/FormField';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';

interface ICreatePaymentModalProps {
    show: boolean;
    onClose: () => void;
    handleSubmit: (values: ICreatePaymentFormProps) => Promise<void>;

}

export interface ICreatePaymentFormProps {
    amountBusd?: number;
    amountUAH?: number;
    receipeNumber: string;
    description: string;
}

const AmmountFormField = ({ label, type, required, name, ...props }: FormFieldProps) => {
    const { values, setFieldValue } = useFormikContext<ICreatePaymentFormProps>();
    const debouncedAmount = useDebounce(values.amountUAH, 1000);
    const getRate = useCallback(async () => {
        const res = await axios.get('https://api.binance.com/api/v3/trades?symbol=USDTUAH&limit=10');
        const data = res.data[0];
        if (debouncedAmount) {
            setFieldValue('amountBusd', +(debouncedAmount / (+data.price)).toFixed(2));
        }
    }, [debouncedAmount, setFieldValue])

    useEffect(() => {
        getRate();
    }, [debouncedAmount, getRate])
    return (
        <Field
            name={name}
            render={({ field, form }: FieldProps<any>) => (
                <FormGroup>
                    <FormLabel>{label}</FormLabel>
                    <FormControl required={required} isInvalid={!!form.errors[field.name]} type={type} value={field.value} onChange={e => {
                        setFieldValue(field.name, +e.target.value);
                    }} />
                    <div>{form.errors[field.name] as string}</div>
                </FormGroup>
            )}
            {...props}
        />)
}

export const CreatePaymentModal = ({ show, onClose, handleSubmit }: ICreatePaymentModalProps) => {
    const initialValues: ICreatePaymentFormProps = {
        amountBusd: undefined,
        amountUAH: undefined,
        receipeNumber: '',
        description: ''
    }

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Заповніть форму</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
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
                                <FormField required name="receipeNumber" label='Номер чеку' type='text' />
                                <FormField name="description" label='Опис товару/послуги' type='text' as='textarea'/>
                                <AmmountFormField required name="amountUAH" label='Сума в UAH' type='number' />
                                <FormField required disabled={true} name="amountBusd" label='Сума в USDT' type='number' />
                                <Button className='mt-4' size='lg' variant="primary" type='submit'>
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