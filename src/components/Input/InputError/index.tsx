import React from 'react';
import styles from './styles';

interface InputErrorProps {
  error: string | undefined;
}

const InputError: React.FC<InputErrorProps> = ({ error }) => {
  return (
    <div className={styles.errorContainer}>
      <span className={styles.error}>{error}</span>
    </div>
  );
};

export default InputError;
