import axios from "axios";
import React, { useState } from "react";
import logo from "../../assets/logo.jfif";
import { useNavigate } from "react-router-dom";
import './login.css'

const EmailForm = ({ setState }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [send, setSent] = useState(false);
  const [verified, setVerfied] = useState(false);
  const [otp, setOtp] = useState(null);
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleForgot = async (event) => {
    event.preventDefault();

    axios
      .patch("https://crm.internationaleducationoffice.co.uk/members/resend", {
        email: email,
      })
      .then((response) => {
        setState(1);
        setSent(true);
        setVerfied(false);
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
        setSent(false);
        setVerfied(false);
      });
  };
  const handleVerify = async (event) => {
    event.preventDefault();

    axios
      .post("https://crm.internationaleducationoffice.co.uk/members/verify", {
        email: email,
        otp: otp,
      })
      .then((response) => {
        setToken(response.data.token);
        setId(response.data.user._id);
        setState(1);
        setSent(true);
        setVerfied(true);
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
        setSent(true);
        setVerfied(false);
      });
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .put(
        `https://crm.internationaleducationoffice.co.uk/members/${id}`,
        {
          password: password,
        },
        config
      )
      .then((response) => {
        console.log(response.data);
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
        console.log(error);
        if (error.response.data) {
          alert(error.response.data);
        }
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!send && !verified) {
      handleForgot(event);
    } else if (send && !verified) {
      handleVerify(event);
    } else {
      handleUpdate(event);
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="logo" className="img-1 my-3"></img>

        <h4>Send email</h4>

        <div className="input-container">
          <div className="col-lg-7">
            {/* <label>Email </label> */}
            <input
              type="email"
              placeholder="Enter Your Email"
              className="login_input form-control my-3 p-3"
              value={email}
              disabled={send ? true : false}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        {send ? (
          <div className="input-container">
            <div className="col-lg-7">
              <input
                type="number"
                placeholder="Enter Your Otp"
                className="login_input form-control my-3 p-3"
                value={otp}
                disabled={verified ? true : false}
                onChange={(e) => setOtp(e.target.value)}
                required={send ? true : false}
              />
            </div>
          </div>
        ) : (
          ""
        )}
        {send && verified ? (
          <div className="input-container">
            <div className="col-lg-7">
              <input
                type="text"
                placeholder="Enter new password"
                className="login_input form-control my-3 p-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        ) : (
          ""
        )}

        <div style={{ color: "red", fontSize: 15 }}>{errorMessage}</div>

        <div className="input-container">
          <div className="col-lg-7">
            <button type="submit" className="mt-3 mb-3">
              {!send && !verified
                ? "Send"
                : send && !verified
                  ? "Verify"
                  : "Update"}
            </button>

          </div>
        </div>
      </form>
      <button className="back-btn" onClick={() => setState(0)}>
        Back
      </button>
    </div>
  );
};

export default EmailForm;
