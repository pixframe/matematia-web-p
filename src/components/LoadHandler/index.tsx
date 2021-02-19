import React from "react";

export interface LoadHandlerProps<T> {
  id: string;
  load: (id: string) => Promise<T>;
  getDefaultState: () => T;
  children(res: {
    state: ListState<T>;
    reload: () => Promise<void>;
  }): React.ReactNode;
}

export interface ListState<T> {
  status: "loading" | "loaded" | "failure";
  data: T;
}

class LoadHandler<T> extends React.Component<
  LoadHandlerProps<T>,
  ListState<T>
> {
  constructor(props: LoadHandlerProps<T>) {
    super(props);
    this.state = {
      status: "loading",
      data: this.props.getDefaultState(),
    };
  }

  componentDidMount() {
    this.load();
  }

  load = async () => {
    this.setState({ status: "loading" });
    const data = await this.props.load(this.props.id);
    this.setState({ status: "loaded", data });
  };

  render() {
    return this.props.children?.({ state: this.state, reload: this.load });
  }
}

export default LoadHandler;
