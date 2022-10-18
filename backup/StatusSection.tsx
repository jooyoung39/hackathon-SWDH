import { useState, useEffect } from 'react';
import { useInterval } from 'react-use';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

const HeaderSection = () => {
  const [isAway, setIsAway] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [realTime, setRealTime] = useState(dayjs());

  useEffect(() => {
    setIsAway(true);
    setIsOpen(
      9 * 60 <= dayjs().get('h') * 60 + dayjs().get('m') &&
        dayjs().get('h') * 60 + dayjs().get('m') <= 17 * 60 + 20
    );
  }, []);

  useInterval(() => {
    setRealTime(dayjs());
    setIsOpen(
      9 * 60 <= realTime.get('h') * 60 + realTime.get('m') &&
        realTime.get('h') * 60 + realTime.get('m') <= 17 * 60 + 20
    );
  }, 10000);

  return (
    <section className="status-section">
      <div className="card-container-md">
        <div className="card-status">
          <div className="card-body">
            <div className="status-data">
              <h3 className="mb-1">교내 보건실</h3>
              <h6 className="mb-1">학생회관 2층 212-1호</h6>
              <h6 className="mb-1">운영 시간: 09:00 ~ 17:20</h6>
            </div>
            <div
              className="status-available"
              style={{
                color: isOpen
                  ? isAway
                    ? 'LightCoral'
                    : 'cornflowerblue'
                  : 'DarkGray',
              }}
            >
              <i className="fa-solid fa-user-doctor-hair" />
              <h4>
                {isOpen ? (isAway ? '부재중' : '이용 가능') : '영업 종료'}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderSection;
