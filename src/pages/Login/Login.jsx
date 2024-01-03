import React, { useState } from "react";
import "./login.css";
import college from "../../assets/jodyhongfilms-sI1mbxJFFpU-unsplash.jpg";
import LoginForm from "./LoginForm";
import ForgotPassword from "./ForgotPassword";
import EmailForm from "./EmailForm";

const Login = () => {
  const [state, setState] = useState(0);

  return (
    // <div className="login">
    //   <div className="login_sub_menu">
    //     <div className="login-sides">
    //       <img src={logo} className="login-image" />
    //     </div>
    //     <div className="login-sides">
    //       <div className="login-form">
    //         {/* <img src={ieodkv} width={100} height={100} /> */}
    //         <h2 className="title">Login</h2>
    //         {renderForm}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="main-from">
      <div className="pt-3 mx-5">
        <div className="container p-5">
          <div className="row g-0 ">
            <div className="col-lg-5">
              <img src={college} alt="" className="img-fluid img-2"></img>
            </div>
            <div className="col-lg-7 px-5 pt-5">
              {state === 0 ? (
                <LoginForm setState={setState} />
              ) : state === 1 ? (
                <EmailForm setState={setState} />
              ) : (
                <ForgotPassword setState={setState} />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="footer_cloud_lab text-start ps-5">
        Developed by{" "}
        <a href="https://www.cloudlabweb.com/" target="_blanck">
          Cloud Lab Private Ltd
        </a>
      </div>
    </div>
  );
};

export default Login;
