import React, { Component } from 'react';
import { style } from 'typestyle';
import { CustomError } from '@calderaro/react-toolbox';
import { withTranslation, WithTranslationProps } from 'react-i18next';
import { profileUpdateOwn } from '../../services/profiles';
import { Profile } from '../../utils/types';
import background from '../../assets/images/background/PuntitosFondo.svg';
import InitializationBar from '../../components/Initialization/InitializationBar';
import KindOfAccount from '../../components/Initialization/KindOfAccount';
import TeacherProfileForm from '../../components/Initialization/TeacherProfileForm';
import { AuthContextComponentProps, WithAuth } from '../../utils/AuthContext';
import StudentProfileForm from '../../components/Initialization/StudentProfileForm';

interface InitializationState {
  phase: 'kindOfAccount' | 'profiles' | 'updating' | 'done';
  kindOfUser: 'student' | 'teacher' | '';
  error: CustomError | null;
  currentData: Partial<Omit<Profile, 'id'>> | null;
}

const mainDiv = style({
  backgroundImage: `url(${background})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left',
  height: '100vh',
  paddingTop: '3%'
});

class Initialization extends Component<
  AuthContextComponentProps & WithTranslationProps,
  InitializationState
> {
  state = {
    phase: 'kindOfAccount' as 'kindOfAccount' | 'profiles' | 'updating' | 'done',
    kindOfUser: '' as 'student' | 'teacher' | '',
    error: null,
    currentData: null
  };

  setKindOfUser: (kindOfUser: 'teacher' | 'student') => void = (
    kindOfUser: 'teacher' | 'student'
  ) => {
    this.setState({ kindOfUser, phase: 'profiles' });
  };

  updateProfile = async (data: Partial<Omit<Profile, 'id'>>) => {
    this.setState({
      phase: 'updating'
    });
    try {
      await profileUpdateOwn({ ...data, kindOfUser: this.state.kindOfUser });
      this.setState({ phase: 'done' });
      window.location.reload();
    } catch (error) {
      const c = error as CustomError;
      console.log(c.errors);
      this.setState({ phase: 'profiles', error: error as CustomError, currentData: data });
    }
  };

  clearUser = () => {
    this.setState({
      phase: 'kindOfAccount',
      kindOfUser: '',
      currentData: null,
      error: null
    });
  };

  title = () => {
    return this.props.i18n?.t(
      this.state.phase === 'kindOfAccount' ? 'new.kind' : 'new.creation'
    ) as string;
  };

  setCorrectForm = () => {
    if (this.state.kindOfUser === 'teacher') {
      return (
        <TeacherProfileForm
          updateProfile={this.updateProfile}
          errors={this.state.error}
          currentData={this.state.currentData}
        />
      );
    } else if (this.state.kindOfUser === 'student') {
      return (
        <StudentProfileForm
          updateProfile={this.updateProfile}
          errors={this.state.error}
          currentData={this.state.currentData}
        />
      );
    }
  };

  render() {
    return (
      <div className={mainDiv}>
        <InitializationBar
          title={this.title()}
          canGoBack={this.state.phase === 'profiles'}
          onGoBack={this.clearUser}
        />
        {this.state.phase === 'kindOfAccount' && (
          <KindOfAccount onSelectCard={this.setKindOfUser} />
        )}
        {this.state.phase === 'profiles' && this.setCorrectForm()}
      </div>
    );
  }
}

export default WithAuth(withTranslation()(Initialization));
