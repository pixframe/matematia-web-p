import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { auth } from '../../utils/firebase';
import Header from '../Header';
import styles from './styles.module.css';
import { WithAuth } from '../../utils/AuthContext';
import { AuthContextComponentProps } from '../../utils/AuthContext';

interface Props extends RouteComponentProps, AuthContextComponentProps {}
interface State {
  usermenuOpen: boolean;
}

class Layout extends React.Component<Props, State> {
  static defaultProps = {
    footer: true
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      usermenuOpen: false
    };
  }
  signOut = async () => {
    await auth.signOut();
    this.props.history.push('/auth/login');
  };
  closeMenu = () => {
    this.setState({ usermenuOpen: false });
  };
  toggleMenu = () => {
    this.setState({
      usermenuOpen: !this.state.usermenuOpen
    });
  };
  render() {
    const { usermenuOpen } = this.state;
    const { children, authContext } = this.props;
    return (
      <div className={styles.containerLayout} onClick={this.closeMenu}>
        <Header
          user={authContext.user}
          onLogout={this.signOut}
          usermenuOpen={usermenuOpen}
          onUserButtonClick={this.toggleMenu}
        />
        <div className={styles.content}>{children}</div>
      </div>
    );
  }
}

export default withRouter(WithAuth(Layout));
