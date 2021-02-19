import React from 'react';
import styles from './styles';

export interface Change {
  id: string;
  value: boolean;
}
interface Props {
  id: string;
  value?: boolean;
  label?: string;
  text?: string | React.ElementType;
  ref?: React.Ref<HTMLInputElement>;
  onChange?: (change: Change) => void;
}

const InputCheckbox: React.FC<Props> = (props) => {
  const { id, value, label, text, onChange } = props;
  return (
    <div className={styles.container}>
      <div className={styles.labelContainer}>
        {label ? (
          <label className={styles.label} htmlFor={id}>
            {label}
          </label>
        ) : null}
      </div>
      <div className={styles.wrapper}>
        <input
          type="checkbox"
          id={id}
          className={styles.input}
          checked={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (onChange) {
              onChange({ id, value: e.target.checked });
            }
          }}
        />
        <label htmlFor={id} className={styles.text}>
          {text}
        </label>
      </div>
    </div>
  );
};

export default InputCheckbox;
