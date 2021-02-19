import React from "react";
import { RouteComponentProps } from "react-router-dom";
import qs from "query-string";
import ResetPassword from "../ResetPassword";
import VerifyEmail from "../VerifyEmail";

interface Params {
  oobCode: string;
  mode: string;
}

interface Props extends RouteComponentProps {
  logo?: string;
}

function getParamsFromURL(search: string): Params {
  const parsed = qs.parse(search);
  return {
    oobCode: `${parsed.oobCode}` || "",
    mode: `${parsed.mode}` || "",
  };
}

export default class AuthActions extends React.Component<Props> {
  render() {
    const { oobCode, mode } = getParamsFromURL(this.props.location.search);
    const { logo } = this.props;

    return (
      <>
        {oobCode && mode === "resetPassword" ? (
          <ResetPassword code={oobCode} logo={logo} />
        ) : null}
        {oobCode && mode === "verifyEmail" ? (
          <VerifyEmail code={oobCode} logo={logo} />
        ) : null}
      </>
    );
  }
}
