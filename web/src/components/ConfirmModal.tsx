import { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import styles from '../assets/style/modal_confirm.module.scss';

type Props = {
  data: {
    message: string;
    next: () => void;
    buttonType?: string;
    confirmMessage?: string;
    cancelMessage?: string;
  };
  onClose: () => void;
};

const ConfirmModal = ({ data, onClose }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(true);

  const onCancel = () => {
    setIsOpen(false);
    onClose();
  };

  const onConfirm = () => {
    if (data) data.next();
    setIsOpen(false);
    onClose();
  };

  return (
    <Modal className={styles.modal} show={isOpen} onHide={onCancel} centered>
      <Modal.Body>{data.message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          {data.cancelMessage || '취소'}
        </Button>
        {data.buttonType !== 'none' && (
          <Button variant={data.buttonType || 'primary'} onClick={onConfirm}>
            {data.confirmMessage || '확인'}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
