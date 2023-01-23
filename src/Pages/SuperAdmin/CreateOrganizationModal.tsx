import { Formik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FormField } from '../../Components/Inputs/FormField';
import { IOrganization } from './Table';


export type CreateOrganizationRequest = Omit<IOrganization, '_id' | 'SK' | 'payedTill'>;
interface ICreatePaymentModalProps {
    show: boolean;
    handleSubmit: (organization: CreateOrganizationRequest) => Promise<void>;
}

const initialValues: CreateOrganizationRequest = {
    name: '',
    email: '',
    phoneNumber: '',
}

export const CreateOrganizationModal = ({ show, handleSubmit }: ICreatePaymentModalProps) => {

    const onSubmit = (values: any) => {
        console.log(values);
    }
    return (
        <Modal show={show}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validate={(values) => {
                    let errors: Partial<CreateOrganizationRequest> = {};
                    if (!values.name) {
                        errors.name = 'name is required';
                    }

                    return errors;
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                    <Form onSubmit={handleSubmit}>
                        <Modal.Body>
                            <FormField required name='name' label='Name' type='text' />
                            <FormField name='email' label='Email' type='email' />
                            <FormField name='phoneNumber' label='Phone' type='text' />
                            <Button type="submit" variant="primary">
                                Save Changes
                            </Button>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary">
                                Close
                            </Button>
                        </Modal.Footer>
                    </Form>
                )}
            </Formik>
        </Modal>
    )
}