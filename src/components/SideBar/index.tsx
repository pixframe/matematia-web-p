import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';

export interface SideBarOption {
  id: string;
  icon?: string;
  label: string;
  path: string;
}

export interface SideBarProps {
  options: (SideBarOption | null)[];
  brand?: string;
}

const SideNabBar: React.FC<SideBarProps> = ({ options, brand }) => (
  <div className={styles.leftBar}>
    <div className={styles.logoContainer}>
      {brand ? <img src={brand} alt="" className={styles.brand} /> : null}
    </div>
    <div className={styles.options}>
      {options.map((option) =>
        option ? (
          <NavLink
            key={option.id}
            className={styles.leftBarButton}
            activeClassName={styles.leftBarButtonActive}
            to={option.path}
          >
            <div className={styles.icon}>
              {option.icon ? <img src={option.icon} alt="" /> : null}
            </div>
            <div>{option.label}</div>
          </NavLink>
        ) : null
      )}
    </div>
  </div>
);

export default SideNabBar;
