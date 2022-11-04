import Button from 'react-bootstrap/Button';
//
import { useModalsDispatch } from '../hooks/useModal';
import ConfirmModal from './ConfirmModal';
//
import styles from '../assets/style/section_reservation.module.scss';

interface IIconStyle {
  [key: string]: string;
}

const iconStyle: IIconStyle = {
  tablets: 'fa-tablets',
  capsules: 'fa-capsules',
  vial: 'fa-vial',
  patch: 'fa-note-medical',
};

const ReservationSection = () => {
  const ModalsDispatch = useModalsDispatch();
  const test = true;

  const cancelReservation = () => {
    ModalsDispatch({
      type: 'OPEN',
      Component: ConfirmModal,
      data: {
        message: '예약을 취소하시겠습니까?',
        next: () => {
          console.log('취소');
        },
        buttonType: 'danger',
        cancelMessage: '예약 유지',
        confirmMessage: '예약 취소',
      },
    });
  };

  return (
    <section className={styles.section}>
      <div className="section-header">
        <h3>내 예약</h3>
      </div>
      <div className={styles.reservation}>
        {!test ? (
          '예약 없음'
        ) : (
          <div className={styles.info}>
            <div>
              <p>
                <i className={['fa-solid', iconStyle.capsules].join(' ')} />
                이지엔 프로 6
              </p>
              <p>5분 남음</p>
            </div>
            <div>
              <Button variant="primary">수령</Button>
              <Button variant="danger" onClick={cancelReservation}>
                취소
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReservationSection;
