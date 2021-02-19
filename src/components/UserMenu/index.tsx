import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

interface Props {
  onLogout: () => void;
  open: boolean;
  admin?: boolean;
}

const UserMenu: React.FC<Props> = (props: Props) => {
  const { onLogout, open, admin } = props;
  return (
    <div className={styles.usermenu} style={{ display: open ? 'block' : 'none' }}>
      <Link to="/perfil" className={styles.usermenuButton}>
        Perfil
      </Link>

      {admin ? (
        <>
          <div className={styles.separator} />
          <Link to="/admin" className={styles.usermenuButton}>
            Admin
          </Link>
        </>
      ) : null}
      <div className={styles.separator} />
      <button onClick={onLogout} className={styles.usermenuButton}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default UserMenu;
