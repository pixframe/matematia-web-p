import React from 'react';

export type OnChangeHandler<T> = <K extends keyof T>(value: T[K], key: K) => void;

export interface FormHandlerChildrenProps<T> {
  state: FormState<T>;
  reload?: () => Promise<void>;
  create?: () => Promise<void>;
  update?: () => Promise<void>;
  remove?: () => void;
  onChange: OnChangeHandler<T>;
  setModal: (name: string) => void;
  setSection: (name: string) => void;
}

export interface FormHandlerProps<T> {
  id?: string;
  onCreateSuccess?: (data: T) => void;
  onUpdateSuccess?: (data: T) => void;
  onRemoveSuccess?: (id: string) => void;
  getDefaultState: () => T;
  children(res: FormHandlerChildrenProps<T>): React.ReactNode;
  load?: (id: string) => Promise<T>;
  create?: (data: T) => Promise<T>;
  update?: (data: T) => Promise<T>;
  remove?: (id: string) => void;
}

export interface FormState<T> {
  status: string;
  message: string;
  modal: string;
  section: string;
  data: T;
}

class FormHandler<T> extends React.Component<FormHandlerProps<T>, FormState<T>> {
  constructor(props: FormHandlerProps<T>) {
    super(props);
    this.state = {
      status: '',
      message: '',
      modal: '',
      section: '',
      data: this.props.getDefaultState()
    };
  }

  componentDidMount() {
    this.load();
  }

  setModal = (name: string) => {
    this.setState({ modal: name });
  };

  setSection = (name: string) => {
    this.setState({ section: name });
  };

  load = async () => {
    if (this.props.load) {
      if (!this.props.id) {
        return this.setState({
          status: 'loaded',
          data: this.props.getDefaultState(),
          message: ''
        });
      }
      try {
        this.setState({ status: 'loading', message: '' });
        const data = await this.props.load(this.props.id);
        this.setState({ status: 'loaded', data, message: '' });
      } catch (error) {
        if (error.code === 'permission-denied') {
          return this.setState({
            status: 'failure',
            message: 'Permisos insuficientes!'
          });
        }
        this.setState({
          status: 'failure',
          message: 'Un error inesperado ha ocurrido!'
        });
      }
    }
  };

  create = async () => {
    if (this.props.create) {
      try {
        this.setState({ status: 'creating', message: '' });
        const data = await this.props.create(this.state.data);
        this.props.onCreateSuccess?.(data);
        this.setState({
          status: 'created',
          data,
          message: 'Guardado exitoso!'
        });
      } catch (error) {
        console.log(error);
        if (error.code === 'permission-denied') {
          return this.setState({
            status: 'failure',
            message: 'Permisos insuficientes!'
          });
        }
        this.setState({
          status: 'failure',
          message: 'Un error inesperado ha ocurrido!'
        });
      }
    }
  };

  update = async () => {
    if (this.props.update && this.props.id) {
      try {
        this.setState({ status: 'updating', message: '' });
        const data = await this.props.update(this.state.data);
        this.props.onUpdateSuccess?.(data);
        this.setState({
          status: 'updated',
          data,
          message: 'Guardado exitoso!'
        });
      } catch (error) {
        if (error.code === 'permission-denied') {
          return this.setState({
            status: 'failure',
            message: 'Permisos insuficientes!'
          });
        }
        this.setState({
          status: 'failure',
          message: 'Un error inesperado ha ocurrido!'
        });
      }
    }
  };

  remove = async () => {
    if (this.props.remove && this.props.id) {
      try {
        this.setState({ status: 'deleting' });
        await this.props.remove(this.props.id);
        this.setState({ status: 'removed' });
        this.props.onRemoveSuccess?.(this.props.id);
      } catch (error) {
        if (error.code === 'permission-denied') {
          return this.setState({
            status: 'failure',
            message: 'Permisos insuficientes!'
          });
        }
        this.setState({
          status: 'failure',
          message: 'Un error inesperado ha ocurrido!'
        });
      }
    }
  };

  onChange: OnChangeHandler<T> = (value, key) => {
    this.setState((state) => ({
      data: {
        ...state.data,
        [key]: value
      }
    }));
  };

  render() {
    return this.props.children?.({
      state: this.state,
      onChange: this.onChange,
      setModal: this.setModal,
      setSection: this.setSection,
      reload: this.props.load ? this.load : undefined,
      remove: this.props.remove ? this.remove : undefined,
      create: this.props.create ? this.create : undefined,
      update: this.props.update ? this.update : undefined
    });
  }
}

export default FormHandler;
