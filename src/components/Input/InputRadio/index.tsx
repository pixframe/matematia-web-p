import React from 'react';
import classnames from 'classnames';
import styles from './styles';
import InputError from '../InputError';

interface SelectOption {
  label: string;
  value: string;
}

interface Props {
  id: string;
  name: string;
  value: string;
  options: SelectOption[];
  label?: string;
  onChange: (value: string, id?: string) => void;
  onHelp?: () => void;
  disabled?: boolean;
  readOnly?: boolean;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  containerClassname?: string;
  inputClassname?: string;
  error?: string | undefined;
}

class InputRadio<T> extends React.Component<Props> {
  render() {
    const {
      id,
      name,
      value,
      label,
      options,
      onChange,
      disabled,
      readOnly,
      containerClassname,
      inputClassname,
      onFocus,
      onBlur,
      error
    } = this.props;

    return (
      <div className={classnames(styles.container, containerClassname)}>
        <div className={styles.labelContainer}>
          {label ? (
            <label className={styles.label} htmlFor={id}>
              {label}
            </label>
          ) : null}
        </div>
        <div className={styles.radios}>
          {options.map((option) => {
            return (
              <div
                key={option.label}
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  width: `${100 / options.length}%`,
                  alignItems: 'center',
                  justifyContent: 'start'
                }}
              >
                <input
                  id={id}
                  name={name}
                  className={classnames(styles.radio, inputClassname)}
                  value={option.value}
                  onChange={() => onChange(option.value)}
                  disabled={disabled}
                  readOnly={readOnly}
                  onFocus={(e) => onFocus?.(e)}
                  onBlur={(e) => onBlur?.(e)}
                  type="radio"
                  checked={option.value === value}
                />
                <p className={styles.radioLabel}>{option.label}</p>
              </div>
            );
          })}
        </div>

        <InputError error={error} />
      </div>
    );
  }
}

export default InputRadio;
