import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.css';

interface Props {
  headerTitle?: string;
  onClose: () => void;
  needCloseButton?: boolean;
}

const Header: React.FC<Props> = ({ headerTitle, onClose, needCloseButton }) => (
  <div className={styles.header}>
    {headerTitle ? (
      <div className={styles.titleContainer}>
        <h2 data-test="answer-result">{headerTitle}</h2>
      </div>
    ) : null}
    {needCloseButton && (
      <button className={styles.closeButton} onClick={onClose}>
        <FontAwesomeIcon icon={faTimes} className={styles.icon} />
      </button>
    )}
  </div>
);

export default Header;
