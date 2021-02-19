import React from 'react';
import classnames from 'classnames';
import styles from './styles';
import InputError from '../InputError';

interface SelectOption<T> {
  label: string;
  value: T;
}
interface Props<T> {
  id: string;
  value?: T;
  label?: string;
  placeholder?: string;
  password?: boolean;
  options: SelectOption<T>[];
  onChange?: (value: T, id: string) => void;
  containerClassname?: string;
  error?: string | undefined;
}

export default class InputSelect<T> extends React.Component<Props<T>> {
  render() {
    const {
      id,
      value,
      label,
      onChange,
      options,
      placeholder,
      containerClassname,
      error
    } = this.props;
    const valueIndex = options.findIndex((item) => item.value === value);

    return (
      <div className={classnames(styles.container, containerClassname)}>
        <div className={styles.labelContainer}>
          {label ? (
            <label className={styles.label} htmlFor={id}>
              {label}
            </label>
          ) : null}
        </div>

        <select<T>
          id={id}
          className={styles.input}
          value={valueIndex}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            if (onChange) {
              onChange(options[parseInt(e.target.value)].value, id);
            }
          }}
          placeholder={placeholder}
        >
          <option value={-1} disabled>
            {placeholder}
          </option>
          {options.map((option, index) => (
            <option value={index} key={option.label + index}>
              {option.label}
            </option>
          ))}
        </select>
        <InputError error={error} />
      </div>
    );
  }
}
