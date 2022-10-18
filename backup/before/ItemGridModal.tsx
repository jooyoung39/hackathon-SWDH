import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';
import ItemListModal from './ItemListModal';

import ItemCard from './ItemCard';

import '../assets/style/modal.css';

const ItemGridModal = ({ show, onClose, props }) => {
  const { handler } = props;
  const { data } = props;

  const [isOpen, setIsOpen] = useState(true);
  return (
    <Modal
      show={isOpen && show}
      onHide={() => {
        setIsOpen(false);
        onClose();
      }}
      centered
    >
      <Modal.Header style={{ borderBottom: '0' }}>
        <CloseButton
          onClick={() => {
            setIsOpen(false);
            onClose();
          }}
        />
      </Modal.Header>
      {show && (
        <Modal.Body style={{ marginTop: '-1rem', paddingTop: '1rem' }}>
          <div className="item-grid">
            {data.map((data) => (
              <ItemCard
                key={data.id}
                size="lg"
                data={data}
                onClick={() => handler(ItemListModal, data)}
              />
            ))}
          </div>
        </Modal.Body>
      )}
    </Modal>
  );
};

export default ItemGridModal;
