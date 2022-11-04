import { Link } from 'react-router-dom';
import styles from '../assets/style/menu.module.scss';

type MenuTabProps = {
  to: string;
  text: string;
  icon: string;
  isActive: boolean;
  onClick: () => void;
};

const MenuTab = ({ to, text, icon, isActive, onClick }: MenuTabProps) => (
  <Link to={to} className={[isActive ? 'active' : ''].join(' ')}>
    <button type="button" className={styles.tab} onClick={onClick}>
      <i className={['fa-solid', icon].join(' ')} />
      <p>{text}</p>
    </button>
  </Link>
);

export default MenuTab;
