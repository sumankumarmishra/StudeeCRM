import React, { useEffect, useState } from "react";
import Adminroutes from "./routes/adminroutes";
import Login from "./pages/Login/Login";
import "./style/main_colors.css";
import IdleJs from "idle-js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function App() {
  const user = localStorage.getItem("loggedIn");
  const token = localStorage.getItem("ieodkvToken");
  const roleId = localStorage.getItem("roleId");
  const id = localStorage.getItem("id");
  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // useEffect(() => {
  //   if (token) {
  //     axios
  //       .post(
  //         "https://crm.internationaleducationoffice.co.uk/checkConnection",
  //         {},
  //         config
  //       )
  //       .then((response) => {})
  //       .catch((error) => {
  //         alert("Session timedout");
  //         localStorage.removeItem("ieodkvToken");
  //         localStorage.removeItem("loggedIn");
  //         localStorage.removeItem("role");
  //         localStorage.removeItem("roleId");
  //         localStorage.removeItem("id");
  //         navigate("/");
  //       });
  //   }
  //   // window.addEventListener("beforeunload", () => {
  //   //   localStorage.removeItem("ieodkvToken");
  //   //   localStorage.removeItem("loggedIn");
  //   //   localStorage.removeItem("role");
  //   //   localStorage.removeItem("roleId");
  //   //   localStorage.removeItem("id");
  //   //   navigate("/");
  //   // });
  // }, [token]);

  useEffect(() => {
    // window.addEventListener("beforeunload", () => {
    //   localStorage.removeItem("ieodkvToken");
    //   localStorage.removeItem("loggedIn");
    //   localStorage.removeItem("role");
    //   localStorage.removeItem("roleId");
    //   localStorage.removeItem("id");
    //   navigate("/");
    // });useEffect(() => {
    // window.addEventListener("beforeunload", () => {
    //   localStorage.removeItem("ieodkvToken");
    //   localStorage.removeItem("loggedIn");
    //   localStorage.removeItem("role");
    //   localStorage.removeItem("roleId");
    //   localStorage.removeItem("id");
    //   navigate("/");
    // });

    if (user) {
      const idle = new IdleJs({
        idle: 900000, // Set idle time to 5 minutes (300,000 milliseconds)
        onIdle: () => {
          alert("Session timedout");
          localStorage.removeItem("ieodkvToken");
          localStorage.removeItem("role");
          localStorage.removeItem(`role_Data${roleId}`);

          localStorage.removeItem("ieodkvUsername");
          localStorage.removeItem(`userData${id}`);
          localStorage.removeItem(`fields`);
          localStorage.removeItem(`filteredKeys${id}`);
          localStorage.removeItem("roleId");
          localStorage.removeItem(`gridKeys${id}`);
          localStorage.removeItem("id");
          localStorage.removeItem("loggedIn");
          navigate("/");

          // This function is called when the user becomes idle
          // Implement your session timeout logic here, e.g., logging out the user.
        },
      });

      // Start the idle timer
      idle.start();

      // Don't forget to stop the timer when your component unmounts
      return () => {
        idle.stop();
      };
    }
  }, []);

  return (
    <div>
      {/* style={{ marginBottom: "100px" }} */}
      <div>{user !== null ? <Adminroutes /> : <Login />}</div>
      {/* <div className="footer_cloud_lab text-start ps-5">
        Developed by{" "}
        <a href="https://www.cloudlabweb.com/" target="_blanck">
          Cloud Lab Private Ltd
        </a>
      </div> */}
    </div>
  );
}

export default App;
