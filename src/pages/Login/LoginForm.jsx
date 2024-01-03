import axios from "axios";
import React, { useState } from "react";
import logo from "../../assets/logo.jfif";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginForm = ({ setState }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://crm.internationaleducationoffice.co.uk/members/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(response.data);
      localStorage.setItem("ieodkvToken", response.data.token);
      localStorage.setItem(
        `role_Data${response.data.user.role._id}`,
        JSON.stringify(response.data.user.role)
      );
      // document.cookie =
      //   "ieodkvToken=" + response.data.token + "; path=/; HttpOnly; Secure";
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("role", response.data.user.role.name);
      localStorage.setItem("ieodkvUsername", response.data.user.username);
      localStorage.setItem("roleId", response.data.user.role._id);
      localStorage.setItem("id", response.data.user._id);
      if (response.data.user?.role?.name === "superadmin") {
        navigate("/dashboard");
      } else {
        navigate("/my-cases");
      }
      window.location.reload();
    } catch (error) {
      if (error.response.data) {
        setErrorMessage(error.response.data);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // const handleForgot = async (event) => {
  //   event.preventDefault();

  //   axios
  //     .post("https://crm.internationaleducationoffice.co.uk/members/resend", {
  //       email: email,
  //     })
  //     .then((response) => {
  //       setState(1);
  //     })
  //     .catch((error) => {
  //       setErrorMessage(error.response.data);
  //     });
  // };

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
            <p
              onClick={togglePasswordVisibility}
              style={{
                cursor: "pointer",
                textAlign: "right",
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </p>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              className="login_input form-control my-3 p-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <div style={{ color: "red", fontSize: 15 }}>{errorMessage}</div>

        <div className="input-container">
          <div className="col-lg-7">
            <button type="submit" className="mt-3 mb-3">
              Login
            </button>
          </div>
        </div>

        <a
          style={{ textDecoration: "none", cursor: "pointer", color: "blue" }}
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

export default LoginForm;
