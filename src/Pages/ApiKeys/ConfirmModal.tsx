import { FC } from 'react';
import { Modal, ModalProps, Button } from 'react-bootstrap';

interface IProps extends ModalProps {
  onSubmit?: () => void
}

export const ConfirmModal: FC<IProps> = ({ show, onHide, onSubmit, isLoading }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Підтвердження</Modal.Title>
      </Modal.Header>
      <Modal.Body>Ви справді бажаєте зберегти зміни?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Відминити
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Підтвердити
        </Button>
      </Modal.Footer>
    </Modal>
  );
}