import React from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { handleVerifyEmail } from "../../../services/auth";
import style from "./style.module.css";

interface Props extends WithTranslation {
  code: string;
  logo?: string;
}
interface State {
  status: "loading" | "failure" | "success";
}

class VerifyEmail extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      status: "loading",
    };
  }

  componentDidMount() {
    this.verify();
  }

  verify = async () => {
    try {
      await handleVerifyEmail(this.props.code);
      this.setState({ status: "success" });
    } catch (err) {
      this.setState({ status: "failure" });
    }
  };

  render() {
    const { status } = this.state;
    const { t, logo } = this.props;

    if (status === "loading") {
      return (
        <div className={style.login}>
          {logo ? <img src={logo} alt="" className={style.logo} /> : null}
          <div className={style.wrapper}>
            <FontAwesomeIcon icon={faSpinner} spin className={style.spinner} />
          </div>
        </div>
      );
    }

    if (status === "failure") {
      return (
        <div className={style.login}>
          {logo ? <img src={logo} alt="" className={style.logo} /> : null}
          <div className={style.wrapper}>
            <p>{t("invalidVerificationCode")}</p>
          </div>
        </div>
      );
    }

    return (
      <div className={style.login}>
        {logo ? <img src={logo} alt="" className={style.logo} /> : null}
        <div className={style.wrapper}>
          <p>{t("successEmailVerification")}</p>
          <a href="/perfil/personal" className={style.sendBtn}>
            {t("continue")}
          </a>
        </div>
      </div>
    );
  }
}

export default withTranslation()(VerifyEmail);
