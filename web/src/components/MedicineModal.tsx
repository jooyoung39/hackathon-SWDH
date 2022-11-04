import { useState, useRef } from 'react';
//
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import Card from 'react-bootstrap/Card';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
//
import { useAppSelector } from '../hooks/useStore';
//
import { useModalsDispatch } from '../hooks/useModal';
import ConfirmModal from './ConfirmModal';
//
import type { MedicineData } from '../types';

const icon: { [key: string]: string } = {
  tablets: 'fa-tablets',
  capsules: 'fa-capsules',
  vial: 'fa-vial',
  patch: 'fa-note-medical',
};

type Props = {
  data: MedicineData;
  onClose: () => void;
};

const MedicineModal = ({ data, onClose }: Props): JSX.Element => {
  const userData = useAppSelector((state) => state.user);
  const ModalsDispatch = useModalsDispatch();

  const [isOpen, setIsOpen] = useState(true);
  const [reserveCount, setReserveCount] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const [needLogin, setNeedLogin] = useState(false);

  const targetCount = useRef(null);
  const targetButton = useRef(null);

  const hideModal = () => {
    setIsOpen(false);
    onClose();
  };

  const reserveUp = () => {
    if (reserveCount < 2 && reserveCount < data.quantity) {
      setReserveCount(reserveCount + 1);
      setIsInvalid(false);
    } else {
      setErrorMessage('예약은 2개 혹은 남은 개수를 넘을 수 없습니다.');
      setIsInvalid(true);
    }
  };

  const reserveDown = () => {
    if (reserveCount > 1) {
      setReserveCount(reserveCount - 1);
      setIsInvalid(false);
    } else {
      setErrorMessage('0개 이하로 예약할 수 없습니다.');
      setIsInvalid(true);
    }
  };

  const reserve = (medicine: MedicineData) => {
    if (!userData.name.length) {
      setNeedLogin(true);
    }
  };

  return (
    <Modal show={isOpen} onHide={hideModal} centered>
      <Modal.Header style={{ borderBottom: '0' }}>
        <CloseButton onClick={hideModal} />
      </Modal.Header>

      <>
        <Modal.Body
          style={{
            marginTop: '-1rem',
            paddingTop: '1rem',
            textAlign: 'center',
          }}
        >
          <Card className="card-medicine">
            <Card.Body>
              <h5 className="mb-0 text-center w-100">
                <i className={['fa-solid me-3', icon[data.icon]].join(' ')} />
                {data.name}
              </h5>
            </Card.Body>
          </Card>
          <Card className="card-medicine">
            <Card.Body style={{ flexDirection: 'column' }}>
              <h5>효능</h5>
              <p>{data.effect}</p>
            </Card.Body>
          </Card>
          <Card className="card-medicine">
            <Card.Body style={{ flexDirection: 'column' }}>
              <h5>복용량</h5>
              <p>{data.dosage}</p>
            </Card.Body>
          </Card>
          <Card className="card-medicine">
            <Card.Body style={{ flexDirection: 'column' }}>
              <h5>성분</h5>
              <p>{data.ingredient}</p>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: 'space-between' }}>
          <p>남은 개수: {data.quantity}</p>
          <p ref={targetCount}>
            <Button variant="outline-secondary me-3" onClick={reserveDown}>
              <i className="fa-solid fa-angle-down" />
            </Button>
            {reserveCount}
            <Button variant="outline-secondary ms-3" onClick={reserveUp}>
              <i className="fa-solid fa-angle-up" />
            </Button>
          </p>
          <Overlay
            target={targetCount.current}
            show={isInvalid}
            placement="top"
          >
            <Tooltip id="overlay-example">{errorMessage}</Tooltip>
          </Overlay>
          <Button ref={targetButton} onClick={() => reserve(data)}>
            예약하기
          </Button>
          <Overlay
            target={targetButton.current}
            show={needLogin}
            placement="top"
          >
            <Tooltip id="overlay-example">로그인이 필요합니다.</Tooltip>
          </Overlay>
        </Modal.Footer>
      </>
    </Modal>
  );
};

export default MedicineModal;
