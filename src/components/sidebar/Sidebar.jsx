import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useEffect, useState } from "react";
import axios from "axios";

const Sidebar = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const role = localStorage.getItem("role");
  const roleId = localStorage.getItem("roleId");
  const [current_cases, setCurrentCases] = useState(0);
  const [case_owner_cases, setCaseCases] = useState(0);
  const [applications, setApplications] = useState(0);
  const [pages, setPages] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const token = localStorage.getItem("ieodkvToken");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const toggleRow = (index) => {
    if (expandedRows.includes(index)) {
      setExpandedRows(expandedRows.filter((i) => i !== index));
    } else {
      setExpandedRows([...expandedRows, index]);
    }
  };

  useEffect(() => {
    try {
      const sessionStorage = localStorage.getItem(`role_Data${roleId}`);
      const userGet = JSON.parse(sessionStorage);
      // const userGet = response.data;
      setPages(userGet.page);
      // })
      // .catch((error) => {
      //   console.log(error);
      // });
    } catch (error) {
      console.log(error);
    }
    // axios
    //   .get(
    //     `https://crm.internationaleducationoffice.co.uk/roles/${roleId}`,
    //     config
    //   )
    //   .then((response) => {
    //     if (response.data.page) {
    //       setPages(response.data.page);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, []);
  useEffect(() => {
    axios
      .get(
        `https://crm.internationaleducationoffice.co.uk/applications/current_desk/${id}`,
        config
      )
      .then((response) => {
        setCurrentCases(response.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        `https://crm.internationaleducationoffice.co.uk/applications/case/${id}`,
        config
      )
      .then((response) => {
        setCaseCases(response.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        "https://crm.internationaleducationoffice.co.uk/reports/dashboard",
        config
      )
      .then((response) => {
        setApplications(response.data.applications);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [current_cases, case_owner_cases, applications]);

  const handleLogout = () => {
    localStorage.removeItem(`userData${id}`);
    localStorage.removeItem(`filteredKeys${id}`);
    localStorage.removeItem(`gridKeys${id}`);
    localStorage.removeItem(`role_Data${roleId}`);
    localStorage.removeItem("ieodkvToken");
    localStorage.removeItem("role");
    localStorage.removeItem("roleId");
    localStorage.removeItem("id");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem(`fields`);
    navigate("/");
    window.location.reload();
  };
  return (
    <div className="sidebar">
      <div className="top me-4">
        {/* {role === "superadmin" ? ( */}
        <Link to="/dashboard">
          <img
            src={require("../../assets/logo_2.png")}
            width="120"
            height="70"
          />
        </Link>
        {/* ) : (
          <Link to="/my-cases">
            <img
              src={require("../../assets/logo_2.png")}
              width="120"
              height="70"
            />
          </Link>
        )} */}
      </div>
      <div className="center">
        <ul>
          {/* {role === "sub-agent" || role === "superadmin" ? ( */}
          <a href="/dashboard" style={{ textDecoration: "none" }}>
            <li style={{ marginBottom: "10px" }}>
              <DashboardIcon className="icon" />
              <span className="textfield">Dashboard</span>
              <br className="line-break" />
            </li>
          </a>
          {/* ) : (
            ""
          )} */}
          {role === "superadmin" ? (
            <>
              <li style={{ marginBottom: "10px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginRight: 10,
                  }}
                  onClick={() => toggleRow(0)}
                >
                  <div>
                    <PersonOutlineIcon className="icon" />
                    <span className="textfield">Super Admin</span>
                  </div>

                  {expandedRows.includes(0) ? (
                    <KeyboardArrowDownIcon
                      className="custom-icon" // Add a custom class
                      color="white"
                    />
                  ) : (
                    <KeyboardArrowRightIcon
                      className="custom-icon" // Add a custom class
                      color="white"
                    />
                  )}
                </div>
              </li>
              {expandedRows.includes(0) ? (
                <>
                  <a href="/logs" style={{ textDecoration: "none" }}>
                    <li>
                      <span className="textfield">Activity Logs</span>
                    </li>
                  </a>
                  <a href="/branches" style={{ textDecoration: "none" }}>
                    <li>
                      <span className="textfield">Branches</span>
                    </li>
                  </a>
                  <a href="/roles" style={{ textDecoration: "none" }}>
                    <li>
                      <span className="textfield">Roles</span>
                    </li>
                  </a>
                  <a href="/members" style={{ textDecoration: "none" }}>
                    <li>
                      <span className="textfield">Members</span>
                    </li>
                  </a>
                  <a
                    href="/smtp-credentails"
                    style={{ textDecoration: "none" }}
                  >
                    <li>
                      <span className="textfield">SMTP Credentails</span>
                    </li>
                  </a>

                  <a href="/form-design" style={{ textDecoration: "none" }}>
                    <li>
                      <span className="textfield">Design form</span>
                    </li>
                  </a>
                  <a
                    href="/application-fields"
                    style={{ textDecoration: "none" }}
                  >
                    <li>
                      <span className="textfield">Application fields</span>
                    </li>
                  </a>

                  {/* <Link to="/applications" style={{ textDecoration: "none" }}>
                    <li>
                      <span className="textfield" onClick={() => window.location.reload(false)}>
                        Applications ({applications})
                      </span>
                    </li>
                  </Link> */}
                  <a href="/applications" style={{ textDecoration: "none" }}>
                    <li>
                      <span className="textfield">
                        Applications ({applications})
                      </span>
                    </li>
                  </a>
                  <a href="/students" style={{ textDecoration: "none" }}>
                    <li>
                      <span className="textfield">Students</span>
                    </li>
                  </a>
                  <a
                    href="/notification-types"
                    style={{ textDecoration: "none" }}
                  >
                    <li>
                      <span className="textfield">Notification Types</span>
                    </li>
                  </a>
                  <a href="/templates" style={{ textDecoration: "none" }}>
                    <li>
                      <span className="textfield">Templates</span>
                    </li>
                  </a>
                  <a href="/campaigns" style={{ textDecoration: "none" }}>
                    <li>
                      <span className="textfield">Campaigns</span>
                    </li>
                  </a>

                  {/* <a href="/core-settings" style={{ textDecoration: "none" }}>
                    <li>
                      <DashboardIcon className="icon" />
                      <span className="textfield">Core Settings</span>
                    </li>
                  </a> */}

                  <a href="/settings" style={{ textDecoration: "none" }}>
                    <li>
                      <span className="textfield">Settings</span>
                    </li>
                  </a>
                </>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
          {/* {role !== "sub-agent" ? (
            <Link to="/email-outlook" style={{ textDecoration: "none" }}>
              <li style={{ marginBottom: "10px" }}>
                <DashboardIcon className="icon" />
                <span className="textfield">Email Outlook</span>
              </li>
            </Link>
          ) : (
            ""
          )} */}
          {role !== "sub-agent" ? (
            <a href="/schedule" style={{ textDecoration: "none" }}>
              <li style={{ marginBothrefm: "10px" }}>
                {/* <DashboardIcon className="icon" /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-calendar-check-fill icon"
                  viewBox="0 0 16 16"
                >
                  <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-5.146-5.146-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                </svg>
                <span className="textfield">Schedule</span>
              </li>
            </a>
          ) : (
            ""
          )}
          {role === "superadmin" ? (
            <a href="/core-settings" style={{ textDecoration: "none" }}>
              <li style={{ marginBottom: "10px" }}>
                {/* <DashboardIcon className="icon" /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-gear-fill icon"
                  viewBox="0 0 16 16"
                >
                  <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                </svg>
                <span className="textfield">Core Settings</span>
              </li>
            </a>
          ) : (
            ""
          )}
          <a href="/my-cases" style={{ textDecoration: "none" }}>
            <li style={{ marginBottom: "10px" }}>
              <StarIcon className="icon" />
              <span className="textfield">
                My Cases (
                {role === "sub-agent" ? case_owner_cases : current_cases})
              </span>
            </li>
          </a>
          {role !== "sub-agent" || role === "superadmin"
            ? pages.some((row) => !(row.name === "Programs") && row.show) && (
                <li style={{ marginBottom: "10px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginRight: 10,
                    }}
                    onClick={() => toggleRow(1)}
                  >
                    <div>
                      <PersonOutlineIcon className="icon" />
                      <span className="textfield">Data entry</span>
                    </div>
                    {expandedRows.includes(1) ? (
                      <KeyboardArrowDownIcon
                        className="custom-icon" // Add a custom class
                        color="white"
                      />
                    ) : (
                      <KeyboardArrowRightIcon
                        className="custom-icon" // Add a custom class
                        color="white"
                      />
                    )}
                  </div>
                </li>
              )
            : ""}
          {expandedRows.includes(1)
            ? pages.map((row, index) => {
                if (
                  !(row.name === "Programs") &&
                  (row.show || role === "superadmin")
                ) {
                  return (
                    <Link
                      to={
                        row.id.urlName === "program-types"
                          ? "/degree-types"
                          : `/${row.id.urlName}`
                      }
                      style={{ textDecoration: "none" }}
                      key={index}
                    >
                      <li>
                        <span className="textfield">
                          {row.name === "Program Types"
                            ? "Degree Types"
                            : row.name}
                        </span>
                      </li>
                    </Link>
                  );
                } else {
                  return null;
                }
              })
            : ""}
          <a href="/notice" style={{ textDecoration: "none" }}>
            <li style={{ marginBottom: "10px" }}>
              <CalendarMonthIcon className="icon" />
              <span className="textfield">Notice</span>
            </li>
          </a>

          <li style={{ marginBottom: "10px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginRight: 10,
              }}
              onClick={() => toggleRow(2)}
            >
              <div>
                <SignalCellularAltIcon className="icon" />
                <span className="textfield">Resources</span>
              </div>
              {expandedRows.includes(2) ? (
                <KeyboardArrowDownIcon
                  className="custom-icon" // Add a custom class
                  color="white"
                />
              ) : (
                <KeyboardArrowRightIcon
                  className="custom-icon" // Add a custom class
                  color="white"
                />
              )}
            </div>
          </li>

          {expandedRows.includes(2) && (
            <a href={`/university-guide`} style={{ textDecoration: "none" }}>
              <li>
                <span className="textfield">University Guide</span>
              </li>
            </a>
          )}

          {/* {role === "superadmin" ? (
            <Link to="/ratings" style={{ textDecoration: "none" }}>
              <li>
                <StarIcon className="icon" />
                <span className="textfield">Ratings</span>
              </li>
            </Link>
          ) : (
            ""
          )} */}
          {/*  <Link to="/ratings" style={{ textDecoration: "none" }}>
            <li>
              <StarIcon className="icon" />
              <span className="textfield">Ratings</span>
            </li>
          </Link>

          <Link to="/students" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span className="textfield">Students</span>
            </li>
</Link>*/}

          <a href="/update" style={{ textDecoration: "none" }}>
            <li style={{ marginBottom: "10px" }}>
              <SystemUpdateAltIcon className="icon" />
              <span className="textfield">Update Password</span>
            </li>
          </a>
          {/* <Link to="/update" style={{ textDecoration: "none" }}>
            <li style={{ marginBottom: "10px" }}>
              <SystemUpdateAltIcon className="icon" />
              <span className="textfield">Update Password</span>
            </li>
          </Link> */}
          <Link
            to="/"
            style={{ textDecoration: "none" }}
            onClick={handleLogout}
          >
            <li style={{ border: "none", marginBottom: "10px" }}>
              <LogoutIcon className="icon" />
              <span className="textfield">Logout</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
