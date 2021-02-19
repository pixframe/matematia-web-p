import React from 'react';
import classnames from 'classnames';
import styles from './styles';
import InputError from '../InputError';

interface Props {
  id: string;
  value: string | number | string[] | undefined;
  label?: string;
  placeholder?: string;
  password?: boolean;
  onChange?: (value: string, id?: string) => void;
  onHelp?: () => void;
  disabled?: boolean;
  readOnly?: boolean;
  onClick?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  containerClassname?: string;
  inputClassname?: string;
  error?: string;
}

const InputText: React.FC<Props> = (props) => {
  const {
    id,
    value,
    label,
    onChange,
    placeholder,
    password,
    disabled,
    readOnly,
    containerClassname,
    inputClassname,
    onFocus,
    onBlur,
    onClick,
    error
  } = props;
  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value, id);
    }
  };

  return (
    <div className={classnames(styles.container, containerClassname)}>
      <div className={styles.labelContainer}>
        {label ? (
          <label className={styles.label} htmlFor={id}>
            {label}
          </label>
        ) : null}
      </div>
      <input
        id={id}
        className={classnames(styles.input, inputClassname)}
        value={value}
        type={password ? 'password' : 'text'}
        onChange={change}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        onFocus={(e) => onFocus?.(e)}
        onBlur={(e) => onBlur?.(e)}
        onClick={onClick}
        autoComplete="off"
      />
      <InputError error={error} />
    </div>
  );
};

export default InputText;
