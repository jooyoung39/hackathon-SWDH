import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';
import useAxios from '../hooks/useAxios';
import MedicineModal from './MedicineModal';
import useModals from '../hooks/useModal';

import MedicineCard from './MedicineCard';

import '../assets/style/modal.css';

const ItemListModal = ({ show, onClose, props }) => {
  const { openModal } = useModals();

  const [isOpen, setIsOpen] = useState(true);
  const [medicineData, setMedicineData] = useState([]);

  useEffect(() => {
    useAxios.get('medicines').then((res) => {
      setMedicineData(res.data.medicines);
    });
  }, []);

  const hideModal = () => {
    setIsOpen(false);
    onClose();
  };

  const ModalBody = (medicine) => (
    <div key={medicine.id}>
      <MedicineCard
        medicine={medicine}
        onClick={() =>
          openModal(MedicineModal, { show: true, props: medicine })
        }
      />
    </div>
  );

  return (
    <Modal show={isOpen && show} onHide={hideModal} centered>
      <Modal.Header style={{ borderBottom: '0' }}>
        <CloseButton onClick={hideModal} />
      </Modal.Header>
      {show && (
        <Modal.Body style={{ marginTop: '-1rem', paddingTop: '1rem' }}>
          {Array.isArray(props.type) && props.type.length !== 0 ? (
            medicineData.map(
              (medicine) =>
                props.type.some((type) => type === medicine.type) &&
                ModalBody(medicine),
            )
          ) : typeof props.type === 'string' && props.type.length !== 0 ? (
            medicineData.map(
              (medicine) => medicine.type === props.type && ModalBody(medicine),
            )
          ) : (
            <div className="h-100 d-flex flex-column justify-content-center">
              <p className="text-center">약 목록이 없습니다.</p>
            </div>
          )}
        </Modal.Body>
      )}
    </Modal>
  );
};

export default ItemListModal;
