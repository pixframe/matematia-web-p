import React from 'react';

export interface ListHandlerChildrenProps<T> {
  state: ListState<T>;
  reload: () => Promise<void>;
}

type ListParams = { [key: string]: any };
export interface ListHandlerProps<T> {
  params?: ListParams;
  list: (params?: ListParams) => Promise<T[]>;
  children(res: ListHandlerChildrenProps<T>): React.ReactNode;
}

export interface ListState<T> {
  status: 'loading' | 'loaded' | 'searching' | 'searched' | 'failure';
  searchText: string;
  page: number;
  data: T[];
}

class ListHandler<T> extends React.Component<ListHandlerProps<T>, ListState<T>> {
  constructor(props: ListHandlerProps<T>) {
    super(props);
    this.state = {
      status: 'loading',
      searchText: '',
      page: 1,
      data: []
    };
  }

  componentDidMount() {
    this.list();
  }

  list = async () => {
    this.setState({ status: 'loading' });
    const data = await this.props.list(this.props.params);
    this.setState({ status: 'loaded', data });
  };

  render() {
    return this.props.children?.({
      state: this.state,
      reload: this.list
    });
  }
}

export default ListHandler;
