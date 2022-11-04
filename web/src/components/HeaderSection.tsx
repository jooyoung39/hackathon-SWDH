import { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Offcanvas from 'react-bootstrap/Offcanvas';
import dayjs from 'dayjs';
import { useModalsDispatch } from '../hooks/useModal';
import LoginModal from './LoginModal';
import styles from '../assets/style/section_header.module.scss';

const HeaderSection = () => {
  const ModalsDispatch = useModalsDispatch();
  const [showNotification, setShowNotification] = useState<boolean>(false);
  return (
    <>
      <section className={styles.section}>
        <h1>
          <i className="fa-duotone fa-hand-holding-heart" />
          careUS
        </h1>
        <button
          type="button"
          className="mb-0"
          onClick={() => setShowNotification(true)}
        >
          <h1>
            <i className="fa-solid fa-bell" />
          </h1>
        </button>
        <button
          type="button"
          className="mb-0"
          onClick={() => {
            ModalsDispatch({ type: 'OPEN', Component: LoginModal, data: {} });
          }}
        >
          <h1>
            <i className="fa-solid fa-user" />
          </h1>
        </button>
      </section>
      <Offcanvas
        show={showNotification}
        onHide={() => setShowNotification(false)}
        placement="end"
        style={{ width: '18rem' }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>알림</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ boxSizing: 'border-box' }}>
          <ToastContainer style={{ position: 'relative' }}>
            <Toast style={{ width: '100%' }}>
              <Toast.Header closeButton={false}>
                <strong className="me-auto">물품 제공 안내</strong>
                <small className="text-muted">지금</small>
              </Toast.Header>
              <Toast.Body>
                {dayjs().get('M') + 1}월 {dayjs().get('D')}일 오후 2시부터
                학생회관 1층에서 COVID-19 자가진단 키트를 제공해 드립니다. 한정
                수량이니 필요한 학생은 시간에 맞춰 수령 바랍니다.
              </Toast.Body>
            </Toast>
            <Toast>
              <Toast.Header closeButton={false}>
                <strong className="me-auto">재입고 안내</strong>
                <small className="text-muted">1 시간 전</small>
              </Toast.Header>
              <Toast.Body>
                교내 보건실 타이레놀이 재입고되어 구매 가능합니다.
              </Toast.Body>
            </Toast>
          </ToastContainer>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
export default HeaderSection;
