import React from "react";

export interface ListHandlerProps<T> {
  list: () => Promise<T[]>;
  children(res: { state: ListState<T>; reload: () => Promise<void> }): React.ReactNode;
}

export interface ListState<T> {
  status: "loading" | "loaded" | "failure";
  data: T[];
}

class ListHandler<T> extends React.Component<ListHandlerProps<T>, ListState<T>> {
  constructor(props: ListHandlerProps<T>) {
    super(props);
    this.state = {
      status: "loading",
      data: []
    };
  }

  componentDidMount() {
    this.list();
  }

  list = async () => {
    this.setState({ status: "loading" });
    const data = await this.props.list();
    this.setState({ status: "loaded", data });
  };

  render() {
    return this.props.children?.({ state: this.state, reload: this.list });
  }
}

export default ListHandler;
