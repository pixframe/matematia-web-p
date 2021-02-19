import React from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../../../utils/firebase';
import { googleSignIn, facebookSignIn, signInWithEmail } from '../../../services/auth';
import Text from '../../Input/InputText';
import style from './style.module.css';

const unexpected = 'An unexpected error ocurred!';

const SocialLoginButton = ({ onClick, label, icon }) => (
  <div className={style.openidButton} onClick={onClick}>
    {icon ? <img src={icon} alt="" /> : null}
    {label ? <div>{label}</div> : null}
  </div>
);

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      process: null,
      error: null,
      email: '',
      password: ''
    };
  }

  onLogin = async (e) => {
    try {
      e.preventDefault();
      const { email, password } = this.state;
      this.setState({ process: 'login', status: null, message: null });
      await signInWithEmail(email, password);
      this.props.onLoginSuccess(auth.currentUser);
    } catch (error) {
      this.setState({
        process: null,
        status: 'failure',
        message: error.message || unexpected
      });
    }
  };

  facebookLogin = async () => {
    try {
      this.setState({ process: 'login', status: null, message: null });
      await facebookSignIn();
      this.props.onLoginSuccess(auth.currentUser);
    } catch (error) {
      this.setState({
        process: null,
        status: 'failure',
        message: error.message || unexpected
      });
    }
  };

  googleLogin = async () => {
    try {
      this.setState({ process: 'login', status: null, message: null });
      await googleSignIn();
      this.props.onLoginSuccess(auth.currentUser);
    } catch (error) {
      this.setState({
        process: null,
        status: 'failure',
        message: error.message || unexpected
      });
    }
  };

  onChange = (value, id) => {
    this.setState({ [id]: value });
  };

  render() {
    const { process, email, password, message } = this.state;
    const {
      t,
      registerPath,
      recoverPath,
      logo,
      googleIcon,
      facebookIcon,
      googleLogin,
      facebookLogin
    } = this.props;

    return (
      <div className={style.login}>
        {logo ? <img src={logo} alt="" className={style.logo} /> : null}
        {googleLogin ? (
          <SocialLoginButton
            label={t('googleSignIn')}
            icon={googleIcon}
            onClick={this.googleLogin}
          />
        ) : null}
        {facebookLogin ? (
          <SocialLoginButton
            label={t('facebookSignIn')}
            icon={facebookIcon}
            onClick={this.facebookLogin}
          />
        ) : null}
        {googleLogin || facebookLogin ? (
          <div className={style.separator}>
            <div />
            <div>{t('or')}</div>
            <div />
          </div>
        ) : null}

        <form className={style.form} onSubmit={this.onLogin}>
          <div>
            <Text
              id="email"
              label={t('email')}
              onChange={this.onChange}
              value={email}
              inputClassname={style.input}
            />
            <Text
              id="password"
              label={t('password')}
              onChange={this.onChange}
              value={password}
              inputClassname={style.input}
              password
            />
          </div>
          <div className={style.recoverLinkContainer}>
            {recoverPath ? (
              <Link className={style.recoverLink} to={recoverPath}>
                {t('forgotPassword')}
              </Link>
            ) : null}
          </div>
          <div className={style.buttonContainer}>
            <button className={style.sendBtn}>
              {process ? <FontAwesomeIcon icon={faSpinner} spin /> : t('login')}
            </button>
            {registerPath ? (
              <Link className={style.registerLink} to={registerPath}>
                {t('dontHaveAccount')} <strong>{t('register')}</strong>
              </Link>
            ) : null}
          </div>

          <div className={style.errorContainer}>{message}</div>
        </form>
      </div>
    );
  }
}

export default withTranslation()(Login);
