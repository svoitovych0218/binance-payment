import { LoadingButton } from 'Components/LoadingButton';
import { FC } from 'react';
import { Modal, ModalProps, Button } from 'react-bootstrap';

interface IProps extends ModalProps {
  onSubmit?: () => void
  isLoading?: boolean
}

export const RefundModal: FC<IProps> = ({ show, onHide, onSubmit, isLoading }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Підтвердження</Modal.Title>
      </Modal.Header>
      <Modal.Body>Підтвердіть повернення коштів</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Відмінити
        </Button>
        <LoadingButton isLoading={isLoading} variant="primary" onClick={onSubmit}>
          Підтвердити
        </LoadingButton>
      </Modal.Footer>
    </Modal>
  );
}