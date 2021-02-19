import React from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../../../utils/firebase';
import Text from '../../Input/InputText';
import style from './style.module.css';

class Recover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      process: null,
      status: null,
      message: null,
      email: ''
    };
  }

  onRecover = async (e) => {
    try {
      e.preventDefault();
      const { email } = this.state;
      await auth.sendPasswordResetEmail(email);
      this.setState({ process: null, status: 'success', message: null });
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
    const { process, message, status, email } = this.state;
    const { t, loginPath, logo } = this.props;

    const success = (
      <div className={style.success}>
        <p className={style.intructions}>{t('recoverSuccess')}</p>
        <Link to={loginPath} className={style.sendBtn}>
          {t('continue')}
        </Link>
      </div>
    );

    const form = (
      <form className={style.form} onSubmit={this.onRecover}>
        <p className={style.intructions}>{t('recoverInstructions')}</p>
        <div>
          <Text
            id="email"
            label={t('email')}
            onChange={this.onChange}
            value={email}
            inputClassname={style.input}
          />
        </div>

        <div className={style.buttonContainer}>
          <button className={style.sendBtn}>
            {process ? <FontAwesomeIcon icon={faSpinner} spin /> : t('continue')}
          </button>
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

Recover.defaultProps = {
  onSubmit: (i) => i,
  onChange: (i) => i,
  loginPath: '/login',
  error: {},
  data: {
    process: false,
    data: {}
  }
};

export default withTranslation()(Recover);
