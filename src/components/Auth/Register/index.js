import React from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../../../utils/firebase';
import { signUpWithEmail } from '../../../services/auth';
import Text from '../../Input/InputText';
import style from './style.module.css';
import Checkbox from '../../Input/InputCheckbox';
import CustomError from '../../../utils/CustomError';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      process: null,
      status: null,
      message: null,
      email: '',
      password: '',
      repassword: '',
      firstName: '',
      terms: false
    };
  }

  onRegister = async (e) => {
    try {
      e.preventDefault();
      const { email, password, repassword, firstName, terms } = this.state;

      if (!firstName) {
        throw new CustomError('Introduce tu nombre');
      }

      if (!password || password !== repassword) {
        throw new CustomError('Las contraseñas nos coinciden');
      }
      if (!terms) {
        throw new CustomError('Debes aceptar los términos y condiciones');
      }

      this.setState({ process: 'register', status: null, message: null });
      await signUpWithEmail(email, password, firstName);
      this.setState({ process: null, status: 'success', message: null });
      this.props.onRegisterSuccess(auth.currentUser);
    } catch (error) {
      this.setState({
        process: null,
        status: 'failure',
        message: error.message
      });
    }
  };

  onChange = (value, id) => {
    this.setState({ [id]: value });
  };

  render = () => {
    const { process, message, status, email, password, repassword, firstName, terms } = this.state;
    const { t, loginPath, logo } = this.props;

    const success = (
      <div className={style.success}>
        <h2>{t('verifyYourEmail')}</h2>
        <p className={style.intructions}>{t('verifyEmailInstructions')}</p>
        <Link to="/" className={style.sendBtn}>
          {t('continue')}
        </Link>
      </div>
    );
    const form = (
      <form className={style.form} onSubmit={this.onRegister}>
        <div>
          <Text
            id="firstName"
            label={t('firstName')}
            onChange={this.onChange}
            value={firstName}
            inputClassname={style.input}
          />

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

          <Text
            id="repassword"
            label={t('repassword')}
            type="password"
            onChange={this.onChange}
            value={repassword}
            inputClassname={style.input}
            password
          />

          <div className={style.termsContainer}>
            <Checkbox
              value={terms}
              onChange={({ value }) => this.setState({ terms: value })}
              text={
                <p className={style.termsText}>
                  He leído y acepto el{' '}
                  <a target="_blank" href="/privacidad">
                    Aviso de Privacidad
                  </a>
                </p>
              }
            />
          </div>
        </div>

        <div className={style.buttonContainer}>
          <button className={style.sendBtn}>
            {process ? <FontAwesomeIcon icon={faSpinner} spin /> : t('register')}
          </button>
          <Link className={style.registerLink} to={{ pathname: loginPath }}>
            {t('haveAccount')} <strong>{t('login')}</strong>
          </Link>
        </div>

        <div className={style.errorContainer}>{message}</div>
      </form>
    );
    return (
      <div className={style.login}>
        {logo ? <img src={logo} alt="" className={style.logo} /> : null}
        {status === 'success' ? success : form}
      </div>
    );
  };
}

Register.defaultProps = {
  onSubmit: (i) => i,
  onChange: (i) => i,
  loginPath: '/login',
  error: {},
  data: {
    process: false,
    data: {}
  }
};

export default withTranslation()(Register);
