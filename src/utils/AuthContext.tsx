import React from 'react';
import firebase, { auth } from './firebase';
import { Profile } from '../utils/types';
import { profileShowOwn } from '../services/profiles';

export interface AuthContextState {
  status: 'loading' | 'loaded' | 'failure';
  user: firebase.User | null;
  userData: Profile | null;
}

export interface AuthContextComponentProps {
  authContext: AuthContextState;
}

export const AuthContext = React.createContext<AuthContextState>({
  status: 'loading',
  user: null,
  userData: null
});

export class AuthProvider extends React.Component<unknown, AuthContextState> {
  unsub: (() => void) | undefined = () => null;

  constructor(props: unknown) {
    super(props);
    this.state = {
      status: 'loading',
      user: null,
      userData: null
    };
  }

  componentDidMount() {
    this.unsub?.();
    this.unsub = auth.onAuthStateChanged(this.load);
  }

  load = async (user: firebase.User | null) => {
    if (user) {
      const userData = await profileShowOwn();
      this.setState({ status: 'loaded', user, userData });
    } else {
      this.setState({ status: 'loaded', user });
    }
  };

  componentWillUnmount = () => {
    this.unsub?.();
  };

  render() {
    return <AuthContext.Provider value={this.state}>{this.props.children}</AuthContext.Provider>;
  }
}

export function WithAuth(Wrapped: React.ComponentType<any>) {
  return function AuthContextWrapper(props: any) {
    return (
      <AuthContext.Consumer>
        {(value) => <Wrapped authContext={value} {...props} />}
      </AuthContext.Consumer>
    );
  };
}
