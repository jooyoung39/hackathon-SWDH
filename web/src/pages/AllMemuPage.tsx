import { useAppSelector } from '../hooks/useStore';
import styles from '../assets/style/page_all_menu.module.scss';

const AllMenu = () => {
  const userData = useAppSelector((state) => state.user);
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>전체</h1>
      <section className={styles.profile}>
        <button type="button">
          <h5>{userData.name.length ? userData.name : '로그인'}</h5>
        </button>
      </section>
      <section className={styles.menu}>
        <h5>
          <i className="fa-solid fa-pills fa-fw" />약 전체 보기
        </h5>
        <h5>
          <i className="fa-solid fa-clock-rotate-left fa-fw" />
          예약 기록 보기
        </h5>
      </section>
      <section className={styles.menu}>
        <h5>
          <i className="fa-sharp fa-solid fa-money-check-dollar fa-fw" />
          페이 잔액 조회
        </h5>
        <h5>
          <i className="fa-solid fa-square-dollar fa-fw" />
          페이 잔액 충전
        </h5>
      </section>
      <section className={styles.menu}>
        <h5>
          <i className="fa-sharp fa-solid fa-hand-holding-medical fa-fw" />내
          건강 공제 정보
        </h5>
        <h5>
          <i className="fa-solid fa-receipt fa-fw" />
          보건실 이용 기록
        </h5>
      </section>
    </div>
  );
};

export default AllMenu;
