import React from 'react';
import { classes } from 'typestyle';
import styles from './styles';

interface Props {
  label: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  buttonClassname?: string;
  containerClassname?: string;
  theme?: 'green' | 'white';
}

const Button: React.FC<Props> = (props) => {
  const { label, onClick, buttonClassname, containerClassname, theme } = props;

  return (
    <div className={classes(styles.buttonContainer, containerClassname)}>
      <button
        className={classes(styles.button, buttonClassname, {
          [styles.buttonGreen]: theme === 'green',
          [styles.buttonWhite]: theme === 'white'
        })}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
};

export default Button;
