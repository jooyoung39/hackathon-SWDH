import { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import styles from '../assets/style/section_status.module.scss';

dayjs.locale('ko');

const isOpen = () => {
  const currentHour = dayjs().get('h');
  const currentMinute = dayjs().get('m');
  return (
    9 * 60 <= currentHour * 60 + currentMinute &&
    currentHour * 60 + currentMinute <= 17 * 60 + 20
  );
};

const StatusSection = () => {
  const [isAway, setIsAway] = useState<boolean>(true);
  const [isClosed] = useState<boolean>(!isOpen());

  return (
    <section className={styles.section}>
      <div className="status-data">
        <h3 className="mb-1">건강 공제회</h3>
        <h6 className="mb-1">학생회관 2층 212-1호</h6>
        <h6 className="mb-1">운영 시간: 09:00 ~ 17:20</h6>
      </div>
      <div
        className="status-available"
        style={{
          color: isClosed
            ? 'DarkGray'
            : isAway
            ? 'LightCoral'
            : 'cornflowerblue',
        }}
      >
        <i className="fa-solid fa-user-doctor-hair" />
        <h4>{isClosed ? '영업 종료' : isAway ? '부재중' : '이용 가능'}</h4>
      </div>
    </section>
  );
};

export default StatusSection;
