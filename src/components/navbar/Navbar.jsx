import { useEffect, useState } from "react";
import "./navbar.scss";
import "./Navbar.css";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import LogoutIcon from "@mui/icons-material/Logout";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("ieodkvUsername");
  const roleId = localStorage.getItem("roleId");

  const [count, setCount] = useState(0);
  const id = localStorage.getItem("id");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("ieodkvToken");
  const [currentTime, setCurrentTime] = useState(new Date()); // Add this state variable
  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios
      .get(
        `https://crm.internationaleducationoffice.co.uk/notify/count`,
        config
      )
      .then((response) => {
        setCount(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [count]);
  useEffect(() => {
    axios
      .get(
        "https://crm.internationaleducationoffice.co.uk/applications/filtered_keys",
        config
      )
      .then((response) => {
        localStorage.setItem(
          `filteredKeys${id}`,
          JSON.stringify(response.data)
        );
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("https://crm.internationaleducationoffice.co.uk/fields", config)
      .then((response) => {
        localStorage.setItem(`fields`, JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        `https://crm.internationaleducationoffice.co.uk/roles/${roleId}`,
        config
      )
      .then((response) => {
        localStorage.setItem(
          `role_Data${roleId}`,
          JSON.stringify(response.data)
        );
      })
      .catch((error) => {
        console.log(error);
      });
    // axios
    //   .get("https://crm.internationaleducationoffice.co.uk/programs", config)
    //   .then((response) => {
    //     localStorage.setItem(`programs`, JSON.stringify(response.data));
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    axios
      .get(
        "https://crm.internationaleducationoffice.co.uk/core-settings/lead-status",
        config
      )
      .then((response) => {
        localStorage.setItem(`statuses`, JSON.stringify(response.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
    // axios
    //   .get(
    //     "https://crm.internationaleducationoffice.co.uk/applications/grid_keys",
    //     config
    //   )
    //   .then((response) => {
    //     localStorage.setItem(`gridKeys${id}`, JSON.stringify(response.data));
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, []);
  useEffect(() => {
    // const storedUserData = sessionStorage.getItem("userData");
    // const userDataObject = storedUserData ? JSON.parse(storedUserData) : null;
    // setName(userDataObject?.username);
    // console.log(storedUserData);
    // setLoading(false);
    axios
      .get(
        `https://crm.internationaleducationoffice.co.uk/members/member1/${id}`,
        config
      )
      .then((response) => {
        localStorage.setItem(
          `userData${id}`,
          JSON.stringify(response.data?.showFields)
        );
        localStorage.setItem(
          `statusFilter${id}`,
          JSON.stringify(response.data?.status_filter)
        );

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    // Update the current time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      // Clean up the interval when the component unmounts
      clearInterval(intervalId);
    };
  }, [name]);

  const handleLogout = () => {
    localStorage.removeItem("ieodkvToken");
    localStorage.removeItem("role");
    localStorage.removeItem("ieodkvUsername");
    localStorage.removeItem(`userData${id}`);
    localStorage.removeItem(`fields`);
    localStorage.removeItem(`filteredKeys${id}`);
    localStorage.removeItem("roleId");
    localStorage.removeItem(`statusFilter${id}`);
    localStorage.removeItem(`gridKeys${id}`);
    localStorage.removeItem("id");
    localStorage.removeItem("statuses");
    localStorage.removeItem("loggedIn");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="navbar">
      <div className="wrapper-search text-start ms-3">
        <p style={{ fontSize: 15, color: "black" }} className="pt-2">
          Welcome {name} ({role})
        </p>

        <p className="pt-2"> {currentTime.toLocaleString()}</p>
      </div>

      <Dropdown className="me-2 dropdown1">
        <Dropdown.Toggle className="calender5" id="dropdown-basic">
          <i class="bi bi-bar-chart-fill"></i>
        </Dropdown.Toggle>
      </Dropdown>

      <Dropdown className="me-2 dropdown1">
        <Dropdown.Toggle className="calender1" id="dropdown-basic">
          <i class="bi bi-calendar-check"></i>
        </Dropdown.Toggle>
      </Dropdown>

      <Dropdown className="me-2 dropdown1">
        <Dropdown.Toggle
          href="/notifications"
          id="dropdown-basic"
          className="calender2"
        >
          <i class="bi bi-bell-fill"></i>
          <span className="count-tag">{count}</span>
        </Dropdown.Toggle>

        {/* <Dropdown.Menu>
        <Dropdown.Item href="#">hello</Dropdown.Item>
       
      
      </Dropdown.Menu> */}
      </Dropdown>

      <Dropdown className="me-2 dropdown1">
        <Dropdown.Toggle id="dropdown-basic" className="calender3">
          Hi' Users
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Link to="/update" style={{ textDecoration: "none" }}>
            <Dropdown.Item href="/update">
              <SystemUpdateAltIcon /> Update Password
            </Dropdown.Item>
          </Link>

          <Link
            to="/"
            style={{ textDecoration: "none" }}
            onClick={handleLogout}
          >
            <Dropdown.Item href="#">
              <LogoutIcon /> Logout
            </Dropdown.Item>
          </Link>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Navbar;
