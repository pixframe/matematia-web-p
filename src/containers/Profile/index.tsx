import React from 'react';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';
import { FormHandler } from '@calderaro/react-toolbox';
import { getProfileDefaultState, profileShowOwn, profileUpdateOwn } from '../../services/profiles';
import Layout from '../../components/Layout';
import Button from '../../components/UI/Button';
import UserLink from '../../components/UserLink';
import avatar from '../../assets/images/avatars/avatar_8.svg';
import * as styles from './styles';
import AuthHOC from '../../components/AuthHoc';
import { createLinkFormDefaultState, linksCreate, linksListOwn } from '../../services/links';
import ProfileForm from '../../components/ProfileForm';
import ListHandler from '../../components/SimpleListHandler';
import UserLinks from '../../components/UserLinks';

class ProfilePage extends React.Component {
  render() {
    return (
      <FormHandler
        id="x"
        getDefaultState={getProfileDefaultState}
        load={profileShowOwn}
        create={profileUpdateOwn}
      >
        {(formData) => (
          <Layout>
            <div className={styles.profileLayout}>
              <div className={styles.columnDiv} style={{ width: '25em', flexShrink: 0 }}>
                <div className={styles.profileColumn}>
                  <img className={styles.avatarDiv} src={avatar} alt="avatar" />
                  <span className={styles.userName}>
                    {`${formData.state.data.firstName} ${formData.state.data.lastName}`}
                  </span>
                  <span>{formData.state.data.username}</span>
                </div>
                <NavLink
                  to="/perfil/edit"
                  activeClassName={styles.activeColumItem}
                  className={styles.columnItem}
                >
                  Mi perfil
                </NavLink>
                <NavLink
                  to="/perfil/privacy"
                  activeClassName={styles.activeColumItem}
                  className={styles.columnItem}
                >
                  Privacidad
                </NavLink>
                <NavLink
                  to="/perfil/notifications"
                  activeClassName={styles.activeColumItem}
                  className={styles.columnItem}
                >
                  Notificaciones
                </NavLink>
                <NavLink
                  to="/perfil/vinculation"
                  activeClassName={styles.activeColumItem}
                  className={styles.columnItem}
                >
                  Vincular con profesor
                </NavLink>
                <NavLink to="/reports" style={{ display: 'flex', width: '100%' }}>
                  <Button
                    label="Reporte del usuario"
                    backgroundColor="#FF7596"
                    shadowColor="#ad4b62"
                    minWidth="80%"
                  />
                </NavLink>
              </div>
              <div className={styles.columnDiv} style={{ width: '100%', maxWidth: '50em' }}>
                <Switch>
                  <Route exact path="/perfil/edit">
                    <ProfileForm {...formData} />
                  </Route>
                  <Route exact path="/perfil/privacy">
                    <div> En construcción privacidad</div>
                  </Route>
                  <Route exact path="/perfil/notifications">
                    <div> En construcción notificaciones</div>
                  </Route>
                  <Route exact path="/perfil/vinculation">
                    <ListHandler list={linksListOwn}>
                      {(listProps) => (
                        <>
                          <FormHandler
                            getDefaultState={createLinkFormDefaultState}
                            create={linksCreate}
                            onCreateSuccess={() => listProps.reload()}
                          >
                            {(props) => <UserLink {...props} />}
                          </FormHandler>
                          <UserLinks {...listProps} />{' '}
                        </>
                      )}
                    </ListHandler>
                  </Route>
                  <Route exact path="/perfil">
                    <Redirect to="/perfil/edit" />
                  </Route>
                </Switch>
              </div>
            </div>
          </Layout>
        )}
      </FormHandler>
    );
  }
}

export default AuthHOC(ProfilePage);
