import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { verifyPasswordResetCode } from '../../../services/auth';
import InputText from '../../Input/InputText';
import { auth } from '../../../utils/firebase';
import style from './style.module.css';

interface Props extends WithTranslation {
  code: string;
  logo?: string;
}
interface State {
  status: 'loading' | 'failure' | 'success' | 'invalid-code' | null;
  message: string;
  email: string;
  password: string | number;
  repassword: string | number;
}

const unexpected = 'An unexpected error ocurred!';

class ResetPassword extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      status: 'loading',
      message: '',
      email: '',
      password: '',
      repassword: ''
    };
  }

  componentDidMount() {
    this.verify();
  }

  verify = async () => {
    try {
      const email = await verifyPasswordResetCode(this.props.code);
      this.setState({ status: null, email });
    } catch (err) {
      this.setState({ status: 'invalid-code' });
    }
  };

  changePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const { code } = this.props;
      const { email, password, repassword } = this.state;

      if (!auth) {
        throw new Error('unexpected');
      }

      if (password !== repassword) {
        throw new Error('auth/invalid-repassword');
      }

      await auth.confirmPasswordReset(code, `${password}`);
      await auth.signInWithEmailAndPassword(email, `${password}`);
      this.setState({ message: '', status: 'success' });
    } catch (error) {
      console.log(error);
      this.setState({
        status: 'failure',
        message: error.message || unexpected
      });
    }
  };

  render() {
    const { status, message, password, repassword } = this.state;
    const { t, logo } = this.props;

    if (status === 'loading') {
      return (
        <div className={style.login}>
          {logo ? <img src={logo} alt="" className={style.logo} /> : null}
          <div className={style.wrapper}>
            <FontAwesomeIcon icon={faSpinner} spin className={style.spinner} />
          </div>
        </div>
      );
    }

    if (status === 'invalid-code') {
      return (
        <div className={style.login}>
          {logo ? <img src={logo} alt="" className={style.logo} /> : null}
          <div className={style.wrapper}>
            <p>{t('resetPasswordInvalidCode')}</p>
            <div className={style.buttonContainer}>
              <Link to="/" className={style.sendBtn}>
                {t('continue')}
              </Link>
            </div>
          </div>
        </div>
      );
    }

    if (status === 'success') {
      return (
        <div className={style.login}>
          {logo ? <img src={logo} alt="" className={style.logo} /> : null}
          <div className={style.wrapper}>
            <p>{t('resetPasswordSuccess')}</p>
            <div className={style.buttonContainer}>
              <Link to="/" className={style.sendBtn}>
                {t('continue')}
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={style.login}>
        {logo ? <img src={logo} alt="" className={style.logo} /> : null}
        <form className={style.wrapper} onSubmit={this.changePassword}>
          <p>{t('enterNewPassword')}</p>
          <InputText
            id="password"
            label={t('newPassword')}
            value={password}
            onChange={(value, key) => this.setState({ password: value })}
            password
          />
          <InputText
            id="repassword"
            label={t('reNewPassword')}
            value={repassword}
            onChange={(value, key) => this.setState({ repassword: value })}
            password
          />

          <div className={style.buttonContainer}>
            <button type="submit" className={style.sendBtn}>
              {t('continue')}
            </button>
          </div>
          <div className={style.errorContainer}>{message}</div>
        </form>
      </div>
    );
  }
}

export default withTranslation()(ResetPassword);
