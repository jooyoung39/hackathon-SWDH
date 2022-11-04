import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';
import Spinner from 'react-bootstrap/Spinner';
import ItemCard from './ItemCard';
import MedicineListModal from './MedicineListModal';
import { useModalsDispatch } from '../hooks/useModal';
import styles from '../assets/style/modal_item_grid.module.scss';

type Props = {
  data: Array<{
    id: number;
    name: string;
    icon: string;
    iconColor: string;
    type: string | Array<string>;
  }>;
  onClose: () => void;
};

const ItemGridModal = ({ data, onClose }: Props): JSX.Element => {
  const ModalsDispatch = useModalsDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(true);

  const openMedicineListModal = (type: string | Array<string>) => {
    let modalData;

    if (typeof type === 'string') modalData = [type];
    else modalData = type;

    ModalsDispatch({
      type: 'OPEN',
      Component: MedicineListModal,
      data: modalData,
    });
  };

  return (
    <Modal
      className={styles.modal}
      show={isOpen}
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
      <Modal.Body>
        {typeof data !== 'undefined' && data.length ? (
          <div className={styles['item-grid']}>
            {data.map((item) => (
              <ItemCard
                key={item.id}
                size="lg"
                name={item.name}
                icon={item.icon}
                iconColor={item.iconColor}
                onClick={() => {
                  openMedicineListModal(item.type);
                }}
              />
            ))}
          </div>
        ) : (
          <div className={styles['spinner-container']}>
            <Spinner animation="border" variant="secondary" />
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ItemGridModal;
