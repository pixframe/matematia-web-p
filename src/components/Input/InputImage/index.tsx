import React from 'react';
import styles from './styles';
import InputText from '../InputText';
import { isFile } from '../../../utils/typeGuards';

interface Props {
  value?: File | string | null;
  id?: string;
  onChange?: (value: File, id?: string) => void;
  label?: string;
  parser?: (string: string) => string;
}

interface State {
  img: string | null;
}

export default class Image extends React.Component<Props, State> {
  private input = React.createRef<HTMLInputElement>();

  constructor(props: Props) {
    super(props);
    this.state = {
      img: ''
    };
  }

  componentDidMount() {
    const { value, parser } = this.props;

    if (!value) {
      return this.setState({ img: '' });
    }

    if (value instanceof File) {
      this.readFile(value);
    }

    if (typeof value === 'string') {
      this.setState({ img: parser ? parser(value) : value });
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { value, parser } = this.props;

    console.log(value);

    if (!value) {
      return;
    }

    if (value instanceof File && value !== prevProps.value) {
      this.readFile(value);
    }

    if (typeof value === 'string' && value !== prevProps.value) {
      this.setState({ img: parser ? parser(value) : value });
    }
  }

  readFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      if (data && typeof data === 'string') {
        this.setState({ img: data });
      }
    };
    reader.readAsDataURL(file);
  };

  openFileSelector = (e: React.MouseEvent) => {
    e.stopPropagation();
    this.input.current?.click();
  };

  change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, onChange } = this.props;
    const value = event.target.files?.[0];
    if (value) {
      onChange?.(value, id);
    }
  };

  render() {
    const { id, label, value } = this.props;
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
          <div className={styles.imageContainer} onClick={this.openFileSelector}>
            {this.state.img ? <img className={styles.image} src={this.state.img} alt="" /> : null}
          </div>
          <InputText
            id=""
            value={isFile(value) ? value.name : ''}
            inputClassname={styles.customInputContainer}
            containerClassname={styles.customInputContainer}
            readOnly
          />
        </div>
        <input
          type="file"
          style={{ display: 'none' }}
          id={id}
          onChange={this.change}
          ref={this.input}
        />
      </div>
    );
  }
}
