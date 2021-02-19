import React from "react";
import {
  Switch,
  Route,
  RouteComponentProps,
  Redirect,
  withRouter,
} from "react-router-dom";
import qs from "query-string";
import Login from "./Login";
import Register from "./Register";
import Recover from "./Recover";
import styles from "./styles.module.css";
import Layout from "../Layout";
import logo from "../../assets/logos/logo.png";
import logoGoogle from "../../assets/logos/google.png";
import logoFacebook from "../../assets/logos/facebook.png";
import ResetPassword from "./ResetPassword";
import VerifyEmail from "./VerifyEmail";

interface ActionParams {
  oobCode: string;
  mode: string;
}

function getParamsFromURL(search: string): ActionParams {
  const parsed = qs.parse(search);
  return {
    oobCode: `${parsed.oobCode}` || "",
    mode: `${parsed.mode}` || "",
  };
}

const Auth: React.FC<RouteComponentProps> = ({ history }) => (
  <Layout>
    <div className={styles.container}>
      <Switch>
        <Route path="/auth/actions">
          {({ location }) => {
            const { oobCode, mode } = getParamsFromURL(location.search);

            if (oobCode && mode === "resetPassword") {
              return <ResetPassword code={oobCode} logo={logo} />;
            } else if (oobCode && mode === "verifyEmail") {
              return <VerifyEmail code={oobCode} logo={logo} />;
            }

            return <Redirect from="*" to="/" />;
          }}
        </Route>
        <Route path="/auth/login">
          <Login
            logo={logo}
            registerPath="/auth/register"
            recoverPath="/auth/recover"
            facebookLogin
            googleLogin
            googleIcon={logoGoogle}
            facebookIcon={logoFacebook}
            onLoginSuccess={() => history.push("/")}
          />
        </Route>
        <Route path="/auth/register">
          <Register
            logo={logo}
            loginPath="/auth/login"
            onRegisterSuccess={() => history.push("/perfil/personal")}
          />
        </Route>
        <Route path="/auth/recover">
          <Recover logo={logo} loginPath="/auth/login" />
        </Route>
        <Redirect from="*" to="/auth/login" />
      </Switch>
    </div>
  </Layout>
);

export default withRouter(Auth);
