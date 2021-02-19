import React from 'react';
import { Redirect } from 'react-router-dom';
import { style } from 'typestyle';
import { AuthContextComponentProps, WithAuth } from '../../utils/AuthContext';
import { withTranslation, WithTranslationProps } from 'react-i18next';
import { updateHistory } from '../../services/profiles';
import Button from '../../components/UI/Button';
import Lines from '../../assets/images/background/lines.svg';
import back_0 from '../../assets/images/history/back_0.svg';
import back_1 from '../../assets/images/history/back_1.svg';
import back_2 from '../../assets/images/history/back_2.svg';
import ayax_0 from '../../assets/images/history/ayax_0.svg';
import ayax_1 from '../../assets/images/history/ayax_1.svg';
import ayax_2 from '../../assets/images/history/ayax_2.svg';
import { platformColors } from '../../constants/colors';
import styles from './styles.module.css';

interface HistoryState {
  stage: number;
  redirect: boolean;
}

const backImage = style({
  display: 'flex',
  flexFlow: 'column',
  backgroundImage: `url(${Lines})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundColor: '#8BD9D9',
  alignItems: 'center',
  minHeight: '100vh'
});

const divMessage = style({
  backgroundColor: 'white',
  display: 'flex',
  flexFlow: 'row',
  margin: '1em 0',
  padding: '0 1em',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '80%',
  borderRadius: '1em'
});

const divImage = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  padding: '20vh 0 2vh 0',
  width: '100%',
  backgroundSize: '100%',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center'
});

const imgStyle = style({
  height: '60vh'
});

const textStyle = style({
  fontSize: '1.6em'
});

const loadingText = style({
  fontSize: '3em',
  color: platformColors.titleColor
});

class History extends React.Component<
  WithTranslationProps & AuthContextComponentProps,
  HistoryState
> {
  state = {
    stage: 0,
    redirect: false
  };

  changeStage() {
    console.log(this);
    const nextStage = this.state.stage + 1;
    console.log(nextStage);
    if (nextStage >= 4) {
      this.setState({
        redirect: true
      });
      updateHistory();
      return;
    }
    this.setState({
      stage: nextStage
    });
  }

  corerctAyax() {
    switch (this.state.stage) {
      case 1:
        return ayax_1;
      case 3:
        return ayax_2;
      default:
        return ayax_0;
    }
  }

  correctText() {
    switch (this.state.stage) {
      case 0:
        return (
          (this.props.i18n?.t('history.hello_0') as string) +
          this.props.authContext.userData?.firstName +
          this.props.i18n?.t('history.hello_1')
        );
      case 3:
        return this.props.i18n?.t('history.hello_3');
      default:
        return this.props.i18n?.t('history.hello_2');
    }
  }

  correctImage() {
    switch (this.state.stage) {
      case 2:
        return back_1;
      case 3:
        return back_2;
      default:
        return back_0;
    }
  }

  render() {
    if (this.props.authContext.status === 'loading' || this.state.redirect) {
      return (
        <div className={backImage} style={{ justifyContent: 'center' }}>
          <div className={styles.ldshourglass}></div>
          <p className={loadingText}>{this.props.i18n?.t('common.loading')}</p>
        </div>
      );
    }
    return (
      <div className={backImage}>
        {(this.state.redirect || this.props.authContext.userData?.isHistoryWatch) && (
          <Redirect to="/" push />
        )}
        <div className={divImage} style={{ backgroundImage: `url(${this.correctImage()})` }}>
          <img src={this.corerctAyax()} className={imgStyle} alt="ayax" />
        </div>
        <div className={divMessage}>
          <p className={textStyle}>{this.correctText()}</p>
          <Button
            label={this.props.i18n ? this.props.i18n?.t('common.next') : ''}
            fontSize="1.2em"
            onClick={() => this.changeStage()}
          />
        </div>
      </div>
    );
  }
}

export default WithAuth(withTranslation()(History));
