import React from 'react';
import classnames from 'classnames';
import styles from './styles';

interface Props {
  id: string;
  value: string | number | string[] | undefined;
  label?: string;
  placeholder?: string;
  onChange?: (value: string, id?: string) => void;
  onHelp?: () => void;
  disabled?: boolean;
  readOnly?: boolean;
  onClick?: (event: React.MouseEvent<HTMLTextAreaElement, MouseEvent>) => void;
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  containerClassname?: string;
  inputClassname?: string;
  rows?: number;
}

const InputText: React.FC<Props> = (props) => {
  const {
    id,
    value,
    label,
    onChange,
    placeholder,
    disabled,
    readOnly,
    containerClassname,
    inputClassname,
    onFocus,
    onBlur,
    onClick,
    rows = 3
  } = props;
  const change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      <textarea
        id={id}
        className={classnames(styles.input, inputClassname)}
        value={value}
        onChange={change}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        onFocus={(e) => onFocus?.(e)}
        onBlur={(e) => onBlur?.(e)}
        onClick={onClick}
        autoComplete="off"
        rows={rows}
      />
    </div>
  );
};

export default InputText;
