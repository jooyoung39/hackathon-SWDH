import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import MenuTab from './MenuTab';

import styles from '../assets/style/menu.module.scss';

const menuTabs = [
  { id: 0, text: '홈', icon: 'fa-home', route: '/' },
  { id: 1, text: '보건실', icon: 'fa-hospital-user', route: '/infirmary' },
  { id: 2, text: '전체', icon: 'fa-bars', route: '/all' },
];

const MenuBar = () => {
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState<string>(
    location.pathname,
  );

  return (
    <div className={styles.menu}>
      <div className={styles.tabs}>
        {menuTabs.map((tab) => (
          <MenuTab
            key={tab.id}
            to={tab.route}
            text={tab.text}
            icon={tab.icon}
            isActive={currentLocation === tab.route}
            onClick={() => setCurrentLocation(tab.route)}
          />
        ))}
        <span className={styles.slider}>
          <div className="slider-spacer" />
          <div className="slider-indicator" />
        </span>
      </div>
    </div>
  );
};

export default MenuBar;
