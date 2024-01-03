import axios from "axios";
import React, { useState } from "react";
import logo from "../../assets/logo.jfif";
import { useNavigate } from "react-router-dom";

const ForgotPassword = ({ setState }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [opt, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    axios
      .post("https://crm.internationaleducationoffice.co.uk/members/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        setIsSubmitted(true);
        localStorage.setItem("ieodkvToken", response.data.token);
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("role", response.data.user.role.name);
        localStorage.setItem("roleId", response.data.user.role._id);
        localStorage.setItem("id", response.data.user._id);
        if (response.data.user?.role?.name === "superadmin") {
          navigate("/dashboard");
        } else {
          navigate("/my-cases");
        }
        window.location.reload();
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
        setIsSubmitted(false);
      });
  };

  const handleForgot = async (event) => {
    event.preventDefault();

    var { uemail, pass } = document.forms[0];

    axios
      .post("https://crm.internationaleducationoffice.co.uk/members/login", {
        email: uemail.value,
        password: pass.value,
      })
      .then((response) => {
        console.log(response.data);
        setIsSubmitted(true);
        localStorage.setItem("ieodkvToken", response.data.token);
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("role", response.data.user.role.name);
        localStorage.setItem("roleId", response.data.user.role._id);
        localStorage.setItem("id", response.data.user._id);
        if (response.data.user?.role?.name === "superadmin") {
          navigate("/dashboard");
        } else {
          navigate("/my-cases");
        }
        window.location.reload();
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
        setIsSubmitted(false);
      });
  };

  // JSX code for login form
  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="logo" className="img-1 my-3"></img>

        <h4>Sign into your account</h4>

        <div className="input-container">
          <div className="col-lg-7">
            {/* <label>Email </label> */}
            <input
              type="email"
              placeholder="Enter Your Email"
              className="login_input form-control my-3 p-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="input-container">
          <div className="col-lg-7">
            {/* <label>Password </label> */}
            <input
              type="password"
              placeholder="********"
              className="login_input form-control my-3 p-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        {isSubmitted ? (
          ""
        ) : (
          <div style={{ color: "red", fontSize: 15 }}>{errorMessage}</div>
        )}

        <div className="input-container">
          <div className="col-lg-7">
            <button type="submit" className="mt-3 mb-3">
              Login
            </button>
          </div>
        </div>

        <a
          style={{ textDecoration: "none" }}
          href="/"
          onClick={(e) => {
            e.preventDefault();
            setState(1);
          }}
        >
          Forgot password
        </a>
      </form>
    </div>
  );
};

export default ForgotPassword;
