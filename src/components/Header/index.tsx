import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { User } from '@firebase/auth-types';
import UserMenu from '../UserMenu';
import styles from './styles.module.css';
import logo from '../../assets/logos/MATEMATIA.svg';
import home from '../../assets/images/icons/home.svg';
import store from '../../assets/images/icons/tienda.svg';
import colection from '../../assets/images/icons/coleccion.svg';

interface Props {
  onLogout: () => void;
  onUserButtonClick: () => void;
  usermenuOpen: boolean;
  user?: User | null;
  admin?: boolean;
}
export default function Header(props: Props) {
  const { onLogout, usermenuOpen, onUserButtonClick, user, admin } = props;
  return (
    <div className={styles.header}>
      <div className={styles.bar}>
        <div className={styles.brand}>
          <Link to="/">
            <img src={logo} className={styles.logo} alt="" />
          </Link>
        </div>
        <div className={styles.buttonBar} style={{ display: user ? '' : 'none' }}>
          <Link to="/">
            <div className={styles.tab}>
              <img src={home} className={styles.icon} alt="inicio" />
              <span className={styles.message}>INICIO</span>
            </div>
          </Link>
          <Link to="/">
            <div className={styles.tab}>
              <img src={colection} className={styles.icon} alt="coleccion" />
              <span className={styles.message}>MI COLECCIÓN</span>
            </div>
          </Link>
          <Link to="/">
            <div className={styles.tab}>
              <img src={store} className={styles.icon} alt="store" />
              <span className={styles.message}>TIENDA</span>
            </div>
          </Link>
        </div>
      </div>
      <div className={styles.buttons}>
        <div className={styles.usermenuContainer}>
          <button
            className={styles.button}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onUserButtonClick();
              return 0;
            }}
            style={{ display: user ? 'flex' : 'none' }}
          >
            {user && user.photoURL ? (
              <img src={user.photoURL} className={styles.userImage} alt="" />
            ) : (
              <FontAwesomeIcon icon={faUser} className={styles.icon} />
            )}
          </button>
          <UserMenu onLogout={onLogout} open={usermenuOpen} admin={admin} />
        </div>

        <Link
          to="/auth/login"
          className={styles.button}
          style={{ display: user ? 'none' : 'flex' }}
        >
          Iniciar
        </Link>
        <Link
          to="/auth/register"
          className={styles.button}
          style={{ display: user ? 'none' : 'flex' }}
        >
          Registrarse
        </Link>
      </div>
    </div>
  );
}
