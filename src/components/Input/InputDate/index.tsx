import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './styles';
import InputError from '../InputError';

interface Props {
  id: string;
  value?: Date | null;
  label?: string;
  placeholder?: string;
  password?: boolean;
  onChange?: (value: Date, id?: string) => void;
  onHelp?: () => void;
  minDate?: Date;
  error?: string | undefined;
}

const InputDate: React.FC<Props> = (props) => {
  const { id, value, label, onChange, minDate, error } = props;
  const change = (value: Date) => {
    if (onChange) {
      onChange(value, id);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.labelContainer}>
        {label ? (
          <label className={styles.label} htmlFor={id}>
            {label}
          </label>
        ) : null}
      </div>
      <DatePicker
        minDate={minDate}
        className={styles.input}
        selected={value}
        timeIntervals={60}
        onChange={change}
      />
      <InputError error={error} />
    </div>
  );
};

export default InputDate;
