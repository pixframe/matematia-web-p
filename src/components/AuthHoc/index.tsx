import React from 'react';
import { Redirect } from 'react-router-dom';
import { User } from '@firebase/auth-types';
import { auth } from '../../utils/firebase';

interface State {
  loaded: boolean;
  user: User | null;
}

const AuthHOC = (WrappedComponent: React.ElementType) =>
  class PrivateRoute extends React.Component<unknown, State> {
    unsubscribe: () => void;
    constructor(props: unknown) {
      super(props);
      this.state = { loaded: false, user: null };
      this.unsubscribe = auth.onAuthStateChanged((user) => {
        this.setState({ loaded: true, user });
      });
    }
    componentWillUnmount() {
      this.unsubscribe();
    }
    render() {
      const { loaded, user } = this.state;

      if (!loaded) {
        return null;
      }

      if (user) {
        return <WrappedComponent {...this.props} user={user} />;
      }

      return <Redirect to="/auth/login" />;
    }
  };

export default AuthHOC;
