import React from 'react';
import { style } from 'typestyle';
import { withTranslation, WithTranslationProps } from 'react-i18next';
import { CustomError, GridContainer } from '@calderaro/react-toolbox';
import { entities } from '../../../constants/entities';
import { platformColors } from '../../../constants/colors';
import InputText from '../../Input/InputText';
import InputDate from '../../Input/InputDate';
import InputSelect from '../../Input/InputSelect';
import SexInput from '../SexInput';
import Button from '../../UI/Button';
import { Profile } from '../../../utils/types';

interface TeacherFormProps {
  updateProfile: (data: Partial<Omit<Profile, 'id'>>) => Promise<void>;
  errors: CustomError | null;
  currentData: Partial<Omit<Profile, 'id'>> | null;
}

interface TeacherFormState {
  firstName: string;
  lastName: string;
  username: string;
  sex: string;
  birthDate: Date | undefined;
  entity: string;
  institution: string;
}

const formDiv = style({
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center'
});

const buttonDiv = style({
  display: 'flex',
  justifyContent: 'flex-end'
});

class TeacherProfileForm extends React.Component<
  WithTranslationProps & TeacherFormProps,
  TeacherFormState
> {
  state = {
    firstName: this.props.currentData?.firstName ? this.props.currentData?.firstName : '',
    lastName: this.props.currentData?.lastName ? this.props.currentData?.lastName : '',
    username: this.props.currentData?.username ? this.props.currentData?.username : '',
    sex: this.props.currentData?.sex ? this.props.currentData?.sex : '',
    birthDate: this.props.currentData?.birthDate ? this.props.currentData?.birthDate : undefined,
    entity: this.props.currentData?.entity ? this.props.currentData?.entity : '',
    institution: this.props.currentData?.institution ? this.props.currentData?.institution : ''
  };

  t = (key: string) => {
    return this.props.i18n?.t(key) as string;
  };

  changeNameValue = (firstName: string) => {
    this.setState({
      firstName
    });
  };

  changeLastNameValue = (lastName: string) => {
    this.setState({
      lastName
    });
  };

  changeEntityValue = (entity: string) => {
    this.setState({
      entity
    });
  };

  changeDate = (birthDate: Date | undefined) => {
    this.setState({
      birthDate
    });
  };

  changeSchool = (institution: string) => {
    this.setState({
      institution
    });
  };

  changeUserName = (username: string) => {
    this.setState({
      username
    });
  };

  changeSex = (sex: string) => {
    this.setState({
      sex
    });
  };

  checkError = (key: string) => {
    return this.props.errors?.errors[key] ? this.props.errors?.errors[key][0] : undefined;
  };

  render() {
    return (
      <div className={formDiv}>
        <GridContainer
          columns="1fr 1fr"
          justifyContent="space-around"
          padding="0 3em 3em 3em"
          gap="0.5em"
        >
          <InputText
            id=""
            onChange={this.changeNameValue}
            value={this.state.firstName}
            label={this.t('new.name')}
            error={this.checkError('firstName')}
          />
          <InputText
            id=""
            value={this.state.lastName}
            onChange={this.changeLastNameValue}
            label={this.t('new.lastName')}
            error={this.checkError('lastName')}
          />
          <InputText
            id=""
            value={this.state.institution}
            onChange={this.changeSchool}
            label={this.t('new.school')}
            error={this.checkError('institution')}
          />
          <InputText
            id=""
            value={this.state.username}
            onChange={this.changeUserName}
            label={this.t('new.userName')}
            error={this.checkError('username')}
          />
          <InputSelect
            id=""
            placeholder="Selecciona tu entidad"
            value={this.state.entity}
            onChange={this.changeEntityValue}
            label={this.t('new.state')}
            options={entities}
            error={this.checkError('entity')}
          />
          <SexInput
            value={this.state.sex}
            onChangeSex={this.changeSex}
            error={this.checkError('sex')}
          />
          <InputDate
            id=""
            value={this.state.birthDate}
            onChange={this.changeDate}
            label={this.t('new.birth')}
            error={this.checkError('birthDate')}
          />
          <p>{this.t('new.obligation')}</p>
          <div className={buttonDiv}>
            <Button
              label={this.t('new.register')}
              width="30%"
              backgroundColor={platformColors.main}
              shadowColor={platformColors.shadowMain}
              onClick={() => {
                this.props.updateProfile(this.state);
              }}
            />
          </div>
        </GridContainer>
      </div>
    );
  }
}

export default withTranslation()(TeacherProfileForm);
