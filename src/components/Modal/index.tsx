import React from 'react';
import styles from './styles.module.css';
import Header from './Header';

interface Props {
  title?: string;
  open: boolean;
  onClose: () => void;
  needCloseButton?: boolean;
}

const Modal: React.FC<Props> = ({ title, children, onClose, open, needCloseButton = true }) => {
  if (!open) {
    return null;
  }
  return (
    <div className={styles.container} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <Header headerTitle={title} onClose={onClose} needCloseButton={needCloseButton} />
        {children}
      </div>
    </div>
  );
};

export default Modal;
