import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';
import MedicineCard from './MedicineCard';
import MedicineModal from './MedicineModal';

import { useModalsDispatch } from '../hooks/useModal';
import { useGetMedicinesMutation } from '../services/careusAPI';

import styles from '../assets/style/modal_medicine_list.module.scss';

import type { MedicineData } from '../types';

type Props = {
  data: string[];
  onClose: () => void;
};

const MedicineListModal = ({ data, onClose }: Props): JSX.Element => {
  const ModalsDispatch = useModalsDispatch();

  const [isOpen, setIsOpen] = useState(true);
  const [fetchedMedicines, setFetchedMedicines] = useState<MedicineData[]>([]);

  const [getMedicines] = useGetMedicinesMutation();

  const onHide = () => {
    setIsOpen(false);
    onClose();
  };

  useEffect(() => {
    getMedicines()
      .unwrap()
      .then((MedicineData) => {
        setFetchedMedicines(
          MedicineData.filter((medicine) =>
            data.some((type) => type === medicine.type),
          ),
        );
      });
  }, []);

  return (
    <Modal show={isOpen} onHide={onHide} centered>
      <Modal.Header style={{ borderBottom: '0' }}>
        <CloseButton onClick={onHide} />
      </Modal.Header>
      <Modal.Body style={{ marginTop: '-1rem', paddingTop: '1rem' }}>
        {fetchedMedicines.length !== 0 ? (
          fetchedMedicines.map((medicine) => (
            <div key={medicine.id}>
              <MedicineCard
                name={medicine.name}
                icon={medicine.icon}
                quantity={medicine.quantity}
                onClick={() =>
                  ModalsDispatch({
                    type: 'OPEN',
                    Component: MedicineModal,
                    data: medicine,
                  })
                }
              />
            </div>
          ))
        ) : (
          <div className="h-100 d-flex flex-column justify-content-center">
            <p className="text-center">약 목록이 없습니다.</p>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default MedicineListModal;
